import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pamValue: this.props.pam,
      repValue: this.props.rep,
      statusValue: this.props.status,
      cpopValue: this.props.cpop,
      suppliesValue: this.props.supplies,
    }
  }
  pamChange = e => {this.setState({pamValue: e.target.value});}
  repChange = e => {this.setState({repValue: e.target.value});}
  statusChange = e => {this.setState({statusValue: e.target.value});}
  cpopChange = e => {this.setState({cpopValue: e.target.value});}
  suppliesChange = e => {this.setState({suppliesValue: e.target.value});}

  // Render
  // ----------------------------------------------------
  render() {
    let company = this.props.company;
    let pam = this.props.pam;
    let rep = this.props.rep;
    let special = this.props.special;
    let status = this.props.status;
    let cpop = this.props.cpop;
    let supplies = this.props.supplies;





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
              value={special}
              onChange={this.props.changeNotesHandler}>
              {special}
            </textarea>
          </div>


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
          <div className="inputBlock inputBlock--quart">
            <label>CPOP</label>
            <div
              className="selectBlock"
              id="cpop"
              >
              <select id="cpopSelect"  value={this.state.cpopValue} onChange={this.cpopChange}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Supplies</label>
            <div
              className="selectBlock"
              id="supplies"
              >
              <select id="suppliesSelect"  value={this.state.suppliesValue} onChange={this.suppliesChange}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>
        </div>
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
}

ModuleMain.propTypes ={
  company: propTypes.string,
  pam: propTypes.string,
  rep: propTypes.string,
  special: propTypes.string,
  status: propTypes.string,
  cpop: propTypes.string,
  supplies: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
