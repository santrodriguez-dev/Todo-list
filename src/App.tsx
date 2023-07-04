import './App.css'
import { Todos } from './components/Todos'
import { CreateTodo } from './components/CreateTodo'
import { useTodosContext } from './contexts/todo'

const App = (): JSX.Element => {
  const { handleClearAllCompleted } = useTodosContext()

  return (
    <div>
      <header>
        <h1>#TODO App</h1>
        <CreateTodo />
      </header>
      <main>
        <Todos />
      </main>

      <footer>
        Footer
        <button onClick={handleClearAllCompleted} id='clearAllBtn'>Borrar completados</button>
      </footer>
    </div>
  )
}

export default App
