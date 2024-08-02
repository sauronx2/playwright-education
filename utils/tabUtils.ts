import { Locator } from '@playwright/test';

export async function selectTab(tabName: string, tabEnum: any, elements: { [key: string]: Locator }) {
  const element = elements[tabName];
  if (element) {
    await element.click();
  } else {
    throw new Error(`Tab by name: ${tabName} not found in ${tabEnum}`);
  }
}
