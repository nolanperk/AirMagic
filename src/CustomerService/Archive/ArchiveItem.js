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
    if (data['Status'] === 'Active') {
      classNames += " isActive";

      if (data['Standing'] === 'Very Happy') {
        classNames += ' very';
      } else if (data['Standing'] === 'Happy') {
        classNames += ' happy';
      } else if (data['Standing'] === 'Satisfied') {
        classNames += ' satisfied';
      } else if (data['Standing'] === 'Unhappy') {
        classNames += ' unhappy';
      } else if (data['Standing'] === 'Crew Change') {
        classNames += ' crew';
      } else if (data['Standing'] === 'New Customer') {
        classNames += ' new';
      } else if (data['Standing'] === 'Completed Work') {
      }
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
    if (data['Status'] === 'Active') {
      if (data['Standing'] === 'Very Happy') {
        standingImg = veryHappy;
      } else if (data['Standing'] === 'Happy') {
        standingImg = happy;
      } else if (data['Standing'] === 'Satisfied') {
        standingImg = satisfied;
      } else if (data['Standing'] === 'Unhappy') {
        standingImg = unhappy;
      } else if (data['Standing'] === 'Crew Change') {
        standingImg = crewChange;
      } else if (data['Standing'] === 'New Customer') {
        standingImg = newCustomer;
      } else if (data['Standing'] === 'Completed Work') {
        standingImg = completed;
      }

      let regPam = '';
      if (data['PAM']) {
        regPam = data['PAM'].replace(/ .*/,'');
       }
      return (
        <div className="inner">
          <div className="whiteCard">
            <p className="boldText">{data['Company Name']}</p>
            <p className="smallText">
              <img src={standingImg} alt={data['Standing']} />
              <span>{data['Standing']}</span>
            </p>
          </div>
          <div className="subInfo">
            <p className="amount">${data['Monthly Amount']}</p>
            <p className="rounded pam">{regPam}</p>
          </div>
        </div>
      );
    } else if (data['Status'] === 'Canceled') {
     return (
       <div className="inner">
         <div className="whiteCard">
           <p className="boldText">{data['Company Name']}</p>
         </div>
         <div className="subInfo">
           <p className="amount">Canceled:</p>
           <p className="rounded canc">{this.props.data['Cancel Date']}</p>
         </div>
       </div>
     )
    } else if (data['Status'] === 'APPC') {
     return (
       <div className="inner">
         <div className="whiteCard">
           <p className="boldText">{data['Company Name']}</p>
         </div>
         <div className="subInfo">
           <p className="amount">APPC:</p>
           <p className="rounded appc">{this.props.data['Proposal Date']}</p>
         </div>
       </div>
     )
    } else if (data['Status'] === 'Additional') {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['Company Name']}</p>
           </div>
           <div className="subInfo">
             <p className="rounded appc">Additional</p>
           </div>
         </div>
       )
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
    }
  }
}


ArchiveItem.propTypes ={
  openRecordHandler: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  data: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
}
