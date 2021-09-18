import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import { store } from './store/store';

describe('INITIALIZATION - As a user when I land on the app', () => {
  test('the default operation is Sell', () => {
    render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>,
    );
    const linkElement = screen.getByText(/Sell/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('of EUR currency', () => {
    render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>,
    );
    const currencyInTitle = screen.getAllByText(/EUR/i)[0];
    const currencyInBox = screen.getAllByText(/EUR/i)[1];

    expect(currencyInTitle).toBeInTheDocument();
    expect(currencyInBox).toBeInTheDocument();
  });

  test('and the top box number input is focused', () => {
    const { container } = render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>,
    );

    const input1 = container.getElementsByTagName('input')[0];
    const input2 = container.getElementsByTagName('input')[1];

    expect(input1).toHaveFocus();
    expect(input2).not.toHaveFocus();
  });
});

describe('SWITCH OPERATION - As a user when I switch the operation', () => {
  test('it toggles a Buy/Sell operation', () => {
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>,
    );

    const sellText = screen.getByText(/Sell/i);
    expect(sellText).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    const buyText = screen.getByText(/Buy/i);
    expect(buyText).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    expect(sellText).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    expect(buyText).toBeInTheDocument();
  });
});

describe('FOCUS - As a user when I click on the currency box', () => {
  test('the number input contains in this box is focused', () => {
    const { container, getByTestId } = render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>,
    );

    const input1 = container.getElementsByTagName('input')[0];
    const input2 = container.getElementsByTagName('input')[1];
    const currencyBox1 = getByTestId('currency-box-1');
    const currencyBox2 = getByTestId('currency-box-2');

    expect(input1).toHaveFocus();
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
});
