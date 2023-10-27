import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Post } from '../../models/post';
import { appStore } from '../../store/store';
import { ImageData } from '../../types/image';
import { getPostById } from '../../utils/post';
import { usePost } from '../hooks/usePost';
import EditPost from './EditPost';

jest.mock('../../utils/base64', () => ({
  toBase64: jest.fn().mockReturnValue('test-base64'),
}));

jest.mock('../../utils/post', () => {
  return {
    getPostById: jest.fn(),
  };
});

jest.mock('../hooks/usePost', () => {
  const mockedPost: Post = {
    id: 'post-test-id',
    author: 'author-test',
    authorId: 'author-id-test',
    category: 'exterior',
    title: 'title-test',
    body: 'body-test',
    imageData: { url: 'urltest' } as ImageData,
  };
  return {
    usePost: jest.fn().mockReturnValue({
      handleEditPost: jest.fn(() => {}),
      posts: [mockedPost],
      isError: null,
    }),
  };
});

describe('Given the component EditPost', () => {
  describe('When it is render', () => {
    const mockedPost: Post = {
      id: 'post-test-id',
      author: 'author-test',
      authorId: 'author-id-test',
      category: 'exterior',
      title: 'title-test',
      body: 'body-test',
      imageData: { url: 'urltest' } as ImageData,
    };

    beforeEach(() => {
      localStorage.setItem('userId', 'test userid');
      (getPostById as jest.Mock).mockReturnValue(mockedPost);
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <EditPost />
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, component should be in the document', () => {
      const element = screen.getByTestId('edit-title');
      expect(element).toBeInTheDocument();
    });

    test('Then, component should display an error msg if user is not logged', () => {
      localStorage.clear();
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <EditPost />
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getByTestId('nologeduser-msg');
      expect(element).toBeInTheDocument();
    });

    test('Then, if I create a post, the backend is called', async () => {
      const { handleEditPost } = usePost();

      const inputTitle = screen.getByTestId('input-title');
      const inputBody = screen.getByTestId('input-body');
      const buttonSave = screen.getByTestId('button-save');

      await fireEvent.change(inputTitle, {
        target: { value: 'Titulo Post' },
      });

      await fireEvent.change(inputBody, {
        target: { value: 'Body Post' },
      });

      await fireEvent.click(buttonSave);
      expect(handleEditPost).toHaveBeenCalled();
    });

    test('Then, if there is not a post, I see the error msg', () => {
      (getPostById as jest.Mock).mockReturnValue(undefined);
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <EditPost />
          </Provider>
        </MemoryRouter>
      );

      const element = screen.getByTestId('error-nopost');
      expect(element).toBeInTheDocument();
    });
  });
});
