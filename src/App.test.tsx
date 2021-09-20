import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { store } from './store/store';

const queryClient = new QueryClient();

describe('INITIALIZATION - As a user when I land on the app', () => {
  test('the default operation is Sell', () => {
    render(
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StoreProvider>,
    );
    const sellTextTitle = screen.getAllByText(/Sell/i)[0];
    const sellTextButton = screen.getAllByText(/Sell/i)[1];
    expect(sellTextTitle).toBeInTheDocument();
    expect(sellTextButton).toBeInTheDocument();
  });

  test('of EUR currency', () => {
    render(
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StoreProvider>,
    );

    let sellTextTitle = screen.getAllByText(/Sell/i)[0];
    let sellTextButton = screen.getAllByText(/Sell/i)[1];
    expect(sellTextTitle).toBeInTheDocument();
    expect(sellTextButton).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    let buyTextTitle = screen.getAllByText(/Buy/i)[0];
    let buyTextButton = screen.getAllByText(/Buy/i)[1];
    expect(buyTextTitle).toBeInTheDocument();
    expect(buyTextButton).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    [sellTextTitle, sellTextButton] = screen.getAllByText(/Sell/i);
    expect(sellTextTitle).toBeInTheDocument();
    expect(sellTextButton).toBeInTheDocument();

    fireEvent.click(getByTestId('operation-toggle'));
    [buyTextTitle, buyTextButton] = screen.getAllByText(/Buy/i);
    expect(buyTextTitle).toBeInTheDocument();
    expect(buyTextButton).toBeInTheDocument();
  });
});

describe('FOCUS - As a user when I click on the currency box', () => {
  test('the number input contained in this box is focused', () => {
    const { container, getByTestId } = render(
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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

describe('CHANGE CURRENCY - As a user when I select', () => {
  test('GBP for the first entry I see it changed', () => {
    const { container, getByTestId } = render(
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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
