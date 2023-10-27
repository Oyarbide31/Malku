import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { appStore } from '../../store/store';
import { Header } from './header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given the component Header', () => {
  describe('When we render it', () => {
    test('in case userName is login, render buttons "Mis Post" and "Crear Posts"', () => {
      localStorage.setItem('userName', 'test');
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const buttonMisPost = screen.getByTestId('button-mis-post');
      expect(buttonMisPost).toBeInTheDocument();

      const buttonCrearPosts = screen.getByTestId('button-crear-posts');
      expect(buttonCrearPosts).toBeInTheDocument();
    });
    test('in case userName is LogOut/clear, render buttons "Ultimos Post" and "Login"', () => {
      localStorage.clear();
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const buttonUltimosPost = screen.getByTestId('button-ultimos-post');
      expect(buttonUltimosPost).toBeInTheDocument();

      const buttonLogin = screen.getByTestId('button-login');
      expect(buttonLogin).toBeInTheDocument();
    });

    test('in case userName is LogOut/clear, if I click on Ultimos Post then I go to that page"', async () => {
      localStorage.clear();
      const navigate = useNavigate();
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const buttonUltimosPost = screen.getByTestId('button-ultimos-post');

      await fireEvent.click(buttonUltimosPost);
      expect(navigate).toHaveBeenCalled();
    });

    test('in case userName is LogOut/clear, if I click on Login then I go to that page"', async () => {
      localStorage.clear();
      const navigate = useNavigate();
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const buttonLogin = screen.getByTestId('button-login');

      await fireEvent.click(buttonLogin);
      expect(navigate).toHaveBeenCalled();
    });

    test('in case userName is ok, render button CrearPosts and if i click on it', async () => {
      localStorage.setItem('userName', 'test');

      const navigate = useNavigate();

      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );
      const buttonCreate = screen.getByTestId('button-crear-posts');
      await fireEvent.click(buttonCreate);
      expect(navigate).toHaveBeenCalledWith('/create');
    });

    test('in case userName is ok, render button myposts and if i click on it', async () => {
      localStorage.setItem('userName', 'test');

      const navigate = useNavigate();

      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );
      const buttonMyPosts = screen.getByTestId('button-mis-post');
      await fireEvent.click(buttonMyPosts);
      expect(navigate).toHaveBeenCalledWith('/myposts');
    });

    test('in case userName is ok, render button LogOut and if i click on it', async () => {
      localStorage.setItem('userName', 'test');

      const navigate = useNavigate();

      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Header />
          </Provider>
        </MemoryRouter>
      );
      const buttonLogOut = screen.getByTestId('button-logOut');
      await fireEvent.click(buttonLogOut);
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });
});
