import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Post } from '../../models/post';
import { appStore } from '../../store/store';
import { ImageData } from '../../types/image';
import ExtensePost from './ExtensePost';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'test-post-id' }),
}));

jest.mock('../../utils/post', () => {
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
    getPostById: () => mockedPost,
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
      posts: [mockedPost],
    }),
  };
});

describe('Given ExtensePost component', () => {
  describe('When I render the component', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <ExtensePost />
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then I can see in in the screen', () => {
      const element = screen.getByTestId('extense-post-main');
      expect(element).toBeInTheDocument();
    });
  });
});
