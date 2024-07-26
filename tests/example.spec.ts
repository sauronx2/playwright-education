import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test.describe.parallel.only('My first test suite', () => {
  test.skip('Selectors', async ({ page }) => {
    // text
    await page.click('text=some text')

    // Css selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    // Only visible Css Selector
    await page.click('.submit-button:visible')

    // Combinations
    await page.click('#username .first')

    // Combinations
    await page.click('//button')
  })

  test('Working with Inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.fill('#user_login', 'some username')
    await page.fill('#user_password', 'some password')
    await page.click("//input[@value='Sign in']")

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions @myTag', async ({ page }) => {
    const url: string = 'https://www.example.com'
    const title: string = 'Example Domain'
    await page.goto(url)
    await expect(page).toHaveURL(url)
    await expect(page).toHaveTitle(title)

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText(title)
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })

  test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
  })

  test('Clickin on Elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text= Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })

  test('Screenshots', async ({ page }) => {
    await page.screenshot({
      path: 'screenshots/screenshot.png',
      fullPage: true,
    })
  })

  test('Single emelent Screenshot', async ({ page }) => {
    const element = await page.$('h1')
    await element?.screenshot({ path: 'screenshots/single_element_screenshot.png' })
  })

  test('Custom Helpers', async ({ page }) => {
    await loadHomePage(page)
    await assertTitle(page)
  })
})

// test.describe.parallel.only('Hooks', () => {})
