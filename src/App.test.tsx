import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import { store } from './store/store';

test('renders Buy', () => {
  render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );
  const linkElement = screen.getByText(/Buy/i);
  expect(linkElement).toBeInTheDocument();
});

test('clicking the operation button toggles an Buy/Sell', () => {
  const { getByTestId } = render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );

  const buyText = screen.getByText(/Buy/i);
  expect(buyText).toBeInTheDocument();

  fireEvent.click(getByTestId('operation-toggle'));
  const sellText = screen.getByText(/Sell/i);
  expect(sellText).toBeInTheDocument();
});

test('renders USD', () => {
  render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );
  const linkElement = screen.getByText(/USD/i);
  expect(linkElement).toBeInTheDocument();
});
