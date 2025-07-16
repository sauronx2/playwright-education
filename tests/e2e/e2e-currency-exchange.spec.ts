import { test, expect } from '@playwright/test';
import { Navbar, NavbarTabEnum } from 'page-objects/components/Navbar';
import { HomePage } from 'page-objects/HomePage';
import { LoginPage } from 'page-objects/LoginPage';
import { CurrencyEnum, PayBillsPage, PayBillsTabEnum } from 'page-objects/PayBillsPage';

test.describe.parallel('Currency Exchange Form', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let payBillsPage: PayBillsPage;
  let navbar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    payBillsPage = new PayBillsPage(page);
    navbar = new Navbar(page);

    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Should make currency exchange', async ({ page }) => {
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
