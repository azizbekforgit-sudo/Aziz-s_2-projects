import { test, expect, type Page } from "@playwright/test";
import ru from "../../src/i18n/ru";
import uz from "../../src/i18n/uz";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@talenttoimpact.uz";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "";
const t = ru;

// Every test here runs in Russian; the language test below covers Uzbek (the default).
test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "lang", value: "ru", url: baseURL! }]);
});

/** Fails the test on ANY uncaught JS error in the page (how the old `reset()` crash would be caught). */
function failOnPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return () => expect(errors, "uncaught errors in the page").toEqual([]);
}

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel(t.login.email).fill(email);
  await page.getByLabel(t.login.password).fill(password);
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
}

async function logout(page: Page) {
  await page.locator("button:visible", { hasText: t.common.signOut }).first().click();
  await expect(page).toHaveURL("/");
}

async function register(page: Page, s: { name: string; email: string; password: string }) {
  await page.goto("/register");
  await page.getByLabel(t.register.name).fill(s.name);
  await page.getByLabel(t.register.email).fill(s.email);
  await page.getByLabel(t.register.password).fill(s.password);
  await page.getByLabel(t.register.school).fill("Школа №7, Кармана");
  await page.getByLabel(t.register.grade).selectOption("9");
  await page.getByRole("button", { name: t.register.submit }).click();
}

const stamp = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

test("student journey: register → approval → project → returned with a note → resubmit → published", async ({ page }) => {
  expect(ADMIN_PASSWORD, "SEED_ADMIN_PASSWORD must be set for e2e").not.toBe("");
  const assertNoErrors = failOnPageErrors(page);
  const id = stamp();
  const student = { name: `E2E Ученик ${id}`, email: `e2e-${id}@example.com`, password: "student-pass-123" };
  const first = `E2E черновик ${id}`;
  const second = `E2E проект ${id}`;

  // 1. Register: inline validation first, then the confirmation
  await page.goto("/register");
  await page.getByRole("button", { name: t.register.submit }).click();
  await expect(page.getByText(t.errors.nameRequired)).toBeVisible();
  await expect(page.getByText(t.errors.schoolRequired)).toBeVisible();
  await register(page, student);
  await expect(page.getByRole("heading", { name: t.register.doneTitle })).toBeVisible();

  // 2. Duplicate email → friendly error
  await register(page, student);
  await expect(page.getByText(t.errors.emailTaken)).toBeVisible();

  // 3. Pending account is told to wait
  await login(page, student.email, student.password);
  await expect(page.locator(".alert")).toHaveText(t.login.pending);

  // 4. Admin lands on moderation, sees the school, approves
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/admin");
  const row = page.getByRole("listitem").filter({ hasText: student.email });
  await expect(row).toContainText("Школа №7, Кармана");
  await row.getByRole("button", { name: `${t.admin.approve} ${student.name}` }).click();
  await expect(page.getByText(student.email)).toHaveCount(0);
  await logout(page);

  // 5. Student submits a project with full text
  await login(page, student.email, student.password);
  await expect(page).toHaveURL("/dashboard");
  await page.goto("/projects/new");
  await page.getByLabel(t.newProject.titleLabel).fill(first);
  await page.getByLabel(t.newProject.category).selectOption("Ecology");
  await page.getByLabel(t.newProject.summary).fill("коротко");
  await page.getByRole("button", { name: t.newProject.submit }).click();
  await expect(page.getByText(t.errors.summaryMin)).toBeVisible();
  await expect(page.getByLabel(t.newProject.titleLabel)).toHaveValue(first); // input kept
  await page.getByLabel(t.newProject.summary).fill("Ученики сажают деревья у каждой школы района и следят за ними.");
  await page.getByLabel(new RegExp(t.newProject.problem)).fill("Во дворах мало тени, летом дети не выходят на улицу.");
  await page.getByRole("button", { name: t.newProject.submit }).click();
  await expect(page.getByText(t.dashboard.submittedTitle)).toBeVisible();
  await expect(page.getByRole("listitem").filter({ hasText: first })).toContainText(t.status.PENDING_REVIEW);
  const firstUrl = await page.getByRole("link", { name: first }).getAttribute("href");
  await logout(page);

  // 6. Not visible to the public while in review (404, not "forbidden")
  const res = await page.goto(firstUrl!);
  expect(res?.status()).toBe(404);

  // 7. Admin opens the project, reads the problem text, must give a reason to return it
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await page.getByRole("link", { name: first }).first().click();
  await expect(page.getByText("Во дворах мало тени")).toBeVisible();
  await page.getByRole("button", { name: t.project.reject }).click();
  await expect(page.getByText(t.errors.noteRequired)).toBeVisible();
  await page.getByLabel(t.project.noteLabel).fill("Добавьте, сколько деревьев и кто будет поливать.");
  await page.getByRole("button", { name: t.project.reject }).click();
  await expect(page).toHaveURL("/admin");
  await logout(page);

  // 8. Student sees the reason
  await login(page, student.email, student.password);
  const returned = page.getByRole("listitem").filter({ hasText: first });
  await expect(returned).toContainText(t.status.REJECTED);
  await expect(returned).toContainText("кто будет поливать");

  // 9. Resubmits, admin approves, it is public
  await page.goto("/projects/new");
  await page.getByLabel(t.newProject.titleLabel).fill(second);
  await page.getByLabel(t.newProject.category).selectOption("Ecology");
  await page.getByLabel(t.newProject.summary).fill("30 деревьев у школы №7, поливают 9-е классы по графику.");
  await page.getByRole("button", { name: t.newProject.submit }).click();
  await expect(page.getByText(t.dashboard.submittedTitle)).toBeVisible();
  await logout(page);
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await page.getByRole("link", { name: second }).first().click();
  await page.getByRole("button", { name: t.project.approve }).click();
  await expect(page).toHaveURL("/admin");
  await expect(page.getByText(`${t.admin.actions["project.approved"]} · ${second}`)).toBeVisible();
  await logout(page);
  await page.goto("/projects");
  await page.getByRole("link", { name: second }).click();
  await expect(page).toHaveURL(/\/projects\/[a-z0-9]+$/);
  await expect(page.getByRole("heading", { name: second })).toBeVisible();
  await expect(page.locator("article").getByText("E2E У. · 9 класс")).toBeVisible(); // public sees a short name only
  await expect(page.getByText(student.name)).toHaveCount(0);

  assertNoErrors();
});

test("rejected account is told to contact the coordinator", async ({ page }) => {
  const id = stamp();
  const s = { name: `E2E Отказ ${id}`, email: `e2e-no-${id}@example.com`, password: "student-pass-123" };
  await register(page, s);
  await expect(page.getByRole("heading", { name: t.register.doneTitle })).toBeVisible();
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await page.getByRole("button", { name: `${t.admin.reject} ${s.name}` }).click();
  await expect(page.getByText(s.email)).toHaveCount(0);
  await logout(page);
  await login(page, s.email, s.password);
  await expect(page.locator(".alert")).toHaveText(t.login.blocked);
});

test("admin publishes an opportunity and it appears publicly", async ({ page }) => {
  const title = `E2E конкурс ${stamp()}`;
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/admin");
  await page.getByLabel(t.admin.opp.title, { exact: true }).fill(title);
  await page.getByLabel(t.admin.opp.organizer, { exact: true }).fill("IT Park Навои");
  await page.getByLabel(t.admin.opp.category, { exact: true }).selectOption("Competition");
  await page.getByLabel(t.admin.opp.url, { exact: true }).fill("javascript:alert(1)");
  await page.getByLabel(t.admin.opp.description, { exact: true }).fill("Команды по 3 человека.");
  await page.getByRole("button", { name: t.admin.opp.submit }).click();
  await expect(page.getByText(t.errors.urlInvalid)).toBeVisible();
  await page.getByLabel(t.admin.opp.url, { exact: true }).fill("https://example.com/cup");
  await page.getByRole("button", { name: t.admin.opp.submit }).click();
  await expect(page.getByText(t.admin.opp.done)).toBeVisible();
  await page.goto("/opportunities");
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
});

test("@live wrong password shows an error, and repeated guessing is stopped", async ({ page }) => {
  const email = `nobody-${stamp()}@example.com`;
  await login(page, email, "wrong-1");
  await expect(page.locator(".alert")).toHaveText(t.login.invalid);
  for (let i = 0; i < 4; i++) {
    await page.getByLabel(t.login.password).fill("wrong");
    await page.getByRole("button", { name: t.login.submit, exact: true }).click();
    await expect(page.locator(".alert")).toBeVisible();
  }
  await page.getByLabel(t.login.password).fill("wrong");
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
  await expect(page.locator(".alert")).toHaveText(t.login.tooMany);
});

test("protected pages redirect to sign-in and come back after login; signed-in users skip /login", async ({ page }) => {
  await page.goto("/projects/new");
  await expect(page).toHaveURL(/\/login\?callbackUrl=/);
  await page.getByLabel(t.login.email).fill(ADMIN_EMAIL);
  await page.getByLabel(t.login.password).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
  await expect(page).toHaveURL("/projects/new");
  await page.goto("/login");
  await expect(page).toHaveURL("/admin"); // /login → /dashboard → admins go to /admin
});

test("open redirect is blocked", async ({ page }) => {
  await page.goto("/login?callbackUrl=https://evil.example");
  await page.getByLabel(t.login.email).fill(ADMIN_EMAIL);
  await page.getByLabel(t.login.password).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
  await expect(page).toHaveURL("/admin");
});

test("@live language: Uzbek by default, switcher changes to Russian and back", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uz");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(uz.home.title);
  await page.locator(".nav-actions").getByRole("button", { name: /RU/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(ru.home.title);
  await page.goto("/register"); // choice is remembered
  await expect(page.getByRole("heading", { name: ru.register.title })).toBeVisible();
  await page.getByRole("button", { name: /UZ/ }).click();
  await expect(page.getByRole("heading", { name: uz.register.title })).toBeVisible();
});

test("@live HTML is never cached by the browser", async ({ page }) => {
  const res = await page.goto("/register");
  expect(res?.headers()["cache-control"]).toContain("no-store");
});
