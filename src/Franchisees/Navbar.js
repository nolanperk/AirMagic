import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';

export default class Navbar extends Component {

  revertMemory = () => {
    sessionStorage.removeItem('innerOffset'); //reset it!
    sessionStorage.removeItem('innerClosedID'); //reset it!
    sessionStorage.removeItem('listView');
  }

  // Render
  // ----------------------------------------------------
  render() {
    let navClass = "";
    let navTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + " Franchisees";

    let preTitle;
    if (this.props.recordView) {
      navClass = 'recordNav';
      const currentRecord = this.props.currentRecord;
      navTitle = currentRecord["SP Name"];
      preTitle = this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.substr(1).toLowerCase() + ' Franchisees';
    } else {
      navClass = 'normalNav';
    }

    const recordView = this.props.recordView;


    return (
      <div className={navClass}>
        <div className="Navbar">
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
  get closeButton() {
    if (this.props.recordView) {
      return (
        <div className="navIcon softGrad--primary" onClick={this.props.closeRecordHandler}>
          <img src={exit} alt="exit" />
        </div>
      );
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
  get downloadButton() {
    if (this.props.recordView) {
      return (
        <div className="rightButtons">
          <div className="btn softGrad--black" id="setMeeting" onClick={this.props.controlsModalToggle}>Set Meeting</div>

          <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
            <img src={exportImg} alt="Export" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="exportList">
          <img src={exportImg} alt="Export" />
        </div>
      );
    }
  }
}


Navbar.propTypes ={
  recordView: propTypes.bool.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  citySet: propTypes.string.isRequired,
  currentRecord: propTypes.array.isRequired,
}
