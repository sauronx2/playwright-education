import { expect, test } from '@fixtures/fixtures';

test.describe.parallel('Filter Transactions', () => {
  test.beforeEach(async ({ page, homePage, loginPage }) => {
    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Verify the results for each account', async ({ page }) => {
    await page.click('#account_activity_tab');
    await page.selectOption('#aa_accountId', '2');
    const checkingAccount = page.locator('#all_transactions_for_account tbody tr');
    await expect(checkingAccount).toHaveCount(3);

    await page.selectOption('#aa_accountId', '4');
    const loanAccount = page.locator('#all_transactions_for_account tbody tr');
    await expect(loanAccount).toHaveCount(2);

    await page.selectOption('#aa_accountId', '6');
    const noResult = page.locator('.well');
    await expect(noResult).toBeVisible();
  });
});
