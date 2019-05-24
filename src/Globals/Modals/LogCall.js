import React, { Component } from 'react';
import propTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import axios from 'axios';
import 'react-day-picker/lib/style.css';
import LogCallAccounts from '../Modals/LogCallAccounts';
import ApiConfig from '../../config'
import {Map, InfoWindow, Listing, Marker, HeatMap, GoogleApiWrapper} from 'google-maps-react';

import calendarImg from '../../assets/icons/black/calendar.png';
import loader from '../../assets/loader.gif';
import exit from '../../assets/icons/white/exit.png';
import dollarImg from '../../assets/icons/black/dollar.png';

export class LogCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'qualifyLead',
      logData: {},
      goodLuck: '',
      notepad: '',
    }
  }

  goingBack = e => {
    e.preventDefault();
    let currRec = this.props.currentRecord;


    if (this.state.viewType === 'activeCall') {
      this.setState({
        viewType: 'qualifyLead'
      })
    } else if (this.state.viewType === 'apptQuestion') {
      this.setState({
        viewType: 'activeCall'
      })
    } else if (this.state.viewType === 'setAppt' || this.state.viewType === 'noAppt') {
      let logData = this.state.logData;
      logData['Appt. Set By'] = undefined;
      logData['Appt. Set Date'] = undefined;
      logData['Status'] = undefined;

      this.setState({
        logData: logData,
        viewType: 'apptQuestion'
      })
    } else if (this.state.viewType === 'callBack') {
      this.setState({
        viewType: 'noAppt'
      })
    } else if (this.state.viewType === 'salesNote') {
      this.setState({
        viewType: 'setAppt'
      })
    }
  }

  changingTimes = e => {
    this.props.timesPerWeekChange(e);
  }

  submitSales = e => {
    e.preventDefault();
    let currRec = this.props.currentRecord;
    let logData = this.state.logData;

    let today = new Date();
    today = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    if (this.state.viewType === 'qualifyLead') {
      let startTime = new Date();
      startTime = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();

      this.setState({
        startTime: startTime,
        viewType: 'activeCall',
      })
    } else if (this.state.viewType === 'activeCall') {
      let notepad = document.getElementById('notepadNotes').value;

      let today = new Date();
      let endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let currDate = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
      let start = new Date(currDate + ' ' + this.state.startTime);
      let end = new Date(currDate + ' ' + endTime);
      let diffTime = end - start;

      let timeInSecs = diffTime/1000;
      let finalDiff;
      if (timeInSecs < 60) {
        finalDiff = timeInSecs + ' secs';
      } else if (timeInSecs < 3600) {
        finalDiff = (timeInSecs / 60).toFixed(2) + ' mins';
      } else {
        finalDiff = (timeInSecs / 60 / 60).toFixed(2) + ' hrs';
      }
      logData['Recent Call Time'] = finalDiff;

      if (notepad) {
        this.setState({
          logData: logData,
          viewType: 'apptQuestion',
          notepad: document.getElementById('notepadNotes').value,
        })
      } else {
        this.setState({
          viewType: 'apptQuestion',
        })
      }
    } else if (this.state.viewType === 'apptQuestion') {
      if (e.target.id === 'setAppt') {
        if (localStorage.getItem('userName') === 'Carla Milian' || localStorage.getItem('userName') === 'Shana Thorn' || localStorage.getItem('userName') === 'Jett' || localStorage.getItem('userName') === 'Jason') {
          logData['Appt. Set By'] = localStorage.getItem('userName');
        } else {
          logData['Appt. Set By'] = '';
        }
        logData['Appt. Set Date'] = today;
        logData['Status'] = 'Appointment Set';
      }
      if (localStorage.getItem('userName') === 'Carla Milian' || localStorage.getItem('userName') === 'Shana Thorn' || localStorage.getItem('userName') === 'Jett' || localStorage.getItem('userName') === 'Jason') {
        logData['Recent Caller'] = localStorage.getItem('userName');
      } else {
        logData['Recent Caller'] = '';
      }
      logData['Recent Call Date'] = today;
      console.log(logData);

      this.setState({
        logData: logData,
        viewType: e.target.id
      })
    } else if (this.state.viewType === 'setAppt') {
      this.setState({
        viewType: 'salesNote'
      })
    } else if (this.state.viewType === 'salesNote') {
      let today  = new Date();
      let dayTime;
      if (today.getHours() > 12) {
        if (today.getMinutes() < 10) {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
        } else {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
        }
      } else {
        if (today.getMinutes() < 10) {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
        } else {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";
        }
      }

      let finalEntry;
      if (localStorage.getItem('userInitials') !== '') {
        finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n';
      } else {
        finalEntry = dayTime + ' - ';
      }

      let finalNote = finalEntry + document.getElementById('salesNotes').value + '\n\n' + currRec['Notes'];
      let calNote = document.getElementById('salesNotes').value;

      logData['Notes'] = finalNote;
      logData['calNote'] = calNote;

      this.setState({
        logData: logData,
      })
      this.props.logCall(this.state.logData, 'setAppt');
    } else if (this.state.viewType === 'noAppt') {
      let callItem = {
        target: {
          id: 'customCallback'
        },
        callBackDate: ''
      }
      let callBackDate;
      if (currRec['Standing'] === 'Left VM' || currRec['Standing'] === 'Left Email' || currRec['Standing'] === 'No Answer') {
        let twoWeeksAway = new Date(+new Date + 1000*60*60*24*14);
        twoWeeksAway = (twoWeeksAway.getMonth()+1) + '/' + twoWeeksAway.getDate() + '/' + twoWeeksAway.getFullYear();
        callItem.callBackDate = twoWeeksAway;
      } else if (currRec['Standing'] === 'Not Interested' || currRec['Standing'] === 'In Contract' || currRec['Standing'] === 'Call Back' || currRec['Standing'] === 'Disconnected') {
        let threeMonths = new Date(+new Date + 1000*60*60*24*90);
        threeMonths = (threeMonths.getMonth()+1) + '/' + threeMonths.getDate() + '/' + threeMonths.getFullYear();
        callItem.callBackDate = threeMonths;
      }
      console.log(callItem);
      this.props.changeRecordHandler(callItem);
      this.setState({
        viewType: 'callBack'
      })
    } else if (this.state.viewType === 'callBack') {
      let currStamp = document.getElementById('logCallStamp').value;
      let finalNote = document.getElementById('logCallStamp').value + '\n\n' + currRec['Notes']

      logData['Notes'] = finalNote;

      this.setState({
        logData: logData,
      })
      this.props.logCall(this.state.logData, 'noAppt');
    }
  }


  qualifyLeadMap = (mapProps, map) => {
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

    if (this.props.currentRecord['Address 1']) {addr1 = this.props.currentRecord['Address 1']}
    if (this.props.currentRecord['City']) {city = this.props.currentRecord['City']}
    if (this.props.currentRecord['Zip']) {zip = this.props.currentRecord['Zip']}

    if (addr1) {
      streetAddress = addr1;
      if (city) {streetAddress = streetAddress + ' ' + city + ' Florida';} else {streetAddress = streetAddress + ' Florida';}
      if (zip) {streetAddress = streetAddress + ' ' + zip;}
    }


    setTimeout(function(){
      if (streetAddress) {
        var request = {
          query: this.props.currentRecord['Company Name'] + ' ' + streetAddress,
          fields: ['place_id']
        };
      } else {
        var request = {
          query: this.props.currentRecord['Company Name'] + ' Florida',
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

  mergeGoogle = (e) => {
    console.log(e);

    this.props.mergeGoogle(e)
  }


  componentDidMount() {
    // setTimeout(function(){
    //   this.qualifyLead();
    // }.bind(this), 50);

    let goodLuck;
    let randNumb = Math.round(Math.random()*100); //number 1 - 100

    if (randNumb < 16) {
      goodLuck = 'This could be our new favorite customer!';
    } else if (randNumb < 32) {
      goodLuck = 'NEXT!!!';
    } else if (randNumb < 48) {
      goodLuck = "Let's make this the one!";
    } else if (randNumb < 64) {
      goodLuck = 'Just. Keep. Calling!';
    } else if (randNumb < 80) {
      goodLuck = 'Remember to smile :)';
    } else if (randNumb < 100) {
      goodLuck = 'Good Luck, you got this!';
    }
    this.setState({
      goodLuck: goodLuck
    })
  }






  // Render
  // ----------------------------------------------------
  render() {
    let logNotes = ''
    if (this.props.currentRecord['Notes']) {
      logNotes = this.props.currentRecord['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    return (
      <div className="TicketModal logCall">
        <div className="inner">
          <div className="modalBody">

            {this.navBar}
            {this.currentView}
            <LogCallAccounts
              currentRecord={this.props.currentRecord}
              changeRecordHandler={this.props.changeRecordHandler}
            />

          </div>
        </div>
      </div>
    );
  }

  get navBar() {
    let recentCalled = new Date(this.props.currentRecord['Recent Call Date']);
    recentCalled = (recentCalled.getMonth()+1) + '/' + recentCalled.getDate() + '/' + recentCalled.getFullYear();

    if (this.state.viewType === 'qualifyLead') {
      return(
        <div className="modalTitle">
          <h4>{this.props.currentRecord['Company Name'].slice(0,34) + '...'} | {this.props.currentRecord['Recent Caller'] ? <em>called on {recentCalled} by <span className={this.props.currentRecord['Recent Caller'].split(' ')[0]}>{this.props.currentRecord['Recent Caller']}</span></em> : ''}</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>
      );
    } else if (this.state.viewType === 'activeCall') {
      return(
        <div className="modalTitle">
          <h4><button onClick={this.goingBack} className="btn softGrad--black">{'<'}</button> {this.props.currentRecord['Company Name']} | {this.props.currentRecord['Recent Caller'] ? <em>called on {recentCalled} by <span className={this.props.currentRecord['Recent Caller'].split(' ')[0]}>{this.props.currentRecord['Recent Caller']}</span></em> : ''}</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>
      )
    } else if (this.state.viewType === 'salesNote' || this.state.viewType === 'setAppt' || this.state.viewType === 'apptQuestion') {
      return(
        <div className="modalTitle">
          <h4><button onClick={this.goingBack} className="btn softGrad--black">{'<'}</button>WOOHOO! Ring that bell!</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>
      );
    } else if (this.state.viewType === 'noAppt' || this.state.viewType === 'callBack') {
      return(
        <div className="modalTitle">
          <h4><button onClick={this.goingBack} className="btn softGrad--black">{'<'}</button>Keep up the hard work!</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>
      )
    } else {
      return(
        <div className="modalTitle">
          <h4>{this.props.currentRecord['Company Name'].slice(0,34) + '...'} | {this.props.currentRecord['Recent Caller'] ? <em>called on {recentCalled} by <span className={this.props.currentRecord['Recent Caller'].split(' ')[0]}>{this.props.currentRecord['Recent Caller']}</span></em> : ''}</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>
      )
    }
  }
  get currentView() {
    if (this.state.viewType === 'qualifyLead') {
      return(
        <div className="mainTicket">
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

                    <div class="airmagic">
                      <h3>AirMagic</h3>
                      <div className="airmagicInner">
                        <div className="airItem full">
                          <p className="label">Name</p>
                          <p className="fakeField">{this.props.currentRecord['Company Name']}</p>
                        </div>

                        <hr/>

                        <div className="airItem most">
                          <p className="label"><span>Address 1</span></p>
                          <p className="fakeField">{this.props.currentRecord['Address 1']}</p>
                        </div>

                        <div className="airItem small">
                          <p className="label"><span>Address 2</span></p>
                          <p className="fakeField">{this.props.currentRecord['Address 2']}</p>
                        </div>

                        <div className="airItem half">
                          <p className="label"><span>City</span></p>
                          <p className="fakeField">{this.props.currentRecord['City']}</p>
                        </div>

                        <div className="airItem half">
                          <p className="label"><span>Zip</span></p>
                          <p className="fakeField">{this.props.currentRecord['Zip']}</p>
                        </div>

                        <hr/>

                        <div className="airItem half">
                          <p className="label"><span>Office Phone</span></p>
                          <p className="fakeField">{this.props.currentRecord['Office Phone']}</p>
                        </div>

                        <div className="airItem half">
                          <p className="label"><span>Cell Phone</span></p>
                          <p className="fakeField">{this.props.currentRecord['Cell Phone']}</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={()=>this.mergeGoogle(data)} key={index} data={data} className="btn softGrad--primary update">Update from Google</button>
                  </div>
                );
              }) : <img src={loader} className="loading" alt="" />}
            </div>
          </div>

            <div className="inputBlock inputBlock--full mapArea">

              <div className="qualifyMap">
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
                    name={this.props.currentRecord['Company Name']} />
                </Map>
              </div>

              <div className="qualifyReference">
                <p>3,000sqft</p>
                <div className="reference-3"></div>


                <p>10,000sqft</p>
                <div className="reference-10"></div>
              </div>
            </div>
          <button onClick={this.submitSales} className="btn softGrad--secondary nextBtn">Start Call</button>

        </div>
      );
    } else if (this.state.viewType === 'activeCall') {
      return(
        <div className="mainTicket">
          <div className="inputBlock inputBlock--full">
            <h3>Services Per Week **</h3>
            <div
              className="selectBlock"
              >
              <select id="status" value={this.props.timesPerWeek} onChange={this.props.changeTicketHandler}>
                <option value="none"></option>
                <option value="1x">1 X WEEK</option>
                <option value="2x">2 X WEEK</option>
                <option value="3x">3 X WEEK</option>
                <option value="4x">4 X WEEK</option>
                <option value="5x">5 X WEEK</option>
                <option value="6x">6 X WEEK</option>
                <option value="7x">7 X WEEK</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="inputGroup">
            <h3>Location</h3>
            <div className="inputBlock inputBlock--large">
              <p>Address 1</p>
              <input
                type="text"
                value={this.props.currentRecord['Address 1']}
                id="addr1"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--small">
              <p>Address 2</p>
              <input
                type="text"
                value={this.props.currentRecord['Address 2']}
                id="addr2"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--half">
              <p>City</p>
              <input
                type="text"
                value={this.props.currentRecord['City']}
                id="city"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--half">
              <p>Zip</p>
              <input
                type="text"
                value={this.props.currentRecord['Zip']}
                id="zip"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputGroup">
            <h3>Building <span>(nice to have)</span></h3>
            <div className="inputBlock inputBlock--third">
              <p>Sq Footage</p>
              <input
                type="text"
                value={this.props.currentRecord['Actual Sq Footage']}
                id="sqFtReal"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--third">
              <p>Employees</p>
              <input
                type="text"
                value={this.props.currentRecord['Employees']}
                id="emp"
                onChange={this.props.changeRecordHandler}
              />
            </div>
            <div className="inputBlock inputBlock--third">
              <p>Restrooms</p>
              <input
                type="text"
                value={this.props.currentRecord['Restrooms']}
                id="restrooms"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputGroup">
            <h3>Notepad</h3>
            <div className="inputBlock inputBlock--full">
              <textarea
                id="notepadNotes"
                rows="4"
                placeholder="Jot down any notes here..."
              />
            </div>
          </div>

          <button onClick={this.submitSales} className="btn softGrad--primary nextBtn">Call Completed</button>
        </div>
      );
    } else if (this.state.viewType === 'apptQuestion') {
      return (
        <div className="mainTicket">
          <div className="inputBlock inputBlock--full">
            <h3>Did you set an appointment?</h3>
          </div>

          <button id="setAppt" onClick={this.submitSales} className="btn softGrad--secondary">Yes</button>
          <button id="noAppt" onClick={this.submitSales} className="btn softGrad--black">No</button>
        </div>
      );
    } else if (this.state.viewType === 'setAppt') {
      return (
        <div className="mainTicket">
          <div className="confettiContainer">
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
          </div>
          <div className="inputGroup">
            <h3>Appointment Details</h3>
            <div className="inputBlock inputBlock--half">
              <div className="pickWrapper">
                <DayPicker onDayClick={this.props.handleDayClick} />
              </div>
              <label>Appt Date</label>
              <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                <input
                  type="text"
                  value={this.props.currentRecord['Appt. Date']}
                  id="apptDate"
                  onChange={this.props.changeRecordHandler}
                />
              </div>
            </div>
            <div className="inputBlock inputBlock--half">
              <label>Appt. Time</label>
              <input
                type="text"
                value={this.props.currentRecord['Appt. Time']}
                id="apptTime"
                onChange={this.props.changeRecordHandler}
              />
            </div>
          </div>

          <div className="inputBlock inputBlock--full">
            <label>Sales Rep</label>
            <div
              className="selectBlock"
              id="timesPerWeek"
              >
              <select id="timesPerWeekSelect" value={this.props.currentRecord['Sales Rep']} onChange={this.props.repChange}>
                <option id="none"></option>
                <option disabled>Tampa</option>
                <option id="Nolan+Perkins">Nolan Perkins</option>
                <option id="Tyler+Perkins">Tyler Perkins</option>
                <option disabled>------------</option>
                <option disabled>Orlando</option>
                <option id="Joel+Horwitz">Joel Horwitz</option>
                <option id="Christy+Subler">Christy Subler</option>
              </select>
            </div>
          </div>

          <button onClick={this.submitSales} className="btn softGrad--blue nextBtn">Confirm Appt Details</button>
        </div>
      );
    } else if (this.state.viewType === 'noAppt') {
      return (
        <div className="mainTicket">
          <div className="inputBlock inputBlock--full">
            <h3>What happened?</h3>
            <div
              className="selectBlock"
              id="standing"
              >
              <select id="standingSelect" value={this.props.currentRecord['Standing']} onChange={this.props.standingChange}>
                <option id="none"></option>
                <option id="Left+VM">Left VM</option>
                <option id="Left+Email">Left Email</option>
                <option id="No+Answer">No Answer</option>
                <option disabled>------------</option>
                <option disabled>Callback Later</option>
                <option id="Call+Back">Call Back</option>
                <option id="Not+Interested">Not Interested</option>
                <option id="In+Contract">In Contract</option>
                <option id="In+House">In House</option>
                <option id="Landlord+Does">Landlord Does</option>
                <option id="Call+Corporate+Office">Call Corporate Office</option>
                <option disabled>------------</option>
                <option disabled>Issues</option>
                <option id="Disconnected">Disconnected</option>
                <option id="Outside+Territory">Outside Territory</option>
                <option id="Bad+Number">Bad Number</option>
                <option id="Mark+for+Deletion">Mark for Deletion</option>
              </select>
            </div>
          </div>
          <button onClick={this.submitSales} className="btn softGrad--blue nextBtn">Submit</button>
        </div>
      );
    } else if (this.state.viewType === 'callBack') {
      let today  = new Date();
      let dayTime;
      if (today.getHours() > 12) {
        if (today.getMinutes() < 10) {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
        } else {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
        }
      } else {
        if (today.getMinutes() < 10) {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
        } else {
          dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";
        }
      }

      let finalEntry;
      if (localStorage.getItem('userInitials') !== '') {
        finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n';
      } else {
        finalEntry = dayTime + ' - ';
      }

      finalEntry += 'Contacted: ' + this.props.currentRecord['Standing'];

      let notepadNote = '';
      if (this.state.notepad) {
        finalEntry += '\n' + this.state.notepad + '\n';
      }

      return (
        <div className="mainTicket">
            <div className="inputBlock inputBlock--full">
              <h3>Set Callback Date</h3>
              <div className="inputBlock inputBlock--half">
                <div className="pickWrapper">
                  <DayPicker onDayClick={this.props.handleDayClick} />
                </div>
                <label>Callback Date</label>
                <div className="inputWithTag" onClick={this.props.toggleDayPicker}>
                  <input
                    type="text"
                    value={this.props.currentRecord['Callback Date']}
                    id="callBack"
                    onChange={this.props.changeRecordHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputBlock inputBlock--full">
              <h3>Note Stamp</h3>
              <textarea rows="5" id="logCallStamp">{finalEntry}</textarea>
            </div>

            <button onClick={this.submitSales} className="btn softGrad--blue nextBtn">Submit</button>
        </div>
      );
    } else if (this.state.viewType === 'salesNote') {
      let tellAbout = 'Tell ';
      tellAbout += this.props.currentRecord['Sales Rep'].split(' ')[0];
      tellAbout += ' the information you received.'

      let notepadNote = '';
      if (this.state.notepad) {
        notepadNote = this.state.notepad;
      } else {
        notepadNote = '';
      }

      return (
        <div className="mainTicket">
          <div className="confettiContainer">
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
          </div>
          <div className="inputBlock inputBlock--full">
            <h3>{tellAbout}</h3>
            <div className="inputBlock inputBlock--half">
              <textarea rows="6" className="half" id="salesNotes" defaultValue={notepadNote} placeholder="example: 'Their contract is ending!'" />
            </div>
          </div>
          <button onClick={this.submitSales} className="btn softGrad--blue nextBtn">Submit</button>
        </div>
      );
    }
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHjFAoFrHNd0x-mYqRrI-ZkpT8boKLCTw')
})(LogCall)

LogCall.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
