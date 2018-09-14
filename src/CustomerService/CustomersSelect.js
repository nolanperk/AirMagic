import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SplashView from './SplashView';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import filter from '../assets/icons/black/filter.png';
import sort from '../assets/icons/black/sort.png';
import loader from '../assets/loader.gif';

let finalURL;
export default class CustomerService extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: '',
      currentTable: 'Customers',
      loadingText: 'Loading',
    }
  }

  componentWillMount() {
    console.log(this.props.citySet);
    if (this.props.citySet === 'tampa') {
      this.setState({
        loading: false,
        baseId: 'apps7GoAgK23yrOoY',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        loading: false,
        baseId: 'appBUKBn552B8SlbE',
      });
    }
    setTimeout((function() {
      console.log('loading data from ' + this.state.baseId);
    }).bind(this), 50);
  }

  loadSplashData = () => {
    let clearedCount = 0;

    this.setState({
      attentionOffset: '',
      attentionData: [],
      proactiveOffset: '',
      proactiveData: [],
      clearedAttention: false,
      clearedProactive: false,
      loadingText: 'Finding What Needs Attention',
      loading: true,
    });

    let attentionURL;
    let proactiveURL;


    let attentionFinish = function() {
      //SPLIT ATTENTION INTO PROPER CATEGORY
      let newAttentionData = {
        "newClose": [],
        "newStart": [],
        "crew": [],
        "unhappy": [],
        "satisfied": [],
      };
      let attentionLength = 0;
      console.log(this.state.attentionData);

      for (var i in this.state.attentionData) {
        let thisMonthly = parseInt(this.state.attentionData[i].fields['Monthly Amount']);

        if (this.state.attentionData[i].fields['Standing'] === 'New Close') {
          attentionLength ++;
          let newItem = {};
          newItem['fields'] = this.state.attentionData[i].fields;
          newItem['id'] = this.state.attentionData[i].id;
          newAttentionData['newClose'].push(newItem);
        } else if (this.state.attentionData[i].fields['Standing'] === 'New Customer') {
          if (this.state.attentionData[i].fields['Start Date']) {
            let startDate = new Date(this.state.attentionData[i].fields['Start Date']);
            let callDate;

            if (this.state.attentionData[i].fields['Last Call']) {
              callDate = new Date(this.state.attentionData[i].fields['Last Call']);

              if (startDate > callDate) {
                console.log('start > call - ' + this.state.attentionData[i].fields['Company Name']);
                attentionLength ++;
                let newItem = {};
                newItem['fields'] = this.state.attentionData[i].fields;
                newItem['id'] = this.state.attentionData[i].id;
                newAttentionData['newStart'].push(newItem);
              } else {
                console.log('ELSE - ' + this.state.attentionData[i].fields['Company Name']);
              }
            } else {
              console.log('no call - ' + this.state.attentionData[i].fields['Company Name']);
              attentionLength ++;
              let newItem = {};
              newItem['fields'] = this.state.attentionData[i].fields;
              newItem['id'] = this.state.attentionData[i].id;
              newAttentionData['newStart'].push(newItem);
            }
          }
        } else if (this.state.attentionData[i].fields['Standing'] === 'Crew Change') {
          attentionLength ++;
          let newItem = {};
          newItem['fields'] = this.state.attentionData[i].fields;
          newItem['id'] = this.state.attentionData[i].id;
          newAttentionData['crew'].push(newItem);
        } else if (this.state.attentionData[i].fields['Standing'] === 'Unhappy') {
          if (thisMonthly > 499) {
            attentionLength ++;
            let newItem = {};
            newItem['fields'] = this.state.attentionData[i].fields;
            newItem['id'] = this.state.attentionData[i].id;
            newAttentionData['unhappy'].push(newItem);
          }
        } else if (this.state.attentionData[i].fields['Standing'] === 'Satisfied') {
          if (thisMonthly > 499) {
            attentionLength ++;
            let newItem = {};
            newItem['fields'] = this.state.attentionData[i].fields;
            newItem['id'] = this.state.attentionData[i].id;
            newAttentionData['satisfied'].push(newItem);
          }
        }
      }

      this.setState({
        attentionData: newAttentionData,
        attentionLength: attentionLength,
      });

      setTimeout((function() {
        this.setState({
          loading: false,
        });
      }).bind(this), 2000);

    }.bind(this);

    let proactiveFinish = function() {
      //FILTER OUT UNNECESARY PROACTIVES
      let newProactiveData = {
        "everyOtherMonth": [],
        "everyMonth": [],
        "twicePerMonth": []
      };
      let proactiveLength = 0;
      for (var i in this.state.proactiveData) {
        if (this.state.proactiveData[i].fields['Monthly Amount']) {
          let thisMonthly = parseInt(this.state.proactiveData[i].fields['Monthly Amount']);
          if (thisMonthly > 499 && thisMonthly <= 999) {
            proactiveLength ++;
            let newItem = {};
            newItem['fields'] = this.state.proactiveData[i].fields;
            newItem['id'] = this.state.proactiveData[i].id;
            newProactiveData['everyOtherMonth'].push(newItem);
          } else if (thisMonthly > 999 && thisMonthly <= 1499) {
            proactiveLength ++;
            let newItem = {};
            newItem['fields'] = this.state.proactiveData[i].fields;
            newItem['id'] = this.state.proactiveData[i].id;
            newProactiveData['everyMonth'].push(newItem);
          } else if (thisMonthly > 1499) {
            proactiveLength ++;
            let newItem = {};
            newItem['fields'] = this.state.proactiveData[i].fields;
            newItem['id'] = this.state.proactiveData[i].id;
            newProactiveData['twicePerMonth'].push(newItem);
          }
        }
      }

      this.setState({
        proactiveData: newProactiveData,
        proactiveLength: proactiveLength,
      });
    }.bind(this);


    setTimeout((function() {
      let loadAttention = function() {
        console.log('load attention');
        let preAttention = this.state.attentionData;

        attentionURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '?view=Attention';
        if (this.state.attentionOffset !== '') {attentionURL = attentionURL + '&offset=' + this.state.attentionOffset;}

        // finalURL = finalURL + '&pageSize=5';
        console.log(attentionURL);
        return axios
          .get(attentionURL).then(response => {
            this.setState({
              attentionData: preAttention.concat(response.data.records),
              error: false,
              attentionOffset: response.data.offset,
            });
          if (response.data.offset !== undefined && this.props.location.pathname === "/" + this.props.citySet + "/customer-service/") {
            console.log(this.state.clearedAttention);
            loadAttention();
          } else {
            console.log('clearing loadAttention()');
            this.setState({
              clearedAttention: true,
              loadingText: 'Generating Proactive Call List'
            });
            attentionFinish();
          }
        });
      }.bind(this);
      let loadProactive = function() {
        console.log('load proactive');
        let preProactive = this.state.proactiveData;

        proactiveURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '?view=Proactive';
        if (this.state.proactiveOffset !== '') {proactiveURL = proactiveURL + '&offset=' + this.state.proactiveOffset;}

        console.log(proactiveURL);
        return axios
          .get(proactiveURL).then(response => {
            this.setState({
              proactiveData: preProactive.concat(response.data.records),
              error: false,
              proactiveOffset: response.data.offset,
            });
          if (response.data.offset !== undefined && this.props.location.pathname === "/" + this.props.citySet + "/customer-service/") {
            console.log(this.state.clearedProactive);
            loadProactive();
          } else {
            this.setState({
              clearedProactive: true,
              loadingText: 'Loading',
            });
            console.log('clearing loadProactive()');
            proactiveFinish();
          }
        });
      }.bind(this);

      loadAttention(); //start loading attention

      setTimeout((function() { //delay loading proactive
        loadProactive();
      }).bind(this), 500);

    }).bind(this), 500);
  }

  searchHandler = e => {
    e.preventDefault();

    let searchBy = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id;
    let searchByValue = document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].value;

    this.setState({
      searchQuery: document.getElementById('searchInput').value,
      searchBy: document.getElementById('searchBy').options[document.getElementById('searchBy').selectedIndex].id,
    });

    setTimeout((function() {
      sessionStorage.setItem('searchQuery', this.state.searchQuery);
      sessionStorage.setItem('searchBy', this.state.searchBy);

      setTimeout((function() {
        if (this.state.clearedAttention && this.state.clearedProactive) {
          let allURL = this.props.location.pathname + '/all';
          this.props.history.push(allURL.replace('//', '/'));
        }
      }).bind(this), 50);
    }).bind(this), 10);

  }


  componentDidMount() {
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    } else {
      if (localStorage.getItem('userInitials') === 'JETT') {
        this.props.history.push('/jett/');
      }

      this.loadSplashData();
    }
  }

  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>{this.state.loadingText}</h4>
            </div>
          </div>
        </div>
      )
    }
    if (error) {
      return (
        <p>
          There was an error loading the data.{" "}
          <button onClick={this.loadData}>Try again</button>
        </p>
      );
    }


    return (
      <div className="Customers">
        <div className="Navbar">
          <Link to={`/`}>
            <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
        </div>
        <SplashView
          attentionData={this.state.attentionData}
          proactiveData={this.state.proactiveData}

          searchHandler={this.searchHandler}

          attentionLength={this.state.attentionLength}
          proactiveLength={this.state.proactiveLength}
          splashSelect={this.splashSelect}
          pathname={this.props.location.pathname}
          clearedProactive={this.state.clearedProactive}
          clearedAttention={this.state.clearedAttention}
          history={this.props.history}
        />
      </div>
    );
  }

}
