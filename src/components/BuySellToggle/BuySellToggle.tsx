import React, { useState } from 'react';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './BuySellToggle.module.css';

const BuySellToggle: React.FC = () => {
  const [sellBuy, setSellBuy] = useState('buy');
  return (
    <span className={styles.sphere}>
      {sellBuy === 'buy' ? (
        <div
          className={styles.arrow}
          onClick={() => setSellBuy('sell')}
          aria-hidden="true"
        >
          <ArrowUpwardIcon fontSize="small" />
        </div>
      )
        : (
          <div
            className={styles.arrow}
            onClick={() => setSellBuy('buy')}
            aria-hidden="true"
          >
            {' '}
            <ArrowDownwardSharpIcon fontSize="small" />
          </div>
        )}
    </span>
  );
};

export default BuySellToggle;
