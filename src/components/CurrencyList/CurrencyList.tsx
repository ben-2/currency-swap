import React from 'react';
import Currency from '../Currency';
import styles from './CurrencyList.module.css';

type CurrencyListProps = {
}

const CurrencyList: React.FC<CurrencyListProps> = (props) => (
  <div
    data-testid="currency-list"
  >
    <Currency currency="EUR" />
    <Currency currency="GBP" />
    <Currency currency="USD" />
  </div>
);

export default CurrencyList;
