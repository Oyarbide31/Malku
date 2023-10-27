import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../models/post';
import { getAllPostAsync } from './post.thunks';

export type PostState = {
  posts: Post[];
};

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPostAsync.fulfilled, (state, { payload }) => ({
      ...state,
      posts: [...payload],
    }));
    builder.addCase(getAllPostAsync.pending, (state) => ({
      ...state,
    }));
    builder.addCase(getAllPostAsync.rejected, (state) => ({
      ...state,
    }));
  },
});

export const postReducer = postSlice.reducer;
export const ac = postSlice.actions;
