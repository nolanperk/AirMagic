import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VisitItem from './VisitItem'
import Isotope from 'isotope-layout';

import CustomerDashNav from '../CustomerDashNav'
import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exportImg from '../../assets/icons/primary/export.png';
import hamburger from '../../assets/icons/white/hamburger.png';

export default class VisitView extends Component {

  componentDidMount() {
    this.gridLayout();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, visitData, data } = this.props;

    let allURL = '/' + this.props.citySet + '/customer-service/all';
    let attURL = '/' + this.props.citySet + '/customer-service/attention';
    let proURL = '/' + this.props.citySet + '/customer-service/proactive';


    return (
      <div className="VisitView">
        <div className="Navbar SplashBar">
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4><span>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} Dashboard</span> <br /> Proactive Visits</h4>
        </div>


        <div className="attentionContainer">
          {this.props.needsVisit > 0 ? <h4 className="hrTitle"><span>Visited over 1 Month Ago</span></h4> : ''}
          <div className="rowItems needsVisit">
            {this.props.visitData['needsVisit'] ? this.props.visitData['needsVisit'].map((e, i) => this.visitRowNeed(e, i)) : ''}
          </div>

          {this.props.upcomingVisit > 0 ? <h4 className="hrTitle"><span>Visited over 2 weeks ago</span></h4> : ''}
          <div className="rowItems upcomingVisit">
            {this.props.visitData['upcomingVisit'] ? this.props.visitData['upcomingVisit'].map((e, i) => this.visitRowUpcoming(e, i)) : ''}
          </div>


          {this.props.noNeed > 0 ? <h4 className="hrTitle"><span>Visited Recently</span></h4> : ''}
          <div className="rowItems newNoNeed">
            {this.props.visitData['noNeed'] ? this.props.visitData['noNeed'].map((e, i) => this.visitRowNoNeed(e, i)) : ''}
          </div>

        </div>

        <CustomerDashNav
          searchHandler={this.props.searchHandler}
          splashSelect={this.props.splashSelect}
          pathName={this.props.pathname}
          citySet={this.props.citySet}
          pathName={this.props.pathName}
          loadAttentionData={this.props.loadAttentionData}
        />
      </div>
    );
  }

  visitRowNoNeed(visitData, index) {
    return <VisitItem
      visitData={visitData}
      rowName='noNeed'
      key={visitData.id}
      openRecordHandler={this.props.openRecordHandler}
    />
  }
  visitRowNeed(visitData, index) {
    return <VisitItem
            visitData={visitData}
            rowName='needsVisit'
            key={visitData.id}
            openRecordHandler={this.props.openRecordHandler}
          />
  }
  visitRowUpcoming(visitData, index) {
    return <VisitItem
      visitData={visitData}
      rowName='upcomingVisit'
      key={visitData.id}
      openRecordHandler={this.props.openRecordHandler}
    />
  }


    gridLayout() {
      let getRows = document.getElementsByClassName('rowItems');
      setTimeout(function(){
        for (var i in getRows) {
          var elem = getRows[i];
          var iso = new Isotope( elem, {itemSelector: '.VisitItem'});
        }
      }, 100);
    }
}
