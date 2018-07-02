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
import ControlsBar from './ControlsBar';
import ModalView from './ModalView';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];
let fallbackRecordIndex;
let keyChangeDirection = '';
let finalURL;

export default class TampaSales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: 'appBsaVxz2OicG5Zw',
      currentTable: 'Franchisees',
      listView: '',
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
    if (this.state.loading && !nextState.loading && this.props.recordId != null) {
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
        finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + this.props.recordId;;
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


  searchHandler = e => {
    e.preventDefault();
    let searchBy = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id;
    let searchByValue = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

    this.setState({
      searchQuery: document.getElementById('searchInput').value,
      loading: true,
    });

    setTimeout((function() {
      let capitalizedQuery = this.state.searchQuery.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      finalURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable;
      if (this.state.listView !== '') {
        finalURL = finalURL + '?' + this.state.listView;

        finalURL = finalURL + '&filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2C%7B' + searchBy + '%7D))';
      } else {
        finalURL = finalURL + '?filterByFormula=(FIND(%22' + capitalizedQuery + '%22%2C%7B' + searchBy + '%7D))';
      }
      console.log(finalURL);

      return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          data: response.data.records,
          loading: false,
          error: false,
          dataOffset: '',
        });
        setTimeout((function() {
          document.getElementById('searchInput').value = capitalizedQuery;
          document.getElementById('searchBy').value = searchByValue;
        }).bind(this), 50);
      })

    }).bind(this), 50);
  }

  openRecordHandler = (e, key, index)  => {
    this.props.history.push('/tampa/franchisees/' + key);
  }

  newRecordHandler = ()  => {
    currentRecordState = {
      'SP Name': 'New Franchisee',
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
      'Contact Date': null,
      'FDD Sign Date': null,
      'Sign Date': null,
      'Graduation Date': null,
      '$ Down': null,
      'Address 1': null,
      'Address 2': null,
      'City': null,
      'Zip': null,
      'State': null,
      'County': null,
      'Source': null,
      'Company Name': 'New Company',
      'Industry': null,
      'Times Called': null,
      'Recent Call Date': null,
      'Callback Date': null,
      'Website': null,
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

      this.setState({
        currentRecord: currentRecordState,
        recordChanges: true,
      })
    }
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
    else if (e.target.id === 'contDate') {currentRecordState['Contact Date'] = e.target.value}
    else if (e.target.id === 'fdd') {currentRecordState['FDD Sign Date'] = e.target.value}
    else if (e.target.id === 'sign') {currentRecordState['Sign Date'] = e.target.value}
    else if (e.target.id === 'graduation') {currentRecordState['Graduation Date'] = e.target.value}
    else if (e.target.id === 'downPayment') {currentRecordState['$ Down'] = e.target.value}
    else if (e.target.id === 'addr1') {currentRecordState['Address 1'] = e.target.value}
    else if (e.target.id === 'addr2') {currentRecordState['Address 2'] = e.target.value}
    else if (e.target.id === 'city') {currentRecordState['City'] = e.target.value}
    else if (e.target.id === 'zip') {currentRecordState['Zip'] = e.target.value}
    else if (e.target.id === 'state') {currentRecordState['State'] = e.target.value}
    else if (e.target.id === 'county') {currentRecordState['County'] = e.target.value}
    else if (e.target.id === 'source') {currentRecordState['Source'] = e.target.value}
    else if (e.target.id === 'ar') {currentRecordState['Additional Revenue'] = e.target.value}



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
      this.props.history.push('/tampa/franchisees/');
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

    if (e.target.closest(".ControlsBar--btn").id === 'prev') {
      if (dataIndex !== 0) {
        dataIndex --;
      }
    } else if (e.target.closest(".ControlsBar--btn").id === 'next') {
      dataIndex ++;
    }

    if (this.state.recordChanges) {
      this.setState({
        activeModal: true,
        modalType: 'saveAlert',
        recordChanger: true,
        currentId: this.props.recordId,
      });
    } else {
      this.setState({
        loading: true,
      });

      this.props.history.push('/tampa/franchisees/' + this.state.data[dataIndex].id);

      setTimeout((function() {
        // this.setState({
        //   loading: false,
        // });

        //this is not ideal, but it fixes the select boxes from having issues!
        window.location.reload();
      }).bind(this), 10);
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
            fullDataSet[fallbackRecordIndex].fields = this.state.fallbackRecord;
            this.props.history.push('/tampa/franchisees/' + this.state.data[dataIndex].id);
            this.setState({
              data: fullDataSet,
              recordChanger: false,
              activeModal: false,
              modalType: '',
              recordChanges: false,
            });

          } else {
            // fullDataSet[dataIndex].fields = this.state.fallbackRecord
            this.props.history.push('/tampa/franchisees/');
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
          data: this.state.data.push(response),
          activeModal: false,
          modalType: '',
          newRecord: false,
          currentRecord: [],
          recordChanges: false,
        });
      })
      .catch(response => {
        console.error("error: ", response);
      });
    } else {
      let fullDataSet = this.state.data;
      let pushRecordId;
      let pushRecord;
      if (this.state.recordChanger) {
        pushRecord = fullDataSet[fallbackRecordIndex].fields
        pushRecordId = fullDataSet[fallbackRecordIndex].id
      } else {
        pushRecord = this.state.currentRecord;
        if (this.state.currentTable === 'Franchisees') {
          pushRecordId = this.props.recordId;
        } else {
          pushRecordId = this.state.currentId;
        }
      }
      pushRecord['Status'] = document.getElementById('statusSelect').value;
      pushRecord['Franchise Level'] = document.getElementById('levelSelect').value;
      pushRecord['Plan Type'] = document.getElementById('planSelect').value;


      let finalPush = {"fields": pushRecord}
      axios
      .put(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + pushRecordId, finalPush)
        .then(response => {
        if (this.state.activeModal) {
          this.setState({
            loading: true,
          })
          if (this.state.recordChanger) {
            this.props.history.push('/tampa/franchisees/' + this.state.data[dataIndex].id);
            setTimeout((function() {
              this.setState({
                recordChanger: false,
                activeModal: false,
                recordChanges: false,
                modalType: '',
              });
            }).bind(this), 10);
          } else {
            if (this.state.modalType === 'saveAlert') {
              this.props.history.push('/tampa/franchisees/');
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

  exportRecord = () => {
    let mergeData = this.state.currentRecord;
    console.log(mergeData);

    //Find a way to merge this into word!
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
      let exportFileName = document.getElementById('rangeBy').value + ' - ' + currentMonth + '.' + currentDay + '.' + currentYear;
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
            finalURL = finalURL + '&filterByFormula=AND(IS_AFTER(%7B' + exportFilter.filter1 + '%7D%2C+%22' + startRange + '%22)%2C+IS_BEFORE(%7B' + exportFilter.filter1 + '%7D%2C+%22' + endRange + '%22))';
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


  loadData = () => {
    this.setState({ loading: true });
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
    console.log(finalURL);
    return axios
      .get(finalURL)
      .then(response => {
        console.log(response);
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
        if (this.state.currentTable !== 'Franchisees') {
          document.getElementById('volume').className="TabItem isActive";
          document.getElementById('franchisees').className="TabItem";
        }
        setTimeout((function() {
          this.setState({
            loadingMore: false,
          });

          if (this.state.recordView) {
            document.title = this.state.currentRecord['SP Name'] + " | AirMagic"
          } else {
            document.title = "Tampa Franchisees | AirMagic";
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
  };


  clearSearch = () => {
    this.setState({
      searchQuery: '',
      loading: true,
      dataOffset: '',
    });
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
    } else {
      this.setState({listView: 'view=' + filterId});
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
    this.loadData();
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
      <div className="TampaSales">
        {this.modalShow}
        <Navbar
          currentRecord={this.state.currentRecord}
          recordView={this.state.recordView}
          closeRecordHandler={this.closeRecordHandler}
          currentId= {this.state.currentId}
          recordChanges= {this.state.recordChanges}
          switchTableHandler= {this.switchTableHandler}
          exportRecord={this.exportRecord}
          controlsModalToggle={this.controlsModalToggle}
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