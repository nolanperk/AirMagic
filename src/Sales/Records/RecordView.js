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
import ModuleArea from './Modules/ModuleArea';
import ModuleFollow from './Modules/ModuleFollow';
import ModuleService from './Modules/ModuleService';
import ModuleOffer from './Modules/ModuleOffer';
import ModuleProjects from './Modules/ModuleProjects';


export default class RecordView extends Component {

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
              // industry={this.props.currentRecord['Industry']}
              phone={this.props.currentRecord['Office Phone']}
              category={this.props.currentRecord['Category']}
              rep={this.props.currentRecord['Sales Rep']}
              recentCaller={this.props.currentRecord['Recent Caller']}
              callDate={this.props.currentRecord['Recent Call Date']}
              callBack={this.props.currentRecord['Callback Date']}
              website={this.props.currentRecord['Website']}

              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
              repChange={this.props.repChange}
              categoryChange={this.props.categoryChange}
              standingChange={this.props.standingChange}
              callerChange={this.props.callerChange}
            />
            <ModuleContact
              changeRecordHandler={this.props.changeRecordHandler}
              callStatus={this.props.currentRecord['Call Status']}
              currentRecordView={this.props.currentRecordView}
              salutation={this.props.currentRecord['Salutation']}
              contact={this.props.currentRecord['Main contact']}
              title={this.props.currentRecord['Title']}
              altContact={this.props.currentRecord['Alternate Contact']}
              phone={this.props.currentRecord['Office Phone']}
              ext={this.props.currentRecord['Extension']}
              cell={this.props.currentRecord['Cell Phone']}
              email={this.props.currentRecord['Email']}
              altEmail={this.props.currentRecord['Alternate Email']}
              source={this.props.currentRecord['Lead Source']}
              newRecord={this.props.newRecord}
              userName={this.props.userName}
              currentRecord={this.props.currentRecord}
              timesPerWeek={this.props.currentRecord['Times per Week']}
            />
            <ModulePipeline
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              changeSelectBlock={this.props.changeSelectBlock}
              apptBy={this.props.currentRecord['Appt. Set By']}
              apptSet={this.props.currentRecord['Appt. Set Date']}
              apptDate={this.props.currentRecord['Appt. Date']}
              apptTime={this.props.currentRecord['Appt. Time']}
              proposal={this.props.currentRecord['Proposal Date']}
              proposalType={this.props.currentRecord['Proposal Type']}

              proposalTypeChange={this.props.proposalTypeChange}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
              setByChange={this.props.setByChange}
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
            <ModuleSpecial
              changeNotesHandler={this.props.changeNotesHandler}
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              specialNotes={this.props.currentRecord['Special Notes']}
            />
            <ModuleSchedule
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              hoursPer={this.props.currentRecord['Hours Per']}
              sqFtPer={this.props.currentRecord['SQ Ft. per Hour']}
              timesPerWeek={this.props.currentRecord['Times per Week']}
              weekDays={this.props.currentRecord['Days of Week']}
              timesPerWeekChange={this.props.timesPerWeekChange}
              toggleDayPicker={this.props.toggleDayPicker}
              serviceTime={this.props.currentRecord['Service Time']}
            />
            <ModuleNumbers
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              amount={this.props.currentRecord['Monthly Amount']}
              sqFt={this.props.currentRecord['Sq. Footage']}
              sqFtReal={this.props.currentRecord['Actual Sq Footage']}
              restrooms={this.props.currentRecord['Restrooms']}
              ceramic={this.props.currentRecord['Ceramic']}
              marble={this.props.currentRecord['Marble']}
              vct={this.props.currentRecord['VCT']}
              wood={this.props.currentRecord['Wood']}
              woodLam={this.props.currentRecord['Wood Lam.']}
              carpet={this.props.currentRecord['Carpet']}
              other={this.props.currentRecord['Other']}
              autoPricing={this.props.autoPricing}
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              changeSelectBlock={this.props.changeSelectBlock}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
              closed={this.props.currentRecord['Close Date']}
              walkthrough={this.props.currentRecord['Walkthrough Date']}
              start={this.props.currentRecord['Start Date']}
              preCleanDate={this.props.currentRecord['Pre-Clean Date']}
              preCleanCharge={this.props.currentRecord['Pre-Clean Charge']}
              cancel={this.props.currentRecord['Cancel Date']}
              timesPerWeek={this.props.currentRecord['Times per Week']}

              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
            />
            <ModuleArea
              city={this.props.currentRecord['City']}
              zip={this.props.currentRecord['Zip']}
              county={this.props.currentRecord['County']}
              citySet={this.props.citySet}
            />
            <ModuleFollow
              changeRecordHandler={this.props.changeRecordHandler}
              callStatus={this.props.currentRecord['Call Status']}
              currentRecordView={this.props.currentRecordView}
              contact={this.props.currentRecord['Main contact']}
              followDate={this.props.currentRecord['Last Contact']}
              followCount={this.props.currentRecord['Follow Ups']}
              followUsed={this.props.currentRecord['Follow Ups Used']}
              followStatus={this.props.currentRecord['Follow Status']}
              email={this.props.currentRecord['Email']}
              newRecord={this.props.newRecord}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
              userName={this.props.userName}
            />
            <ModuleService
              changeNotesHandler={this.props.changeNotesHandler}
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              serviceNotes={this.props.currentRecord['Service Notes']}
            />
            <ModuleOffer
              changeNotesHandler={this.props.changeNotesHandler}
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              serviceScheduleNotes={this.props.currentRecord['Service Schedule Changes']}
            />


            <ModuleProjects
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              strip={this.props.currentRecord['Strip & Wax']}
              carpet={this.props.currentRecord['Carpet Cleaning']}
              tile={this.props.currentRecord['Tile & Grout']}
              preClean={this.props.currentRecord['Pre-Clean']}
              windows={this.props.currentRecord['Window Cleaning']}
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
          pathName={this.props.pathName}
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


RecordView.propTypes ={
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
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
