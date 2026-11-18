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

/** Fails the test on ANY uncaught JS error in the page (this is how the old `reset()` crash would be caught). */
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

test("student journey: register → approval → submit project → moderation → public", async ({ page }) => {
  expect(ADMIN_PASSWORD, "SEED_ADMIN_PASSWORD must be set for e2e").not.toBe("");
  const assertNoErrors = failOnPageErrors(page);
  const stamp = Date.now();
  const student = { name: `E2E Ученик ${stamp}`, email: `e2e-${stamp}@example.com`, password: "student-pass-123" };
  const projectTitle = `E2E проект ${stamp}`;

  // 1. Register — inline validation first, then the success screen
  await page.goto("/register");
  await page.getByRole("button", { name: t.register.submit }).click();
  await expect(page.getByText(t.errors.nameRequired)).toBeVisible();
  await expect(page.getByText(t.errors.passwordRequired)).toBeVisible();
  await page.getByLabel(t.register.name).fill(student.name);
  await page.getByLabel(t.register.email).fill(student.email);
  await page.getByLabel(t.register.password).fill(student.password);
  await page.getByLabel(t.register.grade).selectOption("9");
  await page.getByRole("button", { name: t.register.submit }).click();
  await expect(page.getByRole("heading", { name: t.register.successTitle })).toBeVisible();

  // 2. Same email again → friendly duplicate error
  await page.goto("/register");
  await page.getByLabel(t.register.name).fill(student.name);
  await page.getByLabel(t.register.email).fill(student.email);
  await page.getByLabel(t.register.password).fill(student.password);
  await page.getByLabel(t.register.grade).selectOption("9");
  await page.getByRole("button", { name: t.register.submit }).click();
  await expect(page.getByText(t.errors.emailTaken)).toBeVisible();

  // 3. Pending account can't sign in and is told why
  await login(page, student.email, student.password);
  await expect(page.locator(".alert")).toHaveText(t.login.inactive);

  // 4. Admin approves the account
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/dashboard");
  await page.goto("/admin");
  await page.getByRole("button", { name: `${t.admin.approve} ${student.name}` }).click();
  await expect(page.getByText(student.email)).toHaveCount(0);
  await logout(page);

  // 5. Student signs in and submits a project (one validation error first)
  await login(page, student.email, student.password);
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: "Рады видеть, E2E!" })).toBeVisible();
  await page.goto("/projects/new");
  await page.getByLabel(t.newProject.titleLabel).fill(projectTitle);
  await page.getByLabel(t.newProject.category).selectOption("Ecology");
  await page.getByLabel(t.newProject.summary).fill("коротко");
  await page.getByRole("button", { name: t.newProject.submit }).click();
  await expect(page.getByText(t.errors.summaryMin)).toBeVisible();
  await expect(page.getByLabel(t.newProject.titleLabel)).toHaveValue(projectTitle); // input kept
  await page.getByLabel(t.newProject.summary).fill("Ученики сажают деревья у каждой школы района и следят за ними.");
  await page.getByRole("button", { name: t.newProject.submit }).click();
  await expect(page.getByText(t.dashboard.submittedTitle)).toBeVisible();
  await expect(page.getByRole("listitem").filter({ hasText: projectTitle })).toContainText(t.status.PENDING_REVIEW);

  // 6. Not public yet
  await page.goto("/projects");
  await expect(page.getByText(projectTitle)).toHaveCount(0);
  await page.goto("/dashboard");
  await logout(page);

  // 7. Admin approves the project → it becomes public
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/dashboard");
  await page.goto("/admin");
  await page.getByRole("button", { name: `${t.admin.approve} ${projectTitle}` }).click();
  await expect(page.getByRole("button", { name: `${t.admin.approve} ${projectTitle}` })).toHaveCount(0);
  await expect(page.getByText(`${t.admin.actions["project.approved"]} · ${projectTitle}`)).toBeVisible();
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: projectTitle })).toBeVisible();

  assertNoErrors();
});

test("wrong password shows an error", async ({ page }) => {
  await login(page, ADMIN_EMAIL, "definitely-wrong");
  await expect(page.locator(".alert")).toHaveText(t.login.invalid);
});

test("protected pages redirect to sign-in and come back after login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?callbackUrl=/);
  await page.getByLabel(t.login.email).fill(ADMIN_EMAIL);
  await page.getByLabel(t.login.password).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
  await expect(page).toHaveURL("/admin");
});

test("open redirect is blocked", async ({ page }) => {
  await page.goto("/login?callbackUrl=https://evil.example");
  await page.getByLabel(t.login.email).fill(ADMIN_EMAIL);
  await page.getByLabel(t.login.password).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: t.login.submit, exact: true }).click();
  await expect(page).toHaveURL("/dashboard");
});

test("language: Uzbek by default, switcher changes to Russian and back", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uz");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(uz.home.titleA);
  await page.locator(".nav-actions").getByRole("button", { name: /RU/ }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(ru.home.titleA);
  await page.goto("/register"); // choice is remembered
  await expect(page.getByRole("heading", { name: ru.register.title })).toBeVisible();
  await page.getByRole("button", { name: /UZ/ }).click();
  await expect(page.getByRole("heading", { name: uz.register.title })).toBeVisible();
});

test("HTML is never cached by the browser", async ({ request }) => {
  const res = await request.get("/register");
  expect(res.headers()["cache-control"]).toContain("no-store");
});
