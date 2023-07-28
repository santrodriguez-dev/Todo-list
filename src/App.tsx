import './App.css'
import { Todos } from './components/Todos'
import { CreateTodo } from './components/CreateTodo'
import { useTodosContext } from './contexts/todo'

const App = (): JSX.Element => {
  const { handleClearAllCompleted } = useTodosContext()

  return (
    <>
      <header className="mb-5">
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">TODO</h1>
        <CreateTodo />
      </header>
      <main>
        <Todos />
      </main>

      <footer className="mt-5">
        <button
          onClick={handleClearAllCompleted}
          id='clearAllBtn'
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Borrar completados</button>
      </footer>
    </>
  )
}

export default App
