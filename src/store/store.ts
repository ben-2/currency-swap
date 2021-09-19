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
    currencyInValue?: string;
    currencyOutValue?: string;
    currencyInValueControlled?: string;
    currencyOutValueControlled?: string;
    setOperation: Action<StoreModel, Operation>;
    setCurrencyInValue: Action<StoreModel, string | undefined>;
    setCurrencyOutValue: Action<StoreModel, string | undefined>;
    setCurrencyInValueControlled: Action<StoreModel, string | undefined>;
    setCurrencyOutValueControlled: Action<StoreModel, string | undefined>;
    accountsList: AccountList;
}

export const store = createStore<StoreModel>({
  operation: 'Sell',
  currencyIn: 'EUR',
  currencyOut: 'USD',
  currencyInValue: undefined,
  currencyOutValue: undefined,
  currencyInValueControlled: undefined,
  currencyOutValueControlled: undefined,
  setOperation: action((state, payload) => {
    state.operation = payload;
  }),
  setCurrencyInValue: action((state, payload) => {
    state.currencyInValue = payload;
  }),
  setCurrencyOutValue: action((state, payload) => {
    state.currencyOutValue = payload;
  }),
  setCurrencyInValueControlled: action((state, payload) => {
    state.currencyInValueControlled = payload;
  }),
  setCurrencyOutValueControlled: action((state, payload) => {
    state.currencyOutValueControlled = payload;
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
