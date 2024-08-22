import { test as base } from '@playwright/test';
import { FeedbackPage } from 'page-objects/FeedbackPage';
import { HomePage } from 'page-objects/HomePage';
import { LoginPage } from 'page-objects/LoginPage';
import { PayBillsPage } from 'page-objects/PayBillsPage';
import { PaymentPage } from 'page-objects/PaymentPage';
import { TransferFundsConfirmPage } from 'page-objects/TransferFundsConfirmPage';
import { TransferFundsPage } from 'page-objects/TransferFundsPage';
import { TransferFundsVerifyPage } from 'page-objects/TransferFundsVerifyPage';
import { Navbar } from 'page-objects/components/Navbar';

type Fixtures = {
  feedbackPage: FeedbackPage;
  homePage: HomePage;
  loginPage: LoginPage;
  payBillsPage: PayBillsPage;
  paymentPage: PaymentPage;
  transferFundsConfirmPage: TransferFundsConfirmPage;
  transferFundsPage: TransferFundsPage;
  transferFundsVerifyPage: TransferFundsVerifyPage;
  navbar: Navbar;
};

export const test = base.extend<Fixtures>({
  feedbackPage: async ({ page }, use) => {
    await use(new FeedbackPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  payBillsPage: async ({ page }, use) => {
    await use(new PayBillsPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  transferFundsConfirmPage: async ({ page }, use) => {
    await use(new TransferFundsConfirmPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
  transferFundsVerifyPage: async ({ page }, use) => {
    await use(new TransferFundsVerifyPage(page));
  },
  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
});

export { expect } from '@playwright/test';
