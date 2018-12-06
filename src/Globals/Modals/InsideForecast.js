import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class InsideForecast extends Component {
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
    let foreSpeed = document.getElementById('foreSpeedInside').value;
    let foreRating = document.getElementById('foreRatingInside').value;
    console.log(foreSpeed + ' / ' + foreRating);

    if (foreSpeed === '' || foreRating === '') {
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
          <h4>Please Forecast the Appointment</h4>

          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>

        <form id="exportForm" onSubmit={this.props.insideForecastSave}>

          <p>How would you rate our chances of closing this account?</p>
          <div className="selectBox mergeBox" onChange={this.selectChange}>
            <select id="foreRatingInside" value={this.state.rating} onChange={this.ratingChange}>
              <option value="">
                Select Rating</option>
                <option value="Unlikely">Unlikely</option>
                <option value="Okay">It's Possible</option>
                <option value="Good">Good Chance</option>
                <option value="Great">We're 1st or 2nd Choice</option>
                <option value="Awesome">Expected Close</option>
              </select>
          </div>

          <p>How soon do you expect them to make a decision?</p>
          <div className="selectBox mergeBox" onChange={this.selectChange}>
            <select id="foreSpeedInside" value={this.state.speed} onChange={this.speedChange}>
              <option value="">
                Select Speed</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Soon</option>
                <option>Eventually</option>
                <option>Unknown</option>
              </select>
          </div>

          <div className="newFilterTrigger">
            <button type="submit" id="submitFore" className="btn softGrad--secondary disabled">Submit</button>
            <button  className="btn softGrad--primary" onClick={this.props.skipForecast}>Skip</button>
          </div>
        </form>


      </div>

    );
  }
}


InsideForecast.propTypes = {
  forecastSave: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
  skipForecast: propTypes.func.isRequired,
}
