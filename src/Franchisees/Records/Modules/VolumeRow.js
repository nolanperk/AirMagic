import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import loader from '../../../assets/loader.gif';
import VolItem from './VolItem';
import exit from '../../../assets/icons/white/exit.png';

let rpSum = 0;
let finalURL;
let currentAccountState;
export default class VolumeRow extends Component {
  constructor(props) {
    super();
    this.state = {
      rowTotal: 0,
      initialRevenue: 0,
      addtlRev: 0,
    }
  }

  somefunction = () => {
    let sign = this.props.signedDate;
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
      if (this.props.planType === 'Plan A') {
        planRev = '$2,000';
      } else if (this.props.planType === 'Plan B') {
        planRev = '$3,000';
      } else if (this.props.planType === 'Plan C') {
        planRev = '$4,000';
      } else if (this.props.planType === 'Plan D') {
        planRev = '$5,000';
      } else if (this.props.planType === 'Plan E') {
        planRev = '$6,000';
      } else if (this.props.planType === 'Plan F') {
        planRev = '$8,000';
      } else if (this.props.planType === 'Plan G') {
        planRev = '$10,000';
      } else {
        planRev= '$0';
      }
    } else {
      if (this.props.planType === 'Plan A') {
        planRev = '$1,000';
      } else if (this.props.planType === 'Plan B') {
        planRev = '$1,500';
      } else if (this.props.planType === 'Plan C') {
        planRev = '$2,000';
      } else if (this.props.planType === 'Plan D') {
        planRev = '$3,000';
      } else if (this.props.planType === 'Plan E') {
        planRev = '$4,000';
      } else if (this.props.planType === 'Plan F') {
        planRev = '$5,000';
      } else if (this.props.planType === 'Plan G') {
        planRev = '$6,000';
      } else {
        planRev= '$0';
      }
    }

    let planRevInt = parseInt(planRev.replace(',', '').replace('$', ''));
    let addtlRev = 0;
    if (this.props.addtlRev === 'Yes') {
      addtlRev += 1000;
    }

    this.setState({
      initialRevenue: planRevInt,
      addtlRev: addtlRev,
    })
  }

  componentDidMount() {
    let rowTotal = 0;
    for (var index in this.props.calculatedVolumeData.records) {
      let newAmount = parseFloat(this.props.calculatedVolumeData.records[index].fields['Amount']);
      rowTotal += newAmount;
    }
    this.setState({
      rowTotal: rowTotal,
    })

    if (this.props.rowName === 'ip' && (this.props.index+1) === this.props.rowCount && this.state.rowTotal < this.props.calculatedVolumeData.planRev) {
      this.setState({
        rowOwed: this.props.calculatedVolumeData.planRev - this.state.rowTotal,
      })

      if (this.props.calculatedVolumeData.addtlRev > 0 && this.props.calculatedVolumeData.repRev > 0) {
        let appendingTo = document.getElementsByClassName('row--ip')[0];
        let el =  document.createElement("div")
        el.className= 'switchCals';
        el.innerHTML = "<div class='timelineRow owedRow row--ar'><div class='timelineCal'></div><div class='timelineContent'><div class='headlineArea'><h4>Additional Revenue</h4><p><em>Owed</em> $" + this.props.calculatedVolumeData.addtlRev + "</p></div></div></div>" + "<div class='timelineRow owedRow row--rp'><div class='timelineCal'></div><div class='timelineContent'><div class='headlineArea'><h4>Replacement Revenue</h4><p><em>Owed</em> $" + this.props.calculatedVolumeData.repRev + "</p></div></div></div>";
        appendingTo.parentNode.appendChild(el);
      } else if (this.props.calculatedVolumeData.addtlRev > 0) {
        let appendingTo = document.getElementsByClassName('row--ip')[0];
        let el =  document.createElement("div")
        el.className="timelineRow owedRow row--ar";
        el.innerHTML = "<div class='timelineCal'></div><div class='timelineContent'><div class='headlineArea'><h4>Additional Revenue</h4><p><em>Owed</em> $" + this.props.calculatedVolumeData.addtlRev + "</p></div></div>";
        appendingTo.parentNode.appendChild(el);
      } else if (this.props.calculatedVolumeData.repRev > 0) {
        let appendingTo = document.getElementsByClassName('row--ip')[0];
        let el =  document.createElement("div");
        el.className= 'timelineRow owedRow row--rp';
        el.innerHTML = "<div class='timelineCal'></div><div class='timelineContent'><div class='headlineArea'><h4>Replacement Revenue</h4><p><em>Owed</em> $" + this.props.calculatedVolumeData.repRev + "</p></div></div>";
        appendingTo.parentNode.appendChild(el);
      }
    }
    if (this.props.rowName === 'ar' && (this.props.index+1) === this.props.rowCount && this.state.rowTotal < this.props.calculatedVolumeData.addtlRev) {
      this.setState({
        rowOwed: this.props.calculatedVolumeData.addtlRev - this.state.rowTotal,
      })

      if (this.props.calculatedVolumeData.repRev > 0) {
        let appendingTo = document.getElementsByClassName('row--ar')[0];
        let el =  document.createElement("div")
        el.className="timelineRow owedRow row--rp";
        el.innerHTML = "<div class='timelineCal'></div><div class='timelineContent'><div class='headlineArea'><h4>Replacement Revenue</h4><p><em>Owed</em> $" + this.props.calculatedVolumeData.repRev + "</p></div></div>";
        appendingTo.parentNode.appendChild(el);
      }
    }
    if (this.props.rowName === 'rp' && (this.props.index+1) === this.props.rowCount && this.state.rowTotal < this.props.calculatedVolumeData.repRev) {
      this.setState({
        rowOwed: this.props.calculatedVolumeData.repRev - this.state.rowTotal,
      })
    }


    //
    // setTimeout(function(){
    //   let splitTotals = document.getElementById('splitTotals');
    //
    //
    //
    //   if (this.props.split['IP'] > 0) {
    //     let node = document.createElement("P");
    //     let textnode = document.createTextNode(this.props.split['IP']);
    //     node.appendChild(textnode);
    //     splitTotals.appendChild(node);
    //   }
    //   if (this.props.split['AR'] > 0) {
    //     let node = document.createElement("P");
    //     let textnode = document.createTextNode(this.props.split['AR']);
    //     node.appendChild(textnode);
    //     splitTotals.appendChild(node);
    //   }
    //   if (this.props.split['AA'] > 0) {
    //     let node = document.createElement("P");
    //     let textnode = document.createTextNode(this.props.split['AA']);
    //     node.appendChild(textnode);
    //     splitTotals.appendChild(node);
    //   }
    //   if (this.props.split['RP'] > 0) {
    //     let node = document.createElement("P");
    //     let textnode = document.createTextNode(this.props.split['RP']);
    //     node.appendChild(textnode);
    //     splitTotals.appendChild(node);
    //   }
    // }, 500);
  }
  // Render
  // ----------------------------------------------------
  render() {

    let ipOwed;
    if (this.props.rowName === 'ip') {
      let ipOwed = this.state.initialRevenue - this.state.rowTotal;
    }
    if (this.props.rowName === 'ar') {
      let ipOwed = this.state.addtlRev - this.state.rowTotal;
    }

    // if (this.props.rowName === 'ip_ar') {//this.state.initialRevenue} + this.state.addtlRev}
    //
    // if (this.props.rowName === 'ip_ar_rp') {//this.state.initialRevenue} + this.state.addtlRev + this.state.replacedRev}
    //
    // if (this.props.rowName === 'rp') {//this.state.replacedRev}
    // if (this.props.rowName === 'aa') {//}
    // if (this.props.rowName === 'ip_rp') {//}
    // if (this.props.rowName === 'ip_aa') {//}
    // if (this.props.rowName === 'ar_rp') {//}
    // if (this.props.rowName === 'ar_aa') {//}
    // if (this.props.rowName === 'ip_ar_aa') {//}
    // if (this.props.rowName === 'ip_rp_aa') {//}
    // if (this.props.rowName === 'ar_rp_aa') {//}
    // if (this.props.rowName === 'ip_ar_rp_aa') {//}
    // if (this.props.rowName === 'rp_aa') {//}


    let rowClasses = "timelineRow row--" + this.props.rowName;

    return (
      <div className={rowClasses}>
        <div className="timelineCal"></div>
        <div className="timelineContent">
          {this.headlineArea}


          <div className="tableWrapper">
            <table>
              {this.tableLayout}
              {this.props.rowRecords.map((e, i) => this.volumeItem(e, i))}
            </table>
          </div>
        </div>
      </div>
    );
  }
  get headlineArea() {
    if (this.props.rowName !== 'rp' && this.props.rowName !== 'aa' && this.props.rowName !== 'ar' && this.props.rowName !== 'ip') {
      return (
        <div className="headlineArea">
          <p id="splitTotals">
            {this.splitIP}
            {this.splitAR}
            {this.splitRP}
            {this.splitAA}
          </p>
        </div>
      )
    } else {
      let formattedRowName;
      if (this.props.rowName === 'ip') {formattedRowName = 'Initial Plan'; }
      if (this.props.rowName === 'ar') {formattedRowName = 'Additional Revenue'; }
      if (this.props.rowName === 'rp') {formattedRowName = 'Replacement Revenue'; }
      if (this.props.rowName === 'aa') {formattedRowName = 'Additional Accounts'; }
      if (this.props.rowName === 'ip_ar') {formattedRowName = 'IP / AR'; }
      if (this.props.rowName === 'ip_rp') {formattedRowName = 'IP / RP'; }
      if (this.props.rowName === 'ip_aa') {formattedRowName = 'IP / AA'; }
      if (this.props.rowName === 'ar_rp') {formattedRowName = 'AR / RP'; }
      if (this.props.rowName === 'ar_aa') {formattedRowName = 'AR / AA'; }
      if (this.props.rowName === 'ip_ar_rp') {formattedRowName = 'IP / AR/ RP'; }
      if (this.props.rowName === 'ip_ar_aa') {formattedRowName = 'IP / AR / AA'; }
      if (this.props.rowName === 'ip_rp_aa') {formattedRowName = 'IP / RP / AA'; }
      if (this.props.rowName === 'ar_rp_aa') {formattedRowName = 'AR / RP / AA'; }
      if (this.props.rowName === 'ip_ar_rp_aa') {formattedRowName = 'IP / AR / RP / AA'; }
      if (this.props.rowName === 'rp_aa') {formattedRowName = 'RP / AA'; }

      return (
        <div className="headlineArea">
          <h4>{formattedRowName}</h4>
          <p><em>Total</em> ${this.state.rowTotal}</p>
          {this.owedLine}
        </div>
      )
    }
  }
  get splitIP() {
    if (this.props.split['IP'] > 0) {
      return (
        <p><em>IP </em>${this.props.split['IP']}</p>
      );
    }
  }
  get splitAR() {
    if (this.props.split['AR'] > 0) {
      return (
        <p><em>AR </em>${this.props.split['AR']}</p>
      );
    }
  }
  get splitRP() {
    if (this.props.split['RP'] > 0) {
      return (
        <p><em>RP </em>${this.props.split['RP']}</p>
      );
    }
  }
  get splitAA() {
    if (this.props.split['AA'] > 0) {
      return (
        <p><em>AA </em>${this.props.split['AA']}</p>
      );
    }
  }
  get tableLayout() {
    //only rp
    if (this.props.rowName === 'rp' || this.props.rowName === 'ip_rp' || this.props.rowName === 'ar_rp' || this.props.rowName === 'ip_ar_rp') {
      return (
        <tr className="accountHeader">
          <td><p>Account Name</p></td>
          <td><p>Replacing</p></td>
          <td><p>Amount</p></td>
          <td><p>Start Date</p></td>
          <td><p>Stop Date</p></td>
          <td><p>Rep. %</p></td>
          <td><p>RP Rev</p></td>
          <td></td>
        </tr>
      );
    //only aa
    } else if (this.props.rowName === 'aa' || this.props.rowName === 'ip_aa' || this.props.rowName === 'ar_aa' || this.props.rowName === 'ip_ar_aa') {
      return (
        <tr className="accountHeader">
          <td><p>Account</p></td>
          <td><p>Rev</p></td>
          <td><p>Start</p></td>
          <td><p>Stop</p></td>
          <td><p>RP %</p></td>
          <td><p>RP Rev</p></td>
          <td><p>Mnths</p></td>
          <td><p>Notes</p></td>
          <td><p>Reason</p></td>
          <td><p>$ Paid</p></td>
          <td></td>
        </tr>
      );
    //aa and rp
    } else if (this.props.rowName === 'ar_rp_aa' || this.props.rowName === 'ip_ar_rp_aa' || this.props.rowName === 'rp_aa' || this.props.rowName === 'ip_rp_aa') {
      return (
        <tr className="accountHeader">
          <td><p>Account</p></td>
          <td><p>Replace</p></td>
          <td><p>Rev</p></td>
          <td><p>Start</p></td>
          <td><p>Stop</p></td>
          <td><p>RP %</p></td>
          <td><p>RP Rev</p></td>
          <td><p>Mnths</p></td>
          <td><p>Notes</p></td>
          <td><p>Reason</p></td>
          <td><p>Paid</p></td>
          <td></td>
        </tr>
      );
    } else {
      return (
        <tr className="accountHeader">
          <td><p>Account Name</p></td>
          <td><p>Amount</p></td>
          <td><p>Start Date</p></td>
          <td><p>Stop Date</p></td>
          <td><p>Rep. %</p></td>
          <td><p>RP Revenue</p></td>
          <td></td>
        </tr>
      );
    }
  }
  get owedLine() {
    if (this.state.rowOwed) {
      return (
        <p>
          <em>Owed</em> ${this.state.rowOwed}
        </p>
      )
    }
  }
  volumeItem(rowRecords, index) {
    return <VolItem
            key={rowRecords.id}
            id={rowRecords.id}
            rowRecords={rowRecords.fields}
            index={index}
            rowIndex={this.props.index}
            rowName={this.props.rowName}
            rpSumCalc={this.props.rpSumCalc}
            notesChange={this.props.notesChange}
            changeAccountHandler={this.props.changeAccountHandler}
            notesCalc={this.props.notesCalc}
            financeCalc={this.props.financeCalc}
            typeChangeHandler={this.typeChangeHandler}
            changeReasonHandler={this.props.changeReasonHandler}
            deleteAccountItem={this.props.deleteAccountItem}
            editingAccountHandler={this.editingAccountHandler}
            percRPChange={this.props.percRPChange}
            toggleDayPicker={this.props.toggleDayPicker}
            editingAccountHandler={this.props.editingAccountHandler}
          />
  }
}

VolumeRow.propTypes ={
  currentRecord: propTypes.object.isRequired,
  ar: propTypes.string,
  split: propTypes.object,
  plan: propTypes.string,
  baseId: propTypes.string.isRequired,
  spName: propTypes.string.isRequired,
  sign: propTypes.string,
}
