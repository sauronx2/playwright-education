import { test, expect } from '@playwright/test'

test.describe.parallel('New Payment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click("//input[@value='Sign in']")
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.fill('#sp_amount', '5000')
    await page.fill('#sp_date', '2021-11-09')
    await page.fill('#sp_description', 'some rendom message')
    await page.click('#pay_saved_payees')

    const message = await page.locator('#alert_content')
    await expect(message).toContainText('The payment was successfully submitted')
  })
})
