import React, { Component } from 'react';
import propTypes from 'prop-types';

import RecordControls from '../Globals/Controls/RecordControls';
import ArchiveControls from '../Globals/Controls/ArchiveControls';

export default class ControlsBar extends Component {
  controlsBar = () => {
    if (this.props.recordView) {
      return (
        <RecordControls
          recordChanger={this.props.recordChanger}
          newRecord={this.props.newRecord}
          saveRecordHandler={this.props.saveRecordHandler}
          arrowKeyHandler={this.props.arrowKeyHandler}
          currentRecord={this.props.currentRecord}
          currentTable={this.props.currentTable}
        />
      );
    } else {
      return (
        <ArchiveControls
          franchiseView={this.props.franchiseView}
          controlsModalToggle={this.props.controlsModalToggle}
          searchHandler={this.props.searchHandler}
          newRecordHandler={this.props.newRecordHandler}
        />
      );
    }
  }

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="controlsWrapper">
        {this.controlsBar()}
      </div>
    );
  }

}

ControlsBar.propTypes ={
  recordView: propTypes.bool.isRequired,
  newRecord: propTypes.bool.isRequired,
  franchiseView: propTypes.bool.isRequired,
  searchHandler: propTypes.func.isRequired,
  saveRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  recordChanger: propTypes.func.isRequired,
  newRecordHandler: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  currentTable: propTypes.string.isRequired,
}