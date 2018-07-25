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


export default class AccountingView extends Component {


  // componentDidMount() {
  //   this.props.loadSPInfo();
  // }

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
              currentRecordView={this.props.currentRecordView}
              company={this.props.currentRecord['Company Name']}
            />
            <ModuleSP
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              spChangeHandler={this.props.spChangeHandler}
              spNumber={this.props.currentRecord['SP Number']}
              currentSP={this.props.currentSP}
              spList={this.props.spList}
              baseId={this.props.baseId}
            />
            <ModuleSchedule
              amount={this.props.currentRecord['Monthly Amount']}
              weekDays={this.props.currentRecord['Days of Week']}
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecordView={this.props.currentRecordView}
              timesPerWeek={this.props.currentRecord['Times per Week']}
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              newSP={this.props.currentRecord['New SP Start']}
              cancel={this.props.currentRecord['Cancel Date']}
              start={this.props.currentRecord['Start Date']}
              currentRecordView={this.props.currentRecordView}
              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}
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


AccountingView.propTypes ={
  spChangeHandler: propTypes.func.isRequired,
  loadSPInfo: propTypes.func.isRequired,
  currentId: propTypes.string.isRequired,
  recordChanges: propTypes.bool.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentSP: propTypes.object.isRequired,
  spList: propTypes.object.isRequired,
  currentRecordView: propTypes.string.isRequired,
  handleDayClick: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
}
