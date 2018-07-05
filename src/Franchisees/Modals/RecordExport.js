import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class RecordExport extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Choose Export Template</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>

        <form id="exportForm" onSubmit={this.props.exportRecord}>

          <div className="selectBox mergeBox" onChange={this.selectChange}>
            {this.locationSales}
          </div>


          <div className="newFilterTrigger">
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </div>
        </form>


      </div>

    );
  }

  get locationSales() {
    return (
      <select id="mergeTemplates">
        <option
          data-merge="none">
          Select Template</option>
        <option disabled>---------------</option>
        <option disabled>Franchise Exports</option>
        <option disabled>---------------</option>
        <option
          data-merge="franchise-customer-service"
          data-type="Franchise Exports">
          Franchise Customer Service</option>
        <option
          data-merge="level-5"
          data-type="Franchise Exports">
          Franchise Level 5</option>
        <option
          data-merge="course-completion"
          data-type="Franchise Exports">
          Franchise Course Completion</option>
      </select>
    )
  }
}


RecordExport.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
