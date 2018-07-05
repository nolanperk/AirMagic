import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendar from '../../assets/icons/white/calendar.png';
import save from '../../assets/icons/white/save.png';
import arrow_forward from '../../assets/icons/black/arrow_forward.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';

export default class SortBy extends Component {

  addCalendar = () => {
    let record = this.props.currentRecord;

    //subject
    let finalSubject = 'Call ' + record['SP Name'];

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
    let callBackDate = (today.getMonth()+3) + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + todayTime;
    let finalDesc = "Write notes to yourself here. (" + window.location.href + ")";

    let calData = {
      subject: finalSubject,
      description: finalDesc,
      location: ' ',
      begin: callBackDate,
      end: callBackDate,
      filename: finalSubject,
    }

    let cal = window.ics();
    cal.addEvent(calData.subject, calData.description, calData.location, calData.begin, calData.end);
    cal.download(calData.filename);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let btnClasses = 'ControlsBar--btn';
    if (this.props.newRecord) {
      btnClasses = 'ControlsBar--btn disabled';
    }

    let callBackClasses = 'navIcon softGrad--primary';
    if (this.props.newRecord) {
      callBackClasses = 'navIcon softGrad--primary isHidden';
    }

    return (
      <div className="ControlsBar recordControls">
        <div className={btnClasses} onClick={this.props.recordChanger} id="prev">
          <div className="navIcon whiteCard">
            <img src={arrow_back} alt="previous" />
          </div>
          <p>Previous Record</p>
        </div>

        <div className="ControlsBar--btn saveBtn">
          <div className={callBackClasses} onClick={this.addCalendar}>
            <img src={calendar} alt="callback" />
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
    );
  }
}


SortBy.propTypes = {
  newRecord: propTypes.bool.isRequired,
  recordChanger: propTypes.func.isRequired,
  saveRecordHandler: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  // arrowKeyHandler: propTypes.func.isRequired,
}
