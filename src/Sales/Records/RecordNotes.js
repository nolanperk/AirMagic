import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

import ApiConfig from '../../config'


import account from '../../assets/icons/primary/account.png';
import edit from '../../assets/icons/white/edit.png';


export class RecordNotes extends Component {
  constructor(props) {
    super();
    this.state = {
      streetViewSrc: '',
      lat: '',
      lng: '',
    }
  }

  componentDidMount() {
    setTimeout((function() {

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

      if (this.props.addr1) {addr1 = this.props.addr1}
      if (this.props.addr2) {addr2 = this.props.addr2}
      if (this.props.city) {city = this.props.city}
      if (this.props.zip) {zip = this.props.zip}

      if (addr1) {
        streetAddress = addr1;
        if (addr2) {streetAddress = streetAddress + addr2;}
        if (city) {streetAddress = streetAddress + ', ' + city + ' Florida';} else {streetAddress = streetAddress + ' Florida';}
        if (zip) {streetAddress = streetAddress + ', ' + zip;}
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

          console.log(this.state.lat);
        })
        .catch(error => {
          console.error("error: ", error);
        });


    }).bind(this), 1000);
  }


  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;
    let notes;

    if (this.props.notes) {
      notes = this.props.notes;
    } else {
      notes = '';
    }
    const streetViewPanoramaOptions = {
			position: {lat: this.state.lat, lng: this.state.lng},
			pov: {heading: 50, pitch: 0},
			zoom: 0
		};
    const mapsApi = 'AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw';

    return (
      <div class="RightPanel">
        <div id="streetWindow">
          <Map
            google={this.props.google}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            zoom={18}
          >
            <Marker
              position={{
                lat: this.state.lat,
                lng: this.state.lng
              }}
              name={'Current location'} />
          </Map>

          {/* <img src={this.state.streetViewSrc} alt="Street View" id="finalImg" /> */}
          {/* <div id="map"></div>
          <div id="pano"></div> */}
        </div>
        <div className="RecordNotes">
          <div className="addNotesBox">
            <div className="navIcon softGrad--primary" id="addNotes" onClick={this.props.controlsModalToggle}>
              <img src={edit} alt="edit" />
            </div>
          </div>
          <div className="NotesNav">
            <h4>Notes</h4>
          </div>

          <textarea
            className="NotesList"
            id="notes"
            value={notes}
            onChange={this.props.changeNotesHandler}>
            {notes}
          </textarea>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw')
})(RecordNotes)

RecordNotes.propTypes ={
  notes: propTypes.string,
  changeNotesHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  addr1: propTypes.string,
  addr2: propTypes.string,
  city: propTypes.string,
  zip: propTypes.string,
}
