import React from 'react';
import './App.css';
import CurrencyWrapper from './components/CurrencyWrapper';
import Title from './components/Title';

const App: React.FC = () => (
  <div className="App">
    <Title operation="Buy" currency="USD" />
    <CurrencyWrapper exchangedCurrency="GBP" balance={32.11} />
    <CurrencyWrapper exchangedCurrency="EUR" balance={0} />
  </div>
);

export default App;
