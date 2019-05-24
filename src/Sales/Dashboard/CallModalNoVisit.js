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


export default class CallModalNoVisit extends Component {
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
    return(
      <div className="callColumn contact">
        <div className="inputGroup solo">
          <h3>Sales Follow Up Details</h3>
          <div className="inputBlock inputBlock--half">
            <div className="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Follow Up Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <input
                type="text"
                value={fields['Appt. Date']}
                id="apptDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Follow Up Time</label>
            <input
              type="text"
              value={fields['Appt. Time']}
              id="apptTime"
              onChange={this.props.changeRecordHandler}
            />
          </div>


          <div className="inputBlock inputBlock--full">
            <label>Sales Rep</label>
            <div
              className="selectBlock"
              id="timesPerWeek"
              >
              <select id="repSelect" value={fields['Sales Rep']} onChange={this.props.selectChange}>
                <option id="none"></option>
                <option disabled>Tampa</option>
                <option id="Nolan+Perkins">Nolan Perkins</option>
                <option id="Tyler+Perkins">Tyler Perkins</option>
                <option disabled>------------</option>
                <option disabled>Orlando</option>
                <option id="Joel+Horwitz">Joel Horwitz</option>
                <option id="Christy+Subler">Christy Subler</option>
              </select>
            </div>
          </div>
        </div>

        <button onClick={this.props.callNext} className="btn softGrad--blue nextBtn">Confirm Appt Details</button>

      </div>
    );
  }
}
