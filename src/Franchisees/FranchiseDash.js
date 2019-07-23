import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/primary/search.png';
import loader from '../assets/loader.gif';
import plus from '../assets/icons/white/plus.png';
import popout from '../assets/icons/popout.png';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];

export default class FranchiseDash extends Component {

  render() {
    return (
      <div className="FranchiseDash">
        <div className="navBar">
          <Link to={`/`}>
            <div className="navIcon softGrad--black">
              <img src={hamburger} alt="databases" />
            </div>
          </Link>

          <div className="navIcon softGrad--secondary" id="add">
            <img src={plus} alt="databases" />
          </div>

          <div className="navIcon whiteCard" id="search">
            <img src={search} alt="databases" />
          </div>
        </div>

        <div className="preMeeting">
          <div className="titleArea">
            <h4>Potentials</h4>
          </div>
          <div className="listArea">
            <div className={this.props.allCallbacks.preMeeting ? "listCol" : "listCol hideCol"}>
              <p>Pre-Meeting</p>
              <div className="inner">
                {this.props.allCallbacks.preMeeting ? this.props.allCallbacks.preMeeting.map((e) => this.callItem(e)) : ''}
              </div>
            </div>
            <div className={this.props.allCallbacks.newLeads ? "listCol" : "listCol hideCol"}>
              <p>New Leads</p>
              <div className="inner">
                {this.props.allCallbacks.newLeads ? this.props.allCallbacks.newLeads.map((e) => this.callItem(e)) : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="meetingList">
          <div className="titleArea">
            <h4>Meetings</h4>
          </div>
          <div className="listArea">
            {this.props.meetings ? this.props.meetings.map((e) => this.meetingItem(e)) : ''}
          </div>
        </div>

        <div className="postMeeting">
          <div className="titleArea">
            <h4>Post-Meeting</h4>
          </div>
          <div className="listArea">
            <div className="listCol">
              <p>FDD Callbacks</p>
              <div className="inner">
                {this.props.allCallbacks.fddCalls ? this.props.allCallbacks.fddCalls.map((e) => this.callItem(e)) : ''}
              </div>
            </div>

            <div className="listCol">
              <p>Ongoing Followups</p>
              <div className="inner">
                {this.props.allCallbacks.apptLetter ? this.props.allCallbacks.apptLetter.map((e) => this.callItem(e)) : ''}
                {this.props.allCallbacks.ongoing ? this.props.allCallbacks.ongoing.map((e) => this.callItem(e)) : ''}
              </div>
            </div>

          </div>
        </div>

        <div className="recentCalls">
          <div className="titleArea">
            <h4>Today's Calls</h4>
          </div>
          <div className="listArea">
            {this.props.todays ? this.props.todays.map((e) => this.recentItem(e)) : ''}
          </div>
        </div>
      </div>
    );
  }

  meetingItem(item) {
    console.log(item);

    let itemClass = 'meetingItem';

    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    let itemCallDate;

    if (item.fields['Attended'] === 'Yes') {
      return(
        <div className='meetingItem answered' data-date={itemCallDate}>
          <div className="companyData">
            <div className="innerCompany">
              <p>{item.fields['City']}</p>
              <h4>{item.fields['SP Name']}</h4>
            </div>
            <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          </div>

          <div className="buttons attendedYes">
            <p>Attended</p>
          </div>
        </div>
      )
    } else if (item.fields['Attended'] === 'No') {
      return(
        <div className='meetingItem answered' data-date={itemCallDate}>
          <div className="companyData">
            <div className="innerCompany">
              <p>{item.fields['City']}</p>
              <h4>{item.fields['SP Name']}</h4>
            </div>
            <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          </div>

          <div className="buttons">
            <p>No Show</p>
          </div>
        </div>
      )
    } else {
      return(
        <div className='meetingItem' data-date={itemCallDate}>
          <div className="companyData">
            <div className="innerCompany">
              <p>{item.fields['City']}</p>
              <h4>{item.fields['SP Name']}</h4>
            </div>
            <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
          </div>

          <div className="buttons">
            <p>Attended?</p>
            <div className="btn softGrad--secondary" onClick={() => { this.props.showModal(item, 'call', item.region) }}>Yes</div>
            <div className="btn softGrad--primary" onClick={() => { this.props.showModal(item, 'call', item.region) }}>No</div>
          </div>
        </div>
      )
    }


  }

  recentItem(item) {
    console.log(item);


    return(
      <div className='recentItem'>
        <div className="companyData">
          <div className="innerCompany">
            <p>{item.fields['City']}</p>
            <h4>{item.fields['SP Name']}</h4>
          </div>
          <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }

  callItem(item) {
    console.log(item);

    let itemClass = 'callItem';

    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    let itemCallDate;

    if (item.fields['Last Touch']) {
      itemCallDate = new Date(item.fields['Last Touch']);
      itemCallDate = new Date(itemCallDate.getTime() + Math.abs(itemCallDate.getTimezoneOffset()*60000)); //fix the date
      itemCallDate = (itemCallDate.getMonth()+1) + '/' + itemCallDate.getDate() + '/' + itemCallDate.getFullYear();

      if (itemCallDate === todaysDate) {
        itemClass += ' called';
      }
    }

    return(
      <div className={itemClass} data-date={itemCallDate}>
        <div className="absLink" onClick={() => { this.props.showModal(item, 'call', item.region) }}></div>
        <div className="companyData">
          <div className="innerCompany">
            <p>{item.fields['City']}</p>
            <h4>{item.fields['SP Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }
}
