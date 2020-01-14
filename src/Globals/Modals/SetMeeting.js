import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class SetMeeting extends Component {
  // Render
  // ----------------------------------------------------
  render() {

    const theRecord = this.props.currentRecord;
    return (
      <div className="FranchModalWrapper">
        <div className="modalBox">
          <div className="modalNav">
            <div className="titleArea">
              {this.navBack}
              <h4>Set Meeting with <em>{theRecord['SP Name']}</em></h4>
              <p className={"callType " + theRecord['Status']}>{theRecord['Status']}</p>
              <p>{theRecord['City']}</p>
            </div>

            <div className="icons">
              <div className="navIcon softGrad--black" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>
          </div>



          <div className="callBoxWrapper">
            <div className="callColumn interaction ">
              <div className='callArea callRow'>
                <div className="inner">
                  <div className="topBar">
                    <div class="contact">
                      <h4>Meeting Date / Time</h4>
                    </div>
                  </div>
                  <div className="interactArea">
                    <textArea placeholder="Notes from Call" id="callNotes" />
                  </div>
                </div>
              </div>

              <div className='callArea callRow'>
                <div className="inner">
                  <div className="topBar">
                    <div class="contact">
                      <h4>Write Some Notes</h4>
                    </div>
                  </div>
                  <div className="interactArea">
                    <textArea placeholder="Notes from Call" id="callNotes" />
                  </div>
                </div>
              </div>
            </div>

            <div className="callColumn notes">
              <div className="title">
                <h4>Notes</h4>
              </div>

              <div id="logNotes">

                <textarea
                  className="NotesList"
                  id="notes"
                  value={theRecord['Notes']}
                  onChange={this.props.changeNotesHandler}>
                  {theRecord['Notes']}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


SetMeeting.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  saveNoteHandler: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
}
