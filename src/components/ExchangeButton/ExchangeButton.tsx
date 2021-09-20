import Button from '@mui/material/Button';
import React from 'react';
import { useStoreState } from '../../store/hooks';
import styles from './ExchangeButton.module.css';

type ExchangeButtonProps = {
}

const ExchangeButton: React.FC<ExchangeButtonProps> = () => {
  const operation = useStoreState((state) => state.operation);
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyInValue = useStoreState((state) => state.currencyInValue);
  const currencyOut = useStoreState((state) => state.currencyOut);
  const currencyOutValue = useStoreState((state) => state.currencyOutValue);

  const balanceIn = useStoreState(
    (state) => state.accountsList
      .filter((account) => account.currency === currencyIn)[0].balance,
  );
  const balanceOut = useStoreState(
    (state) => state.accountsList
      .filter((account) => account.currency === currencyOut)[0].balance,
  );

  let disableButton = false;
  if (
    operation === 'Sell'
    && currencyInValue
    && currencyInValue > balanceIn
  ) {
    disableButton = true;
  } else if (
    operation === 'Buy'
    && currencyOutValue
    && currencyOutValue > balanceOut
  ) {
    disableButton = true;
  }
  return (
    <div className={styles.exchangeButtonWrapper}>
      <Button
        className={styles.button}
        variant="contained"
        disabled={disableButton}
      >
        {operation}
        {' '}
        {currencyIn}
        {' '}
        {operation === 'Sell' ? 'for' : 'from'}
        {' '}
        {currencyOut}
      </Button>
    </div>
  );
};

export default ExchangeButton;
