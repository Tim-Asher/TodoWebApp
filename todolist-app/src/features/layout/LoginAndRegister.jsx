import React, { useContext } from "react";
import TodoContext from "../../context/todos";

const LoginAndRegister = () => {
  const { changeModaldisplay } = useContext(TodoContext);
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        defaultChecked
        onClick={changeModaldisplay}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        LOGIN
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        onClick={changeModaldisplay}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">
        REGISTER
      </label>
    </div>
  );
};

export default LoginAndRegister;
