import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import emailImg from '../../../assets/icons/black/email.png';


export default class ModuleService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standingValue: this.props.standing,
      pamValue: this.props.pam,
      statusValue: this.props.status,
      repValue: this.props.rep,
    }
  }
  statusChange = e => {this.setState({statusValue: e.target.value});}
  pamChange = e => {this.setState({pamValue: e.target.value});}
  repChange = e => {this.setState({repValue: e.target.value});}
  standingChange = e => {this.setState({standingValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        statusValue: this.props.status,
        pamValue: this.props.pam,
        repValue: this.props.rep,
        standingValue: this.props.standing,
      })
    }).bind(this), 50);
  }


  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard">
        {this.crewsView}
      </div>
    );
  }
  get locationPAM() {
    if (this.props.baseId === 'apps7GoAgK23yrOoY') {
      return (
        <select id="pamSelect" value={this.state.pamValue} onChange={this.pamChange}>
          <option id="none"></option>
          <option id="Lisa+Nice">Lisa Nice</option>
          <option id="David+Rivera">David Rivera</option>
          <option id="Old">Old</option>
        </select>
      )
    } else {
      return (
        <select id="pamSelect" value={this.state.pamValue} onChange={this.pamChange}>
          <option id="none"></option>
          <option id="Sergibeth+Monge">Sergibeth Monge</option>
          <option id="Christy+Subler">Christy Subler</option>
          <option id="Old">Old</option>
        </select>
      )
    }
  }
  get locationSales() {
    if (this.props.baseId === 'apps7GoAgK23yrOoY') {
      return (
        <select id="repSelect" value={this.state.repValue} onChange={this.repChange}>
          <option id="none"></option>
          <option id="Tyler+Perkins">Tyler Perkins</option>
          <option id="Nolan+Perkins">Nolan Perkins</option>
          <option id="Rafael+Milanes">Rafael Milanes</option>
          <option id="Lisa+Nice">Lisa Nice</option>
          <option id="Rob+Janke">Rob Janke</option>
          <option id="Joel+Horwitz">Joel Horwitz</option>
          <option id="Christy+Subler">Christy Subler</option>
          <option id="FR">FR</option>
          <option id="Old">Old</option>
        </select>
      )
    } else {
      return (
        <select id="repSelect" value={this.state.repValue} onChange={this.repChange}>
          <option id="none"></option>
          <option id="Rob+Janke">Rob Janke</option>
          <option id="Joel+Horwitz">Joel Horwitz</option>
          <option id="Christy+Subler">Christy Subler</option>
          <option id="Tyler+Perkins">Tyler Perkins</option>
          <option id="Nolan+Perkins">Nolan Perkins</option>
          <option id="Rafael+Milanes">Rafael Milanes</option>
          <option id="Lisa+Nice">Lisa Nice</option>
          <option id="FR">FR</option>
          <option id="Old">Old</option>
        </select>
      )
    }
  }

  get crewsView() {
    let standing = this.props.standing;
    let special = this.props.special;
    let lastCall = this.props.lastCall;
    let setBy = this.props.setBy
    let pam = this.props.pam
    let rep = this.props.rep
    let lastVisit = this.props.lastVisit;
    if (this.props.currentRecordView === 'crews') {
      return(
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>PAM</label>
            <div
              className="selectBlock"
              id="pam"
              >
              {this.locationPAM}
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sales Rep</label>
            <div
              className="selectBlock"
              id="rep"
              >
              {this.locationSales}
            </div>
          </div>


          <div className="inputBlock inputBlock--full">
            <label>Special Notes</label>
            <textarea
              className="NotesList"
              id="special"
              rows='3'
              value={special}
              onChange={this.props.changeNotesHandler}>
              {special}
            </textarea>
          </div>
        </div>
      );
    } else {
      return(
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Status</label>
            <div
              className="selectBlock"
              id="status"
              >
              <select id="statusSelect"  value={this.state.statusValue} onChange={this.statusChange}>
                <option id="none"></option>
                <option id="Active">Active</option>
                <option id="APPC">APPC</option>
                <option id="Additional">Additional</option>
                <option id="Canceled">Canceled</option>
                <option id="DNC">DNC</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Standing</label>
            <div
              className="selectBlock"
              id="standing"
              >
              <select id="standingSelect" value={this.state.standingValue} onChange={this.standingChange}>
                <option id="none"></option>
                <option id="Very+Happy">Very Happy</option>
                <option id="Happy">Happy</option>
                <option id="Satisfied">Satisfied</option>
                <option id="Unhappy">Unhappy</option>
                <option id="New+Customer">New Customer</option>
                <option id="Canceled">Canceled</option>
                <option id="Crew+Change">Crew Change</option>
                <option id="Completed+Work">Completed Work</option>
              </select>
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Last Call</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={lastCall}
                id="lastCall"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <div class="pickWrapper">
              <DayPicker onDayClick={this.props.handleDayClick} />
            </div>
            <label>Last Visit</label>
            <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
              <div className="inputTag">
                <img src={calendarImg} />
              </div>
              <input
                type="text"
                value={lastVisit}
                id="lastVisit"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>



          <div className="inputBlock inputBlock--half">
            <label>PAM</label>
            <div
              className="selectBlock"
              id="pam"
              >
              {this.locationPAM}
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sales Rep</label>
            <div
              className="selectBlock"
              id="rep"
              >
              {this.locationSales}
            </div>
          </div>


          <div className="inputBlock inputBlock--full">
            <label>Special Notes</label>
            <textarea
              className="NotesList"
              id="special"
              rows='3'
              value={special}
              onChange={this.props.changeNotesHandler}>
              {special}
            </textarea>
          </div>
        </div>
      );
    }
  }
}

ModuleService.propTypes ={
  standing: propTypes.string,
  status: propTypes.string,
  setBy: propTypes.string,
  pam: propTypes.string,
  rep: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  special: propTypes.string,

  lastCall: propTypes.string,
  spName: propTypes.string,
  spPhone: propTypes.string,
  lastVisit: propTypes.string,
  spEmail: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
