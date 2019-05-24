import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';
import dollarImg from '../../assets/icons/black/dollar.png';

export default class RecordExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'select',
      timesPerWeekValue: '',
      timesClasses: 'inputBlock inputBlock--half isHidden',
      needsDetails: false,
      needsPrice: false,
    }
  }

  componentDidMount() {
    if (this.props.currentTable === 'Sales') {
      this.setState({
        viewType: 'salesIntro',
      })
    }

    if (this.props.currentTable === 'Sales') {
      setTimeout((function() {
        if (this.props.timesPerWeek !== '1x' ||
        this.props.timesPerWeek !== '2x' ||
        this.props.timesPerWeek !== '3x' ||
        this.props.timesPerWeek !== '4x' ||
        this.props.timesPerWeek !== '5x' ||
        this.props.timesPerWeek !== '6x' ||
        this.props.timesPerWeek !== '7x') {
          this.setState({
            timesPerWeekValue: this.props.timesPerWeek,
            timesClasses: 'inputBlock inputBlock--half'
          })
        } else {
          this.setState({
            timesPerWeekValue: this.props.timesPerWeek,
            timesClasses: 'inputBlock inputBlock--half isHidden'
          })
        }
      }).bind(this), 50);

      let currRec = this.props.currentRecord;
      if (currRec['Monthly Amount'] && currRec['Times per Week'] && currRec['Actual Sq Footage']) { //move on
      } else { //show double check.
        this.setState({
          needsPrice: true
        })
      }

      if (currRec['Restrooms']) {
        if (currRec['Ceramic'] || currRec['Marble'] || currRec['VCT'] || currRec['Wood'] || currRec['Wood Lam.'] || currRec['Carpet'] || currRec['Other']) { //move on
        } else { //show double check.
          this.setState({
            needsDetails: true
          })
        }
      } else { //show double check.
        this.setState({
          needsDetails: true
        })
      }
    }
  }


  daySelect = e => {
    let timesPer = parseInt(this.props.currentRecord['Times per Week'].split('x')[0]);

    if (e.target.id === 'Weekend') {
      if (timesPer < 6) {
        document.getElementById("Sun").checked = false;
        document.getElementById("Sat").checked = false;
      }
    }
  }
  goingBack = e => {
    e.preventDefault();
    let currRec = this.props.currentRecord;


    if (this.state.viewType === 'detailsCheck') {
      if (this.state.needsPrice) {
        this.setState({
          viewType: 'priceCheck',
        })
      } else {
        this.props.noVisitProposal('back');
        this.setState({
          viewType: 'salesIntro',
        })
      }
    } else if (this.state.viewType === 'priceCheck') {
      this.props.noVisitProposal('back');
      this.setState({
        viewType: 'salesIntro',
      })
    } else if (this.state.viewType === 'salesDayTime') {
      if (this.state.needsDetails) {
        this.setState({
          viewType: 'detailsCheck',
        })
      } else {
        if (this.state.needsPrice) {
          this.setState({
            viewType: 'priceCheck',
          })
        } else {
          this.props.noVisitProposal('back');
          this.setState({
            viewType: 'salesIntro',
          })
        }
      }
    } else if (this.state.viewType === 'offerNotes') {
      this.setState({
        viewType: 'salesDayTime',
      })
    } else if (this.state.viewType === 'projects') {
      this.setState({
        viewType: 'offerNotes',
      })
      setTimeout((function() {
        document.getElementById('offerNotes').value = this.state.offerNotes;
      }).bind(this), 5);
    } else if (this.state.viewType === 'category') {
      this.setState({
        viewType: 'projects',
      })
    }
  }

  changeProjectPrice = e => {
    let currentChange = e.target.id;
    if (currentChange === 'preCleanPrice') {  this.setState({preCleanPrice: e.target.value,}) }
    else if (currentChange === 'stripPrice') {  this.setState({stripPrice: e.target.value,}) }
    else if (currentChange === 'tilePrice') {  this.setState({tilePrice: e.target.value,}) }
    else if (currentChange === 'windowPrice') {  this.setState({windowPrice: e.target.value,}) }
    else if (currentChange === 'carpetPrice') {  this.setState({carpetPrice: e.target.value,}) }
  }

  submitSales = e => {
    e.preventDefault();
    let currRec = this.props.currentRecord;


    if (this.state.viewType === 'salesIntro') {
      if (e.target.id === 'noVisit') {
        this.props.noVisitProposal('forward');
      }
      if (this.state.needsPrice) {
        this.setState({
          viewType: 'priceCheck',
        })
      } else {
        if (this.state.needsDetails) {
          this.setState({
            viewType: 'detailsCheck',
          })
        } else {
          this.setState({
            viewType: 'salesDayTime',
          })
        }
      }
    } else if (this.state.viewType === 'priceCheck') {


      if (currRec['Monthly Amount'] && currRec['Actual Sq Footage'] && currRec['Times per Week']) { //move on
        if (this.state.needsDetails) {
          this.setState({
            viewType: 'detailsCheck',
          })
        } else {
          this.setState({
            viewType: 'salesDayTime',
          })
        }
      } else { //show double check.
        document.getElementById('amounts').className += ' error';
      }
    } else if (this.state.viewType === 'detailsCheck') {
      if (currRec['Restrooms']) { //move on
        if (currRec['Ceramic'] || currRec['Marble'] || currRec['VCT'] || currRec['Wood'] || currRec['Wood Lam.'] || currRec['Carpet'] || currRec['Other']) { //move on
          this.setState({
            viewType: 'salesDayTime',
          })
        } else { //show double check.
          document.getElementById('floors').className += ' error';
        }
      } else { //show double check.
        document.getElementById('restrooms').className += ' error';
      }

    } else if (this.state.viewType === 'salesDayTime') {
      let timesPer = parseInt(this.props.currentRecord['Times per Week'].split('x')[0]);
      let checkedBoxes = document.getElementById('exportForm').querySelectorAll('input:checked')
      let selectedDays;

      if (timesPer > checkedBoxes.length) {
        document.getElementById('dayLabel').innerHTML = 'Select Days (select at least ' + timesPer + ')';
      } else {
        selectedDays = [];
        for (var i in checkedBoxes) {
          if (checkedBoxes[i].id) {
            selectedDays.push(checkedBoxes[i].id);
          }
        }
      }

      if (selectedDays == undefined) {
        selectedDays = 'Flexible';
      }

      console.log(selectedDays);
      this.setState({
        time: document.getElementById('timeSelect').value,
        daysOfWeek: selectedDays,
        viewType: 'offerNotes',
      })
    } else if (this.state.viewType === 'offerNotes') {
      let offerNotes = document.getElementById('offerNotes').value;

      if (offerNotes.length > 0) {
        this.setState({
          viewType: 'projects',
        })
        // setTimeout((function() {
        //   document.getElementById('projects').value = '';
        // }).bind(this), 5);

        let fullDataSet = this.props.currentRecord;
        let sqFtReal = parseInt(fullDataSet['Actual Sq Footage']);

        // 0.08/sqft rounded to nearest 5
        let preCleanPrice;
        preCleanPrice = Math.round((sqFtReal * 0.08)/5)*5;

        //minimum is 125
        if (preCleanPrice < 125) {
          preCleanPrice = 125;
        }

        let stripPrice = 0;
        let tilePrice = 0;
        let windowPrice = 0;
        let carpetPrice = 0;

        let carpetSqft = 0;
        if (fullDataSet['Carpet']) {
          if (fullDataSet['Carpet'].includes('%')) {
            carpetSqft = (parseInt(fullDataSet['Carpet'].split('%')[0]) / 100) * sqFtReal;
          } else {
            carpetSqft = parseInt(fullDataSet['Carpet']);
          }
        }
        if (carpetSqft > 0) {
          if (carpetSqft < 4000) {
            carpetPrice = Math.round((carpetSqft * 0.18)/5)*5;
          } else if (carpetSqft < 7000) {
            carpetPrice = Math.round((carpetSqft * 0.16)/5)*5;
          } else if (carpetSqft < 10000) {
            carpetPrice = Math.round((carpetSqft * 0.14)/5)*5;
          } else {
            carpetPrice = Math.round((carpetSqft * 0.12)/5)*5;
          }

          if (carpetPrice < 300) {
            carpetPrice = 300;
          }
        }

        let vctSqft = 0;
        if (fullDataSet['VCT']) {
          console.log(fullDataSet['VCT']);
          if (fullDataSet['VCT'].includes('%')) {
            vctSqft = (parseInt(fullDataSet['VCT'].split('%')[0]) / 100) * sqFtReal;
          } else {
            vctSqft = parseInt(fullDataSet['VCT']);
          }
        }
        if (vctSqft > 0) {
          console.log(vctSqft);
          if (vctSqft < 4000) {
            stripPrice = Math.round((vctSqft * 0.35)/5)*5;;
          } else if (vctSqft < 7000) {
            stripPrice = Math.round((vctSqft * 0.30)/5)*5;;
          } else if (vctSqft < 10000) {
            stripPrice = Math.round((vctSqft * 0.25)/5)*5;;
          } else {
            stripPrice = Math.round((vctSqft * 0.20)/5)*5;;
          }

          if (stripPrice < 500) {
            stripPrice = 500;
          }
        }

        let tileSqft = 0;
        if (fullDataSet['Ceramic']) {
          if (fullDataSet['Ceramic'].includes('%')) {
            tileSqft = (parseInt(fullDataSet['Ceramic'].split('%')[0]) / 100) * sqFtReal;
          } else {
            tileSqft = parseInt(fullDataSet['Ceramic']);
          }
        }
        if (tileSqft > 0) {
          if (tileSqft < 4000) {
            tilePrice = Math.round((tileSqft * 0.35)/5)*5;
          } else if (tileSqft < 7000) {
            tilePrice = Math.round((tileSqft * 0.30)/5)*5;
          } else if (tileSqft < 10000) {
            tilePrice = Math.round((tileSqft * 0.20)/5)*5;
          } else {
            tilePrice = Math.round((tileSqft * 0.15)/5)*5;
          }

          if (tilePrice < 500) {
            tilePrice = 500;
          }
        }


        this.setState({
          offerNotes: offerNotes,
          viewType: 'projects',
          preCleanPrice: preCleanPrice,
          stripPrice: stripPrice,
          tilePrice: tilePrice,
          windowPrice: windowPrice,
          carpetPrice: carpetPrice,
        })
      } else {
        document.getElementById('offerRequ').innerHTML = 'How would you explain this account to a franchise? REQUIRED';
      }
    } else if (this.state.viewType === 'projects') {
      this.setState({
        preClean: false,
        strip: false,
        tile: false,
        window: false,
        carpet: false,
      });

      if (this.state.preCleanPrice !== 0) {
        this.setState({preClean: true});
      }
      if (this.state.stripPrice !== 0) {
        this.setState({strip: true});
      }
      if (this.state.tilePrice !== 0) {
        this.setState({tile: true});
      }
      if (this.state.windowPrice !== 0) {
        this.setState({window: true});
      }
      if (this.state.carpetPrice !== 0) {
        this.setState({carpet: true});
      }
      this.setState({
        viewType: 'category',
      });
    } else if (this.state.viewType === 'category') {
      let currCat = document.getElementById('catSelect').value;

      if (currCat === 'General Office' || currCat === 'Manufacturing' || currCat === 'Government' || currCat === 'Law Office' || currCat === 'Retail') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-standard-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-standard'});
        }
      } else if (currCat === 'Standard Medical' || currCat === 'Clinic' || currCat === 'Dialysis / Oncology' || currCat === 'Dentist' || currCat === 'Veterinarian') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-medical-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-medical'});
        }
      } else if (currCat === 'Residential Common Area' || currCat === 'Residential Living') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-residential-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-residential'});
        }
      } else if (currCat === 'School' || currCat === 'Daycare / VPK') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-schools-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-schools'});
        }
      } else if (currCat === 'Church') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-church-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-church'});
        }
      } else if (currCat === 'Restaurant' || currCat === 'Bar') {
        if (currRec['Times per Week'] === '1x') {
          this.setState({mergeTemp: this.props.citySet + '-restaurant-1x'});
        } else {
          this.setState({mergeTemp: this.props.citySet + '-restaurant'});
        }
      }

      this.setState({
        category: currCat,
        viewType: 'category',
      });

      setTimeout((function() {
        this.props.exportRecord(this.state, 'Proposal');
      }).bind(this), 5);
    }
  }

  changingTimes = e => {
    this.props.timesPerWeekChange(e);

    setTimeout((function() {
      if (this.props.timesPerWeek === 'other') {
        this.setState({
          timesPerWeekValue: 'other',
          timesClasses: 'inputBlock inputBlock--half'
        });
      } else {
        this.setState({
          timesPerWeekValue: this.props.timesPerWeek,
          timesClasses: 'inputBlock inputBlock--half isHidden'
        });
      }
    }).bind(this), 50);
  }

  nonGenerated = e => {
    if (e.target.id === 'additional') {
      if (this.props.baseId === 'appXNufXR9nQARjgs') { //orlando sales
        this.props.exportRecord('orlando-additional', 'Proposal')
      } else {
        this.props.exportRecord('tampa-additional', 'Proposal')
      }
    } else if (e.target.id === 'apptSheet') {
      this.props.exportRecord('appt-sheet', 'Appointment-Sheets');
    }
  }

  // Render
  // ----------------------------------------------------
  render() {


    if (this.state.viewType === 'select') {
      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>Choose Export Template</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <form id="exportForm" onSubmit={this.props.exportRecord}>

            <div className="selectBox mergeBox" onChange={this.selectChange}>
              {this.locationSales}
            </div>


            <div className="newFilterTrigger">
              <button type="submit" className="btn softGrad--secondary">Submit</button>
            </div>
          </form>


        </div>

      );
    } else {
      if (this.state.viewType === 'salesIntro') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>What do you want to export?</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <button id="apptSheet" onClick={this.nonGenerated} className="btn softGrad--blue">Appointment sheet</button>
            <br />
            <br />
            <button id="normal" onClick={this.submitSales} className="btn softGrad--secondary">Normal Proposal</button>
            <button id="noVisit" onClick={this.submitSales} className="btn softGrad--primary">No-Visit Proposal</button>
            <br />
            <br />
            <button id="additional" onClick={this.nonGenerated} className="btn softGrad--black">Additional Service</button>
          </div>
        );
      } else if (this.state.viewType === 'priceCheck') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>Let's Confirm Details.</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <div className="ModuleList">
              <div className="ModuleCard" id="amounts">
                <div className="inner">
                  <div className="inputBlock inputBlock--third">
                    <label>Actual Sq. Ft.</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Actual Sq Footage']}
                      id="sqFtReal"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--third">
                    <label>Sq Ft. / Hour</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['SQ Ft. per Hour']}
                      id="sqFtPer"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--third">
                    <label>Hours Per</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Hours Per']}
                      id="hoursPer"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--half">
                    <label>Times / Week</label>
                    <div
                      className="selectBlock"
                      id="timesPerWeek"
                      >
                      <select id="timesPerWeekSelect" value={this.state.timesPerWeekValue} onChange={this.changingTimes}>
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
                  <div className={this.state.timesClasses} id="customTimes">
                    <label>Times / Week</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Times per Week']}
                      id="timesPerWeek"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="ModuleCard" id="amounts">
                <div className="inner">
                  <div className="inputBlock inputBlock--full">
                    <label>Monthly Amount (click $ to autoprice)</label>
                    <div className="inputWithTag">
                      <div className="inputTag selectable" onClick={this.props.autoPricing}>
                        <img src={dollarImg} alt="" />
                      </div>
                      <input
                        type="text"
                        value={this.props.currentRecord['Monthly Amount']}
                        id="amount"
                        onChange={this.props.changeRecordHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
            <button id="submitDouble" onClick={this.submitSales} className="btn softGrad--secondary">Next</button>
          </div>
        );
      } else if (this.state.viewType === 'detailsCheck') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>Let's Confirm Details.</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <div className="ModuleList">
              <div className="ModuleCard" id="restrooms">
                <div className="inner">
                  <div className="inputBlock inputBlock--full">
                    <label>Restrooms</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Restrooms']}
                      id="restrooms"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="ModuleCard" id="floors">
                <div className="inner">

                  <div className="inputBlock inputBlock--third">
                    <label>Ceramic</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Ceramic']}
                      id="ceramic"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>

                  <div className="inputBlock inputBlock--third">
                    <label>Marble</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Marble']}
                      id="marble"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--third">
                    <label>VCT</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['VCT']}
                      id="vct"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>

                  <div className="inputBlock inputBlock--third">
                    <label>Wood</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Wood']}
                      id="wood"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--third">
                    <label>Lam.</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Wood Lam.']}
                      id="woodLam"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>

                  <div className="inputBlock inputBlock--third">
                    <label>Carpet</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Carpet']}
                      id="carpet"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <div className="inputBlock inputBlock--third">
                    <label>Other</label>
                    <input
                      type="text"
                      value={this.props.currentRecord['Other']}
                      id="other"
                      onChange={this.props.changeRecordHandler}
                    />
                  </div>
                  <p>Should be square footage # or % of total</p>

                </div>
              </div>
            </div>

            <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
            <button id="submitDouble" onClick={this.submitSales} className="btn softGrad--secondary">Next</button>
          </div>
        );
      } else if (this.state.viewType === 'salesDayTime') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>Days / Times</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <form id="exportForm" onSubmit={this.submitSales}>
              <h4>When will we be cleaning?</h4>
              <div className="inner">
                <p>Select Time</p>
                <div className="selectBox mergeBox" onChange={this.selectChange}>
                  <select id="timeSelect">
                    <option>5am</option>
                    <option>6am</option>
                    <option>7am</option>
                    <option>8am</option>
                    <option>9am</option>
                    <option>10am</option>
                    <option>11am</option>
                    <option>Noon</option>
                    <option>1pm</option>
                    <option>2pm</option>
                    <option>3pm</option>
                    <option>4pm</option>
                    <option selected>After 5pm</option>
                    <option>After 6pm</option>
                    <option>After 7pm</option>
                    <option>After 8pm</option>
                    <option>After 9pm</option>
                    <option>After 10pm</option>
                    <option>After 11pm</option>
                    <option>Midnight</option>
                  </select>
                </div>


                <div className="daySelect" onClick={this.daySelect}>
                  <p id="dayLabel">Select Days</p>

                  <input type="checkbox" id="Mon" />
                  <label for="Mon">Mon</label>

                  <input type="checkbox" id="Tue" />
                  <label for="Tue">Tue</label>

                  <input type="checkbox" id="Wed" />
                  <label for="Wed">Wed</label>

                  <input type="checkbox" id="Thu" />
                  <label for="Thu">Thu</label>

                  <input type="checkbox" id="Fri" />
                  <label for="Fri">Fri</label>

                  <input type="checkbox" id="Sat" />
                  <label for="Sat">Sat</label>

                  <input type="checkbox" id="Sun" />
                  <label for="Sun">Sun</label>

                  <input type="checkbox" id="Weekend" />
                  <label for="Weekend">Weekend</label>
                </div>
              </div>

              <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
              <button type="submit" id="submitDayTime" className="btn softGrad--secondary">Next</button>
            </form>
          </div>
        );
      } else if (this.state.viewType === 'offerNotes') {
        let serviceNotes = '';
        if (this.props.currentRecord['Service Notes']) {
          serviceNotes = this.props.currentRecord['Service Notes'];
        }
        return (
          <div className="SalesModal modalInner splitted">
            <div className="modalTitle">
              <h4>Offer sheet notes</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <form id="exportForm" onSubmit={this.submitSales}>
              <p id="offerRequ">How would you explain this account to a franchise? *</p>
              <div className="splitHalf">
                <textarea rows="6" className="half" id="offerNotes" defaultValue={serviceNotes} placeholder="example: There are 5 exam rooms, the lobby is pretty large, but the nurses station is very small." />
                <textarea className="notesHalf" value={this.props.currentRecord['Notes']} />
              </div>
              <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
              <button type="submit" className="btn softGrad--secondary">Next</button>
            </form>
          </div>
        );
      } else if (this.state.viewType === 'serviceSchedule') {
        return (
          <div className="SalesModal modalInner splitted">
            <div className="modalTitle">
              <h4>Changes to Service Schedule</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <form id="exportForm" onSubmit={this.submitSales} className="splitted">
              <p>Are there changes to the standard service schedule?</p>
              <div className="splitHalf">
                <textarea rows="6" className="half" id="serviceSchedule" placeholder="example: Sweep/Mop every night. There is also a side glass-paned door which needs to be cleaned along with the entrance." />
                <textarea className="notesHalf" value={this.props.currentRecord['Notes']} />
              </div>
              <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
              <button type="submit" className="btn softGrad--secondary">Next</button>
            </form>
          </div>
        );
      } else if (this.state.viewType === 'projects') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>Projects</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <form id="exportForm" onSubmit={this.submitSales}>
              <p>Please confirm project pricing. (based on sqft breakdown)</p>

              <div className="ModuleList">
                <div className="ModuleCard" id="amounts">
                  <div className="inner">
                    <div className="inputBlock inputBlock--full">
                      <label>Pre-Clean Price</label>
                      <div className="inputWithTag">
                        <div className="inputTag selectable">
                          <img src={dollarImg} alt="" />
                        </div>
                        <input
                          type="text"
                          value={this.state.preCleanPrice}
                          id="preCleanPrice"
                          onChange={this.changeProjectPrice}
                        />
                      </div>
                    </div>

                    <div className="inputBlock inputBlock--full">
                      <label>Strip & Wax</label>
                      <div className="inputWithTag">
                        <div className="inputTag selectable">
                          <img src={dollarImg} alt="" />
                        </div>
                        <input
                          type="text"
                          value={this.state.stripPrice}
                          id="stripPrice"
                          onChange={this.changeProjectPrice}
                        />
                      </div>
                    </div>


                    <div className="inputBlock inputBlock--full">
                      <label>Carpet Cleaning</label>
                      <div className="inputWithTag">
                        <div className="inputTag selectable">
                          <img src={dollarImg} alt="" />
                        </div>
                        <input
                          type="text"
                          value={this.state.carpetPrice}
                          id="carpetPrice"
                          onChange={this.changeProjectPrice}
                        />
                      </div>
                    </div>


                    <div className="inputBlock inputBlock--full">
                      <label>Tile & Grout</label>
                      <div className="inputWithTag">
                        <div className="inputTag selectable">
                          <img src={dollarImg} alt="" />
                        </div>
                        <input
                          type="text"
                          value={this.state.tilePrice}
                          id="tilePrice"
                          onChange={this.changeProjectPrice}
                        />
                      </div>
                    </div>


                    <div className="inputBlock inputBlock--full">
                      <label>Exterior Windows</label>
                      <div className="inputWithTag">
                        <div className="inputTag selectable">
                          <img src={dollarImg} alt="" />
                        </div>
                        <input
                          type="text"
                          value={this.state.windowPrice}
                          id="windowPrice"
                          onChange={this.changeProjectPrice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
              <button type="submit" className="btn softGrad--secondary">Next</button>
            </form>
          </div>
        );
      } else if (this.state.viewType === 'category') {
        return (
          <div className="SalesModal modalInner">
            <div className="modalTitle">
              <h4>Category</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <form id="exportForm" onSubmit={this.submitSales}>
              <p>What kind of company/building is this?</p>
              <div className="selectBox mergeBox">
                <select id="catSelect" value={this.props.currentRecord['Category']} onChange={this.props.categoryChange}>
                  <option disabled>Standard</option>
                  <option selected>General Office</option>
                  <option>Manufacturing</option>
                  <option>Government</option>
                  <option>Law Office</option>
                  <option>Retail</option>

                  <option disabled>--------</option>
                  <option disabled>Medical</option>
                  <option>Standard Medical</option>
                  <option>Clinic</option>
                  <option>Dialysis / Oncology</option>
                  <option>Dentist</option>
                  <option>Veterinarian</option>

                  <option disabled>--------</option>
                  <option>Residential Common Area</option>
                  <option>Residential Living</option>

                  <option disabled>--------</option>
                  <option>School</option>
                  <option>Daycare / VPK</option>

                  <option disabled>--------</option>
                  <option>Church</option>

                  <option disabled>--------</option>
                  <option>Restaurant</option>
                  <option>Bar</option>
                </select>
              </div>

              <br />

              <button onClick={this.goingBack} className="btn softGrad--black">Back</button>
              <button type="submit" className="btn softGrad--secondary">Next</button>
            </form>
          </div>
        );
      }
    }
  }

  get locationSales() {
    if (this.props.currentTable === 'Franchisees') {
      return (
        <select id="mergeTemplates">
          <option
            data-merge="none">
            Select Template</option>
          <option disabled>---------------</option>
          <option disabled>Franchise Exports</option>
          <option disabled>---------------</option>
          <option
            data-merge="franchise-customer-service"
            data-type="Franchise Exports">
            Franchise Customer Service</option>
          <option
            data-merge="level-5"
            data-type="Franchise Exports">
            Franchise Level 5</option>
          <option
            data-merge="course-completion"
            data-type="Franchise Exports">
            Franchise Course Completion</option>
        </select>
      );
    } else if (this.props.currentTable === 'Customers') {
      return (
        <select id="mergeTemplates">
          <option
            data-merge="none">
            Select Template</option>
          <option disabled>---------------</option>
          <option disabled>Startups</option>
          <option disabled>---------------</option>
          <option data-type="Account Acceptance">Account Acceptance</option>
          <option data-type="Offer Sheet">Account Offer Sheet</option>
          <option data-type="Account Welcome Letter">Account Welcome Letter</option>
          <option data-type="Bid Sheets">Bid Sheets</option>
          <option disabled>---------------</option>
          <option disabled>Changes</option>
          <option disabled>---------------</option>
          <option data-type="Account Changes">Account Changes</option>
          <option data-type="Crew Change">Crew Change</option>
          <option data-type="Crew Change Request">Crew Change Request</option>
          <option data-type="Additional Proposal">Additional Service - Proposal</option>
          <option data-type="Additional Order">Additional Service - Order</option>
          <option disabled>---------------</option>
          <option disabled>Stops</option>
          <option disabled>---------------</option>
          <option data-type="Account Cancelation">Account Cancelation</option>
          <option data-type="Account Credit">Account Credit</option>
          <option data-type="Account Relinquish">Account Relinquish</option>
        </select>
      );
    } else {
      if (this.props.baseId === 'appXNufXR9nQARjgs') { //orlando sales
        return (
          <select id="mergeTemplates">
            <option
              data-merge="none">
              Select Template</option>
            <option disabled>---------------</option>
            <option disabled>General</option>
            <option disabled>---------------</option>
            <option
              data-merge="appt-sheet"
              data-type="Shee">
              Appointment Sheet</option>

            <option disabled>---------------</option>
            <option disabled>Joel Horwitz</option>
            <option disabled>---------------</option>
            <option
              data-merge="jdh-standard"
              data-type="Proposal">
              JDH - Standard</option>
            <option
              data-merge="jdh-medical"
              data-type="Proposal">
              JDH - Medical</option>
            <option
              data-merge="jdh-schools"
              data-type="Proposal">
              JDH - Schools</option>
            <option
              data-merge="jdh-1x"
              data-type="Proposal">
              JDH - 1 X Week</option>
            <option
              data-merge="jdh-once"
              data-type="Proposal">
              JDH - 1 X Only</option>
          </select>
        )
      } else {
        return (
          <select id="mergeTemplates">
            <option
              data-merge="none">
              Select Template</option>
            <option disabled>---------------</option>
            <option disabled>General</option>
            <option disabled>---------------</option>
            <option
              data-merge="appt-sheet"
              data-type="Appointment-Sheets">
              Appointment Sheet</option>
            <option disabled>---------------</option>
            <option disabled>Tyler Perkins</option>
            <option disabled>---------------</option>
            <option
              data-merge="tmp-standard"
              data-type="Proposal">
              TMP - Standard</option>
            <option
              data-merge="tmp-medical"
              data-type="Proposal">
              TMP - Medical</option>
            <option
              data-merge="tmp-schools"
              data-type="Proposal">
              TMP - Schools</option>
            <option
              data-merge="tmp-1x"
              data-type="Proposal">
              TMP - 1 X Week</option>
            <option
              data-merge="tmp-once"
              data-type="Proposal">
              TMP - 1 X Only</option>

            <option disabled>---------------</option>
            <option disabled>Nolan Perkins</option>
            <option disabled>---------------</option>
            <option
              data-merge="nwp-standard"
              data-type="Proposal">
              NWP - Standard</option>
            <option
              data-merge="nwp-medical"
              data-type="Proposal">
              NWP - Medical</option>
            <option
              data-merge="nwp-schools"
              data-type="Proposal">
              NWP - Schools</option>
            <option
              data-merge="nwp-1x"
              data-type="Proposal">
              NWP - 1 X Week</option>
            <option
              data-merge="nwp-once"
              data-type="Proposal">
              NWP - 1 X Only</option>

            <option disabled>---------------</option>
            <option disabled>Rafael Milanes</option>
            <option disabled>---------------</option>
            <option
              data-merge="ram-standard"
              data-type="Proposal">
              RAM - 062210 Standard</option>
            <option
              data-merge="ram-once"
              data-type="Proposal">
              RAM - 062210 1 X Week</option>
            <option
              data-merge="ram-medical"
              data-type="Proposal">
              RAM - Medical</option>
            <option
              data-merge="ram-medical-1x"
              data-type="Proposal">
              RAM - Medical 1x</option>
            <option
              data-merge="ram-healthcare"
              data-type="Proposal">
              RAM - Healthcare</option>
            <option
              data-merge="ram-multi-tenant"
              data-type="Proposal">
              RAM - Multi-Tenant</option>
            <option
              data-merge="ram-schools"
              data-type="Proposal">
              RAM - Schools</option>
          </select>
        )
      }
    }
  }
}


RecordExport.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
