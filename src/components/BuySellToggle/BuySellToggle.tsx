import React from 'react';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './BuySellToggle.module.css';
import { useStoreActions, useStoreState } from '../../store/hooks';

const BuySellToggle: React.FC = () => {
  const operation = useStoreState((state) => state.operation);
  const setOperation = useStoreActions((actions) => actions.setOperation);
  return (
    <span className={styles.sphere}>
      {operation === 'Buy' ? (
        <div
          className={styles.arrow}
          onClick={() => setOperation('Sell')}
          aria-hidden
          data-testid="operation-toggle"
        >
          <ArrowUpwardIcon fontSize="small" />
        </div>
      )
        : (
          <div
            className={styles.arrow}
            onClick={() => setOperation('Buy')}
            aria-hidden
            data-testid="operation-toggle"
          >
            {' '}
            <ArrowDownwardSharpIcon fontSize="small" />
          </div>
        )}
    </span>
  );
};

export default BuySellToggle;
