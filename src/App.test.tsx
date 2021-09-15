import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Buy', () => {
  render(<App />);
  const linkElement = screen.getByText(/Buy/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders USD', () => {
  render(<App />);
  const linkElement = screen.getByText(/USD/i);
  expect(linkElement).toBeInTheDocument();
});
