import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleSchedule extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let hoursPer = this.props.hoursPer;
    let sqFtPer = this.props.sqFtPer;
    let timesPerWeek = this.props.timesPerWeek;
    let weekDays = this.props.weekDays;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--half">
            <label>Hours Per</label>
            <input
              type="text"
              value={hoursPer}
              id="hoursPer"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Sq Ft. / Hour</label>
            <input
              type="text"
              value={sqFtPer}
              id="sqFtPer"
              onChange={this.props.changeRecordHandler}
            />
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

          <div className="inputBlock inputBlock--full">
            <label>Days of Week</label>
            <input
              type="text"
              value={weekDays}
              id="weekDays"
              onChange={this.props.changeRecordHandler}
            />
          </div>

        </div>
      </div>
    );
  }
}

ModuleSchedule.propTypes ={
  hoursPer: propTypes.string,
  sqFtPer: propTypes.string,
  timesPerWeek: propTypes.string,
  weekDays: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
