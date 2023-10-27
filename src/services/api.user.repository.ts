import { ApiLoginResponse, LoginData, User } from '../models/user.js';

export class ApiUsersRepository {
  urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async create(item: LoginData): Promise<User> {
    const response = await fetch(this.urlBase + '/users/register', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();

    return data;
  }

  async login(item: LoginData): Promise<ApiLoginResponse> {
    const response = await fetch(this.urlBase + '/users/login', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
}
