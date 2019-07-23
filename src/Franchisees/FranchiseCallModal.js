import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import popout from '../assets/icons/popout.png';
import loader from '../assets/loader.gif';
import backBtn from '../assets/icons/black/arrow_back.png';

export default class FranchiseCallModal extends Component {
  constructor(props) {
    super();
    this.state = {
      viewType: 'intro',
    }
  }


  render() {

    return (
      <div className="FranchModalWrapper">
        <div className="modalBox">
          <div className="modalNav">
            <div className="titleArea">
              {this.navBack}
              <h4>Contacting <em>{this.props.openedCall.fields['SP Name']}</em></h4>
              <p className={"callType " + this.props.openedCall.fields['Status']}>{this.props.openedCall.fields['Status']}</p>
              <p>{this.props.openedCall.fields['City']}</p>
            </div>

            <div className="icons">

              <Link target="_blank" to={'/' + this.props.openedCall.region + '/franchisees/' + this.props.openedCall.id + '/'}>
                <div className="navIcon whiteCard">
                  <img src={popout} alt="exit" />
                </div>
              </Link>

              <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                <img src={exit} alt="exit" />
              </div>
            </div>
          </div>



          <div className="callBoxWrapper">
            {this.modalSlides}
            <div className="callColumn interaction">

            </div>

            <div className="callColumn notes">
              <div className="title">
                <h4>Notes</h4>
              </div>

              <div id="logNotes">

                <textarea
                  className="NotesList"
                  id="notes"
                  value={this.props.openedCall.fields['Notes']}
                  onChange={this.props.changeNotesHandler}>
                  {this.props.openedCall.fields['Notes']}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  get navBack() {
    if (this.state.viewType !== 'intro') {
      return (
        <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
      )
    }
  }
}
