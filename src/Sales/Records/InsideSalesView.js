import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

import RecordNotes from './RecordNotes';
import ModuleMain from './Modules/ModuleMain';
import ModuleContact from './Modules/ModuleContact';
import ModuleLocation from './Modules/ModuleLocation';
import ModuleSales from './Modules/ModuleSales';
import ModulePipeline from './Modules/ModulePipeline';
import ModuleNumbers from './Modules/ModuleNumbers';
import ModuleSchedule from './Modules/ModuleSchedule';
import ModuleSpecial from './Modules/ModuleSpecial';


export default class InsideSalesView extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;
    this.gridLayout()


    return (
      <div className={'RecordView Tab--' + this.props.currentTab + ' RecordView--' + this.props.mobileHand} key={this.props.currentId}>
        <div className="ModuleContainer">
          <div className="ModuleList">
            <ModuleMain
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              changeSelectBlock={this.props.changeSelectBlock}
              baseId={this.props.baseId}
              company={this.props.currentRecord['Company Name']}
              status={this.props.currentRecord['Status']}
              standing={this.props.currentRecord['Standing']}
              rep={this.props.currentRecord['Sales Rep']}
              recentCaller={this.props.currentRecord['Recent Caller']}
              callDate={this.props.currentRecord['Recent Call Date']}

              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
            />
            <ModuleContact
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              salutation={this.props.currentRecord['Salutation']}
              contact={this.props.currentRecord['Main contact']}
              title={this.props.currentRecord['Title']}
              altContact={this.props.currentRecord['Alternate Contact']}
              phone={this.props.currentRecord['Office Phone']}
              ext={this.props.currentRecord['Extension']}
              cell={this.props.currentRecord['Cell Phone']}
              email={this.props.currentRecord['Email']}
            />
            <ModulePipeline
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              changeSelectBlock={this.props.changeSelectBlock}
              apptBy={this.props.currentRecord['Appt. Set By']}
              apptSet={this.props.currentRecord['Appt. Set Date']}
              apptDate={this.props.currentRecord['Appt. Date']}
              apptTime={this.props.currentRecord['Appt. Time']}

              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
              apptBy={this.props.currentRecord['Appt. Set By']}
            />
            <ModuleLocation
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              addr1={this.props.currentRecord['Address 1']}
              addr2={this.props.currentRecord['Address 2']}
              city={this.props.currentRecord['City']}
              zip={this.props.currentRecord['Zip']}
              county={this.props.currentRecord['County']}
              emp={this.props.currentRecord['Employees']}
              company={this.props.currentRecord['Company Name']}
            />
            <ModuleSchedule
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              timesPerWeek={this.props.currentRecord['Times per Week']}
              weekDays={this.props.currentRecord['Days of Week']}
              timesPerWeekChange={this.props.timesPerWeekChange}
            />
            <ModuleNumbers
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              sqFt={this.props.currentRecord['Sq. Footage']}
              restrooms={this.props.currentRecord['Restrooms']}
              ceramic={this.props.currentRecord['Ceramic']}
              marble={this.props.currentRecord['Marble']}
              vct={this.props.currentRecord['VCT']}
              wood={this.props.currentRecord['Wood']}
              woodLam={this.props.currentRecord['Wood Lam.']}
              carpet={this.props.currentRecord['Carpet']}
              other={this.props.currentRecord['Other']}
              autoPricing={this.props.autoPricing}
              timesPerWeek={this.props.currentRecord['Times per Week']}
            />
          </div>
        </div>

        <RecordNotes
          notes={this.props.currentRecord['Notes']}
          changeNotesHandler={this.props.changeNotesHandler}
          controlsModalToggle={this.props.controlsModalToggle}
          addr1={this.props.currentRecord['Address 1']}
          addr2={this.props.currentRecord['Address 2']}
          city={this.props.currentRecord['City']}
          noteCharacters={this.props.noteCharacters}
          zip={this.props.currentRecord['Zip']} />
      </div>
    );
  }
  gridLayout() {
    setTimeout(function(){
      var elem = document.querySelector('.ModuleList');
      var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    }, 100);
  }
  gridDestroy() {
    var elem = document.querySelector('.ModuleList');
    var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    iso.destroy()
  }
}


InsideSalesView.propTypes ={
  currentRecordView: propTypes.string.isRequired,
  currentId: propTypes.string.isRequired,
  recordChanges: propTypes.bool.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  timesPerWeekChange: propTypes.func.isRequired,
  autoPricing: propTypes.func.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
