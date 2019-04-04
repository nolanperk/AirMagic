import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';


export default class CallModalNoAppt extends Component {
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
            <h3>What happened?</h3>
            <div
              className="selectBlock"
              id="standing"
              >
              <select id="standingSelect" value={fields['Standing']} onChange={this.props.selectChange}>
                <option value="">Select Standing</option>
                <option id="Left+VM">Left VM</option>
                <option id="Left+Email">Left Email</option>
                <option id="No+Answer">No Answer</option>
                <option disabled>------------</option>
                <option disabled>Callback Later</option>
                <option id="Call+Back">Call Back</option>
                <option id="Not+Interested">Not Interested</option>
                <option id="In+Contract">In Contract</option>
                <option id="In+House">In House</option>
                <option id="Landlord+Does">Landlord Does</option>
                <option disabled>------------</option>
                <option disabled>Issues</option>
                <option id="Disconnected">Disconnected</option>
                <option id="Outside+Territory">Outside Territory</option>
                <option id="Bad+Number">Bad Number</option>
                <option id="Mark+for+Deletion">Mark for Deletion</option>
                <option id="none"></option>
              </select>
            </div>
          </div>
        </div>
        <button onClick={this.props.callNext} className="btn softGrad--blue nextBtn">Submit</button>
      </div>
    );
  }
}
