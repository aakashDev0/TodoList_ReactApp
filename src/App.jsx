import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
   let todoString = localStorage.getItem("todos")
   if(todoString){
     let todos = JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
   }
  }, [])
  

  const saveTOLS =(params=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  })

  const handleEdit = (e,id)=>{
   let t = todos.filter(i=>i.id === id)
   setTodo(t[0].todo)
   let newTodos = todos.filter(item=>{
    return item.id!==id
   })
      setTodos(newTodos)
      saveTOLS()
  }
 
  const handleDelete = (e,id)=>{
    // alert("You are deleting this")
   let newTodos = todos.filter(item=>{
    return item.id!==id
   })
    setTodos(newTodos)
    saveTOLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id : uuidv4(),todo, isCompleted:false}])
    setTodo("")
    console.log(todos);
    saveTOLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }  
  
  const handleCheckbox = (e) => { 
    console.log(e,e.target);
    
    let id = e.target.name;
    console.log(`This id is ${id}`);
    
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
   saveTOLS()
   }

  return (
    <>
    <Navbar/>
    <div className='mx-3 md:container bg-purple-300 text-white md:mx-auto rounded-xl my-5 p-5 md:w-[55%]'>
    <div className='font-bold text-black flex flex-col gap-4'>
      <h4 className='text-2xl flex justify-center'>iTask - Manage your todos at one place</h4>
      <span className='mx-1 py-2 text-xl font-medium'>Add a todo</span>
      <input name={todo.id} onChange={handleChange} value={todo} className='rounded-md w-full px-5 py-1 font-normal' type='text'/>

      <button onClick={handleAdd} disabled = {todo.length<=3} className='rounded text-white bg-purple-600 px-3 hover:bg-violet-700 mx- w-full'>Save</button>
    </div> 
    <div className='todos my-5 gap-4'>
    {todos.length === 0 && <div className='m-5 text-red-950'>Oops!!! No todos to display</div>}
    {todos.map(item=>{

   return <div key={item.id} className='todo flex md:w-[80%] justify-between my-3'>

   <input name = {item.id} onChange={handleCheckbox} type='checkbox' checked={todo.isCompleted}></input>
   <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
   <div className='buttons flex h-full'>
    <button onClick={(e)=>{handleEdit(e,item.id)}} className='rounded bg-purple-700 p-2 py-1 hover:bg-violet-800 mx-1'><FaEdit /></button>

    <button  onClick={(e)=>{handleDelete(e,item.id)}} className='rounded bg-purple-700 p-2 py-1 hover:bg-violet-800 mx-1'><MdDelete /></button>
    </div>
    </div>
  })}

    </div>    
   </div>
    </>
  )
}

export default App
