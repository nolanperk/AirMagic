import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Isotope from 'isotope-layout';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import loader from '../../../assets/loader.gif';
import dollarImg from '../../../assets/icons/black/dollar.png';
import VolumeItem from './VolumeItem';
import exit from '../../../assets/icons/white/exit.png';

export default class VolumeTimeline extends Component {

  sortDates = () => {
    let { volumeData } = this.props;

    let startsArray = [];
    let stopsArray = [];

    for (var i in volumeData) {
      let startItem = {};
      startItem['id'] = volumeData[i].id;
      startItem['date'] = volumeData[i].fields['Start Date'];
      startItem['type'] = 'start';
      startItem['Company Name'] = volumeData[i].fields['Company Name'];
      startItem['Start Date'] = volumeData[i].fields['Start Date'];
      startItem['Rep. %'] = volumeData[i].fields['Rep. %'];
      startItem['RP Revenue'] = volumeData[i].fields['RP Revenue'];

      if (volumeData[i]['AA'] || volumeData[i]['RP'] || volumeData[i]['AR'] || volumeData[i]['IP']) {
        if (volumeData[i]['AA']) {
          startItem['AA'] = volumeData[i]['AA'];
        }
        if (volumeData[i]['RP']) {
          startItem['RP'] = volumeData[i]['RP'];
        }
        if (volumeData[i]['AR']) {
          startItem['AR'] = volumeData[i]['AR'];
        }
        if (volumeData[i]['IP']) {
          startItem['IP'] = volumeData[i]['IP'];
        }
      } else {
        startItem['Amount'] = volumeData[i].fields['Amount'];
      }


      startsArray.push(startItem);
    }

    for (var i in volumeData) {
      if (volumeData[i].fields['Stop Date']) {
        let stopItem = {};
        stopItem['id'] = volumeData[i].id;
        stopItem['date'] = volumeData[i].fields['Stop Date'];
        stopItem['type'] = 'stop';
        stopItem['Company Name'] = volumeData[i].fields['Company Name'];
        stopItem['Stop Date'] = volumeData[i].fields['Stop Date'];
      stopItem['Rep. %'] = volumeData[i].fields['Rep. %'];
      stopItem['RP Revenue'] = volumeData[i].fields['RP Revenue'];

      if (volumeData[i]['AA'] || volumeData[i]['RP'] || volumeData[i]['AR'] || volumeData[i]['IP']) {
        if (volumeData[i]['AA']) {
          stopItem['AA'] = volumeData[i]['AA'];
        }
        if (volumeData[i]['RP']) {
          stopItem['RP'] = volumeData[i]['RP'];
        }
        if (volumeData[i]['AR']) {
          stopItem['AR'] = volumeData[i]['AR'];
        }
        if (volumeData[i]['IP']) {
          stopItem['IP'] = volumeData[i]['IP'];
        }
      } else {
        stopItem['Amount'] = volumeData[i].fields['Amount'];
      }


        stopsArray.push(stopItem);
      }
    }

    // array.sort(function(a,b){
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return new Date(b.date) - new Date(a.date);
    // });

    console.log(volumeData);
    console.log(startsArray);
    console.log(stopsArray);
  }

  componentDidMount() {
    this.sortDates();
  }
  // Render
  // ----------------------------------------------------
  render() {


    return (
      <div className="VolumeTimeline">

      </div>
    )
  }
}
