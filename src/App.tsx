import React from 'react';
import './App.css';
import BuySellToggle from './components/BuySellToggle';
import CurrencyWrapper from './components/CurrencyWrapper';
import Title from './components/Title';

const App: React.FC = () => (
  <div className="App">
    <Title currency="USD" />
    <CurrencyWrapper id={1} exchangedCurrency="GBP" balance={32.11} />
    <BuySellToggle />
    <CurrencyWrapper id={2} exchangedCurrency="EUR" balance={0} />
  </div>
);

export default App;
