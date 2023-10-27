import { useParams } from 'react-router-dom';
import { Post, PostCreate } from '../../models/post';
import { getPostById } from '../../utils/post';
import PostForm from '../PostForm/PostForm';
import { usePost } from '../hooks/usePost';

export default function EditPost() {
  const { id } = useParams();
  const { posts, handleEditPost } = usePost();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    return <p data-testid="nologeduser-msg">Logueate primero</p>;
  }

  const post = getPostById(posts, id ?? '');

  const handleOnSave = (post: PostCreate | Post) => {
    handleEditPost(post as Post);
  };

  if (!post) {
    return <p data-testid="error-nopost">Ooops! Ha ocurrido un error</p>;
  }

  return (
    <>
      <h1 data-testid="edit-title">Edita tu post</h1>
      <PostForm post={post} onSave={handleOnSave} />
    </>
  );
}
