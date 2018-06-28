import React, { Component } from 'react';
import propTypes from 'prop-types';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';
import numberImg from '../../../assets/icons/black/number.png';

export default class ModulePipeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setByValue: this.props.setBy,
    }
  }
  setByChange = e => {this.setState({setByValue: e.target.value});}
  // Render
  // ----------------------------------------------------
  render() {
    let callCount = this.props.callCount;
    let setBy = this.props.apptBy;
    let apptSet = this.props.apptSet;
    let apptDate = this.props.apptDate;
    let proposal = this.props.proposal;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--full">
            <label>Times Called</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={numberImg} />
              </div>
              <input
                type="text"
                id="callCount"
                value={callCount}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Appt Set By</label>
            <div
              className="selectBlock"
              id="setBy"
              >
              <select id="setBySelect" value={this.state.setByValue} onChange={this.setByChange}>
                <option id="none"></option>
                <option id="Linda+Goldberg">Linda Goldberg</option>
                <option id="Eric+Kleeman">Eric Kleeman</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Appt Set Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptSet}
                id="apptSet"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Appt Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptDate}
                id="apptDate"
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


        </div>
      </div>
    );
  }
}

ModulePipeline.propTypes ={
  callCount: propTypes.string,
  apptBy: propTypes.string,
  apptSet: propTypes.string,
  apptDate: propTypes.string,
  proposal: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
