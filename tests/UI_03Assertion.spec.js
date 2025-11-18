"use strict";
import { expect, test } from "@playwright/test";

test("browser Context decleration Test practice get title", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pageTitle = await page.title();
  console.log("pageTitle = " + pageTitle);
});

test("page Context decleration Test practice get title", async ({ page }) => {
  await page.goto("https://www.google.com/");

  const pageTitle = await page.title();
  console.log("pageTitle : " + pageTitle);
  await expect(page).toHaveTitle(pageTitle);
});

//https://playwright.dev/docs/test-assertions

/*

 Assert the title after clicking the link

  1) await expect($locator).to{$Dynamic}
  2) await expect(page).to{$Dynamic}=====>3
  3) await expect($response).toBeOK();===>1
  4) expect(value).$Dynamic

*/
