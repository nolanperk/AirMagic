import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planValue: this.props.plan,
      arValue: this.props.ar,
      attendedValue: this.props.attended,
      packetValue: this.props.packet,
      standingValue: this.props.standing,
    }
  }
  planChange = e => {this.setState({planValue: e.target.value});}
  arChange = e => {this.setState({arValue: e.target.value});}
  attendedChange = e => {this.setState({attendedValue: e.target.value});}
  standingChange = e => {this.setState({standingValue: e.target.value});}
  packetChange = e => {this.setState({packetValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        planValue: this.props.plan,
        arValue: this.props.ar,
        attendedValue: this.props.attended,
        packetValue: this.props.packet,
        standingValue: this.props.standing,
      })
    }).bind(this), 50);
  }
  // Render
  // ----------------------------------------------------
  render() {
    let contDate = this.props.contDate;
    let apptTime = this.props.apptTime;
    let fdd = this.props.fdd;
    let sign = this.props.sign;
    let graduation = this.props.graduation;
    let plan = this.props.plan;
    let ar = this.props.ar;
    let downPayment = this.props.downPayment;
    let veteran = this.props.veteran;

    let attended = this.props.attended;
    let standing = this.props.standing;
    let packet = this.props.packet;

    let referral = this.props.referral;
    let apptDate = this.props.apptDate;

    let activeDate = this.props.activeDate;
    let inactiveDate = this.props.inactiveDate;


    if (this.props.veteran && document.getElementById("veteran")) {
      document.getElementById("veteran").checked = this.props.veteran;
    }

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Packet Sent</label>
            <div
              className="selectBlock"
              id="packet"
              >
              <select id="packetSelect" value={this.state.packetValue} onChange={this.packetChange}>
                <option></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Standing</label>
            <div
              className="selectBlock"
              id="standing"
              >
              <select id="standingSelect" value={this.state.standingValue} onChange={this.standingChange}>
                <option></option>
                <option value="Purchased">Purchased</option>
                <option value="Former">Former</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
                <option value="Interested">Interested</option>
                <option value="Lost Contact">Lost Contact</option>
                <option value="No Longer Interested">No Longer Interested</option>
                <option value="No Show">No Call / No Show</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--75">
            <label>Contact Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={contDate}
                id="contDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--quart check">
            <label>Veteran?</label>
            <input
              type="checkbox"
              id="veteran"
              onChange={this.props.changeCheckHandler}
              // {veteran === true ? 'checked' : ''}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Appt. Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                onChange={this.props.changeRecordHandler}
                value={apptDate}
                id="apptDate"
              />
            </div>
          </div>
            <div className="inputBlock inputBlock--half">
              <label>Appt. Time</label>
              <input
                type="text"
                onChange={this.props.changeRecordHandler}
                value={apptTime}
                id="apptTime"
              />
            </div>

          <div className="inputBlock inputBlock--half">
            <label>Attended</label>
            <div
              className="selectBlock"
              id="attended"
              >
              <select id="attendedSelect" value={this.state.attendedValue} onChange={this.attendedChange}>
                <option></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

        <div className="inputBlock inputBlock--half">
          <label>Sales Rep</label>
          <div
            className="selectBlock"

            >
            <select id="rep" value={this.props.rep} onChange={this.props.repChange}>
              <option value=""></option>
              <option>Rafael Milanes</option>
              <option>Tyler Perkins</option>
            </select>
          </div>
        </div>

          <hr />

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Active Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={activeDate}
                id="activeDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Inactive Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={inactiveDate}
                id="inactiveDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <hr />
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>FDD Sign Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
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
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Sign Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
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
                <option></option>
                <option value="Plan A">Plan A</option>
                <option value="Plan B">Plan B</option>
                <option value="Plan C">Plan C</option>
                <option value="Plan D">Plan D</option>
                <option value="Plan E">Plan E</option>
                <option value="Plan F">Plan F</option>
                <option value="Plan G">Plan G</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>ADDITIONAL REV?</label>
            <div
              className="selectBlock"
              id="ar"
              >
              <select id="arSelect" value={this.state.arValue} onChange={this.arChange}>
                <option></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Graduation Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
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
  rep: propTypes.string,
  repChange: propTypes.function,
  sign: propTypes.string,
  graduation: propTypes.string,
  plan: propTypes.string,
  downPayment: propTypes.string,
  changeSelectBlock: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  referral: propTypes.string,
  packet: propTypes.string,
  veteran: propTypes.bool,
  standing: propTypes.string,
  contDate: propTypes.string,
  apptDate: propTypes.string,
  attended: propTypes.string,
}
