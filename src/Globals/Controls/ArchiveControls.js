import React, { Component } from 'react';
import propTypes from 'prop-types';

import search from '../../assets/icons/white/search.png';
import filter from '../../assets/icons/black/filter.png';
import sort from '../../assets/icons/black/sort.png';
import plus from '../../assets/icons/white/plus.png';

export default class SortBy extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    let ControlsClasses = 'ControlsBar normalControls';
    if (this.props.franchiseView) {
      ControlsClasses = 'ControlsBar plusControls';
    }

    return (
      <div className={ControlsClasses}>
        <div className="ControlsBar--btn" onClick={this.props.controlsModalToggle} id="filterBtn">
          <div className="navIcon whiteCard">
            <img src={filter} alt="filter" />
          </div>
          <p>No Filter</p>
        </div>
        <div className="ControlsBar--btn" onClick={this.props.controlsModalToggle} id="sortBtn">
          <div className="navIcon whiteCard">
            <img src={sort} alt="sort" />
          </div>
          <p>Sort</p>
        </div>

        <form className="ControlsBar--search" onSubmit={this.props.searchHandler}>
          <input type="text" placeholder="search records" id="searchInput" />
          {this.ControlsSelect}
          <button type="submit" className="navIcon softGrad--primary">
            <img src={search} alt="search" />
          </button>
        </form>


        <div className="navIcon softGrad--secondary" id="addNewRecord" onClick={this.props.newRecordHandler}>
          <img src={plus} alt="Add New" />
        </div>
      </div>
    );
  }

  get ControlsSelect() {
    if (this.props.currentTable === 'Franchisees') {
      return (
        <select id="searchBy">
          <option id="SP+Name">SP Name</option>
          <option id="Company+Name">Company</option>
          <option id="Address+1">Address</option>
          <option id="Home+Phone">Home Phone</option>
          <option id="Email">Email</option>
          <option id="Plan+Type">Plan Type</option>
        </select>
      );
    } else {
      return (
        <select id="searchBy">
          <option id="Company+Name">Company</option>
          <option id="Main+Contact">Contact</option>
          <option id="Address+1">Address</option>
          <option id="Office+Phone">Office #</option>
          <option id="Email">Email</option>
          <option id="Standing">Standing</option>
          <option id="PAM">PAM</option>
          <option id="SP+Name">SP Name</option>
        </select>
      );
    }
  }
}


SortBy.propTypes = {
  searchHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  franchiseView: propTypes.bool.isRequired,
  currentTable: propTypes.string.isRequired,
  newRecordHandler: propTypes.func.isRequired,
}
