import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class BaseSelect extends Component {
  componentDidMount() {
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    // } else {
    //   sessionStorage.removeItem('innerOffset'); //reset it!
    //   sessionStorage.removeItem('innerClosedID'); //reset it!
    //   sessionStorage.removeItem('listView');
    //   sessionStorage.removeItem('jumpLetters');
    //   sessionStorage.removeItem('salesView');
    //   sessionStorage.removeItem('serviceView');
    } else {
      if (localStorage.getItem('isOutside')  === 'true') {
        if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
          this.props.history.push('/outside/' + localStorage.getItem('userOffice') + '/');
        } else {
          this.props.history.push('/outside/');
        }
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

    let tampaCustomers = '/tampa/customer-service';
    let orlandoCustomers = '/orlando/customer-service';
    if (localStorage.getItem('userInitials') === 'ALP' || localStorage.getItem('userRole') === 'sales') {
      tampaCustomers += '/all';
      orlandoCustomers += '/all';
    } else {
      tampaCustomers += '/tickets';
      orlandoCustomers += '/tickets';
    }

    if (localStorage.getItem('userInitials') === 'JETT' || localStorage.getItem('userInitials') === 'JASON' || localStorage.getItem('userInitials') === 'JUSTIN' || localStorage.getItem('userInitials') === 'MIKE') {
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
                <Link to={`/tampa/sales/`}>
                  <div className="inner">
                    <div className="circleDot"></div>
                    <div className="baseIcon"></div>
                    <p>Tampa Sales</p>
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
            </ul>
          </div>
        </div>
      );
    } else if (localStorage.getItem('userInitials') === 'SLT' || localStorage.getItem('userInitials') === 'PBA' || localStorage.getItem('userInitials') === 'MLM' || localStorage.getItem('userInitials') === 'CBM') {
      return (
        <div className="wrapper">
          <div className="btn softGrad--primary" id="logoutBtn" onClick={this.logoutHandler}>Logout</div>
          <div id="helpButton">
            <a href={`https://airtable.com/invite/l?inviteId=invfjMMpyxDUxF6m3&inviteToken=7cc8a9aedf1cbfcad5259da4811ef0dfe1981cacac8d2d9e1aaf28c4ba9a7793`} target="_blank" className="btn softGrad--secondary">Tutorials</a>
            <a href={`https://airtable.com/shrbLvluNfUKIExRt`} target="_blank" className="btn softGrad--black">Issues/Suggestions</a>
            {/* <Link to={`/maps/tampa`}>
              <a className="btn softGrad--black">Maps</a>
            </Link> */}
          </div>
          <div className="BaseList">
            <h1>Choose Your Database</h1>
            <div className="selects">
              <div className="leftSide">
                <Link to={`/sales/`}>
                  <div className="selectItem whiteCard">
                    <div className="inner">
                      <div className="circleDot"></div>
                      <div className="baseIcon"></div>
                      <h4>Dashboard</h4>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="rightSide">
                <Link to={`/tampa/sales/`}>
                  <div className="selectItem whiteCard">
                    <div className="circleDot"></div>
                    <div className="baseIcon"></div>
                    <p>Tampa Sales</p>
                  </div>
                </Link>
                <Link to={`/orlando/sales/`}>
                  <div className="selectItem whiteCard">
                    <div className="circleDot"></div>
                    <div className="baseIcon"></div>
                    <p>Orlando Sales</p>
                  </div>
                </Link>
                <Link to={tampaCustomers}>
                  <div className="selectItem whiteCard">
                    <div className="circleDot"></div>
                    <div className="baseIcon"></div>
                    <p>Tampa Customers</p>
                  </div>
                </Link>
                <Link to={orlandoCustomers}>
                  <div className="selectItem whiteCard">
                    <div className="circleDot"></div>
                    <div className="baseIcon"></div>
                    <p>Orlando Customers</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="btn softGrad--primary" id="logoutBtn" onClick={this.logoutHandler}>Logout</div>
          <div id="helpButton">
            <a href={`https://airtable.com/invite/l?inviteId=invfjMMpyxDUxF6m3&inviteToken=7cc8a9aedf1cbfcad5259da4811ef0dfe1981cacac8d2d9e1aaf28c4ba9a7793`} target="_blank" className="btn softGrad--secondary">Tutorials</a>
            <a href={`https://airtable.com/shrbLvluNfUKIExRt`} target="_blank" className="btn softGrad--black">Issues/Suggestions</a>
            {/* <Link to={`/maps/tampa`}>
              <a className="btn softGrad--black">Maps</a>
            </Link> */}
          </div>
          <div className="BaseList">
            <h1>Choose Your Database</h1>
            <ul className="cardContainer">
                <li className="whiteCard">
                  <Link to={tampaCustomers}>
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
                <Link to={orlandoCustomers}>
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

}
