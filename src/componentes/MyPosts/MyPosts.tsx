import { getPostsByUser } from '../../utils/post';
import PostCard from '../PostCard/PostCard';
import { usePost } from '../hooks/usePost';

export default function MyPosts() {
  const { posts } = usePost();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    return <p>Logueate primero</p>;
  }

  const filteredPost = getPostsByUser(posts, userId);

  if (!filteredPost) {
    return <p>Oooops! No hay datos!</p>;
  }

  return (
    <>
      <h1>Mis Posts</h1>
      {filteredPost.map((post) => (
        <PostCard post={post} key={post.id} isEdit />
      ))}
    </>
  );
}
