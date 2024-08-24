// Import React functions for creating context and managing state
import { createContext, useState } from "react";
// Import service functions for making API requests
import {
  addOneServise,
  deleteAllServise,
  delteOneServise,
  editOneServise,
} from "./apiServises";

// Create a Context object for the Todo application
const TodoContext = createContext();

// Define the Provider component for the TodoContext
const Provider = ({ children }) => {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  // State for managing login status
  const [login, setLogin] = useState(false);
  // State for managing overlay display
  const [overlayDisplay, setOverlayDisplay] = useState("d-none");
  // State for managing the login modal display
  const [loginModalDisplay, setLoginModalDisplay] = useState("d-flex");
  // State for managing the register modal display
  const [registerModalDisplay, setRegisterModalDisplay] = useState("d-none");

  // Function to handle setting tasks from external sources
  const handleSetTasks = (tempTasks) => {
    setTasks(tempTasks);
  };

  // Function to add a new list of tasks
  const addOne = (items) => {
    // Sort tasks by date and time
    items.sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}:00`) - new Date(`${b.date}T${b.time}:00`)
    );
    setTasks(items);
    localStorage.setItem("tasks", JSON.stringify(items));
  };

  // Function to clear all tasks and data
  const clearAll = () => {
    setTasks([]);
    localStorage.clear();
    deleteAllServise();
  };

  // Function to get data from form and add it as a new task
  const getDataFromForm = (title, desc, date, time, urgent) => {
    const newItem = {
      title,
      desc,
      date,
      time,
      urgent,
    };
    addOneServise("todos", newItem).then((data) => {
      const updatedItem = [...tasks, data.data];
      addOne(updatedItem);
    });
  };

  // Function to filter tasks based on urgency
  const filterTasks = (value = "") => {
    let tempItems = JSON.parse(localStorage.getItem("tasks"));
    if (value) {
      tempItems = tempItems.filter(
        (item) => item.urgent.toLowerCase() === value
      );
    }
    setTasks(tempItems);
  };

  // Function to delete a single task by its ID
  const deleteOne = (id) => {
    delteOneServise(id);
    const tempItems = tasks.filter((item) => item._id !== id);
    addOne(tempItems);
  };

  // Function to edit a task by its ID
  const editOne = (id, title, desc, date, time, urgent) => {
    const item = {};
    if (title) item.title = title;
    if (desc) item.desc = desc;
    if (date) item.date = date;
    if (time) item.time = time;
    if (urgent) item.urgent = urgent;
    editOneServise(id, item).then((data) => {
      const tempItems = tasks.map((item) => {
        if (item._id === id) {
          item.title = title ? title : item.title;
          item.desc = desc ? desc : item.desc;
          item.date = date ? date : item.date;
          item.time = time ? time : item.time;
          item.urgent = urgent ? urgent : item.urgent;
        }
        return item;
      });
      addOne(tempItems);
    });
  };

  // Function to toggle the overlay display between visible and hidden
  const changeOverlayDisplay = () => {
    if (overlayDisplay === "d-none") setOverlayDisplay("d-flex");
    else setOverlayDisplay("d-none");
  };

  // Function to toggle between login and register modals
  const changeModaldisplay = () => {
    if (loginModalDisplay === "d-flex") {
      setLoginModalDisplay("d-none");
      setRegisterModalDisplay("d-flex");
    } else {
      setLoginModalDisplay("d-flex");
      setRegisterModalDisplay("d-none");
    }
  };

  // Function to create a new user
  const createUser = (item) => {
    addOneServise("users", item).then((data) => {
      console.log(data);
    });
  };

  // Object containing all shared state and functions
  const sharedVars = {
    tasks,
    setTasks,
    getDataFromForm,
    filterTasks,
    clearAll,
    deleteOne,
    editOne,
    handleSetTasks,

    overlayDisplay,
    changeOverlayDisplay,

    loginModalDisplay,
    registerModalDisplay,
    changeModaldisplay,

    createUser,
    login,
    setLogin,
  };

  // Provide the context values to child components
  return (
    <TodoContext.Provider value={sharedVars}>{children}</TodoContext.Provider>
  );
};

// Export the Provider component and TodoContext object
export { Provider };
export default TodoContext;
