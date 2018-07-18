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
    if (this.props.currentTable === 'Franchisees') {
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
      );
    } else if (this.props.currentTable === 'Customers') {
      return (
        <select id="mergeTemplates">
          <option
            data-merge="none">
            Select Template</option>
          <option disabled>---------------</option>
          <option disabled>Startups</option>
          <option disabled>---------------</option>
          <option data-type="Account Acceptance">Account Acceptance</option>
          <option data-type="Offer Sheet">Account Offer Sheet</option>
          <option data-type="Account Welcome Letter">Account Welcome Letter</option>
          <option data-type="Bid Sheets">Bid Sheets</option>
          <option disabled>---------------</option>
          <option disabled>Changes</option>
          <option disabled>---------------</option>
          <option data-type="Account Changes">Account Changes</option>
          <option data-type="Crew Change">Crew Change</option>
          <option data-type="Crew Change Request">Crew Change Request</option>
          <option data-type="Account Additional">Account Additional Service</option>
          <option data-type="Additional Service Order">Account Additional Service Order</option>
          <option disabled>---------------</option>
          <option disabled>Stops</option>
          <option disabled>---------------</option>
          <option data-type="Account Cancelation">Account Cancelation</option>
          <option data-type="Account Credit">Account Credit</option>
          <option data-type="Account Relinquish">Account Relinquish</option>
        </select>
      );
    } else {
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
              data-merge="rwj-schools"
              data-type="Proposal">
              RWJ - Schools</option>
            <option
              data-merge="rwj-1x"
              data-type="Proposal">
              RWJ - 1 X Week</option>
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
              data-merge="jdh-schools"
              data-type="Proposal">
              JDH - Schools</option>
            <option
              data-merge="jdh-1x"
              data-type="Proposal">
              JDH - 1 X Week</option>
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
              data-merge="tmp-schools"
              data-type="Proposal">
              TMP - Schools</option>
            <option
              data-merge="tmp-1x"
              data-type="Proposal">
              TMP - 1 X Week</option>
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
              data-merge="nwp-schools"
              data-type="Proposal">
              NWP - Schools</option>
            <option
              data-merge="nwp-1x"
              data-type="Proposal">
              NWP - 1 X Week</option>
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
              RAM - 062210 Standard</option>
            <option
              data-merge="ram-once"
              data-type="Proposal">
              RAM - 062210 1 X Week</option>
            <option
              data-merge="ram-medical"
              data-type="Proposal">
              RAM - Medical</option>
            <option
              data-merge="ram-medical-1x"
              data-type="Proposal">
              RAM - Medical 1x</option>
            <option
              data-merge="ram-healthcare"
              data-type="Proposal">
              RAM - Healthcare</option>
            <option
              data-merge="ram-multi-tenant"
              data-type="Proposal">
              RAM - Multi-Tenant</option>
            <option
              data-merge="ram-schools"
              data-type="Proposal">
              RAM - Schools</option>
          </select>
        )
      }
    }
  }
}


RecordExport.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
