import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class SaveAlert extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="SaveModal modalInner">
        <div className="modalTitle">
          <h4>Do you want to save your changes?</h4>
        </div>


        <div className="btn softGrad--primary" onClick={this.props.revertRecordHandler}>Don't Save</div>
        <div className="btn softGrad--secondary" onClick={this.props.saveRecordHandler}>Save Changes</div>
      </div>
    );
  }
}


SaveAlert.propTypes = {
  saveRecordHandler: propTypes.func.isRequired,
  revertRecordHandler: propTypes.func.isRequired,
}
