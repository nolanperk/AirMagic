import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import exit from '../../assets/icons/white/exit.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';
import loader from '../../assets/loader.gif';

export default class RegionSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      view: 'findCustomer',
      regionOffset: '',
      zips: [],
      loadingText: 'Loading Callable Regions',
      hillsborough: [],
      pinellas: [],
      polk: [],
      pasco: [],
      regions: {
        'Hillsborough': [],
        'Pinellas': [],
        'Pasco': [],
        'Polk': [],
        'Lake': [],
        'Orange': [],
        'Osceola': [],
        'Seminole': [],
      },
    }
  }

  goingBack = () => {
    if (this.state.view === 'customerList') {
      this.setState({
        view: 'selectCat'
      })
    } else if (this.state.view === 'selectCat') {
      this.setState({
        view: 'findCustomer'
      })
    }
  }


  loadZipData = () => {
    console.log('hi');
    let loadFinish = function() {
      let regionList;
      if (this.props.baseId === 'appXNufXR9nQARjgs') {
        regionList = {
          'Lake': [],
          'Orange': [],
          'Osceola': [],
          'Seminole': [],
        }
      } else {
        regionList = {
          'Hillsborough': [],
          'Pinellas': [],
          'Pasco': [],
          'Polk': [],
        }
      }

      for (var i in this.state.zips) {
        let thisZip = this.state.zips[i];
        let rightRegion = regionList[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);

        if (!rightRegion) {
          console.log('createRegion');
          let pushItem = {
            zips: [],
            callable: thisZip.fields['Callable'],
            region: thisZip.fields['Region'],
          };
          if (thisZip.fields['Has Stipulations'] === 'Yes') {
            pushItem.stipulations = 'Yes';
            pushItem.size = thisZip.fields['Size'];
            pushItem.time = thisZip.fields['Time'];
          }
          regionList[thisZip.fields['County']].push(pushItem);
        }
      }

      for (var i in this.state.zips) {
        let thisZip = this.state.zips[i];
        // regionList[thisZip.fields['County']][thisZip.fields['Region']].zips.push(thisZip.fields['Zip']);

        let rightRegion = regionList[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);
        rightRegion.zips.push(thisZip.fields['Zip'])
      }
      console.log(regionList);
      setTimeout((function() {
        this.setState({
          regions: regionList,
        })
      }).bind(this), 100);


      setTimeout((function() {
        console.log(this.state.regions);
      }).bind(this), 125);
    }.bind(this);

    let cityTable = 'Tampa';
    if (this.props.citySet === 'orlando') {
      cityTable = 'Orlando';
    }

    let loadZipList = function() {
      console.log('loadZipList');
      let zipList = this.state.zips;

      let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + cityTable;
      if (this.state.regionOffset !== '') {customersURL = customersURL + '?offset=' + this.state.regionOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            zips: zipList.concat(response.data.records),
            error: false,
            regionOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadZipList();
        } else {
          console.log('clearing loadZipList()');
          this.setState({
            regionOffset: '',
            loading: false,
          });
          loadFinish();
        }
      });
    }.bind(this);
    loadZipList(); //run on load

  }

  componentDidMount() {
    this.loadZipData();
  }

  // Render
  // ----------------------------------------------------
  render() {
    console.log(this.state.regions);

    if (this.state.loading) {
      return(
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>Loading Regions</h4>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.props.baseId === 'appXNufXR9nQARjgs') {
        return (
          <div className="FilterModal modalInner">
            <div className="modalTitle">
              <h4>Select Call Region</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <p>Note: Only regions that we have coverage in are selectable</p>
            <div id="sortTable">
              <div className={this.state.regions['Orange'].length > 0 ? 'selectBox' : 'selectBox isHidden'}>
              <select id="regionSelect">
                <option selected>All Regions</option>

                <option disabled> </option>
                <option disabled>-------- Orange --------</option>
                {this.state.regions['Orange'] ? this.state.regions['Orange'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>----------- Seminole -----------</option>
                {this.state.regions['Seminole'] ? this.state.regions['Seminole'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>------------ Osceola ------------</option>
                {this.state.regions['Osceola'] ? this.state.regions['Osceola'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>------------ Lake ------------</option>
                {this.state.regions['Lake'] ? this.state.regions['Lake'].map((e, i) => this.regionOption(e, i)) : ''}
              </select>
              </div>
            </div>
            <div className="btn softGrad--secondary" onClick={this.props.regionSelectHandler}>Select Region</div>
          </div>

        );
      } else {
        return (
          <div className="FilterModal modalInner">
            <div className="modalTitle">
              <h4>Select Call Region</h4>
              <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
                <img src={exit} alt="exit" />
              </div>
            </div>

            <p>Note: Only regions that we have coverage in are selectable</p>
            <div id="sortTable">
              <div className={this.state.regions['Hillsborough'].length > 0 ? 'selectBox' : 'selectBox isHidden'}>
              <select id="regionSelect">
                <option selected>All Regions</option>

                <option disabled> </option>
                <option disabled>-------- Hillsborough --------</option>
                {this.state.regions['Hillsborough'] ? this.state.regions['Hillsborough'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>----------- Pinellas -----------</option>
                {this.state.regions['Pinellas'] ? this.state.regions['Pinellas'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>------------ Pasco ------------</option>
                {this.state.regions['Pasco'] ? this.state.regions['Pasco'].map((e, i) => this.regionOption(e, i)) : ''}

                <option disabled> </option>
                <option disabled>------------ Polk ------------</option>
                {this.state.regions['Polk'] ? this.state.regions['Polk'].map((e, i) => this.regionOption(e, i)) : ''}
              </select>
              </div>
            </div>
            <div className="btn softGrad--secondary" onClick={this.props.regionSelectHandler}>Select Region</div>
          </div>

        );
      }
    }
  }
  regionOption(regionItem, i) {
    if (regionItem.callable === 'Yes') {
      if (regionItem.stipulations === 'Yes') { //has stipulations
        let option = regionItem.region + ' | ';
        if (regionItem.size) {
          option += regionItem.size;
          if (regionItem.time) {
            option += ' & ' + regionItem.time
          }
        } else if (regionItem.time) {
          option += regionItem.time
        }
        return (
          <option value={regionItem.zips + ''}>
            {option}
          </option>
        );
      } else { // no stipulations
        return (
          <option value={regionItem.zips + ''}>
            {regionItem.region}
          </option>
        );
      }
    } else { // can't call
      return (
        <option disabled>
          DON'T CALL - {regionItem.region}
        </option>
      );
    }
  }
}




RegionSelect.propTypes = {
  regionSelectHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentTable: propTypes.string.isRequired,
}
