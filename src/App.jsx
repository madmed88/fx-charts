import React, { Component } from 'react';
import Chart from './chart/Chart';
import Sidebar from './sidebar/Sidebar';
import Convertor from './convertor/Convertor';
import { API_SUFFIX, API_URL, CURRENCIES } from './constants';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      baseCurrency: 'EUR',
      targetCurrency: 'USD',
    };
  }

  componentDidMount() {
    const { baseCurrency, targetCurrency } = this.state;
    this.fetchData(baseCurrency, targetCurrency);
  }

  fetchData = (base, target) => {
    const functionName = 'FX_DAILY';
    fetch(`${API_URL}${functionName}&from_symbol=${base}&to_symbol=${target}${API_SUFFIX}`)
      .then(response => response.json())
      .then((data) => {
        if (data['Time Series FX (Daily)']) {
          this.setState({
            data: Object.entries(data['Time Series FX (Daily)'])
              .map((entry => ({ x: new Date(entry[0]), y: parseFloat(entry[1]['4. close']) }))),
          });
        }
      });
  }

  selectBase = (event) => {
    const { targetCurrency } = this.state;
    this.setState({ data: null });
    this.fetchData(event.target.value, targetCurrency);
    this.setState({ baseCurrency: event.target.value });
  }

  selectTarget = (currency) => {
    const { baseCurrency } = this.state;
    this.setState({ data: null });
    this.fetchData(baseCurrency, currency);
    this.setState({ targetCurrency: currency });
  }

  renderChart = () => {
    const { baseCurrency, targetCurrency, data } = this.state;
    return (
      <React.Fragment>
        <div className="Main-title">
          <div>
            {baseCurrency}
            <span> to </span>
            {targetCurrency}
            <span> Chart </span>
          </div>
          <div className="Main-subtitle">Last 100 days</div>
        </div>
        <Chart data={data} />
        <Convertor
          rate={data[data.length - 1].y}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
        />
      </React.Fragment>
    );
  }

  render() {
    const { baseCurrency, targetCurrency, data } = this.state;
    return (
      <div className="App">
        <Sidebar
          currencies={CURRENCIES}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
          selectBase={this.selectBase}
          selectTarget={this.selectTarget}
        />
        <div className="Main">
          { data ? this.renderChart() : <img src={logo} className="App-logo" alt="logo" /> }
        </div>
      </div>
    );
  }
}

export default App;
