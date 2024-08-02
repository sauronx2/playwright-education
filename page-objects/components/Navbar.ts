import { expect, Locator, Page } from '@playwright/test';
import { selectTab } from 'utils/tabUtils';

export enum NavbarTabEnum {
  ACCOUNT_SUMMARY = 'Account Summary',
  ACCOUNT_ACTIVITY = 'Account Activity',
  TRANSFER_FUNDS = 'Transfer Funds',
  PAY_BILLS = 'Pay Bills',
  MY_MONEY_MAP = 'My Money Map',
  ONLINE_STATEMENTS = 'Online Statements',
}

export class Navbar {
  readonly page: Page;
  readonly accountSummary: Locator;
  readonly accountActivity: Locator;
  readonly transferFunds: Locator;
  readonly payBills: Locator;
  readonly myMoneyMap: Locator;
  readonly onlineStatements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSummary = page.locator('#account_summary_tab');
    this.accountActivity = page.locator('#account_activity_tab');
    this.transferFunds = page.locator('#transfer_funds_tab');
    this.payBills = page.locator('#pay_bills_tab');
    this.myMoneyMap = page.locator('#money_map_tab');
    this.onlineStatements = page.locator('#online_statements_tab');
  }
  async selectNavbarTab(tabName: NavbarTabEnum) {
    const elements = {
      [NavbarTabEnum.ACCOUNT_SUMMARY]: this.accountSummary,
      [NavbarTabEnum.ACCOUNT_ACTIVITY]: this.accountActivity,
      [NavbarTabEnum.TRANSFER_FUNDS]: this.transferFunds,
      [NavbarTabEnum.PAY_BILLS]: this.payBills,
      [NavbarTabEnum.MY_MONEY_MAP]: this.myMoneyMap,
      [NavbarTabEnum.ONLINE_STATEMENTS]: this.onlineStatements,
    };
    await selectTab(tabName, NavbarTabEnum, elements);
  }
}
