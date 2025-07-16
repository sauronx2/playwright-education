import { expect, test } from '@fixtures/fixtures';
import { NavbarTabEnum } from 'page-objects/components/Navbar';
import { CurrencyEnum, PayBillsTabEnum } from 'page-objects/PayBillsPage';

test.describe.parallel('Currency Exchange Form', () => {
  test.beforeEach(async ({ page, homePage, loginPage }) => {
    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Should make currency exchange', async ({ navbar, payBillsPage }) => {
    await navbar.selectNavbarTab(NavbarTabEnum.PAY_BILLS);
    await payBillsPage.selectPayBillsTab(PayBillsTabEnum.PURCHASE_FOREIGN_CURRENCY);
    await payBillsPage.selectCurrency(CurrencyEnum.EUR);

    await expect(payBillsPage.todaySellRate()).toContainText('1 euro (EUR)');
    await payBillsPage.fillAmount('1000');
    await payBillsPage.isInDollars(true);
    await payBillsPage.calculateCoast();

    await expect(payBillsPage.conversionAmount()).toContainText('1000.00 U.S. dollar (USD)');

    await payBillsPage.purchase();

    const message = payBillsPage.alertContentMessage();
    await expect.soft(message).toBeVisible();
    await expect(message).toContainText('Foreign currency cash was successfully purchased.');
  });
});
