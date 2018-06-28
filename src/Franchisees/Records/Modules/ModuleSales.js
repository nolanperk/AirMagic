import React, { Component } from 'react';
import propTypes from 'prop-types';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planValue: this.props.plan,
      arValue: this.props.ar,
    }
  }
  planChange = e => {this.setState({planValue: e.target.value});}
  arChange = e => {this.setState({arValue: e.target.value});}
  // Render
  // ----------------------------------------------------
  render() {
    let contDate = this.props.contDate;
    let fdd = this.props.fdd;
    let sign = this.props.sign;
    let graduation = this.props.graduation;
    let plan = this.props.plan;
    let ar = this.props.ar;
    let downPayment = this.props.downPayment;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Contact Date</label>
            <input
              type="text"
              value={contDate}
              id="contDate"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>FDD Sign Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={fdd}
                id="fdd"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sign Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={sign}
                id="sign"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Money Down</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={downPayment}
                id="downPayment"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>



          <div className="inputBlock inputBlock--half">
            <label>Plan Type</label>
            <div
              className="selectBlock"
              id="plan"
              >
              <select id="planSelect" value={this.state.planValue} onChange={this.planChange}>
                <option id="none"></option>
                <option id="Plan+A">Plan A</option>
                <option id="Plan+B">Plan B</option>
                <option id="Plan+C">Plan C</option>
                <option id="Plan+D">Plan D</option>
                <option id="Plan+E">Plan E</option>
                <option id="Plan+F">Plan F</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Plan Type</label>
            <div
              className="selectBlock"
              id="ar"
              >
              <select id="arSelect" value={this.state.arValue} onChange={this.arChange}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Graduation Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={graduation}
                id="graduation"
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
  fdd: propTypes.string,
  ar: propTypes.string,
  sign: propTypes.string,
  graduation: propTypes.string,
  plan: propTypes.string,
  downPayment: propTypes.string,
  changeSelectBlock: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
}
