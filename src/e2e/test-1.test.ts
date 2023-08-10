import { expect, test } from '@playwright/test'

test.describe('Todo suite testing e2e', () => {
  test('Add 4 items and validate if there are 7 as total', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.getByRole('textbox', { name: 'create-todo-input' }).click()
    await page.getByRole('textbox', { name: 'create-todo-input' }).fill('New Item added')
    await page.getByRole('textbox', { name: 'create-todo-input' }).press('Enter')
    await page.getByRole('textbox', { name: 'create-todo-input' }).click()
    await page.getByRole('textbox', { name: 'create-todo-input' }).fill('Another item')
    await page.getByRole('textbox', { name: 'create-todo-input' }).press('Enter')
    await page.getByRole('textbox', { name: 'create-todo-input' }).fill('3th item')
    await page.getByRole('textbox', { name: 'create-todo-input' }).press('Enter')
    await page.getByRole('textbox', { name: 'create-todo-input' }).fill('Other By clicking')
    await page.getByRole('button', { name: 'submit-btn' }).click()

    const listItems = await page.getByRole('listitem').all()
    expect(listItems.length).toBe(7)
    await page.close()
  })
})
