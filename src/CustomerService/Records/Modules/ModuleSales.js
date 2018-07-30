import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setByValue: this.props.setBy,
    }
  }
  setByChange = e => {this.setState({setByValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        setByValue: this.props.setBy,
      })
    }).bind(this), 50);
  }

  // Render
  // ----------------------------------------------------
  render() {
    return (
      <div className="ModuleCard">
        {this.AccountingView}
      </div>
    );
  }


  get AccountingView() {
    let apptSetDate = this.props.apptSetDate;
    let apptDate = this.props.apptDate;
    let proposal = this.props.proposal;
    let close = this.props.close;
    let walkthrough = this.props.walkthrough;
    let start = this.props.start;
    let preCleanDate = this.props.preCleanDate;
    let preCleanCharge = this.props.preCleanCharge;
    let source = this.props.source;
    let newSP = this.props.newSP;
    let cancel = this.props.cancel;

    if (this.props.currentRecordView === 'accounting') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Start Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={start}
                id="start"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
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
      );
    } else if (this.props.currentRecordView === 'crews') {
      return (
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

          <hr />

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Walkthrough</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={walkthrough}
                id="walkthrough"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Start Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={start}
                id="start"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Pre-Clean Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanDate}
                id="preCleanDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Pre-Clean Charge</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanCharge}
                id="preCleanCharge"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
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

          <hr />

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Walkthrough</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={walkthrough}
                id="walkthrough"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Start Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={start}
                id="start"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Pre-Clean Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanDate}
                id="preCleanDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Pre-Clean Charge</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={preCleanCharge}
                id="preCleanCharge"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        <hr />




        <div className="inputBlock inputBlock--half">
          <label>Appt. Set By</label>
          <div
            className="selectBlock"
            id="setBy"
            >
            <select id="setBySelect" value={this.state.setByValue} onChange={this.setByChange}>
              <option id="none"></option>
              <option id="Linda+Goldberg">Linda Goldberg</option>
              <option id="Eric+Kleeman">Eric Kleeman</option>
              <option id="Carla+Milian">Carla Milian</option>
              <option id="Joel+Horwitz">Joel Horwitz</option>
              <option id="Rob+Janke">Rob Janke</option>
              <option id="Tyler+Perkins">Tyler Perkins</option>
              <option id="Nolan+Perkins">Nolan Perkins</option>
              <option id="Outside+Company">Outside Company</option>
            </select>
          </div>
        </div>

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Appt. Set Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptSetDate}
                id="apptSetDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Appt. Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptDate}
                id="apptDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Proposal Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={proposal}
                id="proposal"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Close Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={close}
                id="close"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Lead Source</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    }
  }

}

ModuleSales.propTypes ={
  newSP: propTypes.string,
  cancel: propTypes.string,
  setBy: propTypes.string,
  apptSetDate: propTypes.string,
  source: propTypes.string,
  apptDate: propTypes.string,
  proposal: propTypes.string,
  close: propTypes.string,
  walkthrough: propTypes.string,
  start: propTypes.string,
  preCleanDate: propTypes.string,
  preCleanCharge: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
