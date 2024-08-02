import { Page } from '@playwright/test';

export class DropdownUtils {
  static async selectOptionByEnum<T extends object>(page: Page, selector: string, enumType: T, enumValue: T[keyof T]) {
    const optionValue = Object.keys(enumType).find(key => (enumType as any)[key] === enumValue);
    if (optionValue) {
      await page.selectOption(selector, optionValue);
    } else {
      throw new Error(`Option ${enumValue} not found in enum`);
    }
  }
}
