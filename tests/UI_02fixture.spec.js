"use strict";
import { test } from "@playwright/test";

//{browser}=> it should be written within {} and then it is recognized as a playwright fixture parameter(global variables as it is valid whole project). If you write it without {}, it will be recognized as a String.
test("browser Context decleration Test practice", async ({ browser }) => {
  const context = await browser.newContext(); // Create a new browser (Like incognito mode in Chrome) context based on the browser that is defined in playwright.config.js.In the future, we can use this context to open pages, set cookies, plugings etc. (So that,we do not use login credentials in every test).

  //Now we can use this context to open pages
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("page Context decleration Test practice", async ({ page }) => {
  // we do not need these 2 lines below because we are not incejection anything to NewContext. so that we can use the page fixture directly.
  // const context = await browser.newContext();
  // const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// Note: browser and page are Playwright fixtures. Fixtures are used to set up the environment for tests, such as launching browsers, creating pages, and managing test data. Playwright provides several built-in fixtures that can be used directly in test functions.
// You can also create custom fixtures to extend the functionality of your tests. Fixtures help ensure that tests are isolated and can run independently of each other.
// More about Playwright fixtures: https://playwright.dev/docs/test-fixtures

// Note: In the above test cases, we did not use "test.setTimeout(120000);" to override the global timeout of 30 seconds that is defined in playwright.config.js because navigating to this page is very fast and it does not require more than 30 seconds. But if you want to test a page that takes longer than 30 seconds to load, you can use "test.setTimeout(120000);" within the test case to increase the timeout for that specific test.
/* 
Playwright’ta fixture, bir testin başlamadan önce ihtiyaç duyduğu ortamı veya veriyi hazırlayan, test sırasında kullanılacak nesne veya ayarlamadır. Fixture’lar her test için ayrı ayrı hazırlanır ve testin sonunda temizlenir. Örneğin, bir web sayfasına bağlanmak, oturum açmak, veya belirli bir veri setini oluşturmak gibi işlemler genellikle fixture olarak tanımlanır.


    Fixture, “her test başlamadan önce gerekli hazırlığı yapan yardımcı” demektir.

    Testin içinde, örneğin { page } yazarak Playwright’ın sana yeni bir web sayfası nesnesi hazırlamasını istersin.

    Böylece testler arasında karışıklık olmadan, her biri için temiz bir başlangıç ortamı elde edersin.

Sık Kullanılan Fixture Örnekleri

    { page }: Test için açılmış, temiz bir tarayıcı sayfası.

    { browser }: Aktif kullanılan tarayıcı nesnesi.

    { context }: Tarayıcıda oturum (çerezler, ayarlar) gibi özelliklerin tutulduğu ortam.

    { request }: API testlerinde kullanılacak ağ isteği nesnesi.

Neden Kullanılır?

    Tekrarlayan kodları ve ortam ayarlamalarını bir yerde toplar, ayrı testler için ayrı ayrı hazırlık yapmak gerekmez.

    Testlerin kolayca tekrar edilebilmesini, güvenli ve tutarlı şekilde çalışmasını sağlar.

Kısaca, Playwright’ta fixture, her testi gerektiği gibi hazırlayan ve izole eden “kurulum yardımcısı”dır — testlerin daha temiz, profesyonel ve tekrar kullanılabilir olmasını sağlar.

*/
