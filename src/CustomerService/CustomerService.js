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
import AccountingView from './Records/AccountingView';
import CrewsView from './Records/CrewsView';
import ListContent from './Archive/ListContent';
import ControlsBar from '../Globals/ControlsBar';
import ModalView from '../Globals/ModalView';
import FranchiseView from './FranchiseView';

let currentRecordState = [];
let currentFranchiseState = [];
let revertState = [];
let dataIndex = [];
let fallbackRecordIndex;
let keyChangeDirection = '';
let finalURL;

export default class CustomerService extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: '',
      currentTable: 'Customers',
      listView: 'view=All+Actives',
      sortByLabel: 'Company+Name',
      sortByOrder: 'asc',
      currentRecord: [],
      currentRecordIndex: [],
      currentId: [],
      fallbackRecord: [],
      recordView: false,
      franchiseView: false,
      recordChanges: false,
      activeModal: false,
      modalType: '',
      currentFranchise: [],
      recordChanger: false,
      dataOffset: '',
      loadingMore: false,
      totalLoads: 1,
      userName: '',
      searchQuery: '',
      newRecord: false,
      listIsVisible: props.recordId == null,
      currentSP: [],
      spList: [],
      spListOffset: '',
      currentRecordView: 'default',
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.loading && !nextState.loading) {
      if (this.props.recordId != null) {
        console.log(this.props.recordId);
        console.log(nextState.data.filter(e => e.id === this.props.recordId));
        if (nextState.data != null && nextState.data.filter(e => e.id === this.props.recordId)[0]) {
          this.props.recordId;
          const record = nextState.data.filter(e => e.id === this.props.recordId)[0].fields;
          setTimeout((function() {
            this.setState({
              recordView: true,
              currentRecord: record,
              noteCharacters: record['Notes'].length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentRecordIndex: this.state.data.findIndex(obj => obj.id == this.props.recordId),
            })
          }).bind(this), 0);
        } else {
          finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + this.props.recordId;
          return axios
            .get(finalURL)
            .then(response => {
              console.log(response);
              this.setState({
                recordView: true,
                loading: false,
                error: false,
                noteCharacters: response.data.fields['Notes'].length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                currentRecord: response.data.fields,
              });
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
        return axios
          .get(finalURL)
          .then(response => {
            console.log(response);
            this.setState({
              recordView: true,
              loading: false,
              error: false,
              noteCharacters: response.data.fields['Notes'].length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentRecord: response.data.fields,
            });
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
        baseId: 'apps7GoAgK23yrOoY',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        loading: false,
        baseId: 'appBUKBn552B8SlbE',
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
        finalURL = finalURL + '&filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2CLOWER(%7B' + searchBy + '%7D)))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2CLOWER(%7B' + searchBy + '%7D)))';
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
        finalURL = finalURL + '&filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2CLOWER(%7B' + searchBy + '%7D)))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2CLOWER(%7B' + searchBy + '%7D)))';
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

  loadSPList = () => {
    let franchCityBase;
    if (this.props.citySet === 'tampa') {
      franchCityBase = 'appBsaVxz2OicG5Zw';
    } else if (this.props.citySet === 'orlando') {
      franchCityBase = 'appLxxBrc9m3yNXdQ';
    }

    let finalURL = 'https://api.airtable.com/v0/' + franchCityBase + '/Franchisees?view=Active&sort%5B0%5D%5Bfield%5D=SP+Name';
    let downloadNow = 0;

    let loadAllData = setInterval(function() {
      if (this.state.spListOffset !== '') {finalURL = finalURL + '&offset=' + this.state.spListOffset;}
      let preData = this.state.spList;
      return axios
        .get(finalURL)
        .then(response => {
          downloadNow ++;
          this.setState({
            spList: preData.concat(response.data.records),
            spListOffset: response.data.offset,
          });
          console.log(response.data.offset);
        }).catch(error => {
          downloadNow ++;
          clearInterval(loadAllData);
          sessionStorage.setItem('tampaSPLoaded', true);
          sessionStorage.setItem('tampaSPList', this.state.spList);
          if (this.state.recordView === true) {
            this.loadSPInfo();
          }
        });
    }.bind(this), 500);
  };


  loadSPInfo = () => {
    let franchCityBase;
    if (this.props.citySet === 'tampa') {
      franchCityBase = 'appBsaVxz2OicG5Zw';
    } else if (this.props.citySet === 'orlando') {
      franchCityBase = 'appLxxBrc9m3yNXdQ';
    }
    if (this.state.currentRecord['SP Number'] != null) {
      console.log(this.state.currentRecord['SP Number']);
      console.log(this.state.spList);
      setTimeout((function() {
        let spInfoRecord = this.state.spList.filter(e => e.fields['Number'] === this.state.currentRecord['SP Number'])[0];
        let spData = spInfoRecord.fields;
        let spID = spInfoRecord.id;
        spData['id'] = spID;
        this.setState({
          currentSP: spData,
        });
      }).bind(this), 50);
    } else {
      this.setState({
        currentSP: {},
      });
    }
  }


  spChangeHandler = e => {
    console.log(e.target.value);

    if (this.props.spNumber !== e.target.value) {
      if (e.target.value !== 'none') {
        currentRecordState = this.state.currentRecord;
        currentRecordState['SP Number'] = e.target.value;

        this.setState({
          currentRecord: currentRecordState,
          recordChanges: true,
        });

        this.loadSPInfo();
      }
    }
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

    if (this.state.pickerId === 'close') {currentRecordState['Close Date'] = finalDate}
    else if (this.state.pickerId === 'proposal') {currentRecordState['Proposal Date'] = finalDate}
    else if (this.state.pickerId === 'apptSetDate') {currentRecordState['Appt. Set Date'] = finalDate}
    else if (this.state.pickerId === 'preCleanDate') {currentRecordState['Pre-Clean Date'] = finalDate}
    else if (this.state.pickerId === 'start') {currentRecordState['Start Date'] = finalDate}
    else if (this.state.pickerId === 'apptDate') {currentRecordState['Appt. Date'] = finalDate}
    else if (this.state.pickerId === 'walkthrough') {currentRecordState['Walkthrough Date'] = finalDate}
    else if (this.state.pickerId === 'cancel') {currentRecordState['Cancel Date'] = finalDate}
    else if (this.state.pickerId === 'newSP') {currentRecordState['New SP Start'] = finalDate}
    else if (this.state.pickerId === 'lastCall') {currentRecordState['Last Call'] = finalDate}
    else if (this.state.pickerId === 'lastVisit') {currentRecordState['Last Visit'] = finalDate}

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
    this.props.history.push('/' + this.props.citySet + '/customer-service/' + key);
  }

  newRecordHandler = ()  => {
    if (!this.state.franchiseView) {
      currentRecordState = {
        'Company Name': 'New Company',
        'CPOP': null,
        'Addtl Supplies': null,
        'Salutation': null,
        'Main contact': null,
        'Title': null,
        'Alternate Contact': null,
        'Office Phone': null,
        'Extension': null,
        'Cell Phone': null,
        'Email': null,
        'Lead Source': null,
        'Last Call': null,
        'SP Name': null,
        'SP Phone': null,
        'Last Visit': null,
        'New SP Start': null,
        'Cancel Date': null,
        'Address 1': null,
        'Address 2': null,
        'City': null,
        'Zip': null,
        'County': null,
        'Employees': null,
        'Appt. Set Date': null,
        'Appt. Set By': null,
        'Appt. Date': null,
        'Close Date': null,
        'Proposal Date': null,
        'Walkthrough Date': null,
        'Start Date': null,
        'SP Email': null,
        'Pre-Clean Date': null,
        'Pre-Clean Charge': null,
        'Monthly Amount': null,
        'Sq. Footage': null,
        'Actual Sq Footage': null,
        'Restrooms': null,
        'Ceramic': null,
        'Marble': null,
        'VCT': null,
        'Wood': null,
        'Wood Lam.': null,
        'Carpet': null,
        'Other': null,
        'Hours Per': null,
        'SQ Ft. per Hour': null,
        'Times per Week': null,
        'Days of Week': null,
        'PAM': null,
        'Sales Rep': null,
        'Status': null,
        'Standing': null,
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
    } else {
      currentFranchiseState = {
        'Provider Name': '',
        'PROV #': '',
        'Home Number': '',
        'Cell Number': '',
        'Alternate Contact': '',
        'Alternate Contact Phone': '',
      }
      let pushRecord = currentFranchiseState;
      let finalPush = {"fields": pushRecord}

      axios
      .post(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable, finalPush)
        .then(response => {
          this.setState({
            recordChanges: false,
            // loading: true,
            data: this.state.data.concat(response.data),
            // data: this.state.data.push(response.data),
          });
        })
        .catch(response => {
          console.error("error: ", response);
        });

    }
  }



  switchTableHandler = (e) => {
    if (e.target.id === "customers") {
      if (this.state.currentTable !== 'Customers') {
        if (this.state.recordChanges) {
          let franchDataSet = this.state.data;
          let pushRecord = this.state.currentFranchise;
          let pushRecordId = franchDataSet[this.state.currentId].id;

          let finalPush = {"fields": pushRecord}
          axios
          .put(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + pushRecordId, finalPush)
            .then(response => {
            this.setState({
              recordChanges: false,
            });
          })
          .catch(response => {
            console.error("error: ", response);
          });
        }
        this.setState({
          currentTable: 'Customers',
          franchiseView: false,
          sortByLabel: 'Company+Name',
          sortByOrder: 'asc',
          recordChanges: false,
          dataOffset: '',
          listView: 'view=All+Actives',
        });
        setTimeout((function() {
          this.loadData();
        }).bind(this), 50);
      }
    } else {
      if (this.state.currentTable !== 'Franchise%20Info') {

        this.setState({
          sortByLabel: '',
          listView: '',
          dataOffset: '',
          currentTable: 'Franchise%20Info',
          franchiseView: true,
        });
        setTimeout((function() {
          this.loadData();
        }).bind(this), 50);
      }
    }
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

      console.log(currentRecordState['Notes'].length);
      if (parseInt(this.props.noteCharacters) > 90000 && currentRecordState['Notes'].length < 98000) {
        document.getElementById('noteCharCount').classNames = 'warning';
      } else if (currentRecordState['Notes'].length >= 98000) {
        document.getElementById('noteCharCount').classNames = 'broken';
      } else {
        document.getElementById('noteCharCount').classNames = '';
      }

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
    else if (e.target.id === 'salutation') {currentRecordState['Salutation'] = e.target.value}
    else if (e.target.id === 'contact') {currentRecordState['Main contact'] = e.target.value}
    else if (e.target.id === 'title') {currentRecordState['Title'] = e.target.value}
    else if (e.target.id === 'altContact') {currentRecordState['Alternate Contact'] = e.target.value}
    else if (e.target.id === 'phone') {currentRecordState['Office Phone'] = e.target.value}
    else if (e.target.id === 'ext') {currentRecordState['Extension'] = e.target.value}
    else if (e.target.id === 'cell') {currentRecordState['Cell Phone'] = e.target.value}
    else if (e.target.id === 'email') {currentRecordState['Email'] = e.target.value}
    else if (e.target.id === 'source') {currentRecordState['Lead Source'] = e.target.value}
    else if (e.target.id === 'lastCall') {currentRecordState['Last Call'] = e.target.value}
    else if (e.target.id === 'spName') {currentRecordState['SP Name'] = e.target.value}
    else if (e.target.id === 'spPhone') {currentRecordState['SP Phone'] = e.target.value}
    else if (e.target.id === 'lastVisit') {currentRecordState['Last Visit'] = e.target.value}
    else if (e.target.id === 'newSP') {currentRecordState['New SP Start'] = e.target.value}
    else if (e.target.id === 'cancel') {currentRecordState['Cancel Date'] = e.target.value}
    else if (e.target.id === 'addr1') {currentRecordState['Address 1'] = e.target.value}
    else if (e.target.id === 'addr2') {currentRecordState['Address 2'] = e.target.value}
    else if (e.target.id === 'spEmail') {currentRecordState['SP Email'] = e.target.value}
    else if (e.target.id === 'city') {currentRecordState['City'] = e.target.value}
    else if (e.target.id === 'zip') {currentRecordState['Zip'] = e.target.value}
    else if (e.target.id === 'county') {currentRecordState['County'] = e.target.value}
    else if (e.target.id === 'emp') {currentRecordState['Employees'] = e.target.value}
    else if (e.target.id === 'apptSetDate') {currentRecordState['Appt. Set Date'] = e.target.value}
    else if (e.target.id === 'apptSetBy') {currentRecordState['Appt. Set By'] = e.target.value}
    else if (e.target.id === 'apptDate') {currentRecordState['Appt. Date'] = e.target.value}
    else if (e.target.id === 'close') {currentRecordState['Close Date'] = e.target.value}
    else if (e.target.id === 'proposal') {currentRecordState['Proposal Date'] = e.target.value}
    else if (e.target.id === 'walkthrough') {currentRecordState['Walkthrough Date'] = e.target.value}
    else if (e.target.id === 'start') {currentRecordState['Start Date'] = e.target.value}
    else if (e.target.id === 'preCleanDate') {currentRecordState['Pre-Clean Date'] = e.target.value}
    else if (e.target.id === 'preCleanCharge') {currentRecordState['Pre-Clean Charge'] = e.target.value}
    else if (e.target.id === 'amount') {currentRecordState['Monthly Amount'] = e.target.value}
    else if (e.target.id === 'sqFt') {currentRecordState['Sq. Footage'] = e.target.value}
    else if (e.target.id === 'sqFtReal') {currentRecordState['Actual Sq Footage'] = e.target.value}
    else if (e.target.id === 'restrooms') {currentRecordState['Restrooms'] = e.target.value}
    else if (e.target.id === 'ceramic') {currentRecordState['Ceramic'] = e.target.value}
    else if (e.target.id === 'marble') {currentRecordState['Marble'] = e.target.value}
    else if (e.target.id === 'vct') {currentRecordState['VCT'] = e.target.value}
    else if (e.target.id === 'wood') {currentRecordState['Wood'] = e.target.value}
    else if (e.target.id === 'woodLam') {currentRecordState['Wood Lam.'] = e.target.value}
    else if (e.target.id === 'carpet') {currentRecordState['Carpet'] = e.target.value}
    else if (e.target.id === 'other') {currentRecordState['Other'] = e.target.value}
    else if (e.target.id === 'hoursPer') {currentRecordState['Hours Per'] = e.target.value}
    else if (e.target.id === 'sqFtPer') {currentRecordState['SQ Ft. per Hour'] = e.target.value}
    else if (e.target.id === 'timesPerWeek') {currentRecordState['Times per Week'] = e.target.value}
    else if (e.target.id === 'weekDays') {currentRecordState['Days of Week'] = e.target.value}


    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })
  }
  editingFranchise = (e, key, index) => {
    if (this.state.recordChanges) {
      let franchDataSet = this.state.data;
      let pushRecord = this.state.currentFranchise;
      let pushRecordId = franchDataSet[this.state.currentId].id;

      let finalPush = {"fields": pushRecord}

      axios
      .put(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + pushRecordId, finalPush)
        .then(response => {
        this.setState({
          recordChanges: false,
        });
      })
      .catch(response => {
        console.error("error: ", response);
      });
    }
    setTimeout((function() {
      this.setState({
        currentFranchise: e,
        currentId: index,
      });
    }).bind(this), 100);

  }

  changeFranchiseHandler = e => {
    currentFranchiseState = this.state.currentFranchise;

    if (e.target.id === 'name') {currentFranchiseState['Provider Name'] = e.target.value}
    else if (e.target.id === 'prov') {currentFranchiseState['PROV #'] = e.target.value}
    else if (e.target.id === 'home') {currentFranchiseState['Home Number'] = e.target.value}
    else if (e.target.id === 'cell') {currentFranchiseState['Cell Number'] = e.target.value}
    else if (e.target.id === 'alt') {currentFranchiseState['Alternate Contact'] = e.target.value}
    else if (e.target.id === 'altPhone') {currentFranchiseState['Alternate Contact Phone'] = e.target.value}

    this.setState({
      currentFranchise: currentFranchiseState,
      recordChanges: true,
    })
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
      this.props.history.push('/' + this.props.citySet + '/customer-service/');
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

          this.props.history.push('/' + this.props.citySet + '/customer-service/' + this.state.data[dataIndex].id);

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

            this.props.history.push('/' + this.props.citySet + '/customer-service/' + this.state.data[dataIndex].id);
          } else {
            // fullDataSet[dataIndex].fields = this.state.fallbackRecord
            this.props.history.push('/' + this.props.citySet + '/customer-service/');
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

  saveRecordHandler = () => {
    if (this.state.newRecord) {
      let fullDataSet = this.state.currentRecord;

      if (this.state.currentRecordView !== 'default') {
        this.setState({
          currentRecordView: 'default',
        })
      }
      setTimeout((function() {
        fullDataSet["PAM"] = document.getElementById('pamSelect').value;
        fullDataSet["Sales Rep"] = document.getElementById('repSelect').value;
        fullDataSet["Status"] = document.getElementById('statusSelect').value;
        fullDataSet["Standing"] = document.getElementById('standingSelect').value;
        fullDataSet["CPOP"] = document.getElementById('cpopSelect').value;
        fullDataSet["Addtl Supplies"] = document.getElementById('suppliesSelect').value;
        fullDataSet["Appt. Set By"] = document.getElementById('setBySelect').value;

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
              currentRecordView: sessionStorage.getItem('serviceView'),
            })
          }
          setTimeout((function() {
            this.props.history.push('/' + this.props.citySet + '/customer-service/' + response.data.id);
          }).bind(this), 10);
        })
        .catch(response => {
          console.error("error: ", response);
        });
      }).bind(this), 10);
    } else {
      let fullDataSet = this.state.data;
      let pushRecordId;
      let pushRecord;

      pushRecord = this.state.currentRecord;
      if (this.state.currentTable === 'Customers') {
        pushRecordId = this.props.recordId;
      } else {
        pushRecordId = this.state.currentId;
      }
      if (this.state.currentRecordView !== 'default') {
        this.setState({
          currentRecordView: 'default',
        })
      }

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
        pushRecord["PAM"] = document.getElementById('pamSelect').value;
        pushRecord["Sales Rep"] = document.getElementById('repSelect').value;
        pushRecord["Status"] = document.getElementById('statusSelect').value;
        pushRecord["Standing"] = document.getElementById('standingSelect').value;
        pushRecord["CPOP"] = document.getElementById('cpopSelect').value;
        pushRecord["Addtl Supplies"] = document.getElementById('suppliesSelect').value;
        pushRecord["Appt. Set By"] = document.getElementById('setBySelect').value;


        let finalPush = {"fields": pushRecord}
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
              this.props.history.push('/' + this.props.citySet + '/customer-service/' + this.state.data[dataIndex].id);
            } else {
              if (this.state.modalType === 'saveAlert') {
                this.props.history.push('/' + this.props.citySet + '/customer-service/');
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
            alert('Record Saved');
            this.setState({
              recordChanges: false,
            })

            if (this.state.currentRecordView !== 'default') {
              this.setState({
                currentRecordView: sessionStorage.getItem('serviceView'),
              })
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

  exportRecord = e => {
    e.preventDefault();

    let mergeTemp = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-type');
    let mergeType = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-type');
    let mergeURL; let finalURL;
    let fileLocation = 'Dropbox/' + this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase();

    if (mergeTemp !== 'none') {
      let mergeData = this.state.currentRecord;
      let contactArr = mergeData['Main contact'].split(" ");
      let spName = '';
      let spPhone = '';
      console.log(this.state.spList);

      let currentSPNumber = this.state.currentRecord['SP Number'];

      for (var index in this.state.spList) {
        if (this.state.spList[index].fields['Number'] === currentSPNumber) {
          spName = this.state.spList[index].fields['SP Name'];

          if (this.state.spList[index].fields['Home Phone']) {
            spPhone = this.state.spList[index].fields['Home Phone'];
          } else if (this.state.spList[index].fields['Cellphone']){
            spPhone = this.state.spList[index].fields['Cellphone'];
          }
        }
      }


      mergeURL = {
        base: 'https://www.webmerge.me/merge/',
        id: '',
        Company: mergeData['Company Name'],
        Address_Line_1: mergeData['Address 1'],
        Address_Line_2: mergeData['Address 2'],
        City: mergeData['City'],
        Zip_Code: mergeData['Zip'],
        Amount: mergeData['Monthly Amount'],
        Days_Serviced: mergeData['Times per Week'] + 'Week',
        Days_of_Week: mergeData['Days of Week'],
        Fran_Start_Date: mergeData['Start Date'],
        Servicer: spName,
        Cont_First_Name: contactArr[0],
        Cont_Last_Name: contactArr[1],
        B_O_Phone: spPhone,
        PAM: mergeData['PAM'],
        Office_Phone: mergeData['Office Phone'],
        Cnty: mergeData['County'],
        Account_Rep: mergeData['Sales Rep'],
        Main_Phone: mergeData['Office Phone'],
        Actual_sqft: mergeData['Actual Sq Footage'],
        Walktrhough_Date: mergeData['Walkthrough Date'],
        PreCleaning_Date: mergeData['Pre-Clean Date'],
        Yearly: mergeData['Monthly Amount'] * 12,
        Rst_6: mergeData['Restrooms'],
        Supplies: mergeData['CPOP'],
        Monthly: mergeData['Addtl Supplies'],
        MrMs: mergeData['Salutation'],
        Appt_Date: mergeData['Appt, Date'],
        Telemarketer: mergeData['Appt. Set By'],
        Contact_Title: mergeData['Title'],
        Office_Phone_Ext: mergeData['Extension'],
        New_SP_Start_Date: mergeData['New SP Start'],
        PreCleaning_Charge: mergeData['Pre-Clean Charge'],
      }
      Object.keys(mergeURL).forEach((key) => (mergeURL[key] == undefined) && delete mergeURL[key]);

      if (this.props.citySet === 'tampa') { // IF IS IN TAMPA
        if (mergeType === 'Account Acceptance') {
          mergeURL.id = '176851/7cbtgt';
          fileLocation += '/Account acceptance forms/'
        }
        if (mergeType === 'Account Cancelation') {
          mergeURL.id = '176854/gyf26a';
          fileLocation += '/Account Cancelations/'
        }
        if (mergeType === 'Account Credit') {
          mergeURL.id = '176857/9fp8tm';
          fileLocation += '/Account Credits/'
        }
        if (mergeType === 'Account Changes') {
          mergeURL.id = '176858/mw3hec';
          fileLocation += '/Account Changes/'
        }
        if (mergeType === 'Offer Sheet') {
          mergeURL.id = '176861/4cm3qr';
          fileLocation += '/Account Offer Sheets/'
        }
        if (mergeType === 'Account Relinquish') {
          mergeURL.id = '176863/fnavgg';
          fileLocation += '/Account Offer Sheets/Account Relinquish Forms/'
        }
        if (mergeType === 'Account Welcome Letter') {
          mergeURL.id = '176866/veq52p';
          fileLocation += '/Account Welcome Letter/'
        }
        if (mergeType === 'Bid Sheets') {
          let contactArr = mergeData['Main contact'].split(" ");
          mergeURL.id = '176867/7me778';
          fileLocation += '/Bid Sheets/'
        }
        if (mergeType === 'Crew Change') {
          mergeURL.id = '176869/p94ixw';
          fileLocation += '/Crew change request forms/'
        }
        if (mergeType === 'Crew Change Request') {
          mergeURL.id = '176875/g1kj1k';
          fileLocation += '/Crew Changes/'
        }
        if (mergeType === 'Additional Proposal') {
          mergeURL.id = '176852/tw1e77';
          fileLocation += '/Proposal/';
        }
        if (mergeType === 'Additional Order') {
          mergeURL.id = '176853/i7b8m6';
          fileLocation += '/Account Additional Service/'
        }
      } else if (this.props.citySet === 'orlando') { // IF IS IN ORLANDO
        if (mergeType === 'Account Acceptance') {
          mergeURL.id = '176884/i87kfg';
          fileLocation += '/Account Acceptance Forms/'
        }
        if (mergeType === 'Account Cancelation') {
          mergeURL.id = '176886/8jbqkq';
          fileLocation += '/Account Cancelation Forms/'
        }
        if (mergeType === 'Account Credit') {
          mergeURL.id = '176887/1dmywl'
          fileLocation += '/Account Credits/'
        }
        if (mergeType === 'Account Changes') {
          mergeURL.id = '176895/7nb3c3';
          fileLocation += '/Account Increase Decrease Letters/'
        }
        if (mergeType === 'Offer Sheet') {
          mergeURL.id = '176888/i4j16z';
          fileLocation += '/Account Offer Sheets/'
        }
        if (mergeType === 'Account Relinquish') {
          mergeURL.id = '176889/hfxfr4';
          fileLocation += '/Account Relinquish Forms/'
        }
        if (mergeType === 'Account Welcome Letter') {
          mergeURL.id = '176890/m75y2p';
          fileLocation += '/'
        }
        if (mergeType === 'Bid Sheets') {
          let contactArr = mergeData['Main contact'].split(" ");
          mergeURL.id = '176892/z7ddwz';
          fileLocation += '/Bid Sheets/'
        }
        if (mergeType === 'Crew Change') {
          mergeURL.id = '176893/p5tzwq';
          fileLocation += '/Accounting Crew Change Form/'
        }
        if (mergeType === 'Crew Change Request') {
          mergeURL.id = '176894/p5wdbe';
          fileLocation += '/Accounting Crew Change Form/'
        }
        if (mergeType === 'Additional Proposal') {
          mergeURL.id = '176885/qbk4tu';
          fileLocation += '/Proposal/'
        }
        if (mergeType === 'Additional Order') {
          mergeURL.id = '176891/izyjga';
          fileLocation += '/Additional Service Forms/'
        }
      }

      finalURL = mergeURL.base + mergeURL.id + '?_use_get=1&';
      if (mergeURL.Company) {finalURL += 'Company=' + mergeURL.Company;  finalURL += '&';}  else {finalURL += 'Company=+';  finalURL += '&';}
      if (mergeURL.Address_Line_1) {finalURL += 'Address_Line_1=' + mergeURL.Address_Line_1;  finalURL += '&';}  else {finalURL += 'Address_Line_1=+';  finalURL += '&';}
      if (mergeURL.Address_Line_2) {finalURL += 'Address_Line_2=' + mergeURL.Address_Line_2;  finalURL += '&';}  else {finalURL += 'Address_Line_2=+';  finalURL += '&';}
      if (mergeURL.City) {finalURL += 'City=' + mergeURL.City;  finalURL += '&';} else {finalURL += 'City=+';  finalURL += '&';}
      if (mergeURL.Zip_Code) {finalURL += 'Zip_Code=' + mergeURL.Zip_Code;  finalURL += '&';}  else {finalURL += 'Zip_Code=+';  finalURL += '&';}
      if (mergeURL.Days_Serviced) {finalURL += 'Days_Serviced=' + mergeURL.Days_Serviced;  finalURL += '&';} else {finalURL += 'Days_Serviced=+';  finalURL += '&';}
      if (mergeURL.Amount) {finalURL += 'Amount=' + mergeURL.Amount;  finalURL += '&';} else {finalURL += 'Amount=+';  finalURL += '&';}
      if (mergeURL.Days_of_Week) {finalURL += 'Days_of_Week=' + mergeURL.Days_of_Week;  finalURL += '&';}  else {finalURL += 'Days_of_Week=+';  finalURL += '&';}
      if (mergeURL.Fran_Start_Date) {finalURL += 'Fran_Start_Date=' + mergeURL.Fran_Start_Date;  finalURL += '&';} else {finalURL += 'Fran_Start_Date=+';  finalURL += '&';}
      if (mergeURL.Servicer) {finalURL += 'Servicer=' + mergeURL.Servicer;  finalURL += '&';} else {finalURL += 'Servicer=+';  finalURL += '&';}
      if (mergeURL.Cont_First_Name) {finalURL += 'Cont_First_Name=' + mergeURL.Cont_First_Name;  finalURL += '&';}  else {finalURL += 'Cont_First_Name=+';  finalURL += '&';}
      if (mergeURL.Cont_Last_Name) {finalURL += 'Cont_Last_Name=' + mergeURL.Cont_Last_Name;  finalURL += '&';} else {finalURL += 'Cont_Last_Name=+';  finalURL += '&';}
      if (mergeURL.B_O_Phone) {finalURL += 'B_O_Phone=' + mergeURL.B_O_Phone;  finalURL += '&';} else {finalURL += 'B_O_Phone=+';  finalURL += '&';}
      if (mergeURL.PAM) {finalURL += 'PAM=' + mergeURL.PAM;  finalURL += '&';} else {finalURL += 'PAM=+';  finalURL += '&';}
      if (mergeURL.Office_Phone) {finalURL += 'Office_Phone=' + mergeURL.Office_Phone;  finalURL += '&';} else {finalURL += 'Office_Phone=+';  finalURL += '&';}
      if (mergeURL.Cnty) {finalURL += 'Cnty=' + mergeURL.Cnty;  finalURL += '&';} else {finalURL += 'Cnty=+';  finalURL += '&';}
      if (mergeURL.Account_Rep) {finalURL += 'Account_Rep=' + mergeURL.Account_Rep;  finalURL += '&';} else {finalURL += 'Account_Rep=+';  finalURL += '&';}
      if (mergeURL.Main_Phone) {finalURL += 'Main_Phone=' + mergeURL.Main_Phone;  finalURL += '&';} else {finalURL += 'Main_Phone=+';  finalURL += '&';}
      if (mergeURL.Actual_sqft) {finalURL += 'Actual_sqft=' + mergeURL.Actual_sqft;  finalURL += '&';}  else {finalURL += 'Actual_sqft=+';  finalURL += '&';}
      if (mergeURL.Walktrhough_Date) {finalURL += 'Walktrhough_Date=' + mergeURL.Walktrhough_Date;  finalURL += '&';}  else {finalURL += 'Walktrhough_Date=+';  finalURL += '&';}
      if (mergeURL.PreCleaning_Date) {finalURL += 'PreCleaning_Date=' + mergeURL.PreCleaning_Date;  finalURL += '&';}  else {finalURL += 'PreCleaning_Date=+';  finalURL += '&';}
      if (mergeURL.Yearly) {finalURL += 'Yearly=' + mergeURL.Yearly;  finalURL += '&';}  else {finalURL += 'Yearly=+';  finalURL += '&';}
      if (mergeURL.Rst_6) {finalURL += 'Rst_6=' + mergeURL.Rst_6;  finalURL += '&';}  else {finalURL += 'Rst_6=+';  finalURL += '&';}
      if (mergeURL.Supplies) {finalURL += 'Supplies=' + mergeURL.Supplies;  finalURL += '&';}  else {finalURL += 'Supplies=+';  finalURL += '&';}
      if (mergeURL.Monthly) {finalURL += 'Monthly=' + mergeURL.Monthly;  finalURL += '&';}  else {finalURL += 'Monthly=+';  finalURL += '&';}
      if (mergeURL.MrMs) {finalURL += 'MrMs=' + mergeURL.MrMs;  finalURL += '&';}  else {finalURL += 'MrMs=+';  finalURL += '&';}
      if (mergeURL.Appt_Date) {finalURL += 'Appt_Date=' + mergeURL.Appt_Date;  finalURL += '&';}  else {finalURL += 'Appt_Date=+';  finalURL += '&';}
      if (mergeURL.Telemarketer) {finalURL += 'Telemarketer=' + mergeURL.Telemarketer;  finalURL += '&';} else {finalURL += 'Telemarketer=+';  finalURL += '&';}
      if (mergeURL.Contact_Title) {finalURL += 'Contact_Title=' + mergeURL.Contact_Title;  finalURL += '&';} else {finalURL += 'Contact_Title=+';  finalURL += '&';}
      if (mergeURL.Office_Phone_Ext) {finalURL += 'Office_Phone_Ext=' + mergeURL.Office_Phone_Ext;  finalURL += '&';}  else {finalURL += 'Office_Phone_Ext=+';  finalURL += '&';}
      if (mergeURL.New_SP_Start_Date) {finalURL += 'New_SP_Start_Date=' + mergeURL.New_SP_Start_Date;  finalURL += '&';} else {finalURL += 'New_SP_Start_Date=+';  finalURL += '&';}
      if (mergeURL.PreCleaning_Charge) {finalURL += 'PreCleaning_Charge=' + mergeURL.PreCleaning_Charge;  finalURL += '&';} else {finalURL += 'PreCleaning_Charge=+';  finalURL += '&';}

      console.log(encodeURI(finalURL));

      return axios
        .post(finalURL)
        .then(response => {
          this.setState({
            activeModal: false,
            modalType: '',
          })
          let alertStr = mergeType + ' has been exported as ' + mergeData['Company Name'] + ' DATE.docx -- Visit ' + fileLocation + ' to view the file.';
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

          this.setState({
            currentRecord: currentRecordState,
            recordChanges: true,
            isExporting: true,
          })
          setTimeout((function() {
            this.saveRecordHandler();
          }).bind(this), 250);
        })
    }
  }

  submitExport = e => {
    e.preventDefault();
    let startRange;
    let endRange;
    let exportType;
    let exportFields;
    let exportFilter;
    let urlExtends;
    let downloadNow = 0;

    let today  = new Date();
    let currentMonth = today.getMonth()
    let currentDay = today.getDate()
    let currentYear = today.getFullYear()

    setTimeout((function() {
      let formattedCity = this.props.citySet.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      let exportFileName = formattedCity + ' ' + this.state.currentTable + ' - ' + document.getElementById('rangeBy').value + ' ' + currentMonth + '_' + currentDay + '_' + currentYear;
      console.log(exportFileName);

      startRange = document.getElementById('startRange').getElementsByClassName('month')[0].value + '/' + document.getElementById('startRange').getElementsByClassName('day')[0].value + '/' + document.getElementById('startRange').getElementsByClassName('year')[0].value;
      endRange = document.getElementById('endRange').getElementsByClassName('month')[0].value + '/' + document.getElementById('endRange').getElementsByClassName('day')[0].value + '/' + document.getElementById('endRange').getElementsByClassName('year')[0].value;

      exportType = document.getElementById('rangeBy').options[document.getElementById('rangeBy').options.selectedIndex].getAttribute('data-filter-type');
      exportFields = document.getElementById('rangeBy').options[document.getElementById('rangeBy').options.selectedIndex].getAttribute('data-fields');
      exportFilter = {'filter1': document.getElementById('rangeBy').options[document.getElementById('rangeBy').options.selectedIndex].getAttribute('data-filter-1')};

      if (exportType === 'multi') {
        exportFilter.filter2 = document.getElementById('rangeBy').options[document.getElementById('rangeBy').options.selectedIndex].getAttribute('data-filter-2');
        exportFilter.filter3 = document.getElementById('rangeBy').options[document.getElementById('rangeBy').options.selectedIndex].getAttribute('data-filter-3');
      }

      this.setState({
        loading: true,
        dataOffset: '',
        data: [],
      });

      setTimeout((function() {
        let loadAllData = setInterval(function() {
          let preData = this.state.data;
          finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;

          if (this.state.dataOffset !== '') {finalURL = finalURL + '?offset=' + this.state.dataOffset + '&' + exportFields;}
          else {finalURL = finalURL + '?' + exportFields}

          if (exportType === 'multi') {
            finalURL = finalURL + '&filterByFormula=OR(IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter2 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter3 + '%7D%2C+%22' + startRange + '%22))';
          } else if (exportType === 'ranged') {
            finalURL = finalURL + '&filterByFormula=AND(OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22))%2C+OR(IS_SAME(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22)))';
          } else if (exportType === 'default') {
            finalURL = finalURL + '&filterByFormula=(' + exportFilter.filter1 + ')';
          }
          console.log(finalURL);
          return axios
            .get(finalURL)
            .then(response => {
              this.setState({
                data: preData.concat(response.data.records),
                totalLoads: this.state.totalLoads + 1,
                error: false,
                dataOffset: response.data.offset,
              });
              console.log(response.data.offset);
            }).catch(error => {
              downloadNow ++;
              clearInterval(loadAllData);
              if (downloadNow === 1) {
                console.log(this.state.data);
                this.setState({
                  dataOffset: '',
                });
                setTimeout((function() {
                  let items = this.state.data;

                  let newItems = items.map(obj =>{
                    let newItems = obj.fields;
                    // newItems.id = obj.id
                     return newItems;
                  });


                  const replacer = (key, value) => value === null ? '' : value
                  const header = Object.keys(newItems[0])
                  let csv = newItems.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
                  csv.unshift(header.join(','))
                  csv = csv.join('\r\n')


                  var fakeDownloadA = document.createElement('a');
                  fakeDownloadA.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                  fakeDownloadA.setAttribute('download', exportFileName + '.csv');

                  fakeDownloadA.style.display = 'none';
                  document.body.appendChild(fakeDownloadA);

                  fakeDownloadA.click();

                  document.body.removeChild(fakeDownloadA);

                }).bind(this), 200);


                setTimeout((function() {
                  this.loadData();
                  this.setState({
                    loading: false,
                    activeModal: false,
                    modalType: '',
                  });
                }).bind(this), 200);
              }
            });
        }.bind(this), 350);
      }).bind(this), 100);
    }).bind(this), 50);
  }



  viewSelect = e => {
    console.log(e.target.value);
    if (e.target.value !== 'default') {
      let selectedView = e.target.value;
      sessionStorage.setItem('serviceView', selectedView);
      this.setState({
        currentRecordView: sessionStorage.getItem('serviceView')
      });
    } else {
      sessionStorage.removeItem('serviceView');
      this.setState({
        currentRecordView: 'default'
      });
    }
    // window.location.reload();
  }

  loadData = () => {
    if (window.history.length > 2) {
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
    } else {
      this.setState({
        loading: true
      });

    }

    //initial load
    setTimeout((function() {
      console.log('loading');
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
      return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          data: response.data.records,
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
          this.setState({
            loadingMore: false,
          });

          if (this.state.recordView) {
            document.title = this.state.currentRecord['Company Name'] + " | AirMagic"
          } else {
            document.title = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Customers | AirMagic";
          }

          //keep going if we we're on 100+ internally
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
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    } else {
      if (localStorage.getItem('userInitials') === 'JETT') {
        this.props.history.push('/jett/');
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


      if (sessionStorage.getItem('serviceView')) {
        this.setState({
          currentRecordView: sessionStorage.getItem('serviceView')
        });
      } else {
        this.setState({
          currentRecordView: 'default'
        });
      }

      if (sessionStorage.getItem('tampaSPLoaded') !== true) {
        this.loadSPList();
      } else {
        this.setState({
          spList: sessionStorage.getItem('tampaSPList')
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
      if (keyName === 'Escape' && this.state.activeModal) {
        this.controlsModalToggle();
      } else {
        if (keyName === 'Escape' && this.state.recordView) {
          this.closeRecordHandler();
        }
      }
    });


    return (
      <div className="Customers">
        {this.modalShow}
        <Navbar
          currentRecord={this.state.currentRecord}
          recordView={this.state.recordView}
          closeRecordHandler={this.closeRecordHandler}
          currentId= {this.state.currentId}
          recordChanges= {this.state.recordChanges}
          switchTableHandler= {this.switchTableHandler}
          controlsModalToggle={this.controlsModalToggle}
          citySet={this.props.citySet}
          currentRecordView={this.state.currentRecordView}
          viewSelect={this.viewSelect}
        />

        {this.currentView}

        <ControlsBar
          searchHandler={this.searchHandler}
          recordView={this.state.recordView}
          franchiseView={this.state.franchiseView}
          newRecord={this.state.newRecord}
          saveRecordHandler={this.saveRecordHandler}
          recordChanger={this.recordChanger}
          controlsModalToggle={this.controlsModalToggle}
          newRecordHandler={this.newRecordHandler}
          currentRecord={this.state.currentRecord}
          currentTable={this.state.currentTable}
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
          mergeRecord={this.mergeRecord}
          controlsModalToggle={this.controlsModalToggle}
          sortSubmitHandler={this.sortSubmitHandler}
          currentId= {this.state.currentId}
          userName={this.state.userName}
          saveNoteHandler = {this.saveNoteHandler}
          userChangeHandler={this.userChangeHandler}
          userSubmitHandler={this.userSubmitHandler}
          submitExport={this.submitExport}
          exportRecord={this.exportRecord}
          currentTable={this.state.currentTable}
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
            spChangeHandler={this.spChangeHandler}
            currentSP={this.state.currentSP}
            spList={this.state.spList}
            loadSPInfo={this.loadSPInfo}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            currentRecordView={this.state.currentRecordView}
            noteCharacters={this.state.noteCharacters}
          />
        );
      } else if (this.state.currentRecordView === 'accounting') {
        return (
          <AccountingView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            spChangeHandler={this.spChangeHandler}
            currentSP={this.state.currentSP}
            spList={this.state.spList}
            loadSPInfo={this.loadSPInfo}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            currentRecordView={this.state.currentRecordView}
            noteCharacters={this.state.noteCharacters}
          />
        );
      } else if (this.state.currentRecordView === 'crews') {
        return (
          <CrewsView
            isLoading={this.state.loading}
            controlsModalToggle={this.controlsModalToggle}
            currentId={this.state.currentId}
            recordChanges= {this.state.recordChanges}
            currentRecord={this.state.currentRecord}
            changeRecordHandler={this.changeRecordHandler}
            recordChanger={this.recordChanger}
            changeNotesHandler={this.changeNotesHandler}
            baseId={this.state.baseId}
            spChangeHandler={this.spChangeHandler}
            currentSP={this.state.currentSP}
            spList={this.state.spList}
            loadSPInfo={this.loadSPInfo}
            currentRecordView={this.state.currentRecordView}
            viewSelect={this.viewSelect}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            currentRecordView={this.state.currentRecordView}
            noteCharacters={this.state.noteCharacters}
          />
        );
      }
    } else if (this.state.franchiseView) {
      return (
        <FranchiseView
          data={this.state.data}
          isLoading={this.state.loading}
          changeFranchiseHandler={this.changeFranchiseHandler}
          editingFranchise={this.editingFranchise}
        />
      );
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
