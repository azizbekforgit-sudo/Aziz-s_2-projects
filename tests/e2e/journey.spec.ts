import { test, expect, type Page } from "@playwright/test";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@talenttoimpact.uz";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "";

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

async function logout(page: Page) {
  await page.locator("button:visible", { hasText: "Sign out" }).first().click();
  await expect(page).toHaveURL("/");
}

test("student journey: register → approval → submit project → moderation → public", async ({ page }) => {
  expect(ADMIN_PASSWORD, "SEED_ADMIN_PASSWORD must be set for e2e").not.toBe("");
  const stamp = Date.now();
  const student = { name: `E2E Student ${stamp}`, email: `e2e-${stamp}@example.com`, password: "student-pass-123" };
  const projectTitle = `E2E project ${stamp}`;

  // 1. Register — shows inline validation, then a success screen
  await page.goto("/register");
  await page.getByRole("button", { name: "Create student account" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await page.getByLabel("Full name").fill(student.name);
  await page.getByLabel("Email").fill(student.email);
  await page.getByLabel("Password").fill(student.password);
  await page.getByLabel("Grade").selectOption("9");
  await page.getByRole("button", { name: "Create student account" }).click();
  await expect(page.getByRole("heading", { name: "You’re on the list!" })).toBeVisible();

  // 2. Same email again → friendly duplicate error
  await page.goto("/register");
  await page.getByLabel("Full name").fill(student.name);
  await page.getByLabel("Email").fill(student.email);
  await page.getByLabel("Password").fill(student.password);
  await page.getByLabel("Grade").selectOption("9");
  await page.getByRole("button", { name: "Create student account" }).click();
  await expect(page.getByText("This email is already registered.")).toBeVisible();

  // 3. Pending account can't sign in and is told why
  await login(page, student.email, student.password);
  await expect(page.locator(".alert")).toContainText("isn’t active yet");

  // 4. Admin approves the account
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/dashboard");
  await page.goto("/admin");
  await page.getByRole("button", { name: `Approve ${student.name}` }).click();
  await expect(page.getByText(student.email)).toHaveCount(0);
  await logout(page);

  // 5. Student signs in and submits a project (with one validation error first)
  await login(page, student.email, student.password);
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: /Good to see you, E2E\./ })).toBeVisible();
  await page.goto("/projects/new");
  await page.getByLabel("Project title").fill(projectTitle);
  await page.getByLabel("Category").selectOption("Ecology");
  await page.getByLabel("Short summary").fill("too short");
  await page.getByRole("button", { name: "Submit for review" }).click();
  await expect(page.getByText("Summary must be at least 20 characters.")).toBeVisible();
  await expect(page.getByLabel("Project title")).toHaveValue(projectTitle); // input kept
  await page.getByLabel("Short summary").fill("Students plant and track trees around every school in the district.");
  await page.getByRole("button", { name: "Submit for review" }).click();
  await expect(page.getByText("Project submitted.")).toBeVisible();
  await expect(page.getByRole("listitem").filter({ hasText: projectTitle })).toContainText("In review");

  // 6. Not public yet
  await page.goto("/projects");
  await expect(page.getByText(projectTitle)).toHaveCount(0);
  await page.goto("/dashboard");
  await logout(page);

  // 7. Admin approves the project → it becomes public
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await expect(page).toHaveURL("/dashboard");
  await page.goto("/admin");
  await page.getByRole("button", { name: `Approve ${projectTitle}` }).click();
  await expect(page.getByRole("button", { name: `Approve ${projectTitle}` })).toHaveCount(0);
  await expect(page.getByText(`Published project · ${projectTitle}`)).toBeVisible();
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: projectTitle })).toBeVisible();
});

test("wrong password shows an error", async ({ page }) => {
  await login(page, ADMIN_EMAIL, "definitely-wrong");
  await expect(page.locator(".alert")).toHaveText("Incorrect email or password.");
});

test("protected pages redirect to sign-in and come back after login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?callbackUrl=/);
  await page.getByLabel("Email").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL("/admin");
});

test("open redirect is blocked", async ({ page }) => {
  await page.goto("/login?callbackUrl=https://evil.example");
  await page.getByLabel("Email").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL("/dashboard");
});
