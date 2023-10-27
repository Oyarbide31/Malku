import { Post } from '../models/post';

export const getPostById = (posts: Post[], id: string): Post | undefined =>
  posts.find((post) => post.id === id);

export const getPostsByUser = (posts: Post[], id: string): Post[] =>
  posts.filter((post) => post.authorId === id);

export const getPostsByCategory = (posts: Post[], category: string): Post[] =>
  posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
