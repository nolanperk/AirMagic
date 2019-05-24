import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Activity from '../Sales/Dashboard/Activity';
import ManageDashData from './ManageDashData';
import ManageDashSales from './ManageDashSales';

import exit from '../assets/icons/white/exit.png';
import hamburger from '../assets/icons/white/hamburger.png';
import search from '../assets/icons/white/search.png';
import filter from '../assets/icons/black/filter.png';
import sort from '../assets/icons/black/sort.png';
import loader from '../assets/loader.gif';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];

export default class ManageDashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      loadingSales: true,
      error: "",
      dashType: 'Customers',
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      viewType: 'overall',

      tampaCustomerId: 'apps7GoAgK23yrOoY',
      orlandoCustomerId: 'appBUKBn552B8SlbE',
      tampaSalesId: 'appEX8GXgcD2ln4dB',
      orlandoSalesId: 'appXNufXR9nQARjgs',

      loadingText: 'Grabbing Tampa Customers',

      tampaOffset: '',
      orlandoOffset: '',

      tampaCustomers: [],
      orlandoCustomers: [],
      tampaCanceled: [],
      orlandoCanceled: [],

      recentActivityTampa: [],
      recentActivityOrlando: [],
      activityOffset: '',

      tampaSales: [],
      orlandoSales: [],
      orlandoSalesCustomers: [],
      tampaSalesCustomers: [],

      salesData: {},
    }
  }

  loadDashboard = () => {

    let loadFinish = function() {

    }.bind(this);

    let loadTampaCustomers = function() {
      console.log('loadTampaCustomers');
      let grabRecords = this.state.tampaCustomers;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaCustomerId + '/' + 'Customers' + '?view=All+Actives';
      customersURL += '&fields%5B%5D=Status&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Cancel+Date&fields%5B%5D=Start+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Close+Date&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=PAM';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaCustomers: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaCustomers();
        } else {
          console.log('clearing loadTampaCustomers()');

          this.setState({
            tampaOffset: '',
          });
          loadTampaCanceled();
        }
      });
    }.bind(this);
    loadTampaCustomers(); //run on load



    let loadTampaCanceled = function() {
      console.log('loadTampaCanceled');
      let grabRecords = this.state.tampaCanceled;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaCustomerId + '/' + 'Customers' + '?view=YTD+Cancels';
      customersURL += '&fields%5B%5D=Company+Name&fields%5B%5D=Status&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Cancel+Date&fields%5B%5D=Start+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Close+Date&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=PAM';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaCanceled: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaCanceled();
        } else {
          console.log('clearing loadTampaCanceled()');

          this.setState({
            tampaOffset: '',
            loadingText: 'Grabbing Orlando Customers'
          });
          loadOrlandoCustomers();
        }
      });
    }.bind(this);

    let loadOrlandoCustomers = function() {
      console.log('loadOrlandoCustomers');
      let grabRecords = this.state.orlandoCustomers;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoCustomerId + '/' + 'Customers' + '?view=All+Actives';
      customersURL += '&fields%5B%5D=Status&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Cancel+Date&fields%5B%5D=Start+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Close+Date&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=PAM';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoCustomers: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoCustomers();
        } else {
          console.log('clearing loadOrlandoCustomers()');

          this.setState({
            orlandoOffset: '',
          });
          loadOrlandoCanceled();
        }
      });
    }.bind(this);



    let loadOrlandoCanceled = function() {
      console.log('loadOrlandoCanceled');
      let grabRecords = this.state.orlandoCanceled;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoCustomerId + '/' + 'Customers' + '?view=YTD+Cancels';
      customersURL += '&fields%5B%5D=Company+Name&fields%5B%5D=Status&fields%5B%5D=Standing&fields%5B%5D=Monthly+Amount&fields%5B%5D=Cancel+Date&fields%5B%5D=Start+Date&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Close+Date&fields%5B%5D=Actual+Sq+Footage&fields%5B%5D=PAM';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoCanceled: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoCanceled();
        } else {
          console.log('clearing loadOrlandoCanceled()');

          this.setState({
            orlandoOffset: '',
            loadingText: 'Getting Recent Activity'
          });
          this.loadActivityData();
        }
      });
    }.bind(this);
  }


  loadActivityData = () => {
    let loadTampaActivity = function() {
      console.log('loadTampaActivity');
      let grabRecords = this.state.recentActivityTampa;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaSalesId + '/' + 'Sales' + '?view=Recent+Activity&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Monthly+Amount&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Sales+Rep&fields%5B%5D=Company+Name&fields%5B%5D=Status';
      if (this.state.activityOffset !== '') {customersURL = customersURL + '&offset=' + this.state.activityOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            recentActivityTampa: grabRecords.concat(response.data.records),
            activityOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaActivity();
        } else {
          console.log('clearing loadTampaActivity()');

          this.setState({
            activityOffset: '',
          });
          loadOrlandoActivity();
        }
      });
    }.bind(this);
    loadTampaActivity();



    let loadOrlandoActivity = function() {
      console.log('loadOrlandoActivity');
      let grabRecords = this.state.recentActivityOrlando;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoSalesId + '/' + 'Sales' + '?view=Recent+Activity&fields%5B%5D=Appt.+Set+Date&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Monthly+Amount&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Sales+Rep&fields%5B%5D=Company+Name&fields%5B%5D=Status';
      if (this.state.activityOffset !== '') {customersURL = customersURL + '&offset=' + this.state.activityOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            recentActivityOrlando: grabRecords.concat(response.data.records),
            activityOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoActivity();
        } else {
          console.log('clearing loadOrlandoActivity()');

          this.setState({
            activityOffset: '',
          });

          propTheAreas();
        }
      });
    }.bind(this);

    let propTheAreas = function() {
      let tampaActivity = this.state.recentActivityTampa;
      let orlandoActivity = this.state.recentActivityOrlando;
      for (var i in tampaActivity) {
        let thisFields = tampaActivity[i].fields;
        thisFields['region'] = 'tampa';
        thisFields['id'] = tampaActivity[i].id;
      }
      for (var i in orlandoActivity) {
        let thisFields = orlandoActivity[i].fields;
        thisFields['region'] = 'orlando';
        thisFields['id'] = orlandoActivity[i].id;
      }


      this.setState({
        recentActivityTampa: tampaActivity,
        recentActivityOrlando: orlandoActivity,
      });
      finishActivity();
    }.bind(this);

    let finishActivity = function() {
      let blendedActivity = this.state.recentActivityOrlando.concat(this.state.recentActivityTampa);
      console.log(blendedActivity);

      let recentActivity = [];

      for (var i in blendedActivity) {
        let activityItem = blendedActivity[i].fields;
        activityItem['Recent Date'] = blendedActivity[i].fields['Appt. Set Date'];

        let setDate;  if (blendedActivity[i].fields['Appt. Set Date']){setDate = new Date(blendedActivity[i].fields['Appt. Set Date'])}
        let propDate; if (blendedActivity[i].fields['Proposal Date']){propDate = new Date(blendedActivity[i].fields['Proposal Date'])}
        let closeDate;  if (blendedActivity[i].fields['Close Date']){closeDate = new Date(blendedActivity[i].fields['Close Date'])}

        if (propDate > setDate) {
          if (closeDate > propDate) {
            activityItem['Recent Date'] = blendedActivity[i].fields['Close Date'];
          } else {
            activityItem['Recent Date'] = blendedActivity[i].fields['Proposal Date'];
          }
        }
        recentActivity.push(activityItem);
      }

      recentActivity.sort(function(a,b){
        return new Date(b['Recent Date']) - new Date(a['Recent Date']);
      });

      // recentActivity.sort((a,b) => (new Date(a['Recent Date']) > new Date(b['Recent Date'])) ? 1 : ((new Date(b['Recent Date']) > new Date(a['Recent Date'])) ? -1 : 0));
      // recentActivity.reverse();

      console.log(recentActivity);

      let customerData = {
        tampa: {
          totalBillings: 0,
          ytdSales: 0,
          ytdCancels: 0,
          mtdStarts: 0,
          mtdCancels: 0,
          attrition: '',
          customerLength: '',
          standing: {
            veryHappy: 0,
            happy: 0,
            satisfied: 0,
            unhappy: 0,
            crewChange: 0,
            new: 0,
          },
          size: {
            under300: 0,
            under750: 0,
            under1500: 0,
            over1500: 0,
          },
          sizeVol: {
            under300: 0,
            under750: 0,
            under1500: 0,
            over1500: 0,
          }
        },
        orlando: {
          totalBillings: 0,
          ytdSales: 0,
          ytdCancels: 0,
          mtdStarts: 0,
          mtdCancels: 0,
          attrition: '',
          customerLength: '',
          standing: {
            veryHappy: 0,
            happy: 0,
            satisfied: 0,
            unhappy: 0,
            crewChange: 0,
            new: 0,
          },
          size: {
            under300: 0,
            under750: 0,
            under1500: 0,
            over1500: 0,
          },
          sizeVol: {
            under300: 0,
            under750: 0,
            under1500: 0,
            over1500: 0,
          }
        }
      }



      // Total Billings (Remove all accounts that have a start date past this month)
      // Total starts (Only accounts with a start date in this month)
      // Total Cancellations (Only accounts with a cancel-date from this month on)
      // Attrition Rate (Total Cancellations/Total Billings)*100
      // Current average customer length - (Total Billings / (Attrition * Total Billings))/12


      let todaysDate  = new Date();
      let todaysYear = todaysDate.getFullYear();
      let todaysMonth = (todaysDate.getMonth()+1);
      for (var i in this.state.tampaCustomers) {
        let itemAmount;
        if (this.state.tampaCustomers[i].fields['Monthly Amount']) {
          itemAmount = parseInt(this.state.tampaCustomers[i].fields['Monthly Amount']);
        } else {
          itemAmount = 0;
        }

        console.log(todaysMonth + '/' + todaysYear);
        let itemStanding = this.state.tampaCustomers[i].fields['Standing'];
        let startDate = new Date(this.state.tampaCustomers[i].fields['Start Date']);
        startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));  let startYear = startDate.getFullYear();    let startMonth = (startDate.getMonth()+1);


        let cancelDate = new Date(this.state.tampaCustomers[i].fields['Cancel Date']);
        cancelDate = new Date(cancelDate.getTime() + Math.abs(cancelDate.getTimezoneOffset()*60000));  let cancelYear = cancelDate.getFullYear();    let cancelMonth = (cancelDate.getMonth()+1);
        if (todaysYear === cancelYear && todaysMonth <= cancelMonth) { //cancelling this month or future
          customerData.tampa.mtdCancels += itemAmount;
        }
        if (todaysYear === startYear && todaysMonth === startMonth) { //started this month
          customerData.tampa.totalBillings += itemAmount;
          customerData.tampa.mtdStarts += itemAmount;

          if (itemAmount < 300) { customerData.tampa.size.under300 += 1; }
          else if (itemAmount < 750) { customerData.tampa.size.under750 += 1; }
          else if (itemAmount < 1500) { customerData.tampa.size.under1500 += 1; }
          else { customerData.tampa.size.over1500 += 1; }

          if (itemStanding === 'Very Happy') { customerData.tampa.standing.veryHappy += 1; }
          else if (itemStanding === 'Happy') { customerData.tampa.standing.happy += 1; }
          else if (itemStanding === 'Satisfied') { customerData.tampa.standing.satisfied += 1; }
          else if (itemStanding === 'Unhappy') { customerData.tampa.standing.unhappy += 1; }
          else if (itemStanding === 'Crew Change') { customerData.tampa.standing.unhappy += 1; }
          else if (itemStanding === 'New Close' || itemStanding === 'New Customer') { customerData.tampa.standing.new += 1; }
        } else if (todaysYear === startYear && todaysMonth < startMonth) { //starting in the future DO NOTHING

        } else { //started in the past
          customerData.tampa.totalBillings += itemAmount;

          if (itemAmount < 300) { customerData.tampa.size.under300 += 1;  customerData.tampa.sizeVol.under300 += itemAmount; }
          else if (itemAmount < 750) { customerData.tampa.size.under750 += 1; customerData.tampa.sizeVol.under750 += itemAmount; }
          else if (itemAmount < 1500) { customerData.tampa.size.under1500 += 1; customerData.tampa.sizeVol.under1500 += itemAmount; }
          else { customerData.tampa.size.over1500 += 1; customerData.tampa.sizeVol.over1500 += itemAmount; }

          if (itemStanding === 'Very Happy') { customerData.tampa.standing.veryHappy += 1; }
          else if (itemStanding === 'Happy') { customerData.tampa.standing.happy += 1; }
          else if (itemStanding === 'Satisfied') { customerData.tampa.standing.satisfied += 1; }
          else if (itemStanding === 'Unhappy') { customerData.tampa.standing.unhappy += 1; }
          else if (itemStanding === 'Crew Change') { customerData.tampa.standing.unhappy += 1; }
          else if (itemStanding === 'New Close' || itemStanding === 'New Customer') { customerData.tampa.standing.new += 1; }
        }
        if (todaysYear === startYear) { //started this year
          customerData.tampa.ytdSales += itemAmount;
        }
      }
      for (var i in this.state.orlandoCustomers) {
        let itemAmount;
        if (this.state.orlandoCustomers[i].fields['Monthly Amount']) {
          itemAmount = parseInt(this.state.orlandoCustomers[i].fields['Monthly Amount'].replace('$', ''));
        } else {
          itemAmount = 0;
        }
        let itemStanding = this.state.orlandoCustomers[i].fields['Standing'];

        let startDate = new Date(this.state.orlandoCustomers[i].fields['Start Date']);
        startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));  let startYear = startDate.getFullYear();    let startMonth = (startDate.getMonth()+1);

        let cancelDate = new Date(this.state.orlandoCustomers[i].fields['Cancel Date']);
        cancelDate = new Date(cancelDate.getTime() + Math.abs(cancelDate.getTimezoneOffset()*60000));  let cancelYear = cancelDate.getFullYear();    let cancelMonth = (cancelDate.getMonth()+1);
        if (todaysYear === cancelYear && todaysMonth <= cancelMonth) { //cancelling this month or future
          customerData.orlando.mtdCancels += itemAmount;
        }
        if (todaysYear === startYear && todaysMonth === startMonth) { //started this month
          customerData.orlando.totalBillings += itemAmount;
          customerData.orlando.mtdStarts += itemAmount;

          if (itemAmount < 300) { customerData.orlando.size.under300 += 1; }
          else if (itemAmount < 750) { customerData.orlando.size.under750 += 1; }
          else if (itemAmount < 1500) { customerData.orlando.size.under1500 += 1; }
          else { customerData.orlando.size.over1500 += 1; }

          if (itemStanding === 'Very Happy') { customerData.orlando.standing.veryHappy += 1; }
          else if (itemStanding === 'Happy') { customerData.orlando.standing.happy += 1; }
          else if (itemStanding === 'Satisfied') { customerData.orlando.standing.satisfied += 1; }
          else if (itemStanding === 'Unhappy') { customerData.orlando.standing.unhappy += 1; }
          else if (itemStanding === 'Crew Change') { customerData.orlando.standing.unhappy += 1; }
          else if (itemStanding === 'New Close' || itemStanding === 'New Customer') { customerData.orlando.standing.new += 1; }
        } else if (todaysYear === startYear && todaysMonth < startMonth) { //starting in the future DO NOTHING

        } else { //started in the past
          customerData.orlando.totalBillings += itemAmount;

          if (itemAmount < 300) { customerData.orlando.size.under300 += 1;  customerData.orlando.sizeVol.under300 += itemAmount; }
          else if (itemAmount < 750) { customerData.orlando.size.under750 += 1; customerData.orlando.sizeVol.under750 += itemAmount; }
          else if (itemAmount < 1500) { customerData.orlando.size.under1500 += 1; customerData.orlando.sizeVol.under1500 += itemAmount; }
          else { customerData.orlando.size.over1500 += 1; customerData.orlando.sizeVol.over1500 += itemAmount; }

          if (itemStanding === 'Very Happy') { customerData.orlando.standing.veryHappy += 1; }
          else if (itemStanding === 'Happy') { customerData.orlando.standing.happy += 1; }
          else if (itemStanding === 'Satisfied') { customerData.orlando.standing.satisfied += 1; }
          else if (itemStanding === 'Unhappy') { customerData.orlando.standing.unhappy += 1; }
          else if (itemStanding === 'Crew Change') { customerData.orlando.standing.unhappy += 1; }
          else if (itemStanding === 'New Close' || itemStanding === 'New Customer') { customerData.orlando.standing.new += 1; }
        }

        if (todaysYear === startYear) { //started this year
          customerData.orlando.ytdSales += itemAmount;
        }
      }



      for (var i in this.state.tampaCanceled) {
        let itemAmount;
        if (this.state.tampaCanceled[i].fields['Monthly Amount']) {
          itemAmount = parseInt(this.state.tampaCanceled[i].fields['Monthly Amount'].replace('$', ''));
        } else {
          itemAmount = 0;
        }

        let cancelDate = new Date(this.state.tampaCanceled[i].fields['Cancel Date']);
        cancelDate = new Date(cancelDate.getTime() + Math.abs(cancelDate.getTimezoneOffset()*60000));  let cancelYear = cancelDate.getFullYear();    let cancelMonth = (cancelDate.getMonth()+1);
        if (todaysYear === cancelYear && todaysMonth === cancelMonth) { //canceled this month
          customerData.tampa.mtdCancels += itemAmount;
          console.log(this.state.tampaCanceled[i].fields);
        }

        if (todaysYear === cancelYear) { //canceled this year
          customerData.tampa.ytdCancels += itemAmount;
        }
      }
      for (var i in this.state.orlandoCanceled) {
        let itemAmount;
        if (this.state.orlandoCanceled[i].fields['Monthly Amount']) {
          itemAmount = parseInt(this.state.orlandoCanceled[i].fields['Monthly Amount'].replace('$', ''));
        } else {
          itemAmount = 0;
        }

        let cancelDate = new Date(this.state.orlandoCanceled[i].fields['Cancel Date']);
        cancelDate = new Date(cancelDate.getTime() + Math.abs(cancelDate.getTimezoneOffset()*60000));  let cancelYear = cancelDate.getFullYear();    let cancelMonth = (cancelDate.getMonth()+1);
        if (todaysYear === cancelYear && todaysMonth === cancelMonth) { //canceled this month
          customerData.orlando.mtdCancels += itemAmount;
        }

        if (todaysYear === cancelYear) { //canceled this year
          customerData.orlando.ytdCancels += itemAmount;
        }
      }

      console.log(customerData);


      this.setState({
        recentActivity: recentActivity,
        customerData: customerData,
        loading: false,
      })
      this.loadSales();
    }.bind(this);


  }

  loadSales = () => {

    let loadTampaSales = function() {
      console.log('loadTampaSales');
      let grabRecords = this.state.tampaSales;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaSalesId + '/' + 'Sales' + '?view=YTD+Sales';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaSales: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaSales();
        } else {
          console.log('clearing loadTampaSales()');

          this.setState({
            tampaOffset: '',
          });
          loadOrlandoCustomers();
        }
      });
    }.bind(this);
    loadTampaSales(); //run on load

    let loadOrlandoCustomers = function() {
      console.log('loadOrlandoCustomers');
      let grabRecords = this.state.orlandoSales;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoSalesId + '/' + 'Sales' + '?view=YTD+Sales';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoSales: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoCustomers();
        } else {
          console.log('clearing loadOrlandoCustomers()');

          this.setState({
            orlandoOffset: '',
          });
          loadOrlandoSalesCustomers();
        }
      });
    }.bind(this);



    let loadOrlandoSalesCustomers = function() {
      console.log('loadOrlandoSalesCustomers');
      let grabRecords = this.state.orlandoSalesCustomers;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.orlandoCustomerId + '/' + 'Customers' + '?view=YTD+Sales';
      if (this.state.orlandoOffset !== '') {customersURL = customersURL + '&offset=' + this.state.orlandoOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            orlandoSalesCustomers: grabRecords.concat(response.data.records),
            error: false,
            orlandoOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoSalesCustomers();
        } else {
          console.log('clearing loadOrlandoSalesCustomers()');

          this.setState({
            orlandoOffset: '',
          });
          loadTampaSalesCustomers();
        }
      });
    }.bind(this);



    let loadTampaSalesCustomers = function() {
      console.log('loadTampaSalesCustomers');
      let grabRecords = this.state.tampaSalesCustomers;

      let customersURL = 'https://api.airtable.com/v0/' + this.state.tampaCustomerId + '/' + 'Customers' + '?view=YTD+Sales';
      if (this.state.tampaOffset !== '') {customersURL = customersURL + '&offset=' + this.state.tampaOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            tampaSalesCustomers: grabRecords.concat(response.data.records),
            error: false,
            tampaOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaSalesCustomers();
        } else {
          console.log('clearing loadTampaSalesCustomers()');

          this.setState({
            tampaOffset: '',
          });
          loadFinish();
        }
      });
    }.bind(this);


    let loadFinish = function() {
      let allTampaItems = this.state.tampaSalesCustomers.concat(this.state.tampaSales);
      let newTampaItems = allTampaItems.map(obj =>{
        let newItems = obj.fields;
        return newItems;
      });
      let finalTampa = [];
      for (var i in newTampaItems) {
        if (finalTampa.filter(obj => obj['Company Name'] === newTampaItems[i]['Company Name']).length === 0) {
          finalTampa.push(newTampaItems[i]);
        }
      }

      let allOrlandoItems = this.state.orlandoSalesCustomers.concat(this.state.orlandoSales);
      let newOrlandoItems = allOrlandoItems.map(obj =>{
        let newItems = obj.fields;
        return newItems;
      });
      let finalOrlando = [];
      for (var i in newOrlandoItems) {
        if (finalOrlando.filter(obj => obj['Company Name'] === newOrlandoItems[i]['Company Name']).length === 0) {
          finalOrlando.push(newOrlandoItems[i]);
        }
      }

      this.setState({
        tampaSales: finalTampa,
        orlandoSales: finalOrlando,
        tampaSalesCustomers: [],
        orlandoSalesCustomers: [],
      })
      setTimeout((function() {
        loadWrapup();
      }).bind(this), 250);

    }.bind(this);



    let loadWrapup = function() {
      // Total Start Volume

      // Appointments (Appt Count)
      // Proposals (prop %)
      // Closes (close %)
      //
      // Total Proposal Volume
      // Total Close Volume
      // Total Start Volume
      //
      // Proposals > $500
      // Avg Proposal
      // Avg Close
      // Avg Start


      let salesData = {
        nolan: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        joel: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        carla: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        shana: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        jett: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        jason: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        justin: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        mike: {
          apptCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          proposalCount: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeCount: [0,0,0,0,0,0,0,0,0,0,0,0],

          proposalVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          closeVolume: [0,0,0,0,0,0,0,0,0,0,0,0],
          startVolume: [0,0,0,0,0,0,0,0,0,0,0,0],

          over500: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
      }

      let todaysDate  = new Date();
      let todaysYear = todaysDate.getFullYear();

      //TAMPA!!!!
      for (var i in this.state.tampaSales) {
        let itemAmount; if (this.state.tampaSales[i]['Monthly Amount']) {  itemAmount = parseInt(this.state.tampaSales[i]['Monthly Amount']); } else {  itemAmount = 0; }

        let salesRep = this.state.tampaSales[i]['Sales Rep'];
        let insideRep = this.state.tampaSales[i]['Appt. Set By'];

        let startDate = new Date(this.state.tampaSales[i]['Start Date']);  startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));  let startYear = startDate.getFullYear();    let startMonth = startDate.getMonth();
        let closeDate = new Date(this.state.tampaSales[i]['Close Date']);  closeDate = new Date(closeDate.getTime() + Math.abs(closeDate.getTimezoneOffset()*60000));  let closeYear = closeDate.getFullYear();    let closeMonth = closeDate.getMonth();
        let proposalDate = new Date(this.state.tampaSales[i]['Proposal Date']);  proposalDate = new Date(proposalDate.getTime() + Math.abs(proposalDate.getTimezoneOffset()*60000));  let proposalYear = proposalDate.getFullYear();    let proposalMonth = proposalDate.getMonth();
        let apptDate = new Date(this.state.tampaSales[i]['Appt. Date']);  apptDate = new Date(apptDate.getTime() + Math.abs(apptDate.getTimezoneOffset()*60000));  let apptYear = apptDate.getFullYear();    let apptMonth = apptDate.getMonth();
        let apptSetDate = new Date(this.state.tampaSales[i]['Appt. Set Date']);  apptSetDate = new Date(apptSetDate.getTime() + Math.abs(apptSetDate.getTimezoneOffset()*60000));  let apptSetYear = apptSetDate.getFullYear();    let apptSetMonth = apptDate.getMonth();

        if (salesRep === 'Nolan Perkins') {
          if(closeYear === todaysYear && closeMonth === 3) {
            console.log(this.state.tampaSales[i]);
          }
          if(apptYear === todaysYear) {  salesData.nolan.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.nolan.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.nolan.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.nolan.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.nolan.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.nolan.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.nolan.over500[proposalMonth] += 1;  } }
        }
        if (salesRep === 'Joel Horwitz') {
          if(apptYear === todaysYear) {  salesData.joel.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.joel.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.joel.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.joel.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.joel.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.joel.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.joel.over500[proposalMonth] += 1;  }  }
        }
        if (insideRep === 'Carla Milian') {
          if(apptYear === todaysYear) {  salesData.carla.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.carla.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.carla.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.carla.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.carla.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.carla.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.carla.over500[proposalMonth] += 1;  } }
        }
        if (insideRep === 'Shana Thorn') {
          if(apptYear === todaysYear) {  salesData.shana.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.shana.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.shana.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.shana.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.shana.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.shana.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.shana.over500[proposalMonth] += 1;  } }
        }
        if (insideRep === 'Jett') {
          if(apptYear === todaysYear) {  salesData.jett.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.jett.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.jett.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.jett.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.jett.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.jett.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.jett.over500[proposalMonth] += 1;  }  }
        }
        if (insideRep === 'Justin') {
          if(apptYear === todaysYear) {  salesData.justin.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.justin.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.justin.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.justin.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.justin.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.justin.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if (proposalYear === todaysYear) { salesData.justin.over500[proposalMonth] += 1;  }  }
        }
        if (insideRep === 'Jason') {
          if(apptYear === todaysYear) {  salesData.jason.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.jason.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.jason.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.jason.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.jason.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.jason.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.jason.over500[proposalMonth] += 1;  }  }
        }
        if (insideRep === 'Mike') {
          if(apptYear === todaysYear) {  salesData.mike.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.mike.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.mike.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.mike.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.mike.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.mike.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.mike.over500[proposalMonth] += 1;  }  }
        }
      }


      //ORLANDO!!!!
      for (var i in this.state.orlandoSales) {
        let itemAmount; if (this.state.orlandoSales[i]['Monthly Amount']) {  itemAmount = parseInt(this.state.orlandoSales[i]['Monthly Amount']); } else {  itemAmount = 0; }

        let salesRep = this.state.orlandoSales[i]['Sales Rep'];
        let insideRep = this.state.orlandoSales[i]['Appt. Set By'];

        let startDate = new Date(this.state.orlandoSales[i]['Start Date']);  startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));  let startYear = startDate.getFullYear();    let startMonth = startDate.getMonth();
        let closeDate = new Date(this.state.orlandoSales[i]['Close Date']);  closeDate = new Date(closeDate.getTime() + Math.abs(closeDate.getTimezoneOffset()*60000));  let closeYear = closeDate.getFullYear();    let closeMonth = closeDate.getMonth();
        let proposalDate = new Date(this.state.orlandoSales[i]['Proposal Date']);  proposalDate = new Date(proposalDate.getTime() + Math.abs(proposalDate.getTimezoneOffset()*60000));  let proposalYear = proposalDate.getFullYear();    let proposalMonth = proposalDate.getMonth();
        let apptDate = new Date(this.state.orlandoSales[i]['Appt. Date']);  apptDate = new Date(apptDate.getTime() + Math.abs(apptDate.getTimezoneOffset()*60000));  let apptYear = apptDate.getFullYear();    let apptMonth = apptDate.getMonth();
        let apptSetDate = new Date(this.state.orlandoSales[i]['Appt. Set Date']);  apptSetDate = new Date(apptSetDate.getTime() + Math.abs(apptSetDate.getTimezoneOffset()*60000));  let apptSetYear = apptSetDate.getFullYear();    let apptSetMonth = apptDate.getMonth();

        if (salesRep === 'Nolan Perkins') {
          if(apptYear === todaysYear) {  salesData.nolan.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.nolan.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.nolan.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.nolan.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.nolan.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.nolan.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.nolan.over500[proposalMonth] += 1;  } }
        }
        if (salesRep === 'Joel Horwitz') {
          if(apptYear === todaysYear) {  salesData.joel.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.joel.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.joel.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.joel.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.joel.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.joel.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.joel.over500[proposalMonth] += 1;  }  }
        }
        if (insideRep === 'Carla Milian') {
          if(apptYear === todaysYear) {  salesData.carla.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.carla.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.carla.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.carla.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.carla.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.carla.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.carla.over500[proposalMonth] += 1;  } }
        }
        if (insideRep === 'Shana Thorn') {
          if(apptYear === todaysYear) {  salesData.shana.apptCount[apptMonth] += 1;  }
          if(proposalYear === todaysYear) {  salesData.shana.proposalCount[proposalMonth] += 1;  }
          if(closeYear === todaysYear) { salesData.shana.closeCount[closeMonth] += 1;  }

          if(proposalYear === todaysYear) {  salesData.shana.proposalVolume[proposalMonth] += itemAmount;  }
          if(closeYear === todaysYear) { salesData.shana.closeVolume[closeMonth] += itemAmount;  }
          if(startYear === todaysYear) { salesData.shana.startVolume[startMonth] += itemAmount;  }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.shana.over500[proposalMonth] += 1;  } }
        }
        if (insideRep === 'Jett' || insideRep === 'Justin' || insideRep === 'Jason' || insideRep === 'Mike') {
          if(apptYear === todaysYear) {  salesData.jett.apptCount[apptMonth] += 1; }
          if(proposalYear === todaysYear) {  salesData.jett.proposalCount[proposalMonth] += 1; }
          if(closeYear === todaysYear) { salesData.jett.closeCount[closeMonth] += 1; }

          if(proposalYear === todaysYear) {  salesData.jett.proposalVolume[proposalMonth] += itemAmount; }
          if(closeYear === todaysYear) { salesData.jett.closeVolume[closeMonth] += itemAmount; }
          if(startYear === todaysYear) { salesData.jett.startVolume[startMonth] += itemAmount; }

          if (itemAmount >= 500) { if(proposalYear === todaysYear) { salesData.jett.over500[proposalMonth] += 1;  }  }
        }
      }

      this.setState({
        salesData: salesData,
        loadingSales: false,
      })
    }.bind(this);
  }


  switchView = e => {
    console.log(e.target.id);
    if (e.target.id === 'Sales') {
      this.setState({
        dashType: 'Sales'
      });
    } else {
      this.setState({
        dashType: 'Customers'
      });
    }
  }

  componentDidMount() {
    if (localStorage.getItem('isLogged')  !== 'true') {
      this.props.history.push('/login');
    } else {
      let twoWeeksAgo = new Date(+new Date - 1000*60*60*24*14);
      if (localStorage.getItem('lastLogin')) { //logged in after update
        let lastLog = new Date(localStorage.getItem('lastLogin'));
        if (lastLog > twoWeeksAgo) { //logged in within past two weeks
          if (localStorage.getItem('isOutside')  === 'true') {
            if (localStorage.getItem('userOffice') !== 'both' && localStorage.getItem('userRole') !== 'all') {
              if (this.props.citySet !== localStorage.getItem('userOffice')) {
                this.props.history.push('/outside/' + localStorage.getItem('userOffice') + '/');
              }
            } else {
              this.props.history.push('/outside/' + this.props.citySet);
            }
          }

          this.loadDashboard();
        } else {
          sessionStorage.clear();
          localStorage.clear();
        }
      } else {
        sessionStorage.clear();
        localStorage.clear();
        this.props.history.push('/login');
      }
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
      <div className="CallListWrapper ManageDash">
        <div className="callNav">
          <Link to={`/`}>
            <div className="navIcon softGrad--black">
              <img src={hamburger} alt="databases" />
            </div>
          </Link>
          <h4 id="Customers" onClick={this.switchView}>Customers</h4>
          <h4 id="Sales" onClick={this.switchView}>Sales</h4>
        </div>

        {this.DashType}


        <Activity
          recentActivity={this.state.recentActivity}
        />
      </div>
    );
  }

  get DashType() {
    if (this.state.dashType === 'Customers') {
      return (
        <ManageDashData
          customerData = {this.state.customerData}
        />
      )
    } else {
      return (
        <ManageDashSales
          salesData = {this.state.salesData}
          loadingSales={this.state.loadingSales}
        />
      )
    }
  }
}
