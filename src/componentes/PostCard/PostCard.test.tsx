import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Post } from '../../models/post';
import { appStore } from '../../store/store';
import { ImageData } from '../../types/image';
import { usePost } from '../hooks/usePost';
import PostCard from './PostCard';

jest.mock('../hooks/usePost', () => ({
  usePost: jest.fn().mockReturnValue({
    handleDeletePost: jest.fn(() => {}),
    isError: null,
  }),
}));

describe('Given the component PostCard', () => {
  describe('When we render it in edit mode', () => {
    beforeEach(() => {
      const mockedPost: Post = {
        id: '',
        title: '',
        body: '',
        author: '',
        authorId: '',
        category: 'exterior',
        imageData: {
          url: '',
        } as unknown as ImageData,
      };

      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <PostCard post={mockedPost} isEdit />
          </MemoryRouter>
        </Provider>
      );
    });

    test('then see on the document a title', () => {
      const titleElement = screen.getByTestId('postcard-title');
      expect(titleElement).toBeInTheDocument();
    });

    test('thenI can delete a post', async () => {
      const { handleDeletePost } = usePost();
      const buttonDelete = screen.getByTestId('button-delete');

      await fireEvent.click(buttonDelete);

      expect(handleDeletePost).toHaveBeenCalled();
    });
  });

  describe('When we render it in not edit mode', () => {
    beforeEach(() => {
      const mockedPost: Post = {
        id: '',
        title: '',
        body: '',
        author: '',
        authorId: '',
        category: 'exterior',
        imageData: {
          url: '',
        } as unknown as ImageData,
      };

      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <PostCard post={mockedPost} />
          </MemoryRouter>
        </Provider>
      );
    });

    test('then see on the document a title', () => {
      const titleElement = screen.getByTestId('postcard-title');
      expect(titleElement).toBeInTheDocument();
    });
  });
});
