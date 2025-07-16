import { Page } from '@playwright/test';
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
  constructor(private readonly page: Page) {}

  paySavedPayee = () => this.page.getByText(PayBillsTabEnum.PAY_SAVED_PAYEE);
  addNewPayee = () => this.page.getByText(PayBillsTabEnum.ADD_NEW_PAYEE);
  purchaseForeignCurrency = () => this.page.getByText(PayBillsTabEnum.PURCHASE_FOREIGN_CURRENCY);

  currencyDropdownSelector = () => '#pc_currency';

  todaySellRate = () => this.page.locator('#sp_sell_rate');
  amount = () => this.page.locator('#pc_amount');
  inDollars = () => this.page.locator('#pc_inDollars_true');
  otherCurrency = () => this.page.locator('#pc_inDollars_false');
  calculateCostsButton = () => this.page.locator('#pc_calculate_costs');
  purchaseButton = () => this.page.locator('#purchase_cash');
  conversionAmount = () => this.page.locator('#pc_conversion_amount');
  alertContentMessage = () => this.page.locator('#alert_content');

  async selectPayBillsTab(tabName: PayBillsTabEnum) {
    const elements = {
      [PayBillsTabEnum.PAY_SAVED_PAYEE]: this.paySavedPayee(),
      [PayBillsTabEnum.ADD_NEW_PAYEE]: this.addNewPayee(),
      [PayBillsTabEnum.PURCHASE_FOREIGN_CURRENCY]: this.purchaseForeignCurrency(),
    };
    await selectTab(tabName, PayBillsTabEnum, elements);
  }

  async selectCurrency(value: CurrencyEnum) {
    await DropdownUtils.selectOptionByEnum(this.page, this.currencyDropdownSelector(), CurrencyEnum, value);
  }

  async fillAmount(amount: string) {
    await this.amount().fill(amount);
  }

  async isInDollars(inDollars: boolean) {
    if (inDollars) {
      await this.inDollars().click();
    } else {
      await this.otherCurrency().click();
    }
  }

  async calculateCoast() {
    await this.calculateCostsButton().click();
  }

  async purchase() {
    await this.purchaseButton().click();
  }
}
