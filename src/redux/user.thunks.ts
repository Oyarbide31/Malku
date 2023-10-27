import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiLoginResponse, LoginData, User } from '../models/user';
import { ApiUsersRepository } from '../services/api.user.repository';

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: ApiUsersRepository; user: LoginData }
>('users/register', async ({ repo, user }) => {
  const result = await repo.create(user);

  if (result.userName) {
    alert('usuario creado');
  } else {
    alert('Usuario no creado');
  }

  return result;
});

export const loginUserAsync = createAsyncThunk<
  ApiLoginResponse,
  {
    repo: ApiUsersRepository;
    user: LoginData;
    navigate: (route: string) => void;
  }
>('users/login', async ({ repo, user, navigate }) => {
  const result = await repo.login(user);
  localStorage.setItem('userToken', result.token as string);
  localStorage.setItem('userName', user.userName as string);
  localStorage.setItem('userId', result.user.id);
  navigate('/');
  return result;
});
