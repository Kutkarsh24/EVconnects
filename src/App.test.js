import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EVConnect heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/EVConnect/i);
  expect(headingElement).toBeInTheDocument();
});
