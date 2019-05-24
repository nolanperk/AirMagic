import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import exit from '../../assets/icons/white/exit.png';
import loader from '../../assets/loader.gif';
import arrow_back from '../../assets/icons/black/arrow_back.png';

export default class SalesFollowUps extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,

      hotOffset: '',
      hotData: [],
      clearedHot: false,

      oldProposalOffset: '',
      oldProposalData: [],
      clearedOldProposal: false,

      retouchesOffset: '',
      retouchesData: [],
      clearedRetouches: false,

      currentView: 'hot',
      viewType: 'list',
      followType: 'default',

      generatedEmail: '',
      referenceList: [],

      noVisit: false,
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
    if (this.props.citySet === 'tampa') {
      customerBase = 'apps7GoAgK23yrOoY';
    } else if (this.props.citySet === 'orlando') {
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
  heardBack = () => {
    let currState = this.state.openedFollow;
    // console.log(currState);
    if (this.state.followType === 'proposal' || this.state.followType === 'reference') {
      currState.fields['Follow Ups'] = currState.fields['Follow Ups'] + 1;
    } else {
      currState.fields['Follow Ups'] = currState.fields['Follow Ups'] + 1;
      let contDate = currState.fields['Last Contact'];
      let addTwo = new Date(contDate + 1000*60*60*24*2);
      currState.fields['Last Contact'] = addTwo;
    }

    console.log(currState);
    this.setState({
      openedFollow: currState,
    })
    setTimeout((function() {
      let finalPush = {"fields": this.state.openedFollow.fields}
      console.log(finalPush);

      let saveRecord = 'https://api.airtable.com/v0/' + this.props.baseId + '/' + 'Sales/' + this.state.openedFollow.id;
      return axios
        .put(saveRecord, finalPush).then(response => {
          this.setState({
            viewType: 'list',
            openedFollow: [],

            loading: true,
            hotOffset: '',
            hotData: [],
            clearedHot: false,

            oldProposalOffset: '',
            oldProposalData: [],
            clearedOldProposal: false,

            retouchesOffset: '',
            retouchesData: [],
            clearedRetouches: false,
          });

          setTimeout((function() {
            this.loadFollowUps();
          }).bind(this), 500);
        });
    }).bind(this), 250);
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

    let newNotes = dayTime + ' - ' + this.props.userName + '\n' + 'Sent ' + this.state.currentFollowUp.fields['Template Name'] + ' Follow Up.' + '\n\n';

    let currentFollow = this.state.openedFollow.fields;
    currentFollow['Notes'] = newNotes + currentFollow['Notes'];
    let amountNum = parseInt(currentFollow['Monthly Amount']);
    if (currentFollow['Follow Ups'] === 0) { // new proposals
      if (amountNum < 400 || currentFollow['Proposal Type'] === 'No-Visit') {
        currentFollow['Follow Ups'] = currentFollow['Follow Ups'] + 1;
      }
    }
    currentFollow['Follow Ups'] = currentFollow['Follow Ups'] + 1;
    currentFollow['Last Contact'] = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();

    if (this.state.currentFollowUp.fields['Follow Up Type'] === 'Ongoing') {
      currentFollow['Follow Ups Used'] = currentFollow['Follow Ups Used'] + ', ' + this.state.currentFollowUp.fields['Template Name'];
    }

    let finalPush = {"fields": currentFollow}
    console.log(finalPush);

    let saveRecord = 'https://api.airtable.com/v0/' + this.props.baseId + '/' + 'Sales/' + this.state.openedFollow.id;
    return axios
      .put(saveRecord, finalPush).then(response => {
        this.setState({
          viewType: 'list',
          openedFollow: [],

          loading: true,
          hotOffset: '',
          hotData: [],
          clearedHot: false,

          oldProposalOffset: '',
          oldProposalData: [],
          clearedOldProposal: false,

          retouchesOffset: '',
          retouchesData: [],
          clearedRetouches: false,
        });

        setTimeout((function() {
          this.loadFollowUps();
        }).bind(this), 500);
      });
  }

  backToList = () => {
    this.setState({
      viewType: 'list',
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
    if (type === 'reference') {
      this.setState({
        followType: 'reference',
      })
    } else if (type === 'proposal') {
      this.setState({
        followType: 'proposal',
      })
    }
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

        for (var i in resItems) {
          if (contDate < monthAgo && propDate < twoMonthsAgo) {
            console.log('is Retouch');
            if (resItems[i].fields['Follow Up Type'] === 'Retouch') { //is retouch
              responseList.push(resItems[i])
            }
          } else if (followCount < 3) { // is intro
            if (resItems[i].fields['Follow Up Count'] === '0' && followCount === 0) {
              console.log('is proposal follow');
              responseList.push(resItems[i])
            } else if (resItems[i].fields['Follow Up Count'] === '1' && followCount === 1) {
              console.log('is reference list');
              responseList.push(resItems[i])
            } else if (resItems[i].fields['Follow Up Count'] === '2' && followCount === 2) {
              console.log('is intro email');
              responseList.push(resItems[i])
            }
          } else { // is ongoing
            console.log('is Ongoing');
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
          viewType: 'opened',
          openedFollow: e,
          followUpList: responseList,
          currentFollowUp: responseList[Math.floor(Math.random()*responseList.length)]
        });

        if (this.state.followType === 'reference') {
          let filterByString = 'filterByFormula=FIND("' + e.fields['Zip'] + '"%2C+%7BZip%7D)';
          filterByString = filterByString.split(' ').join('+');

          let customerBase;
          if (this.props.citySet === 'tampa') {
            customerBase = 'apps7GoAgK23yrOoY';
          } else if (this.props.citySet === 'orlando') {
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

  loadFollowUps = () => {
    let hotURL;
    let oldProposalURL;
    let retouchesURL;

    setTimeout((function() {
      let clearedCount = 0;

      console.log(this.props.userName);
      let currRep;
      if (this.props.userName === 'NWP') {
        currRep = 'Nolan';
      } else if (this.props.userName === 'TMP') {
        currRep = 'Tyler';
      } else if (this.props.userName === 'JDH') {
        currRep = 'Joel';
      }


      setTimeout((function() {
        let followUpsFinish = function() {
          if (this.state.clearedOldProposal && this.state.clearedHot && this.state.clearedRetouches) {
            console.log('hotData');
            console.log(this.state.hotData);
            let weekAgo = new Date(+new Date - 1000*60*60*24*7);
            let twoWeeksAgo = new Date(+new Date - 1000*60*60*24*14);

            let hotFollows = {
              'proposal': {
                'blown': [],
                'missed': [],
                'send': [],
              },
              'reference': {
                'blown': [],
                'missed': [],
                'send': [],
              },
              'first': {
                'blown': [],
                'missed': [],
                'send': [],
              },
              'follow': {
                'blown': [],
                'missed': [],
                'send': [],
              },
            };
            for (var i in this.state.hotData) {

              if (this.state.hotData[i].fields['Follow Ups'] === 0) { // new proposals
                let propDate = new Date(this.state.hotData[i].fields['Proposal Date']);
                propDate = new Date(propDate.getTime() + Math.abs(propDate.getTimezoneOffset()*60000));
                let threeAgo;
                let twoAgo;
                let blownAgo;
                if (propDate.getDay() === 5) {
                  twoAgo = new Date(+new Date - 1000*60*60*24*2);
                  threeAgo = new Date(+new Date - 1000*60*60*24*4);
                  blownAgo = new Date(+new Date - 1000*60*60*24*9);
                } else {
                  twoAgo = new Date(+new Date - 1000*60*60*24*1);
                  threeAgo = new Date(+new Date - 1000*60*60*24*3);
                  blownAgo = new Date(+new Date - 1000*60*60*24*7);
                }
                if (threeAgo < propDate) {
                  if (twoAgo > propDate) {
                    hotFollows.proposal.send.push(this.state.hotData[i]);
                  }
                } else {
                  if (blownAgo < propDate) {
                    hotFollows.proposal.missed.push(this.state.hotData[i]);
                  } else {
                    hotFollows.proposal.blown.push(this.state.hotData[i]);
                  }
                }
              } else if (this.state.hotData[i].fields['Follow Ups'] === 1) { //reference list
                let followDate = new Date(this.state.hotData[i].fields['Last Contact']);
                followDate = new Date(followDate.getTime() + Math.abs(followDate.getTimezoneOffset()*60000));

                let threeAgo;
                let twoAgo;
                let blownAgo;
                if (followDate.getDay() === 5) {
                  twoAgo = new Date(+new Date - 1000*60*60*24*3);
                  threeAgo = new Date(+new Date - 1000*60*60*24*5);
                  blownAgo = new Date(+new Date - 1000*60*60*24*10);
                } else {
                  twoAgo = new Date(+new Date - 1000*60*60*24*2);
                  threeAgo = new Date(+new Date - 1000*60*60*24*4);
                  blownAgo = new Date(+new Date - 1000*60*60*24*9);
                }

                if (threeAgo < followDate) {
                  if (twoAgo > followDate) {
                    hotFollows.reference.send.push(this.state.hotData[i]);
                  }
                } else {
                  if (blownAgo < followDate) {
                    hotFollows.reference.missed.push(this.state.hotData[i]);
                  } else {
                    hotFollows.reference.blown.push(this.state.hotData[i]);
                  }
                }
              } else if (this.state.hotData[i].fields['Follow Ups'] === 2) { //first good email
                let followDate = new Date(this.state.hotData[i].fields['Last Contact']);
                followDate = new Date(followDate.getTime() + Math.abs(followDate.getTimezoneOffset()*60000));
                let weekAgo = new Date(+new Date - 1000*60*60*24*7);
                let weekAgoMissed = new Date(+new Date - 1000*60*60*24*9);
                let blownAgo = new Date(+new Date - 1000*60*60*24*14);


                if (weekAgo > followDate) {
                  if (blownAgo > followDate) {
                    hotFollows.first.blown.push(this.state.hotData[i]);
                  } else if (weekAgoMissed > followDate) {
                    hotFollows.first.missed.push(this.state.hotData[i]);
                  } else {
                    hotFollows.first.send.push(this.state.hotData[i]);
                  }
                }
              } else {
                let followDate = new Date(this.state.hotData[i].fields['Last Contact']);
                followDate = new Date(followDate.getTime() + Math.abs(followDate.getTimezoneOffset()*60000));
                let weekAgo = new Date(+new Date - 1000*60*60*24*7);
                let weekAgoMissed = new Date(+new Date - 1000*60*60*24*9);
                let blownAgo = new Date(+new Date - 1000*60*60*24*14);


                if (weekAgo > followDate) {
                  if (blownAgo > followDate) {
                    hotFollows.follow.blown.push(this.state.hotData[i]);
                  } else if (weekAgoMissed > followDate) {
                    hotFollows.follow.missed.push(this.state.hotData[i]);
                  } else {
                    hotFollows.follow.send.push(this.state.hotData[i]);
                  }
                }
              }
            }

            let reverseProposal = hotFollows.proposal.missed.reverse();
            hotFollows.proposal.missed = reverseProposal;

            let reverseReference = hotFollows.reference.missed.reverse();
            hotFollows.reference.missed = reverseReference;

            let reverseFirst = hotFollows.first.missed.reverse();
            hotFollows.first.missed = reverseFirst;
            console.log(hotFollows);



            let recentAgo = new Date(+new Date - 1000*60*60*24*21);
            let oldAgo = new Date(+new Date - 1000*60*60*24*60);

            let oldProposalFollows = {
              'recent': {
                'large': [],
                'medium': [],
                'small': [],
              },
              'old': {
                'large': [],
                'medium': [],
                'small': [],
              },
              'cold': {
                'large': [],
                'medium': [],
                'small': [],
              },
            };

            for (var i in this.state.oldProposalData) {
              let followDate = new Date(this.state.oldProposalData[i].fields['Last Contact']);
              let amount = parseInt(this.state.oldProposalData[i].fields['Monthly Amount']);
              if (followDate < oldAgo) {
                if (amount < 500) {
                  oldProposalFollows.cold.small.push(this.state.oldProposalData[i]);
                } else if (amount < 1500) {
                  oldProposalFollows.cold.medium.push(this.state.oldProposalData[i]);
                } else {
                  oldProposalFollows.cold.large.push(this.state.oldProposalData[i]);
                }
              } else if (recentAgo < followDate) {
                if (amount < 500) {
                  oldProposalFollows.recent.small.push(this.state.oldProposalData[i]);
                } else if (amount < 1500) {
                  oldProposalFollows.recent.medium.push(this.state.oldProposalData[i]);
                } else {
                  oldProposalFollows.recent.large.push(this.state.oldProposalData[i]);
                }
              } else {
                if (amount < 500) {
                  oldProposalFollows.old.small.push(this.state.oldProposalData[i]);
                } else if (amount < 1500) {
                  oldProposalFollows.old.medium.push(this.state.oldProposalData[i]);
                } else {
                  oldProposalFollows.old.large.push(this.state.oldProposalData[i]);
                }
              }
            }



            let retouchFollows = {
              'large': [],
              'medium': [],
              'small': [],
            };

            for (var i in this.state.retouchesData) {
              let amount = parseInt(this.state.retouchesData[i].fields['Monthly Amount']);
              if (amount < 500) {
                retouchFollows.small.push(this.state.retouchesData[i]);
              } else if (amount < 1500) {
                retouchFollows.medium.push(this.state.retouchesData[i]);
              } else {
                retouchFollows.large.push(this.state.retouchesData[i]);
              }
            }

            this.setState({
              loading: false,
              hotData: hotFollows,
              oldProposalData: oldProposalFollows,
              retouchesData: retouchFollows,
            });

          }
        }.bind(this);

        let loadHotData = function() {
          console.log('load hotData');
          let preTampa = this.state.hotData;

          hotURL = 'https://api.airtable.com/v0/' + this.props.baseId + '/' + 'Sales' + '?view=' + currRep + '+Hot' + '&sort%5B0%5D%5Bfield%5D=Last+Contact&sort%5B0%5D%5Bdirection%5D=asc';
          if (this.state.hotOffset !== '') {hotURL = hotURL + '&offset=' + this.state.hotOffset;}

          return axios
            .get(hotURL).then(response => {
              this.setState({
                hotData: preTampa.concat(response.data.records),
                error: false,
                hotOffset: response.data.offset,
              });
            if (response.data.offset !== undefined) {
              loadHotData();
            } else {
              console.log('clearing loadHotData()');
              this.setState({
                clearedHot: true,
                hotOffset: '',
              });
              followUpsFinish();
            }
          });
        }.bind(this);
        let loadOldProposals = function() {
          console.log('load oldProposal');
          let preOrlando = this.state.oldProposalData;

          oldProposalURL = 'https://api.airtable.com/v0/' + this.props.baseId + '/' + 'Sales' + '?view=' + currRep + '+Old+Proposals' + '&sort%5B0%5D%5Bfield%5D=Last+Contact&sort%5B0%5D%5Bdirection%5D=asc';
          if (this.state.oldProposalOffset !== '') {oldProposalURL = oldProposalURL + '&offset=' + this.state.oldProposalOffset;}

          console.log(oldProposalURL);
          return axios
            .get(oldProposalURL).then(response => {
              this.setState({
                oldProposalData: preOrlando.concat(response.data.records),
                error: false,
                oldProposalOffset: response.data.offset,
              });
            if (response.data.offset !== undefined) {
              loadOldProposals();
            } else {
              this.setState({
                clearedOldProposal: true,
                oldProposalOffset: '',
              });
              console.log('clearing loadOldProposals()');
              followUpsFinish();
            }
          });
        }.bind(this);


        let loadRetouches = function() {
          console.log('load oldProposal');
          let preOrlando = this.state.retouchesData;

          retouchesURL = 'https://api.airtable.com/v0/' + this.props.baseId + '/' + 'Sales' + '?view=' + currRep + '+Retouches' + '&sort%5B0%5D%5Bfield%5D=Last+Contact&sort%5B0%5D%5Bdirection%5D=asc';
          if (this.state.retouchesOffset !== '') {retouchesURL = retouchesURL + '&offset=' + this.state.retouchesOffset;}

          console.log(retouchesURL);
          return axios
            .get(retouchesURL).then(response => {
              this.setState({
                retouchesData: preOrlando.concat(response.data.records),
                error: false,
                retouchesOffset: response.data.offset,
              });
            if (response.data.offset !== undefined) {
              loadRetouches();
            } else {
              this.setState({
                clearedRetouches: true,
                retouchesOffset: '',
              });
              console.log('clearing loadRetouches()');
              followUpsFinish();
            }
          });
        }.bind(this);

        loadHotData(); //start loading hot data

        setTimeout((function() { //delay loading oldProposal
          loadOldProposals();

          setTimeout((function() { //delay loading retouches
            loadRetouches();
          }).bind(this), 250);
        }).bind(this), 250);

      }).bind(this), 250);

    }).bind(this), 250);
  }

  componentDidMount() {
    this.loadFollowUps();
  }


  // Render
  // ----------------------------------------------------
  render() {
    const { hotData, oldProposalData, retouchesData, referenceList } = this.state;

    let followModalWrapper = "FollowUpsModal modalInner";
    if (!this.state.noVisit) {
      followModalWrapper += " noVisitHide";
    }

    if (this.state.loading) {
      return (
        <div className="modalInner">
          <div className="modalTitle">
            <h4>Sales Follow Ups</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
            </div>
          </div>
        </div>
      )
    } else {

      if (this.state.viewType === 'list') {
        if (this.state.currentView === 'hot') {
          return (
            <div className={followModalWrapper}>
              <div className="modalTitle">
                <h4>Follow Ups</h4>
                <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                  <img src={exit} alt="exit" />
                </div>
              </div>
              <div className="navBtns" onClick={this.changeView}>
                <p className="isActive" id="recent">Recents</p>
                <p id="old">Old Proposals</p>
                <p id="retouch">Retouches</p>
              </div>

              <div className="repList">
                <h4>Recent Proposals</h4>
                {hotData.proposal.send.length > 0 ? hotData.proposal.send.map((e, i, followType) => this.followUpItem(e, i, 'proposal')): ''}
                {hotData.proposal.send.length > 0 ? <br /> : ''}

                {hotData.proposal.missed.length > 0 ? hotData.proposal.missed.map((e, i, followType) => this.followUpItemMeh(e, i, 'proposal')) : ''}
                {hotData.proposal.missed.length > 0 ? <br /> : ''}

                {hotData.proposal.blown.length > 0 ? hotData.proposal.blown.map((e, i, followType) => this.followUpItemBlown(e, i, 'proposal')) : ''}
                <hr />

                <h4>Reference Lists</h4>
                {hotData.reference.send.length > 0 ? hotData.reference.send.map((e, i, followType) => this.followUpItem(e, i, 'reference')): ''}
                {hotData.reference.send.length > 0 ? <br /> : ''}

                {hotData.reference.missed.length > 0 ? hotData.reference.missed.map((e, i, followType) => this.followUpItemMeh(e, i, 'reference')): ''}
                {hotData.reference.missed.length > 0 ? <br /> : ''}

                {hotData.reference.blown.length > 0 ? hotData.reference.blown.map((e, i, followType) => this.followUpItemBlown(e, i, 'reference')) : ''}
                <hr />

                <h4>First Ongoing</h4>
                {hotData.first.send.length > 0 ? hotData.first.send.map((e, i, followType) => this.followUpItem(e, i, 'first')) : ''}
                {hotData.first.send.length > 0 ? <br /> : ''}

                {hotData.first.missed.length > 0 ? hotData.first.missed.map((e, i, followType) => this.followUpItemMeh(e, i, 'first')) : ''}
                {hotData.first.missed.length > 0 ? <br /> : ''}

                {hotData.first.blown.length > 0 ? hotData.first.blown.map((e, i, followType) => this.followUpItemBlown(e, i, 'first')) : ''}
                <hr />

                <h4>Continued</h4>
                {hotData.follow.send.length > 0 ? hotData.follow.send.map((e, i, followType) => this.followUpItem(e, i, 'follow')) : ''}
                {hotData.follow.send.length > 0 ? <br /> : ''}

                {hotData.follow.missed.length > 0 ? hotData.follow.missed.map((e, i, followType) => this.followUpItemMeh(e, i, 'follow')) : ''}
                {hotData.follow.missed.length > 0 ? <br /> : ''}

                {hotData.follow.blown.length > 0 ? hotData.follow.blown.map((e, i, followType) => this.followUpItemBlown(e, i, 'follow')) : ''}

              </div>
            </div>
          );
        } else if (this.state.currentView === 'oldProposals') {
          return (
            <div className={followModalWrapper}>
              <div className="modalTitle">
                <h4>Follow Ups</h4>
                <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                  <img src={exit} alt="exit" />
                </div>
              </div>
              <div className="navBtns" onClick={this.changeView}>
                <p id="recent">Recents</p>
                <p className="isActive" id="old">Old Proposals</p>
                <p id="retouch">Retouches</p>
              </div>

              <div className="repList">
                <h4>Large Accounts ($1,500+)</h4>
                {oldProposalData.recent.large.length > 0 ? oldProposalData.recent.large.map((e, i, followType) => this.followUpItem(e, i, 'proposal')) : ''}
                {oldProposalData.recent.large.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.old.large.length > 0 ? oldProposalData.old.large.map((e, i, followType) => this.followUpItemMeh(e, i, 'proposal')) : ''}
                {oldProposalData.old.large.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.cold.large.length > 0 ? oldProposalData.cold.large.map((e, i, followType) => this.followUpItemBlown(e, i, 'proposal')) : ''}
                <hr />

                <h4>Medium Accounts ($500+)</h4>
                {oldProposalData.recent.medium.length > 0 ? oldProposalData.recent.medium.map((e, i, followType) => this.followUpItem(e, i, 'proposal')) : ''}
                {oldProposalData.recent.medium.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.old.medium.length > 0 ? oldProposalData.old.medium.map((e, i, followType) => this.followUpItemMeh(e, i, 'proposal')) : ''}
                {oldProposalData.old.medium.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.cold.medium.length > 0 ? oldProposalData.cold.medium.map((e, i, followType) => this.followUpItemBlown(e, i, 'proposal')) : ''}
                <hr />

                <h4>Small Accounts (> $500)</h4>
                {oldProposalData.recent.small.length > 0 ? oldProposalData.recent.small.map((e, i, followType) => this.followUpItem(e, i, 'proposal')) : ''}
                {oldProposalData.recent.small.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.old.small.length > 0 ? oldProposalData.old.small.map((e, i, followType) => this.followUpItemMeh(e, i, 'proposal')) : ''}
                {oldProposalData.old.small.length > 0 > 0 ? <br /> : ''}

                {oldProposalData.cold.small.length > 0 ? oldProposalData.cold.small.map((e, i, followType) => this.followUpItemBlown(e, i, 'proposal')) : ''}

              </div>
            </div>
          );
        } else if (this.state.currentView === 'retouches') {
          return (
            <div className={followModalWrapper}>
              <div className="modalTitle">
                <h4>Follow Ups</h4>
                <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                  <img src={exit} alt="exit" />
                </div>
              </div>

              <div className="navBtns" onClick={this.changeView}>
                <p id="recent">Recents</p>
                <p id="old">Old Proposals</p>
                <p className="isActive" id="retouch">Retouches</p>
              </div>

              <div className="repList">
                {retouchesData.large.length > 0 ? <h4>Large Accounts ($1,500+)</h4> : ''}
                {retouchesData.large.length > 0 ? retouchesData.large.map((e, i) => this.followUpItemMeh(e, i)) : ''}
                {retouchesData.large.length > 0 ? <hr /> : ''}

                {retouchesData.medium.length > 0 ? <h4>Medium Accounts ($500+)</h4> : ''}
                {retouchesData.medium.length > 0 ? retouchesData.medium.map((e, i) => this.followUpItemMeh(e, i)) : ''}
                {retouchesData.medium.length > 0 ? <hr /> : ''}

                {retouchesData.small.length > 0 ? <h4>Small Accounts (> $500)</h4> : ''}
                {retouchesData.small.length > 0 ? retouchesData.small.map((e, i) => this.followUpItemMeh(e, i)) : ''}
              </div>
            </div>
          );
        }
      } else {
        //change view to followup modal
        let linkTo = window.location.pathname;
        if (linkTo.substring(linkTo.length-1) !== "/") {
          linkTo += "/";
        }
        linkTo += this.state.openedFollow.id;

        let currRep;
        if (this.props.userName === 'NWP') {
          currRep = 'Nolan';
        } else if (this.props.userName === 'TMP') {
          currRep = 'Tyler';
        } else if (this.props.userName === 'JDH') {
          currRep = 'Joel';
        }


        let emailBody = this.state.currentFollowUp.fields['Email Template'];

        let contactFirst;
        if (this.state.openedFollow.fields['Main contact'].indexOf(' ') < 0) {
          contactFirst = this.state.openedFollow.fields['Main contact'];
        } else {
          contactFirst = this.state.openedFollow.fields['Main contact'].split(' ')[0];
        }

        let timeOfDay = 'Morning';
        let today = new Date();
        let halfTime = today.getHours();
        if (halfTime > 11) {
          timeOfDay = 'Afternoon';
        }


        if (this.state.currentView === 'hot' && this.state.followType === 'reference') {
          return (
            <div className={followModalWrapper}>
              <div className="modalTitle">
                <div className="backArrow" onClick={this.backToList}>
                  <img src={arrow_back} alt="Go Back" />
                </div>
                <h4>{this.state.openedFollow.fields['Company Name']}</h4>


                <span className="ViewRec"><a onClick={this.heardBack}>Skip Reference</a> / <Link target="_blank" to={linkTo}>View Record</Link></span>

              </div>

              <div className="splitHalf">
                <div className="half">
                  <p>{this.state.openedFollow.fields['Email']}</p>
                  <input id="emailSubject" defaultValue={this.state.currentFollowUp.fields['Subject']} onClick={this.copySubject} />
                  <textarea id="copyBody" rows='9' defaultValue={this.state.currentFollowUp.fields['Email Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay)} />
                </div>
                <div className="half referenceSide">
                  <p>Current - ${this.state.openedFollow.fields['Monthly Amount']} | {this.state.openedFollow.fields['Actual Sq Footage']}sqft</p>
                  <form onSubmit={this.loadReferences}>
                    <input id="searchTerm" placeholder="Add Search Term (optional)" />
                    <select id="zoomFilter">
                      <option value="zip">Zip</option>
                      <option value="city">City</option>
                      <option value="region">Region</option>
                    </select>
                    <button type="submit" className="btn softGrad--black">Search</button>
                  </form>

                  <div className="inner" id="resultsBox">
                    {referenceList.length > 0 ? referenceList.map((e, i) => this.referenceItem(e, i)): <h2>No Results</h2>}
                  </div>
                </div>
                <div className="half noteSide">
                  <p>Notes</p>
                  <textarea rows='9' defaultValue={this.state.openedFollow.fields['Notes']} />
                </div>
              </div>
              <a className="btn softGrad--primary centerIt" onClick={this.copyEmail}>Copy Follow Up</a>
              <a className="btn softGrad--black centerIt" onClick={this.sentEmail}>Sent Email</a>

            </div>
          );
        } else {
          return (
            <div className={followModalWrapper}>
              <div className="modalTitle">
                <div className="backArrow" onClick={this.backToList}>
                  <img src={arrow_back} alt="Go Back" />
                </div>
                <h4>{this.state.openedFollow.fields['Company Name']}</h4>



                <span className="ViewRec"><a onClick={this.heardBack}>Heard Back</a> / <Link target="_blank" to={linkTo}>View Record</Link></span>
              </div>

              <div className="splitNotes">
                <div className="followUp">
                  <p>{this.state.openedFollow.fields['Email']}</p>
                  <input id="emailSubject" defaultValue={this.state.currentFollowUp.fields['Subject']} onClick={this.copySubject} />
                  <textarea id="copyBody" rows='9' defaultValue={this.state.currentFollowUp.fields['Email Template'].replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay)} />
                </div>
                <div className="noteSide">
                  <p>Notes</p>
                  <textarea rows='9' defaultValue={this.state.openedFollow.fields['Notes']} />
                </div>
              </div>
              <a className="btn softGrad--primary" onClick={this.copyEmail}>Copy Follow Up</a>
              <a className="btn softGrad--black centerIt" onClick={this.sentEmail}>Sent Email</a>

            </div>
          );
        }




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

    let refRecord = '/' + this.props.citySet + '/customer-service/all/' + reference.id;

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

    let followClasses = 'followUpItem';
    if (followUps.fields['Proposal Type'] === 'No-Visit') {
      followClasses += ' noVisit';
    }

    return (
      <div className={followClasses} onClick={()=>this.openFollowUp(followUps, followType)}>
        <p>{finalDate}</p>
        <h2>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
  followUpItemMeh(followUps, i, followType) {
    let lastContact = new Date(followUps.fields['Last Contact']);
    lastContact = new Date(lastContact.getTime() + Math.abs(lastContact.getTimezoneOffset()*60000));
    let finalDate = (lastContact.getMonth() + 1) + '/' + lastContact.getDate() + '/' + lastContact.getFullYear();

    let followClasses = 'followUpItem missed';
    if (followUps.fields['Proposal Type'] === 'No-Visit') {
      followClasses += ' noVisit';
    }

    return (
      <div className={followClasses} onClick={()=>this.openFollowUp(followUps, followType)}>
        <p>{finalDate}</p>
        <h2>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
  followUpItemBlown(followUps, i, followType) {
    let lastContact = new Date(followUps.fields['Last Contact']);
    lastContact = new Date(lastContact.getTime() + Math.abs(lastContact.getTimezoneOffset()*60000));
    let finalDate = (lastContact.getMonth() + 1) + '/' + lastContact.getDate() + '/' + lastContact.getFullYear();

    let followClasses = 'followUpItem blown';
    if (followUps.fields['Proposal Type'] === 'No-Visit') {
      followClasses += ' noVisit';
    }

    return (
      <div className={followClasses} onClick={()=>this.openFollowUp(followUps, followType)}>
        <h2>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
}


SalesFollowUps.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
