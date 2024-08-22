import React, { useContext, useState } from "react";
import TodoContext from "../../context/todos";
import { useLoginUserMutation } from "../../slices/userApiSlice";

const LoginForm = () => {
  const { setLogin, loginModalDisplay, changeOverlayDisplay } =
    useContext(TodoContext);
  const [loginUser] = useLoginUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then(() => {
      setLogin(true);
      changeOverlayDisplay();
    });
  };
  return (
    <form
      onSubmit={handleSubmitLogin}
      className={`${loginModalDisplay} flex-column align-items-center justify-content-center p-3 row-gap-3`}
    >
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
