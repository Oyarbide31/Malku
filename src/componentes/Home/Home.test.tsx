import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../../store/store';
import Home from './Home';
describe('Given the component Home', () => {
  describe('When its render', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    test('The component, should be in the document a text', async () => {
      const element = screen.getByTestId('selector-label');
      expect(element).toBeInTheDocument();
    });
  });
});
