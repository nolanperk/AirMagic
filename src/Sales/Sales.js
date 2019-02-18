import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import filter from '../assets/icons/black/filter.png';
import sort from '../assets/icons/black/sort.png';
import loader from '../assets/loader.gif';

import Navbar from './Navbar';
import RecordView from './Records/RecordView';
import InsideSalesView from './Records/InsideSalesView';
import AppointmentView from './Records/AppointmentView';
import ProposalView from './Records/ProposalView';
import ListContent from './Archive/ListContent';
import ControlsBar from '../Globals/ControlsBar';
import ModalView from '../Globals/ModalView';
import ApiConfig from '../config'

let currentRecordState = [];
let revertState = [];
let dataIndex = [];
let fallbackRecordIndex;
let keyChangeDirection = '';
let finalURL;
let mergeTemp;
let mergeType;

export default class Sales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: '',
      currentTable: 'Sales',
      listView: 'view=All',
      sortByLabel: 'Company+Name',
      sortByOrder: 'asc',
      currentRecord: [],
      currentRecordIndex: [],
      currentId: [],
      fallbackRecord: [],
      recordView: false,
      recordChanges: false,
      activeModal: false,
      modalType: '',
      recordChanger: false,
      dataOffset: '',
      loadingMore: false,
      totalLoads: 1,
      userName: '',
      searchQuery: '',
      searchBy: '',
      newRecord: false,
      listIsVisible: props.recordId == null,
      currentRecordView: 'default',
      currentTab: 'contact',
      mobileHand: 'right'
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.loading && !nextState.loading) {
      if (this.props.recordId != null) {
        if (nextState.data != null && nextState.data.filter(e => e.id === this.props.recordId)[0]) {
          this.props.recordId;
          const record = nextState.data.filter(e => e.id === this.props.recordId)[0].fields;
          setTimeout((function() {
            this.setState({
              recordView: true,
              currentRecord: record,
              currentRecordIndex: this.state.data.findIndex(obj => obj.id == this.props.recordId),
            })
            if (record['Notes']) {
              this.setState({
                noteCharacters: record['Notes'].length,
              });
            } else {
              this.setState({
                noteCharacters: 0
              });
            }
          }).bind(this), 0);
        } else {
          console.log('componentWillUpdate() - record');
          finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + this.props.recordId;
          return axios
            .get(finalURL)
            .then(response => {
              console.log(response);
              this.setState({
                recordView: true,
                loading: false,
                error: false,
                currentRecord: response.data.fields,
              });
              if (response.data.fields['Notes']) {
                this.setState({
                  noteCharacters: response.data.fields['Notes'].length,
                });
              } else {
                this.setState({
                  noteCharacters: 0
                });
              }
            })
            .catch(error => {
              console.error("error: ", error);
              this.setState({
                error: `${error}`,
                loading: false,
              });
            });
        }
      } else if (this.props.citySet != null) {
        console.log('yo-2');
      } else {
        console.log('yo-3');
        finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + this.props.recordId;
        console.log('componentWillUpdate() - list');
        return axios
          .get(finalURL)
          .then(response => {
            console.log(response);
            this.setState({
              recordView: true,
              loading: false,
              error: false,
              currentRecord: response.data.fields,
            });
            if (response.data.fields['Notes']) {
              this.setState({
                noteCharacters: response.data.fields['Notes'].length,
              });
            } else {
              this.setState({
                noteCharacters: 0
              });
            }
          })
          .catch(error => {
            console.error("error: ", error);
            this.setState({
              error: `${error}`,
              loading: false,
            });
          });
      }
    }
  }

  componentWillMount() {
    console.log(this.props.citySet);
    if (this.props.citySet === 'tampa') {
      this.setState({
        loading: false,
        baseId: 'appEX8GXgcD2ln4dB',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        loading: false,
        baseId: 'appXNufXR9nQARjgs',
      });
    }
    setTimeout((function() {
      console.log('loading data from ' + this.state.baseId);
    }).bind(this), 50);
  }

  loadPrevSearch = () => {
    let searchBy = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id;
    let searchByValue = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;
    this.setState({
      searchQuery: sessionStorage.getItem('searchQuery'),
      searchBy: sessionStorage.getItem('searchBy'),
      loading: true,
    });
    setTimeout((function() {
      let capitalizedQuery = this.state.searchQuery.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      searchBy = this.state.searchBy
      finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;
      if (this.state.listView !== '') {
        finalURL = finalURL + '?' + this.state.listView;
        finalURL = finalURL + '&filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + searchBy + '%7D)))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + searchBy + '%7D)))';
      }
      console.log('loadPrevSearch()');
      return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          data: response.data.records,
          loading: false,
          error: false,
          dataOffset: '',
        });
        if (this.state.recordView === false) {
          setTimeout((function() {
            if (document.getElementById('searchInput')) {
              document.getElementById('searchInput').value = capitalizedQuery;
              document.getElementById('searchBy').value = this.state.searchBy;
            }
          }).bind(this), 50);
        }
      })
    }).bind(this), 50);
  }



  searchHandler = e => {
    e.preventDefault();

    let searchBy = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id;
    let searchByValue = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

    this.setState({
      searchQuery: document.getElementById('searchInput').value,
      searchBy: document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id,
      loading: true,
    });

    setTimeout((function() {
      sessionStorage.setItem('searchQuery', this.state.searchQuery);
      sessionStorage.setItem('searchBy', this.state.searchBy);
    }).bind(this), 10);

    setTimeout((function() {
      let capitalizedQuery = this.state.searchQuery.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      searchBy = this.state.searchBy
      finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;
      if (this.state.listView !== '') {
        finalURL = finalURL + '?' + this.state.listView;
        finalURL = finalURL + '&filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + searchBy + '%7D)))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + searchBy + '%7D)))';
      }
      console.log('searchHandler()');
      return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          data: response.data.records,
          loading: false,
          error: false,
          dataOffset: '',
        });
        if (this.state.recordView === false) {
          setTimeout((function() {
            if (document.getElementById('searchInput')) {
              document.getElementById('searchInput').value = capitalizedQuery;
              document.getElementById('searchBy').value = searchByValue;
            }
          }).bind(this), 50);
        }
      })
    }).bind(this), 50);
  }

  hideDayPicker = () => {
    let getTheBlock = document.getElementById(this.state.pickerId).closest('.inputWithTag').previousElementSibling.previousElementSibling;
    getTheBlock.className = 'pickWrapper';
    this.setState({
      pickerId: null,
    })
  }
  handleDayClick = day => {
    currentRecordState = this.state.currentRecord;
    let newSelectedDay = new Date(day);
    let finalDate = (newSelectedDay.getMonth() + 1) + '/' + newSelectedDay.getDate() + '/' + newSelectedDay.getFullYear();


    if (this.state.pickerId === 'closed') {currentRecordState['Close Date'] = finalDate}
    else if (this.state.pickerId === 'walkthrough') {currentRecordState['Walkthrough Date'] = finalDate}
    else if (this.state.pickerId === 'start') {currentRecordState['Start Date'] = finalDate}
    else if (this.state.pickerId === 'cancel') {currentRecordState['Cancel Date'] = finalDate}
    else if (this.state.pickerId === 'preCleanDate') {currentRecordState['Pre-Clean Date'] = finalDate}
    else if (this.state.pickerId === 'apptSet') {currentRecordState['Appt. Set Date'] = finalDate}
    else if (this.state.pickerId === 'apptDate') {currentRecordState['Appt. Date'] = finalDate}
    else if (this.state.pickerId === 'proposal') {currentRecordState['Proposal Date'] = finalDate}
    else if (this.state.pickerId === 'callDate') {currentRecordState['Recent Call Date'] = finalDate}
    else if (this.state.pickerId === 'callBack') {currentRecordState['Callback Date'] = finalDate}
    else if (this.state.pickerId === 'followDate') {currentRecordState['Last Contact'] = finalDate}

    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })

    setTimeout((function() {
      console.log('yooo');
      this.hideDayPicker();
    }).bind(this), 50);
  }
  toggleDayPicker = e => {
    let dayID = e.target.closest('.inputWithTag').getElementsByTagName('input')[0].id;
    let cardParent = e.target.closest('.inputWithTag').closest('.inputBlock').closest('.inner').closest('.ModuleCard');
    let pickerBlock = e.target.closest('.inputWithTag').previousElementSibling.previousElementSibling;

    if (pickerBlock.className === 'pickWrapper isActive' || pickerBlock.className === 'pickWrapper isActive cardOnRight') {
      this.hideDayPicker();
    } else {
      if (this.state.pickerId != null) {
        this.hideDayPicker();
      }
      setTimeout((function() {
        if (cardParent.style.left !== '0px') {
          pickerBlock.className = 'pickWrapper isActive cardOnRight';
        } else {
          pickerBlock.className = 'pickWrapper isActive';
        }
        this.setState({
          pickerId: dayID,
        })
      }).bind(this), 50);
    }
  }

  openRecordHandler = (e, key, index)  => {
    if (this.state.data.length > 100) {
      sessionStorage.setItem('innerClosedID', this.props.recordId);
      sessionStorage.setItem('innerOffset', this.state.dataOffset);
    }
    this.props.history.push('/' + this.props.citySet + '/sales/' + key);
  }

  moveDatabasesHandler = () => {
    let currentRecordId = this.props.recordId;
    this.setState({
      // loading: true,
      movingDatabases: true,
      recordChanges: true,
    });

    let todaysDate = new Date();
    let newClosedDate = (todaysDate.getMonth() + 1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    this.state.currentRecord['Close Date'] = newClosedDate;
    this.state.currentRecord['Status'] = 'Closed';


    setTimeout((function() {
      console.log(this.state.currentRecord);
      this.saveRecordHandler();

      let pushRecord = {
        'Company Name': '',
        'Main contact': '',
        'Title': '',
        'Alternate Contact': '',
        'Office Phone': '',
        'Extension': '',
        'Cell Phone': '',
        'Email': '',
        'Lead Source': '',
        'Address 1': '',
        'Address 2': '',
        'City': '',
        'Zip': '',
        'County': '',
        'Employees': '',
        'Appt. Set By': '',
        'Pre-Clean Charge': '',
        'Monthly Amount': '',
        'Sq. Footage': '',
        'Actual Sq Footage': '',
        'Restrooms': '',
        'Ceramic': '',
        'Marble': '',
        'VCT': '',
        'Wood': '',
        'Wood Lam.': '',
        'Carpet': '',
        'Other': '',
        'Hours Per': '',
        'SQ Ft. per Hour': '',
        'Times per Week': '',
        'Days of Week': '',
        'Sales Rep': '',
        'Notes': '',
        'Special Notes': '',
        'Status': 'Active',
        'Standing': 'New Close',
        'Last Contact': '',
        'Follow Ups': 0,
        'Follow Ups Used': '',
        'Follow Status': '',
      }
      if(this.state.currentRecord['Company Name']) {pushRecord['Company Name'] = this.state.currentRecord['Company Name']}
      if(this.state.currentRecord['Main contact']) {pushRecord['Main contact'] = this.state.currentRecord['Main contact']}
      if(this.state.currentRecord['Title']) {pushRecord['Title'] = this.state.currentRecord['Title']}
      if(this.state.currentRecord['Alternate Contact']) {pushRecord['Alternate Contact'] = this.state.currentRecord['Alternate Contact']}
      if(this.state.currentRecord['Office Phone']) {pushRecord['Office Phone'] = this.state.currentRecord['Office Phone']}
      if(this.state.currentRecord['Extension']) {pushRecord['Extension'] = this.state.currentRecord['Extension']}
      if(this.state.currentRecord['Cell Phone']) {pushRecord['Cell Phone'] = this.state.currentRecord['Cell Phone']}
      if(this.state.currentRecord['Email']) {pushRecord['Email'] = this.state.currentRecord['Email']}
      if(this.state.currentRecord['Lead Source']) {pushRecord['Lead Source'] = this.state.currentRecord['Lead Source']}
      if(this.state.currentRecord['Cancel Date']) {pushRecord['Cancel Date'] = this.state.currentRecord['Cancel Date']}
      if(this.state.currentRecord['Address 1']) {pushRecord['Address 1'] = this.state.currentRecord['Address 1']}
      if(this.state.currentRecord['Address 2']) {pushRecord['Address 2'] = this.state.currentRecord['Address 2']}
      if(this.state.currentRecord['City']) {pushRecord['City'] = this.state.currentRecord['City']}
      if(this.state.currentRecord['Zip']) {pushRecord['Zip'] = this.state.currentRecord['Zip']}
      if(this.state.currentRecord['County']) {pushRecord['County'] = this.state.currentRecord['County']}
      if(this.state.currentRecord['Employees']) {pushRecord['Employees'] = this.state.currentRecord['Employees']}
      if(this.state.currentRecord['Appt. Set Date']) {pushRecord['Appt. Set Date'] = this.state.currentRecord['Appt. Set Date']}
      if(this.state.currentRecord['Appt. Set By']) {pushRecord['Appt. Set By'] = this.state.currentRecord['Appt. Set By']}
      if(this.state.currentRecord['Appt. Date']) {pushRecord['Appt. Date'] = this.state.currentRecord['Appt. Date']}
      if(this.state.currentRecord['Close Date']) {pushRecord['Close Date'] = this.state.currentRecord['Close Date']}
      if(this.state.currentRecord['Proposal Date']) {pushRecord['Proposal Date'] = this.state.currentRecord['Proposal Date']}
      if(this.state.currentRecord['Walkthrough Date']) {pushRecord['Walkthrough Date'] = this.state.currentRecord['Walkthrough Date']}
      if(this.state.currentRecord['Start Date']) {pushRecord['Start Date'] = this.state.currentRecord['Start Date']}
      if(this.state.currentRecord['Pre-Clean Date']) {pushRecord['Pre-Clean Date'] = this.state.currentRecord['Pre-Clean Date']}
      if(this.state.currentRecord['Pre-Clean Charge']) {pushRecord['Pre-Clean Charge'] = this.state.currentRecord['Pre-Clean Charge']}
      if(this.state.currentRecord['Monthly Amount']) {pushRecord['Monthly Amount'] = this.state.currentRecord['Monthly Amount']}
      if(this.state.currentRecord['Sq. Footage']) {pushRecord['Sq. Footage'] = this.state.currentRecord['Sq. Footage']}
      if(this.state.currentRecord['Actual Sq Footage']) {pushRecord['Actual Sq Footage'] = this.state.currentRecord['Actual Sq Footage']}
      if(this.state.currentRecord['Restrooms']) {pushRecord['Restrooms'] = this.state.currentRecord['Restrooms']}
      if(this.state.currentRecord['Ceramic']) {pushRecord['Ceramic'] = this.state.currentRecord['Ceramic']}
      if(this.state.currentRecord['Marble']) {pushRecord['Marble'] = this.state.currentRecord['Marble']}
      if(this.state.currentRecord['VCT']) {pushRecord['VCT'] = this.state.currentRecord['VCT']}
      if(this.state.currentRecord['Wood']) {pushRecord['Wood'] = this.state.currentRecord['Wood']}
      if(this.state.currentRecord['Wood Lam']) {pushRecord['Wood Lam.'] = this.state.currentRecord['Wood Lam']}
      if(this.state.currentRecord['Carpet']) {pushRecord['Carpet'] = this.state.currentRecord['Carpet']}
      if(this.state.currentRecord['Other']) {pushRecord['Other'] = this.state.currentRecord['Other']}
      if(this.state.currentRecord['Hours Per']) {pushRecord['Hours Per'] = this.state.currentRecord['Hours Per']}
      if(this.state.currentRecord['SQ Ft. per Hour']) {pushRecord['SQ Ft. per Hour'] = this.state.currentRecord['SQ Ft. per Hour']}
      if(this.state.currentRecord['Times per Week']) {pushRecord['Times per Week'] = this.state.currentRecord['Times per Week']}
      if(this.state.currentRecord['Days of Week']) {pushRecord['Days of Week'] = this.state.currentRecord['Days of Week']}
      if(this.state.currentRecord['Sales Rep']) {pushRecord['Sales Rep'] = this.state.currentRecord['Sales Rep']}
      if(this.state.currentRecord['Notes']) {pushRecord['Notes'] = this.state.currentRecord['Notes']}
      if(this.state.currentRecord['Special Notes']) {pushRecord['Special Notes'] = this.state.currentRecord['Special Notes']}
      if(this.state.currentRecord['Last Contact']) {pushRecord['Last Contact'] = this.state.currentRecord['Last Contact']}
      if(this.state.currentRecord['Follow Ups']) {pushRecord['Follow Ups'] = parseInt(this.state.currentRecord['Follow Ups'])}
      if(this.state.currentRecord['Follow Ups Used']) {pushRecord['Follow Ups Used'] = this.state.currentRecord['Follow Ups Used']}
      if(this.state.currentRecord['Follow Status']) {pushRecord['Follow Status'] = this.state.currentRecord['Follow Status']}

      let destinationURL;
      let finalPush = {"fields": pushRecord}

      console.log(destinationURL);
      console.log(pushRecord);

      let customerBase;
      if (this.props.citySet === 'tampa') {
        customerBase = 'apps7GoAgK23yrOoY';
      } else if (this.props.citySet === 'orlando') {
        customerBase = 'appBUKBn552B8SlbE';
      }
      axios
      .post(this.state.dataURL + customerBase + '/Customers/', finalPush)
        .then(response => {
          destinationURL = '/' + this.props.citySet + '/customer-service/all/' + response.data.id;
          console.log('moveDatabasesHandler()');

          this.setState({
            loading: false,
          });





          delete axios.defaults.headers.common["Authorization"];

          let secondMessage; let slackMessage;
          let randomNumb = Math.random();
          if (randomNumb < 0.33) { //money
            slackMessage = ":moneybag: :bellhop_bell: :money_mouth_face: :bellhop_bell: :moneybag:";
            secondMessage = "AHHH!\n*"
          } else if (randomNumb >= 0.33 && randomNumb < 0.66) { //rain
            slackMessage = ":partly_sunny_rain: :umbrella_with_rain_drops: :scream: :umbrella_with_rain_drops: :partly_sunny_rain:";
            secondMessage = "LET IT RAIN!\n*"
          } else if (randomNumb >= 0.66) { // party
            slackMessage = ":tada: :clap: :star-struck: :clap: :tada:";
            secondMessage = "YASSSS!\n*"
          }

          secondMessage += this.state.currentRecord['Sales Rep'].split(' ')[0];
          secondMessage += '* just closed a deal in *';
          secondMessage += this.state.currentRecord['City'];
          secondMessage += '* for *$';
          secondMessage += this.state.currentRecord['Monthly Amount'] + '*!!';

          axios.post('https://hooks.slack.com/services/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', '{"text":"' + slackMessage + '"}')
          .then(response => {
            setTimeout((function() {
              delete axios.defaults.headers.common["Authorization"];
              axios.post('https://hooks.slack.com/services/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', '{"text":"' + secondMessage + '"}')
              .then(response => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
                console.log('gonna bounce now');
                setTimeout((function() {
                  this.props.history.push(destinationURL);
                  this.loadData();
                  alert("The record has been moved to the " + this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Customers database.\n\n Let's go there now!");
                }).bind(this), 250);
              });
            }).bind(this), 2000);

          });
          // return axios
          //   .delete(this.state.dataURL + this.state.baseId + '/Sales/' + currentRecordId)
          //   .then(response => {
          //   });
      })
      .catch(response => {
        console.error("error: ", response);
      });
    }).bind(this), 10);
  }

  newRecordHandler = ()  => {
    currentRecordState = {
      'Company Name': 'New Company',
      'Industry': null,
      'Times Called': null,
      'Recent Call Date': null,
      'Callback Date': null,
      'Website': null,

      'Status': null,
      'Sales Rep': null,
      'Standing': null,
      'Recent Caller': null,
      'Appt. Set By': null,

      'Special Notes': null,

      'Appt. Set Date': null,
      'Appt. Date': null,
      'Appt. Time': null,
      'Proposal Date': null,
      'Close Date': null,
      'Walkthrough Date': null,
      'Start Date': null,
      'Pre-Clean Date': null,
      'Pre-Clean Charge': null,
      'Cancel Date': null,
      'Call Status': null,

      'Salutation': null,
      'Main contact': null,
      'Title': null,
      'Alternate Contact': null,
      'Office Phone': null,
      'Extension': null,
      'Cell Phone': null,
      'Email': null,
      'Lead Source': null,

      'Address 1': null,
      'Address 2': null,
      'City': null,
      'Zip': null,
      'County': null,
      'Employees': null,

      'Monthly Amount': null,
      'Sq. Footage': null,
      'Actual Sq Footage': null,
      'Restrooms': null,
      'Ceramic': null,
      'Marble': null,
      'VCT': null,
      'Wood': null,
      'Wood Lam': null,
      'Carpet': null,
      'Other': null,

      'Hours Per': null,
      'SQ Ft. per Hour': null,
      'Times per Week': null,
      'Days of Week': null,
    };

    console.log(currentRecordState);

    this.setState({
      recordView: true,
      newRecord: true,
      currentRecord: currentRecordState,
    })

    setTimeout((function() {
      console.log(this.state.currentRecord);
    }).bind(this), 250);
  }
  changeNotesHandler = e => {
    if (e.target.id === 'special') {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Special Notes'] = e.target.value;

      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
      })
    } else {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Notes'] = e.target.value;

      let noteCharacters = currentRecordState['Notes'].length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
        noteCharacters: noteCharacters,
      })
    }
  }

  changeRecordHandler = e => {
    currentRecordState = this.state.currentRecord;

    if (e.target.id === 'company') {currentRecordState['Company Name'] = e.target.value}
    else if (e.target.id === 'industry') {currentRecordState['Industry'] = e.target.value}
    else if (e.target.id === 'callCount') {currentRecordState['Times Called'] = e.target.value}
    else if (e.target.id === 'callDate') {currentRecordState['Recent Call Date'] = e.target.value}
    else if (e.target.id === 'callBack') {currentRecordState['Callback Date'] = e.target.value}
    else if (e.target.id === 'website') {currentRecordState['Website'] = e.target.value}

    else if (e.target.id === 'apptSet') {currentRecordState['Appt. Set Date'] = e.target.value}
    else if (e.target.id === 'apptDate') {currentRecordState['Appt. Date'] = e.target.value}
    else if (e.target.id === 'apptTime') {currentRecordState['Appt. Time'] = e.target.value}
    else if (e.target.id === 'proposal') {currentRecordState['Proposal Date'] = e.target.value}
    else if (e.target.id === 'closed') {currentRecordState['Close Date'] = e.target.value}
    else if (e.target.id === 'walkthrough') {currentRecordState['Walkthrough Date'] = e.target.value}
    else if (e.target.id === 'start') {currentRecordState['Start Date'] = e.target.value}
    else if (e.target.id === 'preCleanDate') {currentRecordState['Pre-Clean Date'] = e.target.value}
    else if (e.target.id === 'preCleanCharge') {currentRecordState['Pre-Clean Charge'] = e.target.value}
    else if (e.target.id === 'cancel') {currentRecordState['Cancel Date'] = e.target.value}

    else if (e.target.id === 'callStatus') {currentRecordState['Call Status'] = e.target.value}

    else if (e.target.id === 'salutation') {currentRecordState['Salutation'] = e.target.value}
    else if (e.target.id === 'contact') {currentRecordState['Main contact'] = e.target.value}
    else if (e.target.id === 'title') {currentRecordState['Title'] = e.target.value}
    else if (e.target.id === 'altContact') {currentRecordState['Alternate Contact'] = e.target.value}
    else if (e.target.id === 'phone') {currentRecordState['Office Phone'] = e.target.value}
    else if (e.target.id === 'ext') {currentRecordState['Extension'] = e.target.value}
    else if (e.target.id === 'cell') {currentRecordState['Cell Phone'] = e.target.value}
    else if (e.target.id === 'email') {currentRecordState['Email'] = e.target.value}
    else if (e.target.id === 'source') {currentRecordState['Lead Source'] = e.target.value}

    else if (e.target.id === 'addr1') {currentRecordState['Address 1'] = e.target.value}
    else if (e.target.id === 'addr2') {currentRecordState['Address 2'] = e.target.value}
    else if (e.target.id === 'city') {currentRecordState['City'] = e.target.value}
    else if (e.target.id === 'zip') {currentRecordState['Zip'] = e.target.value}
    else if (e.target.id === 'county') {currentRecordState['County'] = e.target.value}
    else if (e.target.id === 'emp') {currentRecordState['Employees'] = e.target.value}

    else if (e.target.id === 'amount') {currentRecordState['Monthly Amount'] = e.target.value}
    else if (e.target.id === 'sqFt') {currentRecordState['Sq. Footage'] = e.target.value}
    else if (e.target.id === 'sqFtReal') {currentRecordState['Actual Sq Footage'] = e.target.value}
    else if (e.target.id === 'restrooms') {currentRecordState['Restrooms'] = e.target.value}
    else if (e.target.id === 'ceramic') {currentRecordState['Ceramic'] = e.target.value}
    else if (e.target.id === 'marble') {currentRecordState['Marble'] = e.target.value}
    else if (e.target.id === 'vct') {currentRecordState['VCT'] = e.target.value}
    else if (e.target.id === 'wood') {currentRecordState['Wood'] = e.target.value}
    else if (e.target.id === 'woodLam') {currentRecordState['Wood Lam'] = e.target.value}
    else if (e.target.id === 'carpet') {currentRecordState['Carpet'] = e.target.value}
    else if (e.target.id === 'other') {currentRecordState['Other'] = e.target.value}

    else if (e.target.id === 'hoursPer') {currentRecordState['Hours Per'] = e.target.value}
    else if (e.target.id === 'sqFtPer') {currentRecordState['SQ Ft. per Hour'] = e.target.value}
    else if (e.target.id === 'timesPerWeek') {currentRecordState['Times per Week'] = e.target.value}
    else if (e.target.id === 'weekDays') {currentRecordState['Days of Week'] = e.target.value}

    else if (e.target.id === 'followDate') {currentRecordState['Last Contact'] = e.target.value}
    else if (e.target.id === 'followCount') {currentRecordState['Follow Ups'] = parseInt(e.target.value)}
    else if (e.target.id === 'followUsed') {currentRecordState['Follow Ups Used'] = e.target.value}


    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })
  }
  setByChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Appt. Set By'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }
  repChange = e => {
    console.log('yo');
    let currentsRec = this.state.currentRecord;
    currentsRec['Sales Rep'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }


  closeRecordHandler = () => {
    if (this.state.recordChanges) {
      this.setState({
        activeModal: true,
        modalType: 'saveAlert',
        currentId: this.props.recordId,
      });
    } else {
      if (this.state.data.length > 100) {
        sessionStorage.setItem('innerClosedID', this.props.recordId);
        sessionStorage.setItem('innerOffset', this.state.dataOffset);
      }
      this.props.history.push('/' + this.props.citySet + '/sales/');
      this.setState({
          activeModal: false,
          modalType: '',
          recordView: false,
          newRecord: false,
      });
    }
  }

  recordChanger = e => {
    dataIndex = this.state.data.findIndex(obj => obj.id == this.props.recordId);
    fallbackRecordIndex = parseInt(this.state.currentRecordIndex.toString());
    console.log(fallbackRecordIndex);


    if (this.state.recordChanges) {
      this.setState({
        activeModal: true,
        modalType: 'saveAlert',
        recordChanger: true,
        currentId: this.props.recordId,
      });
      if (e.target.closest(".ControlsBar--btn").id === 'prev') {
        this.setState({
          changerType: 'prev'
        });
      } else if (e.target.closest(".ControlsBar--btn").id === 'next') {
        this.setState({
          changerType: 'next'
        });
      }
    } else {
      if (e.target.closest(".ControlsBar--btn").id === 'prev') {
        if (dataIndex !== 0) {
          dataIndex --;
        }
      } else if (e.target.closest(".ControlsBar--btn").id === 'next') {
        dataIndex ++;
      }
      if ((this.state.data.length - 1) <= dataIndex) {
        if (sessionStorage.getItem('searchQuery')) {
        } else {
          console.log(dataIndex + ' / ' + this.state.data.length);
          this.loadMoreRecords();
        }
      }

      let loadMoreChanger = setInterval(function() {
        if (sessionStorage.getItem('searchQuery')) {
          clearInterval(loadMoreChanger);
          console.log('clearing it out!');
        }
        if ((this.state.data.length - 1) >= dataIndex) {
          clearInterval(loadMoreChanger);
          console.log('clearing it out!');
          this.setState({
            loading: true,
          });

          this.props.history.push('/' + this.props.citySet + '/sales/' + this.state.data[dataIndex].id);

          setTimeout((function() {
            this.setState({
              loading: false,
            });

            setTimeout((function() {
              document.title = this.state.currentRecord['Company Name'] + " | AirMagic"
            }).bind(this), 500);

            // window.location.reload();
          }).bind(this), 10);
        } else {
          console.log(this.state.data.length - 1 + ' / ' + dataIndex);
        }
      }.bind(this), 50);
    }
  }

  arrowKeyHandler = e => {
    console.log(e);
    if (e.keyCode == 37) {
      console.log('going left!');
    }
    if (e.keyCode == 39) {
      console.log('going left!');
    }
  }

  revertRecordHandler = () => {
    let fullDataSet = this.state.data;

    if (!this.state.newRecord) {
      console.log('revertRecordHandler()');
      return axios
      .get(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + this.props.recordId)
      .then(response => {
        this.setState({
          fallbackRecord: response.data.fields,
        });

        setTimeout((function() {
          this.setState({
            loading: true,
          });

          if (this.state.recordChanger) {
            if (this.state.changerType === 'prev') {
              dataIndex --;
            } else {
              dataIndex ++;

              if ((this.state.data.length - 1) <= dataIndex) {
                console.log(dataIndex + ' / ' + this.state.data.length);
                this.loadMoreRecords();
              }
            }
            fullDataSet[fallbackRecordIndex].fields = this.state.fallbackRecord;

            this.setState({
              data: fullDataSet,
              recordChanger: false,
              activeModal: false,
              modalType: '',
              changerType: false,
              recordChanges: false,
            });

            this.props.history.push('/' + this.props.citySet + '/sales/' + this.state.data[dataIndex].id);
          } else {
            // fullDataSet[dataIndex].fields = this.state.fallbackRecord
            this.props.history.push('/' + this.props.citySet + '/sales/');
            this.setState({
              data: fullDataSet,
              recordView: false,
              currentRecord: [],
            });
          }


          setTimeout((function() {
            this.setState({
              loading: false,
            });
          }).bind(this), 10);
        }).bind(this), 50);
      });
    } else {
      this.setState({
        currentRecord: [],
      })
    }
    this.setState({
      newRecord: false,
      activeModal: false,
      recordChanges: false,
      modalType: '',
    });
  }




  autoPricing = () => {
    let fullDataSet = this.state.currentRecord;


    let sqFtReal = parseInt(fullDataSet['Actual Sq Footage']);
    let cleanSpeed = fullDataSet['SQ Ft. per Hour'];
    let timesPerWeek = parseInt(fullDataSet['Times per Week'].substring(0,1));
    let hourlyPrice;
    let autoPrice;

    if (timesPerWeek === 1) {
      hourlyPrice = 21;
    } else if (timesPerWeek === 2) {
      hourlyPrice = 20;
    } else if (timesPerWeek === 3) {
      hourlyPrice = 19;
    } else if (timesPerWeek === 4) {
      hourlyPrice = 18.5;
    } else if (timesPerWeek === 5) {
      hourlyPrice = 18;
    } else if (timesPerWeek === 6) {
      hourlyPrice = 18.25;
    } else if (timesPerWeek === 7) {
      hourlyPrice = 18.5;
    } else {
      hourlyPrice = 0;
    }
    console.log('(sqFtReal / cleanSpeed) * timesPerWeek * hourlyPrice * 4.3');
    autoPrice = (parseInt(sqFtReal) / cleanSpeed) * timesPerWeek * hourlyPrice * 4.3;
    console.log(autoPrice);
    autoPrice = Math.round(autoPrice/5)*5;
    console.log(autoPrice);

    let hoursPer = (parseInt(sqFtReal) / cleanSpeed);
    hoursPer = hoursPer.toFixed(2);

    fullDataSet['Hours Per'] = hoursPer.toString();
    fullDataSet['Monthly Amount'] = autoPrice.toString();

    this.setState({
      currentRecord: fullDataSet,
    });
  }

  timesPerWeekChange = e => {
    console.log(e.target.value);
    let fullDataSet = this.state.currentRecord;
    fullDataSet['Times per Week'] = document.getElementById('timesPerWeekSelect').value;

    if (e.target.value === 'other') {
      this.setState({
        recordChanges: true,
        currentRecord: fullDataSet,
      });
    } else {
      this.setState({
        recordChanges: true,
        currentRecord: fullDataSet,
      });
    }
  }

  saveRecordHandler = () => {
    if (this.state.newRecord) {
      let fullDataSet = this.state.currentRecord;
      fullDataSet["Status"] = document.getElementById('statusSelect').value;
      if (this.state.currentRecordView !== 'default') {
        this.setState({
          currentRecordView: 'default',
        })
      }
      setTimeout((function() {
        fullDataSet["Sales Rep"] = document.getElementById('repSelect').value;
        fullDataSet["Standing"] = document.getElementById('standingSelect').value;
        fullDataSet["Recent Caller"] = document.getElementById('callerSelect').value;
        fullDataSet["Call Status"] = document.getElementById('callStatus').value;
        fullDataSet["Appt. Set By"] = document.getElementById('setBySelect').value;
        fullDataSet["Follow Status"] = document.getElementById('followStatus').value;



        let officePhone = this.state.currentRecord["Office Phone"];
        if (officePhone) {
          officePhone = parseInt(officePhone.replace( /\D+/g, ''));
          let s2 = (""+officePhone).replace(/\D/g, '');
          let formattedNumber = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
          let finalNumber;
          if (formattedNumber) {
            finalNumber = "(" + formattedNumber[1] + ") " + formattedNumber[2] + "-" + formattedNumber[3];;
            this.state.currentRecord["Office Phone"] = finalNumber;
          }
        }

        let cellPhone = this.state.currentRecord["Cell Phone"];
        if (cellPhone) {
          cellPhone = parseInt(cellPhone.replace( /\D+/g, ''));
          let cell2 = (""+cellPhone).replace(/\D/g, '');
          let formCellPhone = cell2.match(/^(\d{3})(\d{3})(\d{4})$/);
          let finalCellNumber;
          if (formCellPhone) {
            finalCellNumber = "(" + formCellPhone[1] + ") " + formCellPhone[2] + "-" + formCellPhone[3];;
            this.state.currentRecord["Cell Phone"] = finalCellNumber;
          }
        }

        let finalPush = {"fields": fullDataSet}
        console.log(finalPush);
        axios
        .post(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable, finalPush)
          .then(response => {
          if (this.state.activeModal && this.state.modalType === 'saveAlert') {
            this.setState({
              recordView: false,
              currentRecord: []
            });
          }
          this.setState({
            data: this.state.data.push(response.data),
            activeModal: false,
            modalType: '',
            newRecord: false,
            currentRecord: [],
            recordChanges: false,
          });

          if (this.state.currentRecordView !== 'default') {
            this.setState({
              currentRecordView: sessionStorage.getItem('salesView'),
            })
          }
          setTimeout((function() {
            this.props.history.push('/' + this.props.citySet + '/sales/' + response.data.id);
          }).bind(this), 10);
        })
        .catch(response => {
          console.error("error: ", response);
        });
      }).bind(this), 10);
    } else {
      console.log('saveRecordHandler()');
      let fullDataSet = this.state.data;
      let pushRecordId;
      let pushRecord;

      pushRecord = this.state.currentRecord;
      pushRecordId = this.props.recordId;

      if (this.state.currentRecordView !== 'default') {
        this.setState({
          currentRecordView: 'default',
        })
      }

      if (pushRecord["Appt. Date"] === '') {pushRecord["Appt. Date"] = undefined;}
      if (pushRecord["Recent Call Date"] === '') {pushRecord["Recent Call Date"] = undefined;}
      if (pushRecord["Close Date"] === '') {pushRecord["Close Date"] = undefined;}
      if (pushRecord["Proposal Date"] === '') {pushRecord["Proposal Date"] = undefined;}
      if (pushRecord["Follow Status"] === '') {pushRecord["Follow Status"] = undefined;}

      let officePhone = this.state.currentRecord["Office Phone"];
      if (officePhone) {
        officePhone = parseInt(officePhone.replace( /\D+/g, ''));
        let s2 = (""+officePhone).replace(/\D/g, '');
        let formattedNumber = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalNumber;
        if (formattedNumber) {
          finalNumber = "(" + formattedNumber[1] + ") " + formattedNumber[2] + "-" + formattedNumber[3];;
          this.state.currentRecord["Office Phone"] = finalNumber;
        }
      }

      let cellPhone = this.state.currentRecord["Cell Phone"];
      if (cellPhone) {
        cellPhone = parseInt(cellPhone.replace( /\D+/g, ''));
        let cell2 = (""+cellPhone).replace(/\D/g, '');
        let formCellPhone = cell2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalCellNumber;
        if (formCellPhone) {
          finalCellNumber = "(" + formCellPhone[1] + ") " + formCellPhone[2] + "-" + formCellPhone[3];;
          this.state.currentRecord["Cell Phone"] = finalCellNumber;
        }
      }
      setTimeout((function() {
        if (this.state.movingDatabases) {
          pushRecord["Status"] = 'Closed';
        } else {
          pushRecord["Status"] = document.getElementById('statusSelect').value;
        }
        pushRecord["Sales Rep"] = document.getElementById('repSelect').value;
        pushRecord["Standing"] = document.getElementById('standingSelect').value;
        pushRecord["Recent Caller"] = document.getElementById('callerSelect').value;
        pushRecord["Appt. Set By"] = document.getElementById('setBySelect').value;
        pushRecord["Call Status"] = document.getElementById('callStatus').value;
        pushRecord["Follow Status"] = document.getElementById('followStatus').value;

        let finalPush = {"fields": pushRecord}
        console.log(finalPush);
        axios
        .put(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + pushRecordId, finalPush)
          .then(response => {
          if (this.state.activeModal) {
            this.setState({
              loading: true,
            })
            if (this.state.recordChanger) {
              if (this.state.changerType === 'prev') {
                dataIndex --;
              } else {
                dataIndex ++;
                if ((this.state.data.length - 1) <= dataIndex) {
                  console.log(dataIndex + ' / ' + this.state.data.length);
                  this.loadMoreRecords();
                }
              }

              setTimeout((function() {
                this.setState({
                  data: fullDataSet,
                  recordChanger: false,
                  activeModal: false,
                  modalType: '',
                  recordChanges: false,
                });
              }).bind(this), 10);
              this.props.history.push('/' + this.props.citySet + '/sales/' + this.state.data[dataIndex].id);
            } else {
              if (this.state.modalType === 'saveAlert') {
                this.props.history.push('/' + this.props.citySet + '/sales/');
                this.setState({
                  data: fullDataSet,
                  recordView: false,
                  currentRecord: [],
                });

                this.setState({
                  recordView: false,
                  currentRecord: []
                });
              } else {
                this.setState({
                  activeModal: false,
                  modalType: '',
                });
              }
              this.setState({
                fallbackRecord: [],
                recordChanges: false,
                currentRecord: this.state.data[dataIndex].fields,
                loading: false,
              });
            }
            setTimeout((function() {
              this.setState({
                loading: false,
              });
            }).bind(this), 10);
          } else {
            if (this.state.currentRecordView !== 'default') {
              this.setState({
                currentRecordView: sessionStorage.getItem('salesView'),
              })
            }
            if (this.state.isExporting) {
              this.setState({
                isExporting: false,
              })
              setTimeout((function() {
                window.location.reload();
              }).bind(this), 10);
            } else {
              alert('Record Saved');
            }
          }
        })
        .catch(response => {
          console.error("error: ", response);
          // alert('******************************************************There was an error saving the record. Do not leave the page. Please get Nolan to take a look.******************************************************')
        });
      }).bind(this), 10);

    }
  }


  saveNoteHandler = e => {
    let newNote = document.getElementById("newNoteBox").value;
    currentRecordState = this.state.currentRecord;

    if (currentRecordState['Notes']) {
      currentRecordState['Notes'] = newNote + '\n\n' + currentRecordState['Notes'];
    } else {
      currentRecordState['Notes'] = newNote;
    }

    this.setState({
      currentRecord: currentRecordState,
      activeModal: false,
      modalType: '',
      recordChanges: true,
    })
  }


  createDocument = () => {
    let mergeURL;
    let finalURL;

    if (mergeTemp !== 'none') {
      let mergeData = this.state.currentRecord;

      if (mergeType === 'Proposal') {
        mergeURL = {base: 'https://www.webmerge.me/merge/', id: '', MrMs: '', Cont_First_Name: '', Cont_Last_Name: '', Contact_Title: '', Company: '', Address_Line_1: '', Address_Line_2: '', City: '', Zip_Code: '', Amount: '', Days_Serviced: '', Proposal_Date: ''}

        if (mergeTemp === 'tmp-standard') {mergeURL.id = '177990/dl44vl';}
        if (mergeTemp === 'tmp-once') {mergeURL.id = '177991/c4yk4s';}
        if (mergeTemp === 'tmp-medical') {mergeURL.id = '177992/u7ybcx';}
        if (mergeTemp === 'tmp-schools') {mergeURL.id = '177993/r57mym';}
        if (mergeTemp === 'tmp-1x') {mergeURL.id = '177994/zwklbq';}

        if (mergeTemp === 'nwp-standard') {mergeURL.id = '177995/2r9k6c';}
        if (mergeTemp === 'nwp-once') {mergeURL.id = '177996/xhy3ib';}
        if (mergeTemp === 'nwp-medical') {mergeURL.id = '177997/qw4acl';}
        if (mergeTemp === 'nwp-schools') {mergeURL.id = '177998/u6qxyj';}
        if (mergeTemp === 'nwp-1x') {mergeURL.id = '177999/ycpgia';}

        if (mergeTemp === 'ram-standard') {mergeURL.id = '177723/u7be1d';}
        if (mergeTemp === 'ram-once') {mergeURL.id = '177722/u7nscy';}
        if (mergeTemp === 'ram-medical') {mergeURL.id = '177718/gusxia';}
        if (mergeTemp === 'ram-medical-1x') {mergeURL.id = '177719/49snjp';}
        if (mergeTemp === 'ram-healthcare') {mergeURL.id = '177724/gr2r59';}
        if (mergeTemp === 'ram-multi-tenant') {mergeURL.id = '177720/c6ncuf';}
        if (mergeTemp === 'ram-schools') {mergeURL.id = '177725/pbf2q4';}

        if (mergeTemp === 'jdh-standard') {mergeURL.id = '178005/iu7f5a';}
        if (mergeTemp === 'jdh-once') {mergeURL.id = '178006/8x13jx';}
        if (mergeTemp === 'jdh-medical') {mergeURL.id = '178007/fge48u';}
        if (mergeTemp === 'jdh-schools') {mergeURL.id = '178008/r26mm9';}
        if (mergeTemp === 'jdh-1x') {mergeURL.id = '178009/5ksv9d';}



        let contactArr = mergeData['Main contact'].split(" ");
        mergeURL.MrMs = mergeData['Salutation'];
        mergeURL.Cont_First_Name = contactArr[0];
        mergeURL.Cont_Last_Name = contactArr[1];
        mergeURL.Contact_Title = mergeData['Title'];
        mergeURL.Company = mergeData['Company Name'];
        mergeURL.Address_Line_1 = mergeData['Address 1'];
        mergeURL.Address_Line_2 = mergeData['Address 2'];
        mergeURL.City = mergeData['City'];
        mergeURL.Zip_Code = mergeData['Zip'];
        mergeURL.Amount = mergeData['Monthly Amount'];
        mergeURL.Days_Serviced = mergeData['Times per Week'] + 'Week';
        mergeURL.Proposal_Date = mergeData['Proposal Date'];

        Object.keys(mergeURL).forEach((key) => (mergeURL[key] == undefined) && delete mergeURL[key]);

        finalURL = mergeURL.base + mergeURL.id + '?_use_get=1&';
        if (mergeURL.MrMs) {finalURL += 'MrMs=' + mergeURL.MrMs;  finalURL += '&';} else {finalURL += 'MrMs=+';  finalURL += '&';}
        if (mergeURL.Cont_First_Name) {finalURL += 'Cont_First_Name=' + mergeURL.Cont_First_Name;  finalURL += '&';}  else {finalURL += 'Cont_First_Name=+';  finalURL += '&';}
        if (mergeURL.Cont_Last_Name) {finalURL += 'Cont_Last_Name=' + mergeURL.Cont_Last_Name;  finalURL += '&';} else {finalURL += 'Cont_Last_Name=+';  finalURL += '&';}
        if (mergeURL.Contact_Title) {finalURL += 'Contact_Title=' + mergeURL.Contact_Title;  finalURL += '&';}  else {finalURL += 'Contact_Title=+';  finalURL += '&';}
        if (mergeURL.Company) {finalURL += 'Company=' + mergeURL.Company;  finalURL += '&';}  else {finalURL += 'Company=+';  finalURL += '&';}
        if (mergeURL.Address_Line_1) {finalURL += 'Address_Line_1=' + mergeURL.Address_Line_1;  finalURL += '&';}  else {finalURL += 'Address_Line_1=+';  finalURL += '&';}
        if (mergeURL.Address_Line_2) {finalURL += 'Address_Line_2=' + mergeURL.Address_Line_2;  finalURL += '&';}  else {finalURL += 'Address_Line_2=+';  finalURL += '&';}
        if (mergeURL.City) {finalURL += 'City=' + mergeURL.City;  finalURL += '&';} else {finalURL += 'City=+';  finalURL += '&';}
        if (mergeURL.Zip_Code) {finalURL += 'Zip_Code=' + mergeURL.Zip_Code;  finalURL += '&';}  else {finalURL += 'Zip_Code=+';  finalURL += '&';}
        if (mergeURL.Days_Serviced) {finalURL += 'Days_Serviced=' + mergeURL.Days_Serviced;  finalURL += '&';} else {finalURL += 'Days_Serviced=+';  finalURL += '&';}
        if (mergeURL.Amount) {finalURL += 'Amount=' + mergeURL.Amount;  finalURL += '&';} else {finalURL += 'Amount=+';  finalURL += '&';}
        if (mergeURL.Proposal_Date) {finalURL += 'Proposal_Date=' + mergeURL.Proposal_Date;} else {finalURL += 'Proposal_Date=+';}
      } else {
        mergeURL = {base: 'https://www.webmerge.me/merge/', id: '', 'Cont_First_Name': '', 'Cont_Last_Name': '', 'Contact_Title': '', 'Company': '', 'Address_Line_1': '', 'Address_Line_2': '', 'City': '', 'Zip_Code': '', 'Appt_Date': '', 'Appt_Time': '', 'Telemarketer': '', 'Account_Rep': '', 'cnty': '', 'Office_Phone': '', 'Office_Phone_Ext': ''}
        if (this.props.citySet === 'tampa') { // IF IS IN TAMPA
          if (mergeTemp === 'appt-sheet') {mergeURL.id = '180769/f6rn5k';}
        } else {
          if (mergeTemp === 'appt-sheet') {mergeURL.id = '180768/43hjrw';}
        }

        let contactArr = mergeData['Main contact'].split(" ");
        mergeURL.Cont_First_Name = contactArr[0];
        mergeURL.Cont_Last_Name = contactArr[1];
        mergeURL.Contact_Title = mergeData['Title'];
        mergeURL.Company = mergeData['Company Name'];
        mergeURL.Address_Line_1 = mergeData['Address 1'];
        mergeURL.Address_Line_2 = mergeData['Address 2'];
        mergeURL.City = mergeData['City'];
        mergeURL.Zip_Code = mergeData['Zip'];

        let formattedAppt = new Date(mergeData['Appt. Date']);
        var formattedAppt = new Date(formattedAppt.getTime() + Math.abs(formattedAppt.getTimezoneOffset()*60000));
        formattedAppt = (formattedAppt.getMonth()+1) + '/' + formattedAppt.getDate() + '/' + formattedAppt.getFullYear();
        mergeURL.Appt_Date = formattedAppt;
        mergeURL.Appt_Time = mergeData['Appt. Time'];
        mergeURL.Telemarketer = mergeData['Appt. Set By'];
        mergeURL.Account_Rep = mergeData['Sales Rep'];
        mergeURL.cnty = mergeData['County'];
        mergeURL.Office_Phone = mergeData['Office Phone'];
        mergeURL.Office_Phone_Ext = mergeData['Extension'];




        Object.keys(mergeURL).forEach((key) => (mergeURL[key] == undefined) && delete mergeURL[key]);

        finalURL = mergeURL.base + mergeURL.id + '?_use_get=1&';
        if (mergeURL.Cont_First_Name) {finalURL += 'Cont_First_Name=' + mergeURL.Cont_First_Name;  finalURL += '&';}  else {finalURL += 'Cont_First_Name=+';  finalURL += '&';}
        if (mergeURL.Cont_Last_Name) {finalURL += 'Cont_Last_Name=' + mergeURL.Cont_Last_Name;  finalURL += '&';} else {finalURL += 'Cont_Last_Name=+';  finalURL += '&';}
        if (mergeURL.Contact_Title) {finalURL += 'Contact_Title=' + mergeURL.Contact_Title;  finalURL += '&';}  else {finalURL += 'Contact_Title=+';  finalURL += '&';}
        if (mergeURL.Company) {finalURL += 'Company=' + mergeURL.Company;  finalURL += '&';}  else {finalURL += 'Company=+';  finalURL += '&';}
        if (mergeURL.Address_Line_1) {finalURL += 'Address_Line_1=' + mergeURL.Address_Line_1;  finalURL += '&';}  else {finalURL += 'Address_Line_1=+';  finalURL += '&';}
        if (mergeURL.Address_Line_2) {finalURL += 'Address_Line_2=' + mergeURL.Address_Line_2;  finalURL += '&';}  else {finalURL += 'Address_Line_2=+';  finalURL += '&';}
        if (mergeURL.City) {finalURL += 'City=' + mergeURL.City;  finalURL += '&';} else {finalURL += 'City=+';  finalURL += '&';}
        if (mergeURL.Zip_Code) {finalURL += 'Zip_Code=' + mergeURL.Zip_Code;  finalURL += '&';}  else {finalURL += 'Zip_Code=+';  finalURL += '&';}

        if (mergeURL.Appt_Date) {finalURL += 'Appt_Date=' + mergeURL.Appt_Date;  finalURL += '&';}  else {finalURL += 'Appt_Date=+';  finalURL += '&';}
        if (mergeURL.Appt_Time) {finalURL += 'Appt_Time=' + mergeURL.Appt_Time;  finalURL += '&';}  else {finalURL += 'Appt_Time=+';  finalURL += '&';}
        if (mergeURL.Telemarketer) {finalURL += 'Telemarketer=' + mergeURL.Telemarketer;  finalURL += '&';}  else {finalURL += 'Telemarketer=+';  finalURL += '&';}
        if (mergeURL.Account_Rep) {finalURL += 'Account_Rep=' + mergeURL.Account_Rep;  finalURL += '&';}  else {finalURL += 'Account_Rep=+';  finalURL += '&';}
        if (mergeURL.cnty) {finalURL += 'cnty=' + mergeURL.cnty;  finalURL += '&';}  else {finalURL += 'cnty=+';  finalURL += '&';}
        if (mergeURL.Office_Phone) {finalURL += 'Office_Phone=' + mergeURL.Office_Phone;  finalURL += '&';}  else {finalURL += 'Office_Phone=+';  finalURL += '&';}
        if (mergeURL.Office_Phone_Ext) {finalURL += 'Office_Phone_Ext=' + mergeURL.Office_Phone_Ext;  finalURL += '&';}  else {finalURL += 'Office_Phone_Ext=+';  finalURL += '&';}
      }

      console.log(encodeURI(finalURL));
      console.log('exportRecord()');

      return axios
        .post(finalURL)
        .then(response => {
          let finalDate;
          if (mergeData['Proposal Date']) {finalDate = mergeData['Proposal Date']}
          else {finalDate = 'DATE'}
          let alertStr;
          if (mergeType === 'Proposal') {
            alertStr = "The $" + mergeData['Monthly Amount'] + ' ' + mergeType + ' has been exported as ' + mergeData['Company Name'] + ' ' + finalDate + '.docx -- Visit "Dropbox/' + this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + '/' + mergeType + '" to view the file.';
          } else {
            alertStr = mergeType + ' has been exported as ' + mergeData['Company Name'] + ' ' + finalDate + '.docx -- Visit "Dropbox/' + this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + '/' + mergeType + '" to view the file.';
          }
          let today  = new Date(); let dayTime;
          if (today.getHours() > 12) {if (today.getMinutes() < 10) {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";} else {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";}} else {if (today.getMinutes() < 10) {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " PM";} else {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " PM";}}
          let finalEntry;
          if (this.state.userName !== '') {finalEntry = dayTime + ' - ' + this.state.userName;} else {finalEntry = dayTime + ' - ';}
          currentRecordState = this.state.currentRecord;
          let newNote = finalEntry + '\n' + alertStr;

          if (currentRecordState['Notes']) {
            currentRecordState['Notes'] = newNote + '\n\n' + currentRecordState['Notes'];
          } else {
            currentRecordState['Notes'] = newNote;
          }

          if (mergeType === 'Proposal') {
            currentRecordState['Proposal Date'] = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
            currentRecordState['Last Contact'] = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
            currentRecordState['Follow Ups'] = 0;
            currentRecordState['Status'] = 'APPC';
            setTimeout((function() {
              document.getElementById('statusSelect').value = 'APPC';
            }).bind(this), 50);
          }
          this.setState({
            currentRecord: currentRecordState,
            recordChanges: true,
            isExporting: true,
          });

          setTimeout((function() {
            this.saveRecordHandler();
          }).bind(this), 250);
        })
    }
  }



  exportRecord = e => {
    e.preventDefault();
    mergeTemp = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-merge');
    mergeType = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-type');

    let showModal = function() {
      this.setState({
        activeModal: true,
        modalType: 'forecast',
      });
    }.bind(this)


    if (this.state.currentRecord['Proposal Date']) { //theres a date. Check it!
      let previousDate = new Date(this.state.currentRecord['Proposal Date']); //adding six months because we don't want to show this too often
      let currentDate = new Date();
      console.log(currentDate + ">" + previousDate);
      if (currentDate >= previousDate) {
        this.setState({
          activeModal: false,
          modalType: '',
        });
        this.createDocument();
      } else {
        showModal();
      }
    } else {
      showModal();
    }


  }

  forecastSave = e => {
    e.preventDefault();
    console.log('forecast!');

    let currentRecordState = this.state.currentRecord;

    currentRecordState['Forecast Rating'] = document.getElementById('foreRating').value;
    currentRecordState['Forecast Speed'] = document.getElementById('foreSpeed').value;

    this.setState({
      activeModal: false,
      modalType: '',
      currentRecord: currentRecordState,
    });
    this.createDocument();
  }












  googleCalLink = () => {
    let timeInput;
    if (this.state.currentTable === 'Sales') {
      timeInput = this.state.currentRecord['Appt. Time'];
    } else {
      timeInput = '10:00 AM';
    }
    let apptDate = this.state.currentRecord['Appt. Date'];
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
      console.log(finalTime.hours);
      finalTime.minutes = parseInt(timeOnly.split(':')[1]);
    } if (timeOnly.length === 4 && !timeOnly.includes(':')) {
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

    let startApptDate = new Date(this.state.currentRecord['Appt. Date']);
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

    if (this.state.currentRecord['Sales Rep'] === 'Tyler Perkins') {
      salesInitials = 'TMP';
    } else if (this.state.currentRecord['Sales Rep'] === 'Nolan Perkins') {
      salesInitials = 'NWP'
    } else if (this.state.currentRecord['Sales Rep'] === 'Joel Horwitz') {
      salesInitials = 'JDH'
    } else if (this.state.currentRecord['Sales Rep'] === 'Rafael Milanes') {
      salesInitials = 'RAM'
    } else {
      salesInitials = this.state.currentRecord['Sales Rep'].replace(/ /g, '+');
    }

    let finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.state.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and')+'&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=<br/><br/>+View+record+<a+href="' + window.location.href + '">' + window.location.href + '</a>';
    finalCalURL += '&location=' + this.state.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + ',+';
    if(this.state.currentRecord['Address 1']) {
      finalCalURL += this.state.currentRecord['Address 1'].replace(/ /g, '+').replace(/&/g, 'and');
    } if (this.state.currentRecord['Address 2']) {
      finalCalURL += '+'+this.state.currentRecord['Address 2'].replace(/ /g, '+').replace(/&/g, 'and');
    } if (this.state.currentRecord['City']) {
      finalCalURL += ',+' + this.state.currentRecord['City'].replace(/ /g, '+').replace(/&/g, 'and') + ',+FL+';
    } if (this.state.currentRecord['Zip']) {
      finalCalURL += this.state.currentRecord['Zip'].replace(/ /g, '+').replace(/&/g, 'and');
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

    setTimeout((function() {
      this.saveRecordHandler();
    }).bind(this), 2000);

    delete axios.defaults.headers.common["Authorization"];
    let slackMessage = ":bellhop_bell: :bellhop_bell:";
    let slackRep;
    if (this.state.currentRecord['Sales Rep'] && this.state.currentRecord['Sales Rep'] !== '') {
      slackRep = this.state.currentRecord['Sales Rep'].split(' ')[0];
      console.log('Sales Rep is ' + slackRep);
    } else {
      slackRep = 'none';
      console.log('no sales rep set');
    }

    let slackSet;
    if (this.state.currentRecord['Appt. Set By'] && this.state.currentRecord['Appt. Set By'] !== '') {
      slackSet = this.state.currentRecord['Appt. Set By'].split(' ')[0];
      console.log('Set By is ' + slackSet);
    } else {
      slackSet = 'none';
      console.log('no set by');
    }
    let secondMessage;
    if (slackSet === 'Linda' || slackSet === 'Eric' || slackSet === 'Carla') {
      if (slackRep !== 'none' && slackSet !== 'none') { //we have both
        secondMessage = "\nLet's all give *" + this.state.currentRecord['Appt. Set By'].split(' ')[0] + '*, a :clap: for getting *' + this.state.currentRecord['Sales Rep'].split(' ')[0] + '* an appt. in *' + this.state.currentRecord['City'] + '*';
      } else if (slackRep !== 'none') { //rep is set
        secondMessage = '\nWe just got an appointment for *' + this.state.currentRecord['Sales Rep'].split(' ')[0] + '* in *' + this.state.currentRecord['City'] + '*!';
      } else if (slackSet !== 'none') { //set by is set
        secondMessage = "\nLet's all give *" + this.state.currentRecord['Appt. Set By'].split(' ')[0] + '*, a :clap: for getting an appt. in *' + this.state.currentRecord['City'] + '*';
      } else if (slackRep === 'none' && slackSet === 'none') {
        secondMessage = '\nWe just got an appointment in *' + this.state.currentRecord['City'] + '*!';
      }
    } else if (slackSet === 'Joel Horwitz' || slackSet === 'Tyler Perkins' || slackSet === 'Nolan Perkins') {
      secondMessage = slackSet + 'just set an appointment in *' + this.state.currentRecord['City'] + '*!';
    } else if (slackSet === 'Constant' || slackSet === 'Google' || slackSet === 'Thumbtack') {
      secondMessage = 'We just got an appointment in *' + this.state.currentRecord['City'] + '* from ' + this.state.currentRecord['Appt. Set By'] + '\n*Keep hustling everyone!*';
    } else if (slackSet === 'Incoming') {
      secondMessage = 'We just got an appointment in *' + this.state.currentRecord['City'] + '* from an Incoming Call.*\n*Keep hustling everyone!*';
    } else if (slackSet === 'Referral') {
      secondMessage = 'We just got an appointment from a referral in *' + this.state.currentRecord['City'] + '*.\n*Great job Customer Service team!*';
    } else {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
      return;
    }

    axios.post('https://hooks.slack.com/services/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', '{"text":"' + slackMessage + '"}')
    .then(response => {
      setTimeout((function() {
        axios.post('https://hooks.slack.com/services/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', '{"text":"' + secondMessage + '"}')
        .then(response => {
            console.log(response);
            setTimeout((function() {
              let secondMess;
              delete axios.defaults.headers.common["Authorization"];

              if (slackRep !== 'none' && slackSet !== 'none') { //we have both
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
                return;
              } else if (slackRep !== 'none') { //rep is set
                secondMess = '>' + "Inside sales, make sure you mark yourself to get credit :speak_no_evil:";
              } else if (slackSet !== 'none') { //set by is set
                secondMess = "> PS, it seems you didn't set a sales rep :grimacing:";
              } else if (slackRep === 'none' && slackSet === 'none') {
                secondMess = '>' + "Inside sales, neither Sales Rep or Set By is set :slightly_frowning_face:";
              }


              axios.post('https://hooks.slack.com/services/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', '{"text":"' + secondMess + '"}')
                .then(response => {
                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();


                });
            }).bind(this), 2500);

        });
      }).bind(this), 2000);
    });
  }









  setAppt = e => {
    console.log('setAppt()');
    let timeInput = this.state.currentRecord['Appt. Time'];
    let apptDate = this.state.currentRecord['Appt. Date'];
    console.log(timeInput +' && '+ apptDate);
    if (timeInput && apptDate) {
      this.setState({
        activeModal: true,
        modalType: 'insideForecast',
      });
    } else {
      alert('Please fill in the Appointment Date and Time before trying again.')
    }
  }

  insideForecastSave = e => {
    e.preventDefault();

    let currentRecordState = this.state.currentRecord;

    currentRecordState['Inside Forecast Rating'] = document.getElementById('foreRatingInside').value;
    currentRecordState['Inside Forecast Speed'] = document.getElementById('foreSpeedInside').value;
    currentRecordState['Status'] = 'Appointment Set';

    console.log(this.state.currentRecord);

    this.setState({
      activeModal: false,
      modalType: '',
      currentRecord: currentRecordState,
    });
    this.googleCalLink();
  }

  skipForecast = e => {
    this.googleCalLink();
  }















  submitExport = e => {
    e.preventDefault();
    let startRange;
    let endRange;
    let exportType;
    let exportFields;
    let exportFilter;
    let urlExtends;

    setTimeout((function() {
      let formattedCity = this.props.citySet.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });


      let regionCleared = 0;

      startRange = document.getElementById('startRange').getElementsByClassName('month')[0].value + '/' + document.getElementById('startRange').getElementsByClassName('day')[0].value + '/' + document.getElementById('startRange').getElementsByClassName('year')[0].value;
      endRange = document.getElementById('endRange').getElementsByClassName('month')[0].value + '/' + document.getElementById('endRange').getElementsByClassName('day')[0].value + '/' + document.getElementById('endRange').getElementsByClassName('year')[0].value;

      let fieldChecked = document.querySelectorAll('input[name=fieldCheck]:checked');
      let exportFields = '';
      for (var i in fieldChecked) {
        let currCheck = fieldChecked[i].value;

        if (currCheck !== undefined) {
          console.log(currCheck);
          exportFields += '&fields%5B%5D=';
          exportFields += currCheck;
        }
      }
      console.log(exportFields);

      let regionChecked = document.querySelectorAll('input[name=regionCheck]:checked');
      let exportRegions = [];
      for (var i in regionChecked) {
        let currCheck = regionChecked[i].value;

        if (currCheck !== undefined) {
          console.log(currCheck);
          exportRegions.push(currCheck);
        }
      }
      console.log(exportRegions);
      exportFilter = {'filter1': document.getElementById('rangeBy').value};

      if (exportFilter.filter1 === 'Select Filter') {
        alert('Please Select a Filter!');
        return;
      }
      if (regionChecked.length === 0) {
        alert('Please Select a Region!');
        return;
      }
      console.log(exportFilter);





      this.setState({
        loading: true,
      });

      let downloadThis = function() {
        console.log('downloadThis()');
        if (regionCleared === exportRegions.length) {
          let today  = new Date();
          let currentMonth = today.getMonth()
          let currentDay = today.getDate()
          let currentYear = today.getFullYear()

          let exportFileName = '';
          if (exportRegions.includes('tampa')) {
            exportFileName += 'Tampa';

            if (exportRegions.includes('orlando')) {
              exportFileName += ' and Orlando';
            }
          } else if (exportRegions.includes('orlando')) {
            exportFileName += 'Orlando';
          }
          exportFileName += ' - ' + exportFilter.filter1.replace('+', ' ').replace('.', '') + ' - ';
          exportFileName += (currentMonth + 1) + '_' + currentDay + '_' + currentYear;


          setTimeout((function() {
            let tampaItems;
            if (exportRegions.includes('tampa')) {
              if (this.state.salesDataTampa.length === this.state.customersDataTampa.length) {
                tampaItems = this.state.customersDataTampa;
              } else {
                tampaItems = this.state.customersDataTampa.concat(this.state.salesDataTampa);
              }
            }

            let orlandoItems;
            if (exportRegions.includes('orlando')) {
              if (this.state.salesDataOrlando.length === this.state.customersDataOrlando.length) {
                orlandoItems = this.state.customersDataOrlando;
              } else {
                orlandoItems = this.state.customersDataOrlando.concat(this.state.salesDataOrlando);
              }
            }

            let allItems;
            if (exportRegions.includes('orlando') && exportRegions.includes('tampa')) {
              allItems = tampaItems.concat(orlandoItems);
            } else {
              if (exportRegions.includes('tampa')) {
                allItems = tampaItems;
              }
              if (exportRegions.includes('orlando')) {
                allItems = orlandoItems;
              }
            }

            setTimeout((function() {
              let newItems = allItems.map(obj =>{
                let newItems = obj.fields;
                return newItems;
              });

              let finalItems = [];
              for (var i in newItems) {
                if (finalItems.filter(obj => obj['Company Name'] === newItems[i]['Company Name']).length === 0) {
                  finalItems.push(newItems[i]);
                }
              }

              // let uniq = [ ...new Set(newItems) ];


              const replacer = (key, value) => value === null ? '' : value
              const header = Object.keys(finalItems[0])
              let csv = finalItems.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
              csv.unshift(header.join(','))
              csv = csv.join('\r\n')


              var fakeDownloadA = document.createElement('a');
              fakeDownloadA.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
              fakeDownloadA.setAttribute('download', exportFileName + '.csv');

              fakeDownloadA.style.display = 'none';
              document.body.appendChild(fakeDownloadA);

              fakeDownloadA.click();

              document.body.removeChild(fakeDownloadA);

              setTimeout((function() {
                this.loadData();
                this.setState({
                  loading: false,
                  activeModal: false,
                  modalType: '',
                  customersOffsetTampa: '',
                  customersDataTampa: [],
                  salesOffsetTampa: '',
                  salesDataTampa: [],

                  customersOffsetOrlando: '',
                  customersDataOrlando: [],
                  salesOffsetOrlando: '',
                  salesDataOrlando: [],
                });
              }).bind(this), 100);
            }).bind(this), 200);
          }).bind(this), 200);
        }
      }.bind(this);





      if (exportRegions.includes('tampa')) {
        this.setState({
          customersOffsetTampa: '',
          customersDataTampa: [],
          salesOffsetTampa: '',
          salesDataTampa: [],
        });
        let tampaSalesID = 'appEX8GXgcD2ln4dB';
        let tampaCustomersID = 'apps7GoAgK23yrOoY';
        let tampaDownloadNow = 0;
        let tampaClearedCount = 0;


        let matchingTampaSales = setInterval(function() {
          console.log('load sales');
          let preData = this.state.salesDataTampa;
          finalURL = this.state.dataURL + tampaSalesID + '/' + this.state.currentTable;
          if (this.state.salesOffsetTampa !== '') {finalURL = finalURL + '?offset=' + this.state.salesOffsetTampa + '&' + 'fields%5B%5D=Company+Name' + exportFields;}
          else {finalURL = finalURL + '?' + 'fields%5B%5D=Company+Name' + exportFields;}

          finalURL = finalURL + '&filterByFormula=AND(OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22))%2C+OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)))';


          console.log(finalURL);
          return axios
            .get(finalURL).then(response => {
              let tampaSalesResponse = response.data.records.map(obj =>{
                let newItems = obj;
                newItems.fields['URL'] = 'http://airmagic.co/tampa/sales/' + obj.id;
                return newItems;
              });
              this.setState({
                salesDataTampa: preData.concat(tampaSalesResponse),
                error: false,
                salesOffsetTampa: response.data.offset,
              });
            if (!response.data.offset) {
              clearInterval(matchingTampaSales);
              tampaClearedCount ++;
              console.log('clearing matchingTampaSales()');
            }
            if (tampaClearedCount === 2) {
              tampaDownloadNow ++;
              if (tampaDownloadNow === 1) {
                console.log('clearAllTampa');
                regionCleared ++;
                downloadThis();
              }
            }
          });
        }.bind(this), 1000);

        setTimeout((function() { //delay the start
          let matchingTampaCustomers = setInterval(function() {
            let allExportData = this.state.customersDataTampa;
            let custURL = this.state.dataURL + tampaCustomersID + '/' + 'Customers';

            if (this.state.customersOffsetTampa !== '') {custURL = custURL + '?offset=' + this.state.customersOffsetTampa + '&' + 'fields%5B%5D=Company+Name' + exportFields;}
            else {custURL = custURL + '?' + 'fields%5B%5D=Company+Name' + exportFields;}

            custURL = custURL + '&filterByFormula=AND(OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22))%2C+OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)))';


            // console.log(allExportData);
            return axios
              .get(custURL).then(response => {
                let tampaCustomersResponse = response.data.records.map(obj =>{
                  let newItems = obj;
                  newItems.fields['URL'] = 'http://airmagic.co/tampa/customer-service/all/' + obj.id;
                  return newItems;
                });
                this.setState({
                  customersDataTampa: allExportData.concat(tampaCustomersResponse),
                  error: false,
                  customersOffsetTampa: response.data.offset,
                });
                if (!response.data.offset) {
                  clearInterval(matchingTampaCustomers);
                  tampaClearedCount ++;
                  console.log('clearing matchingTampaCustomers()');
                }

                if (tampaClearedCount === 2) {
                  tampaDownloadNow ++;
                  if (tampaDownloadNow === 1) {
                    console.log('clearAllTampa');
                    regionCleared ++;
                    downloadThis();
                  }
                }
            });
          }.bind(this), 1000);
        }).bind(this), 500); //delay the start
      }






      if (exportRegions.includes('orlando')) {
        this.setState({
          customersOffsetOrlando: '',
          customersDataOrlando: [],
          salesOffsetOrlando: '',
          salesDataOrlando: [],
        });
        let orlandoSalesID = 'appXNufXR9nQARjgs';
        let orlandoCustomersID = 'appBUKBn552B8SlbE';
        let orlandoDownloadNow = 0;
        let orlandoClearedCount = 0;

        setTimeout((function() { //delay the start
          let matchingOrlandoSales = setInterval(function() {
            console.log('load sales');
            let preData = this.state.salesDataOrlando;
            finalURL = this.state.dataURL + orlandoSalesID + '/' + this.state.currentTable;
            if (this.state.salesOffsetOrlando !== '') {finalURL = finalURL + '?offset=' + this.state.salesOffsetOrlando + '&' + 'fields%5B%5D=Company+Name' + exportFields;}
            else {finalURL = finalURL + '?' + 'fields%5B%5D=Company+Name' + exportFields;}

            finalURL = finalURL + '&filterByFormula=AND(OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22))%2C+OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)))';


            console.log(finalURL);
            return axios
              .get(finalURL).then(response => {
                let orlandoSalesResponse = response.data.records.map(obj =>{
                  let newItems = obj;
                  newItems.fields['URL'] = 'http://airmagic.co/orlando/sales/' + obj.id;
                  return newItems;
                });
                this.setState({
                  salesDataOrlando: preData.concat(orlandoSalesResponse),
                  error: false,
                  salesOffsetOrlando: response.data.offset,
                });
              if (!response.data.offset) {
                clearInterval(matchingOrlandoSales);
                orlandoClearedCount ++;
                console.log('clearing matchingOrlandoSales()');
              }
              if (orlandoClearedCount === 2) {
                orlandoDownloadNow ++;
                if (orlandoDownloadNow === 1) {
                  console.log('clearAllOrlando');
                  regionCleared ++;
                  downloadThis();
                }
              }
            });
          }.bind(this), 1000);

          setTimeout((function() { //delay the start
            let matchingOrlandoCustomers = setInterval(function() {
              let allExportData = this.state.customersDataOrlando;
              let custURL = this.state.dataURL + orlandoCustomersID + '/' + 'Customers';

              if (this.state.customersOffsetOrlando !== '') {custURL = custURL + '?offset=' + this.state.customersOffsetOrlando + '&' + 'fields%5B%5D=Company+Name' + exportFields;}
              else {custURL = custURL + '?' + 'fields%5B%5D=Company+Name' + exportFields;}

              custURL = custURL + '&filterByFormula=AND(OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22))%2C+OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)))';


              // console.log(allExportData);
              return axios
                .get(custURL).then(response => {
                  let orlandoCustomersResponse = response.data.records.map(obj =>{
                    let newItems = obj;
                    newItems.fields['URL'] = 'http://airmagic.co/orlando/customer-service/all/' + obj.id;
                    return newItems;
                  });
                  this.setState({
                    customersDataOrlando: allExportData.concat(orlandoCustomersResponse),
                    error: false,
                    customersOffsetOrlando: response.data.offset,
                  });
                  if (!response.data.offset) {
                    clearInterval(matchingOrlandoCustomers);
                    orlandoClearedCount ++;
                    console.log('clearing matchingOrlandoCustomers()');
                  }

                  if (orlandoClearedCount === 2) {
                    orlandoDownloadNow ++;
                    if (orlandoDownloadNow === 1) {
                      console.log('clearAllOrlando');
                      regionCleared ++;
                      downloadThis();
                    }
                  }
              });
            }.bind(this), 1000);
          }).bind(this), 500); //delay the start
        }).bind(this), 250); //delay the start
      }





    }).bind(this), 50);
  }

  viewSelect = e => {
    console.log(e.target.value);
    if (e.target.value !== 'default') {
      let selectedView = e.target.value;
      sessionStorage.setItem('salesView', selectedView);
      this.setState({
        currentRecordView: sessionStorage.getItem('salesView')
      });
    } else {
      sessionStorage.removeItem('salesView');
      this.setState({
        currentRecordView: 'default'
      });
    }
    // window.location.reload();
  }

  jumpLetters = e => {
    console.log(e.target.value);
    if (e.target.value !== 'none') {
      let jumpFormula = e.target.value;
      sessionStorage.setItem('jumpLetters', jumpFormula);
    } else {
      sessionStorage.removeItem('jumpLetters');
    }
    window.location.reload();
  }


  loadData = () => {
    if (sessionStorage.getItem('listView') != null) {
      this.setState({
        loading: true,
        listView: sessionStorage.getItem('listView')
      });
    } else {
      this.setState({
        loading: true
      });
    }

    //initial load
    setTimeout((function() {
      finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;

      if (this.state.sortByLabel !== '' || this.state.listView !== '' || this.state.dataOffset !== '' || sessionStorage.getItem('jumpLetters')) {
        finalURL = finalURL + '?';

        if (this.state.dataOffset !== '') {
          finalURL = finalURL + 'offset=' + this.state.dataOffset;
          if (this.state.sortByLabel !== '' || this.state.listView !== '') {
            finalURL = finalURL + '&';
          }
        }
        if (this.state.listView !== '') {
          finalURL = finalURL + this.state.listView;
          if (this.state.sortByLabel !== '' || sessionStorage.getItem('jumpLetters')) {
            finalURL = finalURL + '&';
          }
        }

        if (sessionStorage.getItem('jumpLetters')) {
          finalURL = finalURL + "filterByFormula=FIND('" + sessionStorage.getItem('jumpLetters') +  "'%2C+LEFT(LOWER(%7BCompany+Name%7D)%2C1))" + '&sort%5B0%5D%5Bfield%5D=Company+Name&sort%5B0%5D%5Bdirection%5D=asc';
        } else {
          if (this.state.sortByLabel !== '') {
            finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder + "&filterByFormula=NOT(%7BCompany+Name%7D+%3D+'')";
          }
        }
      }
      console.log('loadData()');
      return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          data: response.data.records,
          //put it here
          loading: false,
          error: false,
          loadingMore: true,
          dataOffset: response.data.offset,
        });
        if (this.state.listView !== '') {
          document.getElementById('filterBtn').className='ControlsBar--btn isActive';
          document.getElementById('filterBtn').getElementsByTagName('p')[0].innerHTML=this.state.listView.replace('view=', '').replace('+', ' ');
        }
        if (this.state.sortByLabel !== 'Company+Name') {
          document.getElementById('sortBtn').className='ControlsBar--btn isActive';
          document.getElementById('sortBtn').getElementsByTagName('p')[0].innerHTML='Sorted';
        }
        setTimeout((function() {
          if (sessionStorage.getItem('jumpLetters')) {
            document.getElementById('jumpLetters').value = sessionStorage.getItem('jumpLetters');
          }
          this.setState({
            loadingMore: false,
          });

          if (this.state.recordView) {
            document.title = this.state.currentRecord['Company Name'] + " | AirMagic"
          } else {
            document.title = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Sales | AirMagic";
          }

          //keep going if we were on 100+ internally
          if (sessionStorage.getItem('innerOffset') != null) {
            this.setState({
              loading: true,
            });
            let savedOffset = sessionStorage.getItem('innerOffset').split('/')[1];
            console.log(savedOffset);

            let exitChangerLoadMore = setInterval(function() {
              if (this.state.dataOffset.includes(savedOffset)) {
                clearInterval(exitChangerLoadMore);
                console.log('cleared!');
                setTimeout((function() {
                  if (this.state.recordView === false) {
                    if (document.getElementById(sessionStorage.getItem('innerClosedID'))) {
                      window.scrollTo(0, (parseInt(document.getElementById(sessionStorage.getItem('innerClosedID')).style.top) - 150));
                      document.getElementById(sessionStorage.getItem('innerClosedID')).classList.add('recentlyClosed');
                      console.log(document.getElementById(sessionStorage.getItem('innerClosedID')));
                    }
                  }
                  if (this.state.recordView) {
                    this.setState({
                      currentRecordIndex: this.state.data.findIndex(obj => obj.id == this.props.recordId),
                    });
                  }
                  sessionStorage.removeItem('innerOffset'); //reset it!
                  sessionStorage.removeItem('innerClosedID'); //reset it!

                  setTimeout((function() {
                    // document.getElementsByClassName('recentlyClosed')[0].classNames = 'ArchiveItem isActive tele crew'
                    // console.log();
                  }).bind(this), 1000);
                }).bind(this), 500);
              } else {
                console.log('loadmore!');
                let preData = this.state.data;
                this.setState({
                  loadingMore: true,
                });
                finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;
                if (this.state.sortByLabel !== '' || this.state.listView !== '' || this.state.dataOffset !== '') {
                  finalURL = finalURL + '?';

                  if (this.state.dataOffset !== '') {
                    finalURL = finalURL + 'offset=' + this.state.dataOffset;
                    if (this.state.sortByLabel !== '' || this.state.listView !== '') {
                      finalURL = finalURL + '&';
                    }
                  }
                  if (this.state.listView !== '') {
                    finalURL = finalURL + this.state.listView;
                    if (this.state.sortByLabel !== '') {
                      finalURL = finalURL + '&';
                    }
                  }
                  if (this.state.sortByLabel !== '') {
                    finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder + "&filterByFormula=NOT(%7BCompany+Name%7D+%3D+'')";
                  }
                }
                console.log('loadData() - More');
                return axios
                  .get(finalURL)
                  .then(response => {
                    // console.log(response.data.records);

                    this.setState({
                      data: preData.concat(response.data.records),
                      //put it here
                      totalLoads: this.state.totalLoads + 1,
                      loading: false,
                      error: false,
                      dataOffset: response.data.offset,
                    });
                    setTimeout((function() {
                      this.setState({
                        loadingMore: false,
                      });
                    }).bind(this), 500);
                  })
              }
            }.bind(this), 500);
          }
        }).bind(this), 100);
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          error: `${error}`,
          loading: false,
        });
      });
    }).bind(this), 10);
  };


  clearSearch = () => {
    this.setState({
      searchQuery: '',
      searchBy: '',
      loading: true,
      dataOffset: '',
    });
    sessionStorage.removeItem('searchQuery');
    sessionStorage.removeItem('searchBy');
    this.loadData();
  }

  controlsModalToggle = e => {
    if (this.state.activeModal) {
      this.setState({
        activeModal: false,
        modalType: '',
      });
    } else {
      if (e.target.id === 'addNotes') {
        this.setState({
          activeModal: true,
          modalType: 'addNotes',
        });
        setTimeout((function() {
          document.getElementById('newNoteBox').focus();
        }).bind(this), 50);
      } else if(e.target.id === 'salesMetrics') {
        this.setState({
          activeModal: true,
          modalType: 'salesMetrics',
        });
      } else if(e.target.id === 'salesFollows') {
        this.setState({
          activeModal: true,
          modalType: 'salesFollows',
        });
      } else if(e.target.id === 'salesCloses') {
        this.setState({
          activeModal: true,
          modalType: 'salesCloses',
        });
      } else if(e.target.id === 'exportList') {
        this.setState({
          activeModal: true,
          modalType: 'exportList',
        });
      } else if(e.target.id === 'recordExport') {
        this.setState({
          activeModal: true,
          modalType: 'recordExport',
        });
      } else if(e.target.id === 'moveDatabase') {
        this.setState({
          activeModal: true,
          modalType: 'moveDatabase',
        });
      } else if (e.target.closest(".ControlsBar--btn").id === 'filterBtn') {
        this.setState({
          activeModal: true,
          modalType: 'filterSearch',
        });
        setTimeout((function() {
          if (this.state.listView !== '') {
            let currentView = this.state.listView.replace('view=', '');
            document.getElementById('filtersList').getElementsByClassName('isActive')[0].className="isInactive";
            document.getElementById(currentView).className="isActive";
          }
        }).bind(this), 50);
      } else {
        this.setState({
          activeModal: true,
          modalType: 'sortBy',
        });
        setTimeout((function() {
          if (this.state.sortByLabel !== '') {
            document.getElementById('sortLabel').value=document.getElementById(this.state.sortByLabel).innerHTML;
          }
        }).bind(this), 50);
      }
    }
  }

  sortSubmitHandler = () => {
    let sortTableLabel = document.getElementById('sortLabel')
    let sortTableOrder = document.getElementById('sortOrder')

    let sortByLabel = sortTableLabel.options[sortTableLabel.selectedIndex].id;
    let sortByOrder = sortTableOrder.options[sortTableOrder.selectedIndex].id;

    console.log(sortByLabel + ' / ' + sortByOrder);

    this.setState({
      dataOffset: '',
      sortByLabel: sortByLabel,
      sortByOrder: sortByOrder,
      activeModal: false,
      modalType: '',
    });
    setTimeout((function() {
      this.loadData();
    }).bind(this), 100);
  }




  mobileTabHandler = e => {
    // currentTab
    let clickedID = e;

    this.setState({
      currentTab: e
    });
  }

  switchHandHandler = () => {
    if (this.state.mobileHand !== 'left') {
      this.setState({
        mobileHand: 'left'
      });
    } else {
      this.setState({
        mobileHand: 'right'
      });
    }
  }



  selectFilterHandler = e => {
    let filterId = document.getElementById('filtersList').getElementsByClassName('isActive')[0].id;

    this.setState({
      activeModal: false,
      modalType: '',
      dataOffset: '',
    });
    if (filterId === "none") {
      this.setState({listView: ''});
      setTimeout((function() {
        sessionStorage.removeItem('listView');
      }).bind(this), 50);
    } else {
      this.setState({listView: 'view=' + filterId});
      setTimeout((function() {
        sessionStorage.setItem('listView', this.state.listView);
      }).bind(this), 50);
    }
    setTimeout((function() {
      console.log(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '?offset=' + this.state.dataOffset + this.state.listView);
      this.loadData();
    }).bind(this), 250);

  }

  loadMoreRecords = () => {
    let preData = this.state.data;
    this.setState({
      loadingMore: true,
    });
    finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;
    if (this.state.sortByLabel !== '' || this.state.listView !== '' || this.state.dataOffset !== '' || sessionStorage.getItem('jumpLetters')) {
      finalURL = finalURL + '?';

      if (this.state.dataOffset !== '') {
        finalURL = finalURL + 'offset=' + this.state.dataOffset;
        if (this.state.sortByLabel !== '' || this.state.listView !== '') {
          finalURL = finalURL + '&';
        }
      }
      if (this.state.listView !== '') {
        finalURL = finalURL + this.state.listView;
        if (this.state.sortByLabel !== '' || sessionStorage.getItem('jumpLetters')) {
          finalURL = finalURL + '&';
        }
      }

      if (sessionStorage.getItem('jumpLetters')) {
        finalURL = finalURL + "filterByFormula=FIND('" + sessionStorage.getItem('jumpLetters') +  "'%2C+LEFT(LOWER(%7BCompany+Name%7D)%2C1))" + '&sort%5B0%5D%5Bfield%5D=Company+Name&sort%5B0%5D%5Bdirection%5D=asc';
      } else {
        if (this.state.sortByLabel !== '') {
          finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder + "&filterByFormula=NOT(%7BCompany+Name%7D+%3D+'')";
        }
      }
    }
    console.log('loadMoreRecords()');
    return axios
      .get(finalURL)
      .then(response => {
        // console.log(response.data.records);

        this.setState({
          data: preData.concat(response.data.records),
          //put it here
          totalLoads: this.state.totalLoads + 1,
          loading: false,
          error: false,
          dataOffset: response.data.offset,
        });
        setTimeout((function() {
          this.setState({
            loadingMore: false,
          });
        }).bind(this), 500);
      })
  }

  componentDidMount() {
    // if (localStorage.getItem('userInitials') === 'TMP') {
    //   sessionStorage.setItem('listView', 'view=Tyler+Recents');
    // } else if (localStorage.getItem('userInitials') === 'NWP') {
    //   sessionStorage.setItem('listView', 'view=Nolan+Recents');
    // } else if (localStorage.getItem('userInitials') === 'JDH') {
    //   sessionStorage.setItem('listView', 'view=Joel+Recents');
    // } else if (localStorage.getItem('userInitials') === 'RWJ') {
    //   sessionStorage.setItem('listView', 'view=Robet+Recents');
    // }
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    } else {
      if (localStorage.getItem('isOutside')  === 'true') {
        if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
          if (this.props.citySet !== localStorage.getItem('userOffice')) {
            this.props.history.push('/outside/' + localStorage.getItem('userOffice') + '/');
          }
        } else {
          this.props.history.push('/outside/' + this.props.citySet);
        }
      }
      if (sessionStorage.getItem('searchQuery')) {
        this.setState({
          searchQuery: sessionStorage.getItem('searchQuery'),
          searchBy: sessionStorage.getItem('searchBy'),
          loading: true,
        });
        this.loadPrevSearch();
      } else {
        this.loadData();
      }
      if (localStorage.getItem('userInitials')) {
        let usersInitials = localStorage.getItem('userInitials');
        this.setState({
          userName: usersInitials,
        });
      }

      if (sessionStorage.getItem('salesView')) {
        this.setState({
          currentRecordView: sessionStorage.getItem('salesView')
        });
      } else {
        this.setState({
          currentRecordView: 'default'
        });
      }
    }
  }


  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
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



    let viewHeight;
    window.onscroll = function () {
      let scrollTop = window.scrollY;

      if (document.getElementsByClassName('ArchiveItems')[0]) {
        if (!this.state.loadingMore && (document.getElementsByClassName('ArchiveItems')[0].offsetHeight - (scrollTop + window.innerHeight)) < 200) {
          this.loadMoreRecords();
        }
      }

    }.bind(this)



    document.addEventListener('keydown', (event) => {
      let keyName = event.key;
      if (keyName === 'Escape' && this.state.recordView) {
        this.closeRecordHandler();
      } else if (keyName === 'Escape' && this.state.activeModal) {
        console.log('exit!');
        this.controlsModalToggle();
      }
    });


    return (
      <div className="Sales">
        {this.modalShow}
        <Navbar
          currentRecord={this.state.currentRecord}
          recordView={this.state.recordView}
          closeRecordHandler={this.closeRecordHandler}
          currentId= {this.state.currentId}
          recordChanges= {this.state.recordChanges}
          switchTableHandler= {this.switchTableHandler}
          controlsModalToggle={this.controlsModalToggle}
          jumpLetters={this.jumpLetters}
          citySet={this.props.citySet}
          currentRecordView={this.state.currentRecordView}
          viewSelect={this.viewSelect}
          switchHandHandler={this.switchHandHandler}
          mobileHand={this.state.mobileHand}
          currentTab={this.state.currentTab}
        />

        {this.currentView}

        <ControlsBar
          searchHandler={this.searchHandler}
          recordView={this.state.recordView}
          newRecord={this.state.newRecord}
          saveRecordHandler={this.saveRecordHandler}
          recordChanger={this.recordChanger}
          controlsModalToggle={this.controlsModalToggle}
          newRecordHandler={this.newRecordHandler}
          currentRecord={this.state.currentRecord}
          currentTable={this.state.currentTable}
          setAppt={this.setAppt}
          skipForecast={this.skipForecast}
          mobileTabHandler={this.mobileTabHandler}
          mobileHand={this.state.mobileHand}
          currentTab={this.state.currentTab}
          recordChanges= {this.state.recordChanges}
        />
      </div>
    );
  }
  get modalShow() {
    if (this.state.activeModal) {
      return (
        <ModalView
          activeModal={this.state.activeModal}
          modalType={this.state.modalType}
          revertRecordHandler={this.revertRecordHandler}
          saveRecordHandler={this.saveRecordHandler}
          selectFilterHandler={this.selectFilterHandler}
          controlsModalToggle={this.controlsModalToggle}
          sortSubmitHandler={this.sortSubmitHandler}
          currentId= {this.state.currentId}
          userName={this.state.userName}
          saveNoteHandler = {this.saveNoteHandler}
          userChangeHandler={this.userChangeHandler}
          userSubmitHandler={this.userSubmitHandler}
          submitExport={this.submitExport}
          forecastSave={this.forecastSave}
          exportRecord={this.exportRecord}
          baseId={this.state.baseId}
          moveDatabasesHandler={this.moveDatabasesHandler}
          currentTable={this.state.currentTable}
          citySet={this.props.citySet}
          currentRecord={this.state.currentRecord}
          insideForecastSave={this.insideForecastSave}
        />
      )
    }
  }

  get currentView() {
    if (this.state.recordView) {
      if (this.state.currentRecordView === 'default') {
        return (
          <RecordView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            timesPerWeekChange={this.timesPerWeekChange}
            autoPricing={this.autoPricing}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            newRecord={this.state.newRecord}
            citySet={this.props.citySet}
            setByChange={this.setByChange}
            repChange={this.repChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
          />
        );
      } else if (this.state.currentRecordView === 'appointment') {
        return (
          <AppointmentView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            timesPerWeekChange={this.timesPerWeekChange}
            autoPricing={this.autoPricing}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            citySet={this.props.citySet}
            setByChange={this.setByChange}
            repChange={this.repChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
          />
        );
      } else if (this.state.currentRecordView === 'inside') {
        return (
          <InsideSalesView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            timesPerWeekChange={this.timesPerWeekChange}
            autoPricing={this.autoPricing}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            citySet={this.props.citySet}
            setByChange={this.setByChange}
            repChange={this.repChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
          />
        );
      } else if (this.state.currentRecordView === 'proposal') {
        return (
          <ProposalView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            timesPerWeekChange={this.timesPerWeekChange}
            autoPricing={this.autoPricing}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            citySet={this.props.citySet}
            setByChange={this.setByChange}
            repChange={this.repChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
          />
        );
      }
    } else if (this.state.listIsVisible) {
      return (
        <div className="listArea">
          <ListContent
            data={this.state.data}
            isLoading={this.state.loading}
            openRecordHandler = {this.openRecordHandler}
            searchQuery = {this.state.searchQuery}
            clearSearch = {this.clearSearch}
          />
          <div id="scrollTopBottom"></div>
        </div>
      );
    }
  }
}
