import React, { useEffect, useState ,useRef} from 'react'
import './assets/css/todo.css'
// import add_icon from './assets/images/'
import ToDoList from './toDoList'

const ToDo = () => {

  const [count, setCount]=useState(0)
const [todos , setToDos]=useState([]);
const inputRef = useRef(null);

const add=()=>{
if(inputRef.current.value!=="")
{
  setToDos([...todos,{id:count , text:inputRef.current.value, display:""}]);
 inputRef.current.value='';
 setCount(count+1);
}
else
{
  alert("Enter a To-do");
}
};

useEffect(()=>
{

    setToDos(JSON.parse(localStorage.getItem("todos"))||[]);



},[]);

useEffect(()=>{
console.log(todos);
setTimeout(
  ()=>{localStorage.setItem("todos", JSON.stringify(todos));}, 100
);


},[todos])


  return (
    <div className='container'>

      <div className="title"> To Do List
      </div>
      <div className="add">
        <input type="text" ref={inputRef} placeholder='Enter a Text' />
        <button className="addButton" onClick={()=>{add()}}>
          add
        </button>

      </div>

      <div className="todoLists">
        
      {todos.map((value , index)=>{ 

     return <ToDoList key={index} id={value.id} display={value.display} text={value.text}  setToDos={setToDos}/>

      })
    }
      </div>


    </div>
  )
}

export default ToDo