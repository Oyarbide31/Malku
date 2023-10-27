import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store';
import { usePost } from '../hooks/usePost';
import CreatePost from './CreatePost';

jest.mock('../../utils/base64', () => ({
  toBase64: jest.fn().mockReturnValue('test-base64'),
}));

jest.mock('../hooks/usePost', () => ({
  usePost: jest.fn().mockReturnValue({
    handleNewPost: jest.fn(() => {}),
    isError: null,
  }),
}));

describe('Given the component CreatePost', () => {
  describe('When it is render', () => {
    beforeEach(() => {
      localStorage.setItem('userId', 'test userid');
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <CreatePost />
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, component should be in the document', () => {
      const element = screen.getByTestId('create-title');
      expect(element).toBeInTheDocument();
    });

    test('Then, component should display an error msg if user is not logged', () => {
      localStorage.clear();
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <CreatePost />
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getByTestId('nologeduser-msg');
      expect(element).toBeInTheDocument();
    });

    test('Then, if I create a post, the backend is called', async () => {
      const { handleNewPost } = usePost();

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
      expect(handleNewPost).toHaveBeenCalled();
    });
  });
});
