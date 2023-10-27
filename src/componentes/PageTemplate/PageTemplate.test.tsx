import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageTemplate from './PageTemplate';

describe('Given a PageTemplate component', () => {
  describe('When its rendered properly', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PageTemplate>
            <p data-testid="dummy-component">dummy component</p>
          </PageTemplate>
        </MemoryRouter>
      );
    });
    test('Then I can see the footer and the header', () => {
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();

      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
    });

    test('Then I can see the children', () => {
      const dummyComponent = screen.getByTestId('dummy-component');
      expect(dummyComponent).toBeInTheDocument();
    });
  });
});
