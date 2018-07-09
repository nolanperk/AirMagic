import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';

export default class ModuleMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusValue: this.props.status,
      standingValue: this.props.standing,
      recentCallerValue: this.props.recentCaller,
      repValue: this.props.rep,
    }
  }
  statusChange = e => {this.setState({statusValue: e.target.value});}
  standingChange = e => {this.setState({standingValue: e.target.value});}
  recentCallerChange = e => {this.setState({recentCallerValue: e.target.value});}
  repChange = e => {this.setState({repValue: e.target.value});}

  // Render
  // ----------------------------------------------------
  render() {
    let status = this.props.status;
    let standing = this.props.standing;
    let recentCaller = this.props.recentCaller;
    let rep = this.props.rep;

    let company = this.props.company;
    let industry = this.props.industry;
    let callDate = this.props.callDate;
    let callBack = this.props.callBack;
    let website = this.props.website;





    return (
      <div className="ModuleCard">
        <div className="inner">
          <div className="inputBlock inputBlock--full">
            <label>Company Name</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={company}
              id="company"
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Status</label>
            <div
              className="selectBlock"
              id="status"
              >
              <select id="statusSelect" value={this.state.statusValue} onChange={this.statusChange}>
                <option id="none"></option>
                <option id="Prospect">Prospect</option>
                <option id="APPC">APPC</option>
                <option id="Closed">Closed</option>
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
              <select id="standingSelect"  value={this.state.standingValue} onChange={this.standingChange}>
                <option id="none"></option>
                <option id="Left+VM">Left VM</option>
                <option id="Left+Email">Left Email</option>
                <option id="Disconnected">Disconnected</option>
                <option id="In House">In House</option>
                <option id="In Contact">In Contact</option>
              </select>
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Recent Caller</label>
            <div
              className="selectBlock"
              id="recentCaller"
              >
              <select id="callerSelect"  value={this.state.recentCallerValue} onChange={this.recentCallerChange}>
                <option id="none"></option>
                <option id="Linda+Goldberg">Linda Goldberg</option>
                <option id="Eric+Kleeman">Eric Kleeman</option>
              </select>
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


          <div className="inputBlock inputBlock--half">
            <label>Recent Call Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={callDate}
                id="callDate"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Callback Date</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={calendarImg} alt="" />
              </div>
              <input
                type="text"
                value={callBack}
                id="callBack"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Industry</label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Website</label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      </div>
    );
  }
  get locationSales() {
    if (this.props.baseId === 'appEX8GXgcD2ln4dB') {
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
}

ModuleMain.propTypes ={
  company: propTypes.string,
  status: propTypes.string,
  standing: propTypes.string,
  industry: propTypes.string,
  rep: propTypes.string,
  recentCaller: propTypes.string,
  callDate: propTypes.string,
  callBack: propTypes.string,
  website: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
