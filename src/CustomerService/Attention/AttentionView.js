import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AttentionItem from './AttentionItem'
import Isotope from 'isotope-layout';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exportImg from '../../assets/icons/primary/export.png';
import hamburger from '../../assets/icons/white/hamburger.png';

export default class AttentionView extends Component {

  componentDidMount() {
    this.gridLayout();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, attentionData } = this.props;

    let allURL = '/' + this.props.citySet + '/customer-service/all';
    let proURL = '/' + this.props.citySet + '/customer-service/proactive';
    let visURL = '/' + this.props.citySet + '/customer-service/visit';


    return (
      <div className="AttentionView">
        <div className="Navbar">
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} / Needs Attention</h4>
          <div className="rightButtons">
            <a href={allURL.replace('//', '/')} className="btn softGrad--secondary" onClick={this.props.changeAlt} id="browseAll">All Records</a>
            <a href={proURL.replace('//', '/')} className="btn softGrad--blue" onClick={this.props.changeAlt} id="proactive">Proactives</a>
            <a href={visURL.replace('//', '/')} className="btn softGrad--black" onClick={this.props.changeAlt} id="vis">Visits</a>
          </div>
        </div>

        <div className="attentionContainer">
          {this.props.startsLength > 0 ? <h4 className="hrTitle"><span>Recent Starts</span></h4> : ''}
          <div className="rowItems newStarts">
            {this.props.attentionData['newStart'] ? this.props.attentionData['newStart'].map((e, i) => this.attentionRowStart(e, i)) : ''}
          </div>

          {this.props.closeLength > 0 ? <h4 className="hrTitle"><span>New Closes</span></h4> : ''}
          <div className="rowItems newCloses">
            {this.props.attentionData['newClose'] ? this.props.attentionData['newClose'].map((e, i) => this.attentionRowClose(e, i)) : ''}
          </div>

          {this.props.crewLength > 0 ? <h4 className="hrTitle"><span>Crew Changes</span></h4> : ''}
          <div className="rowItems crewChanges">
            {this.props.attentionData['crew'] ? this.props.attentionData['crew'].map((e, i) => this.attentionRowCrew(e, i)) : ''}
          </div>

          {this.props.unhappyLength > 0 ? <h4 className="hrTitle"><span>Unhappy Customers</span></h4> : ''}
          <div className="rowItems notHappy">
            {this.props.attentionData['unhappy'] ? this.props.attentionData['unhappy'].map((e, i) => this.attentionRowUnhappy(e, i)) : ''}
          </div>

          {this.props.satisfiedLength > 0 ? <h4 className="hrTitle"><span>Satisfied Customers</span></h4> : ''}
          <div className="rowItems mehAccounts">
            {this.props.attentionData['satisfied'] ? this.props.attentionData['satisfied'].map((e, i) => this.attentionRowSatisfied(e, i)) : ''}
          </div>
        </div>
      </div>
    );
  }

  attentionRowStart(attentionData, index) {
    return <AttentionItem
      attentionData={attentionData}
      rowName='newStart'
      key={attentionData.id}
      openRecordHandler={this.props.openRecordHandler}
    />
  }
  attentionRowClose(attentionData, index) {
    return <AttentionItem
            attentionData={attentionData}
            rowName='newClose'
            key={attentionData.id}
            openRecordHandler={this.props.openRecordHandler}
          />
  }
  attentionRowCrew(attentionData, index) {
    return <AttentionItem
      attentionData={attentionData}
      rowName='crew'
      key={attentionData.id}
      openRecordHandler={this.props.openRecordHandler}
    />
  }
  attentionRowSatisfied(attentionData, index) {
    return <AttentionItem
            attentionData={attentionData}
            rowName='satisfied'
            key={attentionData.id}
            openRecordHandler={this.props.openRecordHandler}
          />
  }
  attentionRowUnhappy(attentionData, index) {
    return <AttentionItem
            attentionData={attentionData}
            rowName='unhappy'
            key={attentionData.id}
            openRecordHandler={this.props.openRecordHandler}
          />
  }


  //
  // gridLayout() {
  //   setTimeout(function(){
  //     var elem = document.querySelector('.rowItems');
  //     var iso = new Isotope( elem, {itemSelector: '.AttentionItem'});
  //   }, 100);
  // }
  //
  //



  gridLayout() {
    let getRows = document.getElementsByClassName('rowItems');
    setTimeout(function(){
      for (var i in getRows) {
        var elem = getRows[i];
        var iso = new Isotope( elem, {itemSelector: '.AttentionItem'});
      }
    }, 100);
  }
}
