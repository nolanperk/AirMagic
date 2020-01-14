import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/black/exit.png';
import loader from '../assets/loader.gif';
import arrow_back from '../assets/icons/black/arrow_back.png';
import popout from '../assets/icons/popout.png';
import skipImg from '../assets/icons/black/skip.png';
import searchImg from '../assets/icons/white/search.png';

export default class FollowUpsList extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      baseId: '',

      followOffset: '',
      handoffModal: false,

      suggestedHandoffs: [],
      allFollows: {
        nextDay: [],
        references: [],
        firstFollow: [],
        recentQuick: [],
        recentLong: [],
        ongoingFollows: [],
        oldFollows: [],
        oldProspects: [],
      },
      propedList: [],

      followType: 'default',

      modalView: false,
      skipView: false,

      generatedEmail: '',
      referenceList: [],
    }
  }

  loadReferences = e => {
    e.preventDefault();
    console.log(e);

    let filterVal = document.getElementById('zoomFilter').value;
    let termVal = document.getElementById('searchTerm').value;

    let filterByString = '';
    let findTerm = '';
    let filterBy = '';

    if (filterVal === 'zip') {
      filterBy = 'FIND("' + this.state.openedFollow.fields['Zip'] + '"%2C+%7BZip%7D)';
    } else if (filterVal === 'city') {
      let loweredCity = this.state.openedFollow.fields['City'].replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      filterBy = 'FIND("' + loweredCity + '"%2CLOWER(%7BCity%7D))';
    }

    if (termVal !== '') { //if a term was searched for
      let loweredTerm = termVal.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
      findTerm = 'FIND("' + loweredTerm + '"%2CLOWER(%7BCompany+Name%7D))';
    }


    /////////////peice together the filter1

    if (filterBy !== '') {
      if (findTerm !== '') {
        filterByString = 'filterByFormula=AND(' + filterBy + '%2C' + findTerm + ')';
      } else {
        filterByString = 'filterByFormula=' + filterBy;
      }
    } else {
      if (findTerm !== '') {
        filterByString = 'filterByFormula=' + findTerm;
      }
    }

    filterByString = filterByString.split(' ').join('+');

    console.log(filterByString);


    let customerBase;
    if (localStorage.getItem('userOffice') === 'tampa') {
      customerBase = 'apps7GoAgK23yrOoY';
    } else if (localStorage.getItem('userOffice') === 'orlando') {
      customerBase = 'appBUKBn552B8SlbE';
    }


    this.setState({
      referenceList: [],
    })
    setTimeout((function() {
      let referencesURL = 'https://api.airtable.com/v0/' + customerBase + '/Customers/?view=Reference+Lists&' + filterByString;
      return axios
        .get(referencesURL).then(response => {
          console.log(response);
          // let referenceItems = response.data.records;
          this.setState({
            referenceList: response.data.records
          })
        });
    }).bind(this), 250);
  }

  copyEmail = () => {
    let copyText = document.getElementById("copyBody");
    copyText.style.display = 'inline';
    copyText.select();
    document.execCommand("copy");
    // copyText.style.display = 'none';
    // alert("Copied follow up!");
  }
  copySubject = () => {
    let copyText = document.getElementById("emailSubject");
    copyText.style.display = 'inline';
    copyText.select();
    document.execCommand("copy");
    // copyText.style.display = 'none';
    // alert("Copied subject.");
  }
  skipFollow = (e) => {
    this.setState({
      skipView: true,
      openedFollow: e,
    })
  }

  confirmSkip = () => {
    console.log('confirming skip');
    console.log(document.getElementById('skipReason').value);
    let today  = new Date();
    let currentFollow = this.state.openedFollow;


    let jsonString = '{"type":"skip","date":"' + (today.getMonth()+1) + '/' + today.getDate()  + '/' + today.getFullYear() + '","reason":"' + document.getElementById('skipReason').value + '"}';

    if (currentFollow.fields['Follow Tracking']) {
      currentFollow.fields['Follow Tracking'] = currentFollow.fields['Follow Tracking'] + ', ' + jsonString;
    } else {
      currentFollow.fields['Follow Tracking'] = jsonString;
    }


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
    let newNotes;
    let newPlanned;


    if (document.getElementById('skipReason').value === 'decision-made') {
      if (document.getElementById('skipReasoning').value) {
        newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Turning back to prospect. They did not choose us.\n';
        newNotes += document.getElementById('skipReasoning').value + '\n\n';
      } else {
        newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Turning back to prospect. They did not choose us.\n\n';
      }
      currentFollow.fields['Status'] = 'Prospect';
      currentFollow.fields['Call Status'] = 'Open Season';

      console.log(currentFollow);
    } else {
      if (document.getElementById('skipReasoning').value) {
        newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Skipped Follow Up (' + document.getElementById('skipReason').value + ')\n';
        newNotes += document.getElementById('skipReasoning').value + '\n\n';
      } else {
        newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Skipped Follow Up (' + document.getElementById('skipReason').value + ')\n\n';
      }
      // new
      // first
      // recent
      // ongoing
      console.log(currentFollow.fields['Follow Status']);
      if (currentFollow.fields['Follow Status'] === 'New') {
        newPlanned = new Date(+new Date + 1000*60*60*24*8);
        currentFollow.fields['Follow Status'] = 'First';
      } else if (currentFollow.fields['Follow Status'] === 'First') {
        if (currentFollow.fields['Forecast Speed'] !== 'This Month') { //recentLong
          newPlanned = new Date(+new Date + 1000*60*60*24*14);
        } else { //recentQuick
          newPlanned = new Date(+new Date + 1000*60*60*24*8);
        }
        currentFollow.fields['Follow Status'] = 'Recent';
      } else if (currentFollow.fields['Follow Status'] === 'Recent') {
        if (currentFollow.fields['Forecast Speed'] !== 'This Month') { //recentLong
          if (currentFollow.fields['Follow Ups'] === 3) {
            currentFollow.fields['Follow Status'] = 'Ongoing'
            newPlanned = new Date(+new Date + 1000*60*60*24*30);
          } else {
            newPlanned = new Date(+new Date + 1000*60*60*24*14);
          }
        } else { //recentQuick
          if (currentFollow.fields['Follow Ups'] === 4) {
            currentFollow.fields['Follow Status'] = 'Ongoing'
            newPlanned = new Date(+new Date + 1000*60*60*24*30);
          } else {
            newPlanned = new Date(+new Date + 1000*60*60*24*8);
          }
        }
      } else if (currentFollow.fields['Follow Status'] === 'Ongoing') {
        if (currentFollow.fields['Follow Status'] === 'Old') {
          newPlanned = new Date(+new Date + 1000*60*60*24*58);
        } else {
          if (currentFollow.fields['Forecast Speed'] !== 'This Month') { //recentLong
            if (currentFollow.fields['Follow Ups'] === 5) {
              currentFollow.fields['Follow Status'] = 'Old'
              newPlanned = new Date(+new Date + 1000*60*60*24*58);
            } else {
              newPlanned = new Date(+new Date + 1000*60*60*24*45);
            }
          } else { //recentQuick
            if (currentFollow.fields['Follow Ups'] === 6) {
              currentFollow.fields['Follow Status'] = 'Old'
              newPlanned = new Date(+new Date + 1000*60*60*24*58);
            } else {
              newPlanned = new Date(+new Date + 1000*60*60*24*45);
            }
          }
        }
      }

      newPlanned = new Date(newPlanned.getTime() + Math.abs(newPlanned.getTimezoneOffset()*60000));
      newPlanned = (newPlanned.getMonth()+1) + "/" + newPlanned.getDate()  + "/" + newPlanned.getFullYear(); //make it look better on db!
      currentFollow.fields['Next Follow Up'] = newPlanned;


      currentFollow.fields['Follow Ups'] = currentFollow.fields['Follow Ups'] + 1;
      currentFollow.fields['Last Contact'] = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();
    }
    currentFollow.fields['Notes'] = newNotes + currentFollow.fields['Notes'];

    setTimeout((function() {
      this.setState({
        openedFollow: currentFollow
      })
    }).bind(this), 50);




    setTimeout((function() {
      let finalPush = {"fields": this.state.openedFollow.fields}

      let saveRecord = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales/' + this.state.openedFollow.id;
      return axios
        .put(saveRecord, finalPush).then(response => {
          this.setState({
            openedFollow: [],
            skipView: false,
            loading: true,

            followOffset: '',
            allFollows: {
              nextDay: [],
              references: [],
              firstFollow: [],
              recentQuick: [],
              recentLong: [],
              ongoingFollows: [],
              oldFollows: [],
              oldProspects: [],
            },
            propedList: [],

            followType: 'default',
          });

          setTimeout((function() {
            this.loadFollowUps();
          }).bind(this), 150);
        });
    }).bind(this), 100);
  }
  sentEmail = () => {
    /////////////////////////////////////////////////
    ///////Saving Notes//////////////////////////////
    /////////////////////////////////////////////////


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

    let newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Sent ' + this.state.currentFollowUp.fields['Template Name'] + ' Follow Up.' + '\n\n';

    let currentFollow = this.state.openedFollow.fields;

    currentFollow['Notes'] = newNotes + currentFollow['Notes'];


    let jsonString = '{"type":"' + this.state.followType + '","date":"' + (today.getMonth()+1) + '/' + today.getDate()  + '/' + today.getFullYear() + '",';

    //check the planned follow up, then give 3 days of leeway before calling it late
    let plannedDate = new Date(currentFollow['Next Follow Up']); plannedDate = new Date(plannedDate.getTime() + Math.abs(plannedDate.getTimezoneOffset()*60000));
    let lateDate = new Date(+new Date(plannedDate) + 1000*60*60*24*2);
    if (today > lateDate) { jsonString += '"timed": "Late"}'; } //late
                     else { jsonString += '"timed": "Nailed"}'; } //not late

    if (currentFollow['Follow Tracking']) {
      currentFollow['Follow Tracking'] = currentFollow['Follow Tracking'] + ', ' + jsonString;
    } else {
      currentFollow['Follow Tracking'] = jsonString;
    }

    //update the next planned follow up
    let newPlanned;



    // new
    // first
    // recent
    // ongoing
    if (this.state.followType === 'new') {
      newPlanned = new Date(+new Date + 1000*60*60*24*8);
      currentFollow['Follow Status'] = 'First';
    } else if (this.state.followType === 'first') {
      if (currentFollow['Forecast Speed'] !== 'This Month') { //recentLong
        newPlanned = new Date(+new Date + 1000*60*60*24*14);
      } else { //recentQuick
        newPlanned = new Date(+new Date + 1000*60*60*24*8);
      }
      currentFollow['Follow Status'] = 'Recent';
    } else if (this.state.followType === 'recent') {
      if (currentFollow['Forecast Speed'] !== 'This Month') { //recentLong
        if (currentFollow['Follow Ups'] === 3) {
          currentFollow['Follow Status'] = 'Ongoing'
          newPlanned = new Date(+new Date + 1000*60*60*24*30);
        } else {
          newPlanned = new Date(+new Date + 1000*60*60*24*14);
        }
      } else { //recentQuick
        if (currentFollow['Follow Ups'] === 4) {
          currentFollow['Follow Status'] = 'Ongoing'
          newPlanned = new Date(+new Date + 1000*60*60*24*30);
        } else {
          newPlanned = new Date(+new Date + 1000*60*60*24*8);
        }
      }
    } else if (this.state.followType === 'ongoing') {
      if (currentFollow['Follow Status'] === 'Old') {
        newPlanned = new Date(+new Date + 1000*60*60*24*58);
      } else {
        if (currentFollow['Forecast Speed'] !== 'This Month') { //recentLong
          if (currentFollow['Follow Ups'] === 5) {
            currentFollow['Follow Status'] = 'Old'
            newPlanned = new Date(+new Date + 1000*60*60*24*58);
          } else {
            newPlanned = new Date(+new Date + 1000*60*60*24*45);
          }
        } else { //recentQuick
          if (currentFollow['Follow Ups'] === 6) {
            currentFollow['Follow Status'] = 'Old'
            newPlanned = new Date(+new Date + 1000*60*60*24*58);
          } else {
            newPlanned = new Date(+new Date + 1000*60*60*24*45);
          }
        }
      }
    }

    newPlanned = new Date(newPlanned.getTime() + Math.abs(newPlanned.getTimezoneOffset()*60000));
    newPlanned = (newPlanned.getMonth()+1) + "/" + newPlanned.getDate()  + "/" + newPlanned.getFullYear(); //make it look better on db!
    currentFollow['Next Follow Up'] = newPlanned;


    currentFollow['Follow Ups'] = currentFollow['Follow Ups'] + 1;
    currentFollow['Last Contact'] = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();

    if (this.state.followType === 'new') {
      currentFollow['Follow Ups Used'] = this.state.currentFollowUp.fields['Template Name'];
    } else {
      currentFollow['Follow Ups Used'] = currentFollow['Follow Ups Used'] + ', ' + this.state.currentFollowUp.fields['Template Name'];
    }

    let finalPush = {"fields": currentFollow}
    console.log(finalPush);

    let saveRecord = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales/' + this.state.openedFollow.id;
    return axios
      .put(saveRecord, finalPush).then(response => {
        this.setState({
          openedFollow: [],
          modalView: false,
          loading: true,

          followOffset: '',
          allFollows: {
            nextDay: [],
            references: [],
            firstFollow: [],
            recentQuick: [],
            recentLong: [],
            ongoingFollows: [],
            oldFollows: [],
            oldProspects: [],
          },
          propedList: [],

          followType: 'default',
        });

        setTimeout((function() {
          this.loadFollowUps();
        }).bind(this), 500);
      });
  }

  backToList = () => {
    this.setState({
      modalView: false,
      skipView: false,
      handoffModal: false,
      followType: 'default',
    })
  }

  changeView = e => {
    console.log(e.target);

    if (e.target.id === 'recent') {
      this.setState({
        currentView: 'hot',
      })
    } else if (e.target.id === 'old') {
      this.setState({
        currentView: 'oldProposals',
      })
    } else if (e.target.id === 'retouch') {
      this.setState({
        currentView: 'retouches',
      })
    }
  };

  openFollowUp = (e, type) => {
    this.setState({
      followType: type,
    })

    let followCount = e.fields['Follow Ups'];
    let usedFollows = e.fields['Follow Ups Used'];
    let propSize = parseInt(e.fields['Monthly Amount']);
    let squareFeet = parseInt(e.fields['Actual Sq Footage']);

    let propDate = new Date(e.fields['Proposal Date']);
    let contDate = new Date(e.fields['Last Contact']);
    let acctStatus = e.fields['Status'];

    let monthAgo = new Date(+new Date - 1000*60*60*24*30);
    let twoMonthsAgo = new Date(+new Date - 1000*60*60*24*60);

    let followUpURL = 'https://api.airtable.com/v0/appNqtJO2EtRRk9vj/Follow';
    return axios
      .get(followUpURL).then(response => {
        let resItems = response.data.records;
        let responseList = [];

        let currentFollow = e.fields;

        for (var i in resItems) {
          if ((type.charAt(0).toUpperCase() + type.substring(1)) === resItems[i].fields['Follow Up Type']) {
            if (e.fields['Follow Ups Used']) {
              if (e.fields['Follow Ups Used'].includes(resItems[i].fields['Template Name'])) {
              } else {
                responseList.push(resItems[i])
              }
            } else {
              responseList.push(resItems[i])
            }
          }
        }

        if (responseList.length === 0) {
          for (var i in resItems) {
            if ((type.charAt(0).toUpperCase() + type.substring(1)) === resItems[i].fields['Follow Up Type']) {
              responseList.push(resItems[i])
            }
          }
        }

        this.setState({
          modalView: true,
          openedFollow: e,
          followUpList: responseList,
          currentFollowUp: responseList[Math.floor(Math.random()*responseList.length)]
        });
      });
  }

  sendSearch = e => {
    e.preventDefault();

    let searchByForm = 'Company+Name';
    let sarchQueryForm = 'home';

    sarchQueryForm = document.getElementById('searchInput').value;
    searchByForm = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

    sessionStorage.setItem('searchQuery', sarchQueryForm);
    sessionStorage.setItem('searchBy', searchByForm);
    window.location = '/' + localStorage.getItem('userOffice') + '/sales/';
  }

  loadFollowUps = () => {
    let currRep = localStorage.getItem('userName').replace(' ', '+')
    let followURL;


    //nextDay
    let loadRecents = function() {
      console.log('loadRecents');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+First&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadRecents();
        } else {
          console.log('clearing loadRecents()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.nextDay = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });


            loadFirstSolid();
          }).bind(this), 50);
        }
      });
    }.bind(this);
    loadRecents();

    //firstFollow
    let loadFirstSolid = function() {
      console.log('loadFirstSolid');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Second&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadFirstSolid();
        } else {
          console.log('clearing loadFirstSolid()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.firstFollow = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadRecentQuick();
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //recentQuick
    let loadRecentQuick = function() {
      console.log('loadRecentQuick');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Recent&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadRecentQuick();
        } else {
          console.log('clearing loadRecentQuick()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.recentQuick = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            moveToRecentLong();
          }).bind(this), 50);
        }
      });
    }.bind(this);


    //Move to Long if needed
    let moveToRecentLong = function() {
      let allFollows = this.state.allFollows
      let recentQuick = allFollows.recentQuick;
      let propedList = [];
      let quickPropedList = [];

      for (var i in recentQuick) {
        if (recentQuick[i].fields['Forecast Speed'] !== 'This Month') {
          propedList.push(recentQuick[i]);
        } else {
          quickPropedList.push(recentQuick[i]);
        }
      }

      allFollows.recentLong = propedList;
      allFollows.recentQuick = quickPropedList;

      this.setState({
        allFollows: allFollows,
        propedList: [],
      });

      loadOngoing();
    }.bind(this);


    //recentQuick
    let loadOngoing = function() {
      console.log(this.state.allFollows);
      console.log('loadOngoing');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Ongoing&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOngoing();
        } else {
          console.log('clearing loadOngoing()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.ongoingFollows = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadOld();
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //oldFollows
    let loadOld = function() {
      console.log('loadOld');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Old&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOld();
        } else {
          console.log('clearing loadOld()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.oldFollows = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadFinish();
          }).bind(this), 50);
        }
      });
    }.bind(this);




    let loadFinish = function() {
      let allFollows = this.state.allFollows;

      let propedAllFollows = {
        nextDay: this.state.allFollows.nextDay,
        references: [],
        firstFollow: this.state.allFollows.firstFollow,
        recentQuick: [],
        recentLong: [],
        ongoingFollows: this.state.allFollows.ongoingFollows,
        oldFollows: [],
        oldProspects: [],
      };
      let today = new Date();

      for (var i in allFollows.recentQuick) {
        let lastCont = new Date(allFollows.recentQuick[i].fields['Last Contact']);
        let firstRecent = new Date(+new Date(lastCont) + 1000*60*60*24*7);
        let secondRecent = new Date(+new Date(lastCont) + 1000*60*60*24*6);
        let thirdRecent = new Date(+new Date(lastCont) + 1000*60*60*24*9);
        let fourthRecent = new Date(+new Date(lastCont) + 1000*60*60*24*8);

        if (allFollows.recentQuick[i].fields['Follow Ups'] === 2) {
          if (today > firstRecent) {  propedAllFollows.recentQuick.push(allFollows.recentQuick[i]); }
        } else if (allFollows.recentQuick[i].fields['Follow Ups'] === 3) {
          if (today > secondRecent) {  propedAllFollows.recentQuick.push(allFollows.recentQuick[i]); }
        } else if (allFollows.recentQuick[i].fields['Follow Ups'] === 4) {
          if (today > thirdRecent) {  propedAllFollows.recentQuick.push(allFollows.recentQuick[i]); }
        } else if (allFollows.recentQuick[i].fields['Follow Ups'] === 5) {
          allFollows.recentQuick[i].moveToOngoing = true;
          if (today > fourthRecent) {  propedAllFollows.recentQuick.push(allFollows.recentQuick[i]); }
        }
      }

      for (var i in allFollows.recentLong) {
        let lastCont = new Date(allFollows.recentLong[i].fields['Last Contact']);
        let firstRecent = new Date(+new Date(lastCont) + 1000*60*60*24*10);
        let secondRecent = new Date(+new Date(lastCont) + 1000*60*60*24*12);
        let thirdRecent = new Date(+new Date(lastCont) + 1000*60*60*24*15);

        if (allFollows.recentLong[i].fields['Follow Ups'] === 2) {
          if (today > firstRecent) {  propedAllFollows.recentLong.push(allFollows.recentLong[i]); }
        } else if (allFollows.recentLong[i].fields['Follow Ups'] === 3) {
          if (today > secondRecent) {  propedAllFollows.recentLong.push(allFollows.recentLong[i]); }
        } else if (allFollows.recentLong[i].fields['Follow Ups'] === 4) {
          allFollows.recentLong[i].moveToOngoing = true;
          if (today > thirdRecent) {  propedAllFollows.recentLong.push(allFollows.recentLong[i]); }
        }
      }

      for (var i in allFollows.oldFollows) {
        if (allFollows.oldFollows[i].fields['Status'] === 'APPC') {
          propedAllFollows.oldFollows.push(allFollows.oldFollows[i]);
        } else {
          propedAllFollows.oldProspects.push(allFollows.oldFollows[i]);
        }
      }

      this.setState({
        loading: false,
        allFollows: propedAllFollows,
      });
      console.log(propedAllFollows);
      console.log(this.state.suggestedHandoffs);
    }.bind(this);

  }

  sendReport = () => {
    let currRep = localStorage.getItem('userName').replace(' ', '+')
    //oldFollows
    let loadTodaysFollows = function() {
      console.log('loadTodaysFollows');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Morning+Follow+Ups&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTodaysFollows();
        } else {
          console.log('clearing loadTodaysFollows()');

          setTimeout((function() {
            let averageCount = 0;
            let olderCount = 0;
            for (var i in this.state.propedList) {
              averageCount += this.state.propedList[i].fields['Follow Ups'];

              if (this.state.propedList[i].fields['Follow Status'] !== 'New' && this.state.propedList[i].fields['Follow Status'] !== 'First' && this.state.propedList[i].fields['Follow Status'] !== 'Recent') {
                olderCount += 1;
              }
            }

            let totalFollows = this.state.propedList.length;
            averageCount = (averageCount/totalFollows).toFixed(2);
            olderCount = (Math.floor((olderCount/totalFollows)*10000))/100 + '%';


            let reportLink = 'mailto:tperkins@vanguardcleaning.com';
            reportLink += "?subject=" + localStorage.getItem('userName').split(' ')[0] + "%27s%20Morning%20Follow-Up%20Report";


            reportLink += "&body=";
            reportLink += encodeURI("Morning Tyler,\n\nI sent out " + totalFollows + " follow ups this morning.\nEach of these accounts have been hit an average of " + averageCount + " times.\n" + olderCount + " of the follow ups are for proposals over 30 days old.");


            this.setState({
              followOffset: '',
              propedList: [],
            });

            var fakeDownloadA = document.createElement('a');
            fakeDownloadA.setAttribute('href', reportLink);
            fakeDownloadA.style.display = 'none';
            document.body.appendChild(fakeDownloadA);
            fakeDownloadA.click();
            document.body.removeChild(fakeDownloadA);
          }).bind(this), 50);
        }
      });
    }.bind(this);
    loadTodaysFollows();
  }

  componentDidMount() {
    if (localStorage.getItem('userOffice') === 'tampa') {
      this.setState({
        baseId: 'appEX8GXgcD2ln4dB',
      });
    } else if(localStorage.getItem('userOffice') === 'orlando') {
      this.setState({
        baseId: 'appXNufXR9nQARjgs',
      });
    }
    setTimeout((function() {
      this.loadFollowUps();
    }).bind(this), 50);
  }


  // Render
  // ----------------------------------------------------
  render() {
    const { allFollows, referenceList, suggestedHandoffs } = this.state;

    let followModalWrapper = "FollowUpsModal modalInner";
    if (!this.state.noVisit) {
      followModalWrapper += " noVisitHide";
    }

    if (this.state.loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>Loading Follow Ups</h4>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="CallListContainer">
          {this.skipView}
          {this.handoffModal}
          {this.modalView}

          <form className="ControlsBar--search" onSubmit={this.sendSearch}>
            <input type="text" placeholder="search records" id="searchInput" />
            <select id="searchBy">
              <option value="Company+Name">Company</option>
              <option value="Main+Contact">Contact</option>
              <option value="Zip">Zip</option>
              <option value="Address+1">Address</option>
              <option value="Office+Phone">Office #</option>
              <option value="Email">Email</option>
            </select>

            <button type="submit" className="navIcon softGrad--primary">
              <img src={searchImg} alt="search" />
            </button>


            <div className="sendReport softGrad--black" onClick={()=>this.sendReport()}>Send Report</div>
          </form>

          <div className="CallList">
            <div className="leftCol">
              <div className="CallListBox">
                <h4>Recent Proposals</h4>
                <div className={allFollows.nextDay.length > 0 ? 'followHighlight next' : 'followHighlight next hidden'}>
                  <p className={allFollows.nextDay.length > 0 ? '' : 'hidden'}>Next Day</p>
                  {allFollows.nextDay.length > 0 ? allFollows.nextDay.map((e, i, followType) => this.followUpItem(e, i, 'new')): ''}
                </div>
                <p className={allFollows.firstFollow.length > 0 ? '' : 'hidden'}>First Follow Up</p>
                {allFollows.firstFollow.length > 0 ? allFollows.firstFollow.map((e, i, followType) => this.followUpItem(e, i, 'first')): ''}
              </div>
            </div>


            <div className="midCol">
              <div className="CallListBox">
                <h4>{'Mid-Range'}</h4>
                <div className={allFollows.recentQuick.length > 0 ? 'followHighlight hot' : 'followHighlight hot hidden'}>
                  <p className={allFollows.recentQuick.length > 0 ? '' : 'hidden'}>Hot</p>
                  {allFollows.recentQuick.length > 0 ? allFollows.recentQuick.map((e, i, followType) => this.followUpItem(e, i, 'recent')): ''}
                </div>
                {allFollows.recentLong.length > 0 ? allFollows.recentLong.map((e, i, followType) => this.followUpItem(e, i, 'recent')): ''}
              </div>
            </div>



            <div className="rightCol">
              <div className="CallListBox">
                <h4>Ongoing</h4>
                <div className={allFollows.ongoingFollows.length > 0 ? 'followHighlight ongoingFollow' : 'followHighlight ongoingFollow hidden'}>
                  <p className={allFollows.ongoingFollows.length > 0 ? '' : 'hidden'}>More Recent</p>
                  {allFollows.ongoingFollows.length > 0 ? allFollows.ongoingFollows.map((e, i, followType) => this.followUpItem(e, i, 'ongoing')): ''}
                </div>

                {allFollows.oldFollows.length > 0 ? allFollows.oldFollows.map((e, i, followType) => this.followUpItem(e, i, 'ongoing')): ''}

                <div className={allFollows.oldProspects.length > 0 ? 'followHighlight rebuttal' : 'followHighlight rebuttal hidden'}>
                  <p className={allFollows.oldProspects.length > 0 ? '' : 'hidden'}>Old Prospects</p>
                  {allFollows.oldProspects.length > 0 ? allFollows.oldProspects.map((e, i, followType) => this.followUpItem(e, i, 'ongoing')): ''}
                </div>
              </div>
            </div>
          </div>


        </div>
      );
    }
  }



  get handoffModal() {
    if (this.state.handoffModal) {
      return (
        <div className='followModalCont'>
          <div className="innerModal">
            <div className="modalTitle">
              <h4>{this.state.openedFollow.fields['Company Name']}</h4>
              <p>${this.state.openedFollow.fields['Monthly Amount']} | {this.state.openedFollow.fields['Actual Sq Footage']}sqft</p>
              <p><a href={'mailto:' + this.state.openedFollow.fields['Email']}>{this.state.openedFollow.fields['Email']}</a></p>

              <div className="backArrow" onClick={this.backToList}>
                <img src={exit} alt="Go Back" />
              </div>
              <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + this.state.openedFollow.id + '/'}><img src={popout} /></Link>
            </div>

            <div className="splitNotes skipNotes">
              <div className="followUp">
                <label>Who do you want to hand this off to?</label>
                <select id="insiderSelect">
                  {this.state.insiders.length > 0 ? this.state.insiders.map((e, i) => this.insiderItem(e, i)): ''}
                  <option value="">No One (appt was 'meh')</option>
                </select>

                <label>Add Some Notes (optional)</label>
                <textarea placeholder="Prospect Status" id="prospectStatus" />
              </div>
            </div>
            <div className="botBtns">
              <a className="btn softGrad--black" onClick={()=>this.handoffHandlerActual(this.state.openedFollow, 'handOff')}>Confirm Changes</a>
            </div>

          </div>
        </div>
      );
    }
  }

  get skipView() {
    if (this.state.skipView) {

      let contactFirst;
      if (this.state.openedFollow.fields['Main contact'].indexOf(' ') < 0) {
        contactFirst = this.state.openedFollow.fields['Main contact'];
      } else {
        contactFirst = this.state.openedFollow.fields['Main contact'].split(' ')[0];
      }

      let repName = localStorage.getItem('userName').split(' ')[0];

      let timeOfDay = 'Morning';
      let today = new Date();
      let halfTime = today.getHours();
      if (halfTime > 11) {
        timeOfDay = 'Afternoon';
      }
      return (
        <div className='followModalCont'>
          <div className="innerModal">
            <div className="modalTitle">
              <h4>{this.state.openedFollow.fields['Company Name']}</h4>
              <p>${this.state.openedFollow.fields['Monthly Amount']} | {this.state.openedFollow.fields['Actual Sq Footage']}sqft</p>
              <p><a href={'mailto:' + this.state.openedFollow.fields['Email']}>{this.state.openedFollow.fields['Email']}</a></p>

              <div className="backArrow" onClick={this.backToList}>
                <img src={exit} alt="Go Back" />
              </div>
              <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + this.state.openedFollow.id + '/'}><img src={popout} /></Link>
            </div>

            <div className="splitNotes skipNotes">
              <div className="followUp">
                <label>Reason for Skip</label>
                <select id="skipReason">
                  <option value="heard-back">Heard back (add a few days)</option>
                  <option value="decision-made">Went with another company</option>
                  <option value="delayed">Said they will get back within a few weeks</option>
                </select>

                <label>Add Some Notes (optional)</label>
                <textarea placeholder="Reasoning" id="skipReasoning" />
              </div>
            </div>
            <div className="botBtns">
              <a className="btn softGrad--black" onClick={this.confirmSkip}>Confirm Changes</a>
            </div>

          </div>
        </div>
      );

    }
  }

  get modalView() {
    if (this.state.modalView) {



      let contactFirst;
      if (this.state.openedFollow.fields['Main contact'].indexOf(' ') < 0) {
        contactFirst = this.state.openedFollow.fields['Main contact'];
      } else {
        contactFirst = this.state.openedFollow.fields['Main contact'].split(' ')[0];
      }

      let repName = localStorage.getItem('userName').split(' ')[0];

      let timeOfDay = 'Morning';
      let today = new Date();
      let halfTime = today.getHours();
      if (halfTime > 11) {
        timeOfDay = 'Afternoon';
      }
      if (this.state.followType === 'reference') {
        return (
          <div className='followModalCont'>
            <div className="innerModal">
              <div className="modalTitle">
                <h4>{this.state.openedFollow.fields['Company Name']}</h4>
                <p>${this.state.openedFollow.fields['Monthly Amount']} | {this.state.openedFollow.fields['Actual Sq Footage']}sqft</p>
                <p><a href={'mailto:' + this.state.openedFollow.fields['Email']}>{this.state.openedFollow.fields['Email']}</a></p>



                <div className="backArrow" onClick={this.backToList}>
                  <img src={exit} alt="Go Back" />
                </div>
                <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + this.state.openedFollow.id + '/'}><img src={popout} /></Link>
              </div>

              <div className="splitHalf">
                <div className="half followUp">
                  <label>Subject</label>
                  <input id="emailSubject" defaultValue={this.state.currentFollowUp.fields['Subject'].replace('REP_NAME', repName)} onClick={this.copySubject} />

                  <label>Email</label>
                  <textarea id="copyBody" rows='9' defaultValue={this.state.currentFollowUp.fields['Email Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay)} />
                </div>
                <div className="half referenceSide">
                  <label>Find Reference</label>
                  <form onSubmit={this.loadReferences}>
                    <input id="searchTerm" placeholder="Search Term (optional)" />
                    <select id="zoomFilter">
                      <option value="zip">Zip</option>
                      <option value="city">City</option>
                      <option value="region">Region</option>
                    </select>
                    <button type="submit" className="btn softGrad--black">Search</button>
                  </form>

                  <div className="inner" id="resultsBox">
                    {this.state.referenceList.length > 0 ? this.state.referenceList.map((e, i) => this.referenceItem(e, i)): <h2>No Results</h2>}
                  </div>
                </div>
                <div className="half noteSide">
                  <label>Notes</label>
                  <textarea disabled rows='9' defaultValue={this.state.openedFollow.fields['Notes']} />
                </div>
              </div>
              <div className="botBtns">
                <a className="btn softGrad--black copyIt" onClick={this.copyEmail}>Copy Follow Up</a>
                <a className="btn softGrad--secondary sentIt" onClick={this.sentEmail}>Sent Email</a>
              </div>
            </div>
          </div>
        );
      } else {

        return (
          <div className='followModalCont'>
            <div className="innerModal">
              <div className="modalTitle">
                <h4>{this.state.openedFollow.fields['Company Name']}</h4>
                <p>${this.state.openedFollow.fields['Monthly Amount']} | {this.state.openedFollow.fields['Actual Sq Footage']}sqft</p>
                <p><a href={'mailto:' + this.state.openedFollow.fields['Email']}>{this.state.openedFollow.fields['Email']}</a></p>

                <div className="backArrow" onClick={this.backToList}>
                  <img src={exit} alt="Go Back" />
                </div>
                <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + this.state.openedFollow.id + '/'}><img src={popout} /></Link>
              </div>

              <div className="splitNotes">
                <div className="followUp">
                  <label>Subject</label>
                  <input id="emailSubject" defaultValue={this.state.currentFollowUp.fields['Subject'].replace('REP_NAME', repName)} onClick={this.copySubject} />

                  <label>Email</label>
                  <textarea id="copyBody" rows='9' defaultValue={this.state.currentFollowUp.fields['Email Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay)} />
                </div>
                <div className="noteSide">
                  <label>Notes</label>
                  <textarea disabled rows='9' defaultValue={this.state.openedFollow.fields['Notes']} />
                </div>
              </div>
              <div className="botBtns">
                <a className="btn softGrad--black copyIt" onClick={this.copyEmail}>Copy Follow Up</a>
                <a className="btn softGrad--secondary sentIt" onClick={this.sentEmail}>Sent Email</a>
              </div>

            </div>
          </div>
        );
      }

    }
  }

  insiderItem(insider, i) {
    return (
      <option value={insider.fields['Name']}>{insider.fields['Name']}</option>
    )
  }

  referenceItem(reference, i) {
    let lastCallDate = new Date(reference.fields['Last Call']);
    lastCallDate = (lastCallDate.getMonth() + 1 ) + '/' + lastCallDate.getDate() + '/' + lastCallDate.getFullYear();

    let referenceInfo = '';
    referenceInfo += reference.fields['Company Name'] + '\n';
    referenceInfo += reference.fields['Main contact'] + '\n';
    referenceInfo += reference.fields['Office Phone'] + '\n';
    referenceInfo += reference.fields['Email'];

    let refRecord = '/' + localStorage.getItem('userOffice') + '/customer-service/all/' + reference.id;

    function copyRef(e){
      let refID = document.getElementById("text-" + i);
      refID.select();
      document.execCommand("copy");
      alert("Copied Reference Info!");
    };

    return (
      <div className="referenceItem" id={"refInfo-" + i}>
        <div className="refNotes">
          <p>{reference.fields['Standing']}</p>
          <p>{lastCallDate}</p>
          <p>${reference.fields['Monthly Amount']}</p>
          <p>Sq Ft. {reference.fields['Actual Sq Footage']}</p>
          <Link to={refRecord} target="_blank">Link</Link>
        </div>

        <div className="refInfo" onClick={copyRef}>
          <textarea rows="5" id={"text-" + i} defaultValue={referenceInfo} />
        </div>
      </div>
    );
  }

  suggestedItem(suggested, i) {
    let lastContact = new Date(suggested.fields['Last Contact']);
    lastContact = new Date(lastContact.getTime() + Math.abs(lastContact.getTimezoneOffset()*60000));
    let contactDate = (lastContact.getMonth() + 1) + '/' + lastContact.getDate() + '/' + lastContact.getFullYear();

    let propDate = new Date(suggested.fields['Proposal Date']);
    propDate = new Date(propDate.getTime() + Math.abs(propDate.getTimezoneOffset()*60000));
    propDate = (propDate.getMonth() + 1) + '/' + propDate.getDate() + '/' + propDate.getFullYear();


    return (
      <div className='callItem handoff'>
        <div className="companyData">
          <Link target="_blank" className="popOut" to={'/' + localStorage.getItem('userOffice') + '/sales/' + suggested.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          <div className="innerCompany">
            <p>APPC {propDate}</p>
            <h4>{suggested.fields['Company Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <div className="btn softGrad--black" onClick={()=>this.handoffHandlerActual(suggested, 'moreTime')}>Keep It</div>
          <div className="btn softGrad--primary" onClick={()=>this.handoffHandler(suggested, 'handOff')}>Handoff</div>
        </div>
      </div>
    );
  }

  followUpItem(followUps, i, followType) {
    let lastContact = new Date(followUps.fields['Last Contact']);
    lastContact = new Date(lastContact.getTime() + Math.abs(lastContact.getTimezoneOffset()*60000));

    let finalDate = (lastContact.getMonth() + 1) + '/' + lastContact.getDate() + '/' + lastContact.getFullYear();

    if (followType === 'ongoing') {
      return (
        <div className='callItem ongoing'>
          <div className="companyData">
            <div className="innerCompany">
              <p>{finalDate}</p>
              <h4>{followUps.fields['Company Name']}</h4>
            </div>
          </div>

          <div className="buttons">
            <div className="btn softGrad--secondary" onClick={()=>this.openFollowUp(followUps, followType)}>Open</div>
            <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + followUps.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='callItem'>
          <div className="companyData">
            <div className="innerCompany">
              <p>{finalDate}</p>
              <h4>{followUps.fields['Company Name']}</h4>
            </div>
          </div>

          <div className="buttons">
            <div className="btn softGrad--secondary" onClick={()=>this.openFollowUp(followUps, followType)}>Open</div>
            <div className="skipBtn" onClick={()=>this.skipFollow(followUps)}>
              <img src={skipImg} alt="skip" />
            </div>
            <Link target="_blank" to={'/' + localStorage.getItem('userOffice') + '/sales/' + followUps.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          </div>
        </div>
      );
    }
  }
}
