import React, { Component } from 'react';
import propTypes from 'prop-types';

import completed from '../../assets/icons/emoji/check.png';
import veryHappy from '../../assets/icons/emoji/very-happy.png';
import happy from '../../assets/icons/emoji/happy.png';
import newCustomer from '../../assets/icons/emoji/new-customer.png';
import satisfied from '../../assets/icons/emoji/satisfied.png';
import unhappy from '../../assets/icons/emoji/unhappy.png';
import crewChange from '../../assets/icons/emoji/crew-change.png';


export default class ArchiveItem extends Component {


  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    let classNames = "ArchiveItem";
    let subContent;

    if (data['Status'] === 'Prospect') {
      classNames += " isActive tele crew";
    } else if (data['Status'] === 'APPC') {
      classNames += " isActive tele new";
    } else if (data['Status'] === 'Closed') {
      classNames += " isActive tele very";
    } else if (data['Status'] === 'Canceled') {
      classNames += " nonActive tele satisfied";
    } else {
      classNames += ' nonActive';
    }


    return (
      <div className={classNames} onClick={()=>this.props.openRecordHandler(data, this.props.id, index)} key={this.props.id} index={this.props.index} data={data}>
        {this.cardContent}
      </div>
    );
  }
  get cardContent() {
    const { index, data } = this.props;

    let standingImg;

    if (data['Status'] === 'Prospect') {
      let prospectSubContent;
      if (this.props.data['Callback Date']) {
        return (
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{data['Company Name']}</p>
              <p className="smallText">
                <span>{data['Status']}</span>
              </p>
            </div>
            <div className="subInfo">
              <p className="amount">Callback Date:</p>
              <p className="rounded canc">{this.props.data['Callback Date']}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{data['Company Name']}</p>
              <p className="smallText">
                <span>{data['Status']}</span>
              </p>
            </div>
            <div className="subInfo">
              <p className="amount">Recent Call:</p>
              <p className="rounded canc">{this.props.data['Recent Call Date']}</p>
            </div>
          </div>
        );
      }
    } else if (data['Status'] === 'APPC') {
     return (
       <div className="inner">
         <div className="whiteCard">
           <p className="boldText">{data['Company Name']}</p>
           <span>{data['Status']}</span>
         </div>
         <div className="subInfo">
           <p className="amount">Proposal:</p>
           <p className="rounded appc">{this.props.data['Proposal Date']}</p>
         </div>
       </div>
     )
    } else if (data['Status'] === 'Closed') {
      let regRep = '';
      if (data['Sales Rep']) {
        regRep = data['Sales Rep'].replace(/ .*/,'');
       }
      return (
        <div className="inner">
          <div className="whiteCard">
            <p className="boldText">{data['Company Name']}</p>
            <p className="smallText">
              <span>{data['Status']}</span>
            </p>
          </div>
          <div className="subInfo">
            <p className="amount">${data['Monthly Amount']}</p>
            <p className="rounded pam">{regRep}</p>
          </div>
        </div>
      );
    } else if (data['Status'] === 'Canceled') {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['Company Name']}</p>
             <p className="smallText">
               <span>{data['Standing']}</span>
             </p>
           </div>
           <div className="subInfo">
             <p className="amount">Canceled:</p>
             <p className="rounded canc">{this.props.data['Cancel Date']}</p>
           </div>
         </div>
       );
    } else if (data['Status'] === 'DNC') {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['Company Name']}</p>
           </div>
           <div className="subInfo">
             <p className="amount">DO NOT CALL</p>
           </div>
         </div>
       )
    } else {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['Company Name']}</p>
             <p className="smallText">
               <span>{data['Standing']}</span>
             </p>
           </div>
         </div>
       );
    }
  }
}


ArchiveItem.propTypes ={
  openRecordHandler: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  data: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
}
