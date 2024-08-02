import { expect, Locator, Page } from '@playwright/test';

export class TransferFundsConfirmPage {
  readonly page: Page;
  readonly alertSuccesMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertSuccesMessage = page.locator("//div[@class='alert alert-success']");
  }
}
