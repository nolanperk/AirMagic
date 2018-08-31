import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import Navbar from '../Sales/Navbar';
import ApiConfig from '../config'


export class MainMap extends Component {
  constructor(props) {
    super();
    this.state = {
      lat: '',
      lng: '',
      county: '',
      dataURL: 'https://api.airtable.com/v0/',
    }
  }


  googleApiStuff = () => {
    if (this.props.citySet === 'tampa') {
      this.setState({
        baseId: 'appEX8GXgcD2ln4dB',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        baseId: 'appXNufXR9nQARjgs',
      });
    }
    setTimeout(function(){
      let finalURL = this.state.dataURL + this.state.baseId + '/Sales/' + this.props.recordId;
      return axios
        .get(finalURL)
        .then(response => {
          console.log(response);
          this.setState({
            currentRecord: response.data.fields
          });

          setTimeout(function(){
            let curr = this.state.currentRecord;
            if (addr1) {addr1 = '';}
            if (addr2) {addr2 = ''}
            if (city) {city = '';}
            if (zip) {zip = '';}
            if (streetAddress) {streetAddress = '';}
            if (geoCodeURL) {geoCodeURL = '';}

            let addr1;
            let addr2
            let city;
            let zip;
            let streetAddress;

            if (curr['Address 1']) {addr1 = curr['Address 1']}
            if (curr['City']) {city = curr['City']}
            if (curr['City']) {zip = curr['City']}

            if (addr1) {
              streetAddress = addr1;
              if (city) {streetAddress = streetAddress + ' ' + city + ' Florida';} else {streetAddress = streetAddress + ' Florida';}
              if (zip) {streetAddress = streetAddress + ' ' + zip;}
            }


            let geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(streetAddress) + '&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'
            console.log(geoCodeURL);
            delete axios.defaults.headers.common["Authorization"];
            return axios
              .get(geoCodeURL)
              .then(response => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
                this.setState({
                  lat: parseFloat(response.data.results[0].geometry.location.lat),
                  lng: parseFloat(response.data.results[0].geometry.location.lng),
                });



                setTimeout(function(){
                  let pinpointType = 'City';
                  let pinpointItem = city;
                  let baseId;
                  let franchId;

                  if (this.props.citySet === 'tampa') {
                    baseId = 'apps7GoAgK23yrOoY';
                    franchId = 'appBsaVxz2OicG5Zw';
                  } else if(this.props.citySet === 'orlando') {
                    baseId = 'appBUKBn552B8SlbE';
                    franchId = 'appLxxBrc9m3yNXdQ';
                  }
                  finalURL = 'https://api.airtable.com/v0/' + baseId + '/' + 'Customers';
                  let franchURL = 'https://api.airtable.com/v0/' + franchId + '/' + 'Franchisees';

                  finalURL = finalURL
                  + '?filterByFormula=AND(FIND("' + pinpointItem + '"%2C+%7B' + pinpointType + '%7D)%2CAND(NOT(%7BStanding%7D+%3D+"Unhappy")%2CNOT(%7BStanding%7D+%3D+"Crew+Change")%2CNOT(%7BStanding%7D+%3D+"Canceled")))'
                  + '&pageSize=50'
                  + '&sort%5B0%5D%5Bfield%5D=Actual+Sq+Footage&sort%5B0%5D%5Bdirection%5D=desc'
                  + '&fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Last+Call&fields%5B%5D=Last+Visit&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Start+Date&fields%5B%5D=Address+1&fields%5B%5D=Address+2&fields%5B%5D=City&fields%5B%5D=Zip';

                  // franchURL = franchURL
                  // + '?filterByFormula=FIND("' + pinpointItem + '"%2C+%7B' + pinpointType + '%7D)'
                  // + '&pageSize=50'
                  // + '&view=Active'
                  // + '&sort%5B0%5D%5Bfield%5D=Franchise+Level&sort%5B0%5D%5Bdirection%5D=desc'

                  return axios.get(finalURL).then(response => {
                      this.setState({
                        customersData: response.data.records,
                      });
                      console.log(finalURL);

                      // return axios.get(franchURL).then(response => {
                      //   this.setState({
                      //     franchiseData: response.data.records,
                      //     loaded: true,
                      //   });
                      // });
                  });
                }.bind(this), 0);
              });
          }.bind(this), 0);
        })
    }.bind(this), 0);
  }
  componentDidMount() {
    this.googleApiStuff();
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;


    return (
      <div className="wrapper">

        <Navbar
          currentRecord={this.state.currentRecord}
          recordView={this.state.recordView}
          closeRecordHandler={this.closeRecordHandler}
          currentId= {this.state.currentId}
          recordChanges= {this.state.recordChanges}
          switchTableHandler= {this.switchTableHandler}
          controlsModalToggle={this.controlsModalToggle}
          jumpLetters={this.jumpLetters}
          citySet={this.props.citySet}
          currentRecordView={this.state.currentRecordView}
          viewSelect={this.viewSelect}
        />
        <div className="mapSide">
          <Map
            google={this.props.google}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            zoom={14}
          >
          </Map>
        </div>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw')
})(MainMap)
