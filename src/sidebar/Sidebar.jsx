import React from 'react';
import PropTypes from 'prop-types';
import Currency from '../currency/Currency';
import './Sidebar.css';

function Sidebar(props) {
  const {
    baseCurrency,
    targetCurrency,
    selectBase,
    selectTarget,
    currencies,
  } = props;
  return (
    <div className="Sidebar">
      <div className="Base-currency">
        <div className="Base-currency-title">Currency</div>
        <select className="Base-currency-select" value={baseCurrency} onChange={selectBase}>
          {currencies.map(currency => (
            <option key={currency.symbol} value={currency.symbol}>{currency.name}</option>
          ))}
        </select>
      </div>
      {
        currencies
          .filter(currency => currency.symbol !== baseCurrency)
          .map(currency => (
            <Currency
              key={currency.symbol}
              currency={currency}
              targetCurrency={targetCurrency}
              selectTarget={selectTarget}
            />
          ))
      }
    </div>
  );
}

Sidebar.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  selectBase: PropTypes.func.isRequired,
  selectTarget: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequried,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sidebar;
