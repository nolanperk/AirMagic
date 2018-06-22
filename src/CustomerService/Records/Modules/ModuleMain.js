import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleMain extends Component {

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
              onChange={this.props.changeSelectBlock}
              >
              <select id="pamSelect" value={this.props.pam}>
                <option id="none"></option>
                <option id="David+Rivera">David Rivera</option>
                <option id="Lisa+Nice">Lisa Nice</option>
                <option id="Veronica+Valentin">Veronica Valentin</option>
                <option id="Old">Old</option>
              </select>
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sales Rep</label>
            <div
              className="selectBlock"
              id="rep"
              onChange={this.props.changeSelectBlock}
              >
              <select id="repSelect" value={this.props.rep}>
                <option id="none"></option>
                <option id="Tyler+Perkins">Tyler Perkins</option>
                <option id="Nolan+Perkins">Nolan Perkins</option>
                <option id="Rafael+Milanes">Rafael Milanes</option>
                <option id="Lisa+Nice">Lisa Nice</option>
                <option id="Cristy+Subler">Cristy Subler</option>
                <option id="FR">FR</option>
                <option id="Old">Old</option>
              </select>
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
              onChange={this.props.changeSelectBlock}
              >
              <select id="statusSelect"  value={this.props.status}>
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
              onChange={this.props.changeSelectBlock}
              >
              <select id="cpopSelect"  value={this.props.cpop}>
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
              onChange={this.props.changeSelectBlock}
              >
              <select id="suppliesSelect"  value={this.props.supplies}>
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
}
