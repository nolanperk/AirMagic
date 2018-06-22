import React, { Component } from 'react';
import propTypes from 'prop-types';

import FranchiseItem from './FranchiseItem';

import exit from '../assets/icons/white/exit.png';

export default class Navbar extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    return (
      <div className="ArchiveItems FranchiseInfoItems">
        <div className="tableHeader">
          <div className="tableCol">PROV #</div>
          <div className="tableCol">Provider Name</div>
          <div className="tableCol">Home Number</div>
          <div className="tableCol">Cell Number</div>
          <div className="tableCol">Alt. Contact</div>
          <div className="tableCol">Alt. Contact Phone</div>
        </div>
        <div className="tableContainer">
          {data.map((e, i) => this.franchiseItem(e, i))}
        </div>
      </div>

    );
  }
  franchiseItem(data, index) {
    return <FranchiseItem
            id={data.id}
            data={data.fields}
            index={index}
            changeFranchiseHandler={this.props.changeFranchiseHandler}
            editingFranchise={this.props.editingFranchise}
          />
  }
}


Navbar.propTypes ={
  data: propTypes.object.isRequired,
  isLoading: propTypes.bool.isRequired,
  changeFranchiseHandler: propTypes.func.isRequired,
  editingFranchise: propTypes.func.isRequired,
}
