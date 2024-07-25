import { test, expect } from '@playwright/test';
import { Login } from '@pages/login_page';
import { StorePage } from '@pages/store_page';
//const {user} = require('helper/config').selectors;

test.describe('todo pages for tests', () => {
  let login: any;
  let basket: any;
  let county: any;

  test.beforeEach(async({page}) => {
      login = new Login(page);
      await login.visit('/login');
      await login.doLogin('test', 'test');
      basket = new StorePage(page);
      let count = await basket.getCountNotesInBasket();
      if(await basket.isBasketEmpty() == false) {
        await basket.getClearBasket();
      }
      //console.log(count);
  })
  
  test.describe('Test-cases', async() => {
    test.skip('Test-case 1 - Go to empty basket', async () => {
      await basket.clickBasket();
      console.log('clicked basket!');
      await basket.goToBasket();
      expect(basket).toHaveURL('/basket');    
    })

    test('Test-case 2 - Go to basket with 1 note without discount', async () => {
      await basket.addNoteWithoutDiscount();
      let countAddedOne = await basket.getCountNotesInBasket();
      expect(countAddedOne).toEqual('1');
      await basket.clickBasket();
      await basket.clickGoToBasket();
      const urlPage = await basket.getUrl();
      expect(urlPage).toContain('/basket');  

      await basket.pause();
    })
  })


  


})

