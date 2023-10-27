import { FormEvent } from 'react';
import { Category, Post, PostCreate } from '../../models/post';
import { toBase64 } from '../../utils/base64';

import styles from './PostForm.module.scss';

export default function PostForm({
  post,
  onSave,
}: {
  post?: Post;
  onSave: (postToSave: PostCreate | Post) => void;
}) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const title: string = data.get('title')?.toString() ?? '';
    const body = data.get('body')?.toString() ?? '';
    const category: Category = (data.get('category')?.toString() ??
      '') as Category;
    const imgFile: File = data.get('image') as File;

    const dataToSave = post
      ? ({
          ...post,
          title,
          body,
          category,
        } as Post)
      : ({
          title,
          body,
          category,
          imageData: await toBase64(imgFile),
        } as PostCreate);

    onSave(dataToSave);
  };

  return (
    <form
      className={styles.container}
      name="post-form"
      role="form"
      aria-label="form"
      onSubmit={handleSubmit}
    >
      <label className={styles.title} htmlFor="category">
        Categoría
      </label>
      <select
        className={styles.item}
        name="category"
        defaultValue={post?.category}
      >
        <option value="Indoor">Indoor</option>
        <option value="Exterior">Exterior</option>
      </select>

      <label className={styles.title} htmlFor="title">
        Título
      </label>
      <input
        className={styles.item}
        defaultValue={post?.title}
        type="text"
        name="title"
        data-testid="input-title"
      />

      <label className={styles.title} htmlFor="body">
        Texto
      </label>
      <textarea
        className={`${styles.item} ${styles.body}`}
        defaultValue={post?.body}
        name="body"
        data-testid="input-body"
      />

      <label className={styles.title} htmlFor="image">
        Imagen
      </label>
      {post?.imageData ? (
        <img src={post.imageData.url} />
      ) : (
        <input className={styles.item} type="file" name="image" />
      )}

      <button
        className={styles.guardar}
        type="submit"
        data-testid="button-save"
      >
        Guardar
      </button>
    </form>
  );
}
