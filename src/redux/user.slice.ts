import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { loginUserAsync, registerUserAsync } from './user.thunks';

export type UserState = {
  users: User[];
  token?: string;
};

const initialState: UserState = {
  users: [],
  token: localStorage.getItem('userToken') as undefined | string,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));

    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.token,
    }));

    builder.addCase(loginUserAsync.pending, (state) => ({
      ...state,
    }));

    builder.addCase(loginUserAsync.rejected, (state) => ({
      ...state,
    }));
  },
});

export const userReducer = userSlice.reducer;
export const ac = userSlice.actions;
