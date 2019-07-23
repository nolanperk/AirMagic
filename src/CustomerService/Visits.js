import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import filter from '../assets/icons/black/filter.png';
import sort from '../assets/icons/black/sort.png';
import loader from '../assets/loader.gif';

export default class Visits extends Component {

  render() {
    return (
      <div className="VisitDash">
        <div className="callNav">
          <Link to={`/`}>
            <div className="navIcon softGrad--black">
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
