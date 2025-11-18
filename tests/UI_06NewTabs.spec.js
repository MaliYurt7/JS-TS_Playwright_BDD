"use strict";
import { expect, test } from "@playwright/test";

test("New tab(s)", async ({ browser }) => {
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
By waiting for the event [context.waitForEvent('page')] to trigger:
This event indicates that a new page is in the process of being created due to the click action. It ensures that the script does not continue until the new page has started to open, which is crucial for maintaining order in automation tests.


What feature of Playwright allows for easy interaction with elements across different pages (e.g., when opening a new tab)?
Browser Contexts:
Playwright allows the creation of multiple browser contexts, enabling multiple isolated sessions. This facilitates interactions with elements across different pages or tabs without session conflicts.
*/

//if we need more than one page seperatly(tabs) in one browser , we need to use "context" fixture
test("Opening multiple tabs in a context", async ({ context }) => {
  //create a page (2 tabs in one context-browser window-)
  let googlePage = await context.newPage();
  let youtubePAge = await context.newPage();

  await googlePage.bringToFront(); // it brings to front to be able to see the flow.
  await googlePage.goto("https://www.google.co.uk/");
  await googlePage.waitForTimeout(3000);
  await expect(googlePage).toHaveTitle("Google");
  await googlePage
    .locator("//div[contains(text(), 'Accept all')] [@role='none']")
    .click();

  let googleSerachBox = googlePage.locator("//textarea[@id='APjFqb']");
  await googleSerachBox.fill("CYDEO");
  await googlePage.waitForTimeout(3000);
  await googleSerachBox.press("Enter");
  await googlePage.waitForTimeout(3000);

  await youtubePAge.bringToFront(); // it brings to front to be able to see the flow.

  await youtubePAge.goto("https://www.youtube.com/");
  await youtubePAge.waitForTimeout(3000);
  await expect(youtubePAge).toHaveTitle("YouTube");
  await youtubePAge
    .locator(
      "//div[@class='yt-spec-button-shape-next__button-text-content']//span[contains(., 'Reject all')]"
    )
    .click();

  await youtubePAge.waitForTimeout(3000);
});

//opening a new tab thru the website
test("Random window pop-up handling", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/windows");

  await expect(page).toHaveTitle("Windows");

  //creating event listener for monitoring
  let promisedNewPageEvent = page.waitForEvent("popup"); //monitoring

  await page.locator("text='Click Here'").click();

  let newPage = await promisedNewPageEvent; // reacting

  await expect(newPage).toHaveTitle("New Window");

  let getNewPageElement = newPage.locator("//h3[text()='New Window']");

  await expect(getNewPageElement).toBeVisible();

  await page.bringToFront();

  let originalPageElement = page.locator("//a[text()='CYDEO']");

  await expect(originalPageElement).toBeVisible();
  await expect(originalPageElement).toBeEnabled();
});

test("@smokebrowser Creating multiple contexts(browser)", async ({
  browser,
}) => {
  let context1 = await browser.newContext();
  let page1 = await context1.newPage();
  page1.goto("https://www.google.com/");
  let page2 = await context1.newPage();
  page2.goto("https://www.youtube.com/");

  await page2.waitForTimeout(3000);

  let context2 = await browser.newContext();

  let page3 = await context2.newPage();
  page3.goto("https://cydeo.com/home/");
  let page4 = await context2.newPage();
  page4.goto("https://www.linkedin.com/");

  await page4.waitForTimeout(3000);
});

test("@smokeBothBrowser", async ({ page }) => {
  // it does not follow the playwrihgt.config.js

  let chromeBrowser = await chromium.launch();

  let chromeContext = await chromeBrowser.newContext();
  let page1 = await chromeContext.newPage();
  page1.goto("https://www.google.com/");

  let page2 = await chromeContext.newPage();
  page2.goto("https://www.youtube.com/");

  await page2.waitForTimeout(3000);

  let firefoxBrowser = await firefox.launch();
  let firefoxContext = await firefoxBrowser.newContext();
  let page3 = await firefoxContext.newPage();
  page3.goto("https://cydeo.com/home/");
  let page4 = await firefoxContext.newPage();
  page4.goto("https://www.linkedin.com/");

  await page4.waitForTimeout(3000);
});
