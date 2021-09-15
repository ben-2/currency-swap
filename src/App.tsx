import React from 'react';
import './App.css';
import { CurrencyWrapper } from './components/CurrencyWrapper/CurrencyWrapper';
import Title from './components/Title';

const App: React.FC = () => (
  <div className="App">
    <Title operation="Buy" currency="USD" />
    <CurrencyWrapper message="Hello" />
  </div>
);

export default App;
