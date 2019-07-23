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
      allFollows: {
        first: [],
        references: [],
        ongoingFirst: [],
        ongoing: [],
        ongoingLong: [],
        retouches: [],
        oldAPPC: [],
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
      newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Turning back to prospect. They did not choose us.\n\n';
      currentFollow.fields['Status'] = 'Prospect';
      currentFollow.fields['Call Status'] = 'Open Season';
    } else {
      newNotes = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n' + 'Skipped Follow Up (' + document.getElementById('skipReason').value + ')\n\n';

      currentFollow.fields['Follow Ups'] = currentFollow.fields['Follow Ups'] + 1;
      if (currentFollow.fields['Follow Ups'] < 4) { //Traditional Weekly
        newPlanned = new Date(+new Date + 1000*60*60*24*7);
      } else { //Getting Cold. Slow Up now.
        newPlanned = new Date(+new Date + 1000*60*60*24*14);
      }
      newPlanned = new Date(newPlanned.getTime() + Math.abs(newPlanned.getTimezoneOffset()*60000));
      newPlanned = (newPlanned.getMonth()+1) + "/" + newPlanned.getDate()  + "/" + newPlanned.getFullYear(); //make it look better on db!
      currentFollow.fields['Next Follow Up'] = newPlanned;
    }
    currentFollow.fields['Notes'] = newNotes + currentFollow.fields['Notes'];

    this.setState({
      openedFollow: currentFollow
    })




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
              first: [],
              references: [],
              ongoingFirst: [],
              ongoing: [],
              ongoingLong: [],
              retouches: [],
              oldAPPC: [],
            },
            propedList: [],

            followType: 'default',
          });

          setTimeout((function() {
            this.loadFollowUps();
          }).bind(this), 150);
        });
    }).bind(this), 50);
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
    let amountNum = parseInt(currentFollow['Monthly Amount']);


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

    if (this.state.followType === 'reference') { //Keep momentum. Add only 3!
      newPlanned = new Date(+new Date + 1000*60*60*24*3);
      currentFollow['Follow Ups'] = currentFollow['Follow Ups'] - 1; //need to keep it to 1 for db
      currentFollow['Sent Reference'] = true;
    } else { //Traditional Weekly
      if (currentFollow['Follow Ups'] < 4) { //Traditional Weekly
        newPlanned = new Date(+new Date + 1000*60*60*24*7);
      } else { //Getting Cold. Slow Up now.
        newPlanned = new Date(+new Date + 1000*60*60*24*14);
      }
    }

    newPlanned = new Date(newPlanned.getTime() + Math.abs(newPlanned.getTimezoneOffset()*60000));
    newPlanned = (newPlanned.getMonth()+1) + "/" + newPlanned.getDate()  + "/" + newPlanned.getFullYear(); //make it look better on db!
    currentFollow['Next Follow Up'] = newPlanned;


    currentFollow['Follow Ups'] = currentFollow['Follow Ups'] + 1;
    currentFollow['Last Contact'] = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();

    if (currentFollow['Follow Up Type'] === 'Ongoing') {
      currentFollow['Follow Ups Used'] = currentFollow['Follow Ups Used'] + ', ' + currentFollow['Template Name'];
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
            first: [],
            references: [],
            ongoingFirst: [],
            ongoing: [],
            ongoingLong: [],
            retouches: [],
            oldAPPC: [],
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

    let followUpURL = 'https://api.airtable.com/v0/appNqtJO2EtRRk9vj/Follows';
    return axios
      .get(followUpURL).then(response => {
        let resItems = response.data.records;
        console.log(followCount);
        let responseList = [];

        console.log(resItems);

        for (var i in resItems) {
          if (type === 'proposal') {
            if (resItems[i].fields['Follow Up Count'] === '0') {
              console.log('is proposal follow');
              responseList.push(resItems[i])
            }
          } else if (type === 'reference') {
            if (resItems[i].fields['Follow Up Count'] === '1') {
             console.log('is reference list');
             responseList.push(resItems[i])
           }
         } else if (type === 'consistency') {
            if (resItems[i].fields['Follow Up Count'] === '2') {
             console.log('is intro email');
             responseList.push(resItems[i])
           }
          } else if (type === 'ongoing') {
            if (followCount > 10) {
              if (resItems[i].fields['Follow Up Count'] === '+' || resItems[i].fields['Follow Up Count'] === 'Any') {
                responseList.push(resItems[i]);
              }
            } else {
              if (resItems[i].fields['Follow Up Count'] === 'Any') {
                if (usedFollows !== undefined) {
                  console.log(usedFollows);
                  if (usedFollows.indexOf(resItems[i].fields['Template Name']) === -1) {
                    responseList.push(resItems[i]);
                  }
                } else {
                  responseList.push(resItems[i]);
                }
              }
            }
          } else if (type === 'retouch') {
            if (resItems[i].fields['Follow Up Type'] === 'Retouch') { //is retouch
              responseList.push(resItems[i])
            }
          } else if (type === 'oldAPPC') {
            if (resItems[i].fields['Follow Up Type'] === 'Retouch' || resItems[i].fields['Follow Up Type'] === 'Old APPC') {
              responseList.push(resItems[i])
            }
          }
        }

        if (responseList.length === 0) {
          for (var i in resItems) {
            if (followCount > 2 && followCount < 10) {
              if (resItems[i].fields['Follow Up Count'] === 'Any') {
                console.log(resItems[i]);
                responseList.push(resItems[i]);
              }
            }
          }
        }

        this.setState({
          modalView: true,
          openedFollow: e,
          followUpList: responseList,
          currentFollowUp: responseList[Math.floor(Math.random()*responseList.length)]
        });

        if (this.state.followType === 'reference') {
          let filterByString = 'filterByFormula=FIND("' + e.fields['Zip'] + '"%2C+%7BZip%7D)';
          filterByString = filterByString.split(' ').join('+');

          let customerBase;
          if (localStorage.getItem('userOffice') === 'tampa') {
            customerBase = 'apps7GoAgK23yrOoY';
          } else if (localStorage.getItem('userOffice') === 'orlando') {
            customerBase = 'appBUKBn552B8SlbE';
          }

          let referencesURL = 'https://api.airtable.com/v0/' + customerBase + '/Customers/?view=Reference+Lists&' + filterByString;
          console.log(referencesURL);
          return axios
            .get(referencesURL).then(response => {
              console.log(response);
              // let referenceItems = response.data.records;
              this.setState({
                referenceList: response.data.records
              })
            });
        }
      });
  }

  sendSearch = e => {
    e.preventDefault();

    let searchByForm = 'Company+Name';
    let sarchQueryForm = 'home';

    sarchQueryForm = document.getElementById('searchInput').value;
    searchByForm = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

    window.location = '/' + localStorage.getItem('userOffice') + '/sales/?searchBy=' + searchByForm + '&searchQuery=' + sarchQueryForm;
  }

  loadFollowUps = () => {
    let currRep = localStorage.getItem('userName').replace(' ', '+')
    let followURL;


    //first
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
            allFollows.first = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });


            loadRefs();
          }).bind(this), 50);
        }
      });
    }.bind(this);
    loadRecents();


    //references
    let loadRefs = function() {
      console.log('loadRefs');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+References&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadRefs();
        } else {
          console.log('clearing loadRefs()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.references = this.state.propedList;

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

    //ongoingFirst
    let loadFirstSolid = function() {
      console.log('loadFirstSolid');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Non-Reference&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
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
            allFollows.ongoingFirst = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadOngoing();
          }).bind(this), 50);
        }
      });
    }.bind(this);


    //ongoing
    let loadOngoing = function() {
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
            allFollows.ongoing = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadOngoingLong();
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //ongoingLong
    let loadOngoingLong = function() {
      console.log('loadOngoingLong');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Long+Ongoing&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOngoingLong();
        } else {
          console.log('clearing loadOngoingLong()');

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.ongoingLong = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadRetouches();
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //retouches
    let loadRetouches = function() {
      console.log('loadRetouches');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Retouch&pageSize=4&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
          });

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.retouches = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadOldAPPC();
          }).bind(this), 50);
        });
    }.bind(this);

    //oldAPPC
    let loadOldAPPC = function() {
      console.log('loadOldAPPC');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Follow+Ups+Old+APPC&pageSize=4&filterByFormula=IF(%7BSales+Rep%7D%2C+%22' + currRep + '%22%2C+TRUE())';

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
          });

          setTimeout((function() {
            let allFollows = this.state.allFollows;
            allFollows.oldAPPC = this.state.propedList;

            this.setState({
              followOffset: '',
              allFollows: allFollows,
              propedList: [],
            });

            loadFinish();
          }).bind(this), 50);
      });
    }.bind(this);

    let loadFinish = function() {
      this.setState({
        loading: false,
      });
      console.log(this.state.allFollows);
    }.bind(this);

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
    const { allFollows, referenceList } = this.state;

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
          </form>

          <div className="CallList">
            <div className="leftCol">
              <h4 className={allFollows.first.length > 0 ? '' : 'hidden'}>Recent Proposals</h4>
              <div className={allFollows.first.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                {allFollows.first.length > 0 ? allFollows.first.map((e, i, followType) => this.followUpItem(e, i, 'proposal')): ''}
              </div>


              <h4 className={allFollows.references.length > 0 ? '' : 'hidden'}>References</h4>
              <div className={allFollows.references.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                {allFollows.references.length > 0 ? allFollows.references.map((e, i, followType) => this.followUpItem(e, i, 'reference')): ''}
              </div>


              <h4 className={allFollows.oldAPPC.length > 0 ? '' : 'hidden'}>Old Proposals</h4>
              <div className={allFollows.oldAPPC.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                {allFollows.oldAPPC.length > 0 ? allFollows.oldAPPC.map((e, i, followType) => this.followUpItem(e, i, 'oldAPPC')): ''}
              </div>

              <h4 className={allFollows.retouches.length > 0 ? '' : 'hidden'}>Check-Ins</h4>
              <div className={allFollows.retouches.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                {allFollows.retouches.length > 0 ? allFollows.retouches.map((e, i, followType) => this.followUpItem(e, i, 'retouch')): ''}
              </div>
            </div>


            <div className="rightCol">
              <h4 className={allFollows.ongoingFirst.length > 0 ? '' : 'hidden'}>Final Sales Pitch</h4>
              <div className={allFollows.ongoingFirst.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                {allFollows.ongoingFirst.length > 0 ? allFollows.ongoingFirst.map((e, i, followType) => this.followUpItem(e, i, 'consistency')): ''}
              </div>


              <h4 className={allFollows.ongoing.length > 0 ? '' : 'hidden'}>Ongoing Follow Ups</h4>
              <div className={allFollows.ongoing.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                <p>Weekly</p>
                {allFollows.ongoing.length > 0 ? allFollows.ongoing.map((e, i, followType) => this.followUpItem(e, i, 'ongoing')): ''}
              </div>
              <div className={allFollows.ongoingLong.length > 0 ? 'CallListBox' : 'CallListBox hidden'}>
                <p>Bi-Weelkly</p>
                {allFollows.ongoingLong.length > 0 ? allFollows.ongoingLong.map((e, i, followType) => this.followUpItem(e, i, 'ongoing')): ''}
              </div>
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

  followUpItem(followUps, i, followType) {
    let lastContact = new Date(followUps.fields['Last Contact']);
    lastContact = new Date(lastContact.getTime() + Math.abs(lastContact.getTimezoneOffset()*60000));

    let finalDate = (lastContact.getMonth() + 1) + '/' + lastContact.getDate() + '/' + lastContact.getFullYear();


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
