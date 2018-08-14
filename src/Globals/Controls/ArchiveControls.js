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
          <option value="SP+Name" id="SP+Name">SP Name</option>
          <option value="Company+Name" id="Company+Name">Company</option>
          <option value="Address+1" id="Address+1">Address</option>
          <option value="Home+Phone" id="Home+Phone">Home Phone</option>
          <option value="Email" id="Email">Email</option>
          <option value="Plan+Type" id="Plan+Type">Plan Type</option>
        </select>
      );
    } else {
      return (
        <select id="searchBy">
          <option value="Company+Name" id="Company+Name">Company</option>
          <option value="Main+Contact" id="Main+Contact">Contact</option>
          <option value="Address+1" id="Address+1">Address</option>
          <option value="Office+Phone" id="Office+Phone">Office #</option>
          <option value="Email" id="Email">Email</option>
          <option value="Standing" id="Standing">Standing</option>
          <option value="PAM" id="PAM">PAM</option>
          <option value="SP+Name" id="SP+Name">SP Name</option>
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
