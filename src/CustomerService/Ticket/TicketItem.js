import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import rightArrow from '../../assets/icons/white/arrow_forward.png';
import imageCount from '../../assets/icons/white/image.png';

export default class TicketItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, ticketData } = this.props;
    let classNames = '';

    if (ticketData.fields['Status'] === 'Ticket Created') {
      classNames += ' created';
    } else if (ticketData.fields['Status'] === 'Sent to SP') {
      classNames += ' moreIssues';
    } else if (ticketData.fields['Status'] === 'Confirmed by SP') {
      classNames += ' sentToSP';
    } else if (ticketData.fields['Status'] === 'Fixed by SP') {
      classNames += ' confirmedBySP';
    } else if (ticketData.fields['Status'] === 'Ticket Resolved') {
      classNames += ' fixedBySP';
    } else if (ticketData.fields['Status'] === 'More Issue') {
      classNames += ' resolved';
    }


    let weekAgo = new Date(+new Date - 1000*60*60*24*7);
    let twoAgo = new Date(+new Date - 1000*60*60*24*3);
    let touchedClasses = '';
    let createdClasses = '';


    let lastTouch;
    if (ticketData.fields['Last Change']) {
      lastTouch = new Date(ticketData.fields['Last Change']);
    } else {
      lastTouch = new Date(ticketData.fields['Created Date']);
    }
    if (lastTouch < twoAgo) { touchedClasses = 'warning'; }

    lastTouch = new Date(lastTouch.getTime() + Math.abs(lastTouch.getTimezoneOffset()*60000));
    lastTouch = (lastTouch.getMonth()+1) + '/' + lastTouch.getDate() + '/' + lastTouch.getFullYear();


    let createDate = new Date(ticketData.fields['Created Date']);
    if (createDate < weekAgo) { createdClasses = 'warning'; }
    createDate = new Date(createDate.getTime() + Math.abs(createDate.getTimezoneOffset()*60000));
    createDate = (createDate.getMonth()+1) + '/' + (createDate.getDate()) + '/' + createDate.getFullYear();



    return (
      <div className={"TicketItem " + classNames} onClick={()=>this.props.openTicketHandler(ticketData)}>
        {/* <a href={''} className="absLink"></a> */}
        <div className="inner">
          <div className="whiteCard">
            <div class="titleArea">
              <h3>{ticketData.fields['Company Name']}</h3>
              <p className={ticketData.fields['Rep'] ? 'boldText' : 'isHidden'}>Assigned to <span className={ticketData.fields['Rep']}>{ticketData.fields['Rep']}</span></p>
              <p id="created" className={createdClasses}>Created <span>{createDate}</span></p>
              <p id="touched" className={touchedClasses}>Touched <span>{lastTouch}</span></p>
            </div>

            <hr />

            <div className="accountLink">
              <p>{ticketData.fields['Ticket Issues']}</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
