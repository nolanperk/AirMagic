import React, { Component } from 'react';
import propTypes from 'prop-types';

import attentionImage from '../assets/icons/white/attention.png';
import phoneImg from '../assets/icons/white/phone.png';
import accountImg from '../assets/icons/white/account.png';
import loader from '../assets/loader.gif';
import search from '../assets/icons/white/search.png';

export default class SplashView extends Component {

  splashSelect = e => {
    if (this.props.clearedAttention && this.props.clearedProactive) {
      let allURL = this.props.pathname + '/all';
      let proURL = this.props.pathname + '/proactive';
      let attURL = this.props.pathname + '/attention';
      let visitURL = this.props.pathname + '/visit';

      if (e.target.closest('.splashCard').id === 'attention') {
        this.props.history.push(attURL.replace('//', '/'));
      } else if (e.target.closest('.splashCard').id === 'proactive') {
        this.props.history.push(proURL.replace('//', '/'));
      } else if (e.target.closest('.splashCard').id === 'browseAll') {
        this.props.history.push(allURL.replace('//', '/'));
      } else if (e.target.closest('.splashCard').id === 'visits') {
        this.props.history.push(visitURL.replace('//', '/'));
      }
    }
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, customersData } = this.props;


    return (
      <div className="SplashView">
        <div className="splashWrapper">
          <div className="linkSet">

              <div id="attention" className="splashCard splashCard--attention" onClick={this.splashSelect}>
                <div className="inner">
                  {this.cornerAtt}
                  <div className="circleDot">
                    <img src={attentionImage} />
                  </div>
                  <p>Needs Attention</p>
                </div>
              </div>
              <div id="proactive" className="splashCard splashCard--proactive" onClick={this.splashSelect}>
                <div className="inner">
                  {this.cornerPro}
                  <div className="circleDot">
                    <img src={phoneImg} />
                  </div>
                  <p>Proactive Calls</p>
                </div>
              </div>

              <div id="visits" className="splashCard splashCard--visit" onClick={this.splashSelect}>
                <div className="inner">
                  <div className="circleDot">
                    <img src={accountImg} />
                  </div>
                  <p>Proative Visits</p>
                </div>
              </div>
              <div id="browseAll" className="splashCard splashCard--all" onClick={this.splashSelect}>
                <div className="inner">
                  <div className="circleDot"></div>
                  <p>Browse All</p>
                </div>
              </div>
          </div>
        </div>




        <div className="searchArea">
          <div className="innerSearch">
            <h2>Search for Customer</h2>

            <form className="ControlsBar--search" onSubmit={this.props.searchHandler}>
              <input type="text" placeholder="search records" id="searchInput" />
              <select id="searchBy">
                <option value="Company+Name" id="Company+Name">Company</option>
                <option value="Main+Contact" id="Main+Contact">Contact</option>
                <option value="Zip" id="Zip">Zip</option>
                <option value="Address+1" id="Address+1">Address</option>
                <option value="Office+Phone" id="Office+Phone">Office #</option>
                <option value="Email" id="Email">Email</option>
                <option value="Standing" id="Standing">Standing</option>
                <option value="PAM" id="PAM">PAM</option>
                <option value="SP+Name" id="SP+Name">SP Name</option>
              </select>
              <button type="submit" className="navIcon softGrad--primary">
                <img src={search} alt="search" />
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }

  get cornerAtt() {
    if (this.props.clearedAttention) {
      return(
        <div className="cornerNumber">
          {this.props.attentionLength ? this.props.attentionLength : ' '}
        </div>
      );
    } else {
      return(
        <div className="cornerNumber loading">
          <img src={loader} alt="" />
        </div>
      );
    }
  }

  get cornerPro() {
    if (this.props.clearedProactive) {
      return(
        <div className="cornerNumber">
          {this.props.proactiveLength ? this.props.proactiveLength : ' '}
        </div>
      );
    } else {
      return(
        <div className="cornerNumber loading">
          <img src={loader} alt="" />
        </div>
      );
    }
  }
}

SplashView.propTypes ={
  searchHandler: propTypes.func,
  clearedAttention: propTypes.bool,
  clearedProactive: propTypes.bool,
  proactiveLength: propTypes.number,
  attentionLength: propTypes.number,
}
