import { expect, Page, test } from '@playwright/test';

export class FeedbackPage {
  constructor(private readonly page: Page) {}

  nameInput = () => this.page.locator('#name');
  emailInput = () => this.page.locator('#email');
  subjectInput = () => this.page.locator('#subject');
  commentInput = () => this.page.locator('#comment');
  clearButton = () => this.page.locator("input[name='clear']");
  submitButton = () => this.page.locator("input[type='submit']");
  feedbackTitle = () => this.page.locator('#feedback-title');

  async fillFeedbackForm(name: string, email: string, subject: string, comment: string) {
    await this.nameInput().fill(name);
    await this.emailInput().fill(email);
    await this.subjectInput().fill(subject);
    await this.commentInput().fill(comment);
  }

  async resetForm() {
    await this.clearButton().click();
  }

  async submitForm() {
    await this.submitButton().click();
  }

  async assertReset() {
    await expect(this.nameInput()).toBeEmpty();
    await expect(this.commentInput()).toBeEmpty();
  }

  async feedbackFormSent() {
    await test.step('Check feedback form is submitted', async () => {
      await expect(this.feedbackTitle()).toBeVisible();
    });
  }
}
