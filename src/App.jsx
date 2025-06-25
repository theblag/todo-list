import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import bgi from './components/pictures/background.png'
import pbgi from './components/pictures/portraitbg.png'
import './App.css'

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const[showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS();
  }

  const handleAdd = () => {
    let myuuid = uuidv4();
    let newTodos = [...todos, { id: myuuid, todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      
      <Navbar />
      <div className="bgimage md:h-[88.2vh] h-[94.6vh] relative overflow-y-scroll">
        <div className="flex justify-center items-center">
          <div className="container mx-auto rounded-xl p-5 px-9 bg-white bg-opacity-40 z-10 absolute m-10 w-[90%] md:w-[60vw] top-0 overflow-y-scroll min-h-[80%] max-h-[90%] shadow-xl">
            <div className="addTodo">
              <h1 className='text-4xl text-green-900 p-3 font-bold my-2 fancy'>Add a Todo</h1>
              <input onChange={handleChange} value={todo} type='text' placeholder="Enter your task here" className='input-box w-28 md:w-[87%] rounded-2xl p-1 px-3 border-green-700 border' />
              <button onClick={handleAdd} disabled={todo.length<1}   className='disabled:bg-green-700 bg-green-700 text-white font-bold hover:bg-green-600 px-3 py-0.5 rounded-md mx-6'>Save</button>
            </div>
            <div className='py-3'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} /><span className='fancy ml-3 text-green-900'>Show Finished</span>
            </div>
            <h2 className='text-lg font-bold fancy text-green-900 pt-3'>Your Tasks</h2>
            <div className="todos childish text-xl">
              {todos.length === 0 && <div className='text-center text-lg font-bold fancy'>You are done with all the tasks</div>}
              {todos.map(item => {
                return ((showFinished || !item.isCompleted) &&
                  <div key={item.id} className="todo border border-green-200 border-x-0 pb-3 border-t-0  flex items-center justify-between my-3 w-full">
                    <div className='flex items-center gap-5'>
                      <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                    </div>
                    
                    <div className="buttons flex gap-2 h-full ">
                      <button onClick={(e) => { handleEdit(e, item.id) }} className='edit bg-green-700 text-white font-bold hover:bg-green-600 px-3 py-1 rounded-md'><span class="material-symbols-outlined pt-[5px]">edit</span></button>
                      <button onClick={(e) => { handleDelete(e, item.id) }} className='delete bg-green-700 text-white font-bold hover:bg-green-600 px-3 py-1 rounded-md'><span class="material-symbols-outlined pt-[5px]">delete</span></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App