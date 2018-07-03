import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  changeForm = e => {
    if (e.target.id === 'username') {this.setState({username: e.target.value.toUpperCase(),})}
    if (e.target.id === 'password') {this.setState({password: e.target.value,})}
  }
  componentDidMount() {
    if (sessionStorage.getItem('isLogged') === 'true') {
      this.props.history.push('/');
    }
  }

  checker = e => {e.preventDefault();if ( this.state.username === 'SBM' || this.state.username === 'ACS' || this.state.username === 'JDH' || this.state.username === 'RWJ' || this.state.username === 'RAM' || this.state.username === 'NWP' || this.state.username === 'ALP' || this.state.username === 'WCP' || this.state.username === 'TMP' || this.state.username === 'LSN' || this.state.username === 'DRR' || this.state.username === 'VIK' || this.state.username === 'EBK' || this.state.username === 'LBG') {if (this.state.password === 'GungHo,Friend') {sessionStorage.setItem('isLogged', 'true');sessionStorage.setItem('userInitials', this.state.username);this.props.history.goBack();} else {document.getElementsByClassName('modal')[0].className = 'modal isError--pw';}} else {document.getElementsByClassName('modal')[0].className = 'modal isError--name';}}
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

          <form id="loginForm" onSubmit={this.checker}>
            <div id="loginTable">

              <div className="inputBlock inputBlock--full">
                <label>Username</label>
                <input
                  type="text"
                  onChange={this.changeForm}
                  value={this.state.username}
                  id="username"
                />
              </div>

              <div className="inputBlock inputBlock--full">
                <label>Password</label>
                <input
                  type="text"
                  onChange={this.changeForm}
                  value={this.state.password}
                  type="password"
                  id="password"
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
