import { Action, action, createStore } from 'easy-peasy';

type Operation = 'Buy'|'Sell';
export interface StoreModel {
    operation: Operation;
    setOperation: Action<StoreModel, Operation>;
}

export const store = createStore<StoreModel>({
  operation: 'Buy',
  setOperation: action((state, payload) => {
    state.operation = payload;
  }),
});
