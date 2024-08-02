import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly subminButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('#user_login');
    this.passwordInput = page.locator('#user_password');
    this.subminButton = page.locator("//input[@value='Sign in']");
    this.errorMessage = page.locator('.alert-error');
  }

  async login(userName: string, password: string) {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.subminButton.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText('Login and/or password are wrong.');
  }
}
