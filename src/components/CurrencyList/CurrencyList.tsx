import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Currency from '../Currency';
import styles from './CurrencyList.module.css';

type CurrencyListProps = {
}

const CurrencyList: React.FC<CurrencyListProps> = (props) => (
  <div
    className={styles.currencyListWrapper}
    data-testid="currency-list"
  >
    <div className={styles.currencyFilter}>
      <div className={styles.arrowBack}>
        <ArrowBackIcon />
      </div>
      <div className={styles.filterInput}>
        <input className={styles.inputDiv} />
      </div>
    </div>
    <Currency currency="EUR" />
    <Currency currency="GBP" />
    <Currency currency="USD" />
  </div>
);

export default CurrencyList;
