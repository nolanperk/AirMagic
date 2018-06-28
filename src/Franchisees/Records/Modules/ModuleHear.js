import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';


export default class ModuleService extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let source = this.props.source;

    return (
      <div className="ModuleCard">
        <div className="inner">



          <div className="inputBlock inputBlock--full">
            <label>Special Notes</label>
            <textarea
              className="NotesList"
              id="source"
              rows='6'
              value={source}
              onChange={this.props.changeNotesHandler}>
              {source}
            </textarea>
          </div>

        </div>
      </div>
    );
  }
}

ModuleService.propTypes ={
  source: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
}
