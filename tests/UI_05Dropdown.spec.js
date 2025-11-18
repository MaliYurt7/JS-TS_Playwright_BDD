"use strict";
import { expect, test } from "@playwright/test";

/*

 Note: This test file is focused on dropdown functionality. if the tag of the dropdown is select, then the test will be written accordingly. Get the locator for the select tag element and then use the selectOption(the value of the value attribue) method to select an option from the dropdown.

NOTE: await page.pause();== > This line is used to pause the test execution, allowing you to inspect the page state before proceeding with further actions. It can be useful for debugging or manual verification of the UI state. It opens the Playwright Inspector, which provides a visual interface to interact with the page during test execution.

NOTE: if there is blinking text on the page, you can use the locator with the class attribute to get the blinking text and then use the expect assertion to verify that the class attribute contains the value "blinkingText".
*/

test("Select tag dropdown", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signInBtn = page.getByRole("button", { name: "Sign In" });
  const blinkingMessage = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  await page.locator("span.radiotextsty").last().click();
  // this is webbase pop up, not JS pop up
  await page.locator("#okayBtn").click();

  //assertion of the radiobutton
  await expect(page.locator("span.radiotextsty").last()).toBeChecked();
  console.log(await page.locator("span.radiotextsty").last().isChecked());

  //assertion of the checkbox
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(blinkingMessage).toHaveAttribute("class", "blinkingText");
  //await page.pause();

  // const pageTitle = await page.title();
  // console.log("pageTitle = " + pageTitle);

  // await userName.fill("rahulshettyacademy");
  // await page.locator("#password").fill("learning");

  //click on the Sign In button
  // await signInBtn.click();
});
