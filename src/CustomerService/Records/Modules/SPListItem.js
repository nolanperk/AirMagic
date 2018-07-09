import React, { Component } from 'react';
import propTypes from 'prop-types';

let rpRevenue;
export default class SPListItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, spList } = this.props;

    let currentVolumeData = this.props.spList;



    return (
      <option key={this.props.id} index={this.props.index} value={this.props.spList['Number']}>
        {this.props.spList['SP Name']}
      </option>
    );
  }
}


SPListItem.propTypes ={
  index: propTypes.number.isRequired,
  rpSumCalc: propTypes.func.isRequired,
  typeChangeHandler: propTypes.func.isRequired,
  spList: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
}
