import React from "react";
import "./Pagination.css"

const Pagination = ({ handlePaginate, currentPage, totalPages }) => {
  return (
    <div className="paginationContainer">
      <ul className="pagination">
        <li>
          <button
            onClick={() => handlePaginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
          Prev
          </button>
        </li>
        {[...Array(totalPages).keys()].map((number) => (
          <li
            key={number + 1}
            className={number + 1 === currentPage ? "active" : ""}
          >
            <button onClick={() => handlePaginate(number + 1)}>
              {number + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePaginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
