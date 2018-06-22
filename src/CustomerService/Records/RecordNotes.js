import React, { Component } from 'react';
import propTypes from 'prop-types';

import account from '../../assets/icons/primary/account.png';
import edit from '../../assets/icons/white/edit.png';

export default class RecordNotes extends Component {


  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;
    let notes;

    if (this.props.notes) {
      notes = this.props.notes;
    } else {
      notes = '';
    }


    return (
      <div className="RecordNotes">
        <div className="addNotesBox">
          <div className="navIcon softGrad--primary" id="addNotes" onClick={this.props.controlsModalToggle}>
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className="NotesNav">
          <h4>Notes</h4>
        </div>

        <textarea
          className="NotesList"
          id="notes"
          value={notes}
          onChange={this.props.changeNotesHandler}>
          {notes}
        </textarea>
      </div>
    );
  }
}

RecordNotes.propTypes ={
  notes: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
}
