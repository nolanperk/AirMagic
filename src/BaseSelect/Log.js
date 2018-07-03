import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      use: '',
      pw: '',
    }
  }
  chalog = e => {if (e.target.id === 'use') {this.setState({use: e.target.value.toUpperCase(),})}if (e.target.id === 'pw') {this.setState({pw: e.target.value,})}}
  componentDidMount() {
    if (sessionStorage.getItem('isLogged') === 'true') {
      this.props.history.push('/');
    }
  }

  chelog = e => {e.preventDefault();if ( this.state.use === 'SBM' || this.state.use === 'ACS' || this.state.use === 'JDH' || this.state.use === 'RWJ' || this.state.use === 'RAM' || this.state.use === 'NWP' || this.state.use === 'ALP' || this.state.use === 'WCP' || this.state.use === 'TMP' || this.state.use === 'LSN' || this.state.use === 'DRR' || this.state.use === 'VIK' || this.state.use === 'EBK' || this.state.use === 'LBG') {if (this.state.pw === 'Gung ho, friend!') {sessionStorage.setItem('isLogged', 'true');sessionStorage.setItem('userInitials', this.state.use);this.props.history.goBack();} else {document.getElementsByClassName('modal')[0].className = 'modal isError--pw';}} else {document.getElementsByClassName('modal')[0].className = 'modal isError--name';}}
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

          <form id="loginForm" onSubmit={this.chelog}>
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
      </div>

    );
  }

}
