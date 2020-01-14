import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FollowUpsList from '../Sales/FollowUpsList';
import MonthlyFollows from '../Sales/MonthlyFollows';
import axios from 'axios';


export default class BaseSelect extends Component {

  constructor(props) {
    super();
    this.state = {
      showMonthly: false,
    }
  }
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

    console.log(localStorage.userInitials);

    this.checkLogin();
  }

  checkLogin = () => {
    let finalURL = 'https://api.airtable.com/v0/appYVHBA4LOlBssy3/log';
    console.log(finalURL);

    return axios
      .get(finalURL)
      .then(response => {
        this.setState({
          checkData: response.data.records,
        });


        setTimeout((function() {
          console.log(this.state.checkData);
          let userRecord;
          if (this.state.checkData.filter(user => user.fields['Initials'] === localStorage.userInitials)[0]) {
            userRecord = this.state.checkData.filter(user => user.fields['Initials'] === localStorage.userInitials)[0];
            console.log(userRecord);
          } else {
            this.logoutHandler();
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

  logoutHandler = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }

  closeModal = () => {
    this.setState({
      showMonthly: false,
    })
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
    } else if (localStorage.getItem('userInitials') === 'TEST' || localStorage.getItem('userInitials') === 'SSC' || localStorage.getItem('userInitials') === 'SLT' || localStorage.getItem('userInitials') === 'LSS' || localStorage.getItem('userInitials') === 'BEG' || localStorage.getItem('userInitials') === 'MLM' || localStorage.getItem('userInitials') === 'CBM') {
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


                <Link to={`/yelp/`}>
                  <div className="selectItem whiteCard">
                    <div className="inner">
                      <h4>Yelp Lists</h4>
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

    } else if (localStorage.getItem('userRole') === 'sales' && localStorage.getItem('salesType') === 'Outside' && window.innerWidth > 900) {
      return (
        <div className="wrapper outsideSales">
          <FollowUpsList />
          {this.MonthlyFollows}

          <div className="ActivityWrapper">
            <div className="btn softGrad--primary" id="logoutBtn" onClick={this.logoutHandler}>Logout</div>
            <div className="btn softGrad--black" id="monthlyFollows" onClick={()=>this.setState({showMonthly:true,})}>Monthly Follows</div>

            <div className="activityContainer">
              <h4>Tampa</h4>
              <div className='activityItem'>
                <a href={'/tampa/sales/'} className="absLink"></a>
                <div className='prettyLabel tSales'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Sales</h4>
                  </div>
                </div>
              </div>

              <div className='activityItem'>
                <a href={'/tampa/customer-service/all'} className="absLink"></a>
                <div className='prettyLabel tCustomers'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Customers</h4>
                  </div>
                </div>
              </div>

              <div className='activityItem'>
                <a href={'/tampa/franchisees/'} className="absLink"></a>
                <div className='prettyLabel tFranchise'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Franchisees</h4>
                  </div>
                </div>
              </div>



              <hr />

              <h4>Orlando</h4>
              <div className='activityItem'>
                <a href={'/orlando/sales/'} className="absLink"></a>
                <div className='prettyLabel oSales'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Sales</h4>
                  </div>
                </div>
              </div>

              <div className='activityItem'>
                <a href={'/orlando/customer-service/all'} className="absLink"></a>
                <div className='prettyLabel oCustomers'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Customers</h4>
                  </div>
                </div>
              </div>

              <div className='activityItem'>
                <a href={'/orlando/franchisees/'} className="absLink"></a>
                <div className='prettyLabel oFranchise'>
                  <div class="inner">
                  </div>
                </div>

                <div className="activityContent">
                  <div className="inner">
                    <h4>Franchisees</h4>
                  </div>
                </div>
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

  get MonthlyFollows() {
    if (this.state.showMonthly) {
      return (
        <MonthlyFollows
          closeModal={this.closeModal}
         />
      )
    }
  }

}
