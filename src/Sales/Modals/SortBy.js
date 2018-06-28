import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class SortBy extends Component {

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Sort Records By</h4>

          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>


        <div id="sortTable">
          <div className="selectBox">
            <select id="sortLabel">
              <option id="Company+Name">Name</option>
              <option id="Main+contact">Contact</option>
              <option id="Address+1">Address</option>
              <option id="Monthly+Amount">Monthly Amount</option>
              <option id="SP+Name">SP Name</option>
              <option id="PAM">PAM</option>
              <option id="Standing">Standing</option>
              <option id="Last+Call">Last Call</option>
            </select>
          </div>
          <div className="selectBox">
            <select id="sortOrder">
              <option id="asc">Ascending</option>
              <option id="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="btn softGrad--secondary" onClick={this.props.sortSubmitHandler}>Submit</div>
      </div>

    );
  }
}


SortBy.propTypes = {
  sortSubmitHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
}
