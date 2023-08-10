import { useState } from 'react'
import { useTodosContext } from '../contexts/todo'
import { type Todo as TodoInterface } from '../types/types'
import { RemoveIcon } from '../icons/RemoveIcon'

export const Todo: React.FC<TodoInterface> = ({ id, title, completed }) => {
  const [inputValue, setInputValue] = useState(title)

  const { handleRemoveTodo, handleCompleted, handleUpdateTitle } = useTodosContext()

  return (
    <div className="flex items-center mb-3 gap-3">
      <input
        id={id.toString()}
        type="checkbox"
        checked={completed}
        onChange={() => { handleCompleted(id) }}
        className="w-7 cursor-pointer h-7 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label
        htmlFor={id.toString()}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-full">
        <input
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value) }}
          onBlur={() => { handleUpdateTitle(id, inputValue) }}
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
      </label>
      <button
        onClick={() => { handleRemoveTodo(id) }}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-1.5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        <RemoveIcon />
      </button>
    </div>
  )
}
