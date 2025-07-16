import { Page } from '@playwright/test';

export class TransferFundsConfirmPage {
  constructor(private readonly page: Page) {}

  alertSuccessMessage = () => this.page.locator("//div[@class='alert alert-success']");
}
