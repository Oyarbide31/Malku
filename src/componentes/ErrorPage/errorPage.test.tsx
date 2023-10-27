import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store';
import ErrorPage from './errorpage';

describe('Given the page Error', () => {
  describe('When we render it', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <ErrorPage></ErrorPage>
        </Provider>
      </MemoryRouter>
    );

    test(' the component should e in the document', () => {
      const element = screen.getByText(
        '¡TENEMOS BUENAS Y MALAS NOTICIAS PARA TI!'
      );
      expect(element).toBeInTheDocument();
    });
  });
});
