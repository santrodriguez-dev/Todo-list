import { useTodosContext } from '../contexts/todo'
import { Todo } from './Todo'

import { useAutoAnimate } from '@formkit/auto-animate/react'

export const Todos: React.FC = () => {
  const [animationParent] = useAutoAnimate()
  const { todos } = useTodosContext()
  return (
    <ul ref={animationParent}>
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        </li>
      ))}
    </ul>
  )
}
