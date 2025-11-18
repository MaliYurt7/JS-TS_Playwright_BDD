// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "console";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests", // Directory where tests are located
  timeout: 30 * 1000, // Global timeout for each test.if needed for a specific test, it can override this with "test.setTimeout(120000);" in the test cases (bknz PlaywrightConfigJs.spec.js)"
  retries: 1, // Hatalı testleri 1 kez tekrar dene
  expect: {
    timeout: 40 * 1000, // Timeout for expect assertions
  },

  reporter: [["html", { open: "never" }]],
  // reporter: "html", // Reporter to use for test results
  use: {
    browserName: "chromium", // Default browser to use for tests (firefox, webkit, or chromium)
    headless: false, // Run tests in headless mode (true) or headed mode
    screenshot: "on",
    trace: "on",
  },
};
module.exports = config;
