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
    }

    async getDiscountedNotes() {
        await this.discountCheckbox.click();
    }

    async isDiscounted(): Promise<boolean> {
        let index: number = await this.getRandomNoteNumber();
        let arrayNotes: Array<string> = await this.getAllNotes(); 
        if( arrayNotes[index] === 'note-item card h-100 hasDiscount') {
            console.log(arrayNotes[index], '- true');
            return true;
        } else {
            console.log(arrayNotes[index], '- false');
            return false;
        }
        
    }

    async getCardClass() {

    }

    async getAllNotes(): Promise<Array<string>> {
        const arrayNotes: any = await this.storePage.evaluate(() => Array.from(document.querySelectorAll('.note-list .col-3 .note-item')).map(el => el.getAttribute('class')));
        return arrayNotes;
    }

    async getRandomNoteNumber() {
        let arrayNotes: Array<string> = await this.getAllNotes(); 
        const lengthArray: number = await arrayNotes.length;
        let index: number = await Math.floor(Math.random() * lengthArray);
        return index;
    }
}