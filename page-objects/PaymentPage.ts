import { expect, Page } from '@playwright/test';

export class PaymentPage {
  constructor(private readonly page: Page) {}

  payeeSelectBox = () => this.page.locator('#sp_payee');
  payeeDetailButton = () => this.page.locator('#sp_get_payee_details');
  payeeDetail = () => this.page.locator('#sp_payee_details');
  accountSelectBox = () => this.page.locator('#sp_account');
  amountInput = () => this.page.locator('#sp_amount');
  dateInput = () => this.page.locator('#sp_date');
  descriptionInput = () => this.page.locator('#sp_description');
  submitPaymentButton = () => this.page.locator('#pay_saved_payees');
  message = () => this.page.locator('#alert_content > span');

  async createPayment() {
    await this.payeeSelectBox().selectOption('apple');
    await this.payeeDetailButton().click();
    await expect(this.payeeDetail()).toBeVisible();
    await this.accountSelectBox().click();
    await this.amountInput().fill('5000');
    await this.dateInput().fill('2021-11-09');
    await this.descriptionInput().fill('some rendom message');
    await this.submitPaymentButton().click();
  }
}
