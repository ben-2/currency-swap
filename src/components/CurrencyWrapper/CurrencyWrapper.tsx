import React, { useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './CurrencyWrapper.module.css';

interface Props {
  id: number;
  defaultFocus: boolean;
  exchangedCurrency: CurrencyAccount;
  balance: number;
}

const CurrencyWrapper: React.FC<Props> = (props) => {
  const {
    id, defaultFocus, exchangedCurrency, balance,
  } = props;
  const inputFocus: React.RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (defaultFocus && inputFocus.current) { inputFocus.current.focus(); }
  }, [defaultFocus]);
  return (
    <div
      className={styles.currencyBox}
      onClick={() => {
        if (inputFocus.current) { inputFocus.current.focus(); }
      }}
      aria-hidden="true"
      data-testid={`currency-box-${id}`}
    >
      <div className={styles.accountBox}>
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
      <div className={styles.amountInput}>
        <input type="number" placeholder="0" ref={inputFocus} />
      </div>
    </div>
  );
};

export default CurrencyWrapper;
