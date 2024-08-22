import React, { useState } from "react";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "../../slices/todoApiSlice";

const Form = ({ item, getDataFromForm, handleEditBtn }) => {
  const [addTask] = useAddTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [urgent, setUrgent] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!item) {
      if (new Date(`${date}T${time}:00`) < new Date()) {
        alert("Date and Time cannot be in the past!");
      } else {
        // getDataFromForm(title, desc, date, time, urgent);
        await addTask({
          title,
          desc,
          date,
          time,
          urgent,
        });
      }
    } else {
      const data = {};
      if (title) data.title = title;
      if (desc) data.desc = desc;
      if (date) data.date = date;
      if (time) data.time = time;
      if (urgent) data.urgent = urgent;
      editTask({
        id: item._id,
        data: data,
      }).then((data) => {
        console.log(data);
      });
      // getDataFromForm(item._id, title, desc, date, time, urgent);
      // if (handleEditBtn) {
      //   handleEditBtn();
      // }
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="d-flex flex-column">
      <input
        type="text"
        placeholder="Title"
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Description"
        onInput={(e) => {
          setDesc(e.target.value);
        }}
        className="form-control"
      />
      <div className="d-flex">
        <input
          type="time"
          placeholder="Last time"
          onInput={(e) => {
            setTime(e.target.value);
          }}
          className="form-control w-50"
        />
        <input
          type="date"
          placeholder="Last Date"
          onInput={(e) => {
            setDate(e.target.value);
          }}
          className="form-control w-50"
        />
      </div>
      <div className="my-3">
        <div onClick={(e) => setUrgent("extreame")} className="form-check">
          <input
            className="form-check-input bg-danger"
            type="radio"
            name="flexRadioDefault"
            id={item ? `flexRadioEdit1` : `flexRadioAdd1`}
          />
          <label
            className="form-check-label "
            htmlFor={item ? `flexRadioEdit1` : `flexRadioAdd1`}
          >
            Extreme Urgent
          </label>
        </div>
        <div className="form-check" onClick={(e) => setUrgent("medium")}>
          <input
            className="form-check-input bg-warning"
            type="radio"
            name="flexRadioDefault"
            id={item ? `flexRadioEdit2` : `flexRadioAdd2`}
          />
          <label
            className="form-check-label"
            htmlFor={item ? `flexRadioEdit2` : `flexRadioAdd2`}
          >
            Medium Urgent
          </label>
        </div>
        <div className="form-check" onClick={(e) => setUrgent("low")}>
          <input
            className="form-check-input bg-success"
            type="radio"
            name="flexRadioDefault"
            id={item ? `flexRadioEdit3` : `flexRadioAdd3`}
          />
          <label
            className="form-check-label"
            htmlFor={item ? `flexRadioEdit3` : `flexRadioAdd3`}
          >
            Low Urgent
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
