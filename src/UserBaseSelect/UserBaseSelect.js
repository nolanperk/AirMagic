import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class BaseSelect extends Component {
  componentDidMount() {
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/outside/login');
    } else {
      if (localStorage.getItem('userOffice') !== 'both') {
        this.props.history.push('/outside/' + localStorage.getItem('userOffice') + '/');
      } else {
        this.props.history.push('/outside/');
      }
    }
  }
  logoutHandler = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    let preURL = this.props.location.pathname;

    if (preURL.slice(-1) !== '/') {
      preURL += '/';
    }


    return (
      <div className="wrapper">
        <div className="btn softGrad--primary" id="logoutBtn" onClick={this.logoutHandler}>Logout</div>
        <div id="helpButton">
          <a href={`https://airtable.com/shrbLvluNfUKIExRt`} target="_blank" className="btn softGrad--black">Report Issues</a>
        </div>
        <div className="BaseList">
          <h1>Choose Your Database</h1>
          <ul className="cardContainer">
            <li className="whiteCard">
              <Link to={preURL + `tampa/`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Tampa Sales</p>
                </div>
              </Link>
            </li>
            <li className="whiteCard">
              <Link to={preURL + `orlando/`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Orlando Sales</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
