import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesPerWeekValue: '',
      timesClasses: 'inputBlock inputBlock--half isHidden'
    }
  }

  changingTimes = e => {
    this.props.timesPerWeekChange(e);

    setTimeout((function() {
      if (this.props.timesPerWeek === 'other') {
        this.setState({
          timesPerWeekValue: 'other',
          timesClasses: 'inputBlock inputBlock--half'
        });
      } else {
        this.setState({
          timesPerWeekValue: this.props.timesPerWeek,
          timesClasses: 'inputBlock inputBlock--half isHidden'
        });
      }
    }).bind(this), 50);
  }

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        timesPerWeekValue: this.props.timesPerWeek,
      })
    }).bind(this), 50);
  }

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard">
        {this.ScheduleView}
      </div>
    );
  }
  get ScheduleView() {
    let hoursPer = this.props.hoursPer;
    let sqFtPer = this.props.sqFtPer;
    let timesPerWeek = this.props.timesPerWeek;
    let weekDays = this.props.weekDays;
    if (this.props.currentRecordView === 'appointment' || this.props.currentRecordView === 'inside') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Times / Week</label>
            <div
              className="selectBlock"
              id="timesPerWeek"
              >
              <select id="timesPerWeekSelect" value={this.state.timesPerWeekValue} onChange={this.changingTimes}>
                <option value="none"></option>
                <option value="1x">1 X WEEK</option>
                <option value="2x">2 X WEEK</option>
                <option value="3x">3 X WEEK</option>
                <option value="4x">4 X WEEK</option>
                <option value="5x">5 X WEEK</option>
                <option value="6x">6 X WEEK</option>
                <option value="7x">7 X WEEK</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className={this.state.timesClasses} id="customTimes">
            <label>Times / Week</label>
            <input
              type="text"
              value={timesPerWeek}
              id="timesPerWeek"
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
        </div>
      )
    } else {
      return (
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
            <div
              className="selectBlock"
              id="timesPerWeek"
              >
              <select id="timesPerWeekSelect" value={this.state.timesPerWeekValue} onChange={this.changingTimes}>
                <option value="none"></option>
                <option value="1x">1 X WEEK</option>
                <option value="2x">2 X WEEK</option>
                <option value="3x">3 X WEEK</option>
                <option value="4x">4 X WEEK</option>
                <option value="5x">5 X WEEK</option>
                <option value="6x">6 X WEEK</option>
                <option value="7x">7 X WEEK</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className={this.state.timesClasses} id="customTimes">
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
      )
    }
  }
}

ModuleSchedule.propTypes ={
  currentRecordView: propTypes.string.isRequired,
  hoursPer: propTypes.string,
  sqFtPer: propTypes.string,
  timesPerWeek: propTypes.string,
  weekDays: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  timesPerWeekChange: propTypes.func.isRequired,
}
