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
      classNames += " isActive tele very";
    } else if (data['Status'] === 'Prospect') {
      classNames += " isActive tele new";
    } else if (data['Status'] === 'Old') {
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
      return (
        <div className="inner">
          <div className="whiteCard">
            <p className="boldText">{data['SP Name']}</p>
            <p className="smallText">
              <span>{data['Status']}</span>
            </p>
          </div>
          <div className="subInfo">
            <p className="amount">Contact On:</p>
            <p className="rounded canc">{this.props.data['Contact Date']}</p>
          </div>
        </div>
      );
    } else if (data['Status'] === 'Active') {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['SP Name']}</p>
             <span>{data['Status']}</span>
           </div>
           <div className="subInfo">
             <p className="amount">Volume Due:</p>
             <p className="rounded appc">{this.props.data['Volume Due Date']}</p>
           </div>
         </div>
       )
     } else if (data['Status'] === 'Old') {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['SP Name']}</p>
           </div>
           <div className="subInfo">
             <p className="amount">Old SP</p>
           </div>
         </div>
       );
    } else {
       return (
         <div className="inner">
           <div className="whiteCard">
             <p className="boldText">{data['SP Name']}</p>
           </div>
           <div className="subInfo">
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
