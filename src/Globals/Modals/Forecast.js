import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      speed: '',
    }
  }

  ratingChange = e => {this.setState({rating: e.target.value});}
  speedChange = e => {this.setState({speed: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        rating: this.props.rating,
        speed: this.props.speed,
      })
    }).bind(this), 50);
  }


  selectChange = () => {
    let foreSpeed = document.getElementById('foreSpeed').value;
    console.log(foreSpeed);

    if (foreSpeed === '') {
      document.getElementById('submitFore').className = "btn softGrad--secondary disabled";
    } else {
      document.getElementById('submitFore').className = "btn softGrad--secondary";
    }
  }

  // Render
  // ----------------------------------------------------
  render() {

    return (
      <div className="FilterModal modalInner doubleModal">
        <div className="modalTitle">
          <h4>Please Forecast Your Expectations</h4>
        </div>

        <form id="exportForm" onSubmit={this.props.forecastSave}>

          <p>How soon do you expect to close this account?</p>
          <div className="selectBox mergeBox" onChange={this.selectChange}>
            <select id="foreSpeed" value={this.state.speed} onChange={this.speedChange}>
              <option value="">
                Select Speed</option>
                <option >This Month</option>
                <option >Within 6 Months</option>
                <option >Within 18 Months</option>
              </select>
          </div>

          <div className="newFilterTrigger">

            <button type="submit" id="submitFore" className={this.state.speed === '' ? 'btn softGrad--secondary disabled' : 'btn softGrad--secondary'}>Submit</button>
          </div>
        </form>


      </div>

    );
  }
}


Forecast.propTypes = {
  forecastSave: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
