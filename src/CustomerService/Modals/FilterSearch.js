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
            id="All+Actives"
          >All Actives</li>
          <li
            onClick={this.selectFilterList}
            id="Canceled"
          >Canceled</li>
          <li
            onClick={this.selectFilterList}
            id="New+Startups"
          >Tampa Customer Service Export</li>
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
}
