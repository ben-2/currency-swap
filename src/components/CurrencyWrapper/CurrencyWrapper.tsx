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
}

const CurrencyWrapper: React.FC<Props> = (props) => {
  const {
    id, defaultFocus, exchangedCurrency, balance,
  } = props;
  const inputFocus: React.RefObject<HTMLInputElement> = useRef(null);
  const operation = useStoreState((state) => state.operation);
  const currencyInValue = useStoreState((state) => state.currencyInValue);
  const currencyOutValue = useStoreState((state) => state.currencyOutValue);
  const setCurrencyInValue = useStoreActions(
    (actions) => actions.setCurrencyInValue,
  );
  const setCurrencyOutValue = useStoreActions(
    (actions) => actions.setCurrencyOutValue,
  );

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
        <NumberFormat
          getInputRef={inputFocus}
          value={id === 1 ? currencyInValue : currencyOutValue}
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
            const { formattedValue } = values;
            if (id === 1) {
              setCurrencyInValue(formattedValue);
            } else {
              setCurrencyOutValue(formattedValue);
            }
          }}
          decimalScale={2}
        />
      </div>
    </div>
  );
};

export default CurrencyWrapper;
