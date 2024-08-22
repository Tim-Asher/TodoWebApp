import React, { useContext, useEffect } from "react";
import TodoContext from "../../context/todos";
import {
  useCheckTokenQuery,
  useLogoutUserMutation,
} from "../../slices/userApiSlice";

const LoginButton = () => {
  const { login, setLogin, changeOverlayDisplay } = useContext(TodoContext);
  const { data, isLoading, error } = useCheckTokenQuery();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogoutBtn = () => {
    if (window.confirm("Are you sure you want to log out ? ")) {
      logoutUser().then((data) => {
        setLogin(false);
      });
    }
  };

  useEffect(() => {
    if (data) {
      setLogin(true);
    }
  }, [data, setLogin]);

  return (
    <div>
      {login ? (
        <button onClick={handleLogoutBtn}>Log Out</button>
      ) : (
        <button onClick={changeOverlayDisplay}>Log in</button>
      )}
    </div>
  );
};

export default LoginButton;
