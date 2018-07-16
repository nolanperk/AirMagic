import React, { Component } from 'react';
import propTypes from 'prop-types';

import phoneImg from '../../../assets/icons/black/phone.png';
import numberImg from '../../../assets/icons/black/number.png';
import emailImg from '../../../assets/icons/black/email.png';


export default class ModuleContact extends Component {
  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard">
        {this.ContactType}
      </div>
    );
  }

  get ContactType() {
    let salutation = this.props.salutation;
    let contact = this.props.contact;
    let title = this.props.title;
    let altContact = this.props.altContact;
    let phone = this.props.phone;
    let ext = this.props.ext;
    let cell = this.props.cell;
    let email = this.props.email;
    let source = this.props.source;

    let officeLink = 'tel:' + phone;
    let cellLink = 'tel:' + cell;
    let emailLink = 'mailto:' + email;
    if (this.props.currentRecordView === 'appointment') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--quart">
            <label>Salutation</label>
            <input
              type="text"
              id="salutation"
              value={salutation}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--75">
            <label>Main Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Contact Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Alt. Contact</label>
            <input
              type="text"
              id="altContact"
              value={altContact}
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--quart">
            <label>Salutation</label>
            <input
              type="text"
              id="salutation"
              value={salutation}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--75">
            <label>Main Contact</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Contact Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Alt. Contact</label>
            <input
              type="text"
              id="altContact"
              value={altContact}
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--large">
            <label>Office Phone</label>
            <div className="inputWithTag">
                <div className="inputTag">
                  <a href={officeLink}></a>
                  <img src={phoneImg} />
                </div>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--small">
            <label>Extension</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={numberImg} />
              </div>
              <input
                type="text"
                id="ext"
                value={ext}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--full">
            <label>Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a href={emailLink}></a>
                <img src={emailImg} />
              </div>
              <input
                type="text"
                id="email"
                value={email}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Cell Phone</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a href={cellLink}></a>
                <img src={phoneImg} />
              </div>
              <input
                type="text"
                id="cell"
                value={cell}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Lead Source</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    }
  }
}

ModuleContact.propTypes ={
  currentRecordView: propTypes.string.isRequired,
  salutation: propTypes.string,
  contact: propTypes.string,
  title: propTypes.string,
  altContact: propTypes.string,
  phone: propTypes.string,
  ext: propTypes.string,
  cell: propTypes.string,
  email: propTypes.string,
  source: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
