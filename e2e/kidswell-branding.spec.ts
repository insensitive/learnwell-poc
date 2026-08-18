import { test, expect } from "@playwright/test";

test("shows Kidswell branding and metadata on the home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Kidswell", { exact: true })).toBeVisible();
  await expect(page.getByText("Learnwell", { exact: true })).toHaveCount(0);
  await expect(page).toHaveTitle("Kidswell");
});
