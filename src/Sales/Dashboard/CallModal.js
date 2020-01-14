import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import mapLink from '../../assets/icons/white/location.png';
import exit from '../../assets/icons/white/exit.png';
import popout from '../../assets/icons/popout.png';
import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';
import backBtn from '../../assets/icons/black/arrow_back.png';


import CallModalData from './CallModalData';
import CallModalIntro from './CallModalIntro';
import CallModalActive from './CallModalActive';
import CallModalApptQuestion from './CallModalApptQuestion';

import CallModalSetAppt from './CallModalSetAppt';
import CallModalNoVisit from './CallModalNoVisit';
import CallModalNoAppt from './CallModalNoAppt';
import CallModalSalesNote from './CallModalSalesNote';
import CallModalCallBack from './CallModalCallBack';

export default class CallModal extends Component {
  constructor(props) {
    super();
    this.state = {
      viewType: 'intro',
      logData: {},
      dataURL: 'https://api.airtable.com/v0/',
      tampaId: 'appEX8GXgcD2ln4dB',
      orlandoId: 'appXNufXR9nQARjgs',
      goodLuck: '',
      notepad: '',
      hasActive: false,
      actives: {
        company: [],
        phone: [],
        address: [],
      },
      duplicates: {
        company: [],
        phone: [],
        address: [],
      },
      // duplicate: {
      //   company: [],
      //   phone: [],
      //   address: [],
      // }
    }
  }


  scrubCheck = () => {
    console.log(this.props.openedCall);

    let companyName = this.props.openedCall.fields['Company Name'];
    let address = this.props.openedCall.fields['Address 1'].split(' #')[0];
    let phone = this.props.openedCall.fields['Office Phone'];
    let cell = this.props.openedCall.fields['Cell Phone'];

    let baseId;
      if (this.props.citySet === 'tampa') {
        baseId = 'apps7GoAgK23yrOoY';
      } else if(this.props.citySet === 'orlando') {
        baseId = 'appBUKBn552B8SlbE';
      }

    let finalURL = '';
    let activesProp = {
      company: [],
      phone: [],
      address: [],
    };

    let phoneCheck = function() {
      let propedArr = [];

      if (phone) {
        finalURL = 'https://api.airtable.com/v0/' + baseId + '/Customers?view=All+Actives';
        finalURL += '&filterByFormula=(' + "IF(%7BOffice+Phone%7D+%3D+'" + phone + "'%2CTRUE()))";
        console.log(finalURL);

        return axios
          .get(finalURL).then(response => {
            if (response.data.records.length > 0) {
              let theseRecs = propedArr.concat(response.data.records);
              activesProp.phone = theseRecs;
              console.log(activesProp);
            }

            addrCheck();
          });
      }
    }.bind(this);
    phoneCheck();



    let addrCheck = function() {
      let propedArr = [];
      if (address) {
        finalURL = 'https://api.airtable.com/v0/' + baseId + '/Customers?view=All+Actives';
        finalURL += '&filterByFormula=(' + "IF(LOWER(%7BAddress+1%7D)+%3D+LOWER('" + address + "')%2CTRUE()))";
        console.log(finalURL);

        return axios
          .get(finalURL).then(response => {
            if (response.data.records.length > 0) {
              let theseRecs = propedArr.concat(response.data.records);
              activesProp.address = theseRecs;
              console.log(activesProp);
            }

            compCheck();
          });
      }
    }.bind(this);

    let compCheck = function() {
      let propedArr = [];
      if (companyName) {
        finalURL = 'https://api.airtable.com/v0/' + baseId + '/Customers?view=All+Actives';
        finalURL += '&filterByFormula=(' + "IF(LOWER(%7BCompany+Name%7D)+%3D+LOWER('" + companyName + "')%2CTRUE()))";
        console.log(finalURL);

        return axios
          .get(finalURL).then(response => {
            if (response.data.records.length > 0) {
              let theseRecs = propedArr.concat(response.data.records);
              activesProp.company = theseRecs;
              console.log(activesProp);
            }
            finishChecks();
          });
      }
    }.bind(this);

    let finishChecks = function() {
      if (activesProp.company.length > 0 || activesProp.phone.length > 0 || activesProp.address.length > 0) {
        this.setState({
          hasActive: true
        });
      }
      this.setState({
        actives: activesProp
      })
    }.bind(this);





    // let recId = this.props.openedCall.id;
    // baseId = '';
    // if (this.props.citySet === 'tampa') {
    //   baseId = 'appEX8GXgcD2ln4dB';
    // } else if(this.props.citySet === 'orlando') {
    //   baseId = 'appXNufXR9nQARjgs';
    // }
    //
    //
    //
    // let duplicatesProp = {
    //   company: [],
    //   phone: [],
    //   address: [],
    // };
    //
    // let phoneDupes = function() {
    //   let propedArr = [];
    //
    //   if (phone) {
    //     finalURL = 'https://api.airtable.com/v0/' + baseId + '/Sales';
    //     finalURL += '?filterByFormula=(' + "IF(%7BOffice+Phone%7D+%3D+'" + phone + "'%2CTRUE()))";
    //     console.log(finalURL);
    //
    //     return axios
    //       .get(finalURL).then(response => {
    //         if (response.data.records.length > 0) {
    //           for (var i in response.data.records) {
    //             if (recId !== response.data.records[i].id) {
    //               let theseRecs = propedArr.push(response.data.records[i]);
    //               duplicatesProp.phone = theseRecs;
    //             }
    //           }
    //           console.log(duplicatesProp);
    //         }
    //         addrDupes();
    //       });
    //   }
    // }.bind(this);
    // phoneDupes();
    //
    //
    //
    // let addrDupes = function() {
    //   let propedArr = [];
    //   if (address) {
    //     finalURL = 'https://api.airtable.com/v0/' + baseId + '/Sales';
    //     finalURL += '?filterByFormula=(' + "IF(LOWER(%7BAddress+1%7D)+%3D+LOWER('" + address + "')%2CTRUE()))";
    //     console.log(finalURL);
    //
    //     return axios
    //       .get(finalURL).then(response => {
    //         if (response.data.records.length > 0) {
    //           for (var i in response.data.records) {
    //             if (recId !== response.data.records[i].id) {
    //               let theseRecs = propedArr.push(response.data.records[i]);
    //               duplicatesProp.address = theseRecs;
    //             }
    //           }
    //           console.log(duplicatesProp);
    //         }
    //         compDupes();
    //       });
    //   }
    // }.bind(this);
    //
    // let compDupes = function() {
    //   let propedArr = [];
    //   if (companyName) {
    //     finalURL = 'https://api.airtable.com/v0/' + baseId + '/Sales';
    //     finalURL += "?filterByFormula=(" + 'IF(LOWER(%7BCompany+Name%7D)+%3D+LOWER("' + companyName + '")%2CTRUE()))';
    //     console.log(finalURL);
    //
    //     return axios
    //       .get(finalURL).then(response => {
    //         if (response.data.records.length > 0) {
    //           for (var i in response.data.records) {
    //             if (recId !== response.data.records[i].id) {
    //               let theseRecs = propedArr.push(response.data.records[i]);
    //               duplicatesProp.company = theseRecs;
    //             }
    //           }
    //           console.log(duplicatesProp);
    //         }
    //         finishDupes();
    //       });
    //   }
    // }.bind(this);
    //
    // let finishDupes = function() {
    //   if (duplicatesProp.company.length > 0 || duplicatesProp.phone.length > 0 || duplicatesProp.address.length > 0) {
    //     this.setState({
    //       hasActive: true
    //     });
    //   }
    //   this.setState({
    //     duplicates: duplicatesProp
    //   })
    // }.bind(this);
  }

  callBack = e => {
    let currRec = this.props.openedCall;


    if (this.state.viewType === 'activeCall') {
      this.setState({
        viewType: 'intro'
      })
    } else if (this.state.viewType === 'apptQuestion') {
      this.setState({
        viewType: 'activeCall'
      })
    } else if (this.state.viewType === 'setAppt' || this.state.viewType === 'noAppt' || this.state.viewType === 'noVisit') {
      let logData = this.state.logData;
      logData['Appt. Set By'] = undefined;
      logData['Appt. Set Date'] = undefined;
      logData['Status'] = undefined;
      logData['Proposal Type'] = undefined;

      this.setState({
        logData: logData,
        viewType: 'apptQuestion'
      })
    } else if (this.state.viewType === 'callBack') {
      this.setState({
        viewType: 'noAppt'
      })
    } else if (this.state.viewType === 'salesNote') {
      let logData = this.state.logData;
      if (logData['Proposal Type'] === 'No-Visit') {
        this.setState({
          viewType: 'noVisit'
        })
      } else {
        this.setState({
          viewType: 'setAppt'
        })
      }
    }
  }

  markDeletion = e => {
    console.log('markDeletion()');

    let pushRecordId = e.id;
    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();

    if (localStorage.getItem('userName') === 'Carla Milian' || localStorage.getItem('userName') === 'Sheila St. Clair' || localStorage.getItem('userName') === 'Shana Thorn' || localStorage.getItem('userName') === 'Mariyah Moore' || localStorage.getItem('userName') === 'Lisa Shirah' || localStorage.getItem('userName') === 'Bryan Goree' || localStorage.getItem('userName') === 'Jett' || localStorage.getItem('userName') === 'Jason') {
      e.fields['Recent Caller'] = localStorage.getItem('userName');
    } else {
      e.fields['Recent Caller'] = '';
    }
    e.fields['Recent Call Date'] = todaysDate;
    e.fields['Standing'] = 'Mark for Deletion';

    let finalPush = {"fields": e.fields}

    let regionId;
    if (this.props.citySet === 'tampa') {
      regionId = this.state.tampaId;
    } else {
      regionId = this.state.orlandoId;
    }
    axios
    .put(this.state.dataURL + regionId + '/Sales/' + pushRecordId, finalPush)
    .then(response => {
      window.location.reload();
    });
  }

  callNext = e => {
    let currRec = this.props.openedCall.fields;
    let logData = this.state.logData;

    let today = new Date();
    today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    if (this.state.viewType === 'intro') {
      let startTime = new Date();
      startTime = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();

      this.setState({
        startTime: startTime,
        viewType: 'activeCall',
      })
    } else if (this.state.viewType === 'activeCall') {
      let notepad = document.getElementById('notepadNotes').value;

      let today = new Date();
      let endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let currDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
      let start = new Date(currDate + ' ' + this.state.startTime);
      let end = new Date(currDate + ' ' + endTime);
      let diffTime = end - start;

      let timeInSecs = diffTime/1000;
      let finalDiff;
      if (timeInSecs < 60) {
        finalDiff = timeInSecs + ' secs';
      } else if (timeInSecs < 3600) {
        finalDiff = (timeInSecs / 60).toFixed(2) + ' mins';
      } else {
        finalDiff = (timeInSecs / 60 / 60).toFixed(2) + ' hrs';
      }
      logData['Recent Call Time'] = finalDiff;

      if (notepad) {
        this.setState({
          logData: logData,
          viewType: 'apptQuestion',
          notepad: document.getElementById('notepadNotes').value,
        })
      } else {
        this.setState({
          viewType: 'apptQuestion',
        })
      }
    } else if (this.state.viewType === 'apptQuestion') {
      if (e.target.id === 'setAppt' || e.target.id === 'noVisit') {
        if (localStorage.getItem('userName') === 'Carla Milian' || localStorage.getItem('userName') === 'Sheila St. Clair' || localStorage.getItem('userName') === 'Shana Thorn' || localStorage.getItem('userName') === 'Mariyah Moore' || localStorage.getItem('userName') === 'Lisa Shirah' || localStorage.getItem('userName') === 'Bryan Goree' || localStorage.getItem('userName') === 'Jett' || localStorage.getItem('userName') === 'Jason') {
          logData['Appt. Set By'] = localStorage.getItem('userName');
        } else {
          logData['Appt. Set By'] = '';
        }
        logData['Appt. Set Date'] = today;
        logData['Status'] = 'Appointment Set';
      }
      if (e.target.id === 'noVisit') {
        logData['Proposal Type'] = 'No-Visit';
      } else if (e.target.id === 'setAppt' ) {
        logData['Proposal Type'] = 'Visited';
      }

      if (localStorage.getItem('userName') === 'Carla Milian' || localStorage.getItem('userName') === 'Sheila St. Clair' || localStorage.getItem('userName') === 'Shana Thorn' || localStorage.getItem('userName') === 'Mariyah Moore' || localStorage.getItem('userName') === 'Lisa Shirah' || localStorage.getItem('userName') === 'Bryan Goree' || localStorage.getItem('userName') === 'Jett' || localStorage.getItem('userName') === 'Jason') {
        logData['Recent Caller'] = localStorage.getItem('userName');
      } else {
        logData['Recent Caller'] = '';
      }
      logData['Recent Call Date'] = today;
      console.log(logData);

      this.setState({
        logData: logData,
        viewType: e.target.id
      })
    } else if (this.state.viewType === 'setAppt' || this.state.viewType === 'noVisit') {
      this.setState({
        viewType: 'salesNote'
      })

      setTimeout((function() {
        document.getElementById('salesNotes').value = this.state.notepad;
      }).bind(this), 250);
    } else if (this.state.viewType === 'salesNote') {
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

      let finalNote = finalEntry + document.getElementById('salesNotes').value + '\n\n' + currRec['Notes'];
      let calNote = document.getElementById('salesNotes').value;

      logData['Notes'] = finalNote;
      logData['calNote'] = calNote;

      this.setState({
        logData: logData,
      })

      if (logData['Proposal Type'] === 'No-Visit') {
        this.props.logCall(this.state.logData, 'noVisit');
      } else {
        this.props.logCall(this.state.logData, 'setAppt');
      }
    } else if (this.state.viewType === 'noAppt') {
      let callItem = {
        target: {
          id: 'customCallback'
        },
        callBackDate: ''
      }
      let callBackDate;
      if (currRec['Standing'] === 'Left VM' || currRec['Standing'] === 'Left Email' || currRec['Standing'] === 'No Answer') {
        let twoWeeksAway = new Date(+new Date + 1000*60*60*24*14);
        twoWeeksAway = (twoWeeksAway.getMonth()+1) + '/' + twoWeeksAway.getDate() + '/' + twoWeeksAway.getFullYear();
        callItem.callBackDate = twoWeeksAway;
      } else if (currRec['Standing'] === 'Not Interested' || currRec['Standing'] === 'In Contract' || currRec['Standing'] === 'Call Back' || currRec['Standing'] === 'Disconnected') {
        let threeMonths = new Date(+new Date + 1000*60*60*24*90);
        threeMonths = (threeMonths.getMonth()+1) + '/' + threeMonths.getDate() + '/' + threeMonths.getFullYear();
        callItem.callBackDate = threeMonths;
      }
      console.log(callItem);
      this.props.changeRecordHandler(callItem);
      this.setState({
        viewType: 'callBack'
      })
    } else if (this.state.viewType === 'callBack') {
      let currStamp = document.getElementById('logCallStamp').value;
      let finalNote = document.getElementById('logCallStamp').value + '\n\n' + currRec['Notes']

      logData['Notes'] = finalNote;

      this.setState({
        logData: logData,
      })
      this.props.logCall(this.state.logData, 'noAppt');
    }
  }

  componentDidMount() {
    this.scrubCheck();
  }

  // Render
  // ----------------------------------------------------
  render() {
    let fields = this.props.openedCall.fields;

    let totalAddress = fields['Company Name'].replace(/ /g, '+') + '+Florida';
    if (fields['Address 1']) {
      totalAddress = fields['Company Name'].replace(/ /g, '+') + '+' + fields['Address 1'];
      if (fields['Address 2']) {totalAddress = totalAddress + fields['Address 2'];}
      if (fields['City']) {totalAddress = totalAddress + ', ' + fields['City'] + ', Florida';} else {totalAddress = totalAddress + ', Florida';}
      if (fields['Zip']) {totalAddress = totalAddress + ', ' + fields['Zip'];}
    }
    let validateAddress = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(totalAddress);

    let logNotes = '';
    if (fields['Notes']) {
      logNotes = fields['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    return (
      <div className="callModal">
        <div className="modalBox">
          <div className="modalNav">
            <div className="titleArea">
              {this.navBack}
              <h4>Calling <em>{fields['Company Name']}</em></h4>
              <p className={"callType " + fields['Status']}>{fields['Status']}</p>
              <p>{fields['City']}</p>
            </div>

            <div className="icons">
              <a target="_blank" href={validateAddress}>
                <div className="navIcon softGrad--blue">
                  <img src={mapLink} alt="exit" />
                </div>
              </a>

              <Link target="_blank" to={'/' + this.props.citySet + '/sales/' + this.props.openedCall.id + '/'}>
                <div className="navIcon whiteCard">
                  <img src={popout} alt="exit" />
                </div>
              </Link>

              <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                <img src={exit} alt="exit" />
              </div>
            </div>
          </div>



          <div className="callBoxWrapper">
            {this.modalSlides}

            <CallModalData
              openedCall = {this.props.openedCall}
              closeModal = {this.props.closeModal}
              citySet = {this.props.itemRegion}
              changeRecordHandler = {this.props.changeRecordHandler}
              selectChange = {this.props.selectChange}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
            />

            <div className="callColumn notes">
              <div className="title">
                <h4>Notes</h4>
              </div>

              <div id="logNotes"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }




  get navBack() {
    if (this.state.viewType !== 'intro') {
      return (
        <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
      )
    }
  }
  get mainContact() {
    let fields = this.props.openedCall.fields;
    if (fields['Main contact']) {
      return (
        <div className="contact">
          <p>Main</p>
          <div className="innerCard">
            <h4>{fields['Main contact']}</h4>
            <p>{fields['Title']}</p>
          </div>
        </div>
      );
    }
  }
  get altContact() {
    let fields = this.props.openedCall.fields;
    if (fields['Alternate Contact']) {
      return (
        <div className="contact">
          <p>Alt</p>
          <div className="innerCard">
            <h4>{fields['Alternate Contact']}</h4>
          </div>
        </div>
      );
    }
  }
  get phoneNumber() {
    let fields = this.props.openedCall.fields;
    let phoneLink = 'tel:' + fields['Office Phone'];

    if (fields['Office Phone']) {
      return (
        <div className="contact">
          <p>Contact</p>
          <div className="innerCard">
            <div className="content">
              <p>Office</p>
              <h4>{fields['Office Phone']}</h4>
              {fields['Extension'] ? <p>Ext.</p> : ''}
              {fields['Extension'] ? <h4>{fields['Main contact']}</h4> : ''}
            </div>

              <div className="navIcon softGrad--secondary"  onClick={() => { this.props.callNext() }}>
                <img src={phoneImg} alt="call" />
              </div>
          </div>
        </div>
      );
    }
  }
  get cellNumber() {
    let fields = this.props.openedCall.fields;
    let phoneLink = 'tel:' + fields['Cell Phone'];

    if (fields['Cell Phone']) {
      return (
        <div className="contact">
          <div className="innerCard cell">
            <div className="content">
              <p>Cellphone</p>
              <h4>{fields['Cell Phone']}</h4>
            </div>

              <div className="navIcon softGrad--secondary"  onClick={() => { this.props.callNext() }}>
                <img src={phoneImg} alt="call" />
              </div>
          </div>
        </div>
      );
    }
  }

  get modalSlides() {
    if (this.state.viewType === 'intro') {
      return (
        <CallModalIntro
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
          hasActive={this.state.hasActive}
          actives={this.state.actives}
          duplicates={this.state.duplicates}
          citySet={this.props.citySet}
          markDeletion={this.markDeletion}
        />
      )
    } else if (this.state.viewType === 'activeCall') {
      return (
        <CallModalActive
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'apptQuestion') {
      return (
        <CallModalApptQuestion
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'noVisit') {
      return (
        <CallModalNoVisit
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'setAppt') {
      return (
        <CallModalSetAppt
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'noAppt') {
      return (
        <CallModalNoAppt
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'salesNote') {
      return (
        <CallModalSalesNote
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    } else if (this.state.viewType === 'callBack') {
      return (
        <CallModalCallBack
          openedCall = {this.props.openedCall}
          changeRecordHandler = {this.props.changeRecordHandler}
          selectChange = {this.props.selectChange}
          callNext = {this.callNext}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
        />
      )
    }
  }
}
