// @ts-check
const { test, expect } = require('@playwright/test')

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/login')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login/)
})
