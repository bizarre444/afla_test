import { test, expect } from '@playwright/test';
import { Login } from '@components/login.component';

test('login', async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.visit('https://enotes.pointschool.ru/login');
  await loginPage.login('test', 'test');
  await loginPage.pause();
  await expect(loginPage).toBe('bbbb');
 
});

