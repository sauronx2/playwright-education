import { Locator, Page } from '@playwright/test';
import { selectTab } from 'utils/TabUtils';

export enum NavbarTabEnum {
  ACCOUNT_SUMMARY = 'Account Summary',
  ACCOUNT_ACTIVITY = 'Account Activity',
  TRANSFER_FUNDS = 'Transfer Funds',
  PAY_BILLS = 'Pay Bills',
  MY_MONEY_MAP = 'My Money Map',
  ONLINE_STATEMENTS = 'Online Statements',
}

export class Navbar {
  constructor(private readonly page: Page) {}

  accountSummary = () => this.page.locator('#account_summary_tab');
  accountActivity = () => this.page.locator('#account_activity_tab');
  transferFunds = () => this.page.locator('#transfer_funds_tab');
  payBills = () => this.page.locator('#pay_bills_tab');
  myMoneyMap = () => this.page.locator('#money_map_tab');
  onlineStatements = () => this.page.locator('#online_statements_tab');

  async selectNavbarTab(tabName: NavbarTabEnum) {
    const elements: Record<NavbarTabEnum, Locator> = {
      [NavbarTabEnum.ACCOUNT_SUMMARY]: this.accountSummary(),
      [NavbarTabEnum.ACCOUNT_ACTIVITY]: this.accountActivity(),
      [NavbarTabEnum.TRANSFER_FUNDS]: this.transferFunds(),
      [NavbarTabEnum.PAY_BILLS]: this.payBills(),
      [NavbarTabEnum.MY_MONEY_MAP]: this.myMoneyMap(),
      [NavbarTabEnum.ONLINE_STATEMENTS]: this.onlineStatements(),
    };

    await selectTab(tabName, NavbarTabEnum, elements);
  }
}
