import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import loader from '../../../assets/loader.gif';
import VolumeItem from './VolumeItem';
import exit from '../../../assets/icons/white/exit.png';

let rpSum = 0;
let finalURL;
let currentAccountState;
export default class VolumeOwed extends Component {
  constructor(props) {
    super();
    this.state = {
      spRecord: [],
      volumeData: [],
    }
  }


  hideDayPicker = () => {
    let getTheBlock = document.getElementById('volumePicker');
    getTheBlock.className = 'pickWrapper';
    this.setState({
      pickerId: null,
    })
  }
  handleDayClick = day => {
    console.log('handleDayClick()');
    currentAccountState = this.state.currentAccount;
    let newSelectedDay = new Date(day);
    let currentIndex = this.state.pickerIndex;

    let finalDate = (newSelectedDay.getMonth() + 1) + '/' + newSelectedDay.getDate() + '/' + newSelectedDay.getFullYear();

    if (this.state.pickerId === 'start') {currentAccountState.fields['Start Date'] = finalDate}
    else if (this.state.pickerId === 'stop') {currentAccountState.fields['Stop Date'] = finalDate}

    this.setState({
      currentAccount: currentAccountState,
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }
  toggleDayPicker = (id, e, index) => {
    console.log('toggleDayPicker()');
    let dayID = id;
    let pickerBlock = document.getElementById('volumePicker');
    let currAccount = this.state.volumeData[index];

    if (pickerBlock.className === 'pickWrapper isActive') {
      this.hideDayPicker();
    } else {
      pickerBlock.className = 'pickWrapper isActive';
      this.setState({
        pickerId: dayID,
        pickerIndex: index,
      })
    }
  }


  editingAccountHandler = (e, key, index) => {
    console.log('editingAccountHandler()');
    if (this.state.recordChanges) {
      let pushRecord = this.state.currentAccount.fields;
      let pushRecordId = this.state.currentAccount.id;

      let finalPush = {"fields": pushRecord}
      axios
      .patch('https://api.airtable.com/v0/' + this.props.baseId + '/Accounts/' + pushRecordId, finalPush)
        .then(response => {
        this.setState({
          recordChanges: false,
        });
        if (document.getElementById('volumePicker').className === 'pickWrapper isActive') {
          this.hideDayPicker();
        }
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
    setTimeout((function() {
      if (document.getElementById('volumePicker').className === 'pickWrapper isActive') {
        this.setState({
          currentAccount: this.state.volumeData[this.state.pickerIndex],
        });
      } else {
        this.setState({
          currentAccount: e,
        });
      }
    }).bind(this), 100);
  }
  percRPChange = (e, i) => {
    currentAccountState = this.state.volumeData;
    currentAccountState[e].fields['RP Revenue'] = ((parseInt(i['Rep. %'].replace('%', '')) / 100) * i['Amount']).toString();

    this.setState({
      volumeData: currentAccountState,
      currentAccount: currentAccountState[e],
      recordChanges: true,
    })
    setTimeout((function() {
      this.editingAccountHandler();
    }).bind(this), 50);
  }

  changeAccountHandler = e => {
    console.log('changeAccountHandler()');
    currentAccountState = this.state.volumeData;
    let currentIndex = e.target.getAttribute('data-index');

    if (e.target.id === 'account') {currentAccountState[currentIndex].fields['Account Name'] = e.target.value}
    else if (e.target.id === 'amount') {currentAccountState[currentIndex].fields['Amount'] = parseFloat(e.target.value)}
    else if (e.target.id === 'start') {currentAccountState[currentIndex].fields['Start Date'] = e.target.value}
    else if (e.target.id === 'stop') {currentAccountState[currentIndex].fields['Stop Date'] = e.target.value}
    else if (e.target.id === 'rpRev') {currentAccountState[currentIndex].fields['RP Revenue'] = e.target.value}

    this.setState({
      volumeData: currentAccountState,
      currentAccount: currentAccountState[currentIndex],
      recordChanges: true,
    })
  }

  deleteAccountItem = e => {
    return axios
      .delete('https://api.airtable.com/v0/' + this.props.baseId + '/Accounts/' + e.target.id)
      .then(response => {
        this.loadData();
      });
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

            if (indRecord.fields['Stop Date']) {
              let formattedStop = new Date(indRecord.fields['Stop Date']);
              var formattedStop = new Date(formattedStop.getTime() + Math.abs(formattedStop.getTimezoneOffset()*60000));
              formattedStop = (formattedStop.getMonth()+1) + '/' + formattedStop.getDate() + '/' + formattedStop.getFullYear();
              indexTarget['Stop Date'] = formattedStop;
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
    let today  = new Date();
    today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    let pushRecord = {
      'Account Name': 'New Account',
      'Type': null,
      'Rep. %': null,
      'Amount': null,
      'RP Revenue': null,
      'Start Date': today,
      'Stop Date': null,
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
    newRep[i].fields['Rep. %'] = e;
    this.setState({
      currentAccount: newRep[i],
      volumeData: newRep,
      recordChanges: true,
    })
  }

  typeChangeHandler = (e, i) => {
    let newPlan = this.state.volumeData;
    newPlan[i].fields['Type'] = e;
    this.setState({
      currentAccount: newPlan[i],
      volumeData: newPlan,
      recordChanges: true,
    })
  }

  componentDidMount() {
    this.loadData();
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { loading, error, volumeData } = this.state;



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
              <DayPicker onDayClick={this.handleDayClick} />
            </div>

            {this.ipRev}

            <table>
              <tr className="accountHeader">
                <td><p>Account Name</p></td>
                <td><p>Type</p></td>
                <td><p>Rep. %</p></td>
                <td><p>Amount</p></td>
                <td><p>RP Revenue</p></td>
                <td><p>Start Date</p></td>
                <td><p>Stop Date</p></td>
                <td><p>x</p></td>
              </tr>
              {volumeData.map((e, i) => this.volumeItem(e, i))}

              <tr className="accountFooter">
                <td id="addAccount" onClick={this.newAccountHandler}><h4>Add Account +</h4></td>
                <td></td>
                <td></td>
                <td>{this.amountSum}</td>
                <td id="rpSum">{this.rpSum}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    )
  }
  volumeItem(volumeData, index) {
    return <VolumeItem
            key={volumeData.id}
            id={volumeData.id}
            volumeData={volumeData.fields}
            index={index}
            rpSumCalc={this.rpSumCalc}
            changeAccountHandler={this.changeAccountHandler}
            typeChangeHandler={this.typeChangeHandler}
            deleteAccountItem={this.deleteAccountItem}
            editingAccountHandler={this.editingAccountHandler}
            toggleDayPicker={this.toggleDayPicker}
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
      rpSum = rpSum + rpNumber;
    }

    let revOwed = planRevInt - amountSum + rpSum;

    if (this.props.ar === 'Yes') {
      return (
        <div className="wideInner">
          {this.daysTill}
          <h4><em>Initial:</em> {planRev}</h4>
          <h4><em>Additional:</em> 1,000</h4>
          <h4><em>Owed:</em> ${revOwed}</h4>
        </div>
      )
    } else {
      return (
        <div className="wideInner">
          {this.daysTill}
          <h4><em>Initial:</em> {planRev}</h4>
          <h4><em>Owed:</em> ${revOwed}</h4>
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
