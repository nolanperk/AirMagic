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

        {this.filtersList}



        <div className="newFilterTrigger">
          <div className="btn softGrad--secondary" onClick={this.props.selectFilterHandler}>Submit</div>
        </div>
      </div>
    );
  }

  get filtersList() {
    if (this.props.currentTable === 'Sales') {
      if (this.props.baseId === "appXNufXR9nQARjgs") { //orlando
        return (
          <ul id="filtersList">
            <li
              className="isActive"
              onClick={this.selectFilterList}
              id="All"
            >No Filter</li>
            <li
              onClick={this.selectFilterList}
              id="Prospects"
            >Prospects</li>
            <li
              onClick={this.selectFilterList}
              id="Joel+Pipeline"
            >Joel Pipeline</li>
            <li
              onClick={this.selectFilterList}
              id="Rob+Pipeline"
            >Rob Pipeline</li>
            <li
              onClick={this.selectFilterList}
              id="Canceled"
            >Canceled</li>
            <li
              onClick={this.selectFilterList}
              id="From+Customer+Service+TM"
            >From Customer Service TM</li>
            <li
              onClick={this.selectFilterList}
              id="Cold+Calls"
            >Cold Calls</li>
          </ul>
        );
      } else {
        return (
          <ul id="filtersList">
            <li
              className="isActive"
              onClick={this.selectFilterList}
              id="All"
            >No Filter</li>
            <li
              onClick={this.selectFilterList}
              id="Prospects"
            >Prospects</li>
            <li
              onClick={this.selectFilterList}
              id="Tyler+Pipeline"
            >Tyler Pipeline</li>
            <li
              onClick={this.selectFilterList}
              id="Nolan+Pipeline"
            >Nolan Pipeline</li>
            <li
              onClick={this.selectFilterList}
              id="Canceled"
            >Canceled</li>
            <li
              onClick={this.selectFilterList}
              id="From+Customer+Service+TM"
            >From Customer Service TM</li>
            <li
              onClick={this.selectFilterList}
              id="Cold+Calls"
            >Cold Calls</li>
          </ul>
        );
      }
    } else if (this.props.currentTable === 'Customers') {
      if (this.props.baseId === 'appBUKBn552B8SlbE') {
        return (
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
            >New Startups</li>
            <li
              onClick={this.selectFilterList}
              id="Crew+Changes"
            >Crew Changes</li>
            <li
              onClick={this.selectFilterList}
              id="Unhappy"
            >Unhappy</li>
            <li
              onClick={this.selectFilterList}
              id="Happy"
            >Happy</li>
            <li
              onClick={this.selectFilterList}
              id="Sergi"
            >Sergi's Accounts</li>
            <li
              onClick={this.selectFilterList}
              id="Christy"
            >Christy's Accounts</li>
          </ul>
        )
      } else {
        return (
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
            >New Startups</li>
            <li
              onClick={this.selectFilterList}
              id="Crew+Changes"
            >Crew Changes</li>
            <li
              onClick={this.selectFilterList}
              id="Unhappy"
            >Unhappy</li>
            <li
              onClick={this.selectFilterList}
              id="Happy"
            >Happy</li>
            <li
              onClick={this.selectFilterList}
              id="David"
            >David's Accounts</li>
            <li
              onClick={this.selectFilterList}
              id="Lisa"
            >Lisa's Accounts</li>
          </ul>
        )
      }
    } else if (this.props.currentTable === 'Franchisees') {
      return (
        <ul id="filtersList">
          <li
            className="isActive"
            onClick={this.selectFilterList}
            id="All"
          >No Filter</li>
          <li
            onClick={this.selectFilterList}
            id="Active"
          >Active</li>
          <li
            onClick={this.selectFilterList}
            id="Past+And+Present"
          >Past & Present</li>
          <li
            onClick={this.selectFilterList}
            id="Prospective"
          >Prospective</li>
        </ul>
      );
    }
  }
}


FilterSearch.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  selectFilterHandler: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
}
