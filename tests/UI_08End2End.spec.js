"use strict";
import { expect, test } from "@playwright/test";

test("End2End", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const setEmail = page.getByPlaceholder("email@example.com");
  const setPassword = page.getByPlaceholder("enter your passsword");
  const signInBtn = page.getByRole("button", { name: "login" });

  await setEmail.fill("mali7yurt@gmail.com");
  await setPassword.fill("test01");
  await signInBtn.click();

  await page.waitForLoadState("networkidle"); // to wait until all network requests are finished

  const titlesOfProducts = page.locator("div.card-body b"); // get list of product as an locator

  console.log(await titlesOfProducts.first().textContent()); // get first product name as an string
  console.log(await titlesOfProducts.first().allTextContents()); // get first product name as an array of strings

  console.log(await titlesOfProducts.allTextContents()); // get all product names as an array of strings
  await page.pause();
});
