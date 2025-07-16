import { test, expect } from '@playwright/test';
import { Navbar, NavbarTabEnum } from 'page-objects/components/Navbar';
import { HomePage } from 'page-objects/HomePage';
import { LoginPage } from 'page-objects/LoginPage';
import { TransferFundsConfirmPage } from 'page-objects/TransferFundsConfirmPage';
import { TransferFundsPage } from 'page-objects/TransferFundsPage';
import { TransferFundsVerifyPage } from 'page-objects/TransferFundsVerifyPage';

test.describe.parallel('Transfer Funds and Make Payments', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let transferFundsPage: TransferFundsPage;
  let transferFundsVerifyPage: TransferFundsVerifyPage;
  let transferFundsConfirmPage: TransferFundsConfirmPage;
  let navbar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    transferFundsPage = new TransferFundsPage(page);
    transferFundsVerifyPage = new TransferFundsVerifyPage(page);
    transferFundsConfirmPage = new TransferFundsConfirmPage(page);
    navbar = new Navbar(page);

    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Transfer funds', async () => {
    await navbar.selectNavbarTab(NavbarTabEnum.TRANSFER_FUNDS);

    await transferFundsPage.fillTransferMoneyMakePaymentsForm('2', '3', '500', 'Test message');
    await transferFundsPage.continue();

    await expect(transferFundsVerifyPage.boardHeader()).toContainText('Verify');
    await transferFundsVerifyPage.submit();

    await expect(transferFundsConfirmPage.alertSuccessMessage()).toContainText(
      'You successfully submitted your transaction',
    );
  });
});
