import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PassString from '../pass'

export default class LoginForm extends Component {
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
    if (localStorage.getItem('isLogged')  === 'true' && localStorage.getItem('isOutside')  === 'false') {
      this.props.history.push('/');
    }
  }

  loginSubmit = e => {
    e.preventDefault();
    let finalURL = 'https://api.airtable.com/v0/appYVHBA4LOlBssy3/log';

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
            let lastLog = new Date();
            lastLog = (lastLog.getMonth()+1) + '/' + lastLog.getDate() + '/' + lastLog.getFullYear();
            if (this.state.pw === userRecord.fields['Phrase']) {
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('isOutside', 'false');
              localStorage.setItem('userInitials', userRecord.fields['Initials']);
              localStorage.setItem('userName', userRecord.fields['Name']);
              localStorage.setItem('userTitle', userRecord.fields['Title']);
              localStorage.setItem('userOffice', userRecord.fields['Office']);
              localStorage.setItem('userCell', userRecord.fields['Cellphone']);
              localStorage.setItem('lastLogin', lastLog);

              if (userRecord.fields['Signature']) {
                localStorage.setItem('userSig', userRecord.fields['Signature'][0].url);
              }
              localStorage.setItem('userEmail', userRecord.fields['Email']);
              localStorage.setItem('userExt', userRecord.fields['Ext']);
              localStorage.setItem('userRole', userRecord.fields['Role']);

              if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
                if (userRecord.fields['Role'] === 'customer-service') {
                  this.props.history.push('/' + userRecord.fields['Office'] + '/' + userRecord.fields['Role'] + '/tickets');
                } else {
                  this.props.history.push('/' + userRecord.fields['Office'] + '/' + userRecord.fields['Role']);
                }
              } else {
                this.props.history.push('/');
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

    let outsideURL;

    if (localStorage.getItem('isLogged')) {
      outsideURL = '/outside/' + localStorage.getItem('userInitials');
    } else {
      outsideURL = '/outside/login';
    }


    return (
      <div className="modal">
        <div className="LoginForm modalInner">
          <div className="modalTitle">
            <h4>Login Now</h4>
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
            <button className="btn softGrad--secondary" type="submit">Submit</button>
          </form>
        </div>

        <div id="helpButton">

          <Link to={outsideURL}>
            <a className="btn softGrad--black">Outside Callers</a>
          </Link>
        </div>
      </div>

    );
  }

}
