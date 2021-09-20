import React, { useState } from 'react';
import './App.css';
import BuySellToggle from './components/BuySellToggle';
import CurrencyList from './components/CurrencyList';
import CurrencyWrapper from './components/CurrencyWrapper';
import Rate from './components/Rate';
import RefreshRate from './components/RefreshRate';
import Title from './components/Title';
import { useStoreState } from './store/hooks';

const App: React.FC = () => {
  const [showCurrencyList, setShowCurrencyList] = useState(false);
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyOut = useStoreState((state) => state.currencyOut);
  const currencyInAccount = useStoreState((state) => state.accountsList
    .filter((account) => account.currency === currencyIn)[0]);
  const currencyOutAccount = useStoreState((state) => state.accountsList
    .filter((account) => account.currency === currencyOut)[0]);

  return (
    <div className="App">
      {showCurrencyList
        ? <CurrencyList setShowCurrencyList={setShowCurrencyList} />
        : (
          <>
            <Title currency={currencyIn} />
            <Rate />
            <RefreshRate />
            <CurrencyWrapper
              id={1}
              defaultFocus
              exchangedCurrency={currencyIn}
              balance={currencyInAccount.balance}
              setShowCurrencyList={setShowCurrencyList}
            />
            <BuySellToggle />
            <CurrencyWrapper
              id={2}
              defaultFocus={false}
              exchangedCurrency={currencyOut}
              balance={currencyOutAccount.balance}
              setShowCurrencyList={setShowCurrencyList}
            />
          </>
        )}
    </div>
  );
};

export default App;
