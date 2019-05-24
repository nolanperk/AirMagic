import React, { Component } from 'react';
import propTypes from 'prop-types';

import phoneImg from '../../../assets/icons/black/phone.png';
import numberImg from '../../../assets/icons/black/number.png';
import emailImg from '../../../assets/icons/black/email.png';


export default class ModuleContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callStatus: '',
    }
  }

  handleClick = e => {
    let proposalLink = 'mailto:';
    proposalLink += this.props.email;

    if (this.props.currentRecord['Proposal Type'] === 'No-Visit') {
      let currRep;
      if (this.props.userName === 'NWP') {
        currRep = 'Nolan';
      } else if (this.props.userName === 'TMP') {
        currRep = 'Tyler';
      } else if (this.props.userName === 'JDH') {
        currRep = 'Joel';
      }
      let contactFirst;

      if (this.props.contact) {
        if (this.props.contact.indexOf(' ') < 0) {
          contactFirst = this.props.contact;
        } else {
          contactFirst = this.props.contact.split(' ')[0];
        }
        proposalLink += "?subject=Vanguard%20Cleaning%20Systems%20Proposal";
        proposalLink += "&body=Good%20afternoon%20" + contactFirst + "%2C%0A%0AThank%20you%20for%20the%20opportunity%20to%20earn%20your%20business.%0ABased%20on%20your%20conversation%20with%20" + this.props.currentRecord['Appt. Set By'].split(' ')[0] + "%2C%20I%E2%80%99ve%20attached%20a%20" + this.props.timesPerWeek + "Week%20proposal%20which%20includes%20our%20price%20and%20your%20service%20schedule%20detailing%20everything%20we%20are%20offering%20to%20clean%20on%20a%20weekly%2C%20and%20monthly%20basis.%20Also%20included%20is%20our%20certificate%20of%20insurance.%0A%0AWe%20are%20very%20flexible%20so%20if%20you%20need%20anything%20changed%2C%20please%20let%20me%20know.%0A%0AA%20bit%20about%20us%0AVanguard%20Cleaning%20of%20Tampa%20Bay%20has%20been%20family%20owned%20and%20operated%20for%20over%2016%20years.%20Our%201%2C000%2B%20customers%20stay%20with%20us%20double%20the%20industry%20average%20even%20with%20our%20month-to-month%20agreements%20because%20we%20work%20hard%20to%20earn%20your%20business%20every%20day.%0A%0AThanks%20again%20and%20I%20look%20forward%20to%20hearing%20from%20you%2C";


        var fakeDownloadA = document.createElement('a');
        fakeDownloadA.setAttribute('href', proposalLink);

        fakeDownloadA.style.display = 'none';
        document.body.appendChild(fakeDownloadA);

        fakeDownloadA.click();

        document.body.removeChild(fakeDownloadA);
      }
    } else {
      let currRep;
      if (this.props.userName === 'NWP') {
        currRep = 'Nolan';
      } else if (this.props.userName === 'TMP') {
        currRep = 'Tyler';
      } else if (this.props.userName === 'JDH') {
        currRep = 'Joel';
      }
      let contactFirst;

      if (this.props.contact) {
        if (this.props.contact.indexOf(' ') < 0) {
          contactFirst = this.props.contact;
        } else {
          contactFirst = this.props.contact.split(' ')[0];
        }
        proposalLink += "?subject=Vanguard%20Cleaning%20Systems%20Proposal";
        proposalLink += "&body=Good%20afternoon%20" + contactFirst + "%2C%0A%0AThank%20you%20for%20your%20time%20today%20and%20for%20the%20opportunity%20to%20earn%20your%20business.%20It%20was%20a%20pleasure%20meeting%20you.%0ABased%20on%20our%20conversation%20and%20what%20I%20saw%20during%20my%20visit%2C%20I%E2%80%99ve%20attached%20a%20" + this.props.timesPerWeek + "Week%20proposal%20which%20includes%20our%20price%20and%20your%20service%20schedule%20detailing%20everything%20we%20are%20offering%20to%20clean%20on%20a%20weekly%2C%20and%20monthly%20basis.%20Also%20included%20is%20our%20certificate%20of%20insurance.%0A%0AWe%20are%20very%20flexible%20so%20if%20you%20need%20anything%20changed%2C%20please%20let%20me%20know.%0A%0AA%20bit%20about%20us%0AVanguard%20Cleaning%20of%20Tampa%20Bay%20has%20been%20family%20owned%20and%20operated%20for%20over%2016%20years.%20Our%201%2C000%2B%20customers%20stay%20with%20us%20double%20the%20industry%20average%20even%20with%20our%20month-to-month%20agreements%20because%20we%20work%20hard%20to%20earn%20your%20business%20every%20day.%0A%0AThanks%20again%20and%20I%20look%20forward%20to%20hearing%20from%20you%2C";


        var fakeDownloadA = document.createElement('a');
        fakeDownloadA.setAttribute('href', proposalLink);

        fakeDownloadA.style.display = 'none';
        document.body.appendChild(fakeDownloadA);

        fakeDownloadA.click();

        document.body.removeChild(fakeDownloadA);
      }
    }


  }


  callStatusChange = e => {this.setState({callStatus: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        callStatus: this.props.callStatus,
      })
    }).bind(this), 50);
  }
  // Render
  // ----------------------------------------------------
  render() {
    return (
      <div className="ModuleCard moduleContact">
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
    let altEmail = this.props.altEmail;
    let source = this.props.source;
    let callStatus = this.props.callStatus;


    let officeLink = 'tel:' + phone;
    let cellLink = 'tel:' + cell;
    let emailLink = 'mailto:' + email;
    let altEmailLink = 'mailto:' + altEmail;
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
    } if (this.props.currentRecordView === 'inside') {
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
            <label>Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a onContextMenu={this.handleClick} href={emailLink}></a>
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
            <label>Alt. Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a onContextMenu={this.handleClick} href={altEmailLink}></a>
                <img src={emailImg} />
              </div>
              <input
                type="text"
                id="altEmail"
                value={altEmail}
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--full">
            <label>Call Status</label>
            <div
              className="selectBlock"
              id="call"
              >
              <select id="callStatus" value={this.state.callStatus} onChange={this.callStatusChange}>
                <option id="none"></option>
                <option id="Open+Season">Open Season</option>
                <option id="Only+Outside">Sales Rep Only</option>
              </select>
            </div>
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

          <div className="inputBlock inputBlock--half">
            <label>Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a onContextMenu={this.handleClick} href={emailLink}></a>
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
            <label>Alt. Email</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <a onContextMenu={this.handleClick} href={altEmailLink}></a>
                <img src={emailImg} />
              </div>
              <input
                type="text"
                id="altEmail"
                value={altEmail}
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
