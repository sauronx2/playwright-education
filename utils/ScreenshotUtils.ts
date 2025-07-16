import { Locator, expect } from '@playwright/test';

export class ScreenshotUtils {
  static async compareScreenshotToMatchSnapshot(locator: Locator, filePath: string) {
    expect(await locator.screenshot()).toMatchSnapshot(filePath);
  }
}
