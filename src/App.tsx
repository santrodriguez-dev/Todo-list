import './App.css'
import { Todos } from './components/Todos'
import { CreateTodo } from './components/CreateTodo'
import { useTodosContext } from './contexts/todo'

const App = (): JSX.Element => {
  const { todos, handleAddTodo, handleClearAllCompleted } = useTodosContext()

  return (
    <div>
      <header>
        <h1>TODO</h1>
        <CreateTodo saveTodo={handleAddTodo}/>
      </header>
      <Todos todos={todos}></Todos>
      <footer>
        Footer
        <button onClick={handleClearAllCompleted}>Borrar completados</button>
      </footer>
    </div>
  )
}

export default App
