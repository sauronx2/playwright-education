import { expect, Locator, Page, test } from '@playwright/test';

export class FeedbackPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly commentInput: Locator;
  readonly clearButton: Locator;
  readonly submitButton: Locator;
  readonly feedbackTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.subjectInput = page.locator('#subject');
    this.commentInput = page.locator('#comment');
    this.clearButton = page.locator("input[name='clear']");
    this.submitButton = page.locator("input[type='submit']");
    this.feedbackTitle = page.locator('#feedback-title');
  }

  async fillFeedbackForm(name: string, email: string, subject: string, comment: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.commentInput.fill(comment);
  }

  async resetForm() {
    await this.clearButton.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty();
    await expect(this.commentInput).toBeEmpty();
  }

  async feedbackFormSent() {
    await test.step('Check feedback form is submitted', async () => {
      await expect(this.feedbackTitle).toBeVisible();
    });
  }
}