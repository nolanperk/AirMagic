import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class BaseSelect extends Component {
  componentDidMount() {
    if (sessionStorage.getItem('isLogged') !== 'true') {
      this.props.history.push('/login');
    // } else {
    //   sessionStorage.removeItem('innerOffset'); //reset it!
    //   sessionStorage.removeItem('innerClosedID'); //reset it!
    //   sessionStorage.removeItem('listView');
    //   sessionStorage.removeItem('jumpLetters');
    //   sessionStorage.removeItem('salesView');
    //   sessionStorage.removeItem('serviceView');
    }
  }
  logoutHandler = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;


    return (
      <div className="wrapper">
        <div className="btn softGrad--primary" id="logoutBtn" onClick={this.logoutHandler}>Logout</div>
        <div id="helpButton">
          <a href={`https://airtable.com/invite/l?inviteId=invfjMMpyxDUxF6m3&inviteToken=7cc8a9aedf1cbfcad5259da4811ef0dfe1981cacac8d2d9e1aaf28c4ba9a7793`} target="_blank" className="btn softGrad--secondary">Tutorials</a>
          <a href={`https://airtable.com/shrbLvluNfUKIExRt`} target="_blank" className="btn softGrad--black">Issues/Suggestions</a>
        </div>
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
              <Link to={`/tampa/sales/`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Tampa Sales</p>
                </div>
              </Link>
            </li>
            <li className="whiteCard">
              <Link to={`/tampa/franchisees`}>
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
              <Link to={`/orlando/sales/`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Orlando Sales</p>
                </div>
              </Link>
            </li>
            <li className="whiteCard">
              <Link to={`/orlando/franchisees`}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <div className="baseIcon"></div>
                  <p>Orlando Franchisees</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
