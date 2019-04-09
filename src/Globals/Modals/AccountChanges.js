import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Isotope from 'isotope-layout';

import exit from '../../assets/icons/white/exit.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import dollarImg from '../../assets/icons/black/dollar.png';

export default class AccountChanges extends Component {
  constructor(props) {
    super();
    this.state = {
      viewType: 'changeType',
      notepad: '',
      oldSP: {},
      oldInfo: {},
    }
  }

  changeNext = e => {
    e.preventDefault();
    console.log(e.target);
    let selectedValue = document.getElementById('changeType').value;

    let oldSP = {
      number : this.props.currentRecord['SP Number'],
      name : document.getElementById('spSelector').options[document.getElementById('spSelector').selectedIndex].text,
    }


    let oldInfo = {
      amount: this.props.currentRecord['Monthly Amount'],
      xWeek: this.props.currentRecord['Times per Week'],
      sqft: this.props.currentRecord['Actual Sq Footage'],
      dayOf: this.props.currentRecord['Days of Week'],
      serviceTime: this.props.currentRecord['Service Time'],
      addr1: this.props.currentRecord['Address 1'],
      addr2: this.props.currentRecord['Address 2'],
      city: this.props.currentRecord['City'],
      zip: this.props.currentRecord['Zip'],
      county: this.props.currentRecord['County'],
    }
    if (selectedValue === 'crewChange' || selectedValue === 'amountChange') {
      this.setState({
        oldSP: oldSP,
      })
    }
    if (selectedValue === 'amountChange') {
      this.setState({
        oldInfo: oldInfo,
      })
    }
    this.setState({
      viewType: selectedValue,
    })
  }

  changeSubmit = () => {
    let notepads = document.getElementById('notepad').value;
    this.props.submitAccountChange(this.state.viewType, notepads, this.state.oldSP, this.state.oldInfo)
  }

  // Render
  // ----------------------------------------------------
  render() {
    let addr1 = this.props.currentRecord['Address 1'];
    let addr2 = this.props.currentRecord['Address 2'];
    let city = this.props.currentRecord['City'];
    let zip = this.props.currentRecord['Zip'];
    let county = this.props.currentRecord['County'];

    let status= this.props.currentRecord['Status'];
    let standing= this.props.currentRecord['Standing'];

    let amount = this.props.currentRecord['Monthly Amount'];
    let hoursPer = this.props.currentRecord['Hours Per'];
    let sqFtPer = this.props.currentRecord['SQ Ft. per Hour'];
    let timesPerWeek = this.props.currentRecord['Times per Week'];
    let weekDays = this.props.currentRecord['Days of Week'];
    let serviceTime = this.props.currentRecord['Service Time'];
    let sqFt = this.props.currentRecord['Sq. Footage'];
    let sqFtReal = this.props.currentRecord['Actual Sq Footage'];

    let newSP = this.props.currentRecord['New SP Start'];
    let cancel = this.props.currentRecord['Cancel Date'];
    let start = this.props.currentRecord['Start Date'];

    let currentSP = this.props.currentSP;
    let spNumber = this.props.currentRecord['SP Number'];
    let spList = this.props.spList;
    let baseId = this.props.baseId;


    if (this.state.viewType === 'changeType') {
      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>What kind of Account Change is this?</h4>

            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <form id="exportForm" onSubmit={this.changeNext}>
            <div className="selectBox">
              <select id="changeType">
                <option value="">Select Change Type</option>
                <option value="amountChange">Service / Location / Price Change</option>
                <option value="crewChange">Crew Change</option>
                <option value="cancellation">Cancellation</option>
              </select>
            </div>
            <br />
            <br />
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </form>
        </div>
      );
    } else if (this.state.viewType === 'amountChange') {
      this.gridLayout()
      return (
        <div className="FilterModal modalInner accountChangesModal">
          <div className="modalTitle">
            <h4>Service / Location / Price Change</h4>

            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="ModuleList overflowed">
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--half">
                  <div class="pickWrapper">
                    <DayPicker onDayClick={this.props.handleDayClick} />
                  </div>
                  <label>Change Date</label>
                  <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                    <div className="inputTag">
                      <img src={calendarImg} />
                    </div>
                    <input
                      type="text"
                      value={cancel}
                      id="cancel"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>Provider</label>
                  <div
                    className="selectBlock"
                    id="status"
                    >
                    <select id="spSelector" value={this.props.currentRecord['SP Number']} onChange={this.props.spChangeHandler}>
                      <option value="none">Select SP</option>
                      {this.props.spList ? this.props.spList.map((e, i) => this.spListItem(e, i)) : ''}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModuleCard moduleSchedule">
              <div className="inner">
                <div className="inputBlock inputBlock--full">
                  <label>Monthly Amount</label>
                  <div className="inputWithTag">
                    <div className="inputTag">
                      <img src={dollarImg} alt="" />
                    </div>
                    <input
                      type="text"
                      value={amount}
                      id="amount"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>Times / Week</label>
                  <input
                    type="text"
                    value={timesPerWeek}
                    id="timesPerWeek"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>Actual Sq. Ft.</label>
                  <input
                    type="text"
                    value={sqFtReal}
                    id="sqFtReal"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>Days of Week</label>
                  <input
                    type="text"
                    value={weekDays}
                    id="weekDays"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>


                <div className="inputBlock inputBlock--half">
                  <label>Time of Service</label>
                  <input
                    type="text"
                    value={serviceTime}
                    id="serviceTime"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>
              </div>
            </div>

            <div className="ModuleCard moduleLocation">
              <div className="inner">
                <div className="inputBlock inputBlock--large">
                  <label>Address 1</label>
                  <input
                    type="text"
                    value={addr1}
                    id="addr1"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>
                <div className="inputBlock inputBlock--small">
                  <label>Address 2</label>
                  <input
                    type="text"
                    value={addr2}
                    id="addr2"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>City</label>
                  <input
                    type="text"
                    value={city}
                    id="city"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>
                <div className="inputBlock inputBlock--half">
                  <label>Zip</label>
                  <input
                    type="text"
                    value={zip}
                    id="zip"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>County</label>
                  <input
                    type="text"
                    value={county}
                    id="county"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>
              </div>
            </div>
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--full">
                  <label>Account Change Notes</label>
                  <textarea
                    className="NotesList"
                    id="notepad"
                    rows='6'
                  />
                </div>
              </div>
            </div>

          </div>

          <button onClick={this.changeSubmit} className="btn softGrad--secondary">Submit</button>
        </div>
      );
    } else if (this.state.viewType === 'crewChange') {
      return (
        <div className="FilterModal modalInner accountChangesModal">
          <div className="modalTitle">
            <h4>Crew Changes</h4>

            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="ModuleList">
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--half">
                  <div class="pickWrapper">
                    <DayPicker onDayClick={this.props.handleDayClick} />
                  </div>
                  <label>New SP Start</label>
                  <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                    <div className="inputTag">
                      <img src={calendarImg} />
                    </div>
                    <input
                      type="text"
                      value={newSP}
                      id="newSP"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>

                <div className="inputBlock inputBlock--half">
                  <label>New Provider</label>
                  <div
                    className="selectBlock"
                    id="status"
                    >
                    <select id="spSelector" value={this.props.spNumber} onChange={this.props.spChangeHandler}>
                      <option value="none">Select SP</option>
                      {this.props.spList ? this.props.spList.map((e, i) => this.spListItem(e, i)) : ''}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--full">
                  <label>Crew Change Reasons</label>
                  <textarea
                    className="NotesList"
                    id="notepad"
                    rows='6'
                  />
                </div>
              </div>
            </div>

          </div>

          <button onClick={this.changeSubmit} className="btn softGrad--secondary">Submit</button>
        </div>
      );
    } else if (this.state.viewType === 'cancellation') {
      return (
        <div className="FilterModal modalInner accountChangesModal">
          <div className="modalTitle">
            <h4>Cancellation</h4>

            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="ModuleList">
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--full">
                  <div class="pickWrapper">
                    <DayPicker onDayClick={this.props.handleDayClick} />
                  </div>
                  <label>Cancel Date</label>
                  <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                    <div className="inputTag">
                      <img src={calendarImg} />
                    </div>
                    <input
                      type="text"
                      value={cancel}
                      id="cancel"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ModuleCard moduleMain">
              <div className="inner">
                <div className="inputBlock inputBlock--full">
                  <label>Cancellation Reasons</label>
                  <textarea
                    className="NotesList"
                    id="notepad"
                    rows='6'
                  />
                </div>
              </div>
            </div>

          </div>

          <button onClick={this.changeSubmit} className="btn softGrad--secondary">Submit</button>
        </div>
      );
    } else {
      return (
        <h1>Hi</h1>
      );
    }
  }

  gridLayout() {
    setTimeout(function(){
      var elem = document.querySelector('.ModuleList');
      var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    }, 100);
  }

  spListItem(spList, index) {
    return(
      <option key={spList.id} index={index} value={spList.fields['Number']}>
        {spList.fields['SP Name']}
      </option>
    );
  }
}
