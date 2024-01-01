import React, { useEffect, useState, useRef } from 'react'
import './assets/css/todo.css'
// import add_icon from './assets/images/'
import ToDoList from './toDoList'
import Pagination from './pagination'

const ToDo = () => {
  const recordsPerPage = 5;
  const [count, setCount] = useState(0)
  const [todos, setToDos] = useState([]);
  const inputRef = useRef(null);
  const [isDropDownOpen, setDropDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('');

  const toggleDropdown = () => {
    setDropDown(!isDropDownOpen)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const add = () => {
    if (inputRef.current.value !== "") {
      setToDos([...todos, { id: count, text: inputRef.current.value, display: "" }]);
      inputRef.current.value = '';
      setCount(count + 1);
    }
    else {
      alert("Enter a To-do");
    }
  };

  useEffect(() => {

    setToDos(JSON.parse(localStorage.getItem("todos")) || []);



  }, []);

  useEffect(() => {
    console.log(todos);
    setTimeout(
      () => {
       localStorage.setItem("todos", JSON.stringify(todos)); 
      }, 100
    );


  }, [todos])


  return (
    <div className='container'>

      <div className="title"> To Do List
      </div>
      <div className="add">
        <input type="text" ref={inputRef} placeholder='Enter a Text' />
        <button className="addButton" onClick={() => { add() }}>
          add
        </button>

      </div>

      <div className="todoLists">
        <div className="dropDown">
          <button onClick={() => { toggleDropdown() }}>Filter</button>

          {isDropDownOpen && (<div className="dropDownItem">
            <a href="" onClick={(event) => { event.preventDefault();setSelectedFilter("line-through"); }}>completed</a>
            <a href="" onClick={(event) => {event.preventDefault(); setSelectedFilter("") }} > not completed</a>
          </div>
          )


          }


        </div>

        {todos.filter((value) => {
          if (isDropDownOpen) {
            if (value.display === "line-through" && selectedFilter === "line-through") 
            {
              
              return true;
            }
             if (value.display ==="" && selectedFilter ==="") {
              return true;

            }
            
              return false;
          
          }
          return true;
        }

        )



          .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
          .map((value, index) => {

            return <ToDoList key={index} id={value.id} display={value.display} text={value.text} setToDos={setToDos} />

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