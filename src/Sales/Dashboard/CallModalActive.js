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


export default class CallModalActive extends Component {
  constructor(props) {
    super();
    this.state = {
      streetViewSrc: '',
    }
  }

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

    return(
      <div className="callColumn contact activeCall">
        <div className="topActive">
          <div className="inputGroup">
            <div className="inputBlock inputBlock--full">
              <h4>Services Per Week **</h4>
              <div
                className="selectBlock"
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

          <div className="inputGroup">
            <h4>Building <span>(nice to have)</span></h4>
            <div className="inputBlock inputBlock--third">
              <p>Sq Footage</p>
              <input
                type="text"
                value={fields['Actual Sq Footage']}
                id="sqFtReal"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--third">
              <p>Employees</p>
              <input
                type="text"
                value={fields['Employees']}
                id="emp"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--third">
              <p>Restrooms</p>
              <input
                type="text"
                value={fields['Restrooms']}
                id="restrooms"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        </div>

        <div className="inputGroup notepad">
          <h4>Notepad</h4>
          <div className="inputBlock inputBlock--full">
            <textarea
              id="notepadNotes"
              rows="4"
              placeholder="Jot down any notes here..."
            />
          </div>
        </div>

        <button onClick={this.props.callNext} className="btn softGrad--primary nextBtn">Call Completed</button>
      </div>
    );
  }
}
