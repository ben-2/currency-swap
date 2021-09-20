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
  currencyInValueControlled: computed(
    [
      (state) => state.currencyIn,
      (state) => state.currencyOut,
      (state) => state.currencyOutValue,
      (state) => state.accountsList,
    ],
    (currencyIn, currencyOut, currencyOutValue, accountsList) => {
      const currencyInExchangeRate = accountsList
        .filter(
          (account) => account.currency === currencyIn,
        )[0].exchangeRateInEur;

      const currencyOutExchangeRate = accountsList
        .filter(
          (account) => account.currency === currencyOut,
        )[0].exchangeRateInEur;

      if (currencyOutValue) {
        return currencyOutValue
        * (currencyInExchangeRate / currencyOutExchangeRate);
      }
      return undefined;
    },
  ),
  currencyOutValueControlled: computed(
    [
      (state) => state.currencyIn,
      (state) => state.currencyOut,
      (state) => state.currencyInValue,
      (state) => state.accountsList,
    ],
    (currencyIn, currencyOut, currencyInValue, accountsList) => {
      const currencyInExchangeRate = accountsList
        .filter(
          (account) => account.currency === currencyIn,
        )[0].exchangeRateInEur;

      const currencyOutExchangeRate = accountsList
        .filter(
          (account) => account.currency === currencyOut,
        )[0].exchangeRateInEur;

      if (currencyInValue) {
        return currencyInValue
        * (currencyOutExchangeRate / currencyInExchangeRate);
      }
      return undefined;
    },
  ),
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
