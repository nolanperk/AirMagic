import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';


export default class ModuleSpecial extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let special = this.props.specialNotes;

    return (
      <div className="ModuleCard">
        <div className="inner">



          <div className="inputBlock inputBlock--full">
            <label>Special Notes</label>
            <textarea
              className="NotesList"
              id="special"
              rows='6'
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

ModuleSpecial.propTypes ={
  specialNotes: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
}
