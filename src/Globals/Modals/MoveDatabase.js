import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class MoveDatabase extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Do you want to move this record to the Customer Service Database?</h4>
          <p>You can't undo this</p>
          <hr />
        </div>

        <div className="btn softGrad--primary" onClick={this.props.controlsModalToggle}>No</div>
        <div className="btn softGrad--secondary" onClick={this.props.moveDatabasesHandler}>Yes</div>
      </div>

    );
  }
}


MoveDatabase.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  moveDatabasesHandler: propTypes.func.isRequired,
}
