// @ts-check
const { test, expect } = require('@playwright/test')

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/about')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/About/)
})

test('home link', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Home' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle(/Home/)
})
