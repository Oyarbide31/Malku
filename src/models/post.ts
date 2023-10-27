import { ImageData } from '../types/image';

export type Post = {
  id: string;
  author: string;
  authorId: string;
  category: Category;
  title: string;
  body: string;
  imageData: ImageData;
};

export type PostCreate = Omit<Post, 'id' | 'author' | 'imageData'> & {
  imageData: string;
};

export type Category = 'exterior' | 'indoor';

export type SelectCategory = Category | 'todas';
