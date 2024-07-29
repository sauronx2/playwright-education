import { test, expect } from '@playwright/test'

test.describe.parallel('Transfer Funds and Make Payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click("//input[@value='Sign in']")
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Transfer funds', async ({ page }) => {
    await page.click('#transfer_funds_tab')
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.fill('#tf_amount', '500')
    await page.fill('#tf_description', 'Test message')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await page.click('#btn_submit')

    const succesMessage = await page.locator("//div[@class='alert alert-success']")
    await expect(succesMessage).toContainText('You successfully submitted your transaction')
  })
})
