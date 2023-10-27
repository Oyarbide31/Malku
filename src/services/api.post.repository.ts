import { Post, PostCreate } from '../models/post';

export class ApiPostRepository {
  constructor(public urlBase: string) {
    this.urlBase += '/posts';
  }

  async getAll(): Promise<Post[]> {
    const response = await fetch(this.urlBase);
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data;
  }

  async getByID(id: string): Promise<Post> {
    const response = await fetch(`${this.urlBase}/${id}`);
    if (!response.ok)
      throw new Error(
        `Error, i am on get or Front ${response.status}: ${response.statusText}`
      );
    const data = await response.json();
    return data;
  }

  async create(item: PostCreate): Promise<Post> {
    const response = await fetch(this.urlBase + '/create', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });
    if (!response.ok)
      throw new Error(
        `Error, i am on create or api.post.repo ${response.status}: ${response.statusText}`
      );
    const data = await response.json();

    return data;
  }

  async edit(item: Post): Promise<Post> {
    item.author = item.authorId; // pongo autor en vez de nombre, su id
    const response = await fetch(this.urlBase + `/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });
    if (!response.ok)
      throw new Error(
        `Error, i am on edit or api.post.repo ${response.status}: ${response.statusText}`
      );
    const data = await response.json();

    return data;
  }

  async delete(item: Post) {
    const response = await fetch(this.urlBase + `/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error, i am on DELETE or api.post.repo ${response.status}: ${response.statusText}`
      );
    }

    return;
  }
}
