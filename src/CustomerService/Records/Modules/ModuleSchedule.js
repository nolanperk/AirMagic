import React, { Component } from 'react';
import propTypes from 'prop-types';

import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSchedule extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard">
        {this.AccountingView}
      </div>
    );
  }
  get AccountingView() {
    let sqFt = this.props.sqFt;
    let sqFtReal = this.props.sqFtReal;
    let amount = this.props.amount;
    let hoursPer = this.props.hoursPer;
    let sqFtPer = this.props.sqFtPer;
    let timesPerWeek = this.props.timesPerWeek;
    let weekDays = this.props.weekDays;
    if (this.props.currentRecordView === 'accounting') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Monthly Amount</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={amount}
                id="amount"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Times / Week</label>
            <input
              type="text"
              value={timesPerWeek}
              id="timesPerWeek"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--full">
            <label>Days of Week</label>
            <input
              type="text"
              value={weekDays}
              id="weekDays"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Monthly Amount</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={amount}
                id="amount"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Times / Week</label>
            <input
              type="text"
              value={timesPerWeek}
              id="timesPerWeek"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--full">
            <label>Days of Week</label>
            <input
              type="text"
              value={weekDays}
              id="weekDays"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sq. Footage</label>
            <input
              type="text"
              value={sqFt}
              id="sqFt"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Actual Sq. Ft.</label>
            <input
              type="text"
              value={sqFtReal}
              id="sqFtReal"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Hours Per</label>
            <input
              type="text"
              value={hoursPer}
              id="hoursPer"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Sq Ft. / Hour</label>
            <input
              type="text"
              value={sqFtPer}
              id="sqFtPer"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    }
  }
}

ModuleSchedule.propTypes ={
  currentRecordView: propTypes.string.isRequired,
  sqFt: propTypes.string,
  sqFtReal: propTypes.string,
  amount: propTypes.string,
  hoursPer: propTypes.string,
  sqFtPer: propTypes.string,
  timesPerWeek: propTypes.string,
  weekDays: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
