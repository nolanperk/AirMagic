import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

import ArchiveItem from './ArchiveItem';

export default class ListContent extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    this.gridLayout();
    if (this.props.searchQuery !== '') {
      return (
        <div className="ArchiveItems">
          <div className="btn softGrad--primary" onClick={this.props.clearSearch}>Clear Search</div>
          <div className="cardContainer">
            {data ? data.map((e, i) => this.archiveItem(e, i)) : ''}
          </div>
        </div>
      );
    } else {
      return (
        <div className="ArchiveItems">
          <div className="cardContainer">
            {data ? data.map((e, i) => this.archiveItem(e, i)) : ''}
          </div>
        </div>
      );
    }

  }
  archiveItem(data, index) {
    return <ArchiveItem
            key={data.id}
            id={data.id}
            data={data.fields}
            index={index}
            openRecordHandler = {this.props.openRecordHandler}
          />
  }
  gridLayout() {
    setTimeout(function(){
      var elem = document.querySelector('.cardContainer');
      var iso = new Isotope( elem, {itemSelector: '.ArchiveItem'});
    }, 100);
  }
  gridDestroy() {
    var elem = document.querySelector('.cardContainer');
    var iso = new Isotope( elem, {itemSelector: '.ArchiveItem'});
    iso.destroy()
  }
}


ListContent.propTypes ={
  data: propTypes.array.isRequired,
  openRecordHandler: propTypes.func.isRequired,
  clearSearch: propTypes.func.isRequired,
  searchQuery: propTypes.string.isRequired,
  isLoading: propTypes.bool.isRequired,
}
