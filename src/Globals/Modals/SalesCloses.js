import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import exit from '../../assets/icons/white/exit.png';
import loader from '../../assets/loader.gif';
import ApiConfig from '../../config'
import YelpAPI from '../../yelp'

export default class SalesCloses extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      newAccountsOffset: '',
      newAccountsData: [],
      dataURL: 'https://api.airtable.com/v0/',
    }
  }



  monthlySalesData = () => {
    let downloadThis = function() {
      console.log('downloadThis()');
      console.log(this.state.newAccountsData);

      let testItem = this.state.newAccountsData[0].fields;
      console.log(testItem);
      let company = testItem['Company Name'];
      let addr1 = testItem['Address 1'];
      let addr2 = testItem['Address 2'];
      let city = testItem['City'];
      let zip = testItem['Zip'];

      let validateAddress;
      if (company && addr1) {
        let totalAddress = addr1;
        if (addr2) {totalAddress = totalAddress + addr2;}
        if (city) {totalAddress = totalAddress + ', ' + city + ', Florida';} else {totalAddress = totalAddress + ', Florida';}
        if (zip) {totalAddress = totalAddress + ', ' + zip;}
        validateAddress = 'location=' + encodeURI(totalAddress);
      }

      let yelpURL = 'https://api.yelp.com/v3/businesses/search' + '?' + validateAddress + '&term=' + company;
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + YelpAPI();

      const proxyurl = 'http://airmagic.co/';
      return axios
        .get(proxyurl + yelpURL).then(response => {

          //reseting Airtable as the header
          delete axios.defaults.headers.common["Authorization"];
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();

          this.setState({
            yelpReturn: response,
          });
          console.log(response);
      });
    }.bind(this)




    let customerBase;
    if (this.props.citySet === 'tampa') {
      customerBase = 'apps7GoAgK23yrOoY';
    } else if (this.props.citySet === 'orlando') {
      customerBase = 'appBUKBn552B8SlbE';
    }
    let downloadNow = 0;


    let finalURL;
    let exportFields = '&fields%5B%5D=Company+Name&fields%5B%5D=City&fields%5B%5D=Address+1&fields%5B%5D=Address+2&fields%5B%5D=Zip&fields%5B%5D=Office+Phone&fields%5B%5D=Cell+Phone&fields%5B%5D=Notes&fields%5B%5D=Monthly+Amount&fields%5B%5D=Sq.+Footage';

    let matchingNewAccounts = setInterval(function() {
      console.log('matchingNewAccounts()');
      let preData = this.state.newAccountsData;
      finalURL = this.state.dataURL + customerBase + '/Customers?view=New+Accounts';
      finalURL = finalURL + exportFields;
      if (this.state.newAccountsOffset !== '') {finalURL = finalURL + '&offset=' + this.state.newAccountsOffset}



      console.log(finalURL);
      return axios
        .get(finalURL).then(response => {
          this.setState({
            newAccountsData: preData.concat(response.data.records),
            newAccountsOffset: response.data.offset,
          });
        if (!response.data.offset) {
          downloadNow ++;
          if (downloadNow === 1) {
            clearInterval(matchingNewAccounts);
            console.log('clearing matchingNewAccounts()');
            downloadThis();
          }
        }
        downloadThis();
      });
    }.bind(this), 1000);
  }

  componentDidMount() {
    this.monthlySalesData();
  }


  // Render
  // ----------------------------------------------------
  render() {
    if (this.state.loading) {
      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>New Accounts</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
            </div>
          </div>
        </div>
      )
    } else {

      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>New Accounts</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="repList">

          </div>
        </div>

      );
    }
  }
}


SalesCloses.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  citySet: propTypes.string.isRequired,
}
