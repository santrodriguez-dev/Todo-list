import { useTodosContext } from '../contexts/todo'
import { Todo } from './Todo'

export const Todos: React.FC = () => {
  const { todos } = useTodosContext()
  return (
    <ul>
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
