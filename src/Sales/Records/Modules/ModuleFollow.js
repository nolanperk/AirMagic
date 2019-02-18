import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';

import phoneImg from '../../../assets/icons/black/phone.png';
import numberImg from '../../../assets/icons/black/number.png';
import emailImg from '../../../assets/icons/black/email.png';
import calendarImg from '../../../assets/icons/black/calendar.png';


export default class ModuleFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followStatus: '',
    }
  }


  followStatusChange = e => {this.setState({followStatus: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        followStatus: this.props.followStatus,
      })
    }).bind(this), 50);
  }
  // Render
  // ----------------------------------------------------
  render() {
    return (
      <div className="ModuleCard moduleContact">
        {this.ContactType}
      </div>
    );
  }

  get ContactType() {
    let contact = this.props.contact;
    let email = this.props.email;
    let followDate = this.props.followDate;
    let followCount = this.props.followCount;
    let followUsed = this.props.followUsed;

    let postApptLink = 'mailto:';
    postApptLink += email;

    let currRep;
    if (this.props.userName === 'NWP') {
      currRep = 'Nolan';
    } else if (this.props.userName === 'TMP') {
      currRep = 'Tyler';
    } else if (this.props.userName === 'JDH') {
      currRep = 'Joel';
    }
    let contactFirst;

    if (contact) {
      if (contact.indexOf(' ') < 0) {
        contactFirst = contact;
      } else {
        contactFirst = contact.split(' ')[0];
      }
      postApptLink += "?subject=" + currRep + "%20from%20Vanguard%20Cleaning%20Systems";
      postApptLink += "&body=Good%20morning%20" + contactFirst + "%2C%0D%0A%0D%0AThank%20you%20for%20your%20time%20today%20and%20for%20allowing%20me%20to%20visit%20your%20facility.%20It%20was%20a%20pleasure%20meeting%20you.%0D%0AI%20will%20be%20getting%20back%20to%20the%20office%20this%20afternoon%20at%20which%20point%20I%20will%20be%20putting%20together%20your%20proposal.%20I%20will%20have%20it%20to%20you%20by%20the%20end%20of%20the%20day.%0D%0A%0D%0AA%20bit%20about%20Vanguard%20Cleaning%0D%0AVanguard%20Cleaning%20of%20Central%20Florida%20has%20been%20family%20owned%20and%20operated%20for%20over%2016%20years%20and%20we%20have%20over%201%2C000%20customers%20across%20Central%20Florida%20who%20stay%20with%20us%20over%204%20years%E2%80%94double%20the%20industry%20average%E2%80%94even%20with%20our%20no-contracts%20policy%20because%20we%20work%20hard%20to%20earn%20your%20business%20every%20day.%0D%0A%0D%0AThanks%20again%20and%20I%20will%20speak%20with%20you%20soon%2C";
    }



    return (
      <div className="inner">
        <a className="postApptLink" href={postApptLink}>Post-Appt Email</a>

        <div className="inputBlock inputBlock--half">
          <label>Call Status</label>
          <div
            className="selectBlock"
            id="follow"
            >
            <select id="followStatus" value={this.state.followStatus} onChange={this.followStatusChange}>
              <option></option>
              <option>Hot</option>
              <option>Normal</option>
              <option>Bad</option>
            </select>
          </div>
        </div>
        <div className="inputBlock inputBlock--half">
          <div class="pickWrapper">
            <DayPicker onDayClick={this.props.handleDayClick} />
          </div>
          <label>Follow Up Date</label>
          <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
            <div className="inputTag">
              <img src={calendarImg} alt="" />
            </div>
            <input
              type="text"
              value={followDate}
              id="followDate"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
        <div className="inputBlock inputBlock--half">
          <label>Follow Up Count</label>
          <input
            type="text"
            id="followCount"
            value={followCount}
            onChange={this.props.changeRecordHandler}
          />
        </div>
        <div className="inputBlock inputBlock--half">
          <label>Follow Ups Used</label>
          <input
            type="text"
            id="followUsed"
            value={followUsed}
            onChange={this.props.changeRecordHandler}
          />
        </div>

      </div>
    );
  }
}

ModuleFollow.propTypes ={
  currentRecordView: propTypes.string.isRequired,
  contact: propTypes.string,
  email: propTypes.string,
  followDate: propTypes.string,
  followCount: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
