import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CURRENCIES } from '../constants';
import './Convertor.css';

function getImage(currency) {
  return CURRENCIES.find(c => c.symbol === currency).img;
}

class Convertor extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0 };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const {
      baseCurrency,
      targetCurrency,
      rate,
    } = this.props;
    const { value } = this.state;
    return (
      <div className="Convertor">
        <input className="Convertor-input" type="number" value={value} onChange={this.handleChange} />
        <div>{baseCurrency}</div>
        <img alt={baseCurrency} src={getImage(baseCurrency)} />
        <div>=</div>
        <div>{(rate * value).toFixed(4)}</div>
        <div>{targetCurrency}</div>
        <img alt={targetCurrency} src={getImage(targetCurrency)} />
      </div>
    );
  }
}

Convertor.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};

export default Convertor;
