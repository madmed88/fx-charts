import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Currency.css';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: (Math.random() * 5).toFixed(4),
      change: (Math.random() * 2 - 1).toFixed(4),
    };
  }

  getClassName = () => {
    const { change } = this.state;
    const { targetCurrency, currency } = this.props;
    return `Currency-item${(change > 0 ? ' up' : ' down')}${(targetCurrency === currency.symbol ? ' selected' : '')}`;
  }

  render() {
    const { rate, change } = this.state;
    const { selectTarget, currency } = this.props;
    return (
      <div
        className={this.getClassName()}
        key={currency.symbol}
        onClick={() => selectTarget(currency.symbol)}
        onKeyPress={() => selectTarget(currency.symbol)}
        role="button"
        tabIndex="0"
      >
        <div className="Currency-item-labels">
          <div className="Currency-item-symbol">{currency.symbol}</div>
          <div className="Currency-item-name">{currency.name}</div>
        </div>
        <div className="Currency-item-labels">
          <div className="Currency-item-value">{rate}</div>
          <div className="Currency-item-change">{change}</div>
        </div>
      </div>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.shape({
    symbol: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  targetCurrency: PropTypes.string.isRequired,
  selectTarget: PropTypes.func.isRequired,
};

export default Currency;
