"use strict";
import { expect, test, chromium, firefox } from "@playwright/test";

/*
npx playwright test tests/UI_07DebugMode.spec.js --debug
playwright inspector opens
 */
test("Debug Mode", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signInBtn = page.getByRole("button", { name: "Sign In" });
  const blinkingMessage = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //Promise.all() is used to wait for multiple promises to resolve. In this case, it waits for the new page to be opened and the click action on the blinking message.Also, Promise.all() ensures that both actions are paralelly completed before proceeding to the next steps in the test.
  //waitForEvent() and click() are used to handle the new tab that opens when clicking on the blinking message and to ensure the test waits for the new page to load. Then, we can continue with the rest of the test on the new page.
  //if more than one page is opened, const [newPage, newPage2, newPage3] = await Promise.all([...]) can be used to handle multiple pages.
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //listen for any new page pending,rejected,fulfilled
    blinkingMessage.click(),
  ]);

  const text = await newPage.locator(".red a").textContent();
  const userNameText = text.split("@")[1];

  //bringToFront() is used to bring the new page to the front, making it the active page in the browser context.
  await page.bringToFront();

  await userName.fill(userNameText);
  console.log(await userName.inputValue());
  await page.pause();
});

/*
Codegen===> npx playwright codegen http://google.com
 */

test("Codegen", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/");
  await page.getByRole("link", { name: "Blog" }).click();
  await page.getByRole("button", { name: "Consent" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Click Here" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("link", { name: "Job Support" }).click();
});
