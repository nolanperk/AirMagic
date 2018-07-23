import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';

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
        <ul>
          <li className="TabItem isActive" onClick={this.props.switchTableHandler} id="customers">Customers</li>
          <li className="TabItem" onClick={this.props.switchTableHandler} id="franchise-info">Franchise Info</li>
        </ul>
      </div>
    );


    return (
      <div className={navClass}>
        <div className="Navbar">
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
          <div className="inputBlock">
            <div className="selectBlock">
              {this.viewSelects}
            </div>
          </div>
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
  viewSelect: propTypes.func.isRequired,
  currentRecordView: propTypes.string.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  citySet: propTypes.string.isRequired,
}
