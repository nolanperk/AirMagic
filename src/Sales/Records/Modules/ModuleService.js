import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';


export default class ModuleService extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let special = this.props.serviceNotes;

    return (
      <div className="ModuleCard moduleSpecial">
        <div className="inner">



          <div className="inputBlock inputBlock--full">
            <label>Service / Building Notes</label>
            <textarea
              className="NotesList"
              id="serviceNotes"
              rows='8'
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

ModuleService.propTypes ={
  serviceNotes: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
}
