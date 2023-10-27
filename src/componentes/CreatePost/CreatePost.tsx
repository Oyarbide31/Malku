import { Post, PostCreate } from '../../models/post';
import PostForm from '../PostForm/PostForm';
import { usePost } from '../hooks/usePost';

export default function CreatePost() {
  const { handleNewPost } = usePost();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    return <p data-testid="nologeduser-msg">Logueate primero</p>;
  }

  const handleOnSave = (post: PostCreate | Post) => {
    handleNewPost(post as PostCreate);
  };

  return (
    <>
      <h1 data-testid="create-title">Crea tu post</h1>
      <PostForm onSave={handleOnSave} />
    </>
  );
}
