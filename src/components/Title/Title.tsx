import React from 'react';
import styles from './Title.module.css';

type CurrencyAccount = 'USD' | 'EUR' | 'GBP';

type TitleProps = {
    operation: 'Buy' | 'Sell';
    currency: CurrencyAccount;
}

const Title: React.FC<TitleProps> = (props) => {
  const { operation, currency } = props;
  return (
    <>
      <div className={styles.operation}>{ operation }</div>
      <div className={styles.currency}>{currency}</div>
    </>
  );
};

export default Title;
