import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../assets/icons/white/exit.png';

import SaveAlert from '../Globals/Modals/SaveAlert';
import SortBy from '../Globals/Modals/SortBy';
import FilterSearch from '../Globals/Modals/FilterSearch';
import NewNote from '../Globals/Modals/NewNote';
import ChangeUser from '../Globals/Modals/ChangeUser';
import ExportRecords from '../Globals/Modals/ExportRecords';
import RecordExport from '../Globals/Modals/RecordExport';
import MoveDatabase from '../Globals/Modals/MoveDatabase';
import SalesMetrics from '../Globals/Modals/SalesMetrics';
import SalesCloses from '../Globals/Modals/SalesCloses';
import Forecast from '../Globals/Modals/Forecast';
import InsideForecast from '../Globals/Modals/InsideForecast';
import RecapVisit from '../Globals/Modals/RecapVisit';
import LogCall from '../Globals/Modals/LogCall';
import SalesFollowUps from '../Globals/Modals/SalesFollowUps';
import YelpModal from '../Globals/Modals/YelpModal';
import RegionSelect from '../Globals/Modals/RegionSelect';

export default class ModalView extends Component {
  modalView = () => {
    if (this.props.modalType === 'saveAlert') {
      return (
        <SaveAlert
          revertRecordHandler={this.props.revertRecordHandler}
          saveRecordHandler={this.props.saveRecordHandler}
        />
      );
    } else if (this.props.modalType === 'filterSearch') {
      return (
        <FilterSearch
          controlsModalToggle={this.props.controlsModalToggle}
          selectFilterHandler={this.props.selectFilterHandler}
          currentTable={this.props.currentTable}
          baseId={this.props.baseId}
        />
      );
    } else if (this.props.modalType === 'sortBy') {
      return (
        <SortBy
          controlsModalToggle={this.props.controlsModalToggle}
          sortSubmitHandler={this.props.sortSubmitHandler}
          currentTable={this.props.currentTable}
        />
      );
    } else if (this.props.modalType === 'addNotes') {
      return (
        <NewNote
          controlsModalToggle={this.props.controlsModalToggle}
          saveNoteHandler={this.props.saveNoteHandler}
          userName={this.props.userName}
        />
      )
    } else if (this.props.modalType === 'recapVisit') {
      return (
        <RecapVisit
          controlsModalToggle={this.props.controlsModalToggle}
          saveNoteHandler={this.props.saveNoteHandler}
          userName={this.props.userName}
          recapSubmit={this.props.recapSubmit}
          recapSlide={this.props.recapSlide}
          recapBack={this.props.recapBack}
        />
      )
    } else if (this.props.modalType === 'changeUser') {
      return (
        <ChangeUser
          controlsModalToggle={this.props.controlsModalToggle}
          userChangeHandler={this.props.userChangeHandler}
          userSubmitHandler={this.props.userSubmitHandler}
          userName={this.props.userName}
        />
      )
    } else if (this.props.modalType === 'exportList') {
      return (
        <ExportRecords
          controlsModalToggle={this.props.controlsModalToggle}
          submitExport={this.props.submitExport}
          currentTable={this.props.currentTable}
          exportRecord={this.props.exportRecord}
        />
      )
    } else if (this.props.modalType === 'regionSelect') {
      return (
        <RegionSelect
          regionSelectHandler={this.props.regionSelectHandler}
          controlsModalToggle={this.props.controlsModalToggle}
          mergeRecord={this.props.mergeRecord}
          exportRecord={this.props.exportRecord}
          baseId={this.props.baseId}
          currentTable={this.props.currentTable}
          changeRecordHandler={this.props.changeRecordHandler}
          currentRecord={this.props.currentRecord}
          timesPerWeekChange={this.props.timesPerWeekChange}
          citySet={this.props.citySet}
          autoPricing={this.props.autoPricing}
          categoryChange={this.props.categoryChange}
        />
      )
    } else if (this.props.modalType === 'recordExport') {
      return (
        <RecordExport
          controlsModalToggle={this.props.controlsModalToggle}
          mergeRecord={this.props.mergeRecord}
          exportRecord={this.props.exportRecord}
          baseId={this.props.baseId}
          currentTable={this.props.currentTable}
          changeRecordHandler={this.props.changeRecordHandler}
          currentRecord={this.props.currentRecord}
          timesPerWeekChange={this.props.timesPerWeekChange}
          citySet={this.props.citySet}
          autoPricing={this.props.autoPricing}
          categoryChange={this.props.categoryChange}
        />
      )
    } else if (this.props.modalType === 'logCall') {
      return (
        <LogCall
          controlsModalToggle={this.props.controlsModalToggle}
          baseId={this.props.baseId}
          currentTable={this.props.currentTable}
          changeRecordHandler={this.props.changeRecordHandler}
          currentRecord={this.props.currentRecord}
          handleDayClick={this.props.handleDayClick}
          toggleDayPicker={this.props.toggleDayPicker}
          citySet={this.props.citySet}
          repChange={this.props.repChange}
          standingChange={this.props.standingChange}
          changeNotesHandler={this.props.changeNotesHandler}
          logCall={this.props.logCall}
          timesPerWeekChange={this.props.timesPerWeekChange}
          mergeGoogle={this.props.mergeGoogle}
        />
      )
    } else if (this.props.modalType === 'yelpModal') {
      return (
        <YelpModal
          controlsModalToggle={this.props.controlsModalToggle}
          currentTable={this.props.currentTable}
          baseId={this.props.baseId}
          citySet={this.props.citySet}
        />
      )
    } else if (this.props.modalType === 'salesMetrics') {
      return (
        <SalesMetrics
          controlsModalToggle={this.props.controlsModalToggle}
        />
      )
    } else if (this.props.modalType === 'salesFollowsOutside') {
      return (
        <SalesFollowUps
          userName={this.props.userName}
          currentTable={this.props.currentTable}
          baseId={this.props.baseId}
          controlsModalToggle={this.props.controlsModalToggle}
          citySet={this.props.citySet}
        />
      )
    } else if (this.props.modalType === 'moveDatabase') {
      return (
        <MoveDatabase
          controlsModalToggle={this.props.controlsModalToggle}
          moveDatabasesHandler={this.props.moveDatabasesHandler}
        />
      )
    } else if (this.props.modalType === 'forecast') {
      return (
        <Forecast
          forecastSave={this.props.forecastSave}
          rating={this.props.currentRecord['Forecast Rating']}
          speed={this.props.currentRecord['Forecast Speed']}
        />
      )
    } else if (this.props.modalType === 'insideForecast') {
      return (
        <InsideForecast
          forecastSave={this.props.forecastSave}
          controlsModalToggle={this.props.controlsModalToggle}
          rating={this.props.currentRecord['Inside Forecast Rating']}
          speed={this.props.currentRecord['Inside Forecast Speed']}
          insideForecastSave={this.props.insideForecastSave}
          skipForecast={this.props.skipForecast}
        />
      )
    }
  }

  // Render
  // ----------------------------------------------------
  render() {


    return (
      <div className="modal">
        {this.modalView()}
      </div>
    );
  }
}


ModalView.propTypes = {
  saveRecordHandler: propTypes.func.isRequired,
  revertRecordHandler: propTypes.func.isRequired,
  mergeRecord: propTypes.func.isRequired,
  mergeGoogle: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  userChangeHandler: propTypes.func.isRequired,
  selectFilterHandler: propTypes.func.isRequired,
  saveNoteHandler: propTypes.func.isRequired,
  sortSubmitHandler: propTypes.func.isRequired,
  currentId: propTypes.string.isRequired,
  modalType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  currentRecord: propTypes.object.isRequired,
  baseId: propTypes.string.isRequired,
  activeModal: propTypes.bool.isRequired,
  userSubmitHandler: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  moveDatabasesHandler: propTypes.func,
  forecastSave: propTypes.func,
  currentTable: propTypes.string.isRequired,
  citySet: propTypes.string.isRequired,
  skipForecast: propTypes.func.isRequired,
  insideForecastSave: propTypes.func.isRequired,
}
