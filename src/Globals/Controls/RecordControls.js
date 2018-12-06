import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import calendar from '../../assets/icons/white/calendar.png';
import save from '../../assets/icons/white/save.png';
import arrow_forward from '../../assets/icons/black/arrow_forward.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';
import phoneImg from '../../assets/icons/white/phone.png';
import ApiConfig from '../../config'

export default class SortBy extends Component {

  addCalendar = () => {
    let record = this.props.currentRecord;

    //subject
    let finalSubject;
    if (this.props.currentTable === 'Franchisees') {
      finalSubject = 'Call PF: ' + record['SP Name'];
    } else {
      finalSubject = 'Call ' + record['Main contact'] + ' at ' + record['Company Name'];
    }

    //callbackDate
    let today  = new Date();
    let todayTime;
    if (today.getHours() > 11) {
      if (today.getHours() === 12) {
        todayTime = today.getHours() + ':' + today.getMinutes() + ' pm';
      } else {
        todayTime = (today.getHours() - 12) + ':' + today.getMinutes() + ' pm';
      }
    } else {
      todayTime = today.getHours() + ':' + today.getMinutes() + ' am';
    }
    let callBackDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + todayTime;
    let finalDesc = "Write notes to yourself here. (" + window.location.href + ")";

    let calData = {
      subject: finalSubject,
      description: finalDesc,
      location: ' ',
      begin: callBackDate,
      end: callBackDate,
      filename: finalSubject,
    }

    let eventFile = 'BEGIN:VCALENDAR\n';
        eventFile += 'VERSION:2.0\n';
        eventFile += 'BEGIN:VEVENT\n';
        eventFile += 'DTSTAMP:' + (new Date(calData.begin)).toISOString().replace(/-|:|\.\d\d\d/g,"") + '\n';
        eventFile += 'STATUS:CONFIRMED\n';
        eventFile += 'DTSTART:' + (new Date(calData.begin)).toISOString().replace(/-|:|\.\d\d\d/g,"") +'\n';
        eventFile += 'DTEND:' + (new Date(calData.end)).toISOString().replace(/-|:|\.\d\d\d/g,"") +'\n';
        eventFile += 'SUMMARY:' + calData.subject +'\n';
        eventFile += 'DESCRIPTION:' + calData.description +'\n';
        eventFile += 'LOCATION:' + calData.location +'\n';
        eventFile += 'BEGIN:VALARM\n';
        eventFile += 'TRIGGER:-PT15M\n';
        eventFile += 'ACTION:DISPLAY\n';
        eventFile += 'END:VALARM\n';
        eventFile += 'TRANSP:OPAQUE\n';
        eventFile += 'END:VEVENT\n';
        eventFile += 'END:VCALENDAR\n';


    var fakeDownloadA = document.createElement('a');
    fakeDownloadA.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(eventFile));
    fakeDownloadA.setAttribute('download', calData.filename + '.ics');

    fakeDownloadA.style.display = 'none';
    document.body.appendChild(fakeDownloadA);
    fakeDownloadA.click();
    document.body.removeChild(fakeDownloadA);
  }


  // Render
  // ----------------------------------------------------
  render() {
    return (
      <div className="ControlsBar recordControls">
        {this.botButtons}
      </div>
    );
  }

  get botButtons() {


    let btnClasses = 'ControlsBar--btn';
    if (this.props.newRecord) {
      btnClasses = 'ControlsBar--btn disabled';
    }

    let callBackClasses = 'navIcon softGrad--primary';
    let googleCalButton = 'navIcon softGrad--blue';
    if (this.props.newRecord) {
      googleCalButton = 'navIcon softGrad--primary isHidden';
      callBackClasses = 'navIcon softGrad--primary isHidden';
    }

    if (localStorage.getItem('isOutside') === 'true') {
      return (
        <div>
          <div className={btnClasses} onClick={this.props.recordChanger} id="prev">
            <div className="navIcon whiteCard">
              <img src={arrow_back} alt="previous" />
            </div>
            <p>Previous Record</p>
          </div>

          <div className="ControlsBar--btn saveBtn">
            <div className="navIcon softGrad--secondary" onClick={this.props.saveRecordHandler}>
              <img src={save} alt="save changes" />
            </div>
          </div>


          <div className={btnClasses} onClick={this.props.recordChanger} id="next">
            <p>Next Record</p>
            <div className="navIcon whiteCard">
              <img src={arrow_forward} alt="next" />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={btnClasses} onClick={this.props.recordChanger} id="prev">
            <div className="navIcon whiteCard">
              <img src={arrow_back} alt="previous" />
            </div>
            <p>Previous Record</p>
          </div>

          <div className="ControlsBar--btn saveBtn">

            <div className={googleCalButton} onClick={this.props.setAppt}>
              <img src={calendar} alt="Add to Google Calendar" />
            </div>

            <div className={callBackClasses} onClick={this.addCalendar}>
              <img src={phoneImg} alt="callback" />
            </div>
            <div className="navIcon softGrad--secondary" onClick={this.props.saveRecordHandler}>
              <img src={save} alt="save changes" />
            </div>
          </div>


          <div className={btnClasses} onClick={this.props.recordChanger} id="next">
            <p>Next Record</p>
            <div className="navIcon whiteCard">
              <img src={arrow_forward} alt="next" />
            </div>
          </div>
        </div>
      )
    }
  }
}


SortBy.propTypes = {
  newRecord: propTypes.bool.isRequired,
  recordChanger: propTypes.func.isRequired,
  saveRecordHandler: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  setAppt: propTypes.func.isRequired,
  // arrowKeyHandler: propTypes.func.isRequired,
}
