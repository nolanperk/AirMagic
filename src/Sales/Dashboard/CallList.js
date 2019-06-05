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

    let totalCallbacks = tampaCallbacks.reminder.length + tampaCallbacks.hot.length + orlandoCallbacks.reminder.length + orlandoCallbacks.hot.length ;
    let totalHot = tampaCallbacks.hot.length + orlandoCallbacks.hot.length ;
    let totalReminders = tampaCallbacks.reminder.length + orlandoCallbacks.reminder.length ;
    let totalAPPCs = tampaRecentAPPC.length + orlandoRecentAPPC.length;
    let totalTampa = allGenerated.tampa.x7.length + allGenerated.tampa.x6.length + allGenerated.tampa.x5.length + allGenerated.tampa.x4.length + allGenerated.tampa.x3.length + allGenerated.tampa.x2.length + allGenerated.tampa.x1.length + allGenerated.tampa.unknown.length;
    let totalOrlando = allGenerated.orlando.x7.length + allGenerated.orlando.x6.length + allGenerated.orlando.x5.length + allGenerated.orlando.x4.length + allGenerated.orlando.x3.length + allGenerated.orlando.x2.length + allGenerated.orlando.x1.length + allGenerated.orlando.unknown.length;


    let tampaSelect = '';
    let orlandoSelect = '';
    if (this.state.generatedView === 'tampa') {
      tampaSelect = 'isActive';
    } else {
      orlandoSelect = 'isActive';
    }

    if (this.state.generatedView === 'tampa') {
      return (
        <div className="CallListContainer">
          <div className="CallList">
            <div className="leftCol">
              <h4>Hot <span>{totalHot}</span></h4>
              <div className="CallListBox">
                {tampaCallbacks.hot.length > 0 ? <p>Tampa <span>{tampaCallbacks.hot.length}</span></p> : ''}
                {tampaCallbacks.hot ? tampaCallbacks.hot.map((e, i) => this.callItemHot(e, 'tampa')) : ''}

                <hr />

                {orlandoCallbacks.hot.length > 0 ? <p>Orlando <span>{orlandoCallbacks.hot.length}</span></p> : ''}
                {orlandoCallbacks.hot ? orlandoCallbacks.hot.map((e, i) => this.callItemHot(e, 'orlando')) : ''}
              </div>


              <h4>Reminders <span>{totalReminders}</span></h4>
              <div className="CallListBox">
                {tampaCallbacks.reminder.length > 0 ?   <p>Tampa <span>{tampaCallbacks.reminder.length}</span></p> : ''}
                {tampaCallbacks.reminder ? tampaCallbacks.reminder.map((e, i) => this.callItem(e, 'tampa')) : ''}

                <hr />

                {orlandoCallbacks.reminder.length > 0 ? <p>Orlando <span>{orlandoCallbacks.reminder.length}</span></p> : ''}
                {orlandoCallbacks.reminder ? orlandoCallbacks.reminder.map((e, i) => this.callItem(e, 'orlando')) : ''}
              </div>
            </div>

            <div className="rightCol">
              <h4>Generated</h4>
              <p className="cold-select">
                <span id="cold-tampa" className={tampaSelect} onClick={this.switchActive}>Tampa <em>{this.props.tampaCalled}/{totalTampa}</em></span>
                <span id="cold-orlando" className={orlandoSelect} onClick={this.switchActive}>Orlando <em>{this.props.orlandoCalled}/{totalOrlando}</em></span>
              </p>
              <div className="loadingMore" onClick={this.props.generateMore}>Load More +</div>
              <div className={allGenerated.tampa.x7.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>7xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x7 ? allGenerated.tampa.x7.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x6.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>6xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x6 ? allGenerated.tampa.x6.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x5.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>5xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x5 ? allGenerated.tampa.x5.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x4.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>4xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x4 ? allGenerated.tampa.x4.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x3.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>3xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x3 ? allGenerated.tampa.x3.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x2.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>2xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x2 ? allGenerated.tampa.x2.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.x1.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>1xWeek</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.x1 ? allGenerated.tampa.x1.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>

              <div className={allGenerated.tampa.unknown.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>Cold</h4>
                <div className={"cold-tampa " + tampaSelect}>{allGenerated.tampa.unknown ? allGenerated.tampa.unknown.map((e, i) => this.callItemQualify(e, 'tampa')) : ''}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="CallListContainer">
          <div className="CallList">
            <div className="leftCol">
              <h4>Hot <span>{totalHot}</span></h4>
              <div className="CallListBox">
                {tampaCallbacks.hot.length > 0 ? <p>Tampa <span>{tampaCallbacks.hot.length}</span></p> : ''}
                {tampaCallbacks.hot ? tampaCallbacks.hot.map((e, i) => this.callItemHot(e, 'tampa')) : ''}
                <hr />
                {orlandoCallbacks.hot.length > 0 ? <p>Orlando <span>{orlandoCallbacks.hot.length}</span></p> : ''}
                {orlandoCallbacks.hot ? orlandoCallbacks.hot.map((e, i) => this.callItemHot(e, 'orlando')) : ''}
              </div>


              <h4>Reminders <span>{totalReminders}</span></h4>
              <div className="CallListBox">
                {tampaCallbacks.reminder.length > 0 ?   <p>Tampa <span>{tampaCallbacks.reminder.length}</span></p> : ''}
                {tampaCallbacks.reminder ? tampaCallbacks.reminder.map((e, i) => this.callItem(e, 'tampa')) : ''}

                <hr />

                {orlandoCallbacks.reminder.length > 0 ? <p>Orlando <span>{orlandoCallbacks.reminder.length}</span></p> : ''}
                {orlandoCallbacks.reminder ? orlandoCallbacks.reminder.map((e, i) => this.callItem(e, 'orlando')) : ''}
              </div>
            </div>

            <div className="rightCol">
              <h4>Generated</h4>
              <p className="cold-select">
                <span id="cold-tampa" className={tampaSelect} onClick={this.switchActive}>Tampa <em>{this.props.tampaCalled}/{totalTampa}</em></span>
                <span id="cold-orlando" className={orlandoSelect} onClick={this.switchActive}>Orlando <em>{this.props.orlandoCalled}/{totalOrlando}</em></span>
              </p>
              <div className={allGenerated.orlando.x7.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>7xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x7 ? allGenerated.orlando.x7.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x6.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>6xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x6 ? allGenerated.orlando.x6.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x5.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>5xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x5 ? allGenerated.orlando.x5.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x4.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>4xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x4 ? allGenerated.orlando.x4.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x3.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>3xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x3 ? allGenerated.orlando.x3.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x2.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>2xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x2 ? allGenerated.orlando.x2.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.x1.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>1xWeek</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.x1 ? allGenerated.orlando.x1.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>

              <div className={allGenerated.orlando.unknown.length > 0 ? 'CallListBox FullList' : 'CallListBox FullList isHidden' }>
                <h4>Cold</h4>
                <div className={"cold-orlando " + orlandoSelect}>{allGenerated.orlando.unknown ? allGenerated.orlando.unknown.map((e, i) => this.callItemQualify(e, 'orlando')) : ''}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
  callItem(item, citySet) {
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
          <div className="btn softGrad--secondary" onClick={() => { this.props.showModal(item, 'call', citySet) }}>Call</div>
          <Link target="_blank" to={'/' + citySet + '/sales/' + item.id + '/'}><img src={popout} onClick={this.popOut} /></Link>
        </div>
      </div>
    )
  }

  callItemHot(item, citySet) {
    let itemClass = 'callItem';
    let todayDate  = new Date();

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
    let setCallBackDate  = new Date(item.fields['Callback Date']);
    let callOn = (setCallBackDate.getMonth()+1) + '/' + setCallBackDate.getDate() + '/' + setCallBackDate.getFullYear();
    if (setCallBackDate > todayDate) {
      itemClass += ' called';
    }


    return(
      <div className={itemClass} data-date={itemCallDate}>
        <div className="companyData">
          <div className="innerCompany">
            <p>Call on {callOn}</p>
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
    if (item['Type'] === 'appc') {console.log(item);}
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
