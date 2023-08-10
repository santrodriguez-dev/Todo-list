import { beforeEach, describe, expect, it, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../App'
import { TodosProvider } from '../contexts/todo'
import { randomBetween } from '../utils/utils'

const myApp = (
  <TodosProvider>
    <App />
  </TodosProvider>
)

describe('Todo App renders properly', () => {
  beforeEach(() => {
    render(myApp)
  })

  it('Todo <app> should render', () => {
    expect(render(myApp)).toBeTruthy()
  })

  it('Should render Title correctly', () => {
    screen.getByText('TODO')
  })

  test('should render button "Borrar completados"', async () => {
    await screen.findByText('Borrar completados')
  })

  test('should render List of 3 elements', async () => {
    const listItems = await screen.findAllByRole('listitem')
    expect(listItems.length).toBe(3)
  })
})

describe('Fire events from app', () => {
  beforeEach(() => { render(myApp) })

  test('Should enter text on input', () => {
    const input: HTMLInputElement = screen.getByLabelText('create-todo-input')
    const newValueTest = 'My new todo'
    fireEvent.change(input, { target: { value: newValueTest } })
    expect(input.value).toBe(newValueTest)
  })

  test('Should create new todo task', async () => {
    global.crypto = {
      ...global.crypto,
      randomUUID: () => '5555-5555-5555-5555-5555'
    }

    const initialLen = (await screen.findAllByRole('listitem')).length

    const input: HTMLInputElement = screen.getByLabelText('create-todo-input')
    const newValueTest = 'My new todo test'
    fireEvent.change(input, { target: { value: newValueTest } })

    const button: HTMLButtonElement = screen.getByLabelText('submit-btn')
    fireEvent.click(button)

    expect((await screen.findAllByRole('listitem')).length).toBe(initialLen + 1)
  })

  test('Should delete first item', async () => {
    const initialItems = await screen.findAllByRole('listitem')
    const delButton = initialItems[0].querySelector('button')
    if (delButton === null) return
    fireEvent.click(delButton)
    expect(initialItems.length - 1).toBe((await screen.findAllByRole('listitem')).length)
  })

  test('Mark a random todo', async () => {
    const itemsList = await screen.findAllByRole('listitem')
    const randomItem = randomBetween(-1, itemsList.length)

    const checkbox = itemsList[randomItem]?.querySelector('input[type="checkbox"]') as HTMLInputElement

    const { checked } = checkbox

    fireEvent.click(checkbox)
    expect(checked).toBe(!checkbox.checked)
  })
})
