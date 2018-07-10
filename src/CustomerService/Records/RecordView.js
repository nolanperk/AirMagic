import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

import RecordNotes from './RecordNotes';
import ModuleMain from './Modules/ModuleMain';
import ModuleContact from './Modules/ModuleContact';
import ModuleLocation from './Modules/ModuleLocation';
import ModuleSales from './Modules/ModuleSales';
import ModuleService from './Modules/ModuleService';
import ModuleNumbers from './Modules/ModuleNumbers';
import ModuleSP from './Modules/ModuleSP';
import ModuleSchedule from './Modules/ModuleSchedule';


export default class RecordView extends Component {


  componentDidMount() {
    this.props.loadSPInfo();
  }

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
              baseId={this.props.baseId}
              changeRecordHandler={this.props.changeRecordHandler}
              company={this.props.currentRecord['Company Name']}
              pam={this.props.currentRecord['PAM']}
              rep={this.props.currentRecord['Sales Rep']}
              changeNotesHandler={this.props.changeNotesHandler}
              special={this.props.currentRecord['Special Notes']}
              status={this.props.currentRecord['Status']}
              cpop={this.props.currentRecord['CPOP']}
              supplies={this.props.currentRecord['Addtl Supplies']}
              changeSelectBlock={this.props.changeSelectBlock}
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
            <ModuleService
              changeRecordHandler={this.props.changeRecordHandler}
              standing={this.props.currentRecord['Standing']}
              lastCall={this.props.currentRecord['Last Call']}
              lastVisit={this.props.currentRecord['Last Visit']}
              newSP={this.props.currentRecord['New SP Start']}
              cancel={this.props.currentRecord['Cancel Date']}
              changeSelectBlock={this.props.changeSelectBlock}
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
            <ModuleSP
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              spChangeHandler={this.props.spChangeHandler}
              spNumber={this.props.currentRecord['SP Number']}
              currentSP={this.props.currentSP}
              spList={this.props.spList}
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              setBy={this.props.currentRecord['Appt. Set By']}
              apptSetDate={this.props.currentRecord['Appt. Set Date']}
              apptDate={this.props.currentRecord['Appt. Date']}
              close={this.props.currentRecord['Close Date']}
              proposal={this.props.currentRecord['Proposal Date']}
              walkthrough={this.props.currentRecord['Walkthrough Date']}
              start={this.props.currentRecord['Start Date']}
              preCleanDate={this.props.currentRecord['Pre-Clean Date']}
              preCleanCharge={this.props.currentRecord['Pre-Clean Charge']}
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
            <ModuleSchedule
              changeRecordHandler={this.props.changeRecordHandler}
              hoursPer={this.props.currentRecord['Hours Per']}
              sqFtPer={this.props.currentRecord['SQ Ft. per Hour']}
              timesPerWeek={this.props.currentRecord['Times per Week']}
              weekDays={this.props.currentRecord['Days of Week']}
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
  spChangeHandler: propTypes.func.isRequired,
  loadSPInfo: propTypes.func.isRequired,
  currentId: propTypes.string.isRequired,
  recordChanges: propTypes.number.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentSP: propTypes.object.isRequired,
  spList: propTypes.object.isRequired,
}
