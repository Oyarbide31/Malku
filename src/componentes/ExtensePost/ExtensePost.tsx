import { useParams } from 'react-router-dom';
import { getPostById } from '../../utils/post';
import { usePost } from '../hooks/usePost';
import style from './ExtensePost.module.scss';

export default function ExtensePost() {
  const { id } = useParams();
  const { posts } = usePost();

  const post = getPostById(posts, id ?? '');

  if (!post) {
    return <p>Ups! Ese post no existe!</p>;
  }

  return (
    <>
      <main className={style.container} data-testid="extense-post-main">
        <h1>{post.title}</h1>
        <img src={post.imageData.url} />
        <span>Hecho por {post.author}</span>
        <span>Categoría: {post.category}</span>
        <p>{post.body}</p>
      </main>
    </>
  );
}
