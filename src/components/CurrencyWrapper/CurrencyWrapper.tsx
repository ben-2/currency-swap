import React, { useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NumberFormat from 'react-number-format';
import { CurrencyAccount } from '../../common/types/currency.interface';
import styles from './CurrencyWrapper.module.css';
import { useStoreActions, useStoreState } from '../../store/hooks';

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
  const globalState = useStoreState((state) => state);
  const globalActions = useStoreActions((actions) => actions);
  const {
    operation,
    currencyInValue,
    displayConversionIn,
    displayConversionOut,
    currencyInValueControlled,
    currencyOutValue,
    currencyOutValueControlled,
  } = globalState;
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
        <div className={styles.accountBox}>
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
            {balance.toString().replace('.', ',')}
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
              if (id === 1 && floatValue) {
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
        </div>
      </div>
    </>
  );
};

export default CurrencyWrapper;
