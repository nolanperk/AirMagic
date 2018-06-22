import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class BaseSelect extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;


    return (
      <div className="BaseList">
        <h1>Choose Your Database</h1>
        <ul className="cardContainer">
            <li className="whiteCard">
              <Link to={`/tampa/customer-service/`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Tampa Customers</p>
                </div>
              </Link>
            </li>
          <li className="whiteCard">
            <Link to={`/`}>
              <div className="inner">
                <div className="circleDot"></div>
                <div className="baseIcon"></div>
                <p>Tampa Sales Pipeline</p>
              </div>
            </Link>
          </li>
          <li className="whiteCard">
            <Link to={`/`}>
              <div className="inner">
                <div className="circleDot"></div>
                <div className="baseIcon"></div>
                <p>Tampa Franchisees</p>
              </div>
            </Link>
          </li>
          <li className="whiteCard">
            <Link to={`/orlando/customer-service/`}>
              <div className="inner">
                <div className="circleDot"></div>
                <div className="baseIcon"></div>
                <p>Orlando Customers</p>
              </div>
            </Link>
          </li>
          <li className="whiteCard">
            <Link to={`/`}>
              <div className="inner">
                <div className="circleDot"></div>
                <div className="baseIcon"></div>
                <p>Orlando Sales Pipeline</p>
              </div>
            </Link>
          </li>
          <li className="whiteCard">
            <Link to={`/`}>
              <div className="inner">
                <div className="circleDot"></div>
                <div className="baseIcon"></div>
                <p>Orlando Franchisees</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}
