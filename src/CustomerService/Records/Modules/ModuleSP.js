import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import emailImg from '../../../assets/icons/black/email.png';
import SPListItem from './SPListItem';


export default class ModuleSP extends Component {
  constructor(props) {
    super();
    this.state = {
      currentSP: [],
      spList: [],
      spListOffset: '',
    }
  }

  loadList = () => {
    let finalURL = 'https://api.airtable.com/v0/appBsaVxz2OicG5Zw/Franchisees?fields%5B%5D=SP+Name&fields%5B%5D=Number&view=Active&sort%5B0%5D%5Bfield%5D=SP+Name';
    let downloadNow = 0;

    console.log(finalURL);
    let loadAllData = setInterval(function() {
      if (this.state.spListOffset !== '') {finalURL = finalURL + '&offset=' + this.state.spListOffset;}
      let preData = this.state.spList;
      console.log(finalURL);
      return axios
        .get(finalURL)
        .then(response => {
          downloadNow ++;
          this.setState({
            spList: preData.concat(response.data.records),
            spListOffset: response.data.offset,
          });
          console.log(response.data.offset);
        }).catch(error => {
          downloadNow ++;
          clearInterval(loadAllData);
        });
    }.bind(this), 500);

  };

  componentDidMount() {
    this.loadList();
    this.state = {
      spNumberValue: this.props.spNumber,
    }
  }


  // Render
  // ----------------------------------------------------
  render() {
    const { spList } = this.state;

    let spNumber = this.props.spNumber;

    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--full">
            <label>Service Provider</label>
            <div
              className="selectBlock"
              id="status"
              >
              <select id="spSelector" value={this.props.spNumber} onChange={this.props.spChangeHandler}>
                {spList.map((e, i) => this.spListItem(e, i))}
              </select>
            </div>
          </div>

          <hr />

          {this.homePhone}
          {this.cellPhone}
          {this.emailLink}
          {this.partnerName}
          {this.partnerPhone}
          {this.englishName}
          {this.englishPhone}
          <br />
          {this.addressBtn}
          <a className="btn softGrad--primary" href={'/tampa/franchisees/' + this.props.currentSP['id']} target="_blank">View SP Record</a>


        </div>
      </div>
    );
  }

  spListItem(spList, index) {
    return <SPListItem
        key={this.state.spList.id}
        id={this.state.spList.id}
        spList={spList.fields}
        index={index}
      />
  }

  get homePhone() {
    if (this.props.currentSP['Home Phone']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Home Phone</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['Home Phone']}
          />
        </div>
      );
    }
  }
  get cellPhone() {
    if (this.props.currentSP['Cellphone']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Cellphone</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['Cellphone']}
          />
        </div>
      );
    }
  }
  get emailLink() {
    if (this.props.currentSP['Cellphone']) {
      return (
        <div className="inputBlock inputBlock--full">
          <label>Email</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['Email']}
          />
        </div>
      );
    }
  }
  get partnerName() {
    if (this.props.currentSP['Partner Name']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Partner Name</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['Partner Name'] ? this.props.currentSP['Partner Name'] : ''}
          />
        </div>
      );
    }
  }

  get partnerPhone() {
    if (this.props.currentSP['Partner Phone']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Partner Phone</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['Partner Phone'] ? this.props.currentSP['Partner Phone'] : ''}
          />
        </div>
      );
    }
  }
  get englishName() {
    if (this.props.currentSP['English Name']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>English Name</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['English Name'] ? this.props.currentSP['English Name'] : ''}
          />
        </div>
      );
    }
  }

  get englishPhone() {
    if (this.props.currentSP['English Phone']) {
      return (
        <div className="inputBlock inputBlock--half">
          <label>English Phone</label>
          <input
            disabled
            type="text"
            value={this.props.currentSP['English Phone'] ? this.props.currentSP['English Phone'] : ''}
          />
        </div>
      );
    }
  }

  get addressBtn() {
    if (this.props.currentSP['Address']) {
      let validateAddress = 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(this.props.currentSP['Address']);
      return (
        <a className="btn softGrad--secondary" href={validateAddress} target="_blank">SP Address</a>
      );
    }
  }
}

ModuleSP.propTypes ={
  spChangeHandler: propTypes.func.isRequired,
  spNumber: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  currentSP: propTypes.object.isRequired,
}
