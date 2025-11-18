"use strict";
/*
The 'import' syntax  uses ES6 module syntax, which is preferred in modern JavaScript projects.
The 'require' syntax is older (CommonJS). Use import if your project supports ES modules.
*/
//const { test } = require("@playwright/test");
import { test } from "@playwright/test";

//this is the skeleton of a Playwright test structure
// if the function does not have a name, it is an anonymous function.And it is a good practice to use arrow functions for consistency.So that we use arrow functions for all test cases as seen in the second test case below.
test("First Playwright Test", async function () {
  // Test code goes in here (await can be used to wait for asynchronous operations ONLY within "async")
  //await can not be used without async, otherwise it gives warning and test can not be run
  // Example: await page.goto('https://example.com');
  // Example: await expect(page).toHaveTitle('Example Domain');
});

test("Playwright Test with Arrow Function", async () => {
  // Test code goes in here (await can be used to wait for asynchronous operations ONLY within "async")
  //await can not be used without async, otherwise it gives warning and test can not be run
  // Example: await page.goto('https://example.com');
  // Example: await expect(page).toHaveTitle('Example Domain');
});
