import { createContext, useState } from "react";
import {
  addOneServise,
  deleteAllServise,
  delteOneServise,
  editOneServise,
} from "./apiServises";

const TodoContext = createContext();

const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [login, setLogin] = useState(false);
  const [overlayDisplay, setOverlayDisplay] = useState("d-none");
  const [loginModalDisplay, setLoginModalDisplay] = useState("d-flex");
  const [registerModalDisplay, setRegisterModalDisplay] = useState("d-none");

  // const generateRandomId = () => {
  //   return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  // };

  const handleSetTasks = (tempTasks) => {
    setTasks(tempTasks);
  };

  const addOne = (items) => {
    items.sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}:00`) - new Date(`${b.date}T${b.time}:00`)
    );
    setTasks(items);
    localStorage.setItem("tasks", JSON.stringify(items));
  };

  const clearAll = () => {
    setTasks([]);
    localStorage.clear();
    deleteAllServise();
  };

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

  const filterTasks = (value = "") => {
    let tempItems = JSON.parse(localStorage.getItem("tasks"));
    if (value) {
      tempItems = tempItems.filter(
        (item) => item.urgent.toLowerCase() === value
      );
    }
    setTasks(tempItems);
  };

  const deleteOne = (id) => {
    delteOneServise(id);
    const tempItems = tasks.filter((item) => item._id !== id);
    addOne(tempItems);
  };

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

  const changeOverlayDisplay = () => {
    if (overlayDisplay === "d-none") setOverlayDisplay("d-flex");
    else setOverlayDisplay("d-none");
  };

  const changeModaldisplay = () => {
    if (loginModalDisplay === "d-flex") {
      setLoginModalDisplay("d-none");
      setRegisterModalDisplay("d-flex");
    } else {
      setLoginModalDisplay("d-flex");
      setRegisterModalDisplay("d-none");
    }
  };

  const createUser = (item) => {
    addOneServise("users", item).then((data) => {
      console.log(data);
    });
  };

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

  return (
    <TodoContext.Provider value={sharedVars}>{children}</TodoContext.Provider>
  );
};

export { Provider };
export default TodoContext;
