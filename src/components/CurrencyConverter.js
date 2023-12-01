import React, { useState } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const exchangeRates = {
    USD: {
      EUR: 0.85,
      GBP: 0.74,
      JPY: 110.20,
    },
    EUR: {
      USD: 1.18,
      GBP: 0.87,
      JPY: 128.14,
    },
    GBP: {
      USD: 1.36,
      EUR: 1.15,
      JPY: 147.11,
    },
    JPY: {
      USD: 0.0091,
      EUR: 0.0078,
      GBP: 0.0068,
    },
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleConvert = () => {
    if (fromCurrency && toCurrency && amount) {
      const exchangeRate = exchangeRates[fromCurrency][toCurrency];
      const converted = (amount * exchangeRate).toFixed(2);
      setConvertedAmount(converted);
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <input type="number" value={amount} onChange={handleAmountChange} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div className="equals">=</div>
      <div className="output-container">
        <p>{convertedAmount !== null ? convertedAmount : '...'}</p>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
};

export default CurrencyConverter;
