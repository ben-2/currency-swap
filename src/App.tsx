import React from 'react';
import './App.css';
import { CurrencyWrapper } from './components/CurrencyWrapper/CurrencyWrapper';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <CurrencyWrapper message="Hello" />
    </header>
  </div>
);

export default App;
