import { test } from '@fixtures/fixtures';
import { ScreenshotUtils } from 'utils/ScreenshotUtils';

test.describe.parallel('Visual Regression Testing Example', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
    await homePage.signIn();
  });

  test('Login Form', async ({ loginPage }) => {
    await ScreenshotUtils.compareScreenshotToMatchSnapshot(loginPage.loginForm(), 'login-form.png');
  });

  test('Single Element Snapshot', async ({ loginPage }) => {
    await loginPage.login('Fail', 'some invalid password');
    await ScreenshotUtils.compareScreenshotToMatchSnapshot(loginPage.errorMessage(), 'login-error.png');
  });
});
