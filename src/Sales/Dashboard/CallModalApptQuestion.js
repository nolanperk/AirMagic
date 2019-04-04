import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';


export default class CallModalApptQuestion extends Component {
  constructor(props) {
    super();
    this.state = {
      streetViewSrc: '',
    }
  }

  // Render
  // ----------------------------------------------------
  render() {
    let fields = this.props.openedCall.fields;
    return(
      <div className="callColumn contact">
        <div className="inputGroup solo">
          <div className="inputBlock inputBlock--full">
            <h3>Did you set an appointment?</h3>
          </div>

          <button id="setAppt" onClick={this.props.callNext} className="btn softGrad--secondary">Yes</button>
          <button id="noAppt" onClick={this.props.callNext} className="btn softGrad--black">No</button>
        </div>
      </div>
    );
  }
}
