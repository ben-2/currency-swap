import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useStoreActions, useStoreState } from '../../store/hooks';
import styles from './ExchangeButton.module.css';

type ExchangeButtonProps = {
}

const ExchangeButton: React.FC<ExchangeButtonProps> = () => {
  const [open, setOpen] = useState(false);
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

  const symbolIn = useStoreState(
    (state) => state.accountsList
      .filter((account) => account.currency === currencyIn)[0].symbol,
  );
  const symbolOut = useStoreState(
    (state) => state.accountsList
      .filter((account) => account.currency === currencyOut)[0].symbol,
  );

  const setBalance = useStoreActions((actions) => actions.setBalance);

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
  } else if (
    currencyInValue === 0
    || currencyOutValue === 0
    || typeof currencyInValue === 'undefined'
    || typeof currencyOutValue === 'undefined'
    || currencyIn === currencyOut
  ) {
    disableButton = true;
  }

  let amountExchanged = '';
  if (operation === 'Sell') {
    amountExchanged = `${symbolIn}${currencyInValue}
    to ${symbolOut}${currencyOutValue}`;
  } else if (operation === 'Buy') {
    amountExchanged = `${symbolOut}${currencyOutValue}
    to ${symbolIn}${currencyInValue}`;
  }
  return (
    <div className={styles.exchangeButtonWrapper}>
      <Button
        className={styles.button}
        variant="contained"
        disabled={disableButton}
        onClick={() => {
          if (operation === 'Sell' && currencyInValue && currencyOutValue) {
            setBalance(
              { currency: currencyIn, balance: balanceIn - currencyInValue },
            );
            setBalance(
              { currency: currencyOut, balance: balanceOut + currencyOutValue },
            );
          } else if (
            operation === 'Buy' && currencyOutValue && currencyInValue
          ) {
            setBalance(
              { currency: currencyOut, balance: balanceOut - currencyOutValue },
            );
            setBalance(
              { currency: currencyIn, balance: balanceIn + currencyInValue },
            );
          }
          setOpen(true);
        }}
      >
        {operation}
        {' '}
        {currencyIn}
        {' '}
        {operation === 'Sell' ? 'for' : 'from'}
        {' '}
        {currencyOut}
      </Button>
      <div
        className={styles.modalRoot}
      >
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalBox}>
            <div className={styles.successIcon}>
              <CheckCircleOutlineIcon sx={{ fontSize: 80 }} />
            </div>
            <div className={styles.successExchange}>
              You exchanged
            </div>
            <div className={styles.successAmountConfirmation}>
              {amountExchanged}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ExchangeButton;
