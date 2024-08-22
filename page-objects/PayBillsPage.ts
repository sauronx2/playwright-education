import { expect, Locator, Page } from '@playwright/test';
import { selectTab } from '../utils/TabUtils';
import { DropdownUtils } from '../utils/DropdownUtils';

export enum PayBillsTabEnum {
  PAY_SAVED_PAYEE = 'Pay Saved Payee',
  ADD_NEW_PAYEE = 'Add New Payee',
  PURCHASE_FOREIGN_CURRENCY = 'Purchase Foreign Currency',
}

export enum CurrencyEnum {
  SELECT_ONE = 'Select One',
  AUD = 'Australia (dollar)',
  CAD = 'Canada (dollar)',
  CHF = 'Switzerland (franc)',
  CNY = 'China (yuan)',
  DKK = 'Denmark (krone)',
  EUR = 'Eurozone (euro)',
  GBP = 'Great Britain (pound)',
  HKD = 'Hong Kong (dollar)',
  JPY = 'Japan (yen)',
  MXN = 'Mexico (peso)',
  NOK = 'Norway (krone)',
  NZD = 'New Zealand (dollar)',
  SEK = 'Sweden (krona)',
  SGD = 'Singapore (dollar)',
  THB = 'Thailand (baht)',
}

export class PayBillsPage {
  readonly page: Page;
  readonly paySavedPayee: Locator;
  readonly addNewPayee: Locator;
  readonly purchaseForeignCurrency: Locator;
  readonly currencyDropdown: string;
  readonly todaysSellRate: Locator;
  readonly amount: Locator;
  readonly inDollars: Locator;
  readonly otherCrurrency: Locator;
  readonly calculateCostsButton: Locator;
  readonly purchaseButton: Locator;
  readonly conversionAmount: Locator;
  readonly alertContentMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paySavedPayee = page.locator(`text=${PayBillsTabEnum.PAY_SAVED_PAYEE}`);
    this.addNewPayee = page.locator(`text=${PayBillsTabEnum.ADD_NEW_PAYEE}`);
    this.purchaseForeignCurrency = page.locator(`text=${PayBillsTabEnum.PURCHASE_FOREIGN_CURRENCY}`);
    this.currencyDropdown = '#pc_currency';
    this.todaysSellRate = page.locator('#sp_sell_rate');
    this.amount = page.locator('#pc_amount');
    this.inDollars = page.locator('#pc_inDollars_true');
    this.otherCrurrency = page.locator('#pc_inDollars_false');
    this.calculateCostsButton = page.locator('#pc_calculate_costs');
    this.purchaseButton = page.locator('#purchase_cash');
    this.conversionAmount = page.locator('#pc_conversion_amount');
    this.alertContentMessage = page.locator('#alert_content');
  }

  async selectPayBillsTab(tabName: PayBillsTabEnum) {
    const elements = {
      [PayBillsTabEnum.PAY_SAVED_PAYEE]: this.paySavedPayee,
      [PayBillsTabEnum.ADD_NEW_PAYEE]: this.addNewPayee,
      [PayBillsTabEnum.PURCHASE_FOREIGN_CURRENCY]: this.purchaseForeignCurrency,
    };
    await selectTab(tabName, PayBillsTabEnum, elements);
  }

  async selectCurrency(value: CurrencyEnum) {
    await DropdownUtils.selectOptionByEnum(this.page, this.currencyDropdown, CurrencyEnum, value);
  }

  async fillAmount(amount: string) {
    await this.amount.fill(amount);
  }

  async isInDollars(inDollars: boolean) {
    if (inDollars) {
      await this.inDollars.click();
    } else {
      await this.otherCrurrency.click();
    }
  }

  async calculateCoast() {
    await this.calculateCostsButton.click();
  }

  async purchase() {
    await this.purchaseButton.click();
  }
}
