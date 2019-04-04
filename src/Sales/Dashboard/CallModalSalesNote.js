import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';


export default class CallModalSalesNote extends Component {
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

    let tellAbout = 'Tell ';
    tellAbout += fields['Sales Rep'].split(' ')[0];
    tellAbout += ' the information you received.'

    let notepadNote = '';
    if (this.state.notepad) {
      notepadNote = this.state.notepad;
    } else {
      notepadNote = '';
    }
    return(
      <div className="callColumn contact">

        <div className="confettiContainer">
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        <div className="inputGroup solo">
          <div className="inputBlock inputBlock--full">
            <h3>{tellAbout}</h3>
            <textarea rows="6" className="half" id="salesNotes" defaultValue={notepadNote} placeholder="example: 'Their contract is ending!'" />
          </div>
        </div>
        <button onClick={this.props.callNext} className="btn softGrad--blue nextBtn">Submit</button>

      </div>
    );
  }
}
