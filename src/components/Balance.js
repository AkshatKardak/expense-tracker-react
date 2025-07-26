
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Safe money formatter
function moneyFormatter(num) {
  const n = Number(num);
  if (isNaN(n)) return '$ 0.00';

  const parts = n.toFixed(2).split('.');
  return (
    '$ ' +
    (parts[0].charAt(0) === '-' ? '-' : '') +
    parts[0]
      .replace('-', '')
      .split('')
      .reverse()
      .reduce((acc, digit, i) => {
        return digit + (i && i % 3 === 0 ? ',' : '') + acc;
      }, '') +
    '.' +
    parts[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => Number(transaction.amount) || 0);
  const total = amounts.reduce((acc, item) => acc + item, 0);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(total)}</h1>
    </>
  );
};

