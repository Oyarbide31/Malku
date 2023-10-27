import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import { LoginData } from '../../models/user.js';
import { appStore } from '../../store/store.js';
import { useUsers } from './useUsers.js';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given the hook useUsers', () => {
  function TestComponent() {
    const { handleRegisterUser, handleLoginUser } = useUsers();

    const mockUser = {} as unknown as LoginData;
    const mockUser2 = {} as unknown as LoginData;

    return (
      <>
        <button role="button" onClick={() => handleRegisterUser(mockUser)}>
          1
        </button>

        <button role="button" onClick={() => handleLoginUser(mockUser2)}>
          2
        </button>
      </>
    );
  }

  describe('When render component run the hook', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <TestComponent></TestComponent>
          </MemoryRouter>
        </Provider>
      );
    });

    test('Then, if we click 1 the state should  be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });

    test('Then, if we click 2, the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
