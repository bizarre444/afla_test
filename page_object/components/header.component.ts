import { Locator, Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly mainLink: Locator;
    readonly registrationLink: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainLink = page.locator('//*[@id="navbarNav"]/ul/li[1]/a');
        this.registrationLink = page.locator('//*[@id="navbarNav"]/ul/li[2]/a');
        this.loginLink = page.locator('//*[@id="navbarNav"]/ul/li[3]/a');
    }

    async visitMain(): Promise<void> {
        await this.mainLink.click();
    }

    async visitRegistration(): Promise<void> {
        await this.registrationLink.click();
    }

    async visitLogin(): Promise<void> {
        await this.loginLink.click();
    }
}
