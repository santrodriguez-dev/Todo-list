import { useReducer } from 'react'
import { type Todo } from '../types/types'
import { mockTodos } from '../mocks/todos'

const getDataFromLS = () => {
  const data = localStorage.getItem('todos')
  return (data != null) ? JSON.parse(data) : mockTodos
}

const initialState = {
  todos: getDataFromLS()
}

enum ActionTypes {
  CREATE = 'CREATE',
  REMOVE = 'REMOVE',
  COMPLETED = 'COMPLETED',
  UPDATE_TITLE = 'UPDATE_TITLE',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
}

type Action =
  | { type: ActionTypes.CREATE, payload: { title: string } }
  | { type: ActionTypes.REMOVE, payload: { id: string } }
  | { type: ActionTypes.COMPLETED, payload: { id: string } }
  | { type: ActionTypes.UPDATE_TITLE, payload: { id: string, title: string } }
  | { type: ActionTypes.CLEAR_COMPLETED }

interface State {
  todos: Todo[]
}

const reducer = (state: State, action: Action) => {
  if (action.type === ActionTypes.CREATE) {
    const { title } = action.payload
    if (title === '') return state

    // Comprobar repetidos
    const map = new Map(state.todos.map(todo => [todo.title, true]))
    if (map.get(title) ?? false) return state

    const newTodo = { id: crypto.randomUUID(), title, completed: false }
    const todos = state.todos.concat(newTodo)
    syncWithLS(todos)
    return {
      ...state, todos
    }
  }

  if (action.type === ActionTypes.REMOVE) {
    const { id } = action.payload

    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== id)
    }
  }

  if (action.type === ActionTypes.COMPLETED) {
    const { id } = action.payload
    const todos = state.todos.map(todo => {
      if (todo.id !== id) return todo
      return { ...todo, completed: !todo.completed }
    })
    syncWithLS(todos)
    return {
      ...state,
      todos
    }
  }

  if (action.type === ActionTypes.UPDATE_TITLE) {
    const { id, title } = action.payload
    const todos = state.todos.map(todo => {
      if (todo.id !== id) return todo
      return { ...todo, title }
    })
    syncWithLS(todos)
    return {
      ...state,
      todos
    }
  }

  if (action.type === ActionTypes.CLEAR_COMPLETED) {
    const todos = state.todos.map(todo => {
      return { ...todo, completed: false }
    })
    syncWithLS(todos)
    return {
      ...state,
      todos
    }
  }
  return state
}

function syncWithLS (todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export const useTodos = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)

  return {
    handleRemoveTodo: (id: string): void => { dispatch({ type: ActionTypes.REMOVE, payload: { id } }) },
    handleAddTodo: (title: string) => { dispatch({ type: ActionTypes.CREATE, payload: { title } }) },
    handleCompleted: (id: string) => { dispatch({ type: ActionTypes.COMPLETED, payload: { id } }) },
    handleUpdateTitle: (id: string, title: string) => { dispatch({ type: ActionTypes.UPDATE_TITLE, payload: { id, title } }) },
    handleClearAllCompleted: () => { dispatch({ type: ActionTypes.CLEAR_COMPLETED }) },
    todos
  }
}
