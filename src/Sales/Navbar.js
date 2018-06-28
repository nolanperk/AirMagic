import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';

export default class Navbar extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let navClass = "";
    let navTitle = "Sales Pipeline";


    if (this.props.recordView) {
      navClass = 'recordNav';
      const currentRecord = this.props.currentRecord;
      navTitle = currentRecord["Company Name"]
    } else {
      navClass = 'normalNav';
    }

    const recordView = this.props.recordView;


    return (
      <div className={navClass}>
        <div className="Navbar">
          {this.closeButton}
          <h4>{navTitle}</h4>
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
          <div className="navIcon softGrad--primary" onClick={this.props.closeRecordHandler}>
            <img src={hamburger} alt="databases" />
          </div>
        </Link>
      );
    }
  }
  get downloadButton() {
    if (this.props.recordView) {
      return (
        <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
          <img src={exportImg} alt="Export" />
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
  currentRecord: propTypes.array.isRequired,
}
