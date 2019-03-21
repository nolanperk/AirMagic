import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Link } from 'react-router-dom';
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
      county: '',
      appraiserSearch: 'http://gis.hcpafl.org/propertysearch/#/nav/Basic%20Search',
    }
  }

  panelSwitch = e => {
    let targetTab = e.target.closest('p');
    let clickedTab = targetTab.id;

    if (targetTab.className !== 'isActive') {
      if (clickedTab === 'notesTrigger') {
        document.getElementById('mapTrigger').className = '';
        document.getElementById('notesTrigger').className = 'isActive';

        document.getElementById('streetWindow').className = '';
        document.getElementById('notesWindow').className = 'RecordNotes isActive';
      }
      if (clickedTab === 'mapTrigger') {
        document.getElementById('notesTrigger').className = '';
        document.getElementById('mapTrigger').className = 'isActive';
        this.googleApiStuff();

        document.getElementById('streetWindow').className = 'isActive';
        document.getElementById('notesWindow').className = 'RecordNotes';
      }
    }
  }

  googleApiStuff = () => {
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
      if (this.props.city) {city = this.props.city}
      if (this.props.zip) {zip = this.props.zip}

      if (addr1) {
        streetAddress = addr1;
        if (city) {streetAddress = streetAddress + ' ' + city + ' Florida';} else {streetAddress = streetAddress + ' Florida';}
        if (zip) {streetAddress = streetAddress + ' ' + zip;}
      }

      let svWidth = document.getElementById('streetWindow').offsetWidth;
      let svHeight = document.getElementById('streetWindow').offsetHeight;


      let streetViewSrc = 'https://maps.googleapis.com/maps/api/streetview?size=' + Math.ceil(svWidth * .5) + 'x' + svHeight + '&location=' + streetAddress.replace(/ /g, '+') + '&fov=75&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'

      let geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(streetAddress) + '&key=AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw'
      console.log(geoCodeURL);
      delete axios.defaults.headers.common["Authorization"];
      return axios
        .get(geoCodeURL)
        .then(response => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();

          for (var index in response.data.results[0].address_components) {
            if (response.data.results[0].address_components[index].long_name.split(" ").slice(-1)[0] === 'County') {

              this.setState({
                county: response.data.results[0].address_components[index].long_name.split(' ')[0],
              });
            }
          }
          // console.log(.long_name.split(' ')[0]);
          this.setState({
            // county: response.data.results[0].address_components[3].long_name.split(' ')[0],
            lat: parseFloat(response.data.results[0].geometry.location.lat),
            lng: parseFloat(response.data.results[0].geometry.location.lng),
            streetViewSrc: streetViewSrc,
          });

          console.log(this.state.lat);

          setTimeout((function() {
            console.log(this.state.county);
            if (this.state.county === 'Hillsborough') {
              document.getElementById('appraiserBtn').className = 'btn softGrad--secondary';
              this.setState({
                appraiserSearch: 'http://gis.hcpafl.org/propertysearch/#/search/basic/address=' + encodeURI(this.props.addr1).replace(/\./g,""),
              });
            } else if (this.state.county === 'Polk') {
              document.getElementById('appraiserBtn').className = 'btn softGrad--secondary';
              this.setState({
                appraiserSearch: 'http://www.polkpa.org/CamaDisplay.aspx?OutputMode=Input&searchType=RealEstate&page=FindByAddress'
              });
            } else if (this.state.county === 'Pasco') {
              document.getElementById('appraiserBtn').className = 'btn softGrad--secondary';
              let totalAddr = this.props.addr1.split(' ');
              let addrNumber = totalAddr[0];
              let restAddr = totalAddr.shift();
              this.setState({
                appraiserSearch: 'http://search.pascopa.com/default.aspx?pid=add&key=H%60K&add1=' + addrNumber + '&add2=' + restAddr.replace(/\./g,"") + '&add=Submit',
              })
            } else if (this.state.county === 'Pinellas') {
              document.getElementById('appraiserBtn').className = 'btn softGrad--secondary';
              this.setState({
                appraiserSearch: 'https://www.pcpao.org/query_address.php?Addr2=' + encodeURI(this.props.addr1).replace(/\./g,"") + '&nR=25'
              });
            } else if (this.state.county === 'Hernando') {
              document.getElementById('appraiserBtn').className = 'btn softGrad--secondary';
              this.setState({
                appraiserSearch: 'https://www.hernandocountygis-fl.us/propertysearch/'
              });
            }
          }).bind(this), 50);
        })
        .catch(error => {
          console.error("error: ", error);
        });

    }).bind(this), 1000);
  }

  componentDidMount() {
    if (window.innerWidth >= 767) {
      this.googleApiStuff();
    }
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

    let noteCountClass = '';
    if (parseInt(this.props.noteCharacters) > 90000 && parseInt(this.props.noteCharacters) < 98000) {
      noteCountClass = 'warning';
    } else if (parseInt(this.props.noteCharacters) >= 98000) {
      noteCountClass = 'broken';
    }

    return (
      <div className="RightPanel">
        <div id="mobileSegment">
          <p id="notesTrigger" onClick={this.panelSwitch} className="isActive"><span>Notes</span></p>
          <p id="mapTrigger" onClick={this.panelSwitch}><span>Map</span></p>
        </div>
        <div id="streetWindow">
          <img src={this.state.streetViewSrc} alt=" " id="finalImg" />
          {/* <Link to={this.props.pathName + '/maps'}> */}
            <div className="mapSide">
              <Map
                google={this.props.google}
                center={{
                  lat: this.state.lat,
                  lng: this.state.lng
                }}
                zoom={19}
              >
                <Marker
                  position={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  name={'Current location'} />
              </Map>
            </div>
          {/* </Link> */}
        </div>

        <a className="btn softGrad--secondary hideThis" id="appraiserBtn" href={this.state.appraiserSearch} target="_blank">Property Appraiser</a>

        <div className="RecordNotes isActive" id="notesWindow">
          <div className="addNotesBox">
            <div className="navIcon softGrad--primary" id="addNotes" onClick={this.props.controlsModalToggle}>
              <img src={edit} alt="edit" />
            </div>
          </div>
          <div className="NotesNav">
            <h4>Notes <span id="noteCharCount" className={noteCountClass}>{this.props.noteCharacters}</span></h4>
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
