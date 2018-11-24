import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sharedStyles from './exchangeWidget.module.css';
import { getExchangeSum, getFromCurrency, getToCurrency, getRates } from './../../selectors';
import currencies from './../../constants/currencies';
import { convertGivenSumFromTo } from './../../utils/conversion';

const getRatesHtml = (fromCurr, toCurr, rate) => {
  return {
    __html: `<span class="${sharedStyles.small}">${currencies[fromCurr].symbol}</span>`
      + `1 = `
      + `<span class="${sharedStyles.small}">${currencies[toCurr].symbol}</span>`
      + `${rate}`
  };
};

const mapStateToProps = (state) => {
  return {
    exchangeSum: getExchangeSum(state),
    fromCurrency: getFromCurrency(state),
    toCurrency: getToCurrency(state),
    rates: getRates(state)
  };
};

const ExchangeResult = (props) => {
  const { exchangeSum, fromCurrency, toCurrency, rates } = props;
  const sum = convertGivenSumFromTo(exchangeSum || 0)(rates[toCurrency])(rates[fromCurrency])
    .toFixed(2)
  ;
  const rateForUnit = convertGivenSumFromTo(1)(rates[toCurrency])(rates[fromCurrency])
    .toFixed(2)
  ;

  return (
    <div className={sharedStyles.exchangeResult}>
      <span className={sharedStyles.heading}>{ sum }</span>
      <small className={sharedStyles.label}
             dangerouslySetInnerHTML={getRatesHtml(fromCurrency, toCurrency, rateForUnit)}
      />
    </div>
  );
};

ExchangeResult.propsTypes = {
  exchangeSum: PropTypes.string,
  rate: PropTypes.string,
  fromCurrency: PropTypes.string,
  toCurrency: PropTypes.string
};

export default connect(mapStateToProps)(ExchangeResult);