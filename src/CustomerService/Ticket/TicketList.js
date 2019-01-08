import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TicketItem from './TicketItem'
import Isotope from 'isotope-layout';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exportImg from '../../assets/icons/primary/export.png';
import hamburger from '../../assets/icons/white/hamburger.png';

export default class TicketList extends Component {

  componentDidMount() {
    this.gridLayout();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, ticketData, data } = this.props;


    return (
      <div className="TicketList">
        <div className="btn softGrad--black addNewTicket" onClick={this.props.addTicket}>Add New Ticket</div>

        <div className="ticketContainer">


          {this.props.ticketData['created'].length > 0 ? <h4 className="hrTitle created"><span>New Tickets</span></h4> : ''}
          <div className={this.props.ticketData['created'].length > 0 ? "rowItems created" : "noItems"}>
            {this.props.ticketData['created'] ? this.props.ticketData['created'].map((e, i) => this.ticketRowCreated(e, i)) : ''}
          </div>

          {this.props.ticketData['moreIssues'].length > 0 ? <h4 className="hrTitle moreIssues"><span>More Issues / Not Fixed by SP</span></h4> : ''}
          <div className={this.props.ticketData['moreIssues'].length > 0 ? "rowItems moreIssues" : "noItems"}>
            {this.props.ticketData['moreIssues'] ? this.props.ticketData['moreIssues'].map((e, i) => this.ticketRowMore(e, i)) : ''}
          </div>

          {this.props.ticketData['fixedBySP'].length > 0 ? <h4 className="hrTitle fixedBySP"><span>Fixed According to Franchise</span></h4> : ''}
          <div className={this.props.ticketData['fixedBySP'].length > 0 ? "rowItems fixedBySP" : "noItems"}>
            {this.props.ticketData['fixedBySP'] ? this.props.ticketData['fixedBySP'].map((e, i) => this.ticketRowFixed(e, i)) : ''}
          </div>

          {this.props.ticketData['sentToSP'].length > 0 ? <h4 className="hrTitle sentToSP"><span>Problems Relayed to SP</span></h4> : ''}
          <div className={this.props.ticketData['sentToSP'].length > 0 ? "rowItems sentToSP" : "noItems"}>
            {this.props.ticketData['sentToSP'] ? this.props.ticketData['sentToSP'].map((e, i) => this.ticketRowSent(e, i)) : ''}
          </div>

          {this.props.ticketData['resolved'].length > 0 ? <h4 className="hrTitle resolved"><span>Resolved Tickets</span></h4> : ''}
          <div className={this.props.ticketData['resolved'].length > 0 ? "rowItems resolved" : "noItems"}>
            {this.props.ticketData['resolved'] ? this.props.ticketData['resolved'].map((e, i) => this.ticketRowResolved(e, i)) : ''}
          </div>

        </div>
      </div>
    );
  }


  ticketRowCreated(ticketData, index) {
    return <TicketItem
      citySet={this.props.citySet}
      ticketData={ticketData}
      rowName='created'
      key={ticketData.id}
      openTicketHandler={this.props.openTicketHandler}
    />
  }
  ticketRowSent(ticketData, index) {
    return <TicketItem
      citySet={this.props.citySet}
      ticketData={ticketData}
      rowName='sentToSP'
      key={ticketData.id}
      openTicketHandler={this.props.openTicketHandler}
    />
  }
  ticketRowFixed(ticketData, index) {
    return <TicketItem
      citySet={this.props.citySet}
      ticketData={ticketData}
      rowName='fixedBySP'
      key={ticketData.id}
      openTicketHandler={this.props.openTicketHandler}
    />
  }
  ticketRowResolved(ticketData, index) {
    return <TicketItem
      citySet={this.props.citySet}
      ticketData={ticketData}
      rowName='resolved'
      key={ticketData.id}
      openTicketHandler={this.props.openTicketHandler}
    />
  }
  ticketRowMore(ticketData, index) {
    return <TicketItem
      citySet={this.props.citySet}
      ticketData={ticketData}
      rowName='moreIssues'
      key={ticketData.id}
      openTicketHandler={this.props.openTicketHandler}
    />
  }


  gridLayout() {
    let getRows = document.getElementsByClassName('rowItems');
    setTimeout(function(){
      for (var i in getRows) {
        var elem = getRows[i];
        var iso = new Isotope( elem, {itemSelector: '.TicketItem'});
      }
    }, 100);
  }
}
