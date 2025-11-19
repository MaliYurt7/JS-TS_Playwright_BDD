"use strict";
import { expect, test } from "@playwright/test";

test("End2End", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const setEmail = page.getByPlaceholder("email@example.com");
  const setPassword = page.getByPlaceholder("enter your passsword");
  const signInBtn = page.getByRole("button", { name: "login" });

  const getAllfProductsLocators = page.locator("div.card-body");
  const expectedProductName = "ADIDAS ORIGINAL";

  const titlesOfProducts = page.locator("div.card-body b"); // get list of product as an locator

  await setEmail.fill("mali7yurt@gmail.com");
  await setPassword.fill("test01");
  await signInBtn.click();

  await page.waitForLoadState("networkidle"); // to wait until all network requests are finished

  await titlesOfProducts.first().waitFor(); // to wait until first product is visible

  console.log(await titlesOfProducts.first().textContent()); // get first product name as an string
  console.log(await titlesOfProducts.first().allTextContents()); // get first product name as an array of strings

  console.log(await titlesOfProducts.allTextContents()); // get all product names as an array of strings

  const count = await getAllfProductsLocators.count(); // get count of products
  for (let i = 0; i < count; i++) {
    const productName = await getAllfProductsLocators
      .nth(i)
      .locator("b")
      .textContent();
    if (productName === expectedProductName) {
      // await getAllfProductsLocators
      //   .nth(i)
      //   .locator("button.btn.w-10.rounded")
      //   .click();
      await getAllfProductsLocators.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div.infoWrap").nth(0).waitFor();

  const prodVisible = await page
    .locator("h3:has-text('ADIDAS ORIGINAL')")
    .isVisible();

  expect(prodVisible).toBeTruthy();
});
