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
    console.log('prev');
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
              document.getElementById('searchInput').value = sessionStorage.getItem('searchQuery');
              document.getElementById('searchBy').value = sessionStorage.getItem('searchBy');
            }
          }).bind(this), 50);
        }
      })
    }).bind(this), 50);
  }



  searchHandler = e => {
    let searchBy;
    let searchByValue;

    if (e == 'url') {
      searchByValue = this.props.location.search.split('&')[1].split('=')[1];
      searchBy = this.props.location.search.split('?')[1].split('&')[0].split('=')[1];

      this.setState({
        searchQuery: searchByValue,
        searchBy: searchBy,
        loading: true,
      });

    } else {
      e.preventDefault();

      searchBy = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id;
      searchByValue = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

      this.setState({
        searchQuery: document.getElementById('searchInput').value,
        searchBy: document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id,
        loading: true,
      });
    }

    setTimeout((function() {
      sessionStorage.setItem('searchQuery', this.state.searchQuery);
      sessionStorage.setItem('searchBy', this.state.searchBy);
    }).bind(this), 10);

    setTimeout((function() {
      let capitalizedQuery = this.state.searchQuery.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      capitalizedQuery = encodeURIComponent(capitalizedQuery);
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
        'Alternate Email': '',
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

        'Service Time': '',
        'Category': '',
        'Service Notes': '',
        'Service Schedule Changes': '',
        'Strip & Wax' : '',
        'Carpet Cleaning': '',
        'Window Cleaning' : '',
        'Tile & Grout': '',
        'Pre-Clean': '',
      }
      if(this.state.currentRecord['Company Name']) {pushRecord['Company Name'] = this.state.currentRecord['Company Name']}
      if(this.state.currentRecord['Main contact']) {pushRecord['Main contact'] = this.state.currentRecord['Main contact']}
      if(this.state.currentRecord['Title']) {pushRecord['Title'] = this.state.currentRecord['Title']}
      if(this.state.currentRecord['Alternate Contact']) {pushRecord['Alternate Contact'] = this.state.currentRecord['Alternate Contact']}
      if(this.state.currentRecord['Office Phone']) {pushRecord['Office Phone'] = this.state.currentRecord['Office Phone']}
      if(this.state.currentRecord['Extension']) {pushRecord['Extension'] = this.state.currentRecord['Extension']}
      if(this.state.currentRecord['Cell Phone']) {pushRecord['Cell Phone'] = this.state.currentRecord['Cell Phone']}
      if(this.state.currentRecord['Email']) {pushRecord['Email'] = this.state.currentRecord['Email']}
      if(this.state.currentRecord['Alternate Email']) {pushRecord['Alternate Email'] = this.state.currentRecord['Alternate Email']}
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

      if(this.state.currentRecord['Service Time']) {pushRecord['Service Time'] = this.state.currentRecord['Service Time']}
      if(this.state.currentRecord['Category']) {pushRecord['Category'] = this.state.currentRecord['Category']}
      if(this.state.currentRecord['Service Notes']) {pushRecord['Service Notes'] = this.state.currentRecord['Service Notes']}
      if(this.state.currentRecord['Service Schedule Changes']) {pushRecord['Service Schedule Changes'] = this.state.currentRecord['Service Schedule Changes']}
      if(this.state.currentRecord['Strip & Wax' ]) {pushRecord['Strip & Wax' ] = this.state.currentRecord['Strip & Wax' ]}
      if(this.state.currentRecord['Carpet Cleaning']) {pushRecord['Carpet Cleaning'] = this.state.currentRecord['Carpet Cleaning']}
      if(this.state.currentRecord['Window Cleaning' ]) {pushRecord['Window Cleaning' ] = this.state.currentRecord['Window Cleaning' ]}
      if(this.state.currentRecord['Tile & Grout']) {pushRecord['Tile & Grout'] = this.state.currentRecord['Tile & Grout']}
      if(this.state.currentRecord['Pre-Clean']) {pushRecord['Pre-Clean'] = this.state.currentRecord['Pre-Clean']}

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
      'Alternate Email': null,
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
    } else if (e.target.id === 'serviceNotes') {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Service Notes'] = e.target.value;

      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
      })
    } else if (e.target.id === 'serviceScheduleNotes') {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Service Schedule Changes'] = e.target.value;

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

    if (e.target.id === 'customCallback') {
      if (e.callBackDate) {
        currentRecordState['Callback Date'] = e.callBackDate
      } else {currentRecordState['Callback Date'] = undefined;}
    }
    else if (e.target.id === 'company') {currentRecordState['Company Name'] = e.target.value}
    else if (e.target.id === 'industry') {currentRecordState['Industry'] = e.target.value}
    else if (e.target.id === 'callCount') {currentRecordState['Times Called'] = e.target.value}
    else if (e.target.id === 'callDate') {currentRecordState['Recent Call Date'] = e.target.value}
    else if (e.target.id === 'callBack') {if (e.target.value) {currentRecordState['Callback Date'] = e.target.value} else {currentRecordState['Callback Date'] = undefined;}}
    else if (e.target.id === 'website') {currentRecordState['Website'] = e.target.value}

    else if (e.target.id === 'apptSet') {currentRecordState['Appt. Set Date'] = e.target.value}
    else if (e.target.id === 'apptDate') {currentRecordState['Appt. Date'] = e.target.value}
    else if (e.target.id === 'apptTime') {currentRecordState['Appt. Time'] = e.target.value}
    else if (e.target.id === 'proposal') {currentRecordState['Proposal Date'] = e.target.value}
    else if (e.target.id === 'proposalType') {currentRecordState['Proposal Type'] = e.target.value}
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
    else if (e.target.id === 'altEmail') {currentRecordState['Alternate Email'] = e.target.value}
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
    else if (e.target.id === 'serviceTime') {currentRecordState['Service Time'] = e.target.value}

    else if (e.target.id === 'followDate') {currentRecordState['Last Contact'] = e.target.value}
    else if (e.target.id === 'followCount') {currentRecordState['Follow Ups'] = parseInt(e.target.value)}
    else if (e.target.id === 'followUsed') {currentRecordState['Follow Ups Used'] = e.target.value}

    else if (e.target.id === 'preClean') {currentRecordState['Pre-Clean'] = e.target.value}
    else if (e.target.id === 'strip') {currentRecordState['Strip & Wax'] = e.target.value}
    else if (e.target.id === 'carpet') {currentRecordState['Carpet Cleaning'] = e.target.value}
    else if (e.target.id === 'tile') {currentRecordState['Tile & Grout'] = e.target.value}
    else if (e.target.id === 'windows') {currentRecordState['Window Cleaning'] = e.target.value}



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
  proposalTypeChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Proposal Type'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }
  repChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Sales Rep'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }
  callerChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Recent Caller'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }
  standingChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Standing'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }
  categoryChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Category'] = e.target.value;
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
        fullDataSet["Call Status"] = document.getElementById('callStatus').value;
        fullDataSet["Appt. Set By"] = document.getElementById('setBySelect').value;
        fullDataSet["Follow Status"] = document.getElementById('followStatus').value;
        fullDataSet["Category"] = document.getElementById('category').value;



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
      if (pushRecord["Category"] === '') {pushRecord["Category"] = undefined;}

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
        pushRecord["Appt. Set By"] = document.getElementById('setBySelect').value;
        pushRecord["Call Status"] = document.getElementById('callStatus').value;
        pushRecord["Follow Status"] = document.getElementById('followStatus').value;
        pushRecord["Category"] = document.getElementById('categorySelect').value;
        pushRecord["Proposal Type"] = document.getElementById('proposalTypeSelect').value;

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
        mergeURL = {base: 'https://www.webmerge.me/merge/', id: '', MrMs: '', Cont_First_Name: '', Cont_Last_Name: '', Contact_Title: '', Company: '', Address_Line_1: '', Address_Line_2: '', City: '', Zip_Code: '', Amount: '', Days_Serviced: '', Proposal_Date: '', Rep_Name: '', Rep_Email: '', Rep_Ext: '', Rep_Cell: '', Rep_Sig: '', Actual_Sq_Footage: '', Restrooms: '', Days_of_Week: '', Service_Time: '', projects: '', strip: '', stripPrice: '', carpet: '', carpetPrice: '', windows: '', windowPrice: '', tile: '', tilePrice: '', preCleanPrice: '', testLogo1: '', testCompany1: '', test1: '', testContact1: '', testLogo2: '', testCompany2: '', test2: '', testContact2: '', testLogo3: '', testCompany3: '', test3: '', testContact3: '',}

        if (mergeTemp === 'tmp-once' || mergeTemp === 'nwp-once' || mergeTemp === 'jdh-once') {
          if (mergeTemp === 'tmp-once') {mergeURL.id = '177991/c4yk4s';}
          if (mergeTemp === 'nwp-once') {mergeURL.id = '177996/xhy3ib';}
          if (mergeTemp === 'jdh-once') {mergeURL.id = '178006/8x13jx';}
        } else {
          if (this.state.exportQuestions.mergeType === 'tampa-standard-1x') { mergeURL.id = '225573/ctvrx5'; }
          if (this.state.exportQuestions.mergeType === 'tampa-standard') {  mergeURL.id = '225574/ls5hqu'; }
          if (this.state.exportQuestions.mergeType === 'tampa-medical-1x') {  mergeURL.id = '225575/dqn28l'; }
          if (this.state.exportQuestions.mergeType === 'tampa-medical') { mergeURL.id = '225576/8cwijp'; }
          if (this.state.exportQuestions.mergeType === 'tampa-residential-1x') {  mergeURL.id = '225577/y3eiyx'; }
          if (this.state.exportQuestions.mergeType === 'tampa-residential') { mergeURL.id = '225578/t3vhpt'; }
          if (this.state.exportQuestions.mergeType === 'tampa-schools-1x') {  mergeURL.id = '225579/xgibvf'; }
          if (this.state.exportQuestions.mergeType === 'tampa-schools') { mergeURL.id = '225580/ya8adw'; }
          if (this.state.exportQuestions.mergeType === 'tampa-church-1x') { mergeURL.id = '225581/jq7p2w'; }
          if (this.state.exportQuestions.mergeType === 'tampa-church') {  mergeURL.id = '225582/br3ib9'; }
          if (this.state.exportQuestions.mergeType === 'tampa-restaurant-1x') { mergeURL.id = '225583/upsg4n'; }
          if (this.state.exportQuestions.mergeType === 'tampa-restaurant') {  mergeURL.id = '225585/5ukx3u'; }


          if (this.state.exportQuestions.mergeType === 'orlando-standard-1x') { mergeURL.id = '225597/qzyuma'; }
          if (this.state.exportQuestions.mergeType === 'orlando-standard') {  mergeURL.id = '225596/6xjaxe'; }
          if (this.state.exportQuestions.mergeType === 'orlando-medical-1x') {  mergeURL.id = '225589/3y7shg'; }
          if (this.state.exportQuestions.mergeType === 'orlando-medical') { mergeURL.id = '225588/cthgcx'; }
          if (this.state.exportQuestions.mergeType === 'orlando-residential-1x') {  mergeURL.id = '225591/jnahd5'; }
          if (this.state.exportQuestions.mergeType === 'orlando-residential') { mergeURL.id = '225590/i7d4fg'; }
          if (this.state.exportQuestions.mergeType === 'orlando-schools-1x') {  mergeURL.id = '225595/sxgpn2'; }
          if (this.state.exportQuestions.mergeType === 'orlando-schools') { mergeURL.id = '225594/fqi728'; }
          if (this.state.exportQuestions.mergeType === 'orlando-church-1x') { mergeURL.id = '225587/gm4pww'; }
          if (this.state.exportQuestions.mergeType === 'orlando-church') {  mergeURL.id = '225586/suik1p'; }
          if (this.state.exportQuestions.mergeType === 'orlando-restaurant-1x') { mergeURL.id = '225593/uq53jt'; }
          if (this.state.exportQuestions.mergeType === 'orlando-restaurant') {  mergeURL.id = '225592/i29e99'; }
        }


        let contactArr = mergeData['Main contact'].split(" ");
        mergeURL.MrMs = mergeData['Salutation'];

        mergeURL.Rep_Name = localStorage.getItem('userName');
        mergeURL.Rep_Title = localStorage.getItem('userTitle');
        mergeURL.Rep_Email = localStorage.getItem('userEmail');
        mergeURL.Rep_Ext  = localStorage.getItem('userExt');
        mergeURL.Rep_Cell = localStorage.getItem('userCell');
        mergeURL.Rep_Sig = localStorage.getItem('userSig');

        mergeURL.Actual_Sq_Footage = mergeData['Actual Sq Footage'];
        mergeURL.Restrooms = mergeData['Restrooms'];
        mergeURL.Days_of_Week = mergeData['Days of Week'];
        mergeURL.Service_Time = mergeData['Service Time'];


        if (this.state.exportQuestions) {
          if (this.state.exportQuestions.strip) { //if there is Strip and wax work
            mergeURL.strip  = 'true';
            mergeURL.stripPrice = this.state.exportQuestions.stripPrice;
          }
          if (this.state.exportQuestions.carpet) { //if there is Carpet work
            mergeURL.carpet  = 'true';
            mergeURL.carpetPrice = this.state.exportQuestions.carpetPrice;
          }
          if (this.state.exportQuestions.windows) { //if there is Exterior Window work
            mergeURL.windows  = 'true';
            mergeURL.windowPrice = this.state.exportQuestions.windowPrice;
          }
          if (this.state.exportQuestions.tile) { //if there is Tile / Grout work
            mergeURL.tile  = 'true';
            mergeURL.tilePrice = this.state.exportQuestions.tilePrice;
          }
          mergeURL.preCleanPrice = this.state.exportQuestions.preCleanPrice;

          if (this.state.exportQuestions.testimonials[2]['Logo']) {mergeURL.testLogo1 = this.state.exportQuestions.testimonials[2]['Logo'][0].url;}
          mergeURL.testCompany1 = this.state.exportQuestions.testimonials[2]['Company'];
          mergeURL.test1 = this.state.exportQuestions.testimonials[2]['Testimonial'];
          mergeURL.testContact1 = this.state.exportQuestions.testimonials[2]['Contact'];

          if (this.state.exportQuestions.testimonials[1]['Logo']) {mergeURL.testLogo2 = this.state.exportQuestions.testimonials[1]['Logo'][0].url;}
          mergeURL.testCompany2 = this.state.exportQuestions.testimonials[1]['Company'];
          mergeURL.test2 = this.state.exportQuestions.testimonials[1]['Testimonial'];
          mergeURL.testContact2 = this.state.exportQuestions.testimonials[1]['Contact'];

          if (this.state.exportQuestions.testimonials[0]['Logo']) {mergeURL.testLogo3 = this.state.exportQuestions.testimonials[0]['Logo'][0].url;}
          mergeURL.testCompany3 = this.state.exportQuestions.testimonials[0]['Company'];
          mergeURL.test3 = this.state.exportQuestions.testimonials[0]['Testimonial'];
          mergeURL.testContact3 = this.state.exportQuestions.testimonials[0]['Contact'];
        }


        mergeURL.Cont_First_Name = contactArr[0];
        mergeURL.Cont_Last_Name = contactArr[1];
        mergeURL.Contact_Title = encodeURIComponent(mergeData['Title']);
        mergeURL.Company = encodeURIComponent(mergeData['Company Name']);
        mergeURL.Address_Line_1 = mergeData['Address 1'];
        mergeURL.Address_Line_2 = mergeData['Address 2'];
        mergeURL.City = mergeData['City'];
        mergeURL.Zip_Code = mergeData['Zip'];
        mergeURL.Amount = mergeData['Monthly Amount'];
        mergeURL.Days_Serviced = mergeData['Times per Week'] + 'Week';

        let today  = new Date();
        let finalProposalDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        mergeURL.Proposal_Date = finalProposalDate;

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
        if (mergeURL.Proposal_Date) {finalURL += 'Proposal_Date=' + mergeURL.Proposal_Date; finalURL += '&';} else {finalURL += 'Proposal_Date=+';  finalURL += '&';}

        if (mergeURL.Rep_Name) {finalURL += 'Rep_Name=' + mergeURL.Rep_Name;  finalURL += '&';} else {finalURL += 'Rep_Name=+';  finalURL += '&';}
        if (mergeURL.Rep_Email) {finalURL += 'Rep_Email=' + mergeURL.Rep_Email;  finalURL += '&';} else {finalURL += 'Rep_Email=+';  finalURL += '&';}
        if (mergeURL.Rep_Ext) {finalURL += 'Rep_Ext=' + mergeURL.Rep_Ext;  finalURL += '&';} else {finalURL += 'Rep_Ext=+';  finalURL += '&';}
        if (mergeURL.Rep_Cell) {finalURL += 'Rep_Cell=' + mergeURL.Rep_Cell;  finalURL += '&';} else {finalURL += 'Rep_Cell=+';  finalURL += '&';}
        if (mergeURL.Rep_Sig) {finalURL += 'Rep_Sig=' + mergeURL.Rep_Sig;  finalURL += '&';} else {finalURL += 'Rep_Sig=+';  finalURL += '&';}

        if (mergeURL.Actual_Sq_Footage) {finalURL += 'Actual_Sq_Footage=' + mergeURL.Actual_Sq_Footage;  finalURL += '&';} else {finalURL += 'Actual_Sq_Footage=+';  finalURL += '&';}
        if (mergeURL.Restrooms) {finalURL += 'Restrooms=' + mergeURL.Restrooms;  finalURL += '&';} else {finalURL += 'Restrooms=+';  finalURL += '&';}
        if (mergeURL.Days_of_Week) {finalURL += 'Days_of_Week=' + mergeURL.Days_of_Week;  finalURL += '&';} else {finalURL += 'Days_of_Week=+';  finalURL += '&';}
        if (mergeURL.Service_Time) {finalURL += 'Service_Time=' + mergeURL.Service_Time;  finalURL += '&';} else {finalURL += 'Service_Time=+';  finalURL += '&';}

        if (mergeURL.strip) {finalURL += 'strip=' + mergeURL.strip; finalURL += '&';} else {finalURL += 'strip=+&';}
        if (mergeURL.stripPrice) {finalURL += 'stripPrice=' + mergeURL.stripPrice; finalURL += '&';} else {finalURL += 'stripPrice=+&';}
        if (mergeURL.carpet) {finalURL += 'carpet=' + mergeURL.carpet; finalURL += '&';} else {finalURL += 'carpet=+&';}
        if (mergeURL.carpetPrice) {finalURL += 'carpetPrice=' + mergeURL.carpetPrice; finalURL += '&';} else {finalURL += 'carpetPrice=+&';}
        if (mergeURL.windows) {finalURL += 'windows=' + mergeURL.windows; finalURL += '&';} else {finalURL += 'windows=+&';}
        if (mergeURL.windowPrice) {finalURL += 'windowPrice=' + mergeURL.windowPrice; finalURL += '&';} else {finalURL += 'windowPrice=+&';}
        if (mergeURL.tile) {finalURL += 'tile=' + mergeURL.tile; finalURL += '&';} else {finalURL += 'tile=+&';}
        if (mergeURL.tilePrice) {finalURL += 'tilePrice=' + mergeURL.tilePrice; finalURL += '&';} else {finalURL += 'tilePrice=+&';}
        if (mergeURL.preCleanPrice) {finalURL += 'preCleanPrice=' + mergeURL.preCleanPrice; finalURL += '&';} else {finalURL += 'preCleanPrice=+&';}

        if (mergeURL.testLogo1) {finalURL += 'testLogo1=' + mergeURL.testLogo1; finalURL += '&';} else {finalURL += 'testLogo1=+&';}
        if (mergeURL.test1) {finalURL += 'test1=' + mergeURL.test1; finalURL += '&';} else {finalURL += 'test1=+&';}
        if (mergeURL.testCompany1) {finalURL += 'testCompany1=' + mergeURL.testCompany1; finalURL += '&';} else {finalURL += 'testCompany1=+&';}
        if (mergeURL.testContact1) {finalURL += 'testContact1=' + mergeURL.testContact1; finalURL += '&';} else {finalURL += 'testContact1=+&';}
        if (mergeURL.testLogo2) {finalURL += 'testLogo2=' + mergeURL.testLogo2; finalURL += '&';} else {finalURL += 'testLogo2=+&';}
        if (mergeURL.test2) {finalURL += 'test2=' + mergeURL.test2; finalURL += '&';} else {finalURL += 'test2=+&';}
        if (mergeURL.testCompany2) {finalURL += 'testCompany2=' + mergeURL.testCompany2; finalURL += '&';} else {finalURL += 'testCompany2=+&';}
        if (mergeURL.testContact2) {finalURL += 'testContact2=' + mergeURL.testContact2; finalURL += '&';} else {finalURL += 'testContact2=+&';}
        if (mergeURL.testLogo3) {finalURL += 'testLogo3=' + mergeURL.testLogo3; finalURL += '&';} else {finalURL += 'testLogo3=+&';}
        if (mergeURL.test3) {finalURL += 'test3=' + mergeURL.test3; finalURL += '&';} else {finalURL += 'test3=+&';}
        if (mergeURL.testCompany3) {finalURL += 'testCompany3=' + mergeURL.testCompany3; finalURL += '&';} else {finalURL += 'testCompany3=+&';}
        if (mergeURL.testContact3) {finalURL += 'testContact3=' + mergeURL.testContact3; finalURL += '&';} else {finalURL += 'testContact3=+&';}
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
            currentRecordState['Next Follow Up'] = (today.getMonth()+1) + '/' + (today.getDate()+1) + '/' + today.getFullYear();
            currentRecordState['Follow Ups'] = 0;

            let todaysDate = new Date();
            let tomorrowDate = new Date(todaysDate.getTime()+1000*60*60*24);
            if (tomorrowDate.getDay() === 0) {
              tomorrowDate = new Date(todaysDate.getTime()+1000*60*60*24*2);
            } else if (tomorrowDate.getDay() === 6) {
              tomorrowDate = new Date(todaysDate.getTime()+1000*60*60*24*3);
            }
            currentRecordState['Next Follow Up'] = (tomorrowDate.getMonth()+1) + '/' + tomorrowDate.getDate() + '/' + tomorrowDate.getFullYear();

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
            console.log('hey');

            setTimeout((function() {
              this.setState({
                loading: false,
              });
            }).bind(this), 1000);
          }).bind(this), 250);
        })
    }
  }

  noVisitProposal = (e) => {
    let currRec = this.state.currentRecord;
    if (e === 'forward') {
      currRec['Proposal Type'] = 'No-Visit';
    } else {
      currRec['Proposal Type'] = undefined;
    }

    this.setState({
      currentRecord: currRec
    })
  }


  exportRecord = (exportData, type) => {
    mergeType = '';
    mergeType = type;
    console.log(exportData);
    console.log('exportRecord(' + exportData + ', ' + type + ')');

    if (exportData !== 'tampa-additional' && exportData !== 'orlando-additional' && exportData !== 'appt-sheet') {
      let exportQuestions = {};

      exportQuestions.strip  = exportData.strip;
      exportQuestions.carpet  = exportData.carpet;
      exportQuestions.windows  = exportData.windows;
      exportQuestions.tile  = exportData.tile;
      exportQuestions.preClean  = exportData.preClean;
      if (exportData.strip) { exportQuestions.stripPrice = exportData.stripPrice;  }
      if (exportData.carpet) {  exportQuestions.carpetPrice = exportData.carpetPrice;  }
      if (exportData.window) {  exportQuestions.windowPrice = exportData.windowPrice;  }
      if (exportData.tile) {  exportQuestions.tilePrice = exportData.tilePrice;  }
      if (exportData.preClean) {  exportQuestions.preCleanPrice = exportData.preCleanPrice;  }

      exportQuestions.mergeType = exportData.mergeTemp;


      let currRec = this.state.currentRecord;
      currRec['Service Time'] = exportData.time;
      currRec['Category'] = exportData.category;
      currRec['Service Notes'] = exportData.offerNotes;
      currRec['Service Schedule Changes'] = exportData.serviceSchedule;


      if (exportData.strip) { currRec['Strip & Wax'] = '' + exportData.stripPrice;  }
      if (exportData.carpet) {  currRec['Carpet Cleaning'] = '' + exportData.carpetPrice;  }
      if (exportData.window) {  currRec['Window Cleaning'] = '' + exportData.windowPrice;  }
      if (exportData.tile) {  currRec['Tile & Grout'] = '' + exportData.tilePrice;  }
      if (exportData.preClean) {  currRec['Pre-Clean'] = '' + exportData.preCleanPrice;  }

      if (exportData.daysOfWeek.length === 7) {
        currRec['Days of Week'] = 'Monday through Sunday';
      } else if (exportData.daysOfWeek.length === 6) {
        if (exportData.daysOfWeek.includes('Sun') === false) {
          currRec['Days of Week'] = 'Monday through Saturday';
        } else if (exportData.daysOfWeek.includes('Sat') === false) {
          currRec['Days of Week'] = 'Sunday through Friday';
        } else if (exportData.daysOfWeek.includes('Fri') === false) {
          currRec['Days of Week'] = 'Saturday through Thursday';
        } else if (exportData.daysOfWeek.includes('Thu') === false) {
          currRec['Days of Week'] = 'Friday through Wednesday';
        } else if (exportData.daysOfWeek.includes('Wed') === false) {
          currRec['Days of Week'] = 'Thursday through Tuesday';
        } else if (exportData.daysOfWeek.includes('Tue') === false) {
          currRec['Days of Week'] = 'Wednesday through Monday';
        } else if (exportData.daysOfWeek.includes('Mon') === false) {
          currRec['Days of Week'] = 'Tuesday through Sunday';
        }
      } else if (exportData.daysOfWeek.length === 5) {
        if (exportData.daysOfWeek.includes('Sat') === false && exportData.daysOfWeek.includes('Sun') === false) {
          currRec['Days of Week'] = 'Monday through Friday';
        } else if (exportData.daysOfWeek.includes('Sun') === false && exportData.daysOfWeek.includes('Mon') === false) {
          currRec['Days of Week'] = 'Tuesday through Saturday';
        } else if (exportData.daysOfWeek.includes('Mon') === false && exportData.daysOfWeek.includes('Tue') === false) {
          currRec['Days of Week'] = 'Wednesday through Sunday';
        } else if (exportData.daysOfWeek.includes('Tue') === false && exportData.daysOfWeek.includes('Wed') === false) {
          currRec['Days of Week'] = 'Thursday through Monday';
        } else if (exportData.daysOfWeek.includes('Wed') === false && exportData.daysOfWeek.includes('Thu') === false) {
          currRec['Days of Week'] = 'Friday through Tuesday';
        } else if (exportData.daysOfWeek.includes('Thu') === false && exportData.daysOfWeek.includes('Fri') === false) {
          currRec['Days of Week'] = 'Saturday through Wednesday';
        } else if (exportData.daysOfWeek.includes('Fri') === false && exportData.daysOfWeek.includes('Sat') === false) {
          currRec['Days of Week'] = 'Sunday through Thursday';
        }
      } else {
        currRec['Days of Week'] = '' + exportData.daysOfWeek;
      }

      this.setState({
        currentRecord: currRec,
        exportQuestions: exportQuestions,
      });





      /////////////////////////////////
      //  Testimonials Info ///////////
      /////////////////////////////////
      let testimonialsURL = 'https://api.airtable.com/v0/app3t50c5Z3rAjx4X/all';
      let exportCat;

      if (exportData.category === 'General Office' || exportData.category === 'Manufacturing' || exportData.category === 'Government' || exportData.category === 'Law Office' || exportData.category === 'Retail' || exportData.category === 'Spa' || exportData.category === 'Dealership') {
        exportCat = 'Office';
      } else if (exportData.category === 'Standard Medical' || exportData.category === 'Clinic' || exportData.category === 'Dialysis / Oncology' || exportData.category === 'Dentist' || exportData.category === 'Veterinarian' || exportData.category === 'Surgery Center') {
        exportCat = 'Medical';
      } else if (exportData.category === 'Residential Common Area' || exportData.category === 'Residential Living') {
        exportCat = 'Residential';
      } else if (exportData.category === 'Church') {
        exportCat = 'Church';
      } else if (exportData.category === 'School' || exportData.category === 'Daycare / VPK') {
        exportCat = 'School';
      } else if (exportData.category === 'Restaurant' || exportData.category === 'Bar') {
        exportCat = 'Restaurant';
      }
      testimonialsURL = testimonialsURL + '?filterByFormula=OR(%7BCategory%7D+%3D+%27Any%27%2C+%7BCategory%7D+%3D+%27' + exportCat + '%27)';
      console.log(testimonialsURL);


      setTimeout((function() {
        return axios
          .get(testimonialsURL).then(response => {
            console.log(response);
            let testimonial = response.data.records;
            let nonAnyCount = 0;  let totalCount = 0;
            let testimonialList = [];
            let anyItems = [];

            for (var i in testimonial) {
              console.log(testimonial[i].fields['Company'] + ' - ' + totalCount);
              if (totalCount < 3) {
                if (testimonial[i].fields['Category'] !== 'Any') {
                  nonAnyCount = nonAnyCount + 1;
                  totalCount = totalCount + 1;
                  console.log('add total');
                  testimonialList.push(testimonial[i].fields)
                } else {
                  anyItems.push(testimonial[i])
                }
              }
            }
            console.log(totalCount);
            if (totalCount < 3) {
              console.log(anyItems);
              for (var i in anyItems) {
                if (totalCount < 3) {
                  if (anyItems[i].fields['Category'] === 'Any') {
                    totalCount = totalCount + 1;
                    testimonialList.push(anyItems[i].fields)
                  }
                }
              }
            }
            let currExport = this.state.exportQuestions;
            currExport.testimonials = testimonialList;
            this.setState({
              exportQuestions: currExport,
            })

            console.log(currExport);

            setTimeout((function() {
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
            }).bind(this), 50);
          });
      }).bind(this), 50);


      let showModal = function() {
        this.setState({
          activeModal: true,
          modalType: 'forecast',
        });
      }.bind(this)



    } else {
      let finalType;
      if (exportData === 'orlando-additional') {
        finalType = 'jdh-once'
      } else if (exportData === 'tampa-additional') {
        console.log(type);
        if (this.state.currentRecord['Sales Rep'] === 'Tyler Perkins') {
          finalType = 'tmp-once';
        } else {
          finalType = 'nwp-once';
        }
      } else {
        finalType = exportData;
      }
      mergeTemp = finalType;
      this.createDocument();
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
    } else {
      alert('Error! Please include an AM or PM on the APPOINTMENT TIME field');
      return;
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

    let finalCalURL;

    if (this.state.currentRecord['Main contact']) {
      let contactFirst;
      if (this.state.currentRecord['Main contact'].indexOf(' ') < 0) {
        contactFirst = this.state.currentRecord['Main contact'];
      } else {
        contactFirst = this.state.currentRecord['Main contact'].split(' ')[0];
      }
      finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.state.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + ' (' + contactFirst + ')'+'&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=';

    } else {
      finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.state.currentRecord['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + '&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=';
    }
    if (this.state.calendarNote) {
      finalCalURL += 'Set By - ' + this.state.currentRecord['Appt. Set By'].split(' ')[0] + '<br/>';
      finalCalURL += this.state.calendarNote;
    }
    finalCalURL += '<br/><br/>+View+record+<a+href="' + window.location.href + '">' + window.location.href + '</a>';
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


    let contactFirst;
    if (this.state.currentRecord['Main contact'] && this.state.currentRecord['Email']) {
      if (this.state.currentRecord['Main contact'].indexOf(' ') < 0) {
        contactFirst = this.state.currentRecord['Main contact'];
      } else {
        contactFirst = this.state.currentRecord['Main contact'].split(' ')[0];
      }
      let timeOfDay = 'Morning';
      let today = new Date();
      let halfTime = today.getHours();
      if (halfTime > 11) {
        timeOfDay = 'Afternoon';
      }
      if (this.state.currentRecord['Email']) {
        let apptEmailLink = 'mailto:';
        apptEmailLink += this.state.currentRecord['Email'];
        apptEmailLink += "?subject=" + this.state.currentRecord['Appt. Set By'].split(' ')[0] + "%20from%20Vanguard%20Cleaning%20Systems%20Proposal";

        apptEmailLink += "&body=Good%20" + timeOfDay + "%20" + contactFirst;
        let apptDate = new Date(this.state.currentRecord['Appt. Date']);
        apptDate = (apptDate.getMonth()+1) + '/' + apptDate.getDate() + '/' + apptDate.getFullYear()

        apptEmailLink += "%2C%0A%0AThank%20you%20so%20much%20for%20your%20time%20today.%20It%20was%20a%20pleasure%20speaking%20with%20you.%0A%20Please%20note%20that%20on%20" + this.state.currentRecord['Appt. Date'] + "%20at%20" + this.state.currentRecord['Appt. Time'] + "%2C%20our%20Regional%20Sales%20Director%2C%20" + this.state.currentRecord['Sales Rep'] + "%2C%20will%20be%20meeting%20with%20you%20to%20learn%20about%20your%20cleaning%20needs%20in%20order%20to%20prepare%20a%20customized%20proposal%20of%20services%20for%20your%20review.%20%0A%0A" + contactFirst + "%2C%20thanks%20again%20for%20your%20time%20and%20consideration%20and%20I%20hope%20you%20have%20a%20great%20rest%20of%20your%20day.";


        var fakeEmailLink = document.createElement('a');
        fakeEmailLink.setAttribute('href', apptEmailLink);
        fakeEmailLink.style.display = 'none';
        document.body.appendChild(fakeEmailLink);
        fakeEmailLink.click();
        document.body.removeChild(fakeEmailLink);
      }
    }

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
    if (slackSet === 'Linda' || slackSet === 'Eric' || slackSet === 'Carla' || slackSet === 'Shana' || slackSet === 'Lisa' || slackSet === 'Mariyah') {
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



  mergeGoogle = (e) => {
    console.log(e);
    let currentRec = this.state.currentRecord;

    currentRec['Company Name'] = e.name;
    currentRec['Address 1'] = e.addressComponents.quickAdd;
    currentRec['Address 2'] = e.addressComponents.addr2;
    currentRec['City'] = e.addressComponents.city;
    currentRec['Zip'] = e.addressComponents.zip;
    currentRec['Office Phone'] = e.phone;

    this.setState({
      currentRecord: currentRec
    })
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
      exportFields += '&fields%5B%5D=';
      exportFields += 'Proposal+Type';
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


        let regionFilter;
        if (sessionStorage.getItem('regionZips') != null) {
          let regionZips = sessionStorage.getItem('regionZips').split(',');

          regionFilter = 'OR(';
          for (var i in regionZips) {
            console.log(i);
            if (i === '0') {  regionFilter += 'FIND(' + regionZips[i] + '%2C+%7BZip%7D)';
            } else { regionFilter += '%2C+FIND(' + regionZips[i] + '%2C+%7BZip%7D)'; }
          }
          regionFilter += ')';
        }

        console.log(regionFilter);

        if (sessionStorage.getItem('jumpLetters')) {
          if (sessionStorage.getItem('regionZips') != null) {
            finalURL += "filterByFormula=AND(FIND('" + sessionStorage.getItem('jumpLetters') +  "'%2C+LEFT(LOWER(%7BCompany+Name%7D)%2C1))%2C" + regionFilter + ")";
          } else {
            finalURL += "filterByFormula=FIND('" + sessionStorage.getItem('jumpLetters') +  "'%2C+LEFT(LOWER(%7BCompany+Name%7D)%2C1))";
          }
        } else {
          // if (this.state.sortByLabel !== '') {
          //   finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder + "&filterByFormula=NOT(%7BCompany+Name%7D+%3D+'')";
          // }
          if (sessionStorage.getItem('regionZips') != null) {
            finalURL += "filterByFormula=" + regionFilter;
          }
        }
        finalURL += '&sort%5B0%5D%5Bfield%5D=Company+Name&sort%5B0%5D%5Bdirection%5D=asc';
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
        if (sessionStorage.getItem('regionZips') != null) {
          document.getElementById('regionSelect').className='ControlsBar--btn isActive';
          document.getElementById('regionSelect').getElementsByTagName('p')[0].innerHTML=sessionStorage.getItem('regionName');
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
      } else if(e.target.id === 'yelpModal') {
        this.setState({
          activeModal: true,
          modalType: 'yelpModal',
        });
      } else if(e.target.id === 'salesFollows') {
        this.setState({
          activeModal: true,
          modalType: 'salesFollowsOutside',
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
      } else if(e.target.id === 'logCall') {
        this.setState({
          activeModal: true,
          modalType: 'logCall',
        });
      } else if(e.target.id === 'moveDatabase') {
        this.setState({
          activeModal: true,
          modalType: 'moveDatabase',
        });
      } else if (e.target.closest(".ControlsBar--btn").id === 'regionSelect') {
        this.setState({
          activeModal: true,
          modalType: 'regionSelect',
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

  regionSelectHandler = () => {
    let regionZips = document.getElementById('regionSelect').value;
    let regionName = document.getElementById('regionSelect').options[document.getElementById('regionSelect').selectedIndex].innerHTML;

    if (regionZips === 'All Regions') {
      sessionStorage.removeItem('regionZips');
      sessionStorage.removeItem('regionName');
    } else {
      sessionStorage.setItem('regionZips', regionZips);
      sessionStorage.setItem('regionName', regionName);
    }

    this.setState({
      dataOffset: '',
      activeModal: false,
      modalType: '',
    });
    setTimeout((function() {
      this.loadData();
    }).bind(this), 100);
  }

  logCall = (e, i) => {
    console.log(e);
    console.log(i);
    let currRec = this.state.currentRecord;
    if (i === 'setAppt') {
      currRec['Appt. Set By'] = e['Appt. Set By'];
      currRec['Appt. Set Date'] = e['Appt. Set Date'];
      currRec['Status'] = e['Status'];
    }
    currRec['Recent Call Date'] = e['Recent Call Date'];
    currRec['Recent Caller'] = e['Recent Caller'];
    currRec['Notes'] = e['Notes'];
    currRec['Recent Call Time'] = e['Recent Call Time']

    console.log(currRec);

    this.setState({
      currentRecord: currRec,
    })

    if (i === 'setAppt') {
      this.setAppt();
      this.setState({
        calendarNote: e['calNote']
      });
    } else {
      setTimeout((function() {
        this.saveRecordHandler();
        setTimeout((function() {
          this.setState({
            loading: false,
          });
        }).bind(this), 1000);
      }).bind(this), 100);
    }
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

    if (sessionStorage.getItem('searchQuery')) {
      let capitalizedQuery = sessionStorage.getItem('searchQuery').replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      capitalizedQuery = encodeURIComponent(capitalizedQuery);
      if (this.state.listView !== '') {
        finalURL = finalURL + '?' + this.state.listView;
        finalURL = finalURL + '&filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + sessionStorage.getItem('searchBy') + '%7D)))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND("' + capitalizedQuery + '"%2CLOWER(%7B' + sessionStorage.getItem('searchBy') + '%7D)))';
      }
    } else {
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

    if (this.props.location.search && this.props.location.search.split('?')[1].split('=')[0] === 'searchBy') {
      this.searchHandler('url');
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
          userName={this.state.userName}
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
          regionSelectHandler={this.regionSelectHandler}
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
          timesPerWeekChange={this.timesPerWeekChange}
          changeRecordHandler={this.changeRecordHandler}
          autoPricing={this.autoPricing}
          repChange={this.repChange}
          callerChange={this.callerChange}
          categoryChange={this.categoryChange}
          standingChange={this.standingChange}
          handleDayClick={this.handleDayClick}
          toggleDayPicker={this.toggleDayPicker}
          logCall={this.logCall}
          mergeGoogle={this.mergeGoogle}
          noVisitProposal={this.noVisitProposal}
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
            proposalTypeChange={this.proposalTypeChange}
            repChange={this.repChange}
            callerChange={this.callerChange}
            categoryChange={this.categoryChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
            standingChange={this.standingChange}
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
            callerChange={this.callerChange}
            categoryChange={this.categoryChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
            standingChange={this.standingChange}
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
            proposalTypeChange={this.proposalTypeChange}
            repChange={this.repChange}
            callerChange={this.callerChange}
            categoryChange={this.categoryChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
            standingChange={this.standingChange}
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
            proposalTypeChange={this.proposalTypeChange}
            repChange={this.repChange}
            callerChange={this.callerChange}
            categoryChange={this.categoryChange}
            noteCharacters={this.state.noteCharacters}
            pathName={this.props.location.pathname}
            mobileHand={this.state.mobileHand}
            currentTab={this.state.currentTab}
            userName={this.state.userName}
            standingChange={this.standingChange}
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
