import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';
import sortImg from '../assets/icons/black/sort.png';
import switchHands from '../assets/icons/primary/switch.png';

export default class Navbar extends Component {

  logoutHandler = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }
  revertMemory = () => {
    sessionStorage.removeItem('innerOffset'); //reset it!
    sessionStorage.removeItem('innerClosedID'); //reset it!
    sessionStorage.removeItem('listView');
    sessionStorage.removeItem('jumpLetters');
    sessionStorage.removeItem('salesView');
    sessionStorage.removeItem('regionZips');
    this.setState({
      currentRecordView: 'default'
    });
  }

  // Render
  // ----------------------------------------------------
  render() {
    let navClass = "";
    let navTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Sales Pipeline";

    let preTitle;
    if (this.props.recordView) {
      navClass = 'recordNav';
      const currentRecord = this.props.currentRecord;
      navTitle = currentRecord["Company Name"];
      preTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + ' Sales Pipeline';
    } else {
      navClass = 'normalNav';
    }

    const recordView = this.props.recordView;


    return (
      <div className={navClass}>
        <div className={'Navbar Navbar--' + this.props.mobileHand}>
          {this.closeButton}
          <h4>
            <span>{preTitle}</span>
            {this.props.recordView ? <br /> : ''}
            {navTitle}
          </h4>
          {this.downloadButton}
        </div>
      </div>

    );
  }

  get postApptLink() {
    let postApptLink = 'mailto:';
    postApptLink += this.props.currentRecord['Email'];
    let contact = this.props.currentRecord['Main contact'];


    let currRep;
    if (this.props.userName === 'NWP') {
      currRep = 'Nolan';
    } else if (this.props.userName === 'TMP') {
      currRep = 'Tyler';
    } else if (this.props.userName === 'JDH') {
      currRep = 'Joel';
    }
    let contactFirst;

    if (contact) {
      if (contact.indexOf(' ') < 0) {
        contactFirst = contact;
      } else {
        contactFirst = contact.split(' ')[0];
      }
      postApptLink += "?subject=" + currRep + "%20from%20Vanguard%20Cleaning%20Systems";
      postApptLink += "&body=Good%20morning%20" + contactFirst + "%2C%0D%0A%0D%0AThank%20you%20for%20your%20time%20today%20and%20for%20allowing%20me%20to%20visit%20your%20facility.%20It%20was%20a%20pleasure%20meeting%20you.%0D%0AI%20will%20be%20getting%20back%20to%20the%20office%20this%20afternoon%20at%20which%20point%20I%20will%20be%20putting%20together%20your%20proposal.%20I%20will%20have%20it%20to%20you%20by%20the%20end%20of%20the%20day.%0D%0A%0D%0AA%20bit%20about%20Vanguard%20Cleaning%0D%0AVanguard%20Cleaning%20of%20Central%20Florida%20has%20been%20family%20owned%20and%20operated%20for%20over%2016%20years%20and%20we%20have%20over%201%2C000%20customers%20across%20Central%20Florida%20who%20stay%20with%20us%20over%204%20years%E2%80%94double%20the%20industry%20average%E2%80%94even%20with%20our%20no-contracts%20policy%20because%20we%20work%20hard%20to%20earn%20your%20business%20every%20day.%0D%0A%0D%0AThanks%20again%20and%20I%20will%20speak%20with%20you%20soon%2C";
    }

    return (
      <a className="postApptLink" href={postApptLink}>Post-Appt Email</a>
    );
  }
  get viewSelects() {
    if (this.props.recordView) {
      return (
        <select id="viewSelect" value={this.props.currentRecordView} onChange={this.props.viewSelect}>
          <option value="default">Default</option>
          <option value="inside">Inside Sales</option>
          <option value="appointment">Appointment</option>
          <option value="proposal">Proposal</option>
        </select>
      );
    } else {
      return (
        <select id="jumpLetters" value={this.props.currentLetter} onChange={this.props.jumpLetters}>
          <option value="none">Jump to Letter</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
          <option value="f">F</option>
          <option value="g">G</option>
          <option value="h">H</option>
          <option value="i">I</option>
          <option value="j">J</option>
          <option value="k">K</option>
          <option value="l">L</option>
          <option value="m">M</option>
          <option value="n">N</option>
          <option value="o">O</option>
          <option value="p">P</option>
          <option value="q">Q</option>
          <option value="r">R</option>
          <option value="s">S</option>
          <option value="t">T</option>
          <option value="u">U</option>
          <option value="v">V</option>
          <option value="w">W</option>
          <option value="x">X</option>
          <option value="y">Y</option>
          <option value="z">Z</option>
        </select>
      );
    }
  }
  get closeButton() {
    if (this.props.recordView) {
      return (
        <div className="navIcon softGrad--primary" onClick={this.props.closeRecordHandler}>
          <img src={exit} alt="exit" />
        </div>
      );
    } else {
      if (localStorage.getItem('isOutside') === 'true') {
        if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
          return (
            <Link to={`/outside/login`}>
              <div className="navIcon softGrad--primary" onClick={this.logoutHandler}>
                Logout
              </div>
            </Link>
          );
        } else {
          return (
            <Link to={`/outside/`}>
              <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
                <img src={hamburger} alt="databases" />
              </div>
            </Link>
          );
        }
      } else {
        return (
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
        );
      }
    }
  }
  get downloadButton() {
    if (localStorage.getItem('isOutside') === 'true') {
      if (!this.props.recordView) {
        return (
          <div className="rightButtons">
            <div className="inputBlock">
              <div className="selectBlock">
                {this.viewSelects}
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.recordView) {
        if (window.innerWidth > 900) { //non-mobile
          if (this.props.userName === 'NWP' || this.props.userName === 'TMP' || this.props.userName === 'JDH') {
            return (
              <div className="rightButtons">
                <div className="inputBlock">
                  <div className="selectBlock">
                    {this.viewSelects}
                  </div>
                </div>
                <div className="btn softGrad--primary" id="logCall" onClick={this.props.controlsModalToggle}>Call</div>

                <div className="btn softGrad--secondary" id="moveDatabase" onClick={this.props.controlsModalToggle}>Close It</div>

                <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
                  <img src={exportImg} alt="Export" />
                </div>
              </div>
            );
          } else {
            return (
              <div className="rightButtons">
                <div className="btn softGrad--primary" id="logCall" onClick={this.props.controlsModalToggle}>Call</div>

                <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
                  <img src={exportImg} alt="Export" />
                </div>
              </div>
            );
          }
        } else {
          return (
            <div className="rightButtons">
              <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
                <img src={exportImg} alt="Export" />
              </div>

              <div className="navIcon whiteCard exportBtn" onClick={this.props.switchHandHandler} id="switchHands">
                <img src={switchHands} alt="Switch Hands" />
              </div>
            </div>

          );
        }
      } else if (this.props.userName === 'NWP' || this.props.userName === 'TMP' || this.props.userName === 'JDH') {
        return (
          <div className="rightButtons">

            <div className="inputBlock">
              <div className="selectBlock">
                {this.viewSelects}
              </div>
            </div>

            <a className="btn softGrad--primary" id="yelpModal" onClick={this.props.controlsModalToggle}>Yelp!</a>
            <a className="btn softGrad--blue" id="salesFollows" onClick={this.props.controlsModalToggle}>Follow Ups</a>
            <a className="btn softGrad--black" id="salesMetrics" onClick={this.props.controlsModalToggle}>Sales Data</a>

            <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="exportList">
              <img src={exportImg} alt="Export" />
            </div>
          </div>
        );
      } else {
        return (
          <div className="rightButtons">

            <div className="inputBlock">
              <div className="selectBlock">
                {this.viewSelects}
              </div>
            </div>

            <a className="btn softGrad--primary" id="yelpModal" onClick={this.props.controlsModalToggle}>Yelp!</a>
          </div>
        );
      }
    }
  }
}


Navbar.propTypes ={
  recordView: propTypes.bool.isRequired,
  viewSelect: propTypes.func.isRequired,
  switchHandHandler: propTypes.func.isRequired,
  mobileHand: propTypes.string.isRequired,
  currentRecordView: propTypes.string.isRequired,
  jumpLetters: propTypes.func.isRequired,
  currentLetter: propTypes.string.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  citySet: propTypes.string.isRequired,
}
