import { BasePage } from '@pages/base_page';
import { test, Locator, Page } from '@playwright/test';

export class Login extends BasePage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameField = page.getByPlaceholder('Логин клиента');
        this.passwordField = page.getByPlaceholder('Пароль клиента');
        this.submitBtn = page.getByRole('button', {name: 'Вход'} );
    }

    async login(email: string, password: string) {
        //correct
        await test.step(`Login with credentials ${email}/${password}`, async () => {
            await this.usernameField.click();
            await this.usernameField.type(email, {delay: 100});
            await this.passwordField.click();
            await this.passwordField.type(password, {delay: 100});
            await this.submitBtn.click();
        })
    }
}