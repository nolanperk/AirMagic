import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProactiveItem from './ProactiveItem'
import Isotope from 'isotope-layout';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exportImg from '../../assets/icons/primary/export.png';
import hamburger from '../../assets/icons/white/hamburger.png';

import CustomerDashNav from '../CustomerDashNav'
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
    let visURL = '/' + this.props.citySet + '/customer-service/visit';


    return (
      <div className="ProactiveView">
        <div className="Navbar SplashBar">
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4><span>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} Dashboard</span> <br /> Proactive Call List</h4>
        </div>

        <div className="attentionContainer">
          <div className="rowItems">
            {this.props.data ? this.props.data.map((e, i) => this.proactiveRowBiWeekly(e, i)) : ''}
          </div>
        </div>

        <CustomerDashNav
          searchHandler={this.props.searchHandler}
          splashSelect={this.props.splashSelect}
          pathName={this.props.pathname}
          citySet={this.props.citySet}
          pathName={this.props.pathName}
          loadProactiveData={this.props.loadProactiveData}
        />
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
