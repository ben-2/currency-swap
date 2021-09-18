import { Action, action, createStore } from 'easy-peasy';
import { CurrencyAccount } from '../common/types/currency.interface';

type Operation = 'Buy'|'Sell';

interface Account {
  currency: CurrencyAccount;
  exchangeRateInEur: number;
  balance: number;
}

type AccountList = Account[];
export interface StoreModel {
    operation: Operation;
    currencyIn: CurrencyAccount;
    currencyOut: CurrencyAccount;
    setOperation: Action<StoreModel, Operation>;
    accountsList: AccountList;
}

export const store = createStore<StoreModel>({
  operation: 'Sell',
  currencyIn: 'EUR',
  currencyOut: 'USD',
  setOperation: action((state, payload) => {
    state.operation = payload;
  }),
  accountsList: [
    {
      currency: 'EUR',
      exchangeRateInEur: 1,
      balance: 35.6,
    },
    {
      currency: 'GBP',
      exchangeRateInEur: 0.85,
      balance: 0,
    },
    {
      currency: 'USD',
      exchangeRateInEur: 1.2,
      balance: 0,
    },
  ],
});
