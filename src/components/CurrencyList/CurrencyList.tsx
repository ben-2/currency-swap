import React, { useRef, useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import Currency from '../Currency';
import styles from './CurrencyList.module.css';
import { useStoreState, useStoreActions } from '../../store/hooks';

type CurrencyListProps = {
  setShowCurrencyList: (show: boolean) => void;
}

const CurrencyList: React.FC<CurrencyListProps> = (props) => {
  const { setShowCurrencyList } = props;
  const accountsList = useStoreState((state) => state.accountsList);
  const focusedBox = useStoreState((state) => state.focusedBox);
  const setCurrencyIn = useStoreActions((actions) => actions.setCurrencyIn);
  const setCurrencyOut = useStoreActions((actions) => actions.setCurrencyOut);
  const [filter, setFilter] = useState('');
  const inputFocus: React.RefObject<
HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  return (
    <div
      className={styles.currencyListWrapper}
      data-testid="currency-list"
    >
      <div className={styles.currencyFilter}>
        <div
          className={styles.arrowBack}
          onClick={() => setShowCurrencyList(false)}
          aria-hidden
        >
          <ArrowBackIcon />
        </div>
        <div className={styles.filterInput}>
          <input
            className={styles.inputDiv}
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            ref={inputFocus}
          />
        </div>
        {filter !== ''
          ? (
            <div
              className={styles.resetFilter}
              onClick={() => setFilter('')}
              aria-hidden
            >
              <ClearIcon sx={{ fontSize: 20 }} />
            </div>
          )
          : <div className={styles.resetFilter} />}
      </div>
      {accountsList
        .filter((account) => account.currency.includes(filter.toUpperCase()))
        .map((account) => (
          <div
            id={`wrapper-${account.currency}`}
            key={`wrapper-${account.currency}`}
            onClick={() => {
              if (focusedBox === 'In') {
                setCurrencyIn(account.currency);
                setFilter('');
                setShowCurrencyList(false);
              } else if (focusedBox === 'Out') {
                setCurrencyOut(account.currency);
                setFilter('');
                setShowCurrencyList(false);
              }
            }}
            aria-hidden
          >
            <Currency
              key={account.currency}
              currency={account.currency}
            />
          </div>
        ))}
    </div>
  );
};

export default CurrencyList;
