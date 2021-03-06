import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleLocation extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let addr1 = this.props.addr1;
    let addr2 = this.props.addr2;
    let city = this.props.city;
    let zip = this.props.zip;
    let county = this.props.county;
    let state = this.props.state;
    let company = this.props.company;

    let validateAddress;
    if (addr1) {
      let totalAddress = addr1;
      if (city) {totalAddress = totalAddress + ', ' + city + ', ' + state;} else {totalAddress = totalAddress + ', ' + state;}
      if (zip) {totalAddress = totalAddress + ', ' + zip;}
      validateAddress = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(totalAddress);
    }


    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--large">
            <label>Address</label>
            <input
              type="text"
              value={addr1}
              id="addr1"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>City</label>
            <input
              type="text"
              value={city}
              id="city"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Zip</label>
            <input
              type="text"
              value={zip}
              id="zip"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--half">
            <label>County</label>
            <input
              type="text"
              value={county}
              id="county"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>State</label>
            <input
              type="text"
              value={state}
              id="state"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="cardTag">
            <a className="btn softGrad--secondary" href={validateAddress} target="_blank">View on Map</a>
          </div>
        </div>
      </div>
    );
  }
}

ModuleLocation.propTypes ={
  addr1: propTypes.string,
  company: propTypes.string,
  city: propTypes.string,
  zip: propTypes.string,
  county: propTypes.string,
  state: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
