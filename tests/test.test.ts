import { test, expect, request } from '@playwright/test';
import { Login } from '@pages/login_page';
import { StorePage } from '@pages/store_page';
const { webkit } = require('playwright');

test.describe('todo pages for tests', () => {
  let login: any;
  let basket: any;

  test.beforeEach(async({page}) => {
    const browser = await webkit.launch({ headless: true });
    const context = await browser.newContext();
    await context.clearCookies();
    page = await context.newPage();
      login = new Login(page);
      await login.visit('/login');
      await login.doLogin('test', 'test');
      basket = new StorePage(page);
      let count = await basket.getCountNotesInBasket();
  })

  test.afterEach(async () => {
    //await basket.getClearBasket();
  })
  
  test.describe('Test-cases', async() => {
    test('Test-case 1 - Go to empty basket', async () => {
      await basket.clickBasket();
      await basket.clickGoToBasket();
      expect(basket).toHaveURL('/basket');    
    })

    test('Test-case 2 - Go to basket with 1 note without discount', async () => {
      let countBeforeTest = await basket.getCountNotesInBasket();
      if(countBeforeTest > 0) {
        await basket.getClearBasket();
      }
      await basket.addNoteWithoutDiscount();
      let countAddedOne = await basket.getCountNotesInBasket();
      expect(countAddedOne).toEqual('1');
      await basket.clickBasket();
      await basket.clickGoToBasket();
      const urlPage = await basket.getUrl();
      expect(urlPage).toContain('/basket');  
    })

    test('Test-case 3 - Go to basket with 1 note with discount', async () => {
      let countBeforeTest = await basket.getCountNotesInBasket();
      if(countBeforeTest > 0) {
        await basket.getClearBasket();
      }
      await basket.addNoteWithDiscount();
      let countAddedOne = await basket.getCountNotesInBasket();
      expect(countAddedOne).toEqual('1');
      await basket.clickBasket();
      await basket.clickGoToBasket();
      const urlPage = await basket.getUrl();
      expect(urlPage).toContain('/basket');  
    })

    test('Test-case 4 - Go to basket with 9 different notes', async() => {
      let countBeforeTest = await basket.getCountNotesInBasket();
      if(countBeforeTest > 0) {
        await basket.getClearBasket();
      }
      await basket.addDifferentNineNotes();
      let countAddedOne = await basket.getCountNotesInBasket();
      expect(countAddedOne).toEqual('9');
      await basket.clickBasket();
      const urlPage = await basket.getUrl();
      expect(urlPage).toContain('/basket'); 
    })

    test('Test-case 5 - Go to basket with 9 same notes', async() => {
      let countBeforeTest = await basket.getCountNotesInBasket();
      if(countBeforeTest > 0) {
        await basket.getClearBasket();
      }
      await basket.addNineNotes();
      let countAddedOne = await basket.getCountNotesInBasket();
      expect(countAddedOne).toEqual('9');
      await basket.clickBasket();
      const urlPage = await basket.getUrl();
      expect(urlPage).toContain('/basket'); 
    })
  })

})

