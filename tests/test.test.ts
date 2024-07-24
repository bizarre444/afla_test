import { test, expect } from '@playwright/test';
import { Login } from '@pages/login_page';
import { StorePage } from '@pages/store_page';

test('login', async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.visit('/login');
  await loginPage.login('test', 'test');
  //await loginPage.pause();
  //await expect(loginPage).toBe('bbbb');
  const store = new StorePage(page);
  await store.waitForTimeout(2000);
  // let notes = await store.getAllNotes();
  // console.log(notes);
  let noteIndex = await store.isDiscounted();
  console.log(noteIndex);
});

