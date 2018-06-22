import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class ExportRecords extends Component {
  selectExport = e => {
    let allFilters = e.target.parentNode.getElementsByTagName("*");
    let index;
    for (index = 0; index < allFilters.length; ++index) {
      allFilters[index].className = "inActive";
    }
    e.target.className = "isActive";
  }


  // Render
  // ----------------------------------------------------
  render() {
    let today  = new Date();
    console.log();
    let fileName;
    fileName = (today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();


    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Choose Your Export</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>


        <div className="filterSearch">
        </div>

        <ul id="exportList">
          <li
            className="isActive"
            onClick={this.selectExport}
            data-fields="fields[]=Company+Name&fields[]=Status&fields[]=Start+Date&filterByFormula=(FIND(%22Active%22%2C%7BStatus%7D))"
            data-name={`All Active Export - ` + fileName}
          >All Actives</li>
          <li
            onClick={this.selectExport}
          >Canceled</li>
          <li
            onClick={this.selectExport}
          >Tampa Customer Service Export</li>
        </ul>

        <div className="newFilterTrigger">
          <div className="btn softGrad--secondary" onClick={this.props.submitExport}>Submit</div>
        </div>
      </div>

    );
  }
}


ExportRecords.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
}
