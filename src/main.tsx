import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosProvider } from './contexts/todo.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <TodosProvider>
        <App />
    </TodosProvider>
)
