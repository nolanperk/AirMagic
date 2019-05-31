import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';


export default class CallModalIntro extends Component {
  constructor(props) {
    super();
    this.state = {
      streetViewSrc: '',
    }
  }

  componentDidMount() {
    let fields = this.props.openedCall.fields;
    let totalAddress = fields['Company Name'].replace(/ /g, '+') + '+Florida';
    if (fields['Address 1']) {
      totalAddress = fields['Company Name'].replace(/ /g, '+') + '+' + fields['Address 1'];
      if (fields['Address 2']) {totalAddress = totalAddress + fields['Address 2'];}
      if (fields['City']) {totalAddress = totalAddress + ', ' + fields['City'] + ', Florida';} else {totalAddress = totalAddress + ', Florida';}
      if (fields['Zip']) {totalAddress = totalAddress + ', ' + fields['Zip'];}
    }
    setTimeout((function() {
      let streetViewSrc = 'https://maps.googleapis.com/maps/api/streetview?size=500x500&location=' + totalAddress.replace(/ /g, '+') + '&fov=75&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'

      if (document.getElementById('streetWindow')) {
        let svWidth = document.getElementById('streetWindow').offsetWidth;
        let svHeight = document.getElementById('streetWindow').offsetHeight;
        streetViewSrc = 'https://maps.googleapis.com/maps/api/streetview?size=' + svWidth + 'x' + svHeight + '&location=' + totalAddress.replace(/ /g, '+') + '&fov=75&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'
      }


      this.setState({
        streetViewSrc: streetViewSrc,
      });
    }).bind(this), 250);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let fields = this.props.openedCall.fields;

    let logNotes = '';
    if (fields['Notes']) {
      logNotes = fields['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    if (this.props.hasActive) {
      return (
        <div className="callColumn contact">
          <div className="qualifyBox hasActive">
            <div className="streetView" id="streetWindow">
              <img src={this.state.streetViewSrc} alt=" " />
            </div>

            <div className="activeCheck" id="">
              <h4>Active Check</h4>
              <h4>Duplicate Check</h4>
            </div>
          </div>

          <div className="contactInfo">
            {this.mainContact}
            {this.altContact}
            <br />
            {this.phoneNumber}
            {this.cellNumber}
          </div>
        </div>
      );
    } else {

      let googleURL = 'https://www.google.com/search?q=' + this.props.openedCall.fields['Company Name'];
      let googlePhoneURL = 'https://www.google.com/search?q=' + this.props.openedCall.fields['Office Phone'];

      return (
        <div className="callColumn contact">
          <div className="qualifyBox">
            <div className="streetView" id="streetWindow">
              <img src={this.state.streetViewSrc} alt=" " />


              <div className="googleBtns split">
                <a className="btn softGrad--primary" href={googleURL} target="_blank">Search Name</a>
                <a className="btn softGrad--black" href={googlePhoneURL} target="_blank">Search #</a>
              </div>
            </div>
          </div>

          <div className="contactInfo">
            {this.mainContact}
            {this.altContact}
            <br />
            {this.phoneNumber}
            {this.cellNumber}
          </div>
        </div>
      );
    }
  }

  get mainContact() {
    let fields = this.props.openedCall.fields;
    if (fields['Main contact']) {
      return (
        <div className="contact">
          <p>Main</p>
          <div className="innerCard">
            <h4>{fields['Main contact']}</h4>
            <p>{fields['Title']}</p>
          </div>
        </div>
      );
    }
  }
  get altContact() {
    let fields = this.props.openedCall.fields;
    if (fields['Alternate Contact']) {
      return (
        <div className="contact">
          <p>Alt</p>
          <div className="innerCard">
            <h4>{fields['Alternate Contact']}</h4>
          </div>
        </div>
      );
    }
  }
  get phoneNumber() {
    let fields = this.props.openedCall.fields;
    let phoneLink = 'tel:' + fields['Office Phone'];

    if (fields['Office Phone']) {
      return (
        <div className="contact">
          <p>Contact</p>
          <div className="innerCard">
            <div className="content">
              <p>Office</p>
              <h4>{fields['Office Phone']}</h4>
              {fields['Extension'] ? <p>Ext.</p> : ''}
              {fields['Extension'] ? <h4>{fields['Main contact']}</h4> : ''}
            </div>

              <div className="navIcon softGrad--secondary"  onClick={() => { this.props.callNext() }}>
                <img src={phoneImg} alt="call" />
              </div>
          </div>
        </div>
      );
    }
  }
  get cellNumber() {
    let fields = this.props.openedCall.fields;
    let phoneLink = 'tel:' + fields['Cell Phone'];

    if (fields['Cell Phone']) {
      return (
        <div className="contact">
          <div className="innerCard cell">
            <div className="content">
              <p>Cellphone</p>
              <h4>{fields['Cell Phone']}</h4>
            </div>

              <div className="navIcon softGrad--secondary"  onClick={() => { this.props.callNext() }}>
                <img src={phoneImg} alt="call" />
              </div>
          </div>
        </div>
      );
    }
  }
}
