import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Activity from './Dashboard/Activity';
import CallList from './Dashboard/CallList';
import CallModal from './Dashboard/CallModal';
import QualifyModal from './Dashboard/QualifyModal';
import FinalizeModal from './Dashboard/FinalizeModal';
import ApiConfig from '../config'

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import filter from '../assets/icons/black/filter.png';
import sort from '../assets/icons/black/sort.png';
import loader from '../assets/loader.gif';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];

export default class Sales extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      tampaId: 'appEX8GXgcD2ln4dB',
      orlandoId: 'appXNufXR9nQARjgs',
      loadingText: 'Finding Your Callbacks',

      openedCall: {},

      tampaOffset: '',
      orlandoOffset: '',
      regionOffset: '',

      tampaCallbacks: {
        reminder: [],
        hot: [],
      },
      orlandoCallbacks: {
        reminder: [],
        hot: [],
      },
      tampaRecentAPPC: [],
      orlandoRecentAPPC: [],
      tampaGenerated: [],
      orlandoGenerated: [],
      tampaOldAPPC: [],
      orlandoOldAPPC: [],

      recentActivityTampa: [],
      recentActivityOrlando: [],
      activityOffset: '',

      allGenerated: {
        tampa: [],
        orlando: [],
      },

      tampaZips: [],
      orlandoZips: [],

      tampaRegions: [],
      orlandoRegions: [],

      tampaCalled: 0,
      orlandoCalled: 0,



      modalType: '',
      modal: false,
    }
  }



  loadDashboard = () => {
    // let insideRep = 'Carla';
    let insideRep = localStorage.getItem('userName').split(' ')[0]

    let loadFinish = function() {
      console.log(this.state);
      console.log(this.state.starts);

      let tampaRecentAPPCData = [];

      for (var i in this.state.tampaRecentAPPC) {
        let amount = parseInt(this.state.tampaRecentAPPC[i].fields['Monthly Amount']);
        if (amount > 499) {
          tampaRecentAPPCData.push(this.state.tampaRecentAPPC[i]);
        }
      }
      this.setState({
        tampaRecentAPPC: tampaRecentAPPCData,
      });
      console.log(tampaRecentAPPCData);
    }.bind(this);

    let loadTampaReminders = function() {
      console.log('loadTampaReminders');
      let grabRecords = this.state.tampaCallbacks.reminder;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=' + insideRep + '+Callbacks';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          let roundArray = {
            reminder: grabRecords.concat(response.data.records),
            hot: this.state.tampaCallbacks.hot,
          }
          this.setState({
            tampaCallbacks: roundArray,
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaReminders();
        } else {
          console.log('clearing loadTampaReminders()');

          this.setState({
            tampaOffset: '',
          });
          loadTampaHot();
        }
      });
    }.bind(this);
    loadTampaReminders(); //run on load


    let loadTampaHot = function() {
      console.log('loadTampaHot');
      let grabRecords = this.state.tampaCallbacks.hot;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=' + insideRep + '+Hot';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          let roundArray = {
            reminder: this.state.tampaCallbacks.reminder,
            hot: grabRecords.concat(response.data.records),
          }
          this.setState({
            tampaCallbacks: roundArray,
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaHot();
        } else {
          console.log('clearing loadTampaHot()');

          this.setState({
            tampaOffset: '',
          });
          loadOrlandoReminders();
        }
      });
    }.bind(this);





    let loadOrlandoReminders = function() {
      console.log('loadOrlandoReminders');
      let grabRecords = this.state.orlandoCallbacks.reminder;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=' + insideRep + '+Callbacks';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          let roundArray = {
            reminder: grabRecords.concat(response.data.records),
            hot: this.state.orlandoCallbacks.hot,
          }
          this.setState({
            orlandoCallbacks: roundArray,
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoReminders();
        } else {
          console.log('clearing loadOrlandoReminders()');

          this.setState({
            orlandoOffset: '',
          });
          loadOrlandoHot();
        }
      });
    }.bind(this);


    let loadOrlandoHot = function() {
      console.log('loadOrlandoHot');
      let grabRecords = this.state.orlandoCallbacks.hot;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=' + insideRep + '+Hot';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          let roundArray = {
            reminder: this.state.orlandoCallbacks.reminder,
            hot: grabRecords.concat(response.data.records),
          }
          this.setState({
            orlandoCallbacks: roundArray,
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoHot();
        } else {
          console.log('clearing loadOrlandoHot()');

          this.setState({
            orlandoOffset: '',
          });
          loadTampaProposals();
        }
      });
    }.bind(this);


    let loadTampaProposals = function() {
      console.log('loadTampaProposals');
      let grabRecords = this.state.tampaRecentAPPC;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=' + insideRep + '+Recent+APPCs';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaRecentAPPC: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaProposals();
        } else {
          console.log('clearing loadTampaProposals()');

          this.setState({
            tampaOffset: '',
          });
          loadOrlandoProposals();
        }
      });
    }.bind(this);



    let loadOrlandoProposals = function() {
      console.log('loadOrlandoProposals');
      let grabRecords = this.state.orlandoRecentAPPC;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=' + insideRep + '+Recent+APPCs';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoRecentAPPC: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoProposals();
        } else {
          console.log('clearing loadOrlandoProposals()');






          let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
          if (localStorage.getItem('generated') === todaysDate) {
            console.log('load from filter. No Generate!');
            this.setState({
              loadingText: "Loading Today's List",
              orlandoOffset: '',
            });
            loadPreGeneratedList();
          } else {
            this.setState({
              loadingText: 'Generating Call Lists',
              orlandoOffset: '',
            });
            loadGeneratedList();
          }
        }
      });
    }.bind(this);


    let loadPreGeneratedList = function() {

      let dailyTampa = function() {
        console.log('dailyTampa');
        let grabRecords = this.state.tampaGenerated;

        let insideRep = localStorage.getItem('userName');
        let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=' + insideRep.split(' ')[0] + '+Daily';
        // customersURL += '&filterByFormula=NOT(%7BList+Old+APPC%7D+%3D+"True")';
        if (this.state.tampaOffset) {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

        return axios
          .get(customersURL).then(response => {

            console.log(response.data.records);

            this.setState({
              tampaGenerated: grabRecords.concat(response.data.records),
              tampaOffset: response.data.offset,
            });
          if (response.data.offset !== undefined) {
            dailyTampa();
          } else {
            console.log('clearing dailyTampa()');
            finishTampa();
          }
        });
      }.bind(this);
      dailyTampa();





      let finishTampa = function() {
        let finalGenerated = {
          tampa: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
          orlando: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
        };

        let newTampaGenerated = this.state.tampaGenerated;

        for (var i in newTampaGenerated) {
          let pushRecord = newTampaGenerated[i].fields;
          let pushRecordId = newTampaGenerated[i].id;

          let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
          // let insideRep = 'Carla Milian';
          let insideRep = localStorage.getItem('userName');

          pushRecord["Caller List"] = insideRep;
          pushRecord["List Generated On"] = generatedOn;

          let finalPush = {"fields": pushRecord}


          if (pushRecord["Times per Week"] === '7x') {
            finalGenerated.tampa.x7.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '6x') {
            finalGenerated.tampa.x6.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '5x') {
            finalGenerated.tampa.x5.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '4x') {
            finalGenerated.tampa.x4.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '3x') {
            finalGenerated.tampa.x3.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '2x') {
            finalGenerated.tampa.x2.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '1x') {
            finalGenerated.tampa.x1.push(newTampaGenerated[i]);
          } else {
            finalGenerated.tampa.unknown.push(newTampaGenerated[i]);
          }
        }

        this.setState({
          allGenerated: finalGenerated,
        });
        setTimeout((function() {
          console.log(this.state.allGenerated);
        }).bind(this), 50);

        dailyOrlando();
      }.bind(this);

      let dailyOrlando = function() {
        console.log('dailyOrlando');
        let grabRecords = this.state.orlandoGenerated;

        let insideRep = localStorage.getItem('userName');
        let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=' + insideRep.split(' ')[0] + '+Daily';
        // customersURL += '&filterByFormula=NOT(%7BList+Old+APPC%7D+%3D+"True")';
        if (this.state.orlandoOffset) {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

        return axios
          .get(customersURL).then(response => {

            console.log(response.data.records);

            this.setState({
              orlandoGenerated: grabRecords.concat(response.data.records),
              orlandoOffset: response.data.offset,
            });
          if (response.data.offset !== undefined) {
            dailyOrlando();
          } else {
            finishOrlando();
          }
        });
      }.bind(this);

      let finishOrlando = function() {
        let finalGenerated = {
          tampa: this.state.allGenerated.tampa,
          orlando: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
        };



        let newOrlandoGenerated = this.state.orlandoGenerated;

        for (var i in newOrlandoGenerated) {
          let pushRecord = newOrlandoGenerated[i].fields;
          let pushRecordId = newOrlandoGenerated[i].id;

          let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
          // let insideRep = 'Carla Milian';
          let insideRep = localStorage.getItem('userName');

          pushRecord["Caller List"] = insideRep;
          pushRecord["List Generated On"] = generatedOn;

          let finalPush = {"fields": pushRecord}



          if (pushRecord["Times per Week"] === '7x') {
            finalGenerated.orlando.x7.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '6x') {
            finalGenerated.orlando.x6.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '5x') {
            finalGenerated.orlando.x5.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '4x') {
            finalGenerated.orlando.x4.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '3x') {
            finalGenerated.orlando.x3.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '2x') {
            finalGenerated.orlando.x2.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '1x') {
            finalGenerated.orlando.x1.push(newOrlandoGenerated[i]);
          } else {
            finalGenerated.orlando.unknown.push(newOrlandoGenerated[i]);
          }
        }

        this.setState({
          allGenerated: finalGenerated,
        });

        setTimeout((function() {
          console.log(this.state.allGenerated);
        }).bind(this), 50);

        this.loadActivityData();
      }.bind(this);
    }.bind(this);




    let loadGeneratedList = function() {
      let finishZips = function() {
        let tampaRegions = [];
        let orlandoRegions = [];

        for (var i in this.state.tampaZips) {
          let thisZip = this.state.tampaZips[i];
          let getRegion = thisZip.fields['Region'];

          if (tampaRegions.find(x => x.region === thisZip.fields['Region'])) {
            let rightRegion = tampaRegions.find(x => x.region === thisZip.fields['Region']);
            rightRegion.zips.push(thisZip.fields['Zip']);
          } else {
            let pushObj = {
              region: thisZip.fields['Region'],
              zips: [thisZip.fields['Zip']],
              stipulation: thisZip.fields['Has Stipulations'],
              callable: thisZip.fields['Callable'],
            }
            tampaRegions.push(pushObj);
          }
        }
        for (var i in this.state.orlandoZips) {
          let thisZip = this.state.orlandoZips[i];
          let getRegion = thisZip.fields['Region'];

          if (orlandoRegions.find(x => x.region === thisZip.fields['Region'])) {
            let rightRegion = orlandoRegions.find(x => x.region === thisZip.fields['Region']);
            rightRegion.zips.push(thisZip.fields['Zip']);
          } else {
            let pushObj = {
              region: thisZip.fields['Region'],
              zips: [thisZip.fields['Zip']],
              stipulation: thisZip.fields['Has Stipulations'],
              callable: thisZip.fields['Callable'],
            }
            orlandoRegions.push(pushObj);
          }
        }
        setTimeout((function() {
          this.setState({
            tampaRegions: tampaRegions,
            orlandoRegions: orlandoRegions,
          })
          setTimeout((function() {
            generateTampa();
          }).bind(this), 50);
        }).bind(this), 100);

      }.bind(this);

      let loadTampaZips = function() {
        console.log('loadTampaZips');
        let zipList = this.state.tampaZips;

        let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + 'Tampa?view=Callable';
        if (this.state.regionOffset !== '') {customersURL = customersURL + '&offset=' + this.state.regionOffset;}

        return axios
          .get(customersURL).then(response => {
            this.setState({
              tampaZips: zipList.concat(response.data.records),
              regionOffset: response.data.offset,
            });
          if (response.data.offset !== undefined) {
            loadTampaZips();
          } else {
            console.log('clearing loadTampaZips()');
            this.setState({
              regionOffset: '',
            });
            loadOrlandoZips();
          }
        });
      }.bind(this);
      loadTampaZips(); //run on load


      let loadOrlandoZips = function() {
        console.log('loadOrlandoZips');
        let zipList = this.state.orlandoZips;

        let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + 'Orlando?view=Callable';
        if (this.state.regionOffset !== '') {customersURL = customersURL + '&offset=' + this.state.regionOffset;}

        return axios
          .get(customersURL).then(response => {
            this.setState({
              orlandoZips: zipList.concat(response.data.records),
              regionOffset: response.data.offset,
            });
          if (response.data.offset !== undefined) {
            loadOrlandoZips();
          } else {
            console.log('clearing loadOrlandoZips()');
            this.setState({
              regionOffset: '',
            });
            finishZips();
          }
        });
      }.bind(this);


      let generateTampa = function() {
        let tampaRegionCount =  this.state.tampaRegions.length - 1;
        let currentCount = 0;

        let loadRegion = function() {
          let regionFilter = 'OR(';
          for (var i in this.state.tampaRegions[currentCount].zips) {
            if (i === '0') {  regionFilter += 'FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
            else { regionFilter += '%2C+FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
          }
          regionFilter += ')';

          let randomNumb;
          if (this.state.tampaRegions[currentCount].stipulation === 'Yes') {
            randomNumb = Math.floor(Math.random() * 1) + 1; //loads up to 4 from has stipulations
          } else {
            if (this.state.tampaRegions[currentCount].callable === 'Priority') {
              randomNumb = Math.floor(Math.random() * 10) + 1 //loads up to
            } else {
              randomNumb = Math.floor(Math.random() * 8) + 1 //loads up to
            }
          }
          // if (this.state.tampaRegions[currentCount].stipulation === 'Yes') {
          //   randomNumb = Math.floor(Math.random() * 1) + 1; //loads up to 4 from has stipulations
          // } else {
          //   randomNumb = Math.floor(Math.random() * 8) + 1 //loads up to 13 from green-lit
          // }
          console.log(this.state.tampaRegions[currentCount].region + ' - ' + currentCount + ' - ' + randomNumb);
          let generateArr = this.state.tampaGenerated;
          let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Callable&pageSize=' + randomNumb + '&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"APPC")%2C+NOT(%7BStanding%7D+%3D+"Mark+for+Deletion")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY())))%2C+' + regionFilter + ')';
          return axios
            .get(customersURL).then(response => {
              this.setState({
                tampaGenerated: generateArr.concat(response.data.records),
              });
              if (currentCount === tampaRegionCount) {
                console.log(this.state.tampaGenerated);
                tampaOldAPPCs();
                this.setState({
                  loadingText: 'Generating Orlando List',
                })
              } else {
                this.setState({
                  loadingText: 'Generating from ' + this.state.tampaRegions[currentCount].region,
                })
                currentCount ++;
                loadRegion();
              }
            });

        }.bind(this);
        loadRegion();

      }.bind(this);


      let tampaOldAPPCs = function() {
        let tampaRegionCount =  this.state.tampaRegions.length - 1;
        let currentCount = 0;
        currentCount = Math.floor(Math.random() * tampaRegionCount) + 1; //randomly grabs from one green-lit region

        let regionFilter = 'OR(';
        for (var i in this.state.tampaRegions[currentCount].zips) {
          if (i === '0') {  regionFilter += 'FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
          else { regionFilter += '%2C+FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
        }
        regionFilter += ')';

        let eightMonthsAgo = new Date(+new Date - 1000*60*60*24*239);  eightMonthsAgo = (eightMonthsAgo.getMonth()+1) + '/' + eightMonthsAgo.getDate() + '/' + eightMonthsAgo.getFullYear();
        let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Callable&pageSize=10&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IS_BEFORE(%7BProposal+Date}%2C+"' + eightMonthsAgo + '"%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY()))%2C+' + regionFilter + '))';
        return axios
          .get(customersURL).then(response => {
            console.log(response.data.records);
            this.setState({
              tampaOldAPPC: response.data.records,
            });
            finishTampa();
          });
      }.bind(this);


      let finishTampa = function() {
        let finalGenerated = {
          tampa: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
          orlando: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
        };

        let propedAPPC = [];
        for (var i in this.state.tampaOldAPPC) {
          let newitem = this.state.tampaOldAPPC[i];
          newitem.fields["List Old APPC"] = 'True';
          newitem['Type'] = 'appc';
          propedAPPC.push(newitem);
        }

        let propedGenerated = [];
        for (var i in this.state.tampaGenerated) {
          let newitem = this.state.tampaGenerated[i];
          newitem['Type'] = 'basic';
          propedGenerated.push(newitem);
        }

        let newTampaGenerated = propedAPPC.concat(propedGenerated);

        for (var i in newTampaGenerated) {
          let pushRecord = newTampaGenerated[i].fields;
          let pushRecordId = newTampaGenerated[i].id;

          let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
          // let insideRep = 'Carla Milian';
          let insideRep = localStorage.getItem('userName');

          pushRecord["Caller List"] = insideRep;
          pushRecord["List Generated On"] = generatedOn;

          let finalPush = {"fields": pushRecord}


          if (pushRecord["Times per Week"] === '7x') {
            finalGenerated.tampa.x7.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '6x') {
            finalGenerated.tampa.x6.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '5x') {
            finalGenerated.tampa.x5.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '4x') {
            finalGenerated.tampa.x4.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '3x') {
            finalGenerated.tampa.x3.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '2x') {
            finalGenerated.tampa.x2.push(newTampaGenerated[i]);
          } else if (pushRecord["Times per Week"] === '1x') {
            finalGenerated.tampa.x1.push(newTampaGenerated[i]);
          } else {
            finalGenerated.tampa.unknown.push(newTampaGenerated[i]);
          }
          if (pushRecord["Times per Week"] === '7x' || pushRecord["Times per Week"] === '6x' || pushRecord["Times per Week"] === '5x' || pushRecord["Times per Week"] === '4x' || pushRecord["Times per Week"] === '3x' || pushRecord["Times per Week"] === '2x' || pushRecord["Times per Week"] === '1x') {
            axios.put(this.state.dataURL + this.state.tampaId + '/Sales/' + pushRecordId, finalPush);
          }
        }


        let totalKnown = finalGenerated.tampa.x7.length + finalGenerated.tampa.x6.length + finalGenerated.tampa.x5.length + finalGenerated.tampa.x4.length + finalGenerated.tampa.x3.length + finalGenerated.tampa.x2.length + finalGenerated.tampa.x1.length;
        let totalUnknown = finalGenerated.tampa.unknown.length;
        let knownRatio = totalKnown/totalUnknown;

        console.log('totalUnknown - ' + totalUnknown);
        console.log('totalKnown - ' + totalKnown);
        let finalUnknown = [];
        for (var i in finalGenerated.tampa.unknown) {
          if (Math.random() < 0.6) {
            finalUnknown.push(finalGenerated.tampa.unknown[i]);
          }
        }
        finalGenerated.tampa.unknown = finalUnknown;

        for (var i in finalGenerated.tampa.unknown) {
          let pushRecord = finalGenerated.tampa.unknown[i].fields;
          let pushRecordId = finalGenerated.tampa.unknown[i].id;
          let finalPush = {"fields": pushRecord}
          axios.put(this.state.dataURL + this.state.tampaId + '/Sales/' + pushRecordId, finalPush);
        }

        this.setState({
          allGenerated: finalGenerated,
          loadingText: 'Generating from ' + this.state.orlandoRegions[0].region,
        });
        setTimeout((function() {
          console.log(this.state.allGenerated);
        }).bind(this), 50);

        generateOrlando();
      }.bind(this);



      let generateOrlando = function() {
        let orlandoRegionCount =  this.state.orlandoRegions.length - 1;
        let currentCount = 0;

        let loadRegion = function() {
          let regionFilter = 'OR(';
          for (var i in this.state.orlandoRegions[currentCount].zips) {
            if (i === '0') {  regionFilter += 'FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
            else { regionFilter += '%2C+FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
          }
          regionFilter += ')';

          let randomNumb;

          if (this.state.orlandoRegions[currentCount].stipulation === 'Yes') {
            randomNumb = Math.floor(Math.random() * 4) + 1; //loads up to 4 from has stipulations
          } else {
            if (this.state.orlandoRegions[currentCount].callable === 'Priority') {
              randomNumb = Math.floor(Math.random() * 18) + 1 //loads up to 13 from green-lit
            } else {
              randomNumb = Math.floor(Math.random() * 13) + 1 //loads up to 13 from green-lit
            }
          }

          //
          // if (this.state.orlandoRegions[currentCount].stipulation === 'Yes') {
          //   randomNumb = Math.floor(Math.random() * 4) + 1; //loads up to 4 from has stipulations
          // } else {
          //   randomNumb = Math.floor(Math.random() * 15) + 1 //loads up to 12 from green-lit
          // }
          console.log(this.state.orlandoRegions[currentCount].region + ' - ' + currentCount + ' - ' + randomNumb);

          let generateArr = this.state.orlandoGenerated;
          let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Callable&pageSize=' + randomNumb + '&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"APPC")%2C+NOT(%7BStanding%7D+%3D+"Mark+for+Deletion")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY())))%2C+' + regionFilter + ')';
          return axios
            .get(customersURL).then(response => {
              this.setState({
                orlandoGenerated: generateArr.concat(response.data.records),
              });
              if (currentCount === orlandoRegionCount) {
                this.setState({
                  loadingText: 'Wrapping up...',
                })
                orlandoOldAPPCs();
              } else {
                this.setState({
                  loadingText: 'Generating from ' + this.state.orlandoRegions[currentCount].region,
                })
                currentCount ++;
                loadRegion();
              }
            });

        }.bind(this);
        loadRegion();

      }.bind(this);


      let orlandoOldAPPCs = function() {
        let orlandoRegionCount =  this.state.orlandoRegions.length - 1;
        let currentCount = 0;
        currentCount = Math.floor(Math.random() * orlandoRegionCount) + 1; //randomly grabs from one green-lit region

        let regionFilter = 'OR(';
        for (var i in this.state.orlandoRegions[currentCount].zips) {
          if (i === '0') {  regionFilter += 'FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
          else { regionFilter += '%2C+FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
        }
        regionFilter += ')';

        let eightMonthsAgo = new Date(+new Date - 1000*60*60*24*239);  eightMonthsAgo = (eightMonthsAgo.getMonth()+1) + '/' + eightMonthsAgo.getDate() + '/' + eightMonthsAgo.getFullYear();
        let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Callable&pageSize=10&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IS_BEFORE(%7BProposal+Date}%2C+"' + eightMonthsAgo + '"%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY()))%2C+' + regionFilter + '))';
        return axios
          .get(customersURL).then(response => {
            this.setState({
              orlandoOldAPPC: response.data.records,
            });
            finishOrlando();
          });
      }.bind(this);


      let finishOrlando = function() {
        let finalGenerated = {
          tampa: this.state.allGenerated.tampa,
          orlando: {
            x7: [],
            x6: [],
            x5: [],
            x4: [],
            x3: [],
            x2: [],
            x1: [],
            unknown: [],
          },
        };

        let propedAPPC = [];
        for (var i in this.state.orlandoOldAPPC) {
          let newitem = this.state.orlandoOldAPPC[i];
          newitem.fields["List Old APPC"] = 'True';
          newitem['Type'] = 'appc';
          propedAPPC.push(newitem);
        }

        let propedGenerated = [];
        for (var i in this.state.orlandoGenerated) {
          let newitem = this.state.orlandoGenerated[i];
          newitem['Type'] = 'basic';
          propedGenerated.push(newitem);
        }

        let newOrlandoGenerated = propedAPPC.concat(propedGenerated);

        for (var i in newOrlandoGenerated) {
          let pushRecord = newOrlandoGenerated[i].fields;
          let pushRecordId = newOrlandoGenerated[i].id;

          let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
          // let insideRep = 'Carla Milian';
          let insideRep = localStorage.getItem('userName');

          pushRecord["Caller List"] = insideRep;
          pushRecord["List Generated On"] = generatedOn;

          let finalPush = {"fields": pushRecord}



          if (pushRecord["Times per Week"] === '7x') {
            finalGenerated.orlando.x7.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '6x') {
            finalGenerated.orlando.x6.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '5x') {
            finalGenerated.orlando.x5.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '4x') {
            finalGenerated.orlando.x4.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '3x') {
            finalGenerated.orlando.x3.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '2x') {
            finalGenerated.orlando.x2.push(newOrlandoGenerated[i]);
          } else if (pushRecord["Times per Week"] === '1x') {
            finalGenerated.orlando.x1.push(newOrlandoGenerated[i]);
          } else {
            finalGenerated.orlando.unknown.push(newOrlandoGenerated[i]);
          }
          if (pushRecord["Times per Week"] === '7x' || pushRecord["Times per Week"] === '6x' || pushRecord["Times per Week"] === '5x' || pushRecord["Times per Week"] === '4x' || pushRecord["Times per Week"] === '3x' || pushRecord["Times per Week"] === '2x' || pushRecord["Times per Week"] === '1x') {
            axios.put(this.state.dataURL + this.state.orlandoId + '/Sales/' + pushRecordId, finalPush);
          }
        }

        let totalKnown = finalGenerated.orlando.x7.length + finalGenerated.orlando.x6.length + finalGenerated.orlando.x5.length + finalGenerated.orlando.x4.length + finalGenerated.orlando.x3.length + finalGenerated.orlando.x2.length + finalGenerated.orlando.x1.length;
        let totalUnknown = finalGenerated.orlando.unknown.length;
        let knownRatio = totalKnown/totalUnknown;

        console.log('totalUnknown orl - ' + totalUnknown);
        console.log('totalKnown orl - ' + totalKnown);
        let finalUnknown = [];
        for (var i in finalGenerated.orlando.unknown) {
          if (Math.random() < 0.6) {
            finalUnknown.push(finalGenerated.orlando.unknown[i]);
          }
        }
        finalGenerated.orlando.unknown = finalUnknown;

        for (var i in finalGenerated.orlando.unknown) {
          let pushRecord = finalGenerated.orlando.unknown[i].fields;
          let pushRecordId = finalGenerated.orlando.unknown[i].id;
          let finalPush = {"fields": pushRecord}
          axios.put(this.state.dataURL + this.state.orlandoId + '/Sales/' + pushRecordId, finalPush);
        }


        this.setState({
          allGenerated: finalGenerated,
        });

        this.loadActivityData();

        let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
        localStorage.setItem('generated', generatedOn)
        setTimeout((function() {
          console.log(this.state.allGenerated);
        }).bind(this), 50);

      }.bind(this);
    }.bind(this);
  }


  loadActivityData = () => {
    let loadTampaActivity = function() {
      console.log('loadTampaActivity');
      let grabRecords = this.state.recentActivityTampa;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Recent+Activity&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Monthly+Amount&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Sales+Rep&fields%5B%5D=Company+Name&fields%5B%5D=Status';
      if (this.state.activityOffset !== '') {customersURL = customersURL + '&offset=' + this.state.activityOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            recentActivityTampa: grabRecords.concat(response.data.records),
            activityOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaActivity();
        } else {
          console.log('clearing loadTampaActivity()');

          this.setState({
            activityOffset: '',
          });
          loadOrlandoActivity();
        }
      });
    }.bind(this);
    loadTampaActivity();



    let loadOrlandoActivity = function() {
      console.log('loadOrlandoActivity');
      let grabRecords = this.state.recentActivityOrlando;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Recent+Activity&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Monthly+Amount&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Sales+Rep&fields%5B%5D=Company+Name&fields%5B%5D=Status';
      if (this.state.activityOffset !== '') {customersURL = customersURL + '&offset=' + this.state.activityOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            recentActivityOrlando: grabRecords.concat(response.data.records),
            activityOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoActivity();
        } else {
          console.log('clearing loadOrlandoActivity()');

          this.setState({
            activityOffset: '',
          });

          propTheAreas();
        }
      });
    }.bind(this);

    let propTheAreas = function() {

      let tampaActivity = this.state.recentActivityTampa;
      let orlandoActivity = this.state.recentActivityOrlando;
      for (var i in tampaActivity) {
        let thisFields = tampaActivity[i].fields;
        thisFields['region'] = 'tampa';
        thisFields['id'] = tampaActivity[i].id;
      }
      for (var i in orlandoActivity) {
        let thisFields = orlandoActivity[i].fields;
        thisFields['region'] = 'orlando';
        thisFields['id'] = orlandoActivity[i].id;
      }


      this.setState({
        recentActivityTampa: tampaActivity,
        recentActivityOrlando: orlandoActivity,
      });

      finishActivity();
    }.bind(this);



    let finishActivity = function() {
      console.log(this.state.recentActivityTampa);
      console.log(this.state.recentActivityOrlando);

      let blendedActivity = this.state.recentActivityOrlando.concat(this.state.recentActivityTampa);
      console.log(blendedActivity);

      let recentActivity = [];

      for (var i in blendedActivity) {
        let activityItem = {
          item: blendedActivity[i].fields,
          date: '',
          type: '',
          region: '',
        }
        let setDate;  if (blendedActivity[i].fields['Appt. Set Date']){setDate = new Date(blendedActivity[i].fields['Appt. Set Date'])}
        let apptDate;  if (blendedActivity[i].fields['Appt. Date']){apptDate = new Date(blendedActivity[i].fields['Appt. Date'])}
        let propDate; if (blendedActivity[i].fields['Proposal Date']){propDate = new Date(blendedActivity[i].fields['Proposal Date'])}
        let closeDate;  if (blendedActivity[i].fields['Close Date']){closeDate = new Date(blendedActivity[i].fields['Close Date'])}

        if (setDate) {
          if (propDate > setDate) {
            if (closeDate > propDate) {
              activityItem.type = 'close';
              activityItem.date = closeDate;
            } else {
              activityItem.type = 'proposal';
              activityItem.date = propDate;
            }
          } else {
            activityItem.type = 'appointment';
            activityItem.date = setDate;
          }
        } else if (apptDate) {
          if (propDate > apptDate) {
            if (closeDate > propDate) {
              activityItem.type = 'close';
              activityItem.date = closeDate;
            } else {
              activityItem.type = 'proposal';
              activityItem.date = propDate;
            }
          } else {
            activityItem.type = 'appointment';
            activityItem.date = apptDate;
          }
        } else if (propDate) {
          if (closeDate > propDate) {
            activityItem.type = 'close';
            activityItem.date = closeDate;
          } else {
            activityItem.type = 'proposal';
            activityItem.date = propDate;
          }
        } else { //random close without appt or prop
          activityItem.type = 'close';
          activityItem.date = closeDate;
        }
        recentActivity.push(activityItem);
      }

      recentActivity.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

      console.log(recentActivity);


      let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
      let tampaCalled = 0;

      for (var i in this.state.allGenerated.tampa.x7) {
        let itemDate = new Date(this.state.allGenerated.tampa.x7[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x6) {
        let itemDate = new Date(this.state.allGenerated.tampa.x6[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x5) {
        let itemDate = new Date(this.state.allGenerated.tampa.x5[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x4) {
        let itemDate = new Date(this.state.allGenerated.tampa.x4[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x3) {
        let itemDate = new Date(this.state.allGenerated.tampa.x3[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x2) {
        let itemDate = new Date(this.state.allGenerated.tampa.x2[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.x1) {
        let itemDate = new Date(this.state.allGenerated.tampa.x1[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      for (var i in this.state.allGenerated.tampa.unknown) {
        let itemDate = new Date(this.state.allGenerated.tampa.unknown[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          tampaCalled ++;
        }
      }
      let orlandoCalled = 0;

      for (var i in this.state.allGenerated.orlando.x7) {
        let itemDate = new Date(this.state.allGenerated.orlando.x7[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x6) {
        let itemDate = new Date(this.state.allGenerated.orlando.x6[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x5) {
        let itemDate = new Date(this.state.allGenerated.orlando.x5[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x4) {
        let itemDate = new Date(this.state.allGenerated.orlando.x4[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x3) {
        let itemDate = new Date(this.state.allGenerated.orlando.x3[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x2) {
        let itemDate = new Date(this.state.allGenerated.orlando.x2[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.x1) {
        let itemDate = new Date(this.state.allGenerated.orlando.x1[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }
      for (var i in this.state.allGenerated.orlando.unknown) {
        let itemDate = new Date(this.state.allGenerated.orlando.unknown[i].fields['Recent Call Date']);
        itemDate = new Date(itemDate.getTime() + Math.abs(itemDate.getTimezoneOffset()*60000)); //fix the date
        itemDate = (itemDate.getMonth()+1) + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();

        if (itemDate === todaysDate){
          orlandoCalled ++;
        }
      }


      this.setState({
        recentActivity: recentActivity,
        loading: false,
        tampaCalled: tampaCalled,
        orlandoCalled: orlandoCalled,
      })
    }.bind(this);
  }






  generateMore = () => {
    this.setState({
      loading: true,
      tampaGenerated: [],
      orlandoGenerated: [],
      loadingText: 'Finding More Companies',
    })
    let finishZips = function() {
      let tampaRegions = [];
      let orlandoRegions = [];

      for (var i in this.state.tampaZips) {
        let thisZip = this.state.tampaZips[i];
        let getRegion = thisZip.fields['Region'];

        if (tampaRegions.find(x => x.region === thisZip.fields['Region'])) {
          let rightRegion = tampaRegions.find(x => x.region === thisZip.fields['Region']);
          rightRegion.zips.push(thisZip.fields['Zip']);
        } else {
          let pushObj = {
            region: thisZip.fields['Region'],
            zips: [thisZip.fields['Zip']],
            stipulation: thisZip.fields['Has Stipulations'],
            callable: thisZip.fields['Callable'],
          }
          tampaRegions.push(pushObj);
        }
      }
      for (var i in this.state.orlandoZips) {
        let thisZip = this.state.orlandoZips[i];
        let getRegion = thisZip.fields['Region'];

        if (orlandoRegions.find(x => x.region === thisZip.fields['Region'])) {
          let rightRegion = orlandoRegions.find(x => x.region === thisZip.fields['Region']);
          rightRegion.zips.push(thisZip.fields['Zip']);
        } else {
          let pushObj = {
            region: thisZip.fields['Region'],
            zips: [thisZip.fields['Zip']],
            stipulation: thisZip.fields['Has Stipulations'],
            callable: thisZip.fields['Callable'],
          }
          orlandoRegions.push(pushObj);
        }
      }
      setTimeout((function() {
        this.setState({
          tampaRegions: tampaRegions,
          orlandoRegions: orlandoRegions,
        })
        setTimeout((function() {
          generateTampa();
        }).bind(this), 50);
      }).bind(this), 100);

    }.bind(this);

    let loadTampaZips = function() {
      console.log('loadTampaZips');
      let zipList = this.state.tampaZips;

      let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + 'Tampa?view=Callable';
      if (this.state.regionOffset !== '') {customersURL = customersURL + '&offset=' + this.state.regionOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaZips: zipList.concat(response.data.records),
            regionOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaZips();
        } else {
          console.log('clearing loadTampaZips()');
          this.setState({
            regionOffset: '',
          });
          loadOrlandoZips();
        }
      });
    }.bind(this);
    loadTampaZips(); //run on load


    let loadOrlandoZips = function() {
      console.log('loadOrlandoZips');
      let zipList = this.state.orlandoZips;

      let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + 'Orlando?view=Callable';
      if (this.state.regionOffset !== '') {customersURL = customersURL + '&offset=' + this.state.regionOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoZips: zipList.concat(response.data.records),
            regionOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoZips();
        } else {
          console.log('clearing loadOrlandoZips()');
          this.setState({
            regionOffset: '',
          });
          finishZips();
        }
      });
    }.bind(this);


    let generateTampa = function() {
      let tampaRegionCount =  this.state.tampaRegions.length - 1;
      let currentCount = 0;

      let loadRegion = function() {
        let regionFilter = 'OR(';
        for (var i in this.state.tampaRegions[currentCount].zips) {
          if (i === '0') {  regionFilter += 'FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
          else { regionFilter += '%2C+FIND(' + this.state.tampaRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
        }
        regionFilter += ')';

        let randomNumb;


        if (this.state.tampaRegions[currentCount].stipulation === 'Yes') {
          randomNumb = Math.floor(Math.random() * 1) + 1; //loads up to 4 from has stipulations
        } else {
          if (this.state.tampaRegions[currentCount].callable === 'Priority') {
            randomNumb = Math.floor(Math.random() * 10) + 1 //loads up to
          } else {
            randomNumb = Math.floor(Math.random() * 7) + 1 //loads up to
          }
        }
        //
        // if (this.state.tampaRegions[currentCount].stipulation === 'Yes') {
        //   randomNumb = Math.floor(Math.random() * 1) + 1; //loads up to 4 from has stipulations
        // } else {
        //   randomNumb = Math.floor(Math.random() * 7) + 1 //loads up to 12 from green-lit
        // }
        console.log(this.state.tampaRegions[currentCount].region + ' - ' + currentCount + ' - ' + randomNumb);
        let generateArr = this.state.tampaGenerated;
        let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Callable&pageSize=' + randomNumb + '&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"APPC")%2C+NOT(%7BStanding%7D+%3D+"Mark+for+Deletion")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY())))%2C+' + regionFilter + ')';
        return axios
          .get(customersURL).then(response => {
            this.setState({
              tampaGenerated: generateArr.concat(response.data.records),
            });
            if (currentCount === tampaRegionCount) {
              console.log(this.state.tampaGenerated);
              finishTampa();
              this.setState({
                loadingText: 'Generating Orlando List',
              })
            } else {
              this.setState({
                loadingText: 'Generating from ' + this.state.tampaRegions[currentCount].region,
              })
              currentCount ++;
              loadRegion();
            }
          });

      }.bind(this);
      loadRegion();

    }.bind(this);


    let finishTampa = function() {
      let finalGenerated = {
        tampa: {
          x7: [],
          x6: [],
          x5: [],
          x4: [],
          x3: [],
          x2: [],
          x1: [],
          unknown: [],
        },
        orlando: {
          x7: [],
          x6: [],
          x5: [],
          x4: [],
          x3: [],
          x2: [],
          x1: [],
          unknown: [],
        },
      };

      let propedGenerated = [];
      for (var i in this.state.tampaGenerated) {
        let newitem = this.state.tampaGenerated[i];
        newitem['Type'] = 'basic';
        propedGenerated.push(newitem);
      }

      let newTampaGenerated = propedGenerated;

      for (var i in newTampaGenerated) {
        let pushRecord = newTampaGenerated[i].fields;
        let pushRecordId = newTampaGenerated[i].id;

        let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
        // let insideRep = 'Carla Milian';
        let insideRep = localStorage.getItem('userName');

        pushRecord["Caller List"] = insideRep;
        pushRecord["List Generated On"] = generatedOn;

        let finalPush = {"fields": pushRecord}


        if (pushRecord["Times per Week"] === '7x') {
          finalGenerated.tampa.x7.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '6x') {
          finalGenerated.tampa.x6.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '5x') {
          finalGenerated.tampa.x5.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '4x') {
          finalGenerated.tampa.x4.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '3x') {
          finalGenerated.tampa.x3.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '2x') {
          finalGenerated.tampa.x2.push(newTampaGenerated[i]);
        } else if (pushRecord["Times per Week"] === '1x') {
          finalGenerated.tampa.x1.push(newTampaGenerated[i]);
        } else {
          finalGenerated.tampa.unknown.push(newTampaGenerated[i]);
        }
        if (pushRecord["Times per Week"] === '7x' || pushRecord["Times per Week"] === '6x' || pushRecord["Times per Week"] === '5x' || pushRecord["Times per Week"] === '4x' || pushRecord["Times per Week"] === '3x' || pushRecord["Times per Week"] === '2x' || pushRecord["Times per Week"] === '1x') {
          axios.put(this.state.dataURL + this.state.tampaId + '/Sales/' + pushRecordId, finalPush);
        }
      }


      let totalKnown = finalGenerated.tampa.x7.length + finalGenerated.tampa.x6.length + finalGenerated.tampa.x5.length + finalGenerated.tampa.x4.length + finalGenerated.tampa.x3.length + finalGenerated.tampa.x2.length + finalGenerated.tampa.x1.length;
      let totalUnknown = finalGenerated.tampa.unknown.length;
      let knownRatio = totalKnown/totalUnknown;

      let finalUnknown = [];
      for (var i in finalGenerated.tampa.unknown) {
        if (Math.random() < 0.5) {
          finalUnknown.push(finalGenerated.tampa.unknown[i]);
        }
      }
      finalGenerated.tampa.unknown = finalUnknown;

      for (var i in finalGenerated.tampa.unknown) {
        let pushRecord = finalGenerated.tampa.unknown[i].fields;
        let pushRecordId = finalGenerated.tampa.unknown[i].id;
        let finalPush = {"fields": pushRecord}
        axios.put(this.state.dataURL + this.state.tampaId + '/Sales/' + pushRecordId, finalPush);
      }

      this.setState({
        allGenerated: finalGenerated,
        loadingText: 'Generating from ' + this.state.orlandoRegions[0].region,
      });
      setTimeout((function() {
        console.log(this.state.allGenerated);
      }).bind(this), 50);

      generateOrlando();
    }.bind(this);



    let generateOrlando = function() {
      let orlandoRegionCount =  this.state.orlandoRegions.length - 1;
      let currentCount = 0;

      let loadRegion = function() {
        let regionFilter = 'OR(';
        for (var i in this.state.orlandoRegions[currentCount].zips) {
          if (i === '0') {  regionFilter += 'FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)';}
          else { regionFilter += '%2C+FIND(' + this.state.orlandoRegions[currentCount].zips[i] + '%2C+%7BZip%7D)'; }
        }
        regionFilter += ')';

        let randomNumb;


        if (this.state.orlandoRegions[currentCount].stipulation === 'Yes') {
          randomNumb = Math.floor(Math.random() * 3) + 1; //loads up to 4 from has stipulations
        } else {
          if (this.state.orlandoRegions[currentCount].callable === 'Priority') {
            randomNumb = Math.floor(Math.random() * 15) + 1 //loads up to
          } else {
            randomNumb = Math.floor(Math.random() * 12) + 1 //loads up to
          }
        }

        // if (this.state.orlandoRegions[currentCount].stipulation === 'Yes') {
        //   randomNumb = Math.floor(Math.random() * 3) + 1; //loads up to 1 from has stipulations
        // } else {
        //   randomNumb = Math.floor(Math.random() * 13) + 1 //loads up to 3 from green-lit
        // }
        console.log(this.state.orlandoRegions[currentCount].region + ' - ' + currentCount + ' - ' + randomNumb);

        let generateArr = this.state.orlandoGenerated;
        let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Callable&pageSize=' + randomNumb + '&filterByFormula=AND(AND(NOT(%7BStatus%7D+%3D+"Appointment+Set")%2C+NOT(%7BStatus%7D+%3D+"Closed")%2C+NOT(%7BStatus%7D+%3D+"DNC")%2C+NOT(%7BStatus%7D+%3D+"APPC")%2C+NOT(%7BStanding%7D+%3D+"Mark+for+Deletion")%2C+NOT(%7BStatus%7D+%3D+"Too+Small"))%2C+AND(IF(NOT(%7BStanding%7D+%3D+"Call+Back")%2C+TRUE()%2C+IS_BEFORE(%7BCallback+Date%7D%2C+TODAY())%2C+TRUE())%2C+IF(%7BList+Generated+On%7D+%3D+BLANK()%2C+TRUE()%2C+IS_BEFORE(%7BList+Generated+On%7D%2C+TODAY())))%2C+' + regionFilter + ')';
        return axios
          .get(customersURL).then(response => {
            this.setState({
              orlandoGenerated: generateArr.concat(response.data.records),
            });
            if (currentCount === orlandoRegionCount) {
              this.setState({
                loadingText: 'Wrapping up...',
              })
              finishOrlando();
            } else {
              this.setState({
                loadingText: 'Generating from ' + this.state.orlandoRegions[currentCount].region,
              })
              currentCount ++;
              loadRegion();
            }
          });

      }.bind(this);
      loadRegion();

    }.bind(this);


    let finishOrlando = function() {
      let finalGenerated = {
        tampa: this.state.allGenerated.tampa,
        orlando: {
          x7: [],
          x6: [],
          x5: [],
          x4: [],
          x3: [],
          x2: [],
          x1: [],
          unknown: [],
        },
      };
      let propedGenerated = [];
      for (var i in this.state.orlandoGenerated) {
        let newitem = this.state.orlandoGenerated[i];
        newitem['Type'] = 'basic';
        propedGenerated.push(newitem);
      }

      let newOrlandoGenerated = propedGenerated;

      for (var i in newOrlandoGenerated) {
        let pushRecord = newOrlandoGenerated[i].fields;
        let pushRecordId = newOrlandoGenerated[i].id;

        let generatedOn  = new Date();  generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
        // let insideRep = 'Carla Milian';
        let insideRep = localStorage.getItem('userName');

        pushRecord["Caller List"] = insideRep;
        pushRecord["List Generated On"] = generatedOn;

        let finalPush = {"fields": pushRecord}



        if (pushRecord["Times per Week"] === '7x') {
          finalGenerated.orlando.x7.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '6x') {
          finalGenerated.orlando.x6.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '5x') {
          finalGenerated.orlando.x5.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '4x') {
          finalGenerated.orlando.x4.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '3x') {
          finalGenerated.orlando.x3.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '2x') {
          finalGenerated.orlando.x2.push(newOrlandoGenerated[i]);
        } else if (pushRecord["Times per Week"] === '1x') {
          finalGenerated.orlando.x1.push(newOrlandoGenerated[i]);
        } else {
          finalGenerated.orlando.unknown.push(newOrlandoGenerated[i]);
        }
        if (pushRecord["Times per Week"] === '7x' || pushRecord["Times per Week"] === '6x' || pushRecord["Times per Week"] === '5x' || pushRecord["Times per Week"] === '4x' || pushRecord["Times per Week"] === '3x' || pushRecord["Times per Week"] === '2x' || pushRecord["Times per Week"] === '1x') {
          axios.put(this.state.dataURL + this.state.orlandoId + '/Sales/' + pushRecordId, finalPush);
        }
      }

      let totalKnown = finalGenerated.orlando.x7.length + finalGenerated.orlando.x6.length + finalGenerated.orlando.x5.length + finalGenerated.orlando.x4.length + finalGenerated.orlando.x3.length + finalGenerated.orlando.x2.length + finalGenerated.orlando.x1.length;
      let totalUnknown = finalGenerated.orlando.unknown.length;
      let knownRatio = totalKnown/totalUnknown;

      let finalUnknown = [];
      for (var i in finalGenerated.orlando.unknown) {
        if (Math.random() < 0.5) {
          finalUnknown.push(finalGenerated.orlando.unknown[i]);
        }
      }
      finalGenerated.orlando.unknown = finalUnknown;

      for (var i in finalGenerated.orlando.unknown) {
        let pushRecord = finalGenerated.orlando.unknown[i].fields;
        let pushRecordId = finalGenerated.orlando.unknown[i].id;
        let finalPush = {"fields": pushRecord}
        axios.put(this.state.dataURL + this.state.orlandoId + '/Sales/' + pushRecordId, finalPush);
      }


      this.setState({
        allGenerated: finalGenerated,
      });
      setTimeout((function() {
        window.location.reload();
      }).bind(this), 2000);

    }.bind(this);
  }

















  showModal = (e, i, r) => {
    let activeId = '';
    if (document.getElementById('cold-tampa').className === 'isActive') {
      this.setState({
        generatedView: 'tampa',
      });
    } else {
      this.setState({
        generatedView: 'orlando',
      });
    }
    this.setState({
      modal: true,
      openedCall: e,
      itemRegion: r,
      generatedView: '',
    })
    if (i === 'qualify') {
      this.setState({
        modalType: 'Qualify',
      })
    } else {
      this.setState({
        modalType: 'Call',
      })
    }
  }

  closeModal = () => {
    this.setState({
      modal: false,
      modalType: '',
      openedCall: {},
      itemRegion: '',
    })
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




  googleCalLink = () => {
    if (this.state.openedCall.fields['Proposal Type'] === 'Visited') {

      let timeInput;
      if (this.state.currentTable === 'Sales') {
        timeInput = this.state.openedCall.fields['Appt. Time'];
      } else {
        timeInput = '10:00 AM';
      }
      let apptDate = this.state.openedCall.fields['Appt. Date'];
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

      let startApptDate = new Date(this.state.openedCall.fields['Appt. Date']);
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

      if (this.state.openedCall.fields['Sales Rep'] === 'Tyler Perkins') {
        salesInitials = 'TMP';
      } else if (this.state.openedCall.fields['Sales Rep'] === 'Nolan Perkins') {
        salesInitials = 'NWP'
      } else if (this.state.openedCall.fields['Sales Rep'] === 'Joel Horwitz') {
        salesInitials = 'JDH'
      } else if (this.state.openedCall.fields['Sales Rep'] === 'Rafael Milanes') {
        salesInitials = 'RAM'
      } else {
        salesInitials = this.state.openedCall.fields['Sales Rep'].replace(/ /g, '+');
      }

      let finalCalURL;

      if (this.state.openedCall.fields['Main contact']) {
        let contactFirst;
        if (this.state.openedCall.fields['Main contact'].indexOf(' ') < 0) {
          contactFirst = this.state.openedCall.fields['Main contact'];
        } else {
          contactFirst = this.state.openedCall.fields['Main contact'].split(' ')[0];
        }
        finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.state.openedCall.fields['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + ' (' + contactFirst + ')'+'&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=';

      } else {
        finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + salesInitials + '+-+' + this.state.openedCall.fields['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + '&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=';
      }

      if (this.state.calendarNote) {
        finalCalURL += 'Set By - ' + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + '<br/>';
        finalCalURL += this.state.calendarNote;
      }
      finalCalURL += '<br/><br/>+View+record+<a+href="/' + this.props.citySet + '/sales/' + this.state.openedCall.id + '">' + 'http://airmagic.co/' + this.props.citySet + '/sales/' + this.state.openedCall.id + '</a>';
      finalCalURL += '&location=' + this.state.openedCall.fields['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + ',+';
      if(this.state.openedCall.fields['Address 1']) {
        finalCalURL += this.state.openedCall.fields['Address 1'].replace(/ /g, '+').replace(/&/g, 'and');
      } if (this.state.openedCall.fields['Address 2']) {
        finalCalURL += '+'+this.state.openedCall.fields['Address 2'].replace(/ /g, '+').replace(/&/g, 'and');
      } if (this.state.openedCall.fields['City']) {
        finalCalURL += ',+' + this.state.openedCall.fields['City'].replace(/ /g, '+').replace(/&/g, 'and') + ',+FL+';
      } if (this.state.openedCall.fields['Zip']) {
        finalCalURL += this.state.openedCall.fields['Zip'].replace(/ /g, '+').replace(/&/g, 'and');
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
      if (this.state.openedCall.fields['Main contact'] && this.state.openedCall.fields['Email']) {
        if (this.state.openedCall.fields['Main contact'].indexOf(' ') < 0) {
          contactFirst = this.state.openedCall.fields['Main contact'];
        } else {
          contactFirst = this.state.openedCall.fields['Main contact'].split(' ')[0];
        }
        let timeOfDay = 'Morning';
        let today = new Date();
        let halfTime = today.getHours();
        if (halfTime > 11) {
          timeOfDay = 'Afternoon';
        }
        if (this.state.openedCall.fields['Email']) {
          let apptEmailLink = 'mailto:';
          apptEmailLink += this.state.openedCall.fields['Email'];
          apptEmailLink += "?subject=" + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + "%20from%20Vanguard%20Cleaning%20Systems%20Proposal";

          apptEmailLink += "&body=Good%20" + timeOfDay + "%20" + contactFirst;
          let apptDate = new Date(this.state.openedCall.fields['Appt. Date']);
          apptDate = (apptDate.getMonth()+1) + '/' + apptDate.getDate() + '/' + apptDate.getFullYear()

          apptEmailLink += "%2C%0A%0AThank%20you%20so%20much%20for%20your%20time%20today.%20It%20was%20a%20pleasure%20speaking%20with%20you.%0A%20Please%20note%20that%20on%20" + this.state.openedCall.fields['Appt. Date'] + "%20at%20" + this.state.openedCall.fields['Appt. Time'] + "%2C%20our%20Regional%20Sales%20Director%2C%20" + this.state.openedCall.fields['Sales Rep'] + "%2C%20will%20be%20meeting%20with%20you%20to%20learn%20about%20your%20cleaning%20needs%20in%20order%20to%20prepare%20a%20customized%20proposal%20of%20services%20for%20your%20review.%20%0A%0A" + contactFirst + "%2C%20thanks%20again%20for%20your%20time%20and%20consideration%20and%20I%20hope%20you%20have%20a%20great%20rest%20of%20your%20day.";


          var fakeEmailLink = document.createElement('a');
          fakeEmailLink.setAttribute('href', apptEmailLink);
          fakeEmailLink.style.display = 'none';
          document.body.appendChild(fakeEmailLink);
          fakeEmailLink.click();
          document.body.removeChild(fakeEmailLink);
        }
      }
    } // else {

      // //create the follow up line
      // let followUpTime = this.state.openedCall.fields['Appt. Time'];
      // let followUpDate = this.state.openedCall.fields['Appt. Date'];
      // followUpTime = followUpTime.toUpperCase();
      // let finalTime = {hours: 0,minutes: 0,amPm: 'AM'};
      //
      // let timeOnly;
      // if (followUpTime.includes('AM')) {
      //   finalTime.amPm = 'AM'; timeOnly = followUpTime.split('AM')[0].replace(/ /g, '');
      // } else if (followUpTime.includes('PM')) {
      //   finalTime.amPm = 'PM'; timeOnly = followUpTime.split('PM')[0].replace(/ /g, '');
      // } else {
      //   alert('Error! Please include an AM or PM on the APPOINTMENT TIME field');
      //   return;
      // }
      // if (timeOnly.includes(':')) {
      //   finalTime.hours = parseInt(timeOnly.split(':')[0]);
      //   console.log(finalTime.hours);
      //   finalTime.minutes = parseInt(timeOnly.split(':')[1]);
      // } if (timeOnly.length === 4 && !timeOnly.includes(':')) {
      //   finalTime.hours = timeOnly.substring(0, 2);
      //   finalTime.minutes = timeOnly.substring(2, 4);
      // } else {
      //   finalTime.hours = parseInt(timeOnly);
      // }
      // if (finalTime.amPm === 'PM' && finalTime.hours !== 12) {
      //   finalTime.hours = finalTime.hours + 12; //fix for 1-11pm
      // }
      // if (finalTime.amPm === 'AM' && finalTime.hours === 12) {
      //   finalTime.hours = 0; //fix for midnight
      // }
      //
      // let startApptDate = new Date(this.state.openedCall.fields['Appt. Date']);
      // startApptDate = new Date(startApptDate.getTime() + Math.abs(startApptDate.getTimezoneOffset()*60000)); //fix the date
      // startApptDate.setHours(finalTime.hours);//set hours
      // startApptDate.setMinutes(finalTime.minutes);//set minutes
      // let startApptDateTime = (new Date(startApptDate)).toISOString().replace(/-|:|\.\d\d\d/g,"");
      //
      // let endApptDate = new Date(startApptDate.getTime() + Math.abs(startApptDate.getTimezoneOffset()*60000)); //fix the date
      // endApptDate.setHours(finalTime.hours);//set hours
      // endApptDate.setMinutes(finalTime.minutes + 30);//set minutes
      // let endApptDateTime = (new Date(endApptDate)).toISOString().replace(/-|:|\.\d\d\d/g,"");
      //
      // console.log(finalTime);
      //
      // let salesInitials;
      //
      // let finalCalURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=Vanguard+Cleaning+Systems+and+' + this.state.openedCall.fields['Company Name'].replace(/ /g, '+').replace(/&/g, 'and') + '&dates='+ startApptDateTime + '/' + endApptDateTime +'&details=';
      //
      //
      // if (this.state.openedCall.fields['Main contact'].indexOf(' ') < 0) {
      //   finalCalURL += this.state.openedCall.fields['Main contact'];
      // } else {
      //   finalCalURL += this.state.openedCall.fields['Main contact'].split(' ')[0];
      // }
      //
      // finalCalURL += ',<br/>'
      // finalCalURL += this.state.openedCall.fields['Sales Rep'].split(' ')[0];
      // finalCalURL += '+will+be+sending+a+proposal+for+cleaning+shortly+and+will+then+follow+up+with+you+at+this+time+to+finalize+details+with+you.';
      // finalCalURL += '&sf=true&output=xml';
      // console.log(finalCalURL);
      //
      // var fakeLinkA = document.createElement('a');
      // fakeLinkA.setAttribute('href', finalCalURL);
      // fakeLinkA.setAttribute('target', '_blank');
      // fakeLinkA.style.display = 'none';
      // document.body.appendChild(fakeLinkA);
      // fakeLinkA.click();
      // document.body.removeChild(fakeLinkA);

    // }


    if (this.state.openedCall.fields['Main contact'] && this.state.openedCall.fields['Email']) {
      this.setState({
        modalType: 'Finalize',
      })
      this.saveRecordHandler('none');
    } else {
      this.customerEmail();
    }
  }

  customerEmail = () => {

    if (this.state.openedCall.fields['Proposal Type'] === 'Visited') {
      let contactFirst;
      if (this.state.openedCall.fields['Main contact'] && this.state.openedCall.fields['Email']) {
        if (this.state.openedCall.fields['Main contact'].indexOf(' ') < 0) {
          contactFirst = this.state.openedCall.fields['Main contact'];
        } else {
          contactFirst = this.state.openedCall.fields['Main contact'].split(' ')[0];
        }
        let timeOfDay = 'Morning';
        let today = new Date();
        let halfTime = today.getHours();
        if (halfTime > 11) {
          timeOfDay = 'Afternoon';
        }
        if (this.state.openedCall.fields['Email']) {
          let apptEmailLink = 'mailto:';
          apptEmailLink += this.state.openedCall.fields['Email'];
          apptEmailLink += "?subject=" + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + "%20from%20Vanguard%20Cleaning%20Systems%20Proposal";

          apptEmailLink += "&body=Good%20" + timeOfDay + "%20" + contactFirst;
          let apptDate = new Date(this.state.openedCall.fields['Appt. Date']);
          apptDate = (apptDate.getMonth()+1) + '/' + apptDate.getDate() + '/' + apptDate.getFullYear()

          apptEmailLink += "%2C%0A%0AThank%20you%20so%20much%20for%20your%20time%20today.%20It%20was%20a%20pleasure%20speaking%20with%20you.%0A%20Please%20note%20that%20on%20" + this.state.openedCall.fields['Appt. Date'] + "%20at%20" + this.state.openedCall.fields['Appt. Time'] + "%2C%20our%20Regional%20Sales%20Director%2C%20" + this.state.openedCall.fields['Sales Rep'] + "%2C%20will%20be%20meeting%20with%20you%20to%20learn%20about%20your%20cleaning%20needs%20in%20order%20to%20prepare%20a%20customized%20proposal%20of%20services%20for%20your%20review.%20%0A%0A" + contactFirst + "%2C%20thanks%20again%20for%20your%20time%20and%20consideration%20and%20I%20hope%20you%20have%20a%20great%20rest%20of%20your%20day.";


          var fakeEmailLink = document.createElement('a');
          fakeEmailLink.setAttribute('href', apptEmailLink);
          fakeEmailLink.style.display = 'none';
          document.body.appendChild(fakeEmailLink);
          fakeEmailLink.click();
          document.body.removeChild(fakeEmailLink);
        }
      }
    } else if (this.state.openedCall.fields['Proposal Type'] === 'No-Visit') {
      let contactFirst;

      if (this.state.openedCall.fields['Main contact'] && this.state.openedCall.fields['Email']) {
        if (this.state.openedCall.fields['Main contact'].indexOf(' ') < 0) {
          contactFirst = this.state.openedCall.fields['Main contact'];
        } else {
          contactFirst = this.state.openedCall.fields['Main contact'].split(' ')[0];
        }
        let timeOfDay = 'Morning';
        let today = new Date();
        let halfTime = today.getHours();
        if (halfTime > 11) {
          timeOfDay = 'Afternoon';
        }
        if (this.state.openedCall.fields['Email']) {
          let apptEmailLink = 'mailto:';
          apptEmailLink += this.state.openedCall.fields['Email'];
          apptEmailLink += "?subject=" + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + "%20from%20Vanguard%20Cleaning%20Systems%20Proposal";

          apptEmailLink += "&body=Good%20" + timeOfDay + "%20" + contactFirst;
          let followUpDate = new Date(this.state.openedCall.fields['Appt. Date']);
          followUpDate = (followUpDate.getMonth()+1) + '/' + followUpDate.getDate() + '/' + followUpDate.getFullYear()

          apptEmailLink += "%2C%0A%0AThank%20you%20so%20much%20for%20your%20time%20today.%20It%20was%20a%20pleasure%20speaking%20with%20you.%0A%20Please%20note%20that%20on%20" + this.state.openedCall.fields['Appt. Date'] + "%20at%20" + this.state.openedCall.fields['Appt. Time'] + "%2C%20our%20Regional%20Sales%20Director%2C%20" + this.state.openedCall.fields['Sales Rep'] + "%2C%20will%20be%20following%20up%20with%20you%20to%20discuss%20our%20proposal%20for%20cleaning.%20%0A%0A" + contactFirst + "%2C%20thanks%20again%20for%20your%20time%20and%20consideration%20and%20I%20hope%20you%20have%20a%20great%20rest%20of%20your%20day.";


          var fakeEmailLink = document.createElement('a');
          fakeEmailLink.setAttribute('href', apptEmailLink);
          fakeEmailLink.style.display = 'none';
          document.body.appendChild(fakeEmailLink);
          fakeEmailLink.click();
          document.body.removeChild(fakeEmailLink);
        }
      }
    }


    delete axios.defaults.headers.common["Authorization"];
    let slackMessage = ":bellhop_bell: :bellhop_bell:";
    let slackRep;
    if (this.state.openedCall.fields['Sales Rep'] && this.state.openedCall.fields['Sales Rep'] !== '') {
      slackRep = this.state.openedCall.fields['Sales Rep'].split(' ')[0];
      console.log('Sales Rep is ' + slackRep);
    } else {
      slackRep = 'none';
      console.log('no sales rep set');
    }

    let slackSet;
    if (this.state.openedCall.fields['Appt. Set By'] && this.state.openedCall.fields['Appt. Set By'] !== '') {
      slackSet = this.state.openedCall.fields['Appt. Set By'].split(' ')[0];
      console.log('Set By is ' + slackSet);
    } else {
      slackSet = 'none';
      console.log('no set by');
    }
    let secondMessage;
    if (slackSet === 'Linda' || slackSet === 'Eric' || slackSet === 'Carla' || slackSet === 'Shana' || slackSet === 'Lisa' || slackSet === 'Mariyah') {
      if (slackRep !== 'none' && slackSet !== 'none') { //we have both
        secondMessage = "\nLet's all give *" + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + '*, a :clap: for getting *' + this.state.openedCall.fields['Sales Rep'].split(' ')[0] + '* an appt. in *' + this.state.openedCall.fields['City'] + '*';
      } else if (slackRep !== 'none') { //rep is set
        secondMessage = '\nWe just got an appointment for *' + this.state.openedCall.fields['Sales Rep'].split(' ')[0] + '* in *' + this.state.openedCall.fields['City'] + '*!';
      } else if (slackSet !== 'none') { //set by is set
        secondMessage = "\nLet's all give *" + this.state.openedCall.fields['Appt. Set By'].split(' ')[0] + '*, a :clap: for getting an appt. in *' + this.state.openedCall.fields['City'] + '*';
      } else if (slackRep === 'none' && slackSet === 'none') {
        secondMessage = '\nWe just got an appointment in *' + this.state.openedCall.fields['City'] + '*!';
      }
    } else if (slackSet === 'Joel Horwitz' || slackSet === 'Tyler Perkins' || slackSet === 'Nolan Perkins') {
      secondMessage = slackSet + 'just set an appointment in *' + this.state.openedCall.fields['City'] + '*!';
    } else if (slackSet === 'Constant' || slackSet === 'Google' || slackSet === 'Thumbtack') {
      secondMessage = 'We just got an appointment in *' + this.state.openedCall.fields['City'] + '* from ' + this.state.openedCall.fields['Appt. Set By'] + '\n*Keep hustling everyone!*';
    } else if (slackSet === 'Incoming') {
      secondMessage = 'We just got an appointment in *' + this.state.openedCall.fields['City'] + '* from an Incoming Call.*\n*Keep hustling everyone!*';
    } else if (slackSet === 'Referral') {
      secondMessage = 'We just got an appointment from a referral in *' + this.state.openedCall.fields['City'] + '*.\n*Great job Customer Service team!*';
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
                setTimeout((function() {
                  window.location.reload();
                }).bind(this), 500)
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

                setTimeout((function() {
                  window.location.reload();
                }).bind(this), 500)
            }).bind(this), 2500);

        });



      }).bind(this), 2000);
    });
  }

  recentCalls = e => {
    let filterName = 'view=' + localStorage.getItem('userName').split(' ')[0] + ' Recent Calls'
    sessionStorage.setItem('listView', filterName);

    let linkName = '/' + e + '/sales/';
    setTimeout((function() {
      window.location.href = linkName;
    }).bind(this), 500)
  }


  callFromQualify = () => {
    this.setState({
      modalType: 'activeCall',
      modal: true,
    })
  }



  mergeGoogle = (e) => {
    console.log(e);
    let currentRec = this.state.openedCall;

    currentRec.fields['Company Name'] = e.name;
    currentRec.fields['Address 1'] = e.addressComponents.quickAdd;
    currentRec.fields['Address 2'] = e.addressComponents.addr2;
    currentRec.fields['City'] = e.addressComponents.city;
    currentRec.fields['Zip'] = e.addressComponents.zip;
    currentRec.fields['Office Phone'] = e.phone;

    this.setState({
      openedCall: currentRec
    })

    // setTimeout((function() {
    //   this.saveRecordHandler();
    // }).bind(this), 250);
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
      <div className="CallListWrapper">
        {this.modalShow}
        <div className="callNav">
          <Link to={`/`}>
            <div className="navIcon softGrad--black">
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4>Sales Dashboard</h4>

          <div className="btn softGrad--black recentCalls" onClick={()=>this.recentCalls('orlando')}>Recent Orlando</div>
          <div className="btn softGrad--black recentCalls" onClick={()=>this.recentCalls('tampa')}>Recent Tampa</div>
        </div>

        <CallList
          tampaCallbacks={this.state.tampaCallbacks}
          orlandoCallbacks={this.state.orlandoCallbacks}
          tampaRecentAPPC={this.state.tampaRecentAPPC}
          orlandoRecentAPPC={this.state.orlandoRecentAPPC}
          allGenerated={this.state.allGenerated}
          tampaCalled={this.state.tampaCalled}
          orlandoCalled={this.state.orlandoCalled}
          tampaOldAPPC={this.state.tampaOldAPPC}
          orlandoOldAPPC={this.state.orlandoOldAPPC}
          showModal={this.showModal}
          generateMore={this.generateMore}
        />

        <Activity
          recentActivity={this.state.recentActivity}
        />
      </div>
    );
  }

  get modalShow() {
    if (this.state.modal) {
      if (this.state.modalType === 'Qualify') {
        return (
          <QualifyModal
            openedCall = {this.state.openedCall}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            closeModal = {this.closeModal}
            citySet = {this.state.itemRegion}
            changeRecordHandler = {this.changeRecordHandler}
            selectChange = {this.selectChange}
            logCall = {this.logCall}
            mergeGoogle={this.mergeGoogle}
            callFromQualify={this.callFromQualify}
          />
        )
      } else if (this.state.modalType === 'Finalize') {
        return (
          <FinalizeModal
            openedCall = {this.state.openedCall}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            closeModal = {this.closeModal}
            citySet = {this.state.itemRegion}
            changeRecordHandler = {this.changeRecordHandler}
            selectChange = {this.selectChange}
            logCall = {this.logCall}
            customerEmail={this.customerEmail}
          />
        )
      } else {
        return (
          <CallModal
            openedCall = {this.state.openedCall}
            handleDayClick={this.handleDayClick}
            toggleDayPicker={this.toggleDayPicker}
            closeModal = {this.closeModal}
            citySet = {this.state.itemRegion}
            changeRecordHandler = {this.changeRecordHandler}
            selectChange = {this.selectChange}
            logCall = {this.logCall}
            generatedView = {this.state.generatedView}
          />
        )
      }
    }
  }
}
