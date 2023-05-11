import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // run on page load 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    
    if(storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  // run on change in todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) 

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(!name) return

    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete:false}] // spread and add
    })
    console.log(name)
    todoNameRef.current.value = null
  }

    function handleClearTodos(e) {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />    
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add a Todo</button>
    <button onClick={handleClearTodos}> Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
