import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import uz from "../../src/i18n/uz";

const PUBLIC_PAGES = ["/", "/login", "/register", "/projects", "/opportunities"];

for (const lang of ["uz", "ru"]) for (const path of PUBLIC_PAGES) {
  test(`@live a11y [${lang}]: ${path} has no serious accessibility violations`, async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "lang", value: lang, url: baseURL! }]);
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });

  test(`@live mobile [${lang}]: ${path} does not scroll sideways at 375px`, async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "lang", value: lang, url: baseURL! }]);
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("@live mobile menu opens and links work", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.locator(".mobile-menu > summary").click();
  await page.locator(".mobile-menu-panel").getByRole("link", { name: uz.nav.projects, exact: true }).click();
  await expect(page).toHaveURL("/projects");
});

test("@live no console errors on public pages", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const p of PUBLIC_PAGES) await page.goto(p);
  expect(errors).toEqual([]);
});
