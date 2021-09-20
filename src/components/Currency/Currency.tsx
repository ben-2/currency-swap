import React from 'react';
import Avatar from '@mui/material/Avatar';
import CurrencyFlag from 'react-currency-flags';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './Currency.module.css';
import { useStoreState } from '../../store/hooks';

type CurrencyProps = {
    currency: CurrencyAccount;
    currencyDescription: string;
}

const Currency: React.FC<CurrencyProps> = (props) => {
  const { currency, currencyDescription } = props;
  const currencyBalance = useStoreState(
    (state) => state.accountsList
      .filter((account) => account.currency === currency)[0].balance,
  );
  return (
    <div
      className={styles.currencyWrapper}
      data-testid={`currency-flag-${currency}`}
    >
      <div className={styles.flagDiv}>
        <Avatar
          alt={currency}
          sx={{ width: 33, height: 33 }}
        >
          <CurrencyFlag currency={currency} width={55} />
        </Avatar>
      </div>
      <div className={styles.currencyTextDescription}>
        <div className={styles.currencyText}>
          {currency}
          {' '}
          ·
          {' '}
          {currencyBalance.toString().replace('.', ',')}
        </div>
        <div className={styles.currencyDescription}>
          {currencyDescription}
        </div>
      </div>
    </div>
  );
};

export default Currency;
