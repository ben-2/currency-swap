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

test('renders USD', () => {
  render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );
  const linkElement = screen.getByText(/USD/i);
  expect(linkElement).toBeInTheDocument();
});

test('clicking the operation button toggles a Buy/Sell', () => {
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

test('click on the currency box focus on number input', () => {
  const { container, getByTestId } = render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  );

  const input1 = container.getElementsByTagName('input')[0];
  const input2 = container.getElementsByTagName('input')[1];
  const currencyBox1 = getByTestId('currency-box-1');
  const currencyBox2 = getByTestId('currency-box-2');

  expect(input1).not.toHaveFocus();
  expect(input2).not.toHaveFocus();
  fireEvent.click(currencyBox1);
  expect(input1).toHaveFocus();
  expect(input2).not.toHaveFocus();
  fireEvent.click(currencyBox2);
  expect(input1).not.toHaveFocus();
  expect(input2).toHaveFocus();
  fireEvent.click(currencyBox2);
  expect(input1).not.toHaveFocus();
  expect(input2).toHaveFocus();
  fireEvent.click(currencyBox1);
  expect(input1).toHaveFocus();
  expect(input2).not.toHaveFocus();
});
