import { Page } from '@playwright/test';
import { Header } from '@components/header.component';

export abstract class BasePage {
  readonly header: Header;

  constructor(public page: Page) {
    this.header = new Header(page);
  }

  async visit(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

  async getInnerText(tag: string): Promise<any> {
    return await this.page.locator(tag).innerText();
  }

  async waitSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  async waitForTimeout(time: number): Promise<void> {
    await this.page.waitForTimeout(time);
  }

  async getUrl() {
    return this.page.url();
  }

}