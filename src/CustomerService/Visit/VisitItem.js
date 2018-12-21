import React, { Component } from 'react';
import propTypes from 'prop-types';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';

import completed from '../../assets/icons/emoji/check.png';
import veryHappy from '../../assets/icons/emoji/very-happy.png';
import happy from '../../assets/icons/emoji/happy.png';
import newCustomer from '../../assets/icons/emoji/new-customer.png';
import satisfied from '../../assets/icons/emoji/satisfied.png';
import unhappy from '../../assets/icons/emoji/unhappy.png';
import crewChange from '../../assets/icons/emoji/crew-change.png';

export default class VisitItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, visitData } = this.props;
    let thisMonthly = visitData.fields['Monthly Amount'];
    let classNames = '';
    classNames += " isActive";

    let standingImg;

    if (visitData.fields['Standing'] === 'Very Happy') {
      classNames += ' very';
      standingImg = veryHappy;
    } else if (visitData.fields['Standing'] === 'Happy') {
      classNames += ' happy';
      standingImg = happy;
    } else if (visitData.fields['Standing'] === 'Satisfied') {
      classNames += ' satisfied';
      standingImg = satisfied;
    } else if (visitData.fields['Standing'] === 'Unhappy') {
      classNames += ' unhappy';
      standingImg = unhappy;
    } else if (visitData.fields['Standing'] === 'Crew Change') {
      classNames += ' crew';
      standingImg = crewChange;
    } else if (visitData.fields['Standing'] === 'New Customer' || visitData.fields['Standing'] === 'New Close') {
      classNames += ' new';
      standingImg = newCustomer;
    } else if (visitData.fields['Standing'] === 'Completed Work') {
      standingImg = completed;
    }

    return (
      <div className={"VisitItem ArchiveItem " + classNames} onClick={()=>this.props.openRecordHandler(visitData.fields, visitData.id, index)}>
        {/* <a href={''} className="absLink"></a> */}
        <div className="inner">
          <div className="whiteCard">
            <p className="boldText">{visitData.fields['Company Name']}</p>

            <p className="smallText">
              <img src={standingImg} alt={visitData.fields['Standing']} />
              <span>{visitData.fields['Standing']}</span>
            </p>
          </div>
          <div className="subInfo">
            <p className="amount">{this.props.visitData.fields['Times per Week']}Week in {this.props.visitData.fields['City']}</p>
            <p className="rounded canc">${this.props.visitData.fields['Monthly Amount']}</p>
          </div>
        </div>
      </div>
    );
  }
}
