import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base_page';

export class StorePage extends BasePage {
    readonly storePage: Page;
    readonly searchName: Locator;
    readonly typeDropdown: Locator;
    readonly brandInput: Locator;
    readonly priceFrom: Locator;
    readonly priceTo: Locator;
    readonly discountCheckbox: Locator;
    readonly allNotes: Locator;
    readonly basketDropdownOpen: Locator;
    readonly basketDropdown: Locator;
    readonly goToBasket: Locator;
    readonly clearBasket: Locator;
    readonly countInBasket: string;

    constructor(page: Page) {
        super(page);
        this.storePage = page;
        this.searchName = page.getByPlaceholder('Поиск по названию');
        this.typeDropdown = page.getByPlaceholder('Тип');
        this.brandInput = page.getByPlaceholder('Бренд');
        this.priceFrom = page.locator('/html/body/div/div[1]/div/div[1]/form/div[1]/div[4]/div/input[1]');
        this.priceTo = page.locator('/html/body/div/div[1]/div/div[1]/form/div[1]/div[4]/div/input[2]');
        this.discountCheckbox = page.getByLabel('Показать только со скидкой');
        this.allNotes = page.locator('.note-list row');
        this.basketDropdownOpen = page.locator('#dropdownBasket');
        this.basketDropdown = page.locator('.dropdown-menu dropdown-menu-right show');
        this.goToBasket = page.getByRole('button', {name: 'Перейти в корзину'});
        this.clearBasket = page.getByRole('button', {name: 'Очистить корзину'});
        this.countInBasket = '//*[@id="basketContainer"]/span';
    }

    async showNotesWithDiscount() {
        await this.discountCheckbox.click();
    }

    async getIndexNoteWithDiscount(): Promise<any> {
        let arrayNotes: Array<string> = await this.getAllNotes(); 
        for(let i = 0; i < arrayNotes.length; i++) {
            if( arrayNotes[i] === 'note-item card h-100 hasDiscount') {
                return i;
            } else {
                continue;
            }
        }
    }

    async getIndexNoteWithoutDiscount(): Promise<any> {
        let arrayNotes: Array<string> = await this.getAllNotes(); 
        for(let i = 0; i < arrayNotes.length; i++) {
            if( arrayNotes[i] === 'note-item card h-100') {
                return i;
            } else {
                continue;
            }
        }
    }

    async getCardClass() {

    }

    async getAllNotes(): Promise<Array<string>> {
        const arrayNotes: any = await this.storePage.evaluate(() => Array.from(document.querySelectorAll('.note-list .col-3 .note-item')).map(el => el.getAttribute('class')));
        return arrayNotes;
    }

    async getCountNotesInBasket(): Promise<any> {
        (await this.storePage.waitForSelector(this.countInBasket)).isVisible();
        let count = await this.storePage.locator('#basketContainer > span').innerText();
        return count;
    }

    async isBasketEmpty(): Promise<boolean> {
        let count = await this.getCountNotesInBasket();
        if(await count == '0') {
            return true;
        } else {
            return false;
        }
    }

    async clickBasket() {
        await this.basketDropdownOpen.click();
        await this.goToBasket.isVisible();
        //console.log('visible');
    }

    async getClearBasket() {
        await this.basketDropdownOpen.click();
        await this.basketDropdown.isVisible();
        await this.clearBasket.click();
    }

    async clickGoToBasket() {
        //await this.basketDropdownOpen.click();
        await this.basketDropdown.isVisible();
        await this.goToBasket.click();
    }

    async addNoteWithoutDiscount() {
        let indexNote = await this.getIndexNoteWithoutDiscount();
        let locator = '//html/body/div/div[1]/div/div[2]/div[' + indexNote + ']/div/div[2]/button';
        await this.storePage.locator(locator).click();
        await this.storePage.waitForTimeout(1000);
    }

}
/*

without(2)
/html/body/div/div[1]/div/div[2]/div[2]/div/div[2]/button

without(4)
/html/body/div/div[1]/div/div[2]/div[4]/div/div[2]/button


*/