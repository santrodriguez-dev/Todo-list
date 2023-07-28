import { useRef } from 'react'
import { useTodosContext } from '../contexts/todo'

export const CreateTodo: React.FC = () => {
  const { handleAddTodo } = useTodosContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const input = inputRef.current
    if (input === null) return
    if (e.key === 'Enter' && input.value.trim() !== '') {
      handleAddTodo(input.value.trim())
      input.value = ''
    }
  }

  const addTodo = () => {
    const input = inputRef.current
    if (input === null) return
    handleAddTodo(input.value.trim())
    input.value = ''
  }

  return (
    <div className="flex justify-between items-center gap-4">
      <input type="text"
        id="first_name"
        onKeyDown={handleKeyDown}
        aria-label='create-todo-input'
        ref={inputRef}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Agregar detalles"
        required />
      <button type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        aria-label='submit-btn'
        onClick={addTodo}>Add</button>
    </div>
  )
}
