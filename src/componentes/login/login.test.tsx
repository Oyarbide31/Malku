import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store';
import { useUsers } from '../hooks/useUsers';
import Login from './login';

jest.mock('../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoginUser: jest.fn(),
    isError: null,
  }),
}));

describe('Given the page Login', () => {
  describe('When it is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <Login></Login>
          </MemoryRouter>
        </Provider>
      );
    });

    test('Then, it should render a button', () => {
      const element = screen.getByRole('button');
      expect(element).toBeInTheDocument();
    });

    test('Then, when we click on the submit button Login', async () => {
      const { handleLoginUser } = useUsers();
      const formElement = screen.getByRole('form');
      await fireEvent.submit(formElement);
      expect(handleLoginUser).toHaveBeenCalled();
    });
  });
});
