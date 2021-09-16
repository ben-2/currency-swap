import React from 'react';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './Title.module.css';

type TitleProps = {
    operation: 'Buy' | 'Sell';
    currency: CurrencyAccount;
}

const Title: React.FC<TitleProps> = (props) => {
  const { operation, currency } = props;
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.operation}>{ operation }</div>
      <div className={styles.currency}>{currency}</div>
    </div>
  );
};

export default Title;
