import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';


export default class CallModalStart extends Component {


  // Render
  // ----------------------------------------------------
  render() {
    let fields = this.props.openedCall.fields;

    let logNotes = '';
    if (fields['Notes']) {
      logNotes = fields['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    return (
      <div className="callColumn data">
        <div className="ModuleList">
          {this.contact}
          {this.building}
          {this.service}
          {this.history}
          {this.location}
        </div>
      </div>
    );
  }


  get building() {
    let fields = this.props.openedCall.fields;

    if (fields['Monthly Amount'] || fields['Actual Sq Footage'] || fields['Restrooms'] || fields['Times per Week']) {
      return (
        <div className="ModuleCard moduleNumbers">
          <div className="inner">
            <div className="inputBlock inputBlock--half">
              <label>Monthly Amount</label>
              <div className="inputWithTag">
                <div className="inputTag selectable">
                  <img src={dollarImg} alt="" />
                </div>
                <input
                  type="text"
                  value={fields['Monthly Amount']}
                  id="amount"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--half">
              <label>Restrooms</label>
              <input
                type="text"
                value={fields['Restrooms']}
                id="restrooms"
                onChange={this.props.changeRecordHandler}
              />
            </div>

            <div className="inputBlock inputBlock--half">
              <label>Sq. Footage</label>
              <input
                type="text"
                value={fields['Sq. Footage']}
                id="sqFt"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--half">
              <label>Actual Sq. Ft.</label>
              <input
                type="text"
                value={fields['Actual Sq Footage']}
                id="sqFtReal"
                onChange={this.props.changeRecordHandler}
              />
            </div>


            <div className="inputBlock inputBlock--half">
              <label>Times / Week</label>
              <div
                className="selectBlock"
                id="timesPerWeek"
                >
                <select id="timesPerWeekSelect" value={fields['Times per Week']} onChange={this.props.selectChange}>
                  <option value="none"></option>
                  <option value="1x">1 X WEEK</option>
                  <option value="2x">2 X WEEK</option>
                  <option value="3x">3 X WEEK</option>
                  <option value="4x">4 X WEEK</option>
                  <option value="5x">5 X WEEK</option>
                  <option value="6x">6 X WEEK</option>
                  <option value="7x">7 X WEEK</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  get service() {
    let fields = this.props.openedCall.fields;

    let salutation = fields['Saalutation'];
    let contact = fields['Main contact'];
    let title = fields['Title'];
    let altContact = fields['Alternate Contact'];
    let phone = fields['Office Phone'];
    let ext = fields['Extension'];
    let cell = fields['Cell Phone'];
    let email = fields['Email'];

    let emailLink = 'mailto:' + email;

      return (
        <div className="ModuleCard moduleContact">
          <div className="inner">
            <div className="inputBlock inputBlock--quart">
              <label>Salutation</label>
              <input
                type="text"
                id="salutation"
                value={salutation}
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--75">
              <label>Main Contact</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={this.props.changeRecordHandler}
              />
            </div>

            <div className="inputBlock inputBlock--half">
              <label>Contact Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--half">
              <label>Alt. Contact</label>
              <input
                type="text"
                id="altContact"
                value={altContact}
                onChange={this.props.changeRecordHandler}
              />
            </div>

            <div className="inputBlock inputBlock--large">
              <label>Office Phone</label>
              <div className="inputWithTag">
                  <div className="inputTag">
                    <img src={phoneBl} />
                  </div>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--small">
              <label>Extension</label>
              <div className="inputWithTag">
                <div className="inputTag">
                  <img src={numberImg} />
                </div>
                <input
                  type="text"
                  id="ext"
                  value={ext}
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--full">
              <label>Email</label>
              <div className="inputWithTag">
                <div className="inputTag">
                  <a onContextMenu={this.handleClick} href={emailLink}></a>
                  <img src={emailImg} />
                </div>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--half">
              <label>Cell Phone</label>
              <div className="inputWithTag">
                <div className="inputTag">
                  <img src={phoneBl} />
                </div>
                <input
                  type="text"
                  id="cell"
                  value={cell}
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }

  get history() {
    let fields = this.props.openedCall.fields;

      return (
        <div className="ModuleCard moduleNumbers">
          <div className="inner">
            <div className="inputBlock inputBlock--half">
              <label>Appt. Set By</label>
              <div
                className="selectBlock"
                id="setBy"
                >
                <select id="setBySelect" value={fields['Appt. Set By']} onChange={this.props.selectChange}>
                  <option id="none"></option>
                  <option disabled>---------------</option>
                  <option disabled>Inside Sales</option>
                  <option disabled>---------------</option>
                  <option id="Carla+Milian">Carla Milian</option>
                  <option id="Shana+Thorn">Shana Thorn</option>
                  <option id="Jett">Jett</option>
                  <option id="Jason">Jason</option>
                  <option id="Justin">Justin</option>
                  <option id="Mike">Mike</option>
                  <option disabled>---------------</option>
                  <option disabled>Outside Sales</option>
                  <option disabled>---------------</option>
                  <option id="Joel+Horwitz">Joel Horwitz</option>
                  <option id="Tyler+Perkins">Tyler Perkins</option>
                  <option id="Nolan+Perkins">Nolan Perkins</option>
                  <option disabled>---------------</option>
                  <option disabled>Other</option>
                  <option disabled>---------------</option>
                  <option id="Prospectr">Prospectr</option>
                  <option id="Referral">Referral</option>
                  <option id="Incoming+Call">Incoming Call</option>
                  <option disabled>---------------</option>
                  <option disabled>Old</option>
                  <option id="Linda+Goldberg">Linda Goldberg</option>
                  <option id="Eric+Kleeman">Eric Kleeman</option>
                  <option disabled>---------------</option>
                  <option disabled>Marketing</option>
                  <option disabled>---------------</option>
                  <option id="Google">Google</option>
                  <option id="Thumbtack">Thumbtack</option>
                  <option id="Constant+Contact">Constant Contact</option>
                </select>
              </div>
            </div>
            <div className="inputBlock inputBlock--half">
              <div class="pickWrapper">
                <DayPicker onDayClick={this.props.handleDayClick} />
              </div>
              <label>Appt Set Date</label>
              <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                <div className="inputTag">
                  <img src={calendarImg} alt="" />
                </div>
                <input
                  type="text"
                  value={fields['Appt. Set Date']}
                  id="apptSet"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--half">
              <div class="pickWrapper">
                <DayPicker onDayClick={this.props.handleDayClick} />
              </div>
              <label>Appt Date</label>
              <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                <div className="inputTag">
                  <img src={calendarImg} alt="" />
                </div>
                <input
                  type="text"
                  value={fields['Appt. Date']}
                  id="apptDate"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>

            <div className="inputBlock inputBlock--half">
              <label>Appt Time</label>
              <input
                type="text"
                onChange={this.props.changeRecordHandler}
                value={fields['Appt. Time']}
                id="apptTime"
              />
            </div>
            <div className="inputBlock inputBlock--half">
              <div class="pickWrapper">
                <DayPicker onDayClick={this.props.handleDayClick} />
              </div>
              <label>Proposal Date</label>
              <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                <div className="inputTag">
                  <img src={calendarImg} alt="" />
                </div>
                <input
                  type="text"
                  value={fields['Proposal Date']}
                  id="proposal"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }

  get location() {
    let fields = this.props.openedCall.fields;
    let addr1 = fields['Address 1'];
    let addr2 = fields['Address 2'];
    let city = fields['City'];
    let zip = fields['Zip'];
    let county = fields['County'];
    let emp = fields['Employees'];
    let company = fields['Company Name'];

    return (
      <div className="ModuleCard moduleLocation">
        <div className="inner">

          <div className="inputBlock inputBlock--large">
            <label>Address 1</label>
            <input
              type="text"
              value={addr1}
              id="addr1"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--small">
            <label>Address 2</label>
            <input
              type="text"
              value={addr2}
              id="addr2"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>City</label>
            <input
              type="text"
              value={city}
              id="city"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Zip</label>
            <input
              type="text"
              value={zip}
              id="zip"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>County</label>
            <input
              type="text"
              value={county}
              id="county"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Employees</label>
            <input
              type="text"
              value={emp}
              id="emp"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}
