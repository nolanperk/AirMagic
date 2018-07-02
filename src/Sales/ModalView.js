import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../assets/icons/white/exit.png';

import SaveAlert from './Modals/SaveAlert';
import SortBy from './Modals/SortBy';
import FilterSearch from './Modals/FilterSearch';
import NewNote from './Modals/NewNote';
import ChangeUser from './Modals/ChangeUser';
import ExportRecords from './Modals/ExportRecords';
import RecordExport from './Modals/RecordExport';
import MoveDatabase from './Modals/MoveDatabase';

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
          baseId={this.props.baseId}
        />
      );
    } else if (this.props.modalType === 'sortBy') {
      return (
        <SortBy
          controlsModalToggle={this.props.controlsModalToggle}
          sortSubmitHandler={this.props.sortSubmitHandler}
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
        />
      )
    } else if (this.props.modalType === 'recordExport') {
      return (
        <RecordExport
          controlsModalToggle={this.props.controlsModalToggle}
          mergeRecord={this.props.mergeRecord}
          exportRecord={this.props.exportRecord}
          baseId={this.props.baseId}
        />
      )
    } else if (this.props.modalType === 'moveDatabase') {
      return (
        <MoveDatabase
          controlsModalToggle={this.props.controlsModalToggle}
          moveDatabasesHandler={this.props.moveDatabasesHandler}
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
  controlsModalToggle: propTypes.func.isRequired,
  userChangeHandler: propTypes.func.isRequired,
  selectFilterHandler: propTypes.func.isRequired,
  saveNoteHandler: propTypes.func.isRequired,
  sortSubmitHandler: propTypes.func.isRequired,
  currentId: propTypes.string.isRequired,
  modalType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  baseId: propTypes.string.isRequired,
  activeModal: propTypes.bool.isRequired,
  userSubmitHandler: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  moveDatabasesHandler: propTypes.func.isRequired,
}