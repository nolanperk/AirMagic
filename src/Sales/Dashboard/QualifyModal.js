import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-day-picker/lib/style.css';
import ApiConfig from '../../config'
import {Map, InfoWindow, Listing, Marker, HeatMap, GoogleApiWrapper} from 'google-maps-react';

import mapLink from '../../assets/icons/white/location.png';
import exit from '../../assets/icons/white/exit.png';
import popout from '../../assets/icons/popout.png';
import phoneImg from '../../assets/icons/white/phone.png';
import dollarImg from '../../assets/icons/black/dollar.png';
import calendarImg from '../../assets/icons/black/calendar.png';
import phoneBl from '../../assets/icons/black/phone.png';
import numberImg from '../../assets/icons/black/number.png';
import emailImg from '../../assets/icons/black/email.png';
import backBtn from '../../assets/icons/black/arrow_back.png';
import loader from '../../assets/loader.gif';


import CallModalData from './CallModalData';
import CallModalIntro from './CallModalIntro';

export class QualifyModal extends Component {
  constructor(props) {
    super();
    this.state = {
      viewType: 'intro',
      logData: {},
      goodLuck: '',
      notepad: '',
    }
  }



  qualifyLeadMap = (mapProps, map) => {
    let fields = this.props.openedCall.fields;
    console.log(mapProps);
    console.log(map);
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    let geoCodeURL


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

    if (fields['Address 1']) {addr1 = fields['Address 1']}
    if (fields['City']) {city = fields['City']}
    if (fields['Zip']) {zip = fields['Zip']}

    if (addr1) {
      streetAddress = addr1;
      if (city) {streetAddress = streetAddress + ' ' + city + ' Florida';} else {streetAddress = streetAddress + ' Florida';}
      if (zip) {streetAddress = streetAddress + ' ' + zip;}
    }


    setTimeout(function(){
      if (streetAddress) {
        var request = {
          query: fields['Company Name'] + ' ' + streetAddress,
          fields: ['place_id']
        };
      } else {
        var request = {
          query: fields['Company Name'] + ' Florida',
          fields: ['place_id']
        };
      }

      //get place id
      service.findPlaceFromQuery(request, function(results, status) {
        console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let placeArr = [];
          for (var i in results) {
            var request = {
              placeId: results[i].place_id,
              fields: ['name', 'formatted_phone_number', 'formatted_address', 'address_components', 'geometry', 'permanently_closed']
            };

            //get place details
            service.getDetails(request, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                let addrComponents = results.formatted_address.split(', FL').join().split('USA').join().split(', ').slice(0, -1);
                let zip = addrComponents.pop();
                let city = addrComponents.pop();
                let quickAdd = addrComponents.shift();
                let addr2 = '';
                if (addrComponents.length > 0) {
                  addr2 = addrComponents[0];
                }
                let addressComponents = {
                  quickAdd: quickAdd,
                  addr2: addr2,
                  city: city,
                  zip: zip,
                };

                let finalPush = {
                  addressComponents: addressComponents,
                  name: results.name,
                  phone: results.formatted_phone_number,
                  opened: results.permanently_closed,
                }

                placeArr.push(finalPush);
              };
            }.bind(this));
          }
          setTimeout(function(){
            console.log(placeArr);
            setTimeout(function(){
              this.setState({
                places: placeArr
              })
            }.bind(this), 100);
          }.bind(this), 100);
        }
      }.bind(this));
    }.bind(this), 250);

    if (streetAddress) {
      delete axios.defaults.headers.common["Authorization"];
      let streetViewSrc = 'https://maps.googleapis.com/maps/api/streetview?size=400x300&location=' + streetAddress.replace(/ /g, '+') + '&fov=75&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'
      geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(streetAddress) + '&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'
      console.log(geoCodeURL);
      return axios
        .get(geoCodeURL)
        .then(response => {
          this.setState({
            lat: parseFloat(response.data.results[0].geometry.location.lat),
            lng: parseFloat(response.data.results[0].geometry.location.lng),
            streetViewSrc: streetViewSrc,
          });
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();
        })
        .catch(error => {
          console.error("error: ", error);
        });
    }
  }
  // Render
  // ----------------------------------------------------
  render() {
    let fields = this.props.openedCall.fields;

    let totalAddress = fields['Company Name'].replace(/ /g, '+') + '+Florida';
    if (fields['Address 1']) {
      totalAddress = fields['Company Name'].replace(/ /g, '+') + '+' + fields['Address 1'];
      if (fields['Address 2']) {totalAddress = totalAddress + fields['Address 2'];}
      if (fields['City']) {totalAddress = totalAddress + ', ' + fields['City'] + ', Florida';} else {totalAddress = totalAddress + ', Florida';}
      if (fields['Zip']) {totalAddress = totalAddress + ', ' + fields['Zip'];}
    }
    let validateAddress = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(totalAddress);

    let logNotes = '';
    if (fields['Notes']) {
      logNotes = fields['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    let mapContainer = 'inputBlock inputBlock--full mapArea';
    if (this.state.places) {
      mapContainer += ' isActive'
    }

    return (
      <div className="callModal">
        <div className="modalBox">
          <div className="modalNav">
            <div className="titleArea">
              <h4>Googling for <em>{fields['Company Name']}</em></h4>
              <p className={"callType " + fields['Status']}>{fields['Status']}</p>
              <p>{fields['City']}</p>
            </div>

            <div className="icons">
              <a target="_blank" href={validateAddress}>
                <div className="navIcon softGrad--blue">
                  <img src={mapLink} alt="exit" />
                </div>
              </a>

              <Link target="_blank" to={'/' + this.props.citySet + '/sales/' + this.props.openedCall.id + '/'}>
                <div className="navIcon whiteCard">
                  <img src={popout} alt="exit" />
                </div>
              </Link>

              <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                <img src={exit} alt="exit" />
              </div>
            </div>
          </div>



          <div className="callBoxWrapper">
            <div className="callColumn contact compareIt">
              <div className="innerWrapper">
                <div className="comparison">
                  <div className="Compare">
                    {this.state.places ? this.state.places.map((data, index)=> {
                      return (
                        <div className="innerCompare">
                          <div class="google">
                            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
                            <div className={data.opened ? "googleInner closed" : "googleInner"}>
                              <h3>{data.name}</h3>

                              <hr/>

                              <div className="addArea">
                                <div className="addBlock">
                                  <p><span>Address 1</span></p>
                                  <h4>{data.addressComponents.quickAdd}</h4>
                                </div>

                                <div className={data.addressComponents.addr2.length > 0 ? "addBlock" : 'addBlock none' }>
                                  {data.addressComponents.addr2.length > 0 ? <p><span>Address 2</span></p> : ''}
                                  {data.addressComponents.addr2.length > 0 ? <h4>{data.addressComponents.addr2}</h4> : ''}
                                </div>


                                <div className="addBlock">
                                  <p><span>City</span></p>
                                  <h4>{data.addressComponents.city}</h4>
                                </div>

                                <div className="addBlock">
                                  <p><span>Zip</span></p>
                                  <h4>{data.addressComponents.zip}</h4>
                                </div>
                              </div>

                              <hr/>
                              <p><span>Phone Number</span></p>
                              <h4>{data.phone}</h4>
                            </div>
                          </div>

                          <button onClick={()=>this.props.mergeGoogle(data)} key={index} data={data} className="btn softGrad--primary update">Update from Google</button>
                        </div>
                      );
                    }) : <img src={loader} className="loading" alt="" />}
                  </div>
                </div>

                <div className={mapContainer}>

                  <div className='qualifyMap'>
                    <Map
                      google={this.props.google}
                      onReady={this.qualifyLeadMap}
                      center={{
                        lat: this.state.lat,
                        lng: this.state.lng
                      }}
                      zoom={19}>
                      <Marker
                        position={{
                          lat: this.state.lat,
                          lng: this.state.lng
                        }}
                        name={fields['Company Name']} />
                    </Map>
                  </div>

                  <div className="qualifyReference">
                    <p>3,000sqft</p>
                    <div className="reference-3"></div>


                    <p>10,000sqft</p>
                    <div className="reference-10"></div>
                  </div>
                </div>
              </div>

              <button onClick={this.props.callFromQualify} className="btn softGrad--black nextBtn">Call Now</button>
            </div>

            <CallModalData
              openedCall = {this.props.openedCall}
              closeModal = {this.props.closeModal}
              citySet = {this.props.itemRegion}
              changeRecordHandler = {this.props.changeRecordHandler}
              selectChange = {this.props.selectChange}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
            />

            <div className="callColumn notes">
              <div className="title">
                <h4>Notes</h4>
              </div>

              <div id="logNotes"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw')
})(QualifyModal)
