import { useState } from 'react'
import { useTodosContext } from '../contexts/todo'
import { type Todo as TodoInterface } from '../types'

export const Todo: React.FC<TodoInterface> = ({ id, title, completed }) => {
  const [inputValue, setInputValue] = useState(title)

  const { handleRemoveTodo, handleCompleted, handleUpdateTitle } = useTodosContext()

  const handleKeyDown = () => {

  }

  return (
    <div>
      <input
        id={id.toString()}
        type="checkbox"
        checked={completed}
        onChange={() => { handleCompleted(id) }} />
      <label htmlFor={id.toString()}>
        <input
        className='edit'
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { handleUpdateTitle(id, inputValue) }}
        // ref={inputEditTitle}
      />
      </label>
      <button className='destroy' onClick={() => { handleRemoveTodo(id) }}>Eliminar</button>
    </div>
  )
}
