import { expect, Locator, Page } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly amount: Locator;
  readonly description: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccount = page.locator('#tf_fromAccountId');
    this.toAccount = page.locator('#tf_toAccountId');
    this.amount = page.locator('#tf_amount');
    this.description = page.locator('#tf_description');
    this.continueButton = page.locator('#btn_submit');
  }

  async fillTransferMoneyMakePaymentsForm(
    fromAccount: string,
    toAccount: string,
    amount: string,
    descriptionMessage: string,
  ) {
    await this.fromAccount.selectOption(fromAccount);
    await this.toAccount.selectOption(toAccount);
    await this.amount.fill(amount);
    await this.description.fill(descriptionMessage);
  }

  async continue() {
    await this.continueButton.click();
  }
}
