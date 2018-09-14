import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProactiveItem from './ProactiveItem'
import Isotope from 'isotope-layout';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exportImg from '../../assets/icons/primary/export.png';
import hamburger from '../../assets/icons/white/hamburger.png';

export default class ProactiveView extends Component {

  componentDidMount() {
    this.gridLayout();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, proactiveData, data } = this.props;

    let allURL = '/' + this.props.citySet + '/customer-service/all';
    let attURL = '/' + this.props.citySet + '/customer-service/attention';


    return (
      <div className="ProactiveView">
        <div className="Navbar">
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} / Proactive</h4>
          <div className="rightButtons">
            <a href={allURL.replace('//', '/')} className="btn softGrad--secondary" onClick={this.props.changeAlt} id="browseAll">All Records</a>
            <a href={attURL.replace('//', '/')} className="btn softGrad--primary" onClick={this.props.changeAlt} id="proactive">Needs Attention</a>
          </div>
        </div>

        <div className="attentionContainer">
          <div className="rowItems">
            {this.props.data ? this.props.data.map((e, i) => this.proactiveRowBiWeekly(e, i)) : ''}
          </div>
        </div>
      </div>
    );
  }
  proactiveRowBiWeekly(data, index) {
    return <ProactiveItem
      proactiveData={data}
      rowName='twicePerMonth'
      key={data.id}
      index={index}
      openRecordHandler={this.props.openRecordHandler}
    />
  }


    gridLayout() {
      setTimeout(function(){
        var elem = document.querySelector('.rowItems');
        var iso = new Isotope( elem, {itemSelector: '.ProactiveItem'});
      }, 100);
    }
}
