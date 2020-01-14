import React, { Component } from 'react';
import propTypes from 'prop-types';

import phoneImg from '../../../assets/icons/black/phone.png';
import numberImg from '../../../assets/icons/black/number.png';
import emailImg from '../../../assets/icons/black/email.png';


export default class ModuleContact extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    let home = this.props.home;
    let cell = this.props.cell;
    let email = this.props.email;
    let englishEmail = this.props.englishEmail;
    let partner = this.props.partner;
    let partnerPhone = this.props.partnerPhone;
    let english = this.props.english;
    let englishPhone = this.props.englishPhone;

    let homeLink = 'tel:' + home;
    let cellLink = 'tel:' + cell;
    let partnerLink = 'tel:' + partnerPhone;
    let englishLink = 'tel:' + englishPhone;
    let emailLink = 'mailto:' + email;
    let englishEmailLink = 'mailto:' + englishEmail;

    return (
      <div className="ModuleCard">
        <div className="inner">


          <div className="inputBlock inputBlock--half">
            <label>Home Phone</label>
            <div className="inputWithTag">
                <div className="inputTag">
                  <a href={homeLink}></a>
                  <img src={phoneImg} />
                </div>
              <input
                type="text"
                id="home"
                value={home}
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
            <label>Partner Name</label>
            <input
              type="text"
              id="partner"
              value={partner}
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Partner Phone</label>
            <div className="inputWithTag">
                <div className="inputTag">
                  <a href={partnerLink}></a>
                  <img src={phoneImg} />
                </div>
              <input
                type="text"
                id="partnerPhone"
                value={partnerPhone}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>


          <div className="inputBlock inputBlock--half">
            <label>English Cont. Name</label>
            <input
              type="text"
              id="english"
              value={english}
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>English Cont. Phone</label>
            <div className="inputWithTag">
                <div className="inputTag">
                  <a href={englishLink}></a>
                  <img src={phoneImg} />
                </div>
              <input
                type="text"
                id="englishPhone"
                value={englishPhone}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--full">
            <label>English Cont. Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a href={englishEmailLink}></a>
                <img src={emailImg} />
              </div>
              <input
                type="text"
                id="englishEmail"
                value={englishEmail}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>





        </div>
      </div>
    );
  }
}

ModuleContact.propTypes ={
  home: propTypes.string,
  cell: propTypes.string,
  email: propTypes.string,
  englishEmail: propTypes.string,
  partner: propTypes.string,
  partnerPhone: propTypes.string,
  english: propTypes.string,
  englishPhone: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
