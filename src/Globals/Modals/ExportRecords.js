import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class ExportRecords extends Component {
  selectExport = e => {
    let allFilters = e.target.parentNode.getElementsByTagName("*");
    let index;
    for (index = 0; index < allFilters.length; ++index) {
      allFilters[index].className = "inActive";
    }
    e.target.className = "isActive";
  }

  selectChange = e => {
    if (e.target.options[e.target.selectedIndex].getAttribute('data-range') === 'true') {
      document.getElementById('startRange').className = 'isHidden';
      document.getElementById('endRange').className = 'isHidden';
    } else {
      document.getElementById('startRange').className = '';
      document.getElementById('endRange').className = '';
    }
    // console.log(e.target.options[e.target.selectedIndex]);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let today  = new Date();

    let currentMonth = today.getMonth() + 1
    let currentDay = today.getDate()
    let currentYear = today.getFullYear()


    setTimeout((function() {
      document.getElementById('endRange').getElementsByClassName('day')[0].value = currentDay;
      document.getElementById('endRange').getElementsByClassName('month')[0].value = currentMonth;
      document.getElementById('endRange').getElementsByClassName('year')[0].value = currentYear;
    }).bind(this), 50);



    let fileName;
    fileName = (today.getMonth()+1) + "-" + today.getDate()  + "-" + today.getFullYear();


    return (
      <div className="FilterModal modalInner">
        <div className="modalTitle">
          <h4>Choose Your Export</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>

        <form id="exportForm" onSubmit={this.props.submitExport}>

          <p>Export Type</p>
          <div className="selectBox" id="rangeBox" onChange={this.selectChange}>
            {this.exportsSelect}
          </div>

          <div id="startRange" className="isHidden">
            <p>Start Range</p>
            <div className="selectBox">
              <select className="month">
                <option disabled>Month</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <div className="selectBox">
              <select className="day">
                <option disabled>Day</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
            </div>
            <div className="selectBox">
              <select className="year">
                <option disabled>Year</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
                <option>2010</option>
                <option>2009</option>
                <option>2008</option>
                <option>2007</option>
                <option>2006</option>
                <option>2005</option>
                <option>2004</option>
              </select>
            </div>
          </div>

          <div id="endRange" className="isHidden">
            <p>End Range</p>
            <div className="selectBox">
              <select className="month">
                <option disabled>Month</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <div className="selectBox">
              <select className="day">
                <option disabled>Day</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
            </div>
            <div className="selectBox">
              <select className="year">
                <option disabled>Year</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
                <option>2010</option>
                <option>2009</option>
                <option>2008</option>
                <option>2007</option>
                <option>2006</option>
                <option>2005</option>
                <option>2004</option>
              </select>
            </div>
          </div>


          <div className="newFilterTrigger">
            <button type="submit" className="btn softGrad--secondary">Submit</button>
          </div>
        </form>


      </div>

    );
  }

  get exportsSelect() {
    if (this.props.currentTable === 'Sales') {
      return (
        <select id="rangeBy">
          <option disabled>Needs Range</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=Lead+Source"
            data-filter-1="Close+Date">
            New Closes Report</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=Lead+Source"
            data-filter-1="Appt.+Date">
            Appointments Report</option>
        </select>
      );
    } else {
      return (
        <select id="rangeBy">
          <option disabled>Disregard Range</option>
          <option
            data-filter-type="default"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount&fields%5B%5D=Standing&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Last+Call&fields%5B%5D=Office+Phone&fields%5B%5D=Extension&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=Lead+Source&fields%5B%5D=PAM"
            data-filter-1="FIND(%22Active%22%2C%7BStatus%7D)">
            Actives Customer Service</option>

          <option disabled>Needs Range</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=Lead+Source&fields%5B%5D=PAM"
            data-filter-1="Close+Date">
            New Closes Report</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
            data-filter-1="Start+Date">
            New Startups</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
            data-filter-1="New+SP+Start">
            Crew Changes</option>
          <option
            data-filter-type="ranged"
            data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
            data-filter-1="Cancel+Date">
            New Cancelations</option>
        </select>
      );
    }
  }
}


ExportRecords.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
}
