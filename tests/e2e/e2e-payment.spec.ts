import { expect, test } from '@fixtures/fixtures';
import { NavbarTabEnum } from '@components/Navbar';

test.describe.parallel('New Payment', () => {
  test('Should send new payment', async ({ homePage, loginPage, paymentPage, navbar, page }) => {
    await homePage.visit();
    await homePage.signIn();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');

    await navbar.selectNavbarTab(NavbarTabEnum.PAY_BILLS);
    await paymentPage.createPayment();
    await expect(paymentPage.message()).toBeVisible();
    await expect(paymentPage.message()).toContainText('The payment was successfully submitted');
  });
});
