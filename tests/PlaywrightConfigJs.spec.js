import { test, expect } from "@playwright/test";

test("çok yavaş bir test", async ({ page }) => {
  test.setTimeout(120000); // Sadece bu teste özel timeout 120 saniye

  await page.goto("https://playwright.dev/docs/test-timeouts");

  await page.waitForTimeout(10000); // Waits for 20 seconds (20000 ms)
  /** 
  Playwright'taki test timeout, bir testin tamamlanması için izin verilen maksimum süredir. Eğer test (içindeki adımlar, beforeEach/afterEach, beforeAll/afterAll hook'ları ve fixture'lar dahil) bu sürede bitmezse, Playwright testi "başarısız" olarak sonlandırır ve bir hata mesajı üretir(Timeout of 120000ms exceeded.). Varsayılan test timeout süresi 30 saniyedir, ancak bu değeri test bazında veya global olarak değiştirebilirsiniz.
  */
});
