import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ArchiveItem extends Component {


  // Render
  // ----------------------------------------------------
  render() {
    const { data } = this.props;


    return (
      <div className="tableRow" onClick={()=>this.props.editingFranchise(data, this.props.id, this.props.index)} key={this.props.id} index={this.props.index} data={data}>
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['PROV #']}
          id="prov"
        />
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['Provider Name']}
          id="name"
        />
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['Home Number']}
          id="home"
        />
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['Cell Number']}
          id="cell"
        />
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['Alternate Contact']}
          id="alt"
        />
        <input
          className="tableCol"
          onChange={this.props.changeFranchiseHandler}
          value={this.props.data['Alternate Contact Phone']}
          id="altPhone"
        />
      </div>
    );
  }
}


ArchiveItem.PropTypes ={
  index: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  changeFranchiseHandler: PropTypes.func.isRequired,
  editingFranchise: PropTypes.func.isRequired,
}
