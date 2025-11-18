"use strict";
import { expect, test } from "@playwright/test";

test("Locators and verifying Error login message", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pageTitle = await page.title();
  console.log("pageTitle = " + pageTitle);
  await page.locator("#username").fill("rahulshetty");
  //await page.getByRole("textbox", { name: "Username:" }).fill("Mike");

  await page.locator("#password").fill("learning");

  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify the blinking warning message
  const getWarningMessageLocator = page.locator("[style*='block']");
  await expect(getWarningMessageLocator).toBeVisible();

  const warningMessage = await getWarningMessageLocator.textContent();
  console.log("warningMessage = " + warningMessage);
  await expect(getWarningMessageLocator).toContainText("Incorrect");
  expect(warningMessage).toEqual(expect.stringContaining("Incorrect"));
});

test("Locators and verifying the access to the main page", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signInBtn = page.getByRole("button", { name: "Sign In" });

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const pageTitle = await page.title();
  console.log("pageTitle = " + pageTitle);
  await userName.fill("rahulshetty");
  //await page.getByRole("textbox", { name: "Username:" }).fill("Mike");

  await page.locator("#password").fill("learning");

  await signInBtn.click();

  // Verify the blinking warning message
  const getWarningMessageLocator = page.locator("[style*='block']");
  await expect(getWarningMessageLocator).toBeVisible();

  const warningMessage = await getWarningMessageLocator.textContent();
  console.log("warningMessage = " + warningMessage);
  await expect(getWarningMessageLocator).toContainText("Incorrect");

  //Verify the access to the main page by getting text "iphone X" which is the first phone in the list

  //erease the existing username from the input field
  await userName.fill("");
  //fill the username with the correct one
  await userName.fill("rahulshettyacademy");
  //click on the Sign In button
  await signInBtn.click();

  //getting text "iphone X"
  const allProducts = page.locator(".card-body a");
  const firstProducts = allProducts.first();
  console.log(await allProducts.first().textContent());
  console.log(await allProducts.nth(0).textContent());
  const firstProductName = await firstProducts.textContent();
  console.log("firstProductName = " + firstProductName);
  // Verify the first product locator contains  product name "iphone X" wiritten in the locoator
  await expect(firstProducts).toContainText("iphone X");
  // Verify the all products text located with the same locators by using allTextContents() method (LIST of array). And allTextContents() method has NO AUTOWAIT SO we MAY need to use STATIC WAIT. Please check the Auto-wait in playwright documentation for more details.
  const allTitles = await allProducts.allTextContents();
  console.log(allTitles);
});

/*
const userName = page.locator("#username");

A wait is not required.
A wait is required only when you are performing the actual action.

await userName.fill("rahulshetty");

*/
