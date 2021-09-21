import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import styles from './Rate.module.css';
import { useStoreState } from '../../store/hooks';
import { trimNumber } from '../../services/trimNumbers';

const Rate: React.FC = () => {
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyOut = useStoreState((state) => state.currencyOut);
  const currencyInExchangeRate = useStoreState(
    (state) => state.accountsList
      .filter(
        (account) => account.currency === currencyIn,
      )[0].exchangeRateInEur,
  );
  const currencyOutExchangeRate = useStoreState(
    (state) => state.accountsList
      .filter(
        (account) => account.currency === currencyOut,
      )[0].exchangeRateInEur,
  );
  const symbol = useStoreState(
    (state) => state.accountsList
      .filter(
        (account) => account.currency === currencyIn,
      )[0].symbol,
  );

  const rate = trimNumber(currencyOutExchangeRate / currencyInExchangeRate, 10);

  return (
    <div className={styles.rateWrapper}>
      <div className={styles.rateIcon}>
        <TrendingUpIcon sx={{ fontSize: '16px' }} />
      </div>
      <div className={styles.currencyIn}>
        1
        {symbol}
      </div>
      <div className={styles.rate}>
        =
        {' '}
        {rate.toString().replace('.', ',')}
        {' '}
        {currencyOut}
      </div>
    </div>
  );
};

export default Rate;
