import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import UserService from "../services/users";

const initialState = {
    user: {},
    isLoggedIn: false,
  };

  export const register = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
      try {
        const response = await UserService.register(user);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        console.log(error);
        thunkAPI.dispatch(setMessage(error.response.data.message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  
  export const login = createAsyncThunk(
    "user/login",
    async ({ userId, password }, thunkAPI) => {
      try {
        const data = await UserService.login(userId, password);
        return { user : data };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error.response.data.message));
        return thunkAPI.rejectWithValue();
      }
    }
  );

  export const logout = createAsyncThunk("logout", async () => {
    await UserService.logout();
  });

  const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
      [register.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
      },
      [register.rejected]: (state, action) => {
        state.isLoggedIn = false;
      },
      [login.fulfilled]: (state, action) => {
        //console.log(action.payload);
        state.isLoggedIn = true;
        state.user = action.payload.user;
      },
      [login.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
    },
  });
  
  const { reducer } = userSlice;
  export default reducer;

