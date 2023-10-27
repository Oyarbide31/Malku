import { Post } from './post';

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  posts: Post[];
};

export type LoginData = Pick<User, 'password' | 'userName'>;

export type RegisterData = Omit<User, 'id'>;

export type ApiLoginResponse = {
  user: User;
  token: string;
};
