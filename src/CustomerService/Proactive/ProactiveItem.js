import React, { Component } from 'react';
import propTypes from 'prop-types';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';

export default class ProactiveItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, proactiveData } = this.props;
    let thisMonthly = proactiveData.fields['Monthly Amount'];
    let sizeClass = '';
    if (thisMonthly > 499 && thisMonthly <= 999) {
      sizeClass = 'everyOtherMonth';
    } else if (thisMonthly > 999 && thisMonthly <= 1499) {
      sizeClass = 'everyMonth';
    } else if (thisMonthly > 1499) {
      sizeClass = 'twicePerMonth';
    } else {
      return (
        ' '
      );
    }

    return (
      <div className={"ProactiveItem ArchiveItem " + sizeClass} onClick={()=>this.props.openRecordHandler(proactiveData.fields, proactiveData.id, index)}>
        <div className="inner">
          <div className="whiteCard">
            <p className="boldText">{proactiveData.fields['Company Name']}</p>
          </div>
          <div className="subInfo">
            <p className="amount">{this.props.proactiveData.fields['Times per Week']}Week in {this.props.proactiveData.fields['City']}</p>
            <p className="rounded canc">${this.props.proactiveData.fields['Monthly Amount']}</p>
          </div>
        </div>
      </div>
    );
  }
}
