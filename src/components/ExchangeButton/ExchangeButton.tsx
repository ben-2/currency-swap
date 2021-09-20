import Button from '@mui/material/Button';
import React from 'react';
import { useStoreState } from '../../store/hooks';
import styles from './ExchangeButton.module.css';

type ExchangeButtonProps = {
}

const ExchangeButton: React.FC<ExchangeButtonProps> = () => {
  const operation = useStoreState((state) => state.operation);
  const currencyIn = useStoreState((state) => state.currencyIn);
  const currencyOut = useStoreState((state) => state.currencyOut);
  return (
    <div className={styles.exchangeButtonWrapper}>
      <Button className={styles.button} variant="contained">
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
