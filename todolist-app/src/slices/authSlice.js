import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStrorage.get("userInfo")
    ? JSON.parse(localStrorage.get("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfoOnLoginOrRegister: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { setUserInfoOnLoginOrRegister, logoutUser } = authSlice.actions;

export default authSlice.reducer;
