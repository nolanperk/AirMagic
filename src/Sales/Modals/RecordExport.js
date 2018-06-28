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
    if (this.props.baseId === 'appXNufXR9nQARjgs') { //orlando sales
      return (
        <select id="mergeTemplates">
          <option
            data-merge="none">
            Select Template</option>
          <option disabled>---------------</option>
          <option disabled>Rob Janke</option>
          <option disabled>---------------</option>
          <option
            data-merge="rwj-standard"
            data-type="Proposal">
            RWJ - Standard</option>
          <option
            data-merge="rwj-medical"
            data-type="Proposal">
            RWJ - Medical</option>

          <option
            data-merge="rwj-once"
            data-type="Proposal">
            RWJ - 1 X Only</option>

          <option disabled>---------------</option>
          <option disabled>Joel Horwitz</option>
          <option disabled>---------------</option>
          <option
            data-merge="jdh-standard"
            data-type="Proposal">
            JDH - Standard</option>
          <option
            data-merge="jdh-medical"
            data-type="Proposal">
            JDH - Medical</option>
          <option
            data-merge="jdh-once"
            data-type="Proposal">
            JDH - 1 X Only</option>
        </select>
      )
    } else {
      return (
        <select id="mergeTemplates">
          <option
            data-merge="none">
            Select Template</option>
          <option disabled>---------------</option>
          <option disabled>Tyler Perkins</option>
          <option disabled>---------------</option>
          <option
            data-merge="tmp-standard"
            data-type="Proposal">
            TMP - Standard</option>
          <option
            data-merge="tmp-medical"
            data-type="Proposal">
            TMP - Medical</option>
          <option
            data-merge="tmp-once"
            data-type="Proposal">
            TMP - 1 X Only</option>

          <option disabled>---------------</option>
          <option disabled>Nolan Perkins</option>
          <option disabled>---------------</option>
          <option
            data-merge="nwp-standard"
            data-type="Proposal">
            NWP - Standard</option>
          <option
            data-merge="nwp-medical"
            data-type="Proposal">
            NWP - Medical</option>
          <option
            data-merge="nwp-once"
            data-type="Proposal">
            NWP - 1 X Only</option>

          <option disabled>---------------</option>
          <option disabled>Rafael Milanes</option>
          <option disabled>---------------</option>
          <option
            data-merge="ram-standard"
            data-type="Proposal">
            RAM - Standard</option>
          <option
            data-merge="ram-medical"
            data-type="Proposal">
            RAM - Medical</option>
          <option
            data-merge="ram-once"
            data-type="Proposal">
            RAM - 1 X Only</option>
        </select>
      )
    }
  }
}


RecordExport.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
