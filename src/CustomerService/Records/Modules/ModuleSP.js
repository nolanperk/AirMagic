import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';
import emailImg from '../../../assets/icons/black/email.png';
import SPListItem from './SPListItem';


export default class ModuleSP extends Component {

  copyName = () => {
    let copyText = document.getElementById("copyBody");
    copyText.style.display = 'inline';
    copyText.select();
    document.execCommand("copy");
    copyText.style.display = 'none';
    alert("Copied  " + copyText.value + "'s Name!");
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { spList } = this.props;

    let spNumber = this.props.spNumber;

    return (
      <div className="ModuleCard moduleSP">
        <div className="inner">

          <div className="inputBlock inputBlock--full">
            <label>Service Provider</label>
            <div
              className="selectBlock"
              id="status"
              >
              <select id="spSelector" value={this.props.spNumber} onChange={this.props.spChangeHandler}>
                <option value="none">Select SP</option>
                {spList.map((e, i) => this.spListItem(e, i))}
              </select>
            </div>
          </div>

          <a onClick={this.copyName}>Copy Name</a>
          <input className="hiddenSPName" id="copyBody" value={this.props.currentSP['SP Name']} />
          <hr />

          {this.homePhone}
          {this.cellPhone}
          {this.emailLink}
          {this.spButton}


        </div>
      </div>
    );
  }

  spListItem(spList, index) {
    return <SPListItem
        key={this.props.spList.id}
        id={this.props.spList.id}
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
    } else {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Home Phone</label>
          <input
            disabled
            type="text"
            value=" "
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
    } else {
      return (
        <div className="inputBlock inputBlock--half">
          <label>Cellphone</label>
          <input
            disabled
            type="text"
            value=" "
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
    } else {
      return (
        <div className="inputBlock inputBlock--full">
          <label>Email</label>
          <input
            disabled
            type="text"
            value=" "
          />
        </div>
      );
    }
  }

  get spButton() {
    if (this.props.baseId === 'appBUKBn552B8SlbE') {
      return (
        <div className="cardTag">
          <a className="btn softGrad--primary" href={'/orlando/franchisees/' + this.props.currentSP['id']} target="_blank">View SP Record</a>
        </div>
      )
    } else {
      return (
        <div className="cardTag">
          <a className="btn softGrad--primary" href={'/tampa/franchisees/' + this.props.currentSP['id']} target="_blank">View SP Record</a>
        </div>
      )
    }
  }
}

ModuleSP.propTypes ={
  spChangeHandler: propTypes.func.isRequired,
  spNumber: propTypes.string,
  baseId: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  currentSP: propTypes.object.isRequired,
  spList: propTypes.object.isRequired,
}
