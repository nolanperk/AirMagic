import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Map, InfoWindow, Marker, HeatMap, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import CustomerItem from './CustomerItem';
import ApiConfig from '../config'
import currLocation from '../assets/icons/location.png';

import exit from '../assets/icons/white/exit.png';

let triangleCoords;

export class MainMap extends Component {
  constructor(props) {
    super();
    this.state = {
      lat: '',
      lng: '',
      county: '',
      dataURL: 'https://api.airtable.com/v0/',
      customersLoc: [],
      zoomie: 14,
      mapHeight: '100%',
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
            delete axios.defaults.headers.common["Authorization"];
            return axios
              .get(geoCodeURL)
              .then(response => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
                this.setState({
                  lat: parseFloat(response.data.results[0].geometry.location.lat),
                  lng: parseFloat(response.data.results[0].geometry.location.lng),


                  initLat: parseFloat(response.data.results[0].geometry.location.lat),
                  initLng: parseFloat(response.data.results[0].geometry.location.lng),
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
                      delete axios.defaults.headers.common["Authorization"];
                      setTimeout(function(){

                        let preLatLng = [];
                        let lngLat;

                        let custCount = this.state.customersData.length - 1;
                        let totesIndex = 0;
                        let loadGeoCodes = setInterval(function() {
                          if (custCount === totesIndex) {
                            clearInterval(loadGeoCodes);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();

                            lngLat = [...new Set(preLatLng)];
                            console.log(lngLat);

                            this.setState({
                              customersLoc: lngLat,
                            });
                            if (window.innerWidth < 900) {
                              setTimeout(function(){
                                let mapNavHeight = parseFloat(document.getElementsByClassName('mapNav')[0].clientHeight);
                                let vpHeight = parseFloat(document.documentElement.clientHeight);
                                this.setState({
                                  mapHeight: vpHeight - mapNavHeight,
                                })
                              }.bind(this), 250);
                            }

                          } else {
                            totesIndex ++;
                            let curr = this.state.customersData[totesIndex].fields;
                            let currBase = this.state.customersData[totesIndex];
                            let allCustomers = this.state.customersData;
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
                            return axios
                              .get(geoCodeURL)
                              .then(response => {
                                let newMarker = {};
                                newMarker['coordinates'] = {}
                                newMarker.info = this.state.customersData[totesIndex].fields;
                                newMarker.info['id'] = this.state.customersData[totesIndex].id;
                                newMarker.coordinates['lat'] = response.data.results[0].geometry.location.lat;
                                newMarker.coordinates['lng'] = response.data.results[0].geometry.location.lng;
                                preLatLng.push(newMarker);
                              });
                          }
                        }.bind(this), 10);
                      }.bind(this), 0);
                  });
                }.bind(this), 0);
              });
          }.bind(this), 0);
        })
    }.bind(this), 0);
  }

  onMarkerClick = (props, marker, e) => {
    let allMarkers = document.getElementsByClassName('markerRow');
    for (var index in allMarkers) {
      if (allMarkers[index].className) {
        allMarkers[index].className="markerRow";
      }
    }
    let propedId = 'row-' + props.data.id;
    let elmnt = document.getElementById(propedId);
    elmnt.className='markerRow active';
    elmnt.scrollIntoView();
    this.setState({
      selectedPlace: props.data['Company Name'],
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  markerClicked = (e, key, pos) => {
    this.setState({
      showingInfoWindow: false,
      lat: pos.lat,
      lng: pos.lng,
    });
  }
  componentDidMount() {
    this.googleApiStuff();
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    let backURL = '/';

    let activeMarkerId;

    if (this.state.activeMarker) {
      activeMarkerId = this.state.activeMarker.id;
    } else {
      activeMarkerId = '';
    }

    if (this.props.citySet === 'tampa') {
      backURL += 'tampa/';
    } else if(this.props.citySet === 'orlando') {
      backURL += 'orlando/';
    }
    backURL += 'sales/' + this.props.recordId;
    return (
      <div className="wrapper">

        <div className='Navbar mapNav'>
          <div className="innerTop">
            <Link to={backURL}>
              <div className="navIcon softGrad--primary" onClick={this.props.closeRecordHandler}>
                <img src={exit} alt="exit" />
              </div>
            </Link>
            <h4>
              {this.state.currentRecord ? this.state.currentRecord['Company Name'] : ''}
            </h4>
          </div>

          <div className="customersList">
            <table className='AreaCustomers'>
              {this.state.customersLoc ? this.state.customersLoc.map((marker, index)=> {
                return (
                  <CustomerItem
                    position={marker.coordinates}
                    customersData={marker.info}
                    markerClicked={this.markerClicked}
                    id={'row-' + marker.info.id}
                    key={index}
                    citySet={this.props.citySet}
                  />
                )
              }) : ''}
            </table>
          </div>
        </div>
        <div className="mapSide">
          <Map
            google={this.props.google}
            style={{width: '100%', height: this.state.mapHeight, position: 'relative'}}
            center={{
              lat: this.state.lat,
              lng: this.state.lng - 0.015
            }}
            zoom={this.state.zoomie}
          >
            {this.state.customersLoc ? this.state.customersLoc.map((marker, index)=> {
              return (
                <Marker
                  position={marker.coordinates}
                  data={marker.info}
                  onClick={this.onMarkerClick}
                  id={marker.info.id}
                  key={index}
                />
              )
            }) : ''}
            <Marker
              position={{
                lat: this.state.initLat,
                lng: this.state.initLng
              }}
              icon={{
                url: currLocation,
                anchor: new this.props.google.maps.Point(17,17),
                scaledSize: new this.props.google.maps.Size(35,35)
              }}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <p>
                    <a target="_blank" href={'/' + this.props.citySet + '/customer-service/' + activeMarkerId.replace('row-', '')}>{this.state.selectedPlace}</a>
                  </p>
                </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw')
})(MainMap)
