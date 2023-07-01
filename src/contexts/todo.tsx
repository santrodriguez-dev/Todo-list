import { createContext, useContext } from 'react'
import { useTodos } from '../hooks/useTodos'
import { type Todo } from '../types'

interface ContextType {
  handleAddTodo: (title: string) => void
  handleRemoveTodo: (id: string) => void
  handleCompleted: (id: string) => void
  handleClearAllCompleted: () => void
  handleUpdateTitle: (id: string, title: string) => void
  todos: Todo[]
}

const TodosContext = createContext<ContextType | null>(null)

export const useTodosContext = () => {
  const todosContext = useContext(TodosContext)
  if (todosContext == null) throw new Error('useTodosContext has to be used within <TodosContext.Provider>')
  return todosContext
}

export function TodosProvider ({ children }: { children: React.ReactNode }) {
  const todos = useTodos()

  return (
    <TodosContext.Provider value={todos}>
      {children}
    </TodosContext.Provider>
  )
}
