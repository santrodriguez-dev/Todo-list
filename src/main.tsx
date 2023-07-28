import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosProvider } from './contexts/todo.tsx'

const app = (
  <TodosProvider>
    <App />
  </TodosProvider>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(app)
