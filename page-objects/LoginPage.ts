import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  userNameInput = () => this.page.locator('#user_login');
  passwordInput = () => this.page.locator('#user_password');
  subminButton = () => this.page.locator("//input[@value='Sign in']");
  errorMessage = () => this.page.locator('.alert-error');
  loginForm = () => this.page.locator('#login_form');

  async login(userName: string, password: string) {
    await this.userNameInput().fill(userName);
    await this.passwordInput().fill(password);
    await this.subminButton().click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage()).toContainText('Login and/or password are wrong.');
  }
}
