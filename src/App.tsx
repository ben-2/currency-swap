import React from 'react';
import './App.css';
import BuySellToggle from './components/BuySellToggle';
import Currency from './components/Currency';
import CurrencyWrapper from './components/CurrencyWrapper';
import Title from './components/Title';
import { useStoreState } from './store/hooks';

const App: React.FC = () => {
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyOut = useStoreState((state) => state.currencyOut);
  const currencyInAccount = useStoreState((state) => state.accountsList
    .filter((account) => account.currency === currencyIn)[0]);
  const currencyOutAccount = useStoreState((state) => state.accountsList
    .filter((account) => account.currency === currencyOut)[0]);

  return (
    <div className="App">
      <Title currency={currencyIn} />
      <CurrencyWrapper
        id={1}
        defaultFocus
        exchangedCurrency={currencyIn}
        balance={currencyInAccount.balance}
      />
      <BuySellToggle />
      <CurrencyWrapper
        id={2}
        defaultFocus={false}
        exchangedCurrency={currencyOut}
        balance={currencyOutAccount.balance}
      />
    </div>
  );
};

export default App;
