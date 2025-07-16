import { expect, test } from '@fixtures/fixtures';
import { NavbarTabEnum } from 'page-objects/components/Navbar';

test.describe.parallel('Transfer Funds and Make Payments', () => {
  test.beforeEach(async ({ homePage, loginPage, page }) => {
    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Transfer funds', async ({ navbar, transferFundsPage, transferFundsVerifyPage, transferFundsConfirmPage }) => {
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
