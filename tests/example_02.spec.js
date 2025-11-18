"use strict";
import { expect, test } from "@playwright/test";

/* very important topics */

test("https://rahulshettyacademy.com/client", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await expect(page).toHaveTitle("Let's Shop");

  //const setEmail = page.locator("#userEmail");
  const setEmail = page.getByPlaceholder("email@example.com");
  const setPassword = page.getByPlaceholder("enter your passsword");
  const loginBtn = page.locator("#login");

  await setEmail.fill("mali7yurt@gmail.com");
  await setPassword.fill("Udemy123");
  await loginBtn.click();

  // await page.waitForLoadState("networkidle"); // Wait for the page to load completely. But sometimes it can cause flaky tests.Please check the note below.

  await page.locator("div.card-body b").first().waitFor(); // this waits for the first element to be visible before proceeding. it is more reliable than waitForLoadState in many cases and dynamically waits for the element to be ready.

  console.log(await page.locator("div.card-body b").allTextContents());
});

/*

Başka loadState seçenekleri:

    'load': Sayfanın load eventi tetiklenene kadar bekler (sayfa kaynaklarının yüklenmesi tamamlandığında).

    'domcontentloaded': DOM içeriği tamamen yüklendiğinde bekler (resimler veya diğer kaynakların tamamen yüklenmesini beklemez).

    'networkidle': Ağ bağlantıları 500 ms boyunca durduğunda bekler (daha "tam" yüklenme).

Neden önemli?

    Testlerde otomatik olarak sayfanın tam yüklendiğinden emin olmak için kullanılır.

    Böylece, sayfa yüklenmeden işlem yapmaya çalışıp hata alma veya testlerin tutarsız (flaky) olması önlenir.

Önemli Notlar:

Playwright dokümantasyonu 'networkidle' durumunun kullanılmasını çoğu zaman önermemekte, çünkü bazı sayfalarda sürekli arka plan istekleri olabilir ve sonsuz beklemelere yol açabilir. Onun yerine, genellikle belirli elementlerin görünmesini veya kullanıcı aksiyonuna göre beklemeler yapılması tavsiye edilir.

Özet
Kullanım	                                  Ne Bekler?
page.waitForLoadState('load')	              Sayfa tamamen yüklendi (load olayı)
page.waitForLoadState('domcontentloaded')	   DOM tamamen yüklendi
page.waitForLoadState('networkidle')	        Ağ istekleri en az 500ms boyunca durdu
*/
