import React, { useContext, useState } from "react";
import TodoContext from "../../context/todos";
import { useRegisterUserMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setUserInfoOnLoginOrRegister } from "../../slices/authSlice";

const RegisterForm = () => {
  const { registerModalDisplay, createUser } = useContext(TodoContext);
  const [registerUser] = useRegisterUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    createUser({ email, password, passwordConfirm });
    // const res = await registerUser({ email, password, passwordConfirm });
    // dispatch(setUserInfoOnLoginOrRegister({ ...res }));
  };
  return (
    <form
      onSubmit={handleSubmitLogin}
      className={`${registerModalDisplay} flex-column align-items-center justify-content-center p-3 row-gap-3`}
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
      <input
        type="text"
        placeholder="Password Confirm"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
// import React, { useContext, useState } from "react";
// import TodoContext from "../../context/todos";
// import { useRegisterUserMutation } from "../../slices/userApiSlice";

// const RegisterForm = () => {
//   const { registerModalDisplay, createUser } = useContext(TodoContext);
//   const [registerUser] = useRegisterUserMutation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");

//   const handleSubmitLogin = (e) => {
//     e.preventDefault();
//     // createUser({ email, password, passwordConfirm });
//     registerUser({ email, password, passwordConfirm });
//   };
//   return (
//     <form
//       onSubmit={handleSubmitLogin}
//       className={`${registerModalDisplay} flex-column align-items-center justify-content-center p-3 row-gap-3`}
//     >
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => {
//           setEmail(e.target.value);
//         }}
//       />
//       <input
//         type="text"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//       />
//       <input
//         type="text"
//         placeholder="Password Confirm"
//         value={passwordConfirm}
//         onChange={(e) => {
//           setPasswordConfirm(e.target.value);
//         }}
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;
