const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

// test("test", async ({ page }) => {
//   // Go to https://netology.ru/free/management#/
//   await page.goto("https://netology.ru/free/management#/");

//   // Click a
//   await page.click("a");
//   await expect(page).toHaveURL("https://netology.ru/");

//   // Click text=Учиться бесплатно
//   await page.click("text=Учиться бесплатно");
//   await expect(page).toHaveURL("https://netology.ru/free");

//   page.click("text=Бизнес и управление");

//   // Click text=Как перенести своё дело в онлайн
//   await page.click("text=Как перенести своё дело в онлайн");
//   await expect(page).toHaveURL(
//     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
//   );
// });
test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
});
test("Неуспешная авторизация", async ({ page }) => {
  const errorEmail = "test@gmail.com";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', errorEmail);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator("[data-testid = 'login-error-hint']")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});
