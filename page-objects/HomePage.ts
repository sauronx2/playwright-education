import { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  signInButton = () => this.page.locator('#signin_button');
  searchBox = () => this.page.locator('#searchTerm');
  linkFeedback = () => this.page.locator('#feedback');

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/');
  }

  async signIn() {
    await this.signInButton().click();
  }

  async openFeedbackLink() {
    await this.linkFeedback().click();
  }

  async searchFor(phrase: string) {
    await this.searchBox().fill(phrase);
    await this.page.keyboard.press('Enter');
  }
}
