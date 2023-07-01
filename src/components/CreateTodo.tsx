import { useRef } from 'react'

interface Props {
  saveTodo: (newTodo: string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const inputValue = inputRef.current
    if (inputValue === null) return
    if (e.key === 'Enter' && inputValue.value.trim() !== '') {
      saveTodo(inputValue.value.trim())
      inputValue.value = ''
    }
  }

  return <input
    type="text"
    onKeyDown={handleKeyDown}
    ref={inputRef} />
}
