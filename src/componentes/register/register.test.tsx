import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store';
import { useUsers } from '../hooks/useUsers';
import Register from './register';

jest.mock('../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleRegisterUser: jest.fn(() => {}),
    isError: null,
  }),
}));

describe('Given the component Register', () => {
  describe('When it is render', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Register />
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then, it should render a button', () => {
      const element = screen.getByTestId('button-register');
      expect(element).toBeInTheDocument();
    });

    test('Then, when we click on the submit button Registrar, the user is registered', async () => {
      const { handleRegisterUser } = useUsers();

      const registerButton = screen.getByTestId('button-register');
      const inputUsername = screen.getByTestId('input-username');
      const inputPassword = screen.getByTestId('input-password');
      const inputEmail = screen.getByTestId('input-email');

      await fireEvent.change(inputUsername, {
        target: { value: 'alejandro' },
      });
      await fireEvent.change(inputPassword, {
        target: { value: '1234' },
      });
      await fireEvent.change(inputEmail, {
        target: { value: 'alejandro@example.com' },
      });

      await fireEvent.click(registerButton);

      expect(handleRegisterUser).toHaveBeenCalled();
    });

    test('Then, when we click on the change password visible, the password is visible', async () => {
      const inputPassword = screen.getByTestId('input-password');
      const buttonVisibility = screen.getByTestId('button-visibility');

      await fireEvent.change(inputPassword, {
        target: { value: '1234' },
      });

      expect(inputPassword).toHaveAttribute('type', 'password');

      await fireEvent.click(buttonVisibility);
      expect(inputPassword).toHaveAttribute('type', 'text');

      await fireEvent.click(buttonVisibility);
      expect(inputPassword).toHaveAttribute('type', 'password');
    });
  });
});
