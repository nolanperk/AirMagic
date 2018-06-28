import React, { Component } from 'react';
import propTypes from 'prop-types';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSales extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let apptSetDate = this.props.apptSetDate;
    let apptDate = this.props.apptDate;
    let proposal = this.props.proposal;
    let close = this.props.close;
    let walkthrough = this.props.walkthrough;
    let start = this.props.start;
    let preCleanDate = this.props.preCleanDate;
    let preCleanCharge = this.props.preCleanCharge;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Appt. Date</label>
            <input
              type="text"
              value={apptDate}
              id="apptDate"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Appt. Set Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptSetDate}
                id="apptSetDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Proposal Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={proposal}
                id="proposal"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Closed Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={close}
                id="close"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Walkthrough</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={walkthrough}
                id="walkthrough"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Start Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={start}
                id="start"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Pre-Clean Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanDate}
                id="preCleanDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Pre-Clean Charge</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanCharge}
                id="preCleanCharge"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


        </div>
      </div>
    );
  }
}

ModuleSales.propTypes ={
  apptSetDate: propTypes.string,
  apptDate: propTypes.string,
  proposal: propTypes.string,
  close: propTypes.string,
  walkthrough: propTypes.string,
  start: propTypes.string,
  preCleanDate: propTypes.string,
  preCleanCharge: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
