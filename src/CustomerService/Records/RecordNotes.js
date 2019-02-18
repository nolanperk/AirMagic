import React, { Component } from 'react';
import propTypes from 'prop-types';

import account from '../../assets/icons/primary/account.png';
import edit from '../../assets/icons/white/edit.png';

export default class RecordNotes extends Component {
  constructor(props) {
    super();
    this.state = {
      view: 'notes',
    }
  }
  changeView = e => {
    console.log(e.target);

    if (e.target.id === 'newNotes') {
      this.setState({
        view: 'notes',
      })
    } else if (e.target.id === 'oldNotes') {
      this.setState({
        view: 'old',
      })
    }
  };

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

    let oldNotes;

    if (this.props.oldNotes) {
      oldNotes = this.props.oldNotes;
    } else {
      oldNotes = '';
    }

    let noteCountClass = '';
    if (parseInt(this.props.noteCharacters) > 90000 && parseInt(this.props.noteCharacters) < 98000) {
      noteCountClass = 'warning';
    } else if (parseInt(this.props.noteCharacters) >= 98000) {
      noteCountClass = 'broken';
    }

    let notesLength = 0;
    if (this.props.notes) {
      notesLength = this.props.notes.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let oldNotesLength = 0;
    if (this.props.oldNotes) {
      oldNotesLength = this.props.oldNotes.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (this.state.view === 'notes') {
      return (
        <div className="RecordNotes">
          <div className="addNotesBox">
            <div className="navIcon softGrad--primary" id="addNotes" onClick={this.props.controlsModalToggle}>
              <img src={edit} alt="edit" />
            </div>
          </div>
          <div className="NotesNav">
            <h4><span className="isActive" id="newNotes">Notes</span> / <span id="oldNotes" onClick={this.changeView}>Old Notes</span> <span id="noteCharCount" className={noteCountClass}>{notesLength}</span></h4>
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

    } else {
      return (
        <div className="RecordNotes">
          <div className="addNotesBox">
            <div className="navIcon softGrad--primary" id="addNotes" onClick={this.props.controlsModalToggle}>
              <img src={edit} alt="edit" />
            </div>
          </div>
          <div className="NotesNav">
            <h4><span id="newNotes" onClick={this.changeView}>Notes</span> / <span id="oldNotes" className="isActive">Old Notes</span> <span id="noteCharCount">{oldNotesLength}</span></h4>
          </div>

          <textarea
            className="NotesList"
            id="oldNotes"
            value={oldNotes}
            onChange={this.props.changeNotesHandler}>
            {oldNotes}
          </textarea>
        </div>
      );
    }
  }
}

RecordNotes.propTypes ={
  currentTab: propTypes.string.isRequired,
  notes: propTypes.string,
  mobileHand: propTypes.string.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
}
