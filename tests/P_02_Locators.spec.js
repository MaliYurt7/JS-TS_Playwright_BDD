"use strict";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  //getBtText()
  await page.getByText("Add/Remove Elements").click();
});

test("locators examples", async ({ page }) => {
  await expect(page).toHaveTitle("Add/Remove Elements");

  await expect(
    page.getByRole("heading", { name: "Add/Remove Elements" })
  ).toBeVisible();
  await page.pause();
});

test("Add/Remove Elements part", async ({ page }) => {
  await page.getByTestId("addElement()").click();
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Delete" }).click();
  await page.waitForTimeout(2000);
  // await page.pause();

  await page.goBack();
  await expect(page.getByRole("link", { name: "Autocomplete" })).toBeVisible();
  await page.waitForTimeout(2000);
});
