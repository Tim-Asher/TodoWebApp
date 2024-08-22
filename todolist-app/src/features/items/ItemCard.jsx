import { useContext, useEffect, useState } from "react";
import Form from "../layout/Form";
import TodoContext from "../../context/todos";
import { useDeleteTaskMutation } from "../../slices/todoApiSlice";

const ItemCard = ({ item }) => {
  const { deleteOne, editOne } = useContext(TodoContext);
  const [deleteTask] = useDeleteTaskMutation();
  const [done, setDone] = useState("");
  const [urgentColor, setUrgentColor] = useState("");

  const [showForm, setShowForm] = useState("d-none");
  const [showData, setShowData] = useState("d-block");

  const handleEditBtn = (e) => {
    if (showForm === "d-block") {
      setShowForm("d-none");
      setShowData("d-block");
    } else {
      setShowForm("d-block");
      setShowData("d-none");
    }
  };

  const handleCheckBtn = (e) => {
    if (done) {
      setDone("");
    } else {
      setDone("text-decoration-line-through");
    }
  };

  const changeUrgentColor = () => {
    if (item.urgent === "extreame") {
      setUrgentColor("border-danger");
    } else if (item.urgent === "medium") {
      setUrgentColor("border-warning");
    } else {
      setUrgentColor("border-success");
    }
  };

  useEffect(() => {
    changeUrgentColor();
  }, [item.urgent]);

  return (
    <div className="accordion-item" key={item.title}>
      <h2 className="accordion-header" id={`heading${item._id}`}>
        <div className="d-flex align-items-center mx-1">
          <input
            type="checkbox"
            className={`form-check-input rounded-5 m-2 border-5 ${urgentColor}`}
            onChange={handleCheckBtn}
          />
          <button
            className={`btn collapsed flex-grow-1 ${done}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${item._id}`}
            aria-expanded="false"
            aria-controls={`collapse${item._id}`}
          >
            {item.title}
            <i className="bi bi-chevron-down"></i>
          </button>
          <button
            className="btn btn-primary btn-sm mx-2"
            id={item._id}
            onClick={handleEditBtn}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(item._id)}
          >
            Delete
          </button>
        </div>
      </h2>
      <div
        id={`collapse${item._id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${item._id}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className={`data ${showData} ${done}`}>
            <strong>Date:</strong> {item.date} {item.time} <br />
            <strong>Description:</strong> {item.desc}
          </div>
          <div className={`edit ${showForm}`}>
            <Form
              item={item}
              getDataFromForm={editOne}
              handleEditBtn={handleEditBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
