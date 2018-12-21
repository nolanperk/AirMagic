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
    let emp = this.props.emp;
    let company = this.props.company;

    let validateAddress;
    if (company && addr1) {
      let totalAddress = company.replace(/ /g, '+') + '+' + addr1;
      if (addr2) {totalAddress = totalAddress + addr2;}
      if (city) {totalAddress = totalAddress + ', ' + city + ', Florida';} else {totalAddress = totalAddress + ', Florida';}
      if (zip) {totalAddress = totalAddress + ', ' + zip;}
      validateAddress = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(totalAddress);
    }


    return (
      <div className="ModuleCard moduleLocation">
        <div className="inner">

          <div className="inputBlock inputBlock--large">
            <label>Address 1</label>
            <input
              type="text"
              value={addr1}
              id="addr1"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--small">
            <label>Address 2</label>
            <input
              type="text"
              value={addr2}
              id="addr2"
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
            <label>Employees</label>
            <input
              type="text"
              value={emp}
              id="emp"
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
  addr2: propTypes.string,
  company: propTypes.string,
  city: propTypes.string,
  zip: propTypes.string,
  county: propTypes.string,
  emp: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
