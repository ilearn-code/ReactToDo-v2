import React from 'react'
import tick_icon from './assets/images/tick.png'
import not_tick_icon from './assets/images/not_tick.png'
import cross_icon from './assets/images/cross.png'
import './assets/css/toDoLists.css'
const toDoList = ({ id, display, text, setToDos }) => {

  const deleteFn=(id)=>
  {
let data=JSON.parse(localStorage.getItem("todos"));
    data=data.filter((value)=>value.id!==id)
setToDos(data);
console.log(data)
  };

  const toggle = () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        }
        else {
          data[i].display = "";
        }
        break;
      }

      // data[i].display=data[i].display===""?"line-through":"";
      // break;


    }
    setToDos(data);
  };





  return (
    <div className='toDoItems'>


      <div className={`toDoItem ${display}`} onClick={() => { toggle() }}>
        {
          display === "" ? <img src={not_tick_icon} /> : <img src={tick_icon} alt="" />
        }

        <div className="toDoText">{text}</div>
      </div>
      <img src={cross_icon} onClick={()=>{deleteFn(id)}} />
    </div>
  )
}

export default toDoList