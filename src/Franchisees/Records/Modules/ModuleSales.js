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
    let fdd = this.props.fdd;
    let sign = this.props.sign;
    let graduation = this.props.graduation;
    let plan = this.props.plan;
    let ar = this.props.ar;
    let downPayment = this.props.downPayment;

    let attended = this.props.attended;
    let standing = this.props.standing;
    let packet = this.props.packet;

    let referral = this.props.referral;
    let apptDate = this.props.apptDate;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Referral</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={referral}
              id="referral"
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Packet Sent</label>
            <div
              className="selectBlock"
              id="packet"
              >
              <select id="packetSelect" value={this.state.packetValue} onChange={this.packetChange}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
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
                <option id="none"></option>
                <option id="Purchased">Purchased</option>
                <option id="Former">Former</option>
                <option id="Pending">Pending</option>
                <option id="Inactive">Inactive</option>
                <option id="Interested">Interested</option>
                <option id="Lost+Contact">Lost Contact</option>
                <option id="No+Longer+Interested">No Longer Interested</option>
                <option id="No+Call+or+Show">No Call / No Show</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Contact Date</label>
            <div className="inputWithTag">
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

          <div className="inputBlock inputBlock--half">
            <label>Appt. Date</label>
            <div className="inputWithTag">
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
            <label>Attended</label>
            <div
              className="selectBlock"
              id="attended"
              >
              <select id="attendedSelect" value={this.state.attendedValue} onChange={this.attendedChange}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>


          <hr />

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
                <option id="Plan+G">Plan G</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Aditional Rev?</label>
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
  referral: propTypes.string,
  packet: propTypes.string,
  standing: propTypes.string,
  contDate: propTypes.string,
  apptDate: propTypes.string,
  attended: propTypes.string,
}
