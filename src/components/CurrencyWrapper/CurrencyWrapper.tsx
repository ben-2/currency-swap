import React, { useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NumberFormat from 'react-number-format';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './CurrencyWrapper.module.css';
import { useStoreActions, useStoreState } from '../../store/hooks';
import { trimNumber } from '../../services/trimNumbers';

interface Props {
  id: number;
  defaultFocus: boolean;
  exchangedCurrency: CurrencyAccount;
  balance: number;
  setShowCurrencyList: (show: boolean) => void;
}

const CurrencyWrapper: React.FC<Props> = (props) => {
  const {
    id,
    defaultFocus,
    exchangedCurrency,
    balance,
    setShowCurrencyList,
  } = props;
  const inputFocus: React.RefObject<
HTMLInputElement> = useRef(null);
  const operation = useStoreState((state) => state.operation);
  const currencyInValue = useStoreState((state) => state.currencyInValue);
  const displayConversionIn = useStoreState(
    (state) => state.displayConversionIn,
  );
  const displayConversionOut = useStoreState(
    (state) => state.displayConversionOut,
  );
  const currencyInValueControlled = useStoreState(
    (state) => state.currencyInValueControlled,
  );
  const currencyOutValue = useStoreState(
    (state) => state.currencyOutValue,
  );
  const currencyOutValueControlled = useStoreState(
    (state) => state.currencyOutValueControlled,
  );
  const globalActions = useStoreActions((actions) => actions);
  const {
    setCurrencyInValue,
    setCurrencyOutValue,
    setDisplayConversionIn,
    setDisplayConversionOut,
    setFocusedBox,
  } = globalActions;

  useEffect(() => {
    if (defaultFocus && inputFocus.current) {
      inputFocus.current.focus();
      setFocusedBox('In');
    }
  }, [defaultFocus, setFocusedBox]);

  let value;
  if (id === 1 && displayConversionIn) {
    value = currencyInValueControlled as number | undefined;
  } else if (id === 1) {
    value = currencyInValue as number | undefined;
  } else if (displayConversionOut) {
    value = currencyOutValueControlled as number | undefined;
  } else {
    value = currencyOutValue as number | undefined;
  }

  let displayErrorMessage = false;
  if (
    id === 1
    && operation === 'Sell'
    && currencyInValue
    && currencyInValue > balance
  ) {
    displayErrorMessage = true;
  } else if (
    id === 2
    && operation === 'Buy'
    && currencyOutValue
    && currencyOutValue > balance
  ) {
    displayErrorMessage = true;
  }

  const balanceParam = trimNumber(balance, 2);

  return (
    <>

      <div
        className={styles.currencyBox}
        onClick={() => {
          if (defaultFocus && inputFocus.current) {
            inputFocus.current.focus();
            setFocusedBox('In');
          } else if (inputFocus.current) {
            inputFocus.current.focus();
            setFocusedBox('Out');
          }
        }}
        aria-hidden
        data-testid={`currency-box-${id}`}
      >
        <div
          className={styles.accountBox}
          data-testid={`account-box-${id}`}
        >
          <div className={styles.currencyWrapper}>
            <div
              className={styles.currency}
              onClick={() => setShowCurrencyList(true)}
              aria-hidden
            >
              {exchangedCurrency}
            </div>
            <div
              className={styles.downArrow}
              onClick={() => setShowCurrencyList(true)}
              aria-hidden
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className={styles.balance}>
            Balance :
            {' '}
            {balanceParam.toString().replace('.', ',')}
          </div>
        </div>
        <div className={styles.amountInput}>
          <NumberFormat
            getInputRef={inputFocus}
            value={value}
            decimalSeparator=","
            thousandSeparator=" "
            displayType="input"
            prefix={
            (id === 1 && operation === 'Sell')
            || (id === 2 && operation === 'Buy') ? '– ' : '+ '
}
            type="text"
            placeholder="0"
            onValueChange={(values) => {
              const { floatValue } = values;
              if (id === 1) {
                setDisplayConversionIn(false);
                setDisplayConversionOut(true);
                setCurrencyInValue(floatValue);
              } else {
                setDisplayConversionIn(true);
                setDisplayConversionOut(false);
                setCurrencyOutValue(floatValue);
              }
            }}
            decimalScale={2}
          />
          {displayErrorMessage
            ? <div className={styles.errorMessage}>Exceeds your balance</div>
            : null }
        </div>
      </div>
    </>
  );
};

export default CurrencyWrapper;
