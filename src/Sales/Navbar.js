import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import exportImg from '../assets/icons/primary/export.png';
import sortImg from '../assets/icons/black/sort.png';

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
  get viewSelects() {
    if (this.props.recordView) {
      return (
        <select id="viewSelect" value={this.props.currentRecordView} onChange={this.props.viewSelect}>
          <option value="default">Default View</option>
          <option value="inside">Inside Sales View</option>
          <option value="appointment">Appointment View</option>
          <option value="proposal">Proposal View</option>
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
        return (
          <div className="rightButtons">
            <div className="inputBlock">
              <div className="selectBlock">
                {this.viewSelects}
              </div>
            </div>

            <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="moveDatabase">
              <img src={sortImg} alt="Export" />
            </div>

            <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="recordExport">
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

            <a className="btn softGrad--black" id="salesMetrics" onClick={this.props.controlsModalToggle}>Sales Data</a>

            <div className="navIcon whiteCard exportBtn" onClick={this.props.controlsModalToggle} id="exportList">
              <img src={exportImg} alt="Export" />
            </div>
          </div>
        );
      }
    }
  }
}


Navbar.propTypes ={
  recordView: propTypes.bool.isRequired,
  viewSelect: propTypes.func.isRequired,
  currentRecordView: propTypes.string.isRequired,
  jumpLetters: propTypes.func.isRequired,
  currentLetter: propTypes.string.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  citySet: propTypes.string.isRequired,
}
