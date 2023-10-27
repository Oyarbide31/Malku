import { SelectCategory } from '../../models/post';
import { getPostsByCategory } from '../../utils/post';
import PostCard from '../PostCard/PostCard';
import { usePost } from '../hooks/usePost';

export function Posts({ category }: { category: SelectCategory }) {
  const { posts } = usePost();

  const finalPosts =
    category === 'todas' ? posts : getPostsByCategory(posts, category);

  return (
    <>
      <h1>Ultimos Posts</h1>
      {finalPosts ? (
        finalPosts.map((post) => <PostCard post={post} key={post.id} />)
      ) : (
        <p>No hay posts para la categoria seleccionada</p>
      )}
    </>
  );
}
