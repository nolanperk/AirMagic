import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';
import visitImg from '../assets/icons/white/location.png';
import switchHands from '../assets/icons/primary/switch.png';

export default class Navbar extends Component {

  revertMemory = () => {
    sessionStorage.removeItem('innerOffset'); //reset it!
    sessionStorage.removeItem('innerClosedID'); //reset it
    sessionStorage.removeItem('listView');
    sessionStorage.removeItem('serviceView');
    this.setState({
      currentRecordView: 'default'
    });
  }

  // Render
  // ----------------------------------------------------
  render() {
    let navClass = "";
    let navTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Customers";

    let preTitle;
    if (this.props.recordView) {
      navClass = 'recordNav';
      const currentRecord = this.props.currentRecord;
      navTitle = currentRecord["Company Name"];
      preTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + ' Customers';
    } else {
      navClass = 'normalNav';
    }

    const recordView = this.props.recordView;
    const tablList = recordView ? (
      <div className="TabList"></div>
    ) : (
      <div className="TabList">
      </div>
    );


    return (
      <div className={navClass}>
        <div className={'Navbar Navbar--' + this.props.mobileHand}>
          {this.closeButton}
          <h4>
            <span>{preTitle}</span>
            {this.props.recordView ? <br /> : ''}
            {navTitle}
          </h4>
          {tablList}
          {this.downloadButton}
        </div>
      </div>

    );
  }
  get viewSelects() {
    if (this.props.recordView) {
      return (
        <select id="viewSelect" value={this.props.currentRecordView} onChange={this.props.viewSelect}>
          <option value="default">Default View</option>
          <option value="accounting">Accounting View</option>
          <option value="crews">Starts & Changes</option>
        </select>
      );
    }
  }
  get closeButton() {
    if (this.props.recordView) {
      return (
        <div className="navIcon exit softGrad--primary" onClick={this.props.closeRecordHandler}>
          <img src={exit} alt="exit" />
        </div>
      );
    } else {
      return (
        <Link to={`/`}>
          <div className="navIcon exit softGrad--primary" onClick={this.revertMemory}>
            <img src={hamburger} alt="databases" />
          </div>
        </Link>
      );
    }
  }
  get downloadButton() {
    let proURL = '/' + this.props.citySet + '/customer-service/proactive';
    let attURL = '/' + this.props.citySet + '/customer-service/attention';
    let tickURL = '/' + this.props.citySet + '/customer-service/tickets';

    if (this.props.recordView) {
      if (window.innerWidth > 900) { //non-mobile
        return (
          <div className="rightButtons">
            <div className="inputBlock">
              <div className="selectBlock">
                {this.viewSelects}
              </div>
            </div>

            <div className="btn softGrad--primary" id="accountChanges" onClick={this.props.controlsModalToggle}>Changes</div>

            <div className="navIcon softGrad--secondary" onClick={this.props.recapVisit} id="recapVisit">
              <img src={visitImg} alt="Recap Visit" />
            </div>
            <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
              <img src={exportImg} alt="Export" />
            </div>
          </div>
        );
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
    } else {
      return (
        <div className="rightButtons">
          <a href={tickURL.replace('//', '/')} className="btn softGrad--black" id="attention">Tickets</a>
          <a href={attURL.replace('//', '/')} className="btn softGrad--primary" id="attention">Needs Attention</a>
          <a href={proURL.replace('//', '/')} className="btn softGrad--blue" id="proactive">Proactive List</a>
          <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="exportList">
            <img src={exportImg} alt="Export" />
          </div>
        </div>
      );
    }
  }
}


Navbar.propTypes ={
  recordView: propTypes.bool.isRequired,
  viewSelect: propTypes.func.isRequired,
  switchHandHandler: propTypes.func.isRequired,
  mobileHand: propTypes.string.isRequired,
  currentRecordView: propTypes.string.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  citySet: propTypes.string.isRequired,
}
