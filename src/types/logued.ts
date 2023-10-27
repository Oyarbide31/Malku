import { User } from '../models/user.js';

export type Logued = {
  user: User;
  token: string;
};
