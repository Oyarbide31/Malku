import { Link } from 'react-router-dom';
import { Post } from '../../models/post';
import { usePost } from '../hooks/usePost';
import styles from './PostCard.module.scss';

type PropsType = {
  post: Post;
  isEdit?: boolean;
};
export default function PostCard({ post, isEdit = false }: PropsType) {
  const { handleDeletePost } = usePost();

  const onDelete = () => {
    handleDeletePost(post);
  };

  return (
    <div className={styles.container}>
      <Link className={styles.imgContainer} to={`/post/${post.id}`}>
        <img
          className={styles.img}
          src={post.imageData?.url}
          alt={`Imagen del post de tipo ${post.category}`}
        />
      </Link>
      <ul className={styles.descriptionContainer}>
        <li>
          <h3 data-testid="postcard-title">Titulo:</h3>
          {post.title}
        </li>
        <li>
          <h3>Autor:</h3>
          {post.author}
        </li>
        <li>
          <h3 data-testid="postcard-cartegory">Categoria:</h3>
          {post.category}
        </li>
      </ul>
      {isEdit && (
        <div className={styles.actionContainer}>
          <Link to={`/edit/${post.id}`}>
            <button>Editar</button>
          </Link>
          <button onClick={onDelete} data-testid="button-delete">
            Borrar
          </button>
        </div>
      )}
    </div>
  );
}
