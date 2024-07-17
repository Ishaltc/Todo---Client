import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
  myTodos: [],
  user:false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      const { id, email, token } = action.payload;
      state.loggedInUser = { id, email, token };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMyTodos: (state, action) => {
      state.myTodos = action.payload.data.data;
    },
    deleteTodoFromState: (state, action) => {
      state.myTodos = state.myTodos.filter(
        (todo) => todo._id !== action.payload
      );
    },
  },
});

export const {
  setLoggedInUser,
  setMyTodos,
  deleteTodoFromState,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
