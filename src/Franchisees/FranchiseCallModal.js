import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import done from '../assets/icons/white/done.png';
import popout from '../assets/icons/popout.png';
import loader from '../assets/loader.gif';
import backBtn from '../assets/icons/black/arrow_back.png';




export default class FranchiseCallModal extends Component {
  constructor(props) {
    super();
    this.state = {
      callRow: 'callArea callRow',
      emailRow: 'emailArea callRow',
      textRow: 'textArea callRow',
    }
  }

  componentDidMount() {
    let repName = localStorage.getItem('userName').split(' ')[0];
    let contactFirst = this.props.openedCall.fields['SP Name'].split(' ')[0];

    let timeOfDay = 'morning';
    let today = new Date();
    let halfTime = today.getHours();
    if (halfTime > 11) {
      timeOfDay = 'afternoon';
    }

    if (this.props.answer) {
      this.setState({
        viewType: this.props.answer,
      });
    } else {
      this.setState({
        viewType: 'intro',
        emailBody: this.props.currentFollowUp.fields['Email Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay).replace('REP_NAME', repName),
        emailSubject: this.props.currentFollowUp.fields['Subject'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay).replace('REP_NAME', repName),
        textBody: this.props.currentFollowUp.fields['Text Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay).replace('REP_NAME', repName),
      });
    }



    today = new Date();
    today = new Date(today.getTime() + Math.abs(today.getTimezoneOffset()*60000)); //fix the date
    today = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();

    let calledDate;
    if (this.props.openedCall.fields['Called']) {
      calledDate = new Date(this.props.openedCall.fields['Called']);
      calledDate = new Date(calledDate.getTime() + Math.abs(calledDate.getTimezoneOffset()*60000)); //fix the date
      calledDate = (calledDate.getMonth()+1) + "/" + calledDate.getDate()  + "/" + calledDate.getFullYear();
    }
    let emailedDate;
    if (this.props.openedCall.fields['Emailed']) {
      emailedDate = new Date(this.props.openedCall.fields['Emailed']);
      emailedDate = new Date(emailedDate.getTime() + Math.abs(emailedDate.getTimezoneOffset()*60000)); //fix the date
      emailedDate = (emailedDate.getMonth()+1) + "/" + emailedDate.getDate()  + "/" + emailedDate.getFullYear();
    }
    let textedDate;
    if (this.props.openedCall.fields['Texted']) {
      textedDate = new Date(this.props.openedCall.fields['Texted']);
      textedDate = new Date(textedDate.getTime() + Math.abs(textedDate.getTimezoneOffset()*60000)); //fix the date
      textedDate = (textedDate.getMonth()+1) + "/" + textedDate.getDate()  + "/" + textedDate.getFullYear();
    }

    if (today === calledDate) {
      this.setState({
        callRow: this.state.callRow + ' completed',
      })
    }

    if (today === emailedDate) {
      this.setState({
        emailRow: this.state.emailRow + ' completed',
      })
    }

    if (today === textedDate) {
      this.setState({
        textRow: this.state.textRow + ' completed',
      })
    }
  }

  changeTemplate = (e) => {
    if (e.target.id === 'emailInteract') {
      this.setState ({
        emailBody: e.target.value
      });
    } else if (e.target.id === 'emailSubject') {
      this.setState ({
        emailSubject: e.target.value
      });
    } else {
      this.setState ({
        textBody: e.target.value
      });
    }
  }

  copyEmail = () => {
    let copyText = document.getElementById("emailInteract");
    copyText.style.display = 'inline';
    copyText.select();
    document.execCommand("copy");
  }
  copySubject = () => {
    let copyText = document.getElementById("emailSubject");
    copyText.style.display = 'inline';
    copyText.select();
    document.execCommand("copy");
  }

  sentIt = (e) => {
    console.log(e);
    let today = new Date();
    today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    let currState = this.props.openedCall.fields;
    let currRegion = this.props.openedCall.region;
    let currId = this.props.openedCall.id;

    let logType = e;


    if (!currState['Contact Date'] || currState['Contact Date'] !== today) { // has not been contacted today
      currState['Contact Date'] = today;
      currState['Sales Touches'] = currState['Sales Touches'] + 1;
    }
    if (currState['Status'] === 'New Lead') {
      currState['Status'] = 'Prospect';
    }

    if (e === 'call') {
      currState['Called'] = today;
      this.setState({
        callRow: this.state.callRow + ' completed',
      })
    } else if (e === 'email') {
      currState['Emailed'] = today;
      this.setState({
        emailRow: this.state.emailRow + ' completed',
      })
    } else if (e === 'text') {
      currState['Texted'] = today;
      this.setState({
        textRow: this.state.textRow + ' completed',
      })
    }

    let dayTime;
    today = new Date();
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
    if (localStorage.userInitials !== '') {
      finalEntry = dayTime + ' - ' + localStorage.userInitials + '\n';
    } else {
      finalEntry = dayTime + ' - ';
    }

    if (e === 'call') {
      if (document.getElementById('callNotes').value) {
        finalEntry += 'Call Notes: ' + document.getElementById('callNotes').value;
      } else {
        finalEntry += 'Called';
      }
    } else if (e === 'email') {
      finalEntry += 'Emailed with ' + this.props.currentFollowUp.fields['Template Name'] + ' template.';
    } else if (e === 'text') {
      finalEntry += 'Texted with ' + this.props.currentFollowUp.fields['Template Name'] + ' template.';
    }

    currState['Notes'] = finalEntry + '\n\n' + currState['Notes'];

    let currBase;
    if (currRegion === 'tampa') {
      currBase = 'appBsaVxz2OicG5Zw';
    } else {
      currBase = 'appLxxBrc9m3yNXdQ';
    }

    setTimeout((function() {
      let finalPush = {"fields": currState}
      console.log(finalPush);

      let saveRecord = 'https://api.airtable.com/v0/' + currBase + '/' + 'Franchisees/' + currId;
      return axios
        .put(saveRecord, finalPush).then(response => {

        });
    }).bind(this), 250);
  }

  callBack = () => {
    this.setState({
      viewType: 'intro',
    })
  }

  setMeetingHandler = () => {
    let theRecord = this.props.openedCall.fields;

    const tampaBase = 'appBsaVxz2OicG5Zw';
    const orlandoBase = 'appLxxBrc9m3yNXdQ';

    theRecord['Appt. Time'] = document.getElementById('theTime').value;
    theRecord['Appt. Date'] = document.getElementById('theDate').value;


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

    let finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Set Meeting for ' + theRecord['Appt. Time'];

    if (document.getElementById('callNotes').value) {
      if (theRecord['Notes']) {
        theRecord['Notes'] = '\n Notes:\n' + finalEntry + document.getElementById('callNotes').value + '\n\n' + theRecord['Notes'];
      } else {
        theRecord['Notes'] =  '\n Notes:\n' + finalEntry + document.getElementById('callNotes').value + '\n\n';
      }
    }
    theRecord['Status'] = 'Meeting Set';
    theRecord['Standing'] = 'Interested';
    today = new Date(today.getTime() + Math.abs(today.getTimezoneOffset()*60000)); //fix the date
    today = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();
    theRecord['Contact Date'] = today;

    const finalPush = {"fields": theRecord}

    return axios
      .put('https://api.airtable.com/v0/' + tampaBase + '/Franchisees/' + this.props.openedCall.id, finalPush)
      .then(response => {
        this.props.closeModal();
        setTimeout((function() {
          window.location.reload();
        }).bind(this), 50);
      });

    if (document.getElementById('theDatabase').value !== 'Tampa') { //move to orlando
      return axios
        .delete('https://api.airtable.com/v0/' + tampaBase + '/Franchisees/' + this.props.openedCall.id)
        .post('https://api.airtable.com/v0/' + orlandoBase + '/Franchisees/', finalPush)
        .then(response => {
          this.props.closeModal();
          setTimeout((function() {
            window.location.reload();
          }).bind(this), 50);
        });
    }
  }





  saveMeetingAnswer = e => {
    let theRecord = this.props.openedCall.fields;

    const tampaBase = 'appBsaVxz2OicG5Zw';
    const orlandoBase = 'appLxxBrc9m3yNXdQ';

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
    let finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n';



    if (e === 'no') {
      theRecord['Attended'] = 'No';

      if (document.getElementById('statusSelect').value === 'keep') {
        theRecord['Status'] = 'Prospect';
        theRecord['Standing'] = 'No Show';
        let nextFollow = new Date(+new Date + 1000*60*60*24*3);
        nextFollow = (nextFollow.getMonth()+1) + "/" + nextFollow.getDate()  + "/" + nextFollow.getFullYear();
        theRecord['Planned Followup'] = nextFollow;
      } else if (document.getElementById('statusSelect').value === 'remove') {
        theRecord['Status'] = 'Not Interested';
        theRecord['Standing'] = 'Inactive';
      }

      if (document.getElementById('callNotes').value) {
        if (theRecord['Notes']) {
          theRecord['Notes'] = finalEntry + 'No Show. ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n' + document.getElementById('callNotes').value + '\n\n' + theRecord['Notes'];
        } else {
          theRecord['Notes'] = finalEntry + 'No Show. ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n' + document.getElementById('callNotes').value + '\n\n';
        }
      } else {
        if (theRecord['Notes']) {
          theRecord['Notes'] = finalEntry + 'No Show. ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n\n' + theRecord['Notes'];
        } else {
          theRecord['Notes'] = finalEntry + 'No Show. ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n';
        }
      }
    } if (e === 'yes') {
      if (document.getElementById('statusSelect').value === 'good') {
        theRecord['Attended'] = 'Yes';

        theRecord['Planned Followup'] = document.getElementById('theDate').value;
        theRecord['Packet Sent'] = 'Yes';
        theRecord['Status'] = 'Prospect';
        theRecord['Standing'] = 'Pending';
        theRecord['Sales Touches'] = 0;
      } else if (document.getElementById('statusSelect').value === 'contractor') {
        theRecord['Status'] = 'Active';
        theRecord['Standing'] = 'Contractor';
      } else {
        // <option value="bad">Not Good Fit / Not Interested</option>
        theRecord['Status'] = 'Not Interested';
        theRecord['Standing'] = 'Inactive';
      }

      if (document.getElementById('callNotes').value) {
        if (theRecord['Notes']) {
          theRecord['Notes'] = finalEntry + 'Meeting Status: ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n' + document.getElementById('callNotes').value + '\n\n' + theRecord['Notes'];
        } else {
          theRecord['Notes'] = finalEntry + 'Meeting Status: ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n' + document.getElementById('callNotes').value + '\n\n';
        }
      } else {
        if (theRecord['Notes']) {
          theRecord['Notes'] = finalEntry + 'Meeting Status: ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n\n' + theRecord['Notes'];
        } else {
          theRecord['Notes'] = finalEntry + 'Meeting Status: ' + document.getElementById('statusSelect').options[document.getElementById('statusSelect').selectedIndex].innerHTML + '\n';
        }
      }
    }

    const finalPush = {"fields": theRecord}
    console.log(finalPush);

    return axios
      .put('https://api.airtable.com/v0/' + tampaBase + '/Franchisees/' + this.props.openedCall.id, finalPush)
      .then(response => {
        this.props.closeModal();
        setTimeout((function() {
          window.location.reload();
        }).bind(this), 50);
      });

    if (document.getElementById('theDatabase').value !== 'Tampa') { //move to orlando
      return axios
        .delete('https://api.airtable.com/v0/' + tampaBase + '/Franchisees/' + this.props.openedCall.id)
        .post('https://api.airtable.com/v0/' + orlandoBase + '/Franchisees/', finalPush)
        .then(response => {
          this.props.closeModal();
          setTimeout((function() {
            window.location.reload();
          }).bind(this), 50);
        });
    }
  }

  openScheduler = () => {
    this.setState({
      viewType: 'setMeeting',
    })
  }


  render() {
    const { currentFollowUp } = this.props;


    if (this.state.viewType === 'intro') {
      let emailLink = 'mailto:' + this.props.openedCall.fields['Email'];
      let smsURL = 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data='

      emailLink += '?subject=' + currentFollowUp.fields['Subject'];
      emailLink += '&body=' + this.state.emailBody;
      emailLink = encodeURI(emailLink);

      // SMSTO:+1123456:This is a SMS stored in a QR Code!
      smsURL += 'SMSTO:+';
      if (this.props.openedCall.fields['Cellphone']) {
        smsURL += this.props.openedCall.fields['Cellphone'].replace(/-/g, '').replace('+', '');
        smsURL += ':' + encodeURI(this.state.textBody);
      } else if (this.props.openedCall.fields['Cellphone']) {
        smsURL += this.props.openedCall.fields['Home Phone'].replace(/-/g, '').replace('+', '');
        smsURL += ':' + encodeURI(this.state.textBody);
      } else {
        smsURL = '';
      }

      return (
        <div className="FranchModalWrapper">
          <div className="modalBox">
            <div className="modalNav">
              <div className="titleArea">
                {this.setMeeting}
                <h4>Contacting <em>{this.props.openedCall.fields['SP Name']}</em></h4>
                <p className={"callType " + this.props.openedCall.fields['Status']}>{this.props.openedCall.fields['Status']}</p>
                <p>{this.props.openedCall.fields['City']}</p>
              </div>

              <div className="icons">
                <div className="btn" id="setMeeting" onClick={this.openScheduler}>Set Meeting</div>

                <Link target="_blank" to={'/' + this.props.openedCall.region + '/franchisees/' + this.props.openedCall.id + '/'}>
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
              <div className="callColumn interaction ">
                <div className={this.state.callRow}>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Call</h4>
                        <p>{this.props.openedCall.fields['Home Phone'] ? 'home: ' + this.props.openedCall.fields['Home Phone'] : ''}</p>
                        <p>{this.props.openedCall.fields['Cellphone'] ? 'cell: ' + this.props.openedCall.fields['Cellphone'] : ''}</p>
                      </div>

                      <div className="navIcon confirm softGrad--secondary" onClick={()=>this.sentIt('call')}>
                        <img src={done} alt="complete" />
                      </div>
                    </div>
                    <div className="interactArea">
                      <textArea placeholder="Notes from Call" id="callNotes" />
                    </div>
                  </div>
                </div>


                <div className={this.state.emailRow}>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Email</h4>
                        <p><a href={this.props.openedCall.fields['Email'] ? emailLink : ''}>{this.props.openedCall.fields['Email'] ? this.props.openedCall.fields['Email'] : ''}</a></p>
                      </div>

                      <div className="navIcon confirm softGrad--secondary" onClick={()=>this.sentIt('email')}>
                        <img src={done} alt="complete" />
                      </div>
                    </div>
                    <div className="interactArea">
                      <input type="text" placeholder="Email Subject" id="emailSubject" value={this.state.emailSubject} onChange={this.changeTemplate} onClick={this.copySubject} />
                      <textArea placeholder="Email Copy" value={this.state.emailBody} onChange={this.changeTemplate} id="emailInteract">
                        {this.state.emailBody}
                      </textArea>
                      <div className="btn interactBtn softGrad--black" onClick={this.copyEmail}>Copy</div>
                    </div>
                  </div>
                </div>


                <div className={this.state.textRow}>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Text</h4>
                        <p>{this.props.openedCall.fields['Cellphone'] ? this.props.openedCall.fields['Cellphone'] : this.props.openedCall.fields['Home Phone']}</p>
                      </div>

                      <div className="navIcon confirm softGrad--secondary" onClick={()=>this.sentIt('text')}>
                        <img src={done} alt="complete" />
                      </div>
                    </div>
                    <div className="interactArea">
                      <textArea placeholder="Text Copy" value={this.state.textBody} onChange={this.changeTemplate} id="textInteract">
                        {this.state.textBody}
                      </textArea>
                      {smsURL ? <img src={smsURL} alt="Scan this QR to text!" /> : ''}
                    </div>
                  </div>
                </div>
              </div>

              <div className="callColumn notes">
                <div className="title">
                  <h4>Notes</h4>
                </div>

                <div id="logNotes">

                  <textarea
                    className="NotesList"
                    id="notes"
                    value={this.props.openedCall.fields['Notes']}
                    onChange={this.props.changeNotesHandler}>
                    {this.props.openedCall.fields['Notes']}
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.viewType === 'setMeeting') {
      const theRecord = this.props.openedCall.fields;
      return (
        <div className="FranchModalWrapper">
          <div className="modalBox">
            <div className="modalNav">
              <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
              <div className="titleArea">
                <h4>Set Meeting with <em>{theRecord['SP Name']}</em></h4>
                <p className={"callType " + theRecord['Status']}>{theRecord['Status']}</p>
                <p>{theRecord['City']}</p>
              </div>

              <div className="icons">

                <Link target="_blank" to={'/' + this.props.openedCall.region + '/franchisees/' + this.props.openedCall.id + '/'}>
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
              <div className="callColumn interaction ">
                <div className='meetingArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Meeting Date / Time</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <div className="splitHalf">
                        <label>Date</label>
                        <input type="date" id="theDate" />
                      </div>
                      <div className="splitHalf">
                        <label>Time</label>
                        <input type="time" id="theTime" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='callArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Write Some Notes</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <textArea id="callNotes" placeholder="Write some notes and reminders..." />
                    </div>
                  </div>
                </div>

                <div className='meetingArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Confirm Database</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <select id="theDatabase">
                        <option>Tampa</option>
                        <option>Orlando</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="btn softGrad--secondary align-center" onClick={() => { this.setMeetingHandler() }}>Set Meeting</div>

              </div>

              <div className="callColumn notes">
                <div className="title">
                  <h4>Notes</h4>
                </div>

                <div id="logNotes">

                  <textarea
                    className="NotesList"
                    id="notes"
                    value={theRecord['Notes']}
                    onChange={this.props.changeNotesHandler}>
                    {theRecord['Notes']}
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.viewType === 'meeting--No') {
      const theRecord = this.props.openedCall.fields;
      return (
        <div className="FranchModalWrapper">
          <div className="modalBox">
            <div className="modalNav">
              <div className="titleArea">
                <h4><em>{theRecord['SP Name']}</em></h4>
                <p className={"callType " + theRecord['Status']}>{theRecord['Status']}</p>
                <p>{theRecord['City']}</p>
              </div>

              <div className="icons">

                <Link target="_blank" to={'/' + this.props.openedCall.region + '/franchisees/' + this.props.openedCall.id + '/'}>
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
              <div className="callColumn interaction ">

                <div className='callArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Any idea what happened?</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <textArea id="callNotes" placeholder="Write any notes or clarification you have..." />
                    </div>
                  </div>
                </div>

                <div className='meetingArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Want to keep trying?</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <div className="splitHalf">

                        <select id="statusSelect">
                          <option value="keep">Send it back to the pipeline</option>
                          <option value="remove">Give up on it</option>
                        </select>
                      </div>
                      </div>
                    </div>
                  </div>

                <div className="btn softGrad--secondary align-center" onClick={() => { this.saveMeetingAnswer('no') }}>Save</div>


                </div>
                <div className="callColumn notes">
                  <div className="title">
                    <h4>Notes</h4>
                  </div>

                  <div id="logNotes">

                    <textarea
                      className="NotesList"
                      id="notes"
                      value={theRecord['Notes']}
                      onChange={this.props.changeNotesHandler}>
                      {theRecord['Notes']}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else if (this.state.viewType === 'meeting--Yes') {
      const theRecord = this.props.openedCall.fields;
      return (
        <div className="FranchModalWrapper">
          <div className="modalBox">
            <div className="modalNav">
              <div className="titleArea">
                <h4><em>{theRecord['SP Name']}</em></h4>
                <p className={"callType " + theRecord['Status']}>{theRecord['Status']}</p>
                <p>{theRecord['City']}</p>
              </div>

              <div className="icons">

                <Link target="_blank" to={'/' + this.props.openedCall.region + '/franchisees/' + this.props.openedCall.id + '/'}>
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
              <div className="callColumn interaction ">

                <div className='callArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>How'd the meeting turn out?</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <textArea id="callNotes" placeholder="Write some notes and reminders..." />
                    </div>
                  </div>
                </div>

                <div className='meetingArea callRow'>
                  <div className="inner">
                    <div className="topBar">
                      <div class="contact">
                        <h4>Changes</h4>
                      </div>
                    </div>
                    <div className="interactArea">
                      <div className="splitHalf">
                        <label>Status</label>
                        <select id="statusSelect">
                          <option value="">Select Status</option>
                          <option value="good">Went well, gave FDD</option>
                          <option value="contractor">Wants to do Contracting</option>
                          <option value="bad">Not Good Fit / Not Interested</option>
                        </select>
                      </div>


                        <div className="splitHalf">
                          <label>Next Follow Up Date</label>
                          <input type="date" id="theDate" />
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="btn softGrad--secondary align-center" onClick={() => { this.saveMeetingAnswer('yes') }}>Save</div>


                </div>
                <div className="callColumn notes">
                  <div className="title">
                    <h4>Notes</h4>
                  </div>

                  <div id="logNotes">

                    <textarea
                      className="NotesList"
                      id="notes"
                      value={theRecord['Notes']}
                      onChange={this.props.changeNotesHandler}>
                      {theRecord['Notes']}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }


  get setMeeting() {
    if (this.state.viewType !== 'intro') {
      return (
        <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
      )
    }
  }
}
