import { test } from '@fixtures/fixtures';

test.describe.parallel('Feedback Form', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
    await homePage.openFeedbackLink();
  });

  test('Reset feedback form', async ({ feedbackPage }) => {
    await feedbackPage.fillFeedbackForm(
      'some name',
      'some email@email.com',
      'some subject',
      'some nice comment about the application',
    );
    await feedbackPage.resetForm();
    await feedbackPage.assertReset();
  });

  test('Submit feedback form', async ({ feedbackPage }) => {
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
