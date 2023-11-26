const { test } = require('@playwright/test')
const { mkdir } = require('node:fs/promises')
const { resolve } = require('node:path')

const authFile = 'playwright/.auth/user.json'

test('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.getByLabel('User').fill('admin')
  await page.getByLabel('Password').fill('admin')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForURL('http://localhost:3000/')
  await mkdir(resolve('playwright'), {
    recursive: true
  })
  await page.context().storageState({ path: authFile })
})
