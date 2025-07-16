import { expect, test } from '@fixtures/fixtures';

test.describe.parallel('Search Results', () => {
  test('Should find search results', async ({ page, homePage }) => {
    await homePage.visit();
    await homePage.searchFor('bank');

    const numberOfLinks = page.locator('li > a');
    await expect(numberOfLinks).toHaveCount(2);
  });
});
