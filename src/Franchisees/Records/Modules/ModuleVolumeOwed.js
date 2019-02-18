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
    const { volOwed, arDue, rpDue, aaCharge } = this.props;


    return (
      <div className="ModuleCard">
        <div className="inner">
          <h4>Owed & Charged</h4>
          <a className="btn softGrad--black" onClick={this.props.updateOwed}>Refresh</a>
          <div className="inputBlock inputBlock--half">
            <label>Still Owed</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={volOwed}
                id="volOwed"
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
