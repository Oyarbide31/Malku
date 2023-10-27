import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/config';
import { Post, PostCreate } from '../../models/post';
import {
  createPostAsync,
  deletePostAsync,
  editPostAsync,
  getAllPostAsync,
  getByIDPostAsync,
} from '../../redux/post.thunks';
import { ApiPostRepository } from '../../services/api.post.repository';
import { AppDispatch, RootState } from '../../store/store';

export function usePost() {
  const navigate = useNavigate();
  const repo = useMemo(() => new ApiPostRepository(API_URL), []);
  const { posts } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch<AppDispatch>();

  const handleGetPosts = useCallback(async () => {
    dispatch(getAllPostAsync({ repo }));
  }, [repo, dispatch]);

  const handleGetPostById = useCallback(
    async (id: string) => {
      dispatch(getByIDPostAsync({ repo, id }));
    },
    [repo, dispatch]
  );

  const handleNewPost = async (post: PostCreate) => {
    dispatch(createPostAsync({ repo, post, navigate }));
  };

  const handleEditPost = async (post: Post) => {
    dispatch(editPostAsync({ repo, post, navigate }));
  };

  const handleDeletePost = async (post: Post) => {
    dispatch(deletePostAsync({ repo, post, navigate }));
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return {
    handleGetPosts,
    handleGetPostById,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    posts,
  };
}
