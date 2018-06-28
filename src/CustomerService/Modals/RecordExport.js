import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class RecordExport extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let locationService;
    if (this.props.baseId === 'apps7GoAgK23yrOoY') { //tampa customers
      locationService = 'tampa-service';
    } else {
      locationService = 'orlando-service';
    }

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
            <select id="mergeTemplates">
              <option
                data-merge="none">
                Select Template</option>
              <option disabled>---------------</option>
              <option disabled>Startups</option>
              <option disabled>---------------</option>
              <option data-merge={locationService} data-type="Account Acceptance">Account Acceptance</option>
              <option data-merge={locationService} data-type="Offer Sheet">Account Offer Sheet</option>
              <option data-merge={locationService} data-type="Account Welcome Letter">Account Welcome Letter</option>
              <option data-merge={locationService} data-type="Bid Sheets">Bid Sheets</option>
              <option disabled>---------------</option>
              <option disabled>Changes</option>
              <option disabled>---------------</option>
              <option data-merge={locationService} data-type="Account Changes">Account Changes</option>
              <option data-merge={locationService} data-type="Crew Change">Crew Change</option>
              <option data-merge={locationService} data-type="Crew Change Request">Crew Change Request</option>
              <option data-merge={locationService} data-type="Account Additional">Account Additional Service</option>
              <option data-merge={locationService} data-type="Additional Service Order">Account Additional Service Order</option>
              <option disabled>---------------</option>
              <option disabled>Stops</option>
              <option disabled>---------------</option>
              <option data-merge={locationService} data-type="Account Cancelation">Account Cancelation</option>
              <option data-merge={locationService} data-type="Account Credit">Account Credit</option>
              <option data-merge={locationService} data-type="Account Relinquish">Account Relinquish</option>
            </select>
          </div>


          <div className="newFilterTrigger">
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </div>
        </form>


      </div>

    );
  }
}


RecordExport.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
