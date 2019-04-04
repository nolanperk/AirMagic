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


export default class CallModalCallBack extends Component {
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

    let today  = new Date();
    let dayTime;
    if (today.getHours() > 12) {
      if (today.getMinutes() < 10) {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
      } else {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
      }
    } else {
      if (today.getMinutes() < 10) {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
      } else {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";
      }
    }

    let finalEntry;
    if (localStorage.getItem('userInitials') !== '') {
      finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n';
    } else {
      finalEntry = dayTime + ' - ';
    }

    finalEntry += 'Contacted: ' + fields['Standing'];

    let notepadNote = '';
    if (this.props.notepad) {
      finalEntry += '\n' + this.props.notepad + '\n';
    }


    return(
      <div className="callColumn contact">

        <div className="inputGroup">
          <div className="inputBlock inputBlock--full">
            <h3>Set Callback Date</h3>
            <div className="inputBlock inputBlock--half">
              <div className="pickWrapper">
                <DayPicker onDayClick={this.props.handleDayClick} />
              </div>
              <label>Callback Date</label>
              <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                <input
                  type="text"
                  value={fields['Callback Date']}
                  id="callBack"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="inputGroup">
          <div className="inputBlock inputBlock--full">
            <h3>Note Stamp</h3>
            <textarea rows="5" id="logCallStamp">{finalEntry}</textarea>
          </div>
        </div>

        <button onClick={this.props.callNext} className="btn softGrad--blue nextBtn">Submit</button>

      </div>
    );
  }
}
