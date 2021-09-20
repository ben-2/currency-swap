import React, { useEffect } from 'react';
import axios from 'axios';

import { useQuery } from 'react-query';
import { useStoreActions } from '../../store/hooks';

const RefreshRate: React.FC = () => {
  const [intervalMs] = React.useState(10000);
  const setExchangeRate = useStoreActions((actions) => actions.setExchangeRate);

  const dataEURUSDT = useQuery(
    'EURUSDT',
    async () => {
      const res = await axios
        .get('https://api.binance.com/api/v3/ticker/price?symbol=EURUSDT');
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    },
  ).data;

  const dataGBPUSDT = useQuery(
    'GBPUSDT',
    async () => {
      const res = await axios
        .get('https://api.binance.com/api/v3/ticker/price?symbol=GBPUSDT');
      return res.data;
    },
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    },
  ).data;

  const usdRate = dataEURUSDT && dataEURUSDT.price;
  const gbpRate = dataGBPUSDT && dataGBPUSDT.price && usdRate
    ? usdRate / dataGBPUSDT.price : 0;

  useEffect(() => {
    setExchangeRate({ currency: 'USD', rate: usdRate });
  }, [setExchangeRate, usdRate]);

  useEffect(() => {
    setExchangeRate({ currency: 'GBP', rate: gbpRate });
  }, [gbpRate, setExchangeRate]);

  return (<></>);
};

export default RefreshRate;
