"use strict";
import { test, expect } from "@playwright/test";

test("locators and assertions", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");

  // title() method to get the title of the page
  await page.title().then((title) => console.log("Page Title:", title));

  //LOCATORS EXAMPLES

  //getByRole()

  // await page.getByRole("link", { name: "A/B Testing" }).click();

  //with Chain locators
  const listitem = page.getByRole("listitem").filter({
    has: page.getByRole("link", { name: "A/B Testing" }),
  });
  await listitem.getByRole("link", { name: "A/B Testing" }).click();

  // Assert the title after clicking the link

  //1) await expect($locator).to{$Dynamic}
  //2) await expect(page).to{$Dynamic}=====>3
  //3) await expect($response).toBeOK();===>1
  //4) expect(value).$Dynamic

  await page.title().then((title) => console.log("New Page Title:", title));
  await expect(page).toHaveTitle(await page.title().then((title) => title));
  await expect(page).toHaveTitle("No A/B Test");

  await page.goBack();
  const subTitle = page.getByText("Test Automation Practice");
  console.log("subTitle -1 = " + (await subTitle.textContent()));
  console.log("subTitle -2 = " + (await subTitle.innerHTML()));

  await expect(subTitle).toContainClass("h1y");

  await expect(await subTitle.textContent()).toContain(
    "Test Automation Practice"
  );
  await expect(await subTitle.textContent()).toMatch(
    "Test Automation Practice"
  );
});
