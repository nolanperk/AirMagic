import React, { Component } from 'react';
import propTypes from 'prop-types';


import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleSales extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let strip = this.props.strip;
    let carpet = this.props.carpet;
    let tile = this.props.tile;
    let preClean = this.props.preClean;
    let windows = this.props.windows;

    return (
      <div className="ModuleCard moduleSales">
        <div className="inner">


        <div className="inputBlock inputBlock--third">
          <label>Pre-Clean</label>
          <div className="inputWithTag">
            <div className="inputTag">
              <img src={dollarImg} alt="" />
            </div>
            <input
              type="text"
              value={preClean}
              id="preClean"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
        <div className="inputBlock inputBlock--third">
          <label>Strip & Wax</label>
          <div className="inputWithTag">
            <div className="inputTag">
              <img src={dollarImg} alt="" />
            </div>
            <input
              type="text"
              value={strip}
              id="strip"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
        <div className="inputBlock inputBlock--third">
          <label>Carpet Clean</label>
          <div className="inputWithTag">
            <div className="inputTag">
              <img src={dollarImg} alt="" />
            </div>
            <input
              type="text"
              value={carpet}
              id="carpet"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
        <div className="inputBlock inputBlock--third">
          <label>Tile & Grout</label>
          <div className="inputWithTag">
            <div className="inputTag">
              <img src={dollarImg} alt="" />
            </div>
            <input
              type="text"
              value={tile}
              id="tile"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
        <div className="inputBlock inputBlock--third">
          <label>Windows</label>
          <div className="inputWithTag">
            <div className="inputTag">
              <img src={dollarImg} alt="" />
            </div>
            <input
              type="text"
              value={windows}
              id="windows"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>


        </div>
      </div>
    );
  }
}

ModuleSales.propTypes ={
  closed: propTypes.string,
  walkthrough: propTypes.string,
  start: propTypes.string,
  preCleanDate: propTypes.string,
  preCleanCharge: propTypes.string,
  cancel: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
