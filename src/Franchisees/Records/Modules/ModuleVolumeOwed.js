import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import loader from '../../../assets/loader.gif';
import dollarImg from '../../../assets/icons/black/dollar.png';
import VolumeItem from './VolumeItem';
import exit from '../../../assets/icons/white/exit.png';

export default class ModuleVolumeOwed extends Component {

  componentDidMount() {
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { ipDue, arDue, rpDue, aaCharge } = this.props;


    return (
      <div className="ModuleCard">
        <div className="inner">
          <h4>Owed & Charged</h4>
          <a className="btn softGrad--black" onClick={this.props.updateOwed}>Refresh</a>
          <div className="inputBlock inputBlock--half">
            <label>IP Due</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={ipDue}
                id="ipDue"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>AR Due</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={arDue}
                id="arDue"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>RP Due</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={rpDue}
                id="rpDue"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Chargeable</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={aaCharge}
                id="aaCharge"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
