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

  loadData = () => {
  };
  chalog = e => {if (e.target.id === 'use') {this.setState({use: e.target.value.toUpperCase(),})}if (e.target.id === 'pw') {this.setState({pw: e.target.value,})}}
  componentDidMount() {
    if (localStorage.getItem('isLogged')  === 'true') {
      this.props.history.push('/');
    }
    this.loadData();
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
            if (this.state.pw === userRecord.fields['Phrase']) {
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('userInitials', userRecord.fields['Initials']);
              localStorage.setItem('userName', userRecord.fields['Name']);
              localStorage.setItem('userOffice', userRecord.fields['Office']);
              localStorage.setItem('userRole', userRecord.fields['Role']);

              if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
                this.props.history.push('/' + userRecord.fields['Office'] + '/' + userRecord.fields['Role']);
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
          <Link to={`/jett/`}>
            <a className="btn softGrad--black">Jett, Click Here</a>
          </Link>
        </div>
      </div>

    );
  }

}
