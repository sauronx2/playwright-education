import { test, expect } from '@playwright/test';
import { HomePage } from 'page-objects/HomePage';
import { FeedbackPage } from 'page-objects/FeedbackPage';

test.describe.parallel('Feedback Form', () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);

    await homePage.visit();
    await homePage.openFeedbackLink();
  });

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'some name',
      'some email@email.com',
      'some subject',
      'some nice comment about the application',
    );
    await feedbackPage.resetForm();
    await feedbackPage.assertReset();
  });

  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'some name',
      'some email@email.com',
      'some subject',
      'some nice comment about the application',
    );
    await feedbackPage.submitForm();
    await feedbackPage.feedbackFormSent();
  });
});
