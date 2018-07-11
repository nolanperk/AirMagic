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


export default class RecordView extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;
    this.gridLayout()


    return (
      <div className="RecordView" key={this.props.currentId}>
        <div className="ModuleContainer">
          <div className="ModuleList">
            <ModuleMain
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              baseId={this.props.baseId}
              company={this.props.currentRecord['Company Name']}
              status={this.props.currentRecord['Status']}
              standing={this.props.currentRecord['Standing']}
              industry={this.props.currentRecord['Industry']}
              rep={this.props.currentRecord['Sales Rep']}
              recentCaller={this.props.currentRecord['Recent Caller']}
              callDate={this.props.currentRecord['Recent Call Date']}
              callBack={this.props.currentRecord['Callback Date']}
              website={this.props.currentRecord['Website']}
            />
            <ModuleContact
              changeRecordHandler={this.props.changeRecordHandler}
              salutation={this.props.currentRecord['Salutation']}
              contact={this.props.currentRecord['Main contact']}
              title={this.props.currentRecord['Title']}
              altContact={this.props.currentRecord['Alternate Contact']}
              phone={this.props.currentRecord['Office Phone']}
              ext={this.props.currentRecord['Extension']}
              cell={this.props.currentRecord['Cell Phone']}
              email={this.props.currentRecord['Email']}
              source={this.props.currentRecord['Lead Source']}
            />
            <ModulePipeline
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              callCount={this.props.currentRecord['Times Called']}
              apptBy={this.props.currentRecord['Appt. Set By']}
              apptSet={this.props.currentRecord['Appt. Set Date']}
              apptDate={this.props.currentRecord['Appt. Date']}
              apptTime={this.props.currentRecord['Appt. Time']}
              proposal={this.props.currentRecord['Proposal Date']}
            />
            <ModuleLocation
              changeRecordHandler={this.props.changeRecordHandler}
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
              specialNotes={this.props.currentRecord['Special Notes']}
            />
            <ModuleSchedule
              changeRecordHandler={this.props.changeRecordHandler}
              hoursPer={this.props.currentRecord['Hours Per']}
              sqFtPer={this.props.currentRecord['SQ Ft. per Hour']}
              timesPerWeek={this.props.currentRecord['Times per Week']}
              weekDays={this.props.currentRecord['Days of Week']}
            />
            <ModuleNumbers
              changeRecordHandler={this.props.changeRecordHandler}
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
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              closed={this.props.currentRecord['Close Date']}
              walkthrough={this.props.currentRecord['Walkthrough Date']}
              start={this.props.currentRecord['Start Date']}
              preCleanDate={this.props.currentRecord['Pre-Clean Date']}
              preCleanCharge={this.props.currentRecord['Pre-Clean Charge']}
              cancel={this.props.currentRecord['Cancel Date']}
            />
          </div>
        </div>

        <RecordNotes
          notes={this.props.currentRecord['Notes']}
          changeNotesHandler={this.props.changeNotesHandler}
          controlsModalToggle={this.props.controlsModalToggle} />
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
  currentId: propTypes.string.isRequired,
  recordChanges: propTypes.number.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
