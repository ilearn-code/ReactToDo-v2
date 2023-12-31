import React, { useEffect, useState ,useRef} from 'react'
import './assets/css/todo.css'
// import add_icon from './assets/images/'
import ToDoList from './toDoList'
import Pagination from './pagination'

const ToDo = () => {
  const recordsPerPage = 5;
  const [count, setCount]=useState(0)
const [todos , setToDos]=useState([]);
const inputRef = useRef(null);
const [currentPage , setCurrentPage]=useState(1);

const handlePageChange = (page) => {
  setCurrentPage(page);
};


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
        
      {todos.slice((currentPage-1)*recordsPerPage ,currentPage*recordsPerPage)
      .map((value , index)=>{ 

     return <ToDoList key={index} id={value.id} display={value.display} text={value.text}  setToDos={setToDos}/>

      })
    }
      </div>

          <div className="pagination"     >

            <Pagination todos={todos} handlePageChange={handlePageChange} />
          </div>
    </div>
  )
}

export default ToDo