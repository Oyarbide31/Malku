import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store.js';
import { usePost } from './usePost';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given the hook usePost', () => {
  function TestComponent() {
    const { handleGetPosts } = usePost();

    return (
      <>
        <button role="button" onClick={() => handleGetPosts()}>
          {' '}
          NewPost{' '}
        </button>
      </>
    );
  }

  describe('When rendender componen run the hook', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <MemoryRouter>
            <TestComponent></TestComponent>
          </MemoryRouter>
        </Provider>
      );
    });
    test('Then, if we click on NewPost the state should be rendered', async () => {
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
