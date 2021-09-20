import {
  Action, action, computed, Computed, createStore,
} from 'easy-peasy';
import {
  CurrencyAccount,
  CurrencyDescription,
  FocusedBox,
} from '../common/types/currency.interface';

type Operation = 'Buy'|'Sell';

interface Account {
  currency: CurrencyAccount;
  currencyDescription: CurrencyDescription;
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
    focusedBox: FocusedBox;
    accountsList: AccountList;
    currencyInValueControlled?: Computed<StoreModel, number | undefined>;
    currencyOutValueControlled?: Computed<StoreModel, number | undefined>;
    setCurrencyIn: Action<StoreModel, CurrencyAccount>;
    setCurrencyOut: Action<StoreModel, CurrencyAccount>;
    setOperation: Action<StoreModel, Operation>;
    setCurrencyInValue: Action<StoreModel, number | undefined>;
    setDisplayConversionIn: Action<StoreModel, boolean>;
    setDisplayConversionOut: Action<StoreModel, boolean>;
    setCurrencyOutValue: Action<StoreModel, number | undefined>;
    setFocusedBox: Action<StoreModel, FocusedBox>;
}

export const store = createStore<StoreModel>({
  operation: 'Sell',
  currencyIn: 'EUR',
  currencyOut: 'USD',
  displayConversionIn: false,
  displayConversionOut: false,
  currencyInValue: undefined,
  currencyOutValue: undefined,
  focusedBox: 'In',
  accountsList: [
    {
      currency: 'EUR',
      currencyDescription: 'Euro',
      exchangeRateInEur: 1,
      balance: 35.6,
    },
    {
      currency: 'GBP',
      currencyDescription: 'GB Pound',
      exchangeRateInEur: 0.85,
      balance: 0,
    },
    {
      currency: 'USD',
      currencyDescription: 'US Dollar',
      exchangeRateInEur: 1.2,
      balance: 0,
    },
  ],
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
  setCurrencyIn: action((state, payload) => {
    state.currencyIn = payload;
  }),
  setCurrencyOut: action((state, payload) => {
    state.currencyOut = payload;
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
  setFocusedBox: action((state, payload) => {
    state.focusedBox = payload;
  }),
});
