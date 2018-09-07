import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ModuleAbility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perCapacityValue: '',
      monthlyCapacityValue: '',
      lookingValue: '',
      carpetsValue: '',
      sWaxValue: '',
      buffingValue: '',
      tilesValue: '',
    }
  }


  perCapacityChange = e => {this.setState({perCapacityValue: e.target.value});}
  monthlyCapacityChange = e => {this.setState({monthlyCapacityValue: e.target.value});}
  lookingChange = e => {this.setState({lookingValue: e.target.value});}
  carpetsChange = e => {this.setState({carpetsValue: e.target.value});}
  sWaxChange = e => {this.setState({sWaxValue: e.target.value});}
  buffingChange = e => {this.setState({buffingValue: e.target.value});}
  tilesChange = e => {this.setState({tilesValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        perCapacityValue: this.props.perCapacity,
        monthlyCapacityValue: this.props.monthlyCapacity,
        lookingValue: this.props.looking,
        carpetsValue: this.props.carpets,
        sWaxValue: this.props.sWax,
        buffingValue: this.props.buffing,
        tilesValue: this.props.tiles,
      })
    }).bind(this), 50);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let area = this.props.area;
    let perCapacity = this.props.perCapacity;
    let monthlyCapacity = this.props.monthlyCapacity;
    let looking = this.props.looking;
    let carpets = this.props.carpets;
    let sWax = this.props.sWax;
    let buffing = this.props.buffing;
    let tiles = this.props.tiles;


    return (
      <div className="ModuleCard">
        <div className="inner">

          <div className="inputBlock inputBlock--full">
            <label>Zip Code Coverage</label>
            <input
              type="text"
              value={area}
              id="area"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Account Total</label>
            <div
              className="selectBlock"
              id="perCapacity"
              >
              <select id="perCapacitySelect" value={this.state.perCapacityValue} onChange={this.perCapacityChange}>
                <option></option>
                <option value="300">Under $300</option>
                <option value="750">$300-$750</option>
                <option value="1500">$750-$1500</option>
                <option value="over">$1500+</option>
              </select>
            </div>
          </div>

          <div className="inputBlock inputBlock--half">
            <label>Monthly Total</label>
            <div
              className="selectBlock"
              id="monthlyCapacity"
              >
              <select id="monthlyCapacitySelect" value={this.state.monthlyCapacityValue} onChange={this.monthlyCapacityChange}>
                <option></option>
                <option value="500">Under $500</option>
                <option value="1000">$500-$1000</option>
                <option value="2000">$1000-$2000</option>
                <option value="3000">$2000-$3000</option>
                <option value="over">$3000+</option>
              </select>
            </div>
          </div>


          <div className="inputBlock inputBlock--full">
            <label>Looking for More?</label>
            <div
              className="selectBlock"
              id="looking"
              >
              <select id="lookingSelect" value={this.state.lookingValue} onChange={this.lookingChange}>
                <option></option>
                <option>No</option>
                <option value="500">Up to $500</option>
                <option value="1000">Up to $1,000</option>
                <option value="2000">Up to $2,000</option>
                <option value="More">Over $2,000</option>
              </select>
            </div>
          </div>

          <hr />
          <h4>Specialties</h4>
          <hr />

          <div className="inputBlock inputBlock--quart">
            <label>Carpets</label>
            <div
              className="selectBlock"
              id="carpets"
              >
              <select id="carpetsSelect" value={this.state.carpetsValue} onChange={this.carpetsChange}>
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>S & W</label>
            <div
              className="selectBlock"
              id="sWax"
              >
              <select id="sWaxSelect" value={this.state.sWaxValue} onChange={this.sWaxChange}>
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Buffing</label>
            <div
              className="selectBlock"
              id="buffing"
              >
              <select id="buffingSelect" value={this.state.buffingValue} onChange={this.buffingChange}>
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Tile</label>
            <div
              className="selectBlock"
              id="tiles"
              >
              <select id="tilesSelect" value={this.state.tilesValue} onChange={this.tilesChange}>
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

ModuleAbility.propTypes ={
  changeRecordHandler: propTypes.func.isRequired,

  area: propTypes.string,
  perCapacity: propTypes.string,
  monthlyCapacity: propTypes.string,
  looking: propTypes.string,
  carpets: propTypes.string,
  sWax: propTypes.string,
  buffing: propTypes.string,
  tiles: propTypes.string,
}
