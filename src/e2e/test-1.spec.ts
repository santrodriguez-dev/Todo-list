import { expect, test } from '@playwright/test'

test.describe('Todo suite testing e2e', () => {
  test('Add and remove items', async ({ page }) => {
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
    await page.getByRole('checkbox', { name: '3th item' }).check()
    await page.locator('li:nth-child(5) > label > .edit').click()
    await page.getByRole('checkbox', { name: 'Another item' }).check()
    await page.locator('li:nth-child(4)').click()
    await page.getByRole('checkbox', { name: 'New Item added' }).check()
    await page.locator('li:nth-child(7) > .destroy').click()
    await page.getByRole('button', { name: 'Borrar completados' }).click()
    const listItems = await page.getByRole('listitem').all()
    expect(listItems.length).toBe(6)
    await page.close()
  })
})