import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PassString from '../jettpass'

export default class OutsideLoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      use: '',
      pw: '',
      checkData: [],
    }
  }

  chalog = e => {if (e.target.id === 'use') {this.setState({use: e.target.value.toUpperCase(),})}if (e.target.id === 'pw') {this.setState({pw: e.target.value,})}}
  componentDidMount() {
    if (localStorage.getItem('isLogged')  === 'true') {
      this.props.history.push('/');
    }
  }

  loginSubmit = e => {
    e.preventDefault();
    let finalURL = 'https://api.airtable.com/v0/appYVHBA4LOlBssy3/outside';

    return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          checkData: response.data.records,
        });

        setTimeout((function() {
          let userRecord;
          if (this.state.checkData.filter(user => user.fields['Initials'] === this.state.use)[0]) {
            userRecord = this.state.checkData.filter(user => user.fields['Initials'] === this.state.use)[0];
            console.log(userRecord.fields);
            if (this.state.pw === userRecord.fields['Phrase']) {
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('isOutside', 'true');
              localStorage.setItem('userOffice', userRecord.fields['Office']);
              localStorage.setItem('userInitials', userRecord.fields['Initials']);
              localStorage.setItem('userName', userRecord.fields['Name']);
              localStorage.setItem('tampaList', userRecord.fields['Tampa List']);
              localStorage.setItem('orlandoList', userRecord.fields['Orlando List']);

              if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
                this.props.history.push('/outside/' + userRecord.fields['Office'] + '/');
              } else {
                this.props.history.push('/outside/');
              }
            } else {
              document.getElementsByClassName('modal')[0].className = 'modal isError--pw';
            }
          } else {
            document.getElementsByClassName('modal')[0].className = 'modal isError--name';
          }
        }).bind(this), 0);
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          error: `${error}`,
        });
      });
  }
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;


    return (
      <div className="modal">
        <div className="LoginForm modalInner">
          <div className="modalTitle">
            <h4>Please Login.</h4>
          </div>

          <form id="loginForm" onSubmit={this.loginSubmit}>
            <div id="loginTable">

              <div className="inputBlock inputBlock--full">
                <label>Username</label>
                <input
                  type="text"
                  onChange={this.chalog}
                  value={this.state.use}
                  id="use"
                />
              </div>

              <div className="inputBlock inputBlock--full">
                <label>Password</label>
                <input
                  type="text"
                  onChange={this.chalog}
                  value={this.state.pw}
                  type="password"
                  id="pw"
                />
              </div>

            </div>
            <button className="btn softGrad--blue" type="submit">Submit</button>
          </form>
        </div>
      </div>

    );
  }

}
