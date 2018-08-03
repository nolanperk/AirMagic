import React, { Component } from 'react';
import propTypes from 'prop-types';

let rpRevenue;
export default class VolItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeValue: this.props.rowRecords['Type'],
      percValue: this.props.rowRecords['Rep. %'],
      filledRev: this.props.rowRecords['RP Revenue'],
      monthsSelect: this.props.rowRecords['Finance Months'],
      notesSelect: this.props.rowRecords['Notes Charge'],
      disabledClasses: '',
    }
  }
  percChange = e => {
    // if (this.state.rowRecords[index].fields['RP Revenue'] !== rpNumber) {
    //   rpNumber = this.state.rowRecords[index].fields['RP Revenue'];
    // }
    if (this.props.rowRecords['Amount'] !== undefined) {
      rpRevenue = (parseInt(e.target.value.replace('%', '')) / 100) * this.props.rowRecords['Amount'];
    } else {
      rpRevenue = 0;
    }
      this.setState({
        percValue: e.target.value,
        filledRev: rpRevenue
      });
      this.props.rpSumCalc(e.target.value, this.props.index)
      this.props.percRPChange(this.props.index, this.props.rowRecords);
  }

  notesChange = e => {
    this.props.notesChange(e.target.value)
    setTimeout((function() {
      this.setState({
        notesValue: this.props.rowRecords['Notes Charge'],
      });
    }).bind(this), 50);
  }

  monthsChange = e => {
    this.setState({
      monthsSelect: e.target.value,
    });
    this.props.financeCalc(e.target.value, this.props.index)
    this.props.notesCalc(this.props.index, this.props.rowRecords, e.target.value);
    setTimeout((function() {
      this.setState({
        monthsSelect: this.props.rowRecords['Finance Months'],
        notesValue: this.props.rowRecords['Notes Charge'],
      });
    }).bind(this), 50);
  }

  componentDidMount () {
    if (this.props.rowRecords['Rep. %'] !== undefined) {
      rpRevenue = (parseInt(this.props.rowRecords['Rep. %'].replace('%', '')) / 100) * this.props.rowRecords['Amount'];
      this.setState({
        filledRev: rpRevenue
      });
    }
    setTimeout((function() {
      this.setState({
        monthsValue: this.props.rowRecords['Finance Months'],
        notesValue: this.props.rowRecords['Notes Charge'],
      });
    }).bind(this), 50);


    // if (this.props.rowRecords['Stop Date']) {
    //   this.setState({
    //     disabledClasses: ''
    //   });
    // } else {
    //   this.setState({
    //     disabledClasses: 'disabled'
    //   });
    // }
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, rowRecords } = this.props;
    let currentVolumeData = this.props.rowRecords;

    //only rp
    if (this.props.rowName === 'rp' || this.props.rowName === 'ip_rp' || this.props.rowName === 'ar_rp' || this.props.rowName === 'ip_ar_rp') {
      return (
        <tr className="tableRow" onClick={()=>this.props.editingAccountHandler(rowRecords[this.props.index], this.props.id, this.props.index)} key={this.props.id} index={this.props.index} rowRecords={rowRecords}>
          <td className="input--l">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Account Name']}
              id="account"
            />
          </td>
          <td className="input--l">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Accounts Replaced']}
              id="replacing"
            />
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Amount']}
              id="amount"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('start', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Start Date']}
              id="start"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('stop', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Stop Date']}
              id="stop"
            />
          </td>
          <td className="input--s selectBlock">
            <select id="percSelect" className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'} value={this.state.percValue} onChange={this.percChange}>
              <option value="none"></option>
              <option value="0%">0%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['RP Revenue']}
              id="rpRev"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="deleteIt" id={this.props.id} onClick={this.props.deleteAccountItem}>x</td>
        </tr>
      );
    //only aa
    } else if (this.props.rowName === 'aa' || this.props.rowName === 'ip_aa' || this.props.rowName === 'ar_aa' || this.props.rowName === 'ip_ar_aa') {
      return (
        <tr className="tableRow" onClick={()=>this.props.editingAccountHandler(rowRecords[this.props.index], this.props.id, this.props.index)} key={this.props.id} index={this.props.index} rowRecords={rowRecords}>
          <td className="input--l">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Account Name']}
              id="account"
            />
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Amount']}
              id="amount"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('start', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Start Date']}
              id="start"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('stop', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Stop Date']}
              id="stop"
            />
          </td>
          <td className="input--s selectBlock">
            <select id="percSelect" className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'} value={this.state.percValue} onChange={this.percChange}>
              <option value="none"></option>
              <option value="0%">0%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['RP Revenue']}
              id="rpRev"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="input--s selectBlock">
            <select id="monthsSelect" value={this.state.monthsValue} onChange={this.monthsChange}>
              <option value="none"></option>
              <option>3</option>
              <option>6</option>
              <option>12</option>
              <option>18</option>
              <option>24</option>
              <option>36</option>
              <option>48</option>
            </select>
          </td>
          <td className="input--s selectBlock">
            <select id="notesSelect" value={this.state.notesValue} onChange={this.notesChange}>
              <option value="none"></option>
              <option value="3">3x</option>
              <option value="3.5">3.5x</option>
              <option value="4">4x</option>
              <option value="4.5">4.5x</option>
            </select>
          </td>
          <td className="input--l">
            <textarea
              className="NotesList"
              id="special"
              rows='2'
              value={this.props.rowRecords['Reasoning']}
              onChange={this.props.changeReasonHandler}>
              {this.props.rowRecords['Reasoning']}
            </textarea>
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Currently Paid']}
              id="paidUp"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="deleteIt" id={this.props.id} onClick={this.props.deleteAccountItem}>x</td>
        </tr>
      );
    //aa and rp
    } else if (this.props.rowName === 'ar_rp_aa' || this.props.rowName === 'ip_ar_rp_aa' || this.props.rowName === 'rp_aa' || this.props.rowName === 'ip_rp_aa') {
      return (
        <tr className="tableRow" onClick={()=>this.props.editingAccountHandler(rowRecords[this.props.index], this.props.id, this.props.index)} key={this.props.id} index={this.props.index} rowRecords={rowRecords}>
          <td className="input--l">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Account Name']}
              id="account"
            />
          </td>
          <td className="input--l">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Accounts Replaced']}
              id="replacing"
            />
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Amount']}
              id="amount"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('start', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Start Date']}
              id="start"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('stop', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Stop Date']}
              id="stop"
            />
          </td>
          <td className="input--s selectBlock">
            <select id="percSelect" className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'} value={this.state.percValue} onChange={this.percChange}>
              <option value="none"></option>
              <option value="0%">0%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
          </td>
          <td className="input--s">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['RP Revenue']}
              id="rpRev"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="input--s selectBlock">
            <select id="monthsSelect" value={this.state.monthsValue} onChange={this.monthsChange}>
              <option value="none"></option>
              <option>3</option>
              <option>6</option>
              <option>12</option>
              <option>18</option>
              <option>24</option>
              <option>36</option>
              <option>48</option>
            </select>
          </td>
          <td className="input--s selectBlock">
            <select id="notesSelect" value={this.state.notesValue} onChange={this.notesChange}>
              <option value="none"></option>
              <option value="3">3x</option>
              <option value="3.5">3.5x</option>
              <option value="4">4x</option>
              <option value="4.5">4.5x</option>
            </select>
          </td>
          <td className="input--l">
            <textarea
              className="NotesList"
              id="special"
              rows='2'
              value={this.props.rowRecords['Reasoning']}
              onChange={this.props.changeReasonHandler}>
              {this.props.rowRecords['Reasoning']}
            </textarea>
          </td>
          <td className="input--m">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Currently Paid']}
              id="paidUp"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="deleteIt" id={this.props.id} onClick={this.props.deleteAccountItem}>x</td>
        </tr>
      );
    } else {
      return (
        <tr className="tableRow" onClick={()=>this.props.editingAccountHandler(rowRecords[this.props.index], this.props.id, this.props.index)} key={this.props.id} index={this.props.index} rowRecords={rowRecords}>
          <td className="input--xl">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Account Name']}
              id="account"
            />
          </td>
          <td className="input--m">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Amount']}
              id="amount"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('start', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Start Date']}
              id="start"
            />
          </td>
          <td className="input--m">
            <input
              onClick={()=>this.props.toggleDayPicker('stop', rowRecords[this.props.index], this.props.index)}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['Stop Date']}
              id="stop"
            />
          </td>
          <td className="input--s selectBlock">
            <select id="percSelect" className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'} value={this.state.percValue} onChange={this.percChange}>
              <option value="none"></option>
              <option value="0%">0%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
          </td>
          <td className="input--m">
            <input
              onChange={this.props.changeAccountHandler}
              data-account={this.props.rowRecords['Account Name']}
              data-start={this.props.rowRecords['Start Date']}
              data-key={this.props.id}
              value={this.props.rowRecords['RP Revenue']}
              id="rpRev"
              className={this.props.rowRecords['Stop Date'] ? '' : 'disabled'}
            />
          </td>
          <td className="deleteIt" id={this.props.id} onClick={this.props.deleteAccountItem}>x</td>
        </tr>
      );
    }

  }

  get tableType() {

  }
}


VolItem.propTypes ={
  editingAccountHandler: propTypes.func.isRequired,
  percRPChange: propTypes.func.isRequired,
  deleteAccountItem: propTypes.func.isRequired,
  openRecordHandler: propTypes.func.isRequired,
  changeAccountHandler: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  rpSumCalc: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
  typeChangeHandler: propTypes.func.isRequired,
  rowRecords: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
}
