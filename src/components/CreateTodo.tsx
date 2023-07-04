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
    <div>
      <input
        type="text"
        aria-label='create-todo-input'
        onKeyDown={handleKeyDown}
        ref={inputRef} />
      <button
        aria-label='submit-btn'
        onClick={addTodo}>Add</button>
    </div>
  )
}
