import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendar from '../../assets/icons/white/calendar.png';
import save from '../../assets/icons/white/save.png';
import arrow_forward from '../../assets/icons/black/arrow_forward.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';
import phoneImg from '../../assets/icons/white/phone.png';

export default class SortBy extends Component {

  addCalendar = () => {
    let record = this.props.currentRecord;

    //subject
    let finalSubject = 'Call ' + record['Main contact'] + ' at ' + record['Company Name'];

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
    let callBackDate = (today.getMonth()+1) + '/' + (today.getDate()+1) + '/' + today.getFullYear() + ' ' + todayTime;
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

  generateCalendarLink = () => {
    let timeInput = this.props.currentRecord['Appt. Time'];
    let apptDate = this.props.currentRecord['Appt. Date'];
    if (timeInput && apptDate) {
      timeInput = timeInput.toUpperCase();
      let finalTime = {hours: 0,minutes: 0,amPm: 'AM'};

      let timeOnly;
      if (timeInput.includes('AM')) {
        finalTime.amPm = 'AM'; timeOnly = timeInput.split('AM')[0].replace(/ /g, '');
      } else if (timeInput.includes('PM')) {
        finalTime.amPm = 'PM'; timeOnly = timeInput.split('PM')[0].replace(/ /g, '');
      }
      if (timeOnly.includes(':')) {
        finalTime.hours = parseInt(timeOnly.split(':')[0]);
        finalTime.minutes = parseInt(timeOnly.split(':')[1]);
      } if (timeOnly.length === 4) {
        finalTime.hours = timeOnly.substring(0, 2);
        finalTime.minutes = timeOnly.substring(2, 4);
      } else {
        finalTime.hours = parseInt(timeOnly);
      }
      if (finalTime.amPm === 'PM' && finalTime.hours !== 12) {
        finalTime.hours = finalTime.hours + 12; //fix for 1-11pm
      }
      if (finalTime.amPm === 'AM' && finalTime.hours === 12) {
        finalTime.hours = 0; //fix for midnight
      }

      let startApptDate = new Date(this.props.currentRecord['Appt. Date']);
      startApptDate = new Date(startApptDate.getTime() + Math.abs(startApptDate.getTimezoneOffset()*60000)); //fix the date
      startApptDate.setHours(finalTime.hours);//set hours
      startApptDate.setMinutes(finalTime.minutes);//set minutes
      let startApptDateTime = (new Date(startApptDate)).toISOString().replace(/-|:|\.\d\d\d/g,"");

      let endApptDate = new Date(startApptDate.getTime() + Math.abs(startApptDate.getTimezoneOffset()*60000)); //fix the date
      endApptDate.setHours(finalTime.hours);//set hours
      endApptDate.setMinutes(finalTime.minutes + 30);//set minutes
      let endApptDateTime = (new Date(endApptDate)).toISOString().replace(/-|:|\.\d\d\d/g,"");

      console.log(finalTime);

      let salesInitials;

      if (this.props.currentRecord['Sales Rep'] === 'Tyler Perkins') {
        salesInitials = 'TMP';
      } else if (this.props.currentRecord['Sales Rep'] === 'Nolan Perkins') {
        salesInitials = 'NWP'
      } else if (this.props.currentRecord['Sales Rep'] === 'Joel Horwitz') {
        salesInitials = 'JDH'
      } else if (this.props.currentRecord['Sales Rep'] === 'Rob Janke') {
        salesInitials = 'RWJ'
      } else if (this.props.currentRecord['Sales Rep'] === 'Rafael Milanes') {
        salesInitials = 'RAM'
      } else {
        salesInitials = this.props.currentRecord['Sales Rep'].replace(/ /g, '+');
      }

      let finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.props.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and')+'&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=<br/><br/>+View+record+(<a+href="' + window.location.href + '">' + window.location.href + '</a>)';
      finalCalURL += '&location=' + this.props.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + ',+';
      if(this.props.currentRecord['Address 1']) {
        finalCalURL += this.props.currentRecord['Address 1'].replace(/ /g, '+').replace(/&/g, 'and');
      } if (this.props.currentRecord['Address 2']) {
        finalCalURL += '+'+this.props.currentRecord['Address 2'].replace(/ /g, '+').replace(/&/g, 'and');
      } if (this.props.currentRecord['City']) {
        finalCalURL += ',+' + this.props.currentRecord['City'].replace(/ /g, '+').replace(/&/g, 'and') + ',+FL+';
      } if (this.props.currentRecord['Zip']) {
        finalCalURL += this.props.currentRecord['Zip'].replace(/ /g, '+').replace(/&/g, 'and');
      }
      finalCalURL += '&sf=true&output=xml';
      console.log(finalCalURL);

      var fakeLinkA = document.createElement('a');
      fakeLinkA.setAttribute('href', finalCalURL);
      fakeLinkA.setAttribute('target', '_blank');
      fakeLinkA.style.display = 'none';
      document.body.appendChild(fakeLinkA);
      fakeLinkA.click();
      document.body.removeChild(fakeLinkA);
    } else {
      alert('Please fill in the Appointment Date and Time before trying again.')
    }
  }

  // Render
  // ----------------------------------------------------
  render() {


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

    return (
      <div className="ControlsBar recordControls">
        <div className={btnClasses} onClick={this.props.recordChanger} id="prev">
          <div className="navIcon whiteCard">
            <img src={arrow_back} alt="previous" />
          </div>
          <p>Previous Record</p>
        </div>

        <div className="ControlsBar--btn saveBtn">

          <div className={googleCalButton} onClick={this.generateCalendarLink}>
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
