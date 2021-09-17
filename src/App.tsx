import React from 'react';
import './App.css';
import BuySellToggle from './components/BuySellToggle';
import CurrencyWrapper from './components/CurrencyWrapper';
import Title from './components/Title';
import { useStoreState } from './store/hooks';

const App: React.FC = () => {
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyOut = useStoreState((state) => state.currencyOut);

  return (
    <div className="App">
      <Title currency={currencyIn} />
      <CurrencyWrapper id={1} exchangedCurrency={currencyIn} balance={32.11} />
      <BuySellToggle />
      <CurrencyWrapper id={2} exchangedCurrency={currencyOut} balance={0} />
    </div>
  );
};

export default App;
