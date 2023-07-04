import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'

test('has at least 3 items', async ({ page }) => {
  await page.goto(LOCALHOST_URL)
  const items = await page.getByRole('listitem').all()
  expect(items.length).toBe(3)
})

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)
  const heading = page.getByRole('heading')
  await expect(heading).toContainText(/#TODO App/)
})
