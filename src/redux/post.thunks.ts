import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostCreate } from '../models/post';
import { ApiPostRepository } from '../services/api.post.repository';

export const getAllPostAsync = createAsyncThunk<
  Post[],
  { repo: ApiPostRepository }
>('posts/get', async ({ repo }) => {
  return await repo.getAll();
});

export const getByIDPostAsync = createAsyncThunk<
  Post,
  { repo: ApiPostRepository; id: string }
>('posts/getById', async ({ repo, id }) => {
  const post = await repo.getByID(id);

  return post;
});

export const createPostAsync = createAsyncThunk<
  Post,
  { repo: ApiPostRepository; post: PostCreate; navigate: (url: string) => void }
>('posts/create', async ({ repo, post, navigate }) => {
  const result = await repo.create(post);

  if (result.title) {
    alert('Post creado');
  } else {
    alert('Post no creado');
  }

  navigate('/');

  return result;
});

export const editPostAsync = createAsyncThunk<
  Post,
  { repo: ApiPostRepository; post: Post; navigate: (url: string) => void }
>('posts/edit', async ({ repo, post, navigate }) => {
  const result = await repo.edit(post);

  if (result.title) {
    alert('Post editado');
  } else {
    alert('Post no editado');
  }

  navigate('/');

  return result;
});

export const deletePostAsync = createAsyncThunk<
  boolean,
  { repo: ApiPostRepository; post: Post; navigate: (url: string) => void }
>('posts/delete', async ({ repo, post, navigate }) => {
  try {
    await repo.delete(post);

    alert('Post borrado');

    navigate('/');

    return true;
  } catch {
    alert('Post no borrado');

    return false;
  }
});
