import { expect, test } from '@fixtures/fixtures';
import { ScreenshotUtils } from 'utils/ScreenshotUtils';

test.describe.parallel('Visual Regression Testing Example', () => {
  test('Full Page Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    const pageElement = page.locator('h1');

    await ScreenshotUtils.compareScreenshotToMatchSnapshot(pageElement, 'page-title.png');
  });
});
