import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import edit from '../assets/icons/white/edit.png';
import phone from '../assets/icons/white/phone.png';
import email from '../assets/icons/white/email.png';
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
            <div className={this.props.allCallbacks.newLeads ? "listCol" : "listCol hideCol"}>
              <p>New Leads</p>
              <div className="inner">
                {this.props.allCallbacks.newLeads ? this.props.allCallbacks.newLeads.map((e) => this.callItem(e, 'new')) : ''}
              </div>
            </div>
            <div className={this.props.allCallbacks.preMeeting ? "listCol" : "listCol hideCol"}>
              <p>Ongoing Followups</p>
              <div className="inner">
                {this.props.allCallbacks.preMeeting ? this.props.allCallbacks.preMeeting.map((e) => this.callItem(e, 'ongoing')) : ''}
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
                {this.props.allCallbacks.fddCalls ? this.props.allCallbacks.fddCalls.map((e) => this.callItem(e, 'postMeeting')) : ''}
              </div>
            </div>

            <div className="listCol">
              <p>Ongoing Followups</p>
              <div className="inner">
                {this.props.allCallbacks.apptLetter ? this.props.allCallbacks.apptLetter.map((e) => this.callItem(e, 'postMeeting')) : ''}
                {this.props.allCallbacks.ongoing ? this.props.allCallbacks.ongoing.map((e) => this.callItem(e, 'postMeeting')) : ''}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  meetingItem(item) {

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
            <div className="btn softGrad--secondary" onClick={() => { this.props.showModal(item, 'meeting--Yes', item.region) }}>Yes</div>
            <div className="btn softGrad--primary" onClick={() => { this.props.showModal(item, 'meeting--No', item.region) }}>No</div>
          </div>
        </div>
      );
    }


  }

  recentItem(item) {


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

  newItem(item) {
    let itemClass = 'callItem';

    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    let itemCallDate;

    if (item.fields['Contact Date']) {
      itemCallDate = new Date(item.fields['Contact Date']);
      itemCallDate = new Date(itemCallDate.getTime() + Math.abs(itemCallDate.getTimezoneOffset()*60000)); //fix the date
      itemCallDate = (itemCallDate.getMonth()+1) + '/' + itemCallDate.getDate() + '/' + itemCallDate.getFullYear();
    }

    return(
      <div className={itemClass} data-date={itemCallDate}>
        <div className="absLink" onClick={() => { this.props.showModal(item, 'call', item.region) }}></div>
        <div className="companyData">
          <div className="innerCompany">
            <p>{item.fields['Source'] ? item.fields['Source'] : ''}{itemCallDate ? ' (' + itemCallDate + ')' : ''}</p>
            <h4>{item.fields['SP Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }
  callItem(item, type) {
    let itemClass = 'callItem';

    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    let itemCallDate;

    if (type === 'new') {
      if (item.fields['Contact Date']) {
        itemCallDate = new Date(item.fields['Contact Date']);
        itemCallDate = new Date(itemCallDate.getTime() + Math.abs(itemCallDate.getTimezoneOffset()*60000)); //fix the date
        itemCallDate = (itemCallDate.getMonth()+1) + '/' + itemCallDate.getDate() + '/' + itemCallDate.getFullYear();
      }
    } else {
      if (item.fields['Last Touch']) {
        itemCallDate = new Date(item.fields['Last Touch']);
        itemCallDate = new Date(itemCallDate.getTime() + Math.abs(itemCallDate.getTimezoneOffset()*60000)); //fix the date
        itemCallDate = (itemCallDate.getMonth()+1) + '/' + itemCallDate.getDate() + '/' + itemCallDate.getFullYear();
      }
    }



    let today = new Date();
    today = new Date(today.getTime() + Math.abs(today.getTimezoneOffset()*60000)); //fix the date
    today = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear();

    let calledDate;
    if (item.fields['Called']) {
      calledDate = new Date(item.fields['Called']);
      calledDate = new Date(calledDate.getTime() + Math.abs(calledDate.getTimezoneOffset()*60000)); //fix the date
      calledDate = (calledDate.getMonth()+1) + "/" + calledDate.getDate()  + "/" + calledDate.getFullYear();
    }
    let emailedDate;
    if (item.fields['Emailed']) {
      emailedDate = new Date(item.fields['Emailed']);
      emailedDate = new Date(emailedDate.getTime() + Math.abs(emailedDate.getTimezoneOffset()*60000)); //fix the date
      emailedDate = (emailedDate.getMonth()+1) + "/" + emailedDate.getDate()  + "/" + emailedDate.getFullYear();
    }
    let textedDate;
    if (item.fields['Texted']) {
      textedDate = new Date(item.fields['Texted']);
      textedDate = new Date(textedDate.getTime() + Math.abs(textedDate.getTimezoneOffset()*60000)); //fix the date
      textedDate = (textedDate.getMonth()+1) + "/" + textedDate.getDate()  + "/" + textedDate.getFullYear();
    }

    let callRow = 'call contType';
    if (today === calledDate) {
      callRow += ' isComplete';
      console.log(item);
    }

    let emailRow = 'email contType';
    if (today === emailedDate) {
      emailRow += ' isComplete';
    }

    let textRow = 'text contType';
    if (today === textedDate) {
      textRow += ' isComplete';
    }


    if (today === calledDate && today === emailedDate && today === textedDate) {
      itemClass = 'callItem isComplete';
    }


    return(
      <div className={itemClass} data-date={itemCallDate}>
        <div className="absLink" onClick={() => { this.props.showModal(item, 'call', item.region) }}></div>
        <div className="companyData">
          <div className="innerCompany">
            <p class={type === 'new' ? '' : 'isHidden'}>{item.fields['Source'] ? item.fields['Source'] : ''}{itemCallDate ? ' (' + itemCallDate + ')' : ''}</p>
            <p class={type === 'new' ? 'isHidden' : ''}>{item.fields['City'] ? item.fields['City'] : ''}{itemCallDate ? ' (' + itemCallDate + ')' : ''}</p>
            <h4>{item.fields['SP Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <Link target="_blank" to={'/' + item.region + '/franchisees/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>


        <div className="contactStatus">
          <div className={callRow}><img src={phone} alt="call" /></div>
          <div className={emailRow}><img src={email} alt="email" /></div>
          <div className={textRow}><img src={edit} alt="text" /></div>
        </div>
      </div>
    )
  }
}
