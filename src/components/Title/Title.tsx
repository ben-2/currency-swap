import React from 'react';
import { CurrencyAccount } from '../../common/types/currency.interface';
import { useStoreState } from '../../store/hooks';
import styles from './Title.module.css';

type TitleProps = {
    currency: CurrencyAccount;
}

const Title: React.FC<TitleProps> = (props) => {
  const operation = useStoreState((state) => state.operation);
  const { currency } = props;
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.operation}>{ operation }</div>
      <div className={styles.currency}>{currency}</div>
    </div>
  );
};

export default Title;
