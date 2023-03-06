import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/users";
import messageReducer from "./slices/message";

const reducer = {
  user: userReducer,
  message: messageReducer
};

export default configureStore({
  reducer: reducer,
});
