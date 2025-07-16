import { expect, test } from '@fixtures/fixtures';

test.describe.parallel('Login / Logout Flow', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
  });

  test('Negative Scenario for login', async ({ homePage, loginPage }) => {
    await homePage.signIn();
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.assertErrorMessage();
  });

  test('Positive Scenario for login + logout', async ({ page, homePage, loginPage }) => {
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
