import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import Currency from '../Currency';
import styles from './CurrencyList.module.css';
import { useStoreState } from '../../store/hooks';

type CurrencyListProps = {
}

const CurrencyList: React.FC<CurrencyListProps> = (props) => {
  const accountsList = useStoreState((state) => state.accountsList);
  const [filter, setFilter] = useState('');
  return (
    <div
      className={styles.currencyListWrapper}
      data-testid="currency-list"
    >
      <div className={styles.currencyFilter}>
        <div className={styles.arrowBack}>
          <ArrowBackIcon />
        </div>
        <div className={styles.filterInput}>
          <input
            className={styles.inputDiv}
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>
        {filter !== ''
          ? (
            <div
              className={styles.resetFilter}
              onClick={() => setFilter('')}
              aria-hidden="true"
            >
              <ClearIcon sx={{ fontSize: 20 }} />
            </div>
          )
          : <div className={styles.resetFilter} />}
      </div>
      {accountsList
        .filter((account) => account.currency.includes(filter.toUpperCase()))
        .map((account) => (
          <Currency key={account.currency} currency={account.currency} />
        ))}
    </div>
  );
};

export default CurrencyList;
