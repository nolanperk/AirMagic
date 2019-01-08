import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exit from '../../assets/icons/white/exit.png';
import arrow_forward from '../../assets/icons/white/arrow_forward.png';
import edit from '../../assets/icons/white/edit.png';
import addImage from '../../assets/icons/white/image.png';

export default class TicketModal extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, ticketData, ticketOpen, openedTicket, ticketRecordData } = this.props;

    if (ticketOpen) {
      let formattedCreated = new Date(openedTicket.fields['Created Date']);
      var formattedCreated = new Date(formattedCreated.getTime() + Math.abs(formattedCreated.getTimezoneOffset()*60000));
      formattedCreated = (formattedCreated.getMonth()+1) + '/' + formattedCreated.getDate() + '/' + formattedCreated.getFullYear();

      function adjustHeight(el){
        el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
      }

      return (
        <div className="TicketModal">
          <div className="inner">

            <div class="modalTitle">
              <h4>Ticket for {openedTicket.fields['Company Name']} | <em>created on {formattedCreated}</em></h4>
              <div className="navIcon softGrad--primary" onClick={this.props.closeTicketHandler}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <div className="modalBody">

              <div className="mainTicket">

                <div className="inputBlock inputBlock--half">
                  <h3>Status</h3>
                  <div
                    className="selectBlock"
                    >
                    <select id="status" value={openedTicket.fields['Status']} onChange={this.props.changeTicketHandler}>
                      <option id="blank"></option>
                      <option id="Created">Ticket Created</option>
                      <option id="Sent" value="Sent to SP">Problems Relayed to SP</option>
                      <option id="Fixed" value="Fixed by SP">Fixed According to SP</option>
                      <option id="More" value="More Issues">Not Fixed / More Issues</option>
                      <option id="Resolved" value="Ticket Resolved">Ticket Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="inputBlock inputBlock--full">
                  <h3>Issues</h3>
                  <textarea id="issues" onChange={this.props.changeTicketHandler}>{openedTicket.fields['Ticket Issues']}</textarea>
                </div>

                <div className="inputBlock inputBlock--full">
                  <h3>Updates</h3>
                  <textarea id="updates" onChange={this.props.changeTicketHandler}>{openedTicket.fields['Ticket Updates']}</textarea>
                </div>

                <div className="pictureList">
                  {openedTicket.fields['Pictures'] ? <h3>Pictures</h3> : ''}
                  {openedTicket.fields['Pictures'] ? openedTicket.fields['Pictures'].map((e, i) => this.ticketPictures(e, i)) : ''}
                  {/* <div className="pictureItem addImage" onClick={this.props.removePicture}>
                    <div className="uploadInner">
                      <div className="navIcon softGrad--black" onClick={this.revertMemory}>
                        <img src={addImage} alt={'Record - ' + openedTicket.fields['Company Name']} />
                      </div>
                      <p>Add Image</p>
                      <input type="file" onChange={this.props.addPicture} />
                    </div>
                    <img src="" id="output" className="isHidden" />
                  </div> */}
                </div>

              </div>

              <div className="accountData">

                <div className="recordCards">
                  <div className="RecordCard">
                    <h3><span>Monthly Amount</span> <br /> {ticketRecordData ? ticketRecordData['Monthly Amount'] : ''}</h3>
                    <h3><span>Times per Week</span> <br /> {ticketRecordData ? ticketRecordData['Times per Week'] : ''}</h3>
                    <h3><span>Start Date</span> <br /> {ticketRecordData ? ticketRecordData['Start Date'] : ''}</h3>
                    <h3><span>Days of Week</span> <br /> {ticketRecordData ? ticketRecordData['Days of Week'] : ''}</h3>
                  </div>

                  <div className="RecordCard">
                    {this.spLevel}
                    {this.spName}
                    {this.spHome}
                    {this.spCell}
                    {this.spEmail}
                    <hr />
                    {this.spPartner}
                    {this.spPartnerPhone}
                  </div>

                  <div className="RecordCard">
                    <h3><span>Contact</span> <br /> {ticketRecordData ? ticketRecordData['Main contact'] : ''}</h3>
                    <h3><span>Email</span> <br /> {ticketRecordData ? ticketRecordData['Email'] : ''}</h3>
                    <h3><span>Office Phone</span> <br /> {ticketRecordData ? ticketRecordData['Office Phone'] : ''}</h3>
                    <h3><span>Cellphone</span> <br /> {ticketRecordData ? ticketRecordData['Cellphone'] : ''}</h3>
                  </div>

                    {this.recordNotes}
                </div>

                <Link to={`/` + this.props.citySet + `/customer-service/all/` + openedTicket.fields['Company ID']} target="_blank">
                  <div className="bottom">
                    View the {openedTicket.fields['Company Name']} record
                    <img src={arrow_forward} />
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  get recordNotes() {
    if (this.props.ticketRecordData) {
      return (
        <div className="RecordCard card--Notes">
          <h3><span>Notes</span></h3>
          <p>{this.props.ticketRecordData['Notes']}</p>
        </div>
      );
    }
  }

  get spName() {
    if (this.props.spRecord) {
      if (this.props.spRecord['SP Name']) {
        return (
          <h3>
            <span>Franchisee</span>
            <br />
            {this.props.spRecord['SP Name']}
          </h3>
        );
      }
    }
  }
  get spHome() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Home Phone']) {
        return (
          <h3>
            <span>SP Phone</span>
            <br />
            {this.props.spRecord['Home Phone']}
          </h3>
        );
      }
    }
  }
  get spCell() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Cellphone']) {
        return (
          <h3>
            <span>Cellphone</span>
            <br />
            {this.props.spRecord['Cellphone']}
          </h3>
        );
      }
    }
  }
  get spEmail() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Email']) {
        return (
          <h3>
            <span>Email</span>
            <br />
            <a href={"mailto:" + this.props.spRecord['Email']}>{this.props.spRecord['Email']}</a>
          </h3>
        );
      }
    }
  }
  get spLevel() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Franchise Level']) {
        return (
          <div className={'spLevel level--' + this.props.spRecord['Franchise Level']}>
            Level {this.props.spRecord['Franchise Level']}
          </div>
        );
      }
    }
  }
  get spPartner() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Partner Name']) {
        return (
          <h3>
            <span>Partner Name</span>
            <br />
            {this.props.spRecord['Partner Name']}
          </h3>
        );
      }
    }
  }
  get spPartnerPhone() {
    if (this.props.spRecord) {
      if (this.props.spRecord['Partner Phone']) {
        return (
          <h3>
            <span>Partner Phone</span>
            <br />
            {this.props.spRecord['Partner Phone']}
          </h3>
        );
      }
    }
  }


  ticketPictures(pictureList, index) {
    let pictureCaptions = this.props.openedTicket.fields['Picture Captions'].split('CAPTION - ');
    pictureCaptions.shift();
    return (
      <div className="pictureItem">
        <img src={this.props.openedTicket.fields['Pictures'][index].url} />
        <textarea rows='2' id={'CAPTION-' + index}>{pictureCaptions[index]}</textarea>
      </div>
    )
  }
}
