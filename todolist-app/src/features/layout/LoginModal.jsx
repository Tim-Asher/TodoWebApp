import React, { useContext } from "react";
import TodoContext from "../../context/todos";
import LoginAndRegister from "./LoginAndRegister";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginModal = () => {
  const { overlayDisplay, changeOverlayDisplay } = useContext(TodoContext);
  const handleOverlayClick = (e) => {
    if (e.target.className.split(" ")[0] === "my-overlay") {
      changeOverlayDisplay();
    }
  };
  return (
    <div
      onClick={handleOverlayClick}
      className={`my-overlay ${overlayDisplay} justify-content-center align-items-center`}
    >
      <div className="login-modal p-4 d-flex flex-column align-items-center">
        <LoginAndRegister />
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginModal;
