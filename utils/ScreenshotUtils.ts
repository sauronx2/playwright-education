import { Locator, expect } from '@playwright/test';

export class ScreenshotUtils {
  static async compareScreenshotTomatchSnapshot(locator: Locator, filePath: string) {
    expect(await locator.screenshot()).toMatchSnapshot(filePath);
  }
}
