import React, { useContext } from "react";
import Form from "./Form";
import TodoContext from "../../context/todos";

const Header = () => {
  const { getDataFromForm, filterTasks, clearAll } = useContext(TodoContext);
  const handleSearchBtns = (e) => {
    const value = e.target.id.split("_")[1];
    filterTasks(value);
  };
  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-5 bg-primary-subtle rounded-3 m-2 py-3">
      <h1 className="pb-3 text-decoration-underline">To Do App</h1>
      <div className="p-3 w-75 rounded-3">
        <Form getDataFromForm={getDataFromForm} />
      </div>
      <div className="d-flex flex-column align-items-center py-3 w-100 border-top border-dark-subtle">
        <button onClick={handleSearchBtns} className="btn btn-primary w-50 m-1">
          Show All
        </button>
        <button
          onClick={handleSearchBtns}
          className="btn btn-danger w-50 m-1"
          id="btn_extreame"
        >
          Show Extreame
        </button>
        <button
          onClick={handleSearchBtns}
          className="btn btn-warning w-50 m-1"
          id="btn_medium"
        >
          Show medium
        </button>
        <button
          onClick={handleSearchBtns}
          className="btn btn-success w-50 m-1"
          id="btn_low"
        >
          Show low
        </button>
      </div>
      <button onClick={(e) => clearAll()} className="btn btn-dark">
        Clear All Tasks
      </button>
    </div>
  );
};

export default Header;
