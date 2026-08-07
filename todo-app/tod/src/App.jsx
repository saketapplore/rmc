import { useState } from "react"
import {useRef} from "react"
import { useEffect } from "react"
import { useMemo } from "react"

import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import Filter from "./components/Filter"
import Searchbar from "./components/Searchbar"


function App() {

 
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [input, setInput] = useState("")
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")
  const inputRef = useRef()
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos")
      if(!raw) return [];
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })

  const handleSearch = (e)=>{
    setSearch(e.target.value)
 }

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.completed).length
  const incompletedTodos = todos.filter((todo) => !todo.completed).length

const handleEdit = (todo) => {
  setEditId(todo.id)
  setEditText(todo.text)
}

const clearCompleted = () => {
  setTodos((prevTodos) =>
    prevTodos.filter((todo) => !todo.completed)
  );
};

const handleSave = () => {
  if(!editText.trim()) return
  setTodos((prevTodos) => prevTodos.map((todo) => {
    if(todo.id === editId){
      return {
        ...todo,
        text: editText.trim()
      }
    }
    return todo
  }))
  setEditId(null)
  setEditText("")
}

const handleCancel = () => {
  setEditId(null)
  setEditText("")
}

  const toggleTodo = (id) => {
    setTodos((prevTodos) => 
     prevTodos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo , 
          completed : !todo.completed
        }
      }
      return todo;
     })
    )
  }

  useEffect(() => {
     inputRef.current.focus()
  }, [])

  useEffect(() => {
     localStorage.setItem("todos" , JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input.trim() === "") {
      return
    }
     const newTodo = {
      id: new Date(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
     }
     setTodos(prevTodos => [...prevTodos, newTodo])
     setInput("")
  }

  const filteredTodos = useMemo(() => {
    
    const searchTerm = search.toLowerCase().trim()

    return todos.filter((todo) => {
      
      const matchedSearch = todo.text.toLowerCase().includes(searchTerm)
      const matchedFilter = 
      filter === "all" || 
      (filter === "completed" && todo.completed) ||
      (filter === "incomplete" && !todo.completed)

      return matchedSearch && matchedFilter
    })

  }, [todos, search, filter])

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }


 
  return (
    <>
    <h1>Todo List</h1>
  <TodoForm 
      input={input}
      inputRef={inputRef}
      setInput={setInput}
      addTodo={addTodo}
     />

    <Searchbar search={search} handleSearch={handleSearch} />

    <Filter filter={filter} setFilter={setFilter}  />

    <TodoList filteredTodos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}
    handleEdit={handleEdit}
    handleSave={handleSave}
    handleCancel={handleCancel}
    editId={editId}
    editText={editText}
    setEditText={setEditText}
    clearCompleted={clearCompleted}
    />

<button disabled={completedTodos === 0} onClick={clearCompleted}>Clear Completed</button>

 
  <footer>
    <p>Total Todos: {totalTodos}</p>
    <p>Completed Todos: {completedTodos}</p>
    <p>Incompleted Todos: {incompletedTodos}</p>
  </footer>
  </>
  )
}
export default App;
