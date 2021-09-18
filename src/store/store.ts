import { Action, action, createStore } from 'easy-peasy';
import { CurrencyAccount } from '../common/types/currency.interface';

type Operation = 'Buy'|'Sell';

export interface StoreModel {
    operation: Operation;
    currencyIn: CurrencyAccount;
    currencyOut: CurrencyAccount;
    setOperation: Action<StoreModel, Operation>;
}

export const store = createStore<StoreModel>({
  operation: 'Sell',
  currencyIn: 'EUR',
  currencyOut: 'USD',
  setOperation: action((state, payload) => {
    state.operation = payload;
  }),
});
