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

  await page.getByRole("button", { name: "Checkout" }).click();

  //Entering the card details
  await page.locator("div.field input.input.txt.text-validated").clear();
  await page
    .locator("div.field input.input.txt.text-validated")
    .fill("6666 7777 8888 9999");
  await page.locator("select.input.ddl:nth-child(2)").click();

  await page.locator("select.input.ddl:nth-child(2)").selectOption("12");

  await page.locator("select.input.ddl:nth-child(3)").click();

  await page.locator("select.input.ddl:nth-child(3)").selectOption("12");

  await page
    .locator("div.field.small [type='text'][class='input txt']")
    .fill("999");

  await page
    .locator("//div[text()='Name on Card ']/..//input")
    .fill("Mali Yurt");

  await page.locator("input[name='coupon']").fill("CODE2022");

  await page.getByRole("button", { name: "Apply Coupon" }).click();

  await page.locator("[placeholder*='Country']").clear();
  await page.locator("[placeholder*='Country']").click();
  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await page.locator("a:has-text('Place Order')").click();
  expect(
    await page.locator("tr td[align='center'] h1").textContent()
  ).toContain("Thankyou for the order.");

  const orderId = await page
    .locator("td.em-spacer-1 label.ng-star-inserted")
    .textContent();

  console.log("orderId = " + orderId);

  await page.locator("button", { hasText: "ORDERS" }).click();

  await page.locator("tbody").waitFor();

  const orderIds = await page.locator("tr.ng-star-inserted");
  const numOfOrderId = await orderIds.count();

  for (let i = 0; i < numOfOrderId; i++) {
    const singleOrderId = await orderIds.nth(i).locator("th").textContent();
    if (orderId.trim().includes(singleOrderId.trim())) {
      await orderIds.nth(i).locator("button.btn.btn-primary").click();
      await expect(
        page.locator("div.email-container div.col-text.-main")
      ).toContainText(singleOrderId.trim());
      break;
    }
  }
});
