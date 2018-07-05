import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import emailImg from '../../../assets/icons/black/email.png';


export default class ModuleService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standingValue: this.props.standing,
    }
  }
  standingChange = e => {this.setState({standingValue: e.target.value});}


  // Render
  // ----------------------------------------------------
  render() {
    let standing = this.props.standing;
    let lastCall = this.props.lastCall;
    let spName = this.props.spName;
    let spEmail = this.props.spEmail;
    let spPhone = this.props.spPhone;
    let lastVisit = this.props.lastVisit;
    let newSP = this.props.newSP;
    let cancel = this.props.cancel;

    let emailLink = 'mailto:' + spEmail;
    let spPhoneLink = 'tel:' + spPhone;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Standing</label>
            <div
              className="selectBlock"
              id="standing"
              >
              <select id="standingSelect" value={this.state.standingValue} onChange={this.standingChange}>
                <option id="none"></option>
                <option id="Very+Happy">Very Happy</option>
                <option id="Happy">Happy</option>
                <option id="Satisfied">Satisfied</option>
                <option id="Unhappy">Unhappy</option>
                <option id="New+Customer">New Customer</option>
                <option id="Canceled">Canceled</option>
                <option id="Crew+Change">Crew Change</option>
                <option id="Completed+Work">Completed Work</option>
              </select>
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Last Call</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={lastCall}
                id="lastCall"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>



          <div className="inputBlock inputBlock--half">
            <label>Last Visit</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={lastVisit}
                id="lastVisit"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Cancel Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={cancel}
                id="cancel"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>New SP Start</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={newSP}
                id="newSP"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>SP Name</label>
            <input
              type="text"
              value={spName}
              id="spName"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>SP Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a href={emailLink}></a>
                <img src={emailImg} />
              </div>
              <input
                type="text"
                id="spEmail"
                value={spEmail}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>SP Phone</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a href={spPhoneLink}></a>
                <img src={phoneImg} />
              </div>
              <input
                type="text"
                value={spPhone}
                id="spPhone"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModuleService.propTypes ={
  standing: propTypes.string,
  lastCall: propTypes.string,
  spName: propTypes.string,
  spPhone: propTypes.string,
  lastVisit: propTypes.string,
  newSP: propTypes.string,
  spEmail: propTypes.string,
  cancel: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
}
