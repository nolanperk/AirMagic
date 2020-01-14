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
import ListContent from './Archive/ListContent';
import ControlsBar from '../Globals/ControlsBar';
import ModalView from '../Globals/ModalView';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];
let fallbackRecordIndex;
let keyChangeDirection = '';
let finalURL;

export default class Franchisees extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: '',
      currentTable: 'Franchisees',
      listView: 'view=Active',
      sortByLabel: 'SP+Name',
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
      newRecord: false,
      listIsVisible: props.recordId == null,
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
        baseId: 'appBsaVxz2OicG5Zw',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        loading: false,
        baseId: 'appLxxBrc9m3yNXdQ',
      });
    }
    setTimeout((function() {
      console.log('loading data from ' + this.state.baseId);
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
    console.log(day);
    currentRecordState = this.state.currentRecord;
    let newSelectedDay = new Date(day);
    let finalDate = (newSelectedDay.getMonth() + 1) + '/' + newSelectedDay.getDate() + '/' + newSelectedDay.getFullYear();

    if (this.state.pickerId === 'graduation') {currentRecordState['Graduation Date'] = finalDate}
    else if (this.state.pickerId === 'contDate') {currentRecordState['Contact Date'] = finalDate}
    else if (this.state.pickerId === 'activeDate') {currentRecordState['Active Date'] = finalDate}
    else if (this.state.pickerId === 'inactiveDate') {currentRecordState['Inactive Date'] = finalDate}
    else if (this.state.pickerId === 'apptDate') {currentRecordState['Appt. Date'] = finalDate}
    else if (this.state.pickerId === 'fdd') {currentRecordState['FDD Sign Date'] = finalDate}
    else if (this.state.pickerId === 'sign') {currentRecordState['Sign Date'] = finalDate}

    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })

    setTimeout((function() {
      console.log(currentRecordState['Appt. Date'])
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
    this.props.history.push('/' + this.props.citySet + '/franchisees/' + key);
  }

  newRecordHandler = ()  => {
    currentRecordState = {
      'SP Name': 'New Franchisee',
      'Number': '00-0000',
      'Company Name': null,
      'EIN': null,
      'Volume Due Date': null,
      'Languages': null,
      'Home Phone': null,
      'Cellphone': null,
      'Email': null,
      'Partner Name': null,
      'Partner Phone': null,
      'English Contact': null,
      'English Contact Phone': null,
      'Veteran': null,
      'English Contact Email': null,
      'Contact Date': null,
      'FDD Sign Date': null,
      'Sign Date': null,
      'Graduation Date': null,
      '$ Down': null,
      'Address': null,
      'City': null,
      'Zip': null,
      'State': null,
      'County': null,
      'Source': null,
      'Additional Revenue': null,
      'Coverage Area': null,
      'Appt. Date': null,
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
    if (e.target.id === 'source') {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Source'] = e.target.value;

      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
      })
    } else {
      currentRecordState = this.state.currentRecord;
      currentRecordState['Notes'] = e.target.value;

      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
      })
    }
  }

  calcVolume = e => {
    currentRecordState = this.state.currentRecord;
    let targetInput = e.target.closest(".inputWithTag").childNodes[1];
    let gradDate = new Date(this.state.currentRecord['Graduation Date']);
    let planType = document.getElementById('planSelect').value;
    let dayCount;
    let finalDate;
    if (planType === 'Plan A' || planType === 'Plan B' || planType === 'Plan C') {
      dayCount = 120;
    } else if (planType === 'Plan D' || planType === 'Plan E') {
      dayCount = 180;
    } else {
      dayCount = 210;
    }

    gradDate.setDate(gradDate.getDate() + dayCount);
    finalDate = new Date(gradDate);
    let volumeDueDate = (finalDate.getMonth()+1) + '/' + finalDate.getDate() + '/' + finalDate.getFullYear();

    currentRecordState['Volume Due Date'] = volumeDueDate;
    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })
  }



  updateOwed = e => {
    currentRecordState = this.state.currentRecord;

    let sign = currentRecordState['Sign Date'];
    let dateSigned = new Date(sign);
    let checkDate = new Date('04/01/2018');

    let planRevType;
    if (dateSigned <= checkDate) {
      planRevType = 'old';
    } else {
      planRevType = 'new';
    }

    let planRev;
    if (planRevType === 'new') {
      if (currentRecordState['Plan Type'] === 'Plan A') {
        planRev = 2000;
      } else if (currentRecordState['Plan Type'] === 'Plan B') {
        planRev = 3000;
      } else if (currentRecordState['Plan Type'] === 'Plan C') {
        planRev = 4000;
      } else if (currentRecordState['Plan Type'] === 'Plan D') {
        planRev = 5000;
      } else if (currentRecordState['Plan Type'] === 'Plan E') {
        planRev = 6000;
      } else if (currentRecordState['Plan Type'] === 'Plan F') {
        planRev = 8000;
      } else if (currentRecordState['Plan Type'] === 'Plan G') {
        planRev = 10000;
      } else {
        planRev= 0;
      }
    } else {
      if (currentRecordState['Plan Type'] === 'Plan A') {
        planRev = 1000;
      } else if (currentRecordState['Plan Type'] === 'Plan B') {
        planRev = 1500;
      } else if (currentRecordState['Plan Type'] === 'Plan C') {
        planRev = 2000;
      } else if (currentRecordState['Plan Type'] === 'Plan D') {
        planRev = 3000;
      } else if (currentRecordState['Plan Type'] === 'Plan E') {
        planRev = 4000;
      } else if (currentRecordState['Plan Type'] === 'Plan F') {
        planRev = 5000;
      } else if (currentRecordState['Plan Type'] === 'Plan G') {
        planRev = 6000;
      } else {
        planRev= 0;
      }
    }

    let ipDue = 0; let arDue = 0; let rpDue = 0; let aaCharge = 0;
    let ipLine; let rpLine; let aaLine; let ipAr;

    if (document.getElementById('ipOwed')) {
      ipLine = document.getElementById('ipOwed').innerText;
      ipAr = parseInt(ipLine.split('$')[1]);
    }
    if (document.getElementById('rpOwed')) {
      rpLine = document.getElementById('rpOwed').innerText;
      rpDue = parseInt(rpLine.split('$')[1]);
    }
    if (document.getElementById('aaOwed')) {
      aaLine = document.getElementById('aaOwed').innerText;
      aaCharge = parseInt(aaLine.split('$')[1]);
    }

    let allOwed = ipAr + rpDue;


    // if (ipAr < 1) {
    //   arDue = 0;
    //   ipDue = 0;
    // } else {
    //   if (ipAr < planRev) {
    //     ipDue = 0;
    //     arDue = ipAr - planRev;
    //
    //     if (arDue < 0) {
    //       arDue = 0;
    //     }
    //   }
    // }
    currentRecordState['Owed'] = allOwed.toString();
    currentRecordState['Chargeable'] = aaCharge.toString();
    this.setState({
      currentRecord: currentRecordState,
      recordChanges: true,
    })
  }

  changeRecordHandler = e => {
    currentRecordState = this.state.currentRecord;

    if (e.target.id === 'spName') {currentRecordState['SP Name'] = e.target.value}
    else if (e.target.id === 'company') {currentRecordState['Company Name'] = e.target.value}
    else if (e.target.id === 'ein') {currentRecordState['EIN'] = e.target.value}
    else if (e.target.id === 'volumeDate') {currentRecordState['Volume Due Date'] = e.target.value}
    else if (e.target.id === 'language') {currentRecordState['Languages'] = e.target.value}
    else if (e.target.id === 'home') {currentRecordState['Home Phone'] = e.target.value}
    else if (e.target.id === 'cell') {currentRecordState['Cellphone'] = e.target.value}
    else if (e.target.id === 'email') {currentRecordState['Email'] = e.target.value}
    else if (e.target.id === 'partner') {currentRecordState['Partner Name'] = e.target.value}
    else if (e.target.id === 'partnerPhone') {currentRecordState['Partner Phone'] = e.target.value}
    else if (e.target.id === 'english') {currentRecordState['English Contact'] = e.target.value}
    else if (e.target.id === 'englishPhone') {currentRecordState['English Contact Phone'] = e.target.value}
    else if (e.target.id === 'veteran') {currentRecordState['Veteran'] = e.target.value}
    else if (e.target.id === 'englishEmail') {currentRecordState['English Contact Email'] = e.target.value}
    else if (e.target.id === 'contDate') {currentRecordState['Contact Date'] = e.target.value}
    else if (e.target.id === 'activeDate') {currentRecordState['Active Date'] = e.target.value}
    else if (e.target.id === 'inactiveDate') {currentRecordState['Inactive Date'] = e.target.value}
    else if (e.target.id === 'fdd') {currentRecordState['FDD Sign Date'] = e.target.value}
    else if (e.target.id === 'sign') {currentRecordState['Sign Date'] = e.target.value}
    else if (e.target.id === 'graduation') {currentRecordState['Graduation Date'] = e.target.value}
    else if (e.target.id === 'downPayment') {currentRecordState['$ Down'] = e.target.value}
    else if (e.target.id === 'addr1') {currentRecordState['Address'] = e.target.value}
    else if (e.target.id === 'city') {currentRecordState['City'] = e.target.value}
    else if (e.target.id === 'zip') {currentRecordState['Zip'] = e.target.value}
    else if (e.target.id === 'spNumber') {currentRecordState['Number'] = e.target.value}
    else if (e.target.id === 'state') {currentRecordState['State'] = e.target.value}
    else if (e.target.id === 'county') {currentRecordState['County'] = e.target.value}
    else if (e.target.id === 'source') {currentRecordState['Source'] = e.target.value}
    else if (e.target.id === 'ar') {currentRecordState['Additional Revenue'] = e.target.value}
    else if (e.target.id === 'area') {currentRecordState['Coverage Area'] = e.target.value}

    else if (e.target.id === 'volOwed') {currentRecordState['Owed'] = e.target.value}
    else if (e.target.id === 'aaCharge') {currentRecordState['AA Charge'] = e.target.value}

    else if (e.target.id === 'apptTime') {currentRecordState['Appt. Time'] = e.target.value}
    else if (e.target.id === 'apptDate') {currentRecordState['Appt. Date'] = e.target.value}



    this.setState({
      currentRecord: currentRecordState,
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
      this.props.history.push('/' + this.props.citySet + '/franchisees/');
      this.setState({
          activeModal: false,
          modalType: '',
          recordView: false,
          newRecord: false,
      });
    }
  }


  repChange = e => {
    let currentsRec = this.state.currentRecord;
    currentsRec['Sales Rep'] = e.target.value;
    this.setState({
      currentRecord: currentsRec,
    });
  }

  recordChanger = e => {
    dataIndex = this.state.data.findIndex(obj => obj.id == this.props.recordId);
    fallbackRecordIndex = parseInt(this.state.currentRecordIndex.toString());


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

          this.props.history.push('/' + this.props.citySet + '/franchisees/' + this.state.data[dataIndex].id);

          setTimeout((function() {
            this.setState({
              loading: false,
            });

            setTimeout((function() {
              document.title = this.state.currentRecord['SP Name'] + " | AirMagic"
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

            this.props.history.push('/' + this.props.citySet + '/franchisees/' + this.state.data[dataIndex].id);
          } else {
            // fullDataSet[dataIndex].fields = this.state.fallbackRecord
            this.props.history.push('/' + this.props.citySet + '/franchisees/');
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
      fullDataSet['Status'] = document.getElementById('statusSelect').value;
      fullDataSet['Franchise Level'] = document.getElementById('levelSelect').value;
      fullDataSet['Plan Type'] = document.getElementById('planSelect').value;
      fullDataSet['Packet Sent'] = document.getElementById('packetSelect').value;
      fullDataSet['Attended'] = document.getElementById('attendedSelect').value;
      fullDataSet['Standing'] = document.getElementById('standingSelect').value;
      fullDataSet['Additional Revenue'] = document.getElementById('arSelect').value;

      fullDataSet['Account Capacity'] = document.getElementById('perCapacitySelect').value;
      fullDataSet['Monthly Capacity'] = document.getElementById('monthlyCapacitySelect').value;
      fullDataSet['Looking for More'] = document.getElementById('lookingSelect').value;
      // fullDataSet['Carpets'] = document.getElementById('carpetsSelect').value;
      // fullDataSet['Strip and Wax'] = document.getElementById('sWaxSelect').value;
      // fullDataSet['Buffing'] = document.getElementById('buffingSelect').value;
      // fullDataSet['Tile'] = document.getElementById('tilesSelect').value;

      let officePhone = this.state.currentRecord["Home Phone"];
      if (officePhone) {
        officePhone = parseInt(officePhone.replace( /\D+/g, ''));
        let s2 = (""+officePhone).replace(/\D/g, '');
        let formattedNumber = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalNumber;
        if (formattedNumber) {
          finalNumber = "(" + formattedNumber[1] + ") " + formattedNumber[2] + "-" + formattedNumber[3];;
          this.state.currentRecord["Home Phone"] = finalNumber;
        }
      }

      let cellPhone = this.state.currentRecord["Cellphone"];
      if (cellPhone) {
        cellPhone = parseInt(cellPhone.replace( /\D+/g, ''));
        let cell2 = (""+cellPhone).replace(/\D/g, '');
        let formCellPhone = cell2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalCellNumber;
        if (formCellPhone) {
          finalCellNumber = "(" + formCellPhone[1] + ") " + formCellPhone[2] + "-" + formCellPhone[3];;
          this.state.currentRecord["Cellphone"] = finalCellNumber;
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
        setTimeout((function() {
          this.props.history.push('/' + this.props.citySet + '/franchisees/' + response.data.id);
        }).bind(this), 10);
      })
      .catch(response => {
        console.error("error: ", response);
      });
    } else {
      let fullDataSet = this.state.data;
      let pushRecordId;
      let pushRecord;

      pushRecord = this.state.currentRecord;
      if (this.state.currentTable === 'Franchisees') {
        pushRecordId = this.props.recordId;
      } else {
        pushRecordId = this.state.currentId;
      }
      pushRecord['Status'] = document.getElementById('statusSelect').value;
      pushRecord['Franchise Level'] = document.getElementById('levelSelect').value;
      pushRecord['Plan Type'] = document.getElementById('planSelect').value;
      pushRecord['Packet Sent'] = document.getElementById('packetSelect').value;
      pushRecord['Attended'] = document.getElementById('attendedSelect').value;
      pushRecord['Standing'] = document.getElementById('standingSelect').value;
      pushRecord['Additional Revenue'] = document.getElementById('arSelect').value;

      pushRecord['Account Capacity'] = document.getElementById('perCapacitySelect').value;
      pushRecord['Monthly Capacity'] = document.getElementById('monthlyCapacitySelect').value;
      pushRecord['Looking for More'] = document.getElementById('lookingSelect').value;
      // pushRecord['Carpets'] = document.getElementById('carpetsSelect').value;
      // pushRecord['Strip and Wax'] = document.getElementById('sWaxSelect').value;
      // pushRecord['Buffing'] = document.getElementById('buffingSelect').value;
      // pushRecord['Tile'] = document.getElementById('tilesSelect').value;



      let officePhone = this.state.currentRecord["Home Phone"];
      if (officePhone) {
        officePhone = parseInt(officePhone.replace( /\D+/g, ''));
        let s2 = (""+officePhone).replace(/\D/g, '');
        let formattedNumber = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalNumber;
        if (formattedNumber) {
          finalNumber = "(" + formattedNumber[1] + ") " + formattedNumber[2] + "-" + formattedNumber[3];;
          this.state.currentRecord["Home Phone"] = finalNumber;
        }
      }

      let cellPhone = this.state.currentRecord["Cellphone"];
      if (cellPhone) {
        cellPhone = parseInt(cellPhone.replace( /\D+/g, ''));
        let cell2 = (""+cellPhone).replace(/\D/g, '');
        let formCellPhone = cell2.match(/^(\d{3})(\d{3})(\d{4})$/);
        let finalCellNumber;
        if (formCellPhone) {
          finalCellNumber = "(" + formCellPhone[1] + ") " + formCellPhone[2] + "-" + formCellPhone[3];;
          this.state.currentRecord["Cellphone"] = finalCellNumber;
        }
      }

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
            this.props.history.push('/' + this.props.citySet + '/franchisees/' + this.state.data[dataIndex].id);
          } else {
            if (this.state.modalType === 'saveAlert') {
              this.props.history.push('/' + this.props.citySet + '/franchisees/');
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
        }
      })
      .catch(response => {
        console.error("error: ", response);
        // alert('******************************************************There was an error saving the record. Do not leave the page. Please get Nolan to take a look.******************************************************')
      });
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

    let mergeTemp = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-merge');
    let mergeType = document.getElementById('mergeTemplates').options[document.getElementById('mergeTemplates').options.selectedIndex].getAttribute('data-type');
    let mergeURL;
    let finalURL;

    if (mergeTemp !== 'none') {
      let mergeData = this.state.currentRecord;

      if (mergeType === 'Franchise Exports') {
        mergeURL = {base: 'https://www.webmerge.me/merge/', id: '', Mr_Ms: '', Cont_First_Name: '', Cont_Last_Name: '', Contact_Title: '', Company: '', Address: '', Address_Line_2: '', City: '', Zip_Code: '', Amount: '', Days_Serviced: '', Proposal_Date: ''}

        if (mergeTemp === 'franchise-customer-service') {mergeURL.id = '178012/zkvdiy';}
        if (mergeTemp === 'level-5') {mergeURL.id = '178015/cxxm1m';}
        if (mergeTemp === 'course-completion') {mergeURL.id = '178016/889yt9';}

        let contactArr = mergeData['SP Name'].split(" ");
        mergeURL.Mr_Ms = mergeData['Salutation'];
        mergeURL.SP_Name = mergeData['SP Name'];
        mergeURL.First_Name = contactArr[0];
        mergeURL.Last_Name = contactArr[1];
        mergeURL.Address = mergeData['Address'];
        mergeURL.City = mergeData['City'];
        mergeURL['Zip'] = mergeData['Zip'];

        Object.keys(mergeURL).forEach((key) => (mergeURL[key] == undefined) && delete mergeURL[key]);

        finalURL = mergeURL.base + mergeURL.id + '?_use_get=1&';
        if (mergeURL.Mr_Ms) {finalURL += 'Mr_Ms=' + mergeURL.Mr_Ms;  finalURL += '&';} else {finalURL += 'Mr_Ms=+';  finalURL += '&';}
        if (mergeURL.SP_Name) {finalURL += 'SP_Name=' + mergeURL.SP_Name;  finalURL += '&';}  else {finalURL += 'SP_Name=+';  finalURL += '&';}
        if (mergeURL.First_Name) {finalURL += 'First_Name=' + mergeURL.First_Name;  finalURL += '&';}  else {finalURL += 'First_Name=+';  finalURL += '&';}
        if (mergeURL.Address) {finalURL += 'Address=' + mergeURL.Address;  finalURL += '&';}  else {finalURL += 'Address=+';  finalURL += '&';}
        if (mergeURL.City) {finalURL += 'City=' + mergeURL.City;  finalURL += '&';} else {finalURL += 'City=+';  finalURL += '&';}
        if (mergeURL['Zip']) {finalURL += 'Zip=' + mergeURL['Zip'];  finalURL += '&';}  else {finalURL += 'Zip=+';  finalURL += '&';}
      }

      console.log(encodeURI(finalURL));

      return axios
        .post(finalURL)
        .then(response => {
          this.setState({
            activeModal: false,
            modalType: '',
          })
          alert('Record has been exported as ' + mergeData['SP Name'] + ' DATE' + '.docx -- Visit "Dropbox/rmilanes/' + mergeType + '" to view the file.');

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

  changeCheckHandler = e => {
    let currentsRec = this.state.currentRecord;

    if (currentsRec['Veteran'] === true) {
      currentsRec['Veteran'] = false;
    } else {
      currentsRec['Veteran'] = true;
    }
    this.setState({
      currentRecord: currentsRec,
    });
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
          finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder;
        }
      }
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
        if (this.state.sortByLabel !== 'SP+Name') {
          document.getElementById('sortBtn').className='ControlsBar--btn isActive';
          document.getElementById('sortBtn').getElementsByTagName('p')[0].innerHTML='Sorted';
        }
        setTimeout((function() {
          this.setState({
            loadingMore: false,
          });

          if (this.state.recordView) {
            document.title = this.state.currentRecord['SP Name'] + " | AirMagic"
          } else {
            document.title = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Franchisees | AirMagic";
          }

          //keep going if we were on 100+ internally
          if (sessionStorage.getItem('innerOffset') != null) {
            this.setState({
              loading: true,
            });
            let savedOffset = sessionStorage.getItem('innerOffset').split('/')[1];
            console.log(savedOffset);

            let exitChangerLoadMore = setInterval(function() {
              if (this.state.dataOffset) {
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
                      finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder;
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
              } else {
                clearInterval(exitChangerLoadMore);

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
      loading: true,
      dataOffset: '',
    });
    sessionStorage.removeItem('searchQuery');
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
          //focus the new note box better
          let textarea = document.getElementById('newNoteBox'),
          val = textarea.value;
          textarea.focus();textarea.value = '';textarea.value = val;
        }).bind(this), 100);
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
      } else if (e.target.id === 'setMeeting') {
        this.setState({
          activeModal: true,
          modalType: 'setMeeting',
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
            document.getElementById('sortLabel').value = document.getElementById(this.state.sortByLabel).innerHTML;
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
        finalURL = finalURL + 'sort%5B0%5D%5Bfield%5D=' + this.state.sortByLabel + '&sort%5B0%5D%5Bdirection%5D=' + this.state.sortByOrder;
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
      this.loadData();

      if (localStorage.getItem('userInitials')) {
        let usersInitials = localStorage.getItem('userInitials');
        this.setState({
          userName: usersInitials,
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
      <div className="Franchisees">
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
          currentRecord={this.state.currentRecord}
          exportRecord={this.exportRecord}
          baseId={this.state.baseId}
          currentTable={this.state.currentTable}
        />
        )
    }
  }

  get currentView() {
    if (this.state.recordView) {
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
          calcVolume={this.calcVolume}
          toggleDayPicker={this.toggleDayPicker}
          handleDayClick={this.handleDayClick}
          toggleDayPicker={this.toggleDayPicker}
          currentRecordView={this.state.currentRecordView}
          updateOwed={this.updateOwed}
          changeCheckHandler={this.changeCheckHandler}
          repChange={this.repChange}
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
