import React, { Component } from 'react';
import propTypes from 'prop-types';

import numberImg from '../../../assets/icons/black/number.png';
import calendarImg from '../../../assets/icons/black/calendar.png';
import sortImg from '../../../assets/icons/black/sort.png';

export default class ModuleMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelValue: this.props.level,
      statusValue: this.props.status,
    }
  }

  levelChange = e => {this.setState({levelValue: e.target.value});}
  statusChange = e => {this.setState({statusValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        levelValue: this.props.level,
        statusValue: this.props.status,
      })
    }).bind(this), 50);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let spName = this.props.spName;
    let company = this.props.company;
    let ein = this.props.ein;
    let volumeDate = this.props.volumeDate;
    let language = this.props.language;
    let status = this.props.status;
    let level = this.props.level;
    let spNumber = this.props.spNumber;





    return (
      <div className="ModuleCard">
        <div className="inner">
          <div className="inputBlock inputBlock--small">
            <label>SP #</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={spNumber}
              id="spNumber"
            />
          </div>
          <div className="inputBlock inputBlock--large">
            <label>SP Name</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={spName}
              id="spName"
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
                <option id="Active">Active</option>
                <option id="Former">Former</option>
                <option id="Transfer">Transfer</option>
                <option id="Not+Interested">Not Interested</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Level</label>
            <div
              className="selectBlock"
              id="level"
              >
              <select id="levelSelect" value={this.state.levelValue} onChange={this.levelChange}>
                <option id="none"></option>
                <option id="1">1</option>
                <option id="2">2</option>
                <option id="3">3</option>
                <option id="4">4</option>
                <option id="5">5</option>
              </select>
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Company Name</label>
            <input
              type="text"
              value={company}
              id="company"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>EIN Number</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={numberImg} />
              </div>
              <input
                type="text"
                id="ein"
                value={ein}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Volume Due</label>
            <div className="inputWithTag">
              <div className="inputTag" onClick={this.props.calcVolume}>
                <img src={sortImg} />
              </div>
              <input
                type="text"
                id="volumeDate"
                value={volumeDate}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Languages</label>
            <input
              type="text"
              value={language}
              id="language"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

ModuleMain.propTypes ={
  spName: propTypes.string,
  spNumber: propTypes.string,
  status: propTypes.string,
  level: propTypes.string,
  company: propTypes.string,
  ein: propTypes.string,
  volumeDate: propTypes.string,
  language: propTypes.string,
  calcVolume: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
}
