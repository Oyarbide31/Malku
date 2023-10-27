import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { postReducer } from '../redux/post.slice';
import { userReducer } from '../redux/user.slice';

export const appStore = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
