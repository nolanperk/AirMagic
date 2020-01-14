import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

var checkCount = 0;
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
    if (e.target.options[e.target.selectedIndex].getAttribute('data-filter-type') === 'default') {
      document.getElementById('startRange').className = 'isHidden';
      document.getElementById('endRange').className = 'isHidden';
    } else {
      document.getElementById('startRange').className = '';
      document.getElementById('endRange').className = '';
    }
    // console.log(e.target.options[e.target.selectedIndex]);
  }

  toggleCheck = e => {
    checkCount ++;

    if (checkCount === 2) {
      if (e.target.closest(".CheckItem").className === 'CheckItem') {
        //add
        e.target.closest(".CheckItem").className = 'CheckItem isActive';
      } else {
        //remove
        e.target.closest(".CheckItem").className = 'CheckItem';
      }
      checkCount = 0;
    }
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
          <h4>Build Your Export</h4>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>
        </div>

        <form id="exportForm" onSubmit={this.props.submitExport}>

          {this.exportsSelect}


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
        <div className="inner">

          <div className="filterBy">
            <p>Select Filter</p>
            <div className="selectBox">
              <select id="rangeBy">
                <option>Select Filter</option>
                <option value="Appt.+Date">By Appt. Date</option>
                <option value="Proposal+Date">By Proposal Date</option>
                <option value="Close+Date">By Close Date</option>
                <option value="Start+Date">By Start Date</option>
              </select>
            </div>
          </div>

          <div className="regionChecks">
            <p>Select Region(s)</p>
            <div className="CheckItem" onClick={this.toggleCheck}>
              <input type="checkbox" name="regionCheck" id="region-tampa" value="tampa" />
              <label for="region-tampa">Tampa</label>
            </div>
            <div className="CheckItem" onClick={this.toggleCheck}>
              <input type="checkbox" name="regionCheck" id="region-orlando" value="orlando" />
              <label for="region-orlando">Orlando</label>
            </div>
          </div>

          <div id="startRange">
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
                <option>2020</option>
                <option selected>2019</option>
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

          <div id="endRange">
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
                <option>2020</option>
                <option selected>2019</option>
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

          <p>Select Fields</p>
          <div className="fieldsList">
            <div class="inner">

              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-1" value="Appt.+Set+By" />
                <label for="field-1">Appt. Set By</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-apptDate" value="Appt.+Set+Date" />
                <label for="field-apptDate">Appt. Set Date</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-2" value="Sales+Rep" />
                <label for="field-2">Sales Rep</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-3" value="Lead+Source" />
                <label for="field-3">Lead Source</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-4" value="Appt.+Date" />
                <label for="field-4">Appt. Date</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-5" value="Proposal+Date" />
                <label for="field-5">Proposal Date</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-6" value="Close+Date" />
                <label for="field-6">Close Date</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-7" value="Start+Date" />
                <label for="field-7">Start Date</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-8" value="Monthly+Amount" />
                <label for="field-8">Monthly Amount</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-9" value="Actual+Sq+Footage" />
                <label for="field-9">Sq Footage</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-10" value="Times+per+Week" />
                <label for="field-10">Times per Week</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-11" value="Hours+Per" />
                <label for="field-11">Hours Per</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-12" value="SQ+Ft.+per+Hour" />
                <label for="field-12">SQ Ft. per Hour</label>
              </div>


              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-13" value="City" />
                <label for="field-13">City</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-14" value="Zip" />
                <label for="field-14">Zip</label>
              </div>

              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-15" value="Main+contact" />
                <label for="field-15">Main contact</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-16" value="Title" />
                <label for="field-16">Title</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-17" value="Office+Phone" />
                <label for="field-17">Office Phone</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-18" value="Extension" />
                <label for="field-18">Extension</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-19" value="Cell+Phone" />
                <label for="field-19">Cell Phone</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-20" value="Email" />
                <label for="field-20">Email</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-21" value="Address+1" />
                <label for="field-21">Address 1</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-22" value="Address+2" />
                <label for="field-22">Address 2</label>
              </div>
              <div className="CheckItem" onClick={this.toggleCheck}>
                <input type="checkbox" name="fieldCheck" id="field-23" value="County" />
                <label for="field-23">County</label>
              </div>

            </div>
          </div>

        </div>
      );
    } else if (this.props.currentTable === 'Franchisees') {
        return (
          <div className="inner">
            <p>Export Type</p>
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
                  <option>2020</option>
                  <option selected>2019</option>
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
                  <option>2020</option>
                  <option selected>2019</option>
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
            <div className="selectBox" id="rangeBox" onChange={this.selectChange}>
              <select id="rangeBy">
                <option disabled>Disregard Range</option>
                <option
                  data-filter-type="default"
                  data-fields="fields%5B%5D=SP+Name&fields%5B%5D=Status&fields%5B%5D=Standing&fields%5B%5D=Address&fields%5B%5D=City&fields%5B%5D=Zip&fields%5B%5D=County&fields%5B%5D=Home+Phone&fields%5B%5D=Cellphone&fields%5B%5D=Email&fields%5B%5D=Partner+Name&fields%5B%5D=Partner+Phone&fields%5B%5D=Source&fields%5B%5D=Contact+Date&fields%5B%5D=Appt.+Date"
                  data-filter-1="FIND(%22Prospect%22%2C%7BStatus%7D)">
                  New Contacts</option>
                <option
                  data-filter-type="default"
                  data-fields="fields%5B%5D=SP+Name&fields%5B%5D=Status&fields%5B%5D=Address&fields%5B%5D=City&fields%5B%5D=Zip&fields%5B%5D=County&fields%5B%5D=Home+Phone&fields%5B%5D=Cellphone&fields%5B%5D=Email&fields%5B%5D=Partner+Name&fields%5B%5D=Partner+Phone&fields%5B%5D=Source&fields%5B%5D=Contact+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=EIN&fields%5B%5D=Franchise+Level&fields%5B%5D=Plan+Type&fields%5B%5D=Additional+Revenue&fields%5B%5D=Graduation+Date&fields%5B%5D=Number"
                  data-filter-1="FIND(%22Active%22%2C%7BStatus%7D)">
                  All Actives</option>
                <option
                  data-filter-type="default"
                  data-fields="fields%5B%5D=SP+Name&fields%5B%5D=Franchise+Level&fields%5B%5D=County"
                  data-filter-1="FIND(%22Active%22%2C%7BStatus%7D)">
                  Franchise Levels</option>
                <option disabled>Needs Range</option>
                <option
                  data-filter-type="ranged"
                  data-fields="fields%5B%5D=SP+Name&fields%5B%5D=Status&fields%5B%5D=Address&fields%5B%5D=City&fields%5B%5D=Zip&fields%5B%5D=County&fields%5B%5D=Home+Phone&fields%5B%5D=Cellphone&fields%5B%5D=Email&fields%5B%5D=Partner+Name&fields%5B%5D=Partner+Phone&fields%5B%5D=Source&fields%5B%5D=Contact+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=EIN&fields%5B%5D=Franchise+Level&fields%5B%5D=Plan+Type&fields%5B%5D=Additional+Revenue&fields%5B%5D=Graduation+Date&fields%5B%5D=Number&fields%5B%5D=FDD+Sign+Date&fields%5B%5D=Sign+Date"
                  data-filter-1="Graduation+Date">
                  New Graduates Report</option>
              </select>
            </div>
          </div>
        );
      } else {
      return (
        <div className="inner">
          <p>Export Type</p>
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
                <option>2020</option>
                <option selected>2019</option>
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
                <option>2020</option>
                <option selected>2019</option>
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
          <div className="selectBox" id="rangeBox" onChange={this.selectChange}>
            <select id="rangeBy">
              <option disabled>Disregard Range</option>
              <option
                data-filter-type="default"
                data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount&fields%5B%5D=SP+Number&fields%5B%5D=Monthly+CPOP&fields%5B%5D=Standing&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Last+Call&fields%5B%5D=Last+Visit&fields%5B%5D=Office+Phone&fields%5B%5D=Extension&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=Lead+Source&fields%5B%5D=PAM"
                data-filter-1="FIND(%22Active%22%2C%7BStatus%7D)">
                Actives Customer Service</option>

              <option disabled>Needs Range</option>
              <option
                data-filter-type="ranged"
                data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Monthly+CPOP&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Lead+Source&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
                data-filter-1="Start+Date">
                New Startups</option>
              <option
                data-filter-type="ranged"
                data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Monthly+CPOP&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Lead+Source&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
                data-filter-1="New+SP+Start">
                Crew Changes</option>
              <option
                data-filter-type="ranged"
                data-fields="fields%5B%5D=Company+Name&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Monthly+CPOP&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=Close+Date&fields%5B%5D=Start+Date&fields%5B%5D=New+SP+Start&fields%5B%5D=Cancel+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Lead+Source&fields%5B%5D=SP+Name&fields%5B%5D=City&fields%5B%5D=County&fields%5B%5D=Times+per+Week&fields%5B%5D=PAM"
                data-filter-1="Cancel+Date">
                New Cancelations</option>
            </select>
          </div>
        </div>
      );
    }
  }
}


ExportRecords.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
}
