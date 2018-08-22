import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';

import CustomerItem from './CustomerItem';
import FranchiseItem from './FranchiseItem';

export default class ModuleArea extends Component {
  constructor(props) {
    super();
    this.state = {
      error: false,
      errorMess: "",
      customersData: '',
      loaded: false,
      franchiseData: '',
    }
  }

  loadArea = () => {
    let citySet = this.props.citySet;
    let baseId;
    let franchId;

    if (this.props.citySet === 'tampa') {
      baseId = 'apps7GoAgK23yrOoY';
      franchId = 'appBsaVxz2OicG5Zw';
    } else if(this.props.citySet === 'orlando') {
      baseId = 'appBUKBn552B8SlbE';
      franchId = 'appLxxBrc9m3yNXdQ';
    }


    let finalURL = 'https://api.airtable.com/v0/' + baseId + '/' + 'Customers';
    let franchURL = 'https://api.airtable.com/v0/' + franchId + '/' + 'Franchisees';
    let pinpointType = '';
    let pinpointItem = '';

    if (this.props.zip) {
      pinpointType = 'Zip';
      pinpointItem = this.props.zip;
    } else if (this.props.city) {
      pinpointType = 'City';
      pinpointItem = this.props.city;
    } else if (this.props.county) {
      pinpointType = 'County';
      pinpointItem = this.props.county;
    }

    if (pinpointType === '') {
      this.setState({
        error: true,
        errorMess: "Please fill in location information to narrow results."
      })
    } else {
      finalURL = finalURL
      + '?filterByFormula=AND(FIND("' + pinpointItem + '"%2C+%7B' + pinpointType + '%7D)%2CAND(NOT(%7BStanding%7D+%3D+"Unhappy")%2CNOT(%7BStanding%7D+%3D+"Crew+Change")%2CNOT(%7BStanding%7D+%3D+"Canceled")))'
      + '&pageSize=50'
      + '&sort%5B0%5D%5Bfield%5D=Actual+Sq+Footage&sort%5B0%5D%5Bdirection%5D=desc'
      + '&fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Last+Call&fields%5B%5D=Last+Visit&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Start+Date';

      franchURL = franchURL
      + '?filterByFormula=FIND("' + pinpointItem + '"%2C+%7B' + pinpointType + '%7D)'
      + '&pageSize=50'
      + '&view=Active'
      + '&sort%5B0%5D%5Bfield%5D=Franchise+Level&sort%5B0%5D%5Bdirection%5D=desc'

      return axios.get(finalURL).then(response => {
          this.setState({
            customersData: response.data.records,
            error: false,
          });
          console.log(finalURL);

          return axios.get(franchURL).then(response => {
              this.setState({
                franchiseData: response.data.records,
                error: false,
                loaded: true,
              });
              console.log(finalURL);

              setTimeout(function(){
                var elem = document.querySelector('.ModuleList');
                var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
              }, 100);
            });
        });
    }
  }

  // Render
  // ----------------------------------------------------
  render() {

    if (this.state.error) {
      return (
        <div className="ModuleCard">
          <div className="inner">
            <p>{this.state.errorMess}</p>
            <div className="cardTag">
              <a className="btn softGrad--black" onClick={this.loadArea}>Load Area Info</a>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.loaded) {
      return (
        <div className="ModuleCard">
          <div className="inner">

            <p>Nearby Customers</p>
            <div className="scrollList">
              <table className="AreaCustomers">
                {this.state.customersData ? this.state.customersData.map((e, i) => this.customerItem(e, i)) : ''}
              </table>
            </div>

            <p>Nearby Franchisees</p>
            <div className="scrollList">
              <div className="AreaFranchises">
                {this.state.franchiseData ? this.state.franchiseData.map((e, i) => this.franchiseItem(e, i)) : ''}
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="ModuleCard">
        <div className="inner">
          <div className="cardTag">
            <a className="btn softGrad--black" onClick={this.loadArea}>Load Area Info</a>
          </div>
        </div>
      </div>
    );
  }
  customerItem(customersData, index) {
    return <CustomerItem
            key={customersData.id}
            id={customersData.id}
            customersData={customersData.fields}
            index={index}
            citySet = {this.props.citySet}
          />
  }
  franchiseItem(franchiseData, index) {
    return <FranchiseItem
            key={franchiseData.id}
            id={franchiseData.id}
            franchiseData={franchiseData.fields}
            index={index}
            citySet = {this.props.citySet}
          />
  }
}

ModuleArea.propTypes ={
  addr1: propTypes.string,
  addr2: propTypes.string,
  company: propTypes.string,
  city: propTypes.string,
  zip: propTypes.string,
  county: propTypes.string,
  emp: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
}
