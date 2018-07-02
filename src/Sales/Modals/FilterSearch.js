import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class FilterSearch extends Component {
  selectFilterList = e => {
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

    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Browsing Filters</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>


        <div className="filterSearch">
        </div>

        <ul id="filtersList">
          <li
            className="isActive"
            onClick={this.selectFilterList}
            id="All"
          >No Filter</li>
          <li
            onClick={this.selectFilterList}
            id="APPC"
          >APPC</li>
          <li
            onClick={this.selectFilterList}
            id="Prospects"
          >Prospects</li>
          <li
            onClick={this.selectFilterList}
            id="Canceled+Pipeline"
          >Canceled Pipeline</li>
          <li
            onClick={this.selectFilterList}
            id="APPC+Pipeline"
          >APPC Pipeline</li>
          <li
            onClick={this.selectFilterList}
            id="Valid+Numbers"
          >Valid Numbers</li>
          <li
            onClick={this.selectFilterList}
            id="Linda+Callbacks"
          >Linda Callbacks</li>
          <li
            onClick={this.selectFilterList}
            id="Eric+Callbacks"
          >Eric Callbacks</li>
        </ul>



        <div className="newFilterTrigger">
          <div className="btn softGrad--secondary" onClick={this.props.selectFilterHandler}>Submit</div>
        </div>
      </div>
    );
  }
}


FilterSearch.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  selectFilterHandler: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}