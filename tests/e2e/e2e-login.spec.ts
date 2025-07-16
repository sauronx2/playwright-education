import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe.parallel('Login / Logout Flow', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
  });

  test('Negative Scenario for login', async ({ page }) => {
    await homePage.signIn();
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.assertErrorMessage();
  });

  test('Positive Scenario for login + logout', async ({ page }) => {
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');

    const accountSummaryTabNavBar = page.locator("//ul[@class='nav nav-tabs']");
    await expect(accountSummaryTabNavBar).toBeVisible();

    const accountSummaryTab = page.locator('#account_summary_tab');
    await expect(accountSummaryTab).toBeVisible();

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
