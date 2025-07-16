import { Page } from '@playwright/test';

export class TransferFundsPage {
  constructor(private readonly page: Page) {}

  fromAccount = () => this.page.locator('#tf_fromAccountId');
  toAccount = () => this.page.locator('#tf_toAccountId');
  amount = () => this.page.locator('#tf_amount');
  description = () => this.page.locator('#tf_description');
  continueButton = () => this.page.locator('#btn_submit');

  async fillTransferMoneyMakePaymentsForm(
    fromAccount: string,
    toAccount: string,
    amount: string,
    descriptionMessage: string,
  ) {
    await this.fromAccount().selectOption(fromAccount);
    await this.toAccount().selectOption(toAccount);
    await this.amount().fill(amount);
    await this.description().fill(descriptionMessage);
  }

  async continue() {
    await this.continueButton().click();
  }
}
