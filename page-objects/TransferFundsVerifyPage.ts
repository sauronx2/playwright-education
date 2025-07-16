import { Page } from '@playwright/test';

export class TransferFundsVerifyPage {
  constructor(private readonly page: Page) {}

  boardHeader = () => this.page.locator('h2.board-header');
  cancelButton = () => this.page.locator('#btn_cancel');
  submitButton = () => this.page.locator('#btn_submit');

  async cancel() {
    await this.cancelButton().click();
  }

  async submit() {
    await this.submitButton().click();
  }
}
