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
  constructor(props) {
    super();
    this.state = {
      timelineData: [],
    }
  }

  sortDates = () => {
    let { volumeData } = this.props;

    let startsArray = [];
    let stopsArray = [];

    for (var i in volumeData) {
      let startItem = {};
      startItem['id'] = volumeData[i].id;
      startItem['date'] = volumeData[i].fields['Start Date'];
      startItem['type'] = 'start';
      startItem['Account Name'] = volumeData[i].fields['Account Name'];
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
        stopItem['Account Name'] = volumeData[i].fields['Account Name'];
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

    let finalArray = stopsArray.concat(startsArray);

    finalArray.sort((a,b) => (new Date(a.date) > new Date(b.date)) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0));
    this.setState({
      timelineData: finalArray
    })
  }

  componentDidMount() {
    this.sortDates();
  }
  // Render
  // ----------------------------------------------------
  render() {


    return (
      <div className="VolumeTimeline">
        {this.state.timelineData ? this.state.timelineData.map((e, i) => this.timelineData(e, i)) : ''}
      </div>
    )
  }


  timelineData(timelineData, index) {
    let thisItem = this.state.timelineData[index];
    return (
      <div className={'TimelineItem Item--' + thisItem.type}>
        <p>{thisItem.type} - {thisItem.date}</p>
        <h3>{thisItem['Account Name']}</h3>
      </div>
    )
  }
}
