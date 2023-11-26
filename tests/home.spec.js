// @ts-check
const { test, expect } = require('@playwright/test')

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home/)
})

test('about link', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Click the get started link.
  await page.getByRole('link', { name: 'About' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle(/About/)
})
