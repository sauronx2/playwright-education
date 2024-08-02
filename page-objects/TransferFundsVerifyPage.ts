import { expect, Locator, Page } from '@playwright/test';

export class TransferFundsVerifyPage {
  readonly page: Page;
  readonly boardHeader: Locator;
  readonly cancelButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boardHeader = page.locator('h2.board-header');
    this.cancelButton = page.locator('#btn_cancel');
    this.submitButton = page.locator('#btn_submit');
  }

  async cancel() {
    await this.cancelButton.click();
  }
  async submit() {
    await this.submitButton.click();
  }
}
