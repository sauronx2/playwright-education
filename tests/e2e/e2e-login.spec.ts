import { test, expect } from '@playwright/test'

test.describe.parallel.only('Login / Logout Flow', () => {
  // Before hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
  })
  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await page.fill('#user_login', 'some username')
    await page.fill('#user_password', 'some password')
    await page.click("//input[@value='Sign in']")

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click("//input[@value='Sign in']")
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accountSummaryTabNavBar = await page.locator("//ul[@class='nav nav-tabs']")
    await expect(accountSummaryTabNavBar).toBeVisible()

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
