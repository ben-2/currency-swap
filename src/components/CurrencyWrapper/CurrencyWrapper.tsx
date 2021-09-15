import React from 'react';

interface Props {
message: string;
}

export const CurrencyWrapper: React.FC<Props> = (props) => {
  const { message } = props;
  return (
    <div>{message}</div>
  );
};
