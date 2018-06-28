import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class NewNote extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    let today  = new Date();
    console.log();
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

    return (
      <div className="AddNoteModal modalInner">
         <div className="modalTitle">
           <h4>Start Typing to Add New Note</h4>

           <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
             <img src={exit} alt="exit" />
           </div>
         </div>

         <textarea rows="5" id="newNoteBox">{finalEntry}</textarea>

         <div className="btn softGrad--secondary" onClick={this.props.saveNoteHandler}>Save Note</div>
       </div>
    );
  }
}


NewNote.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  saveNoteHandler: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
}
