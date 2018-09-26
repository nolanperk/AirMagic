import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import loader from '../../../assets/loader.gif';
import VolumeRow from './VolumeRow';
import exit from '../../../assets/icons/white/exit.png';

let noteCharge;
let rpSum = 0;
let finalURL;
let currentAccountState;

let vpHeight = window.window.innerHeight;
let filledRP = 0; let repRev = 0; let chargeRev = 0;
export default class VolumeOwed extends Component {
  constructor(props) {
    super();
    this.state = {
      spRecord: [],
      volumeData: [],
      calculatedVolumeData: [],
      rowCount: 0,
    }
  }


  hideDayPicker = () => {
    let getTheBlock = document.getElementById('volumePicker');
    getTheBlock.className = 'pickWrapper';
    this.setState({
      pickerId: null,
    })
  }
  clearDate = e => {
    console.log('clearDate()');
    currentAccountState = this.state.currentAccount;
    if (this.state.pickerId === 'start') {currentAccountState.fields['Start Date'] = null}
    else if (this.state.pickerId === 'stop') {currentAccountState.fields['Notice Date'] = null}

    this.setState({
      currentAccount: currentAccountState,
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }
  handleDayClick = day => {
    console.log('handleDayClick()');
    currentAccountState = this.state.currentAccount;
    let newSelectedDay = new Date(day);
    let currentIndex = this.state.pickerIndex;

    let finalDate = (newSelectedDay.getMonth() + 1) + '/' + newSelectedDay.getDate() + '/' + newSelectedDay.getFullYear();

    if (this.state.pickerId === 'start') {currentAccountState.fields['Start Date'] = finalDate}
    else if (this.state.pickerId === 'stop') {currentAccountState.fields['Notice Date'] = finalDate}

    this.setState({
      currentAccount: currentAccountState,
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }
  toggleDayPicker = (id, rowI, index) => {
    console.log('toggleDayPicker()');
    console.log(rowI + ' / ' + index);
    if (rowI) {
      let overallIndex = this.state.calculatedVolumeData[rowI].records[index];
      this.setState({
        currentAccount: overallIndex,
      })
    }
    let dayID = id;
    let pickerBlock = document.getElementById('volumePicker');
    let currAccount = this.state.volumeData[index];



    if (pickerBlock.className === 'pickWrapper isActive') {
      this.hideDayPicker();
    } else {
      pickerBlock.className = 'pickWrapper isActive';
      this.setState({
        pickerId: dayID,
        pickerIndex: this.state.volumeIndex,
      })
    }
  }


  editingAccountHandler = (e, key, index) => {
    filledRP = 0; repRev = 0; chargeRev = 0;
    console.log('editingAccountHandler()');
    if (this.state.recordChanges) {
      let pushRecord = this.state.currentAccount.fields;
      let pushRecordId = this.state.currentAccount.id;

      let finalPush = {"fields": pushRecord}
      console.log(finalPush);
      axios
      .patch('https://api.airtable.com/v0/' + this.props.baseId + '/Accounts/' + pushRecordId, finalPush)
        .then(response => {
        this.setState({
          recordChanges: false,
        });
        if (document.getElementById('volumePicker').className === 'pickWrapper isActive') {
          this.hideDayPicker();
        }
        this.loadData();
        console.log('success');
      })
      .catch(response => {
        console.error("error: ", response);
        this.setState({
          recordChanges: false,
        });
        setTimeout((function() {
          this.loadData();
        }).bind(this), 300);
      });
    }
    for (var index in this.state.volumeData) {
      if (this.state.volumeData[index].id === key) {
        this.setState({
          volumeIndex: index,
          currentAccount: this.state.volumeData[index],
        });
      }
    }




    // setTimeout((function() {
    //   if (document.getElementById('volumePicker').className === 'pickWrapper isActive') {
    //     this.setState({
    //       currentAccount: this.state.volumeData[this.state.pickerIndex],
    //     });
    //   } else {
    //     this.setState({
    //       currentAccount: this.state.volumeData[index],
    //     });
    //   }
    // }).bind(this), 100);
  }
  percRPChange = (e, i) => {
    currentAccountState = this.state.volumeData;

    let rpNumb;
    if (i['Rep. %'] === '25%') {
      rpNumb = 0.25;
    } else if (i['Rep. %'] === '50%') {
      rpNumb = 0.5;
    } else if (i['Rep. %'] === '75%') {
      rpNumb = 0.75;
    } else if (i['Rep. %'] === '100%') {
      rpNumb = 1;
    } else if (i['Rep. %'] === '0%') {
      rpNumb = 0;
    } else {
      rpNumb = 0;
    }

    let noteMult = 0;
    let rpNumber = 0;
    if (i['Currently Paid']) {
      let aaCurr = parseFloat(i['Currently Paid']);
      let aaNote = parseFloat(i['Notes Charge']);
      noteMult = aaCurr/aaNote;
      rpNumber = rpNumb*noteMult;
      currentAccountState[this.state.volumeIndex].fields['RP Revenue'] = (Math.ceil(rpNumber)).toString();
    } else {
      currentAccountState[this.state.volumeIndex].fields['RP Revenue'] = ((parseInt(i['Rep. %'].replace('%', '')) / 100) * i['Amount']).toString();
    }

    this.setState({
      volumeData: currentAccountState,
      currentAccount: currentAccountState[this.state.volumeIndex],
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }
  notesCalc = (e, i, v) => {
    currentAccountState = this.state.volumeData;

    let noteCharge;
    if (v === '3') {
      noteCharge = '3';
    } else if (v === '6') {
      noteCharge = '3.5';
    } else if (v === '12') {
      noteCharge = '4';
    } else if (v === '18' || v === '24' || v === '36' || v === '48') {
      noteCharge = '4.5';
    } else {
      noteCharge = 'none';
    }
    currentAccountState[this.state.volumeIndex].fields['Notes Charge'] = noteCharge;

    this.setState({
      volumeData: currentAccountState,
      currentAccount: currentAccountState[this.state.volumeIndex],
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }

  changeAccountHandler = e => {
    // filledRP = 0; repRev = 0; chargeRev = 0;
    console.log('changeAccountHandler()');
    currentAccountState = this.state.volumeData;
    let currentIndex = e.target.getAttribute('data-index');
    let currentId = e.target.getAttribute('data-key');

    console.log(this.state.currentId);

    if (e.target.id === 'account') {currentAccountState[this.state.volumeIndex].fields['Account Name'] = e.target.value}
    else if (e.target.id === 'amount') {
      if (e.target.value) {
        currentAccountState[this.state.volumeIndex].fields['Amount'] = parseFloat(e.target.value)
      } else {
        currentAccountState[this.state.volumeIndex].fields['Amount'] = 0;
      }
    }
    else if (e.target.id === 'start') {currentAccountState[this.state.volumeIndex].fields['Start Date'] = e.target.value}
    else if (e.target.id === 'stop') {currentAccountState[this.state.volumeIndex].fields['Notice Date'] = e.target.value}
    else if (e.target.id === 'rpRev') {
      if (e.target.value) {
        currentAccountState[this.state.volumeIndex].fields['RP Revenue'] = e.target.value = e.target.value
      } else {
        currentAccountState[this.state.volumeIndex].fields['RP Revenue'] = e.target.value = 0;
      }
    }
    else if (e.target.id === 'replacing') {currentAccountState[this.state.volumeIndex].fields['Accounts Replaced'] = e.target.value}
    else if (e.target.id === 'reason') {currentAccountState[this.state.volumeIndex].fields['Reasoning'] = e.target.value}
    else if (e.target.id === 'paidUp') {currentAccountState[this.state.volumeIndex].fields['Currently Paid'] = e.target.value}

    this.setState({
      volumeData: currentAccountState,
      currentAccount: currentAccountState[this.state.volumeIndex],
      recordChanges: true,
    })
  }

  deleteAccountItem = e => {
    console.log('deleteAccountItem()');
    console.log(e);
    return axios
      .delete('https://api.airtable.com/v0/' + this.props.baseId + '/Accounts/' + e.target.id)
      .then(response => {
        this.loadData();
      });
  }


  layoutCalculator = () => {
    let sign = this.props.sign; let dateSigned = new Date(sign); let checkDate = new Date('04/01/2018'); //Set check dates
    let planRevType; let planRev = 0; let addtlRev = 0; //setup plan stuff
    if (dateSigned <= checkDate) {planRevType = 'old';} else {planRevType = 'new';}
    if (planRevType === 'new') {
      if (this.props.plan === 'Plan A') {
        planRev = 2000;
      } else if (this.props.plan === 'Plan B') {
        planRev = 3000;
      } else if (this.props.plan === 'Plan C') {
        planRev = 4000;
      } else if (this.props.plan === 'Plan D') {
        planRev = 5000;
      } else if (this.props.plan === 'Plan E') {
        planRev = 6000;
      } else if (this.props.plan === 'Plan F') {
        planRev = 8000;
      } else if (this.props.plan === 'Plan G') {
        planRev = 10000;
      }
    } else {
      if (this.props.plan === 'Plan A') {
        planRev = 1000;
      } else if (this.props.plan === 'Plan B') {
        planRev = 1500;
      } else if (this.props.plan === 'Plan C') {
        planRev = 2000;
      } else if (this.props.plan === 'Plan D') {
        planRev = 3000;
      } else if (this.props.plan === 'Plan E') {
        planRev = 4000;
      } else if (this.props.plan === 'Plan F') {
        planRev = 5000;
      } else if (this.props.plan === 'Plan G') {
        planRev = 6000;
      }
    }
    if (this.props.ar === 'Yes') {
      addtlRev = 1000;
    }
    let extraRev = 0;
    for (var index in this.state.volumeData) {
      if (this.state.volumeData[index].fields['RP Revenue']) {
        repRev += parseFloat(this.state.volumeData[index].fields['RP Revenue']);
      }
    }
    console.log('total RP owed: ' + repRev);

    let totalArrs = {
      ip:[],
      ip_ar:[],
      ip_ar_rp:[],
      ip_ar_rp_aa:[],
      ip_ar_aa:[],
      ip_rp_aa:[],
      ip_rp:[],
      ip_aa:[],
      ar:[],
      ar_aa:[],
      ar_rp:[],
      ar_rp_aa:[],
      rp_aa:[],
      rp:[],
      aa:[],
    }

    let totalInit = addtlRev + planRev
    let initRP = 0;
    for (var index in this.state.volumeData) {
      let currAmount = parseFloat(this.state.volumeData[index].fields['Amount']);
      let iFields = this.state.volumeData[index];

      if (totalInit > currAmount) {
        if (this.state.volumeData[index].fields['RP Revenue']) {
          initRP += parseFloat(this.state.volumeData[index].fields['RP Revenue']);
        }
        if (planRev > 0) {
          if (planRev >= currAmount) { // IP
            totalInit -= currAmount;
            planRev -= currAmount;
            totalArrs.ip.push(iFields);
          } else { // IP / AR
            totalInit -= planRev;
            currAmount -= planRev;
            iFields['IP'] = planRev;
            planRev = 0;

            addtlRev -= currAmount;
            totalInit -= currAmount;
            iFields['AR'] = currAmount;
            totalArrs.ip_ar.push(iFields);
          }
        } else { // AR
          addtlRev -= currAmount;
          totalArrs.ar.push(iFields);
          totalInit -= currAmount;
        }
      } else {
        //let's find ytd RP
        let thisStart = new Date(this.state.volumeData[index].fields['Start Date']);
        // console.log(this.state.volumeData[index].fields['Account Name']);
        let loopRP = 0;
        for (var index in this.state.volumeData) {
          let loopStop;
          if (this.state.volumeData[index].fields['Notice Date']) {
            loopStop = new Date(this.state.volumeData[index].fields['Notice Date']);
            if (thisStart > loopStop) {
              if (parseFloat(this.state.volumeData[index].fields['RP Revenue']) > 0) {
                loopRP += parseFloat(this.state.volumeData[index].fields['RP Revenue']);
              }
            }
          } else {
            loopStop = undefined;
          }
        }
        // console.log(loopRP + ' - ' + filledRP);
        loopRP -= filledRP;
        // console.log('filledRP: ' + filledRP);
        // console.log('loopRP: ' + loopRP);

        currAmount -= totalInit;
        totalInit = 0;

        if (planRev > 0) {
          currAmount -= planRev;
          iFields['IP'] = planRev;
          planRev = 0;
          if (addtlRev > 0) {
            currAmount -= addtlRev;
            iFields['AR'] = addtlRev;
            addtlRev = 0;

            if (loopRP > 0) {
              if (loopRP >= currAmount) { // IP / AR / RP
                totalArrs.ip_ar_rp.push(iFields);
                iFields['RP'] = currAmount;
                filledRP += currAmount;
              } else { // IP / AR / RP / AA
                currAmount -= loopRP;
                iFields['RP'] = loopRP;
                totalArrs.ip_ar_rp_aa.push(iFields);
                filledRP += loopRP;
                iFields['AA'] = currAmount; chargeRev += currAmount;
              }
            } else { // IP / AR / AA
              iFields['AA'] = currAmount; chargeRev += currAmount;
              totalArrs.ip_ar_aa.push(iFields);
            }
          } else {
            if (loopRP > 0) {
              if (loopRP >= currAmount) { // IP / RP
                totalArrs.ip_rp.push(iFields);
                iFields['RP'] = currAmount;
                filledRP += currAmount;
              } else { // IP / RP / AA
                currAmount -= loopRP;
                iFields['RP'] = loopRP;
                totalArrs.ip_rp_aa.push(iFields);
                filledRP += loopRP;
                iFields['AA'] = currAmount; chargeRev += currAmount;
              }
            } else { // IP / AA
              iFields['AA'] = currAmount; chargeRev += currAmount;
              totalArrs.ip_aa.push(iFields);
            }
          }
        } else {
          if (addtlRev > 0) {
            currAmount -= addtlRev;
            iFields['AR'] = addtlRev;
            addtlRev = 0;

            if (loopRP > 0) {
              if (loopRP >= currAmount) { // AR / RP
                totalArrs.ar_rp.push(iFields);
                filledRP += currAmount;
                iFields['RP'] = currAmount;
              } else { // AR / RP / AA

                currAmount -= loopRP;
                iFields['RP'] = loopRP;
                totalArrs.ar_rp_aa.push(iFields);
                iFields['AA'] = currAmount; chargeRev += currAmount;
                filledRP += loopRP;
              }
            } else { // AR / AA
              iFields['AA'] = currAmount; chargeRev += currAmount;
              totalArrs.ar_aa.push(iFields);
            }
          } else {
            if (loopRP > 0) {
              if (loopRP >= currAmount) { // RP
                totalArrs.rp.push(iFields);
                filledRP += currAmount;
                iFields['RP'] = currAmount;
              } else { // RP / AA
                currAmount -= loopRP;
                iFields['RP'] = loopRP;
                totalArrs.rp_aa.push(iFields);
                filledRP += loopRP;
                iFields['AA'] = currAmount; chargeRev += currAmount;
              }
            } else { //AA
              iFields['AA'] = currAmount; chargeRev += currAmount;
              totalArrs.aa.push(iFields);
            }
          }
        }

      }
    }
    console.log('total RP Needed: ' + repRev);
    console.log('total RP filled: ' + filledRP);
    console.log(totalArrs);
    let finalArr = [];
    for (var objName in totalArrs) {
      if (totalArrs[objName].length > 0) {
        let newObjectItem = {};
        newObjectItem.records = totalArrs[objName];
        newObjectItem.rowName = objName;

        newObjectItem.split = {
          IP: 0,
          AR: 0,
          AA: 0,
          RP: 0,
        }

        let rowIP = 0; let rowAR = 0; let rowAA = 0; let rowRP = 0;
        if (totalArrs[objName] !== "ip" || totalArrs[objName] !== "ar" || totalArrs[objName] !== "aa" || totalArrs[objName] !== "rp") {
          for (var record in totalArrs[objName]) {
            let rec = totalArrs[objName][record];

            if (rec['IP']) { rowIP += rec['IP'] }
            if (rec['AR']) { rowAR += rec['AR'] }
            if (rec['AA']) { rowAA += rec['AA'] }
            if (rec['RP']) { rowRP += rec['RP'] }
          }
          if (rowIP !== 0) { newObjectItem.split['IP'] = rowIP }
          if (rowAR !== 0) { newObjectItem.split['AR'] = rowAR }
          if (rowAA !== 0) { newObjectItem.split['AA'] = rowAA }
          if (rowRP !== 0) { newObjectItem.split['RP'] = rowRP }
        }

        finalArr.push(newObjectItem)
        // finalArr[objName] = totalArrs[objName];

        newObjectItem.planRev = planRev;
        newObjectItem.repRev = repRev;
        newObjectItem.extraRev = extraRev;
        newObjectItem.addtlRev = addtlRev;

      }
    }
    console.log(finalArr);

    this.setState({
      calculatedVolumeData: finalArr,
      rowCount: finalArr.length,
    })
  }

  loadData = () => {
    this.setState({
      spRecord: this.props.currentRecord,
      loading: true,
    });
    setTimeout((function() {
      finalURL = 'https://api.airtable.com/v0/' + this.props.baseId + '/Accounts';

      let urlFormula = '?filterByFormula=IF(%7BShort+SP+Name%7D=%22' + this.props.currentRecord["SP Name"].replace(/ /g, '+') + '%22%2C+TRUE()%2C+FALSE())' + '&sort%5B0%5D%5Bfield%5D=Start+Date';
      finalURL += urlFormula;

      return axios
        .get(finalURL)
        .then(response => {

          let initData = response.data.records;

          for (var indRecord of response.data.records) {
            let indexTarget = initData.filter(e => e.id === indRecord.id)[0].fields;

            let formattedStart = new Date(indRecord.fields['Start Date']);
            var formattedStart = new Date(formattedStart.getTime() + Math.abs(formattedStart.getTimezoneOffset()*60000));
            formattedStart = (formattedStart.getMonth()+1) + '/' + formattedStart.getDate() + '/' + formattedStart.getFullYear();
            indexTarget['Start Date'] = formattedStart;

            if (indRecord.fields['Notice Date']) {
              let formattedStop = new Date(indRecord.fields['Notice Date']);
              var formattedStop = new Date(formattedStop.getTime() + Math.abs(formattedStop.getTimezoneOffset()*60000));
              formattedStop = (formattedStop.getMonth()+1) + '/' + formattedStop.getDate() + '/' + formattedStop.getFullYear();
              indexTarget['Notice Date'] = formattedStop;
            }
          }
          this.setState({
            volumeData: initData,
            loading: false,
            error: false,
            loadingMore: true,
            volumeDataOffset: response.data.offset,
          });
          setTimeout((function() {
            this.setState({
              loadingMore: false,
            });
            this.gridLayout()
            this.layoutCalculator();
          }).bind(this), 200);
        })
        .catch(error => {
          console.error("error: ", error);
          this.setState({
            error: `${error}`,
            loading: false,
          });
        });
    }).bind(this), 200);
  };



  newAccountHandler = () => {
    console.log('newAccountHandler()');
    let today  = new Date();
    today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    let pushRecord = {
      'Account Name': 'New Account',
      'Type': null,
      'Rep. %': null,
      'Amount': 0,
      'RP Revenue': null,
      'Start Date': today,
      'Notice Date': null,
      'Short SP Name': this.props.spName,
    };
    let finalPush = {"fields": pushRecord}


    axios
    .post('https://api.airtable.com/v0/' + this.props.baseId + '/Accounts', finalPush)
      .then(response => {
        this.setState({
          loading: true,
          volumeData: this.state.volumeData.concat(response.data),
        });

        setTimeout((function() {
          this.loadData();
        }).bind(this), 250);
      })
  }

  rpSumCalc = (e, i) => {
    let newRep = this.state.volumeData;
    newRep[this.state.volumeIndex].fields['Rep. %'] = e;
    this.setState({
      currentAccount: newRep[this.state.volumeIndex],
      volumeData: newRep,
      recordChanges: true,
    })
  }

  financeCalc = (e, i) => {
    let newRep = this.state.volumeData;
    newRep[this.state.volumeIndex].fields['Finance Months'] = e;
    this.setState({
      currentAccount: newRep[this.state.volumeIndex],
      volumeData: newRep,
      recordChanges: true,
    })
  }

  notesChange = (e) => {
    let newRep = this.state.volumeData;
    newRep[this.state.volumeIndex].fields['Notes Charge'] = e;
    this.setState({
      currentAccount: newRep[this.state.volumeIndex],
      volumeData: newRep,
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }


  changeReasonHandler = e => {
    if (e.target.id === 'special') {
      let newRep = this.state.volumeData;
      newRep[this.state.volumeIndex].fields['Reasoning'] = e.target.value;

      this.setState({
        currentAccount: newRep[this.state.volumeIndex],
        volumeData: newRep,
        recordChanges: true,
      })
    }
  }





  componentDidMount() {
    this.loadData();
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { loading, error, volumeData, calculatedVolumeData } = this.state;

    let timelineStyles = {
      height: vpHeight * 0.45
    }



    if (loading) {
      return (

        <div className="ModuleCard cardFull">
          <div className="fullInner">
            <div className="inner">
              <img src={loader} alt="" className="loader" />
            </div>
          </div>
        </div>
      )
    }
    if (error) {
      return (
        <div className="ModuleCard cardFull">
          <div className="fullInner">
            <div className="inner">

              <p>
                There was an error loading the data.{" "}
                <button onClick={this.loadData}>Try again</button>
              </p>

            </div>
          </div>
        </div>
      );
    }


    return (
      <div className="ModuleCard cardFull">
        <div className="fullInner">

          <div className="inner">
            <div class="pickWrapper" id="volumePicker">
              <div className="navIcon softGrad--primary" onClick={this.toggleDayPicker}>
                <img src={exit} alt="exit" />
              </div>
              <p>Select {this.state.pickerId} date</p>
              <a className="btn softGrad--primary" onClick={this.clearDate}>Clear {this.state.pickerId} date</a>
              <DayPicker onDayClick={this.handleDayClick} />
            </div>
            {this.ipRev}

            <div className="timelineWrapper" style={timelineStyles}>
              {calculatedVolumeData.map((e, i) => this.volumeRow(e, i))}
            </div>
            <div className="wideInner bottomSide">
              <a className="btn softGrad--secondary" onClick={this.newAccountHandler}>Add Account</a>
            </div>

          </div>
        </div>
      </div>
    )
  }

  volumeRow(calculatedVolumeData, index) {
    // let volumeIndex = this.state.volumeData.filter(e => e.id === currentAccount && e.fields['Start Date'] === currentStart)[0];


    return <VolumeRow
            calculatedVolumeData={calculatedVolumeData}
            rowName={calculatedVolumeData.rowName}
            split={calculatedVolumeData.split}
            rowRecords={calculatedVolumeData.records}
            index={index}
            toggleDayPicker={this.toggleDayPicker}
            signedDate={this.props.sign}
            planType={this.props.plan}
            addtlRev={this.props.ar}
            rowCount={this.state.rowCount}
            rpSumCalc={this.rpSumCalc}
            financeCalc={this.financeCalc}
            notesCalc={this.notesCalc}
            notesChange={this.notesChange}
            changeAccountHandler={this.changeAccountHandler}
            changeReasonHandler={this.changeReasonHandler}
            // typeChangeHandler={this.typeChangeHandler}
            deleteAccountItem={this.deleteAccountItem}
            editingAccountHandler={this.editingAccountHandler}
            // toggleDayPicker={this.toggleDayPicker}
            percRPChange={this.percRPChange}
          />
  }

  get amountSum() {
    let amountSum = 0;
    for (var fields in this.state.volumeData) {
      if (this.state.volumeData[fields].fields['Amount'] !== undefined) {
        amountSum += this.state.volumeData[fields].fields['Amount'];
      }
    };
    if (amountSum !== null) {
      return (<h4><em>Sum</em> {amountSum}</h4>)
    }
  }

  get daysTill() {
    var oneDay = 24*60*60*1000;
    var firstDate = new Date();
    var secondDate = new Date(this.props.currentRecord['Volume Due Date']);
    var diffDays = Math.round((secondDate.getTime() - firstDate.getTime())/(oneDay));
    if (diffDays < 0) {
      diffDays = 0;
    }
    return (
      <h4><em>Days Left:</em> {diffDays}</h4>
    )
  }

  get ipRev() {
    let sign = this.props.sign;
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
      if (this.props.plan === 'Plan A') {
        planRev = '$2,000';
      } else if (this.props.plan === 'Plan B') {
        planRev = '$3,000';
      } else if (this.props.plan === 'Plan C') {
        planRev = '$4,000';
      } else if (this.props.plan === 'Plan D') {
        planRev = '$5,000';
      } else if (this.props.plan === 'Plan E') {
        planRev = '$6,000';
      } else if (this.props.plan === 'Plan F') {
        planRev = '$8,000';
      } else if (this.props.plan === 'Plan G') {
        planRev = '$10,000';
      } else {
        planRev= '$0';
      }
    } else {
      if (this.props.plan === 'Plan A') {
        planRev = '$1,000';
      } else if (this.props.plan === 'Plan B') {
        planRev = '$1,500';
      } else if (this.props.plan === 'Plan C') {
        planRev = '$2,000';
      } else if (this.props.plan === 'Plan D') {
        planRev = '$3,000';
      } else if (this.props.plan === 'Plan E') {
        planRev = '$4,000';
      } else if (this.props.plan === 'Plan F') {
        planRev = '$5,000';
      } else if (this.props.plan === 'Plan G') {
        planRev = '$6,000';
      } else {
        planRev= '$0';
      }
    }



    let planRevInt = parseInt(planRev.replace(',', '').replace('$', ''))
    if (this.props.ar === 'Yes') {
      planRevInt += 1000
    }
    let amountSum = 0;
    for (var fields in this.state.volumeData) {
      if (this.state.volumeData[fields].fields['Amount'] !== undefined) {
        amountSum += this.state.volumeData[fields].fields['Amount'];
      }
    };
    let rpSum = 0;
    let overallData = this.state.volumeData;
    for (var index in this.state.volumeData) {
      let rpNumb;
      let volAmount;
      if (this.state.volumeData[index].fields['Amount']) {volAmount = this.state.volumeData[index].fields['Amount'];} else {volAmount = 0;}

      if (this.state.volumeData[index].fields['Rep. %'] === '25%') {
        rpNumb = 0.75;
      } else if (this.state.volumeData[index].fields['Rep. %'] === '50%') {
        rpNumb = 0.5;
      } else if (this.state.volumeData[index].fields['Rep. %'] === '75%') {
        rpNumb = 0.25;
      } else if (this.state.volumeData[index].fields['Rep. %'] === '100%') {
        rpNumb = 0;
      } else if (this.state.volumeData[index].fields['Rep. %'] === '0%') {
        rpNumb = 1;
      } else {
        rpNumb = 0;
      }



      let rpNumber = (volAmount * rpNumb);
      if (this.state.volumeData[index].fields['RP Revenue']) {
        if (rpNumber !== parseFloat(this.state.volumeData[index].fields['RP Revenue'])) {
          rpNumber = parseFloat(this.state.volumeData[index].fields['RP Revenue']);
        }
      }
      rpSum = rpSum + rpNumber;
    }

    let revOwed = planRevInt - amountSum + rpSum;

    let aaOwed = 0;

    if (revOwed < 0) {
      aaOwed = -1 * revOwed;
      revOwed = 0;
    }

    let rpOwed = repRev - filledRP;

    if (rpOwed < 0 ) {
      rpOwed = 0;
    }
    if (this.props.ar === 'Yes') {
      return (
        <div className="wideInner">
          <div className="volInner">
            <div className="volBar">
              <div className="volHalf">
                <h4><em>Initial </em>{planRev}</h4>
                <h4><em>Additional </em>$1,000</h4>
              </div>
              <div className="volHalf">
                {this.daysTill}
                <h4><em>IP & AR Owed </em>${revOwed}</h4>
              </div>
            </div>

            <div className="volBar">
              <div className="volHalf">
                <h4><em>Total RP </em>${repRev}</h4>
                <h4><em>RP Still Owed </em>${rpOwed}</h4>
              </div>
              <div className="volHalf">
                <h4><em>Chargeable </em>${chargeRev}</h4>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="wideInner">
          <div className="volInner">
            <div className="volBar">
              <div className="volHalf">
                <h4><em>Initial </em>{planRev}</h4>
              </div>
              <div className="volHalf">
                {this.daysTill}
                <h4><em>IP Owed </em>${revOwed}</h4>
              </div>
            </div>

            <div className="volBar">
              <div className="volHalf">
                <h4><em>Total RP </em>${repRev}</h4>
                <h4><em>RP Still Owed </em>${rpOwed}</h4>
              </div>
              <div className="volHalf">
                <h4><em>Chargeable </em>${chargeRev}</h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


  gridLayout() {
    setTimeout(function(){
      var elem = document.querySelector('.ModuleList');
      var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    }, 100);
  }
}

VolumeOwed.propTypes ={
  currentRecord: propTypes.object.isRequired,
  ar: propTypes.string,
  plan: propTypes.string,
  baseId: propTypes.string.isRequired,
  spName: propTypes.string.isRequired,
  sign: propTypes.string,
}
