import {
  Action, action, computed, Computed, createStore,
} from 'easy-peasy';
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
    displayConversionIn: boolean;
    displayConversionOut: boolean;
    currencyInValue?: number | undefined;
    currencyOutValue?: number | undefined;
    currencyInValueControlled?: Computed<StoreModel, number | undefined>;
    currencyOutValueControlled?: Computed<StoreModel, number | undefined>;
    setOperation: Action<StoreModel, Operation>;
    setCurrencyInValue: Action<StoreModel, number | undefined>;
    setDisplayConversionIn: Action<StoreModel, boolean>;
    setDisplayConversionOut: Action<StoreModel, boolean>;
    setCurrencyOutValue: Action<StoreModel, number | undefined>;
    accountsList: AccountList;
}

export const store = createStore<StoreModel>({
  operation: 'Sell',
  currencyIn: 'EUR',
  currencyOut: 'USD',
  displayConversionIn: false,
  displayConversionOut: false,
  currencyInValue: undefined,
  currencyOutValue: undefined,
  currencyInValueControlled: computed((state) => {
    const currencyOutExchangeRate = state.accountsList
      .filter(
        (account) => account.currency === state.currencyOut,
      )[0].exchangeRateInEur;
    if (state.currencyOutValue) {
      return state.currencyOutValue / currencyOutExchangeRate;
    }
    return undefined;
  }),
  currencyOutValueControlled: computed((state) => {
    const currencyOutExchangeRate = state.accountsList
      .filter(
        (account) => account.currency === state.currencyOut,
      )[0].exchangeRateInEur;
    if (state.currencyInValue) {
      return state.currencyInValue * currencyOutExchangeRate;
    }
    return undefined;
  }),
  setDisplayConversionIn: action((state, payload) => {
    state.displayConversionIn = payload;
  }),
  setDisplayConversionOut: action((state, payload) => {
    state.displayConversionOut = payload;
  }),
  setOperation: action((state, payload) => {
    state.operation = payload;
  }),
  setCurrencyInValue: action((state, payload) => {
    state.currencyInValue = payload;
  }),
  setCurrencyOutValue: action((state, payload) => {
    state.currencyOutValue = payload;
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
