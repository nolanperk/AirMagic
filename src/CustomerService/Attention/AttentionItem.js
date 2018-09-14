import React, { Component } from 'react';
import propTypes from 'prop-types';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';

export default class AttentionItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, attentionData } = this.props;


    if (this.props.rowName === 'newStart') {
      return (
        <div className="AttentionItem ArchiveItem" onClick={()=>this.props.openRecordHandler(attentionData.fields, attentionData.id, index)}>
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{attentionData.fields['Company Name']}</p>
            </div>
            <div className="subInfo">
              <p className="amount">Start Date:</p>
              <p className="rounded canc">{this.props.attentionData.fields['Start Date']}</p>
            </div>
          </div>
        </div>
      );
    } else if (this.props.rowName === 'newClose') {
      return (
        <div className="AttentionItem ArchiveItem" onClick={()=>this.props.openRecordHandler(attentionData.fields, attentionData.id, index)}>
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{attentionData.fields['Company Name']}</p>
            </div>
            <div className="subInfo">
              <p className="amount">{this.props.attentionData.fields['Times per Week']}Week in {this.props.attentionData.fields['City']}</p>
              <p className="rounded canc">{this.props.attentionData.fields['Monthly Amount']}</p>
            </div>
          </div>
        </div>
      );
    } else if (this.props.rowName === 'crew') {
      return (
        <div className="AttentionItem ArchiveItem" onClick={()=>this.props.openRecordHandler(attentionData.fields, attentionData.id, index)}>
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{attentionData.fields['Company Name']}</p>
            </div>
            <div className="subInfo">
              <p className="amount">Changed on:</p>
              <p className="rounded canc">{this.props.attentionData.fields['New SP Start']}</p>
            </div>
          </div>
        </div>
      );
    } else if (this.props.rowName === 'satisfied' || this.props.rowName === 'unhappy') {
      return (
        <div className="AttentionItem ArchiveItem" onClick={()=>this.props.openRecordHandler(attentionData.fields, attentionData.id, index)}>
          <div className="inner">
            <div className="whiteCard">
              <p className="boldText">{attentionData.fields['Company Name']}</p>
            </div>
            <div className="subInfo">
              <p className="amount">Last Call:</p>
              <p className="rounded canc">{this.props.attentionData.fields['Last Call']}</p>
            </div>
          </div>
        </div>
      );
    }
  }
  getSubInfo() {
    console.log(this.props.rowName);

  }
}
