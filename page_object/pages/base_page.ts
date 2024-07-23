import test, { Page } from '@playwright/test';
import { Header } from '@components/header.component';

export abstract class BasePage {
  readonly header: Header;

  constructor(public page: Page) {
    this.header = new Header(page);
  }

  async visit(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

}