import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';


export default class ModuleOffer extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let special = this.props.serviceScheduleNotes;

    return (
      <div className="ModuleCard moduleSpecial">
        <div className="inner">



          <div className="inputBlock inputBlock--full">
            <label>Service Schedule Changes</label>
            <textarea
              className="NotesList"
              id="serviceScheduleNotes"
              rows='3'
              value={special}
              onChange={this.props.changeNotesHandler}>
              {special}
            </textarea>
          </div>

        </div>
      </div>
    );
  }
}

ModuleOffer.propTypes ={
  serviceScheduleNotes: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
}
