import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';

export default class RecapVisit extends Component {

  recapSubmit = e => {
    e.preventDefault();
    console.log(e.target);
  }
  // Render
  // ----------------------------------------------------
  render() {
    let today  = new Date();
    let dayTime;
    if (today.getHours() > 12) {
      if (today.getMinutes() < 10) {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
      } else {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
      }
    } else {
      if (today.getMinutes() < 10) {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
      } else {
        dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";
      }
    }

    let finalEntry;
    if (this.props.userName !== '') {
      finalEntry = dayTime + ' - ' + this.props.userName + '\n';
    } else {
      finalEntry = dayTime + ' - ';
    }

    if (this.props.recapSlide === 'noTicket') {
      return (
        <div className="RecapVisitModal modalInner">
          <div className="backArrow" id="notesBack" onClick={this.props.recapBack}>
            <img src={arrow_back} alt="Go Back" />
          </div>

          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>

          <form onSubmit={this.props.recapSubmit} id="RecapNotes">
            <h3>Great! Please write a quick note on what happened.</h3>
            <textarea rows='4' placeholder="Type a recap of the visit..."></textarea>
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </form>

         </div>
      );
    }

    if (this.props.recapSlide === 'createTicket') {
      return (
        <div className="RecapVisitModal modalInner">
          <div className="backArrow" id="createBack" onClick={this.props.recapBack}>
            <img src={arrow_back} alt="Go Back" />
          </div>

          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>

          <form onSubmit={this.props.recapSubmit} id="RecapTicket">
            <h3>Okay, please explain the issues in detail</h3>
            <textarea rows='6' placeholder="Type issues in an itemized manner..."></textarea>
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </form>

         </div>
      );
    }


    //slide 1
    return (
      <div className="RecapVisitModal modalInner">
        <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
          <img src={exit} alt="exit" />
        </div>

        <form id="RecapVisit">
          <h3>During the visit, were there any issues that would require a ticket?</h3>
          <button onClick={this.props.recapSubmit} type="submit" id="create" className="btn softGrad--black">Let's Create a Ticket</button>
          <button onClick={this.props.recapSubmit} type="submit" id="dont" className="btn softGrad--secondary">No Issues to Follow Up</button>
        </form>

       </div>
    );

  }
}


RecapVisit.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  saveNoteHandler: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
}
