import React, { Component } from 'react';
import propTypes from 'prop-types';

import calendar from '../../assets/icons/white/calendar.png';
import save from '../../assets/icons/white/save.png';
import arrow_forward from '../../assets/icons/black/arrow_forward.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';

export default class SortBy extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let btnClasses = 'ControlsBar--btn';
    if (this.props.newRecord) {
      btnClasses = 'ControlsBar--btn disabled';
    }

    let callBackClasses = 'navIcon softGrad--primary';
    if (this.props.newRecord) {
      callBackClasses = 'navIcon softGrad--primary isHidden';
    }

    return (
      <div className="ControlsBar recordControls">
        <div className={btnClasses} onClick={this.props.recordChanger} id="prev">
          <div className="navIcon whiteCard">
            <img src={arrow_back} alt="previous" />
          </div>
          <p>Previous Record</p>
        </div>

        <div className="ControlsBar--btn saveBtn">
          <div className={callBackClasses}>
            <img src={calendar} alt="callback" />
          </div>

            <div className="navIcon softGrad--secondary" onClick={this.props.saveRecordHandler}>
              <img src={save} alt="save changes" />
            </div>
        </div>


        <div className={btnClasses} onClick={this.props.recordChanger} id="next">
          <p>Next Record</p>
          <div className="navIcon whiteCard">
            <img src={arrow_forward} alt="next" />
          </div>
        </div>
      </div>
    );
  }
}


SortBy.propTypes = {
  newRecord: propTypes.bool.isRequired,
  recordChanger: propTypes.func.isRequired,
  saveRecordHandler: propTypes.func.isRequired,
  // arrowKeyHandler: propTypes.func.isRequired,
}
