import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import calendarImg from '../../../assets/icons/black/calendar.png';
import dollarImg from '../../../assets/icons/black/dollar.png';
import numberImg from '../../../assets/icons/black/number.png';

export default class ModulePipeline extends Component {
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
        {this.ModuleProposal}
      </div>
    );
  }

  get ModuleProposal() {
    let setBy = this.props.apptBy;
    let apptSet = this.props.apptSet;
    let apptDate = this.props.apptDate;
    let apptTime = this.props.apptTime;
    let proposal = this.props.proposal;


    // let finalAppt = new Date(apptDate);finalAppt = (finalAppt.getMonth() + 1) + '/' + (finalAppt.getDate() + 1) + '/' + finalAppt.getFullYear();
    // let finalProposal = new Date(proposal);finalProposal = (finalProposal.getMonth() + 1) + '/' + (finalProposal.getDate()) + '/' + finalProposal.getFullYear();

    if (this.props.currentRecordView === 'default') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Appt. Set By</label>
            <div
              className="selectBlock"
              id="setBy"
              >
              <select id="setBySelect" value={this.state.setByValue ? this.state.setByValue : 'none'} onChange={this.setByChange}>
                <option id="none"></option>
                <option id="Linda+Goldberg">Linda Goldberg</option>
                <option id="Eric+Kleeman">Eric Kleeman</option>
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
            <label>Appt Set Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptSet}
                id="apptSet"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Appt Date</label>
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
            <label>Appt Time</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={apptTime}
              id="apptTime"
            />
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
        </div>
      );
    } else if (this.props.currentRecordView === 'proposal') {
      return(
        <div className="inner">
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
        </div>
      );
    } else {
      return(

        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Appt. Set By</label>
            <div
              className="selectBlock"
              id="setBy"
              >
              <select id="setBySelect" value={this.state.setByValue ? this.state.setByValue : 'none'} onChange={this.setByChange}>
                <option id="none"></option>
                <option id="Linda+Goldberg">Linda Goldberg</option>
                <option id="Eric+Kleeman">Eric Kleeman</option>
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
            <label>Appt Set Date</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={apptSet}
                id="apptSet"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Appt Date</label>
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
            <label>Appt Time</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={apptTime}
              id="apptTime"
            />
          </div>
        </div>
      );
    }
  }
}

ModulePipeline.propTypes ={
  callCount: propTypes.string,
  apptBy: propTypes.string,
  apptSet: propTypes.string,
  apptTime: propTypes.string,
  apptDate: propTypes.string,
  proposal: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
