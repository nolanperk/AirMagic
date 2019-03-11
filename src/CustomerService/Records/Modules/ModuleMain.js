import React, { Component } from 'react';
import propTypes from 'prop-types';

import phoneImg from '../../../assets/icons/black/phone.png';
import numberImg from '../../../assets/icons/black/number.png';
import emailImg from '../../../assets/icons/black/email.png';

export default class ModuleMain extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard moduleMain">
        {this.AccountingView}
      </div>
    );
  }

  get AccountingView() {
    let company = this.props.company;
    let cpop = this.props.cpop;
    let supplies = this.props.supplies;

    let salutation = this.props.salutation;
    let contact = this.props.contact;
    let title = this.props.title;
    let altContact = this.props.altContact;
    let phone = this.props.phone;
    let ext = this.props.ext;
    let cell = this.props.cell;
    let email = this.props.email;

    let officeLink = 'tel:' + phone;
    let cellLink = 'tel:' + cell;
    let emailLink = 'mailto:' + email;
    if (this.props.currentRecordView === 'accounting') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--full">
            <label>Company Name</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={company}
              id="company"
            />
          </div>
        </div>
      );
    } else if (this.props.currentRecordView === 'crews') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--full">
            <label>Company Name</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={company}
              id="company"
            />
          </div>



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
          <div className="inputBlock inputBlock--full">
            <label>Company Name</label>
            <input
              type="text"
              onChange={this.props.changeRecordHandler}
              value={company}
              id="company"
            />
          </div>



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

          <div className="inputBlock inputBlock--75">
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

          <div className="inputBlock inputBlock--quart">
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
            <label>Category</label>
            <div
              className="selectBlock"
              id="category"
              >
              <select id="categorySelect"  value={this.props.category} onChange={this.props.categoryChange}>
                <option></option>
                <option disabled>Standard</option>
                <option>General Office</option>
                <option>Manufacturing</option>
                <option>Government</option>
                <option>Law Office</option>
                <option>Retail</option>

                <option disabled>--------</option>
                <option disabled>Medical</option>
                <option>Standard Medical</option>
                <option>Clinic</option>
                <option>Dialysis / Oncology</option>
                <option>Dentist</option>
                <option>Veterinarian</option>

                <option disabled>--------</option>
                <option>Residential Common Area</option>
                <option>Residential Living</option>

                <option disabled>--------</option>
                <option>School</option>
                <option>Daycare / VPK</option>

                <option disabled>--------</option>
                <option>Church</option>

                <option disabled>--------</option>
                <option>Restaurant</option>
                <option>Bar</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
  }
}

ModuleMain.propTypes ={
  company: propTypes.string,
  currentRecordView: propTypes.string.isRequired,

  salutation: propTypes.string,
  contact: propTypes.string,
  title: propTypes.string,
  altContact: propTypes.string,
  phone: propTypes.string,
  ext: propTypes.string,
  cell: propTypes.string,
  email: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
