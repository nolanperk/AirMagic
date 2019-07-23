import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import loader from '../assets/loader.gif';

import FranchiseDash from './FranchiseDash';
import FranchiseCallModal from './FranchiseCallModal';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];

export default class FranchiseSales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      tampaId: 'appBsaVxz2OicG5Zw',
      orlandoId: 'appLxxBrc9m3yNXdQ',
      loadingText: 'Finding Your Callbacks',

      openedCall: {},

      tampaOffset: '',
      orlandoOffset: '',

      allCallbacks: {
        newLeads: [],
        preMeeting: [],
        fddCalls: [],
        ongoing: [],
        apptLetter: [],
      },

      tampaCalls: [],
      orlandoCalls: [],
      meetings: [],
      todays: [],
      planned: [],

      modalType: '',
      modal: false,
    }
  }



  loadDashboard = () => {
    let loadTampaCallbacks = function() {
      console.log('loadTampaCallbacks');
      let grabRecords = this.state.tampaCalls;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Franchisees' + '?view=Follow+Ups';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          console.log(response.data.records);
          this.setState({
            tampaCalls: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaCallbacks();
        } else {
          console.log('clearing loadTampaCallbacks()');

          this.setState({
            tampaOffset: '',
          });
          loadOrlandoCallbacks();
        }
      });
    }.bind(this);
    loadTampaCallbacks();

    let loadOrlandoCallbacks = function() {
      console.log('loadOrlandoCallbacks');
      let grabRecords = this.state.orlandoCalls;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Franchisees' + '?view=Follow+Ups';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoCalls: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoCallbacks();
        } else {
          console.log('clearing loadOrlandoCallbacks()');

          this.setState({
            tampaOffset: '',
          });
          finishCallbacks();
        }
      });
    }.bind(this);



    let finishCallbacks = function() {
      let splitCalls = {
        newLeads: [],
        preMeeting: [],
        fddCalls: [],
        apptLetter: [],
        ongoing: [],
      };

      let mixedCalls = [];
      for (var i in this.state.tampaCalls) {
        let item = {
          fields: this.state.tampaCalls[i].fields,
          id: this.state.tampaCalls[i].id,
          region: 'tampa',
        }
        mixedCalls.push(item);
      }

      for (var i in this.state.orlandoCalls) {
        let item = {
          fields: this.state.orlandoCalls[i].fields,
          id: this.state.orlandoCalls[i].id,
          region: 'orlando',
        }
        mixedCalls.push(item);
      }

      for (var i in mixedCalls) {
        let thisCall = mixedCalls[i].fields;
        if (thisCall['Attended'] === 'Yes') { // has had a meeting!
          if (thisCall['Sales Touches'] === 0) {
            let plannedFDD = new Date(thisCall['Planned Followup']);
            plannedFDD = new Date(plannedFDD.getTime() + Math.abs(plannedFDD.getTimezoneOffset()*60000)); plannedFDD = (plannedFDD.getMonth()+1) + '/' + plannedFDD.getDate() + '/' + plannedFDD.getFullYear();
            let today = new Date(); today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

            console.log(plannedFDD);
            console.log(today);
            if (plannedFDD === today) {
              splitCalls.fddCalls.push(mixedCalls[i])
            }
          }

          else if (thisCall['Sales Touches'] === 1) {
            let lastCall = new Date(thisCall['Last Touch']);
            lastCall = new Date(lastCall.getTime() + Math.abs(lastCall.getTimezoneOffset()*60000));

            let twoAgo = new Date(+new Date - 1000*60*60*24*2);
            if (lastCall <= twoAgo) {
              splitCalls.apptLetter.push(mixedCalls[i])
            }
          } else if (thisCall['Sales Touches'] === 2 || thisCall['Sales Touches'] === 3) {
            let lastCall = new Date(thisCall['Last Touch']);
            lastCall = new Date(lastCall.getTime() + Math.abs(lastCall.getTimezoneOffset()*60000));

            let threeAgo = new Date(+new Date - 1000*60*60*24*3);
            if (lastCall <= threeAgo) {
              splitCalls.ongoing.push(mixedCalls[i])
            }
          }
        } else { //no meeting yet
          if (thisCall['Sales Touches'] === 0) {splitCalls.newLeads.push(mixedCalls[i])}
          else if (thisCall['Sales Touches'] === 1 || thisCall['Sales Touches'] === 2) {
            let lastCall = new Date(thisCall['Last Touch']);
            lastCall = new Date(lastCall.getTime() + Math.abs(lastCall.getTimezoneOffset()*60000));

            let twoAgo = new Date(+new Date - 1000*60*60*24*2);
            if (lastCall <= twoAgo) {
              splitCalls.preMeeting.push(mixedCalls[i])
            }
          } else if (thisCall['Sales Touches'] === 3 || thisCall['Sales Touches'] === 4) {
            let lastCall = new Date(thisCall['Last Touch']);
            lastCall = new Date(lastCall.getTime() + Math.abs(lastCall.getTimezoneOffset()*60000));

            let fourAgo = new Date(+new Date - 1000*60*60*24*4);
            if (lastCall <= fourAgo) {
              splitCalls.preMeeting.push(mixedCalls[i])
            }
          }
        }
      }

      this.setState({
        allCallbacks: splitCalls,
        loadingText: 'Grabbing Meetings',
      })

      tampaMeetings();
    }.bind(this);



    let tampaMeetings = function() {
      console.log('tampaMeetings');
      let grabRecords = this.state.meetings;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Franchisees' + '?view=Meetings';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            meetings: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          tampaMeetings();
        } else {
          console.log('clearing tampaMeetings()');

          this.setState({
            tampaOffset: '',
          });
          orlandoMeetings();
        }
      });
    }.bind(this);

    let orlandoMeetings = function() {
      console.log('orlandoMeetings');
      let grabRecords = this.state.meetings;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Franchisees' + '?view=Meetings';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            meetings: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          orlandoMeetings();
        } else {
          console.log('clearing orlandoMeetings()');

          this.setState({
            orlandoOffset: '',
          });
          finishMeetings();
        }
      });
    }.bind(this);


    let finishMeetings = function() {
      console.log(this.state.meetings);
      let meetingList = this.state.meetings;

      meetingList.sort(function(a,b){
        return new Date(b.fields['Appt. Date']) - new Date(a.fields['Appt. Date']);
      });


      this.setState({
        meetings: meetingList,
      });

      tampaRecent();
    }.bind(this);



    let tampaRecent = function() {
      console.log('tampaRecent');
      let grabRecords = this.state.todays;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Franchisees' + '?view=Recent+Calls';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            todays: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          tampaRecent();
        } else {
          console.log('clearing tampaRecent()');

          this.setState({
            tampaOffset: '',
          });
          orlandoRecent();
        }
      });
    }.bind(this);

    let orlandoRecent = function() {
      console.log('orlandoRecent');
      let grabRecords = this.state.todays;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Franchisees' + '?view=Recent+Calls';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            todays: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          orlandoRecent();
        } else {
          console.log('clearing orlandoRecent()');

          this.setState({
            orlandoOffset: '',
            loading: false,
          });
        }
      });
    }.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    } else {
      let twoWeeksAgo = new Date(+new Date - 1000*60*60*24*14);
      if (localStorage.getItem('lastLogin')) { //logged in after update
        let lastLog = new Date(localStorage.getItem('lastLogin'));
        if (lastLog > twoWeeksAgo) { //logged in within past two weeks
          if (localStorage.getItem('isOutside')  === 'true') {
            if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
              if (this.props.citySet !== localStorage.getItem('userOffice')) {
                this.props.history.push('/outside/' + localStorage.getItem('userOffice') + '/');
              }
            } else {
              this.props.history.push('/outside/' + this.props.citySet);
            }
          }

          this.loadDashboard();
        } else {
          sessionStorage.clear();
          localStorage.clear();
        }
      } else {
        sessionStorage.clear();
        localStorage.clear();
        this.props.history.push('/login');
      }
    }
  }

  changeRecordHandler = e => {
    currentRecordState = this.state.openedCall;

    console.log(e.target.value);
    if (e.target.id === 'customCallback') {
      if (e.callBackDate) {
        currentRecordState.fields['Callback Date'] = e.callBackDate
      } else {currentRecordState.fields['Callback Date'] = undefined;}
    } else if (e.target.id === 'callBack') {
      if (e.target.value === ''){
        currentRecordState.fields['Callback Date'] = undefined;
      } else {
        currentRecordState.fields['Callback Date'] = e.target.value;
      }
    } else if (e.target.id === 'apptSet') {currentRecordState.fields['Appt. Set Date'] = e.target.value}
    else if (e.target.id === 'apptDate') {currentRecordState.fields['Appt. Date'] = e.target.value}
    else if (e.target.id === 'apptTime') {currentRecordState.fields['Appt. Time'] = e.target.value}
    else if (e.target.id === 'proposal') {currentRecordState.fields['Proposal Date'] = e.target.value}

    else if (e.target.id === 'salutation') {currentRecordState.fields['Salutation'] = e.target.value}
    else if (e.target.id === 'contact') {currentRecordState.fields['Main contact'] = e.target.value}
    else if (e.target.id === 'title') {currentRecordState.fields['Title'] = e.target.value}
    else if (e.target.id === 'altContact') {currentRecordState.fields['Alternate Contact'] = e.target.value}
    else if (e.target.id === 'phone') {currentRecordState.fields['Office Phone'] = e.target.value}
    else if (e.target.id === 'ext') {currentRecordState.fields['Extension'] = e.target.value}
    else if (e.target.id === 'cell') {currentRecordState.fields['Cell Phone'] = e.target.value}
    else if (e.target.id === 'email') {currentRecordState.fields['Email'] = e.target.value}

    else if (e.target.id === 'addr1') {currentRecordState.fields['Address 1'] = e.target.value}
    else if (e.target.id === 'addr2') {currentRecordState.fields['Address 2'] = e.target.value}
    else if (e.target.id === 'city') {currentRecordState.fields['City'] = e.target.value}
    else if (e.target.id === 'zip') {currentRecordState.fields['Zip'] = e.target.value}
    else if (e.target.id === 'county') {currentRecordState.fields['County'] = e.target.value}
    else if (e.target.id === 'emp') {currentRecordState.fields['Employees'] = e.target.value}

    else if (e.target.id === 'amount') {currentRecordState.fields['Monthly Amount'] = e.target.value}
    else if (e.target.id === 'sqFt') {currentRecordState.fields['Sq. Footage'] = e.target.value}
    else if (e.target.id === 'sqFtReal') {currentRecordState.fields['Actual Sq Footage'] = e.target.value}
    else if (e.target.id === 'restrooms') {currentRecordState.fields['Restrooms'] = e.target.value}

    else if (e.target.id === 'hoursPer') {currentRecordState.fields['Hours Per'] = e.target.value}
    else if (e.target.id === 'sqFtPer') {currentRecordState.fields['SQ Ft. per Hour'] = e.target.value}
    else if (e.target.id === 'timesPerWeek') {currentRecordState.fields['Times per Week'] = e.target.value}
    else if (e.target.id === 'weekDays') {currentRecordState.fields['Days of Week'] = e.target.value}
    else if (e.target.id === 'serviceTime') {currentRecordState.fields['Service Time'] = e.target.value}

    this.setState({
      openedCall: currentRecordState,
      recordChanges: true,
    })
  }
  selectChange = e => {
    let currentsRec = this.state.openedCall;

    if (e.target.id === 'timesPerWeekSelect') {
      currentsRec.fields['Times per Week'] = e.target.value;
    } else if (e.target.id === 'setBySelect') {
      currentsRec.fields['Appt. Set By'] = e.target.value;
    } else if (e.target.id === 'standingSelect') {
      currentsRec.fields['Standing'] = e.target.value;
    } else if (e.target.id === 'repSelect') {
      currentsRec.fields['Sales Rep'] = e.target.value;
    }
    this.setState({
      openedCall: currentsRec,
    });
  }

  showModal = (e, type, region) => {
    this.setState({
      modal: true,
      modalType: type,
      openedCall: e,
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
      modalType: '',
      openedCall: {},
    })
  }


  hideDayPicker = () => {
    let getTheBlock = document.getElementById(this.state.pickerId).closest('.inputWithTag').previousElementSibling.previousElementSibling;
    getTheBlock.className = 'pickWrapper';
    this.setState({
      pickerId: null,
    })
  }
  handleDayClick = day => {
    currentRecordState = this.state.openedCall;
    let newSelectedDay = new Date(day);
    let finalDate = (newSelectedDay.getMonth() + 1) + '/' + newSelectedDay.getDate() + '/' + newSelectedDay.getFullYear();


    if (this.state.pickerId === 'closed') {currentRecordState.fields['Close Date'] = finalDate}
    else if (this.state.pickerId === 'walkthrough') {currentRecordState.fields['Walkthrough Date'] = finalDate}
    else if (this.state.pickerId === 'start') {currentRecordState.fields['Start Date'] = finalDate}
    else if (this.state.pickerId === 'cancel') {currentRecordState.fields['Cancel Date'] = finalDate}
    else if (this.state.pickerId === 'preCleanDate') {currentRecordState.fields['Pre-Clean Date'] = finalDate}
    else if (this.state.pickerId === 'apptSet') {currentRecordState.fields['Appt. Set Date'] = finalDate}
    else if (this.state.pickerId === 'apptDate') {currentRecordState.fields['Appt. Date'] = finalDate}
    else if (this.state.pickerId === 'proposal') {currentRecordState.fields['Proposal Date'] = finalDate}
    else if (this.state.pickerId === 'callDate') {currentRecordState.fields['Recent Call Date'] = finalDate}
    else if (this.state.pickerId === 'callBack') {currentRecordState.fields['Callback Date'] = finalDate}
    else if (this.state.pickerId === 'followDate') {currentRecordState.fields['Last Contact'] = finalDate}

    this.setState({
      openedCall: currentRecordState,
      recordChanges: true,
    })

    setTimeout((function() {
      console.log('yooo');
      this.hideDayPicker();
    }).bind(this), 50);
  }
  toggleDayPicker = e => {
    let dayID = e.target.closest('.inputWithTag').getElementsByTagName('input')[0].id;
    let cardParent = e.target.closest('.inputWithTag').closest('.inputBlock').closest('.callColumn');
    let pickerBlock = e.target.closest('.inputWithTag').previousElementSibling.previousElementSibling;

    if (pickerBlock.className === 'pickWrapper isActive' || pickerBlock.className === 'pickWrapper isActive cardOnRight') {
      this.hideDayPicker();
    } else {
      if (this.state.pickerId != null) {
        this.hideDayPicker();
      }
      setTimeout((function() {
        if (cardParent) {
          if (cardParent.style.left !== '0px') {
            pickerBlock.className = 'pickWrapper isActive cardOnRight';
          } else {
            pickerBlock.className = 'pickWrapper isActive';
          }
        } else new Promise(function(resolve, reject) {
          pickerBlock.className = 'pickWrapper isActive';
        });
        this.setState({
          pickerId: dayID,
        })
      }).bind(this), 50);
    }
  }

  logCall = (e, i) => {
    console.log(e);
    console.log(i);
    let currRec = this.state.openedCall;

    if (i === 'setAppt' || i === 'noVisit') {
      currRec.fields['Appt. Set By'] = e['Appt. Set By'];
      currRec.fields['Appt. Set Date'] = e['Appt. Set Date'];
      currRec.fields['Status'] = e['Status'];
      currRec.fields['Proposal Type'] = e['Proposal Type'];
    }
    currRec.fields['Recent Call Date'] = e['Recent Call Date'];
    currRec.fields['Recent Caller'] = e['Recent Caller'];
    currRec.fields['Notes'] = e['Notes'];
    currRec.fields['Recent Call Time'] = e['Recent Call Time']

    console.log(currRec);

    this.setState({
      openedCall: currRec,
    })

    if (i === 'setAppt' || i === 'noVisit') {
      this.setState({
        calendarNote: e['calNote']
      });

      setTimeout((function() {
        this.googleCalLink();
      }).bind(this), 100);
    } else {
      setTimeout((function() {
        this.saveRecordHandler('reload');
      }).bind(this), 100);
    }
  }


  saveRecordHandler = e => {
    console.log('saveRecordHandler()');

    let pushRecordId = this.state.openedCall.id;
    let finalPush = {"fields": this.state.openedCall.fields}

    let regionId;
    if (this.state.itemRegion === 'tampa') {
      regionId = this.state.tampaId;
    } else {
      regionId = this.state.orlandoId;
    }
    axios
    .put(this.state.dataURL + regionId + '/Sales/' + pushRecordId, finalPush)
    .then(response => {
      if (e === 'reload') {
        window.location.reload();
      }
    });
  }


  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>{this.state.loadingText}</h4>
            </div>
          </div>
        </div>
      )
    }
    if (error) {
      return (
        <p>
          There was an error loading the data.{" "}
          <button onClick={this.loadData}>Try again</button>
        </p>
      );
    }

    return (
      <div className="FranchiseDashboard">
        {this.modalShow}
        <FranchiseDash
          allCallbacks={this.state.allCallbacks}
          meetings={this.state.meetings}
          planned={this.state.planned}
          todays={this.state.todays}
          showModal={this.showModal}
        />
      </div>
    );
  }

  get modalShow() {
    if (this.state.modal) {
      if (this.state.modalType === 'call') {
        return (
          <FranchiseCallModal
            openedCall={this.state.openedCall}
            closeModal={this.closeModal}
          />
        );
      }
    }
  }
}
