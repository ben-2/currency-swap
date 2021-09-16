import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './CurrencyWrapper.module.css';

interface Props {
  exchangedCurrency: CurrencyAccount;
  balance: number;
}

const CurrencyWrapper: React.FC<Props> = (props) => {
  const { exchangedCurrency, balance } = props;
  return (
    <div className={styles.currencyBox}>
      <div>
        <div className={styles.currencyWrapper}>
          <div className={styles.currency}>{exchangedCurrency}</div>
          <div className={styles.downArrow}><KeyboardArrowDownIcon /></div>
        </div>
        <div className={styles.balance}>
          Balance :
          {' '}
          {balance}
        </div>
      </div>
    </div>
  );
};

export default CurrencyWrapper;
