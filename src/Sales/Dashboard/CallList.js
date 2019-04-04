import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';
import { Link } from 'react-router-dom';

// import ArchiveItem from './ArchiveItem';
import popout from '../../assets/icons/popout.png';


export default class CallList extends Component {
  constructor(props) {
    super();
    this.state = {
      generatedView: 'tampa',
    }
  }

  switchActive = e => {
    if (e.target.id === 'cold-tampa') {
      this.setState ({
        generatedView: 'tampa'
      })
    } else {
      this.setState ({
        generatedView: 'orlando'
      })
    }
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { orlandoCallbacks, tampaCallbacks, tampaRecentAPPC, orlandoRecentAPPC, allGenerated, tampaOldAPPC, orlandoOldAPPC } = this.props;

    let totalCallbacks = tampaCallbacks.length + orlandoCallbacks.length;
    let totalAPPCs = tampaRecentAPPC.length + orlandoRecentAPPC.length;
    let totalTampa = allGenerated.tampa.length;
    let totalOrlando = allGenerated.orlando.length;


    let tampaSelect = '';
    let orlandoSelect = '';
    if (this.state.generatedView === 'tampa') {
      tampaSelect = 'isActive';
    } else {
      orlandoSelect = 'isActive';
    }

    return (
      <div className="CallListContainer">
        <div className="CallList">
          <div className="leftCol">
            <div className="CallListBox">
              <h4>Callbacks <span>{totalCallbacks}</span></h4>

              {tampaCallbacks.length > 0 ?   <p>Tampa</p> : ''}
              {tampaCallbacks ? tampaCallbacks.map((e, i) => this.callItem(e, 'tampa')) : ''}

              {orlandoCallbacks.length > 0 ? <p>Orlando</p> : ''}
              {orlandoCallbacks ? orlandoCallbacks.map((e, i) => this.callItem(e, 'orlando')) : ''}
            </div>

            <div className="CallListBox">
              <h4>Your Old Proposals <span>{totalAPPCs}</span></h4>

              {tampaRecentAPPC.length > 0 ?   <p>Tampa</p> : ''}
              {tampaRecentAPPC ? tampaRecentAPPC.map((e, i) => this.callItem(e, 'tampa')) : ''}

              {orlandoRecentAPPC.length > 0 ? <p>Orlando</p> : ''}
              {orlandoRecentAPPC ? orlandoRecentAPPC.map((e, i) => this.callItem(e, 'orlando')) : ''}
            </div>



            <div className="CallListBox">
              <h4>Older Proposals <span>{totalAPPCs}</span></h4>

              {tampaOldAPPC.length > 0 ?   <p>Tampa</p> : ''}
              {tampaOldAPPC ? tampaOldAPPC.map((e, i) => this.callItem(e, 'tampa')) : ''}

              {orlandoOldAPPC.length > 0 ? <p>Orlando</p> : ''}
              {orlandoOldAPPC ? orlandoOldAPPC.map((e, i) => this.callItem(e, 'orlando')) : ''}
            </div>
          </div>

          <div className="rightCol">
            <div className="CallListBox FullList">
              <h4>Cold Calls</h4>
              <p className="cold-select">
                <span id="cold-tampa" className={tampaSelect} onClick={this.switchActive}>Tampa <em>{this.props.tampaCalled}/{totalTampa}</em></span>
                <span id="cold-orlando" className={orlandoSelect} onClick={this.switchActive}>Orlando <em>{this.props.orlandoCalled}/{totalOrlando}</em></span>
              </p>
              <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa ? allGenerated.tampa.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando ? allGenerated.orlando.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
            </div>
          </div>
        </div>
      </div>
    );

  }
  callItem(item, citySet) {
    return(
      <div className="callItem">
        <div className="companyData">
          <div className="innerCompany">
            <p>{item.fields['Standing']}</p>
            <h4>{item.fields['Company Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <div className="btn softGrad--secondary" onClick={() => { this.props.showModal(item, 'call', citySet) }}>Call</div>
          <Link target="_blank" to={'/' + citySet + '/sales/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }
  callItemQualify(item, citySet) {
    let itemClass = 'callItem';

    let todaysDate  = new Date();  todaysDate = (todaysDate.getMonth()+1) + '/' + todaysDate.getDate() + '/' + todaysDate.getFullYear();
    let itemCallDate;


    if (item.fields['Recent Call Date']) {
      itemCallDate = new Date(item.fields['Recent Call Date']);
      itemCallDate = new Date(itemCallDate.getTime() + Math.abs(itemCallDate.getTimezoneOffset()*60000)); //fix the date
      itemCallDate = (itemCallDate.getMonth()+1) + '/' + itemCallDate.getDate() + '/' + itemCallDate.getFullYear();

      if (itemCallDate === todaysDate) {
        itemClass += ' called';
      }
    }
    return(
      <div className={itemClass} data-date={itemCallDate}>
        <div className="companyData">
          <div className="innerCompany">
            <p>{item.fields['Standing']}</p>
            <h4>{item.fields['Company Name']}</h4>
          </div>
        </div>

        <div className="buttons">
          <div className="btn softGrad--blue" onClick={() => { this.props.showModal(item, 'qualify', citySet) }}>Qualify</div>
          <div className="btn softGrad--secondary" onClick={() => { this.props.showModal(item, 'call', citySet) }}>Call</div>
          <Link target="_blank" to={'/' + citySet + '/sales/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }
}
