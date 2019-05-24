import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

// import ArchiveItem from './ArchiveItem';

export default class Activity extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    const { recentActivity } = this.props;

    // this.gridLayout();

    return (
      <div className="ActivityWrapper">
        <div className="activityContainer">
          <h4>Recent Activity</h4>

          {recentActivity ? recentActivity.map((e, i) => this.archiveItem(e, i)) : ''}
        </div>
      </div>
    );

  }
  archiveItem(recentActivity, index) {
    if (recentActivity['Status'] === 'APPC') {
      return (
        <div className={recentActivity['Recent Date'] ? 'activityItem' : 'activityItem hide'}>
          <a href={'/' + recentActivity['region'] + '/sales/' + recentActivity['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel APPC'>
            <div class="inner">
              <p className="numberLabel">${recentActivity['Monthly Amount']}</p>
              <p className="typeLabel">Proposal</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity['Appt. Set By'].split(' ')[0]}>{recentActivity['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity['Sales Rep'].split(' ')[0]}>{recentActivity['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity['Company Name']}</h4>
            </div>
          </div>
        </div>
      )
    } else if (recentActivity['Status'] === 'Closed') {
      return (
        <div className='activityItem'>
          <a href={'/' + recentActivity['region'] + '/sales/' + recentActivity['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel Closed'>
            <div class="inner">
              <p className="numberLabel">${recentActivity['Monthly Amount']}</p>
              <p className="typeLabel">New Close!</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity['Appt. Set By'].split(' ')[0]}>{recentActivity['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity['Sales Rep'].split(' ')[0]}>{recentActivity['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity['Company Name']}</h4>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='activityItem'>
          <a href={'/' + recentActivity['region'] + '/sales/' + recentActivity['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel Appt'>
            <div class="inner centeredIt">
              <p className="typeLabel">Appt. Set</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity['Appt. Set By'].split(' ')[0]}>{recentActivity['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity['Sales Rep'].split(' ')[0]}>{recentActivity['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity['Company Name']}</h4>
            </div>
          </div>
        </div>
      )
    }
  }
  // gridLayout() {
  //   setTimeout(function(){
  //     var elem = document.querySelector('.cardContainer');
  //     var iso = new Isotope( elem, {itemSelector: '.ArchiveItem'});
  //   }, 100);
  // }
  // gridDestroy() {
  //   var elem = document.querySelector('.cardContainer');
  //   var iso = new Isotope( elem, {itemSelector: '.ArchiveItem'});
  //   iso.destroy()
  // }
}
