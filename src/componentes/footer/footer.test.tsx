import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import { Footer } from './footer';

describe('Given the component Footer', () => {
  describe('When we render it', () => {
    render(
      <Router>
        <Footer></Footer>
      </Router>
    );
    test('the component should be in the document, ', async () => {
      const element = screen.getByRole('contentinfo');
      expect(element).toBeInTheDocument();
    });
  });
});
