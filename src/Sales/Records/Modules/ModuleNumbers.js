import React, { Component } from 'react';
import propTypes from 'prop-types';


import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import dollarImg from '../../../assets/icons/black/dollar.png';

export default class ModuleNumbers extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="ModuleCard">
        {this.SalesNumber}
      </div>
    );
  }

  get SalesNumber() {
    let amount = this.props.amount;
    let sqFt = this.props.sqFt;
    let sqFtReal = this.props.sqFtReal;
    let restrooms = this.props.restrooms;
    let ceramic = this.props.ceramic;
    let marble = this.props.marble;
    let vct = this.props.vct;
    let wood = this.props.wood;
    let woodLam = this.props.woodLam;
    let carpet = this.props.carpet;
    let other = this.props.other;
    if (this.props.currentRecordView === 'appointment') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Actual Sq. Ft.</label>
            <input
              type="text"
              value={sqFtReal}
              id="sqFtReal"
              onChange={this.props.changeRecordHandler}
            />
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Restrooms</label>
            <input
              type="text"
              value={restrooms}
              id="restrooms"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Ceramic</label>
            <input
              type="text"
              value={ceramic}
              id="ceramic"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Marble</label>
            <input
              type="text"
              value={marble}
              id="marble"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>VCT</label>
            <input
              type="text"
              value={vct}
              id="vct"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Wood</label>
            <input
              type="text"
              value={wood}
              id="wood"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Lam.</label>
            <input
              type="text"
              value={woodLam}
              id="woodLam"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Carpet</label>
            <input
              type="text"
              value={carpet}
              id="carpet"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Other</label>
            <input
              type="text"
              value={other}
              id="other"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart"></div>
        </div>
      );
    } else if (this.props.currentRecordView === 'inside') {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--half">
            <label>Sq. Footage</label>
            <input
              type="text"
              value={sqFt}
              id="sqFt"
              onChange={this.props.changeRecordHandler}
            />
          </div>


          <div className="inputBlock inputBlock--half">
            <label>Restrooms</label>
            <input
              type="text"
              value={restrooms}
              id="restrooms"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Ceramic</label>
            <input
              type="text"
              value={ceramic}
              id="ceramic"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Marble</label>
            <input
              type="text"
              value={marble}
              id="marble"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>VCT</label>
            <input
              type="text"
              value={vct}
              id="vct"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Wood</label>
            <input
              type="text"
              value={wood}
              id="wood"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Lam.</label>
            <input
              type="text"
              value={woodLam}
              id="woodLam"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Carpet</label>
            <input
              type="text"
              value={carpet}
              id="carpet"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Other</label>
            <input
              type="text"
              value={other}
              id="other"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="inner">
          <div className="inputBlock inputBlock--full">
            <label>Monthly Amount</label>
            <div className="inputWithTag">
              <div className="inputTag">
                <img src={dollarImg} alt="" />
              </div>
              <input
                type="text"
                value={amount}
                id="amount"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Sq. Footage</label>
            <input
              type="text"
              value={sqFt}
              id="sqFt"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Actual Sq. Ft.</label>
            <input
              type="text"
              value={sqFtReal}
              id="sqFtReal"
              onChange={this.props.changeRecordHandler}
            />
          </div>


          <div className="inputBlock inputBlock--quart">
            <label>Restrooms</label>
            <input
              type="text"
              value={restrooms}
              id="restrooms"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Ceramic</label>
            <input
              type="text"
              value={ceramic}
              id="ceramic"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Marble</label>
            <input
              type="text"
              value={marble}
              id="marble"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>VCT</label>
            <input
              type="text"
              value={vct}
              id="vct"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Wood</label>
            <input
              type="text"
              value={wood}
              id="wood"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Lam.</label>
            <input
              type="text"
              value={woodLam}
              id="woodLam"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Carpet</label>
            <input
              type="text"
              value={carpet}
              id="carpet"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Other</label>
            <input
              type="text"
              value={other}
              id="other"
              onChange={this.props.changeRecordHandler}
            />
          </div>
        </div>
      );
    }
  }
}

ModuleNumbers.propTypes ={
  amount: propTypes.string,
  sqFt: propTypes.string,
  sqFtReal: propTypes.string,
  restrooms: propTypes.string,
  ceramic: propTypes.string,
  marble: propTypes.string,
  vct: propTypes.string,
  wood: propTypes.string,
  woodLam: propTypes.string,
  carpet: propTypes.string,
  other: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
