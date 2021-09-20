import Button from '@mui/material/Button';
import React from 'react';
import styles from './ExchangeButton.module.css';

type ExchangeButtonProps = {
}

const ExchangeButton: React.FC<ExchangeButtonProps> = () => (
  <Button variant="contained">Contained</Button>
);

export default ExchangeButton;
