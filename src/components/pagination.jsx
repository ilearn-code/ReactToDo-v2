import React, { useState } from 'react';
import "./assets/css/pagination.css";



const Pagination = ({ todos , handlePageChange }) => {


  const recordsPerPage = 5;


  const [currentPage, setCurrentPage] = useState(1);
 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = todos.slice(firstIndex, lastIndex);
  const npage = Math.ceil(todos.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);


  // const handlePageChange=(page)=>
  // {
  // setCurrentPage(page);
  // }


  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    handlePageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="#" onClick={()=>prePage()}>prev</a>
        </li>
        {numbers.map((value, index) => (
          <li
            className={`pageItem ${currentPage === value ? 'active' : ''}`}
            key={index}
          >
            <a href="#" onClick={() =>handlePageChange(value)}>
              {value}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={()=>nextPage()}>next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
