import { Navbar, NavbarTabEnum } from './../../page-objects/components/Navbar';
import { test, expect } from '@playwright/test';
import { HomePage } from 'page-objects/HomePage';
import { LoginPage } from 'page-objects/LoginPage';
import { PaymentPage } from 'page-objects/PaymentPage';

test.describe.parallel('New Payment', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let paymentPage: PaymentPage;
  let navbar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    navbar = new Navbar(page);

    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Should send new payment', async ({ page }) => {
    navbar.selectNavbarTab(NavbarTabEnum.PAY_BILLS);
    await paymentPage.createPayment();
    await expect(paymentPage.message).toBeVisible();
    await expect(paymentPage.message).toContainText('The payment was successfully submitted');
  });
});
