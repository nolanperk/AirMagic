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
    console.log(recentActivity);
    if (recentActivity.item['Status'] === 'APPC') {
      return (
        <div className='activityItem'>
          <a href={'/' + recentActivity.item['region'] + '/sales/' + recentActivity.item['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel APPC'>
            <div class="inner">
              <p className="numberLabel">${recentActivity.item['Monthly Amount']}</p>
              <p className="typeLabel">Proposal</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity.item['Appt. Set By'].split(' ')[0]}>{recentActivity.item['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity.item['Sales Rep'].split(' ')[0]}>{recentActivity.item['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity.item['Company Name']}</h4>
            </div>
          </div>
        </div>
      )
    } else if (recentActivity.item['Status'] === 'Closed') {
      return (
        <div className='activityItem'>
          <a href={'/' + recentActivity.item['region'] + '/sales/' + recentActivity.item['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel Closed'>
            <div class="inner">
              <p className="numberLabel">${recentActivity.item['Monthly Amount']}</p>
              <p className="typeLabel">New Close!</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity.item['Appt. Set By'].split(' ')[0]}>{recentActivity.item['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity.item['Sales Rep'].split(' ')[0]}>{recentActivity.item['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity.item['Company Name']}</h4>
            </div>
          </div>
        </div>
      )
    } else {
      let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let apptDate = new Date(recentActivity.item['Appt. Date'] + 1000*3600*24);
      apptDate = monthNames[apptDate.getMonth()] + ' ' + apptDate.getDate();
      return (
        <div className='activityItem'>
          <a href={'/' + recentActivity.item['region'] + '/sales/' + recentActivity.item['id']} target="_blank" className="absLink"></a>
          <div className='prettyLabel Appt'>
            <div class="inner">
              <p className="numberLabel">{apptDate}</p>
              <p className="typeLabel">Appt. Set</p>
            </div>
          </div>

          <div className="activityContent">
            <div className="inner">
              <p className={'inside ' + recentActivity.item['Appt. Set By'].split(' ')[0]}>{recentActivity.item['Appt. Set By'].split(' ')[0]}</p>
              <p className={'outside ' + recentActivity.item['Sales Rep'].split(' ')[0]}>{recentActivity.item['Sales Rep'].split(' ')[0]}</p>
              <h4>{recentActivity.item['Company Name']}</h4>
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
