import { test } from '@playwright/test';
import { HomePage } from 'page-objects/HomePage';
import { LoginPage } from 'page-objects/LoginPage';
import { ScreenshotUtils } from 'utils/ScreenshotUtils';

test.describe.parallel('Visual Regression Testing Example', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.signIn();
  });

  test('Login Form', async () => {
    await ScreenshotUtils.compareScreenshotToMatchSnapshot(loginPage.loginForm(), 'login-form.png');
  });

  test('Single Element Snapshot', async () => {
    await loginPage.login('Fail', 'some invalid password');
    await ScreenshotUtils.compareScreenshotToMatchSnapshot(loginPage.errorMessage(), 'login-error.png');
  });
});
