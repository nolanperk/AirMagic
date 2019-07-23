import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';


import loader from '../assets/loader.gif';

export default class ManageDashSales extends Component {
  constructor(props) {
    super();
    this.state = {
      jan: false,
      feb: false,
      mar: false,
      apr: false,
      may: false,
      jun: false,
      jul: false,
      aug: false,
      sep: false,
      oct: false,
      nov: false,
      dec: false,
    }
  }

  toggleMonth = e => {
    if (e.target.classList.contains('mon-0')) {
      if (this.state.jan) {
        this.setState({jan: false})
      } else {
        this.setState({jan: true})
      }
    } else if (e.target.classList.contains('mon-1')) {
      if (this.state.feb) {
        this.setState({feb: false})
      } else {
        this.setState({feb: true})
      }
    } else if (e.target.classList.contains('mon-2')) {
      if (this.state.mar) {
        this.setState({mar: false})
      } else {
        this.setState({mar: true})
      }
    } else if (e.target.classList.contains('mon-3')) {
      if (this.state.apr) {
        this.setState({apr: false})
      } else {
        this.setState({apr: true})
      }
    } else if (e.target.classList.contains('mon-4')) {
      if (this.state.may) {
        this.setState({may: false})
      } else {
        this.setState({may: true})
      }
    } else if (e.target.classList.contains('mon-5')) {
      if (this.state.jun) {
        this.setState({jun: false})
      } else {
        this.setState({jun: true})
      }
    } else if (e.target.classList.contains('mon-6')) {
      if (this.state.jul) {
        this.setState({jul: false})
      } else {
        this.setState({jul: true})
      }
    } else if (e.target.classList.contains('mon-7')) {
      if (this.state.aug) {
        this.setState({aug: false})
      } else {
        this.setState({aug: true})
      }
    } else if (e.target.classList.contains('mon-8')) {
      if (this.state.sep) {
        this.setState({sep: false})
      } else {
        this.setState({sep: true})
      }
    } else if (e.target.classList.contains('mon-9')) {
      if (this.state.oct) {
        this.setState({oct: false})
      } else {
        this.setState({oct: true})
      }
    } else if (e.target.classList.contains('mon-10')) {
      if (this.state.nov) {
        this.setState({nov: false})
      } else {
        this.setState({nov: true})
      }
    } else if (e.target.classList.contains('mon-11')) {
      if (this.state.dec) {
        this.setState({dec: false})
      } else {
        this.setState({dec: true})
      }
    }
  }

  componentDidMount() {
    let today = new Date();
    let currMonth = today.getMonth();

    if (currMonth === 0) {
      this.setState({
        jan: true,
      })
    } else if (currMonth === 1) {
      this.setState({
        feb: true,
      })
    } else if (currMonth === 2) {
      this.setState({
        mar: true,
      })
    } else if (currMonth === 3) {
      this.setState({
        apr: true,
      })
    } else if (currMonth === 4) {
      this.setState({
        may: true,
      })
    } else if (currMonth === 5) {
      this.setState({
        jun: true,
      })
    } else if (currMonth === 6) {
      this.setState({
        jul: true,
      })
    } else if (currMonth === 7) {
      this.setState({
        aug: true,
      })
    } else if (currMonth === 8) {
      this.setState({
        sep: true,
      })
    } else if (currMonth === 9) {
      this.setState({
        oct: true,
      })
    } else if (currMonth === 10) {
      this.setState({
        nov: true,
      })
    } else if (currMonth === 11) {
      this.setState({
        dec: true,
      })
    }
  }


  render() {
    const { salesData, loadingSales } = this.props;

    console.log(salesData);

    let liveSalesData = {
      nolan: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },
      joel: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      carla: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      shana: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      mariyah: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      paula: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      jett: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      jason: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      justin: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },

      mike: {
        apptCount: 0,
        proposalCount: 0,
        closeCount: 0,

        proposalVolume: 0,
        closeVolume: 0,
        startVolume: 0,

        over500: 0,
      },
    }

    if (salesData.nolan) {
      if (this.state.jan) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[0];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[0];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[0];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[0];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[0];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[0];
        liveSalesData.nolan.over500 += salesData.nolan.over500[0];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[0];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[0];  liveSalesData.joel.closeCount += salesData.joel.closeCount[0];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[0];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[0];  liveSalesData.joel.startVolume += salesData.joel.startVolume[0];  liveSalesData.joel.over500 += salesData.joel.over500[0];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[0];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[0];  liveSalesData.carla.closeCount += salesData.carla.closeCount[0];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[0];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[0];  liveSalesData.carla.startVolume += salesData.carla.startVolume[0];  liveSalesData.carla.over500 += salesData.carla.over500[0];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[0];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[0];  liveSalesData.shana.closeCount += salesData.shana.closeCount[0];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[0];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[0];  liveSalesData.shana.startVolume += salesData.shana.startVolume[0];  liveSalesData.shana.over500 += salesData.shana.over500[0];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[0];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[0];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[0];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[0];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[0];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[0];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[0];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[0];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[0];  liveSalesData.paula.closeCount += salesData.paula.closeCount[0];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[0];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[0];  liveSalesData.paula.startVolume += salesData.paula.startVolume[0];  liveSalesData.paula.over500 += salesData.paula.over500[0];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[0];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[0];  liveSalesData.jett.closeCount += salesData.jett.closeCount[0];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[0];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[0];  liveSalesData.jett.startVolume += salesData.jett.startVolume[0];  liveSalesData.jett.over500 += salesData.jett.over500[0];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[0];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[0];  liveSalesData.jason.closeCount += salesData.jason.closeCount[0];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[0];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[0];  liveSalesData.jason.startVolume += salesData.jason.startVolume[0];  liveSalesData.jason.over500 += salesData.jason.over500[0];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[0];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[0];  liveSalesData.justin.closeCount += salesData.justin.closeCount[0];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[0];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[0];  liveSalesData.justin.startVolume += salesData.justin.startVolume[0];  liveSalesData.justin.over500 += salesData.justin.over500[0];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[0];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[0];  liveSalesData.mike.closeCount += salesData.mike.closeCount[0];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[0];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[0];  liveSalesData.mike.startVolume += salesData.mike.startVolume[0];  liveSalesData.mike.over500 += salesData.mike.over500[0];
      }
      if (this.state.feb) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[1];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[1];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[1];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[1];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[1];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[1];
        liveSalesData.nolan.over500 += salesData.nolan.over500[1];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[1];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[1];  liveSalesData.joel.closeCount += salesData.joel.closeCount[1];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[1];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[1];  liveSalesData.joel.startVolume += salesData.joel.startVolume[1];  liveSalesData.joel.over500 += salesData.joel.over500[1];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[1];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[1];  liveSalesData.carla.closeCount += salesData.carla.closeCount[1];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[1];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[1];  liveSalesData.carla.startVolume += salesData.carla.startVolume[1];  liveSalesData.carla.over500 += salesData.carla.over500[1];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[1];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[1];  liveSalesData.shana.closeCount += salesData.shana.closeCount[1];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[1];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[1];  liveSalesData.shana.startVolume += salesData.shana.startVolume[1];  liveSalesData.shana.over500 += salesData.shana.over500[1];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[1];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[1];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[1];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[1];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[1];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[1];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[1];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[1];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[1];  liveSalesData.paula.closeCount += salesData.paula.closeCount[1];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[1];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[1];  liveSalesData.paula.startVolume += salesData.paula.startVolume[1];  liveSalesData.paula.over500 += salesData.paula.over500[1];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[1];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[1];  liveSalesData.jett.closeCount += salesData.jett.closeCount[1];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[1];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[1];  liveSalesData.jett.startVolume += salesData.jett.startVolume[1];  liveSalesData.jett.over500 += salesData.jett.over500[1];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[1];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[1];  liveSalesData.jason.closeCount += salesData.jason.closeCount[1];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[1];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[1];  liveSalesData.jason.startVolume += salesData.jason.startVolume[1];  liveSalesData.jason.over500 += salesData.jason.over500[1];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[1];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[1];  liveSalesData.justin.closeCount += salesData.justin.closeCount[1];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[1];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[1];  liveSalesData.justin.startVolume += salesData.justin.startVolume[1];  liveSalesData.justin.over500 += salesData.justin.over500[1];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[1];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[1];  liveSalesData.mike.closeCount += salesData.mike.closeCount[1];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[1];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[1];  liveSalesData.mike.startVolume += salesData.mike.startVolume[1];  liveSalesData.mike.over500 += salesData.mike.over500[1];
      }
      if (this.state.mar) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[2];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[2];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[2];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[2];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[2];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[2];
        liveSalesData.nolan.over500 += salesData.nolan.over500[2];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[2];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[2];  liveSalesData.joel.closeCount += salesData.joel.closeCount[2];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[2];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[2];  liveSalesData.joel.startVolume += salesData.joel.startVolume[2];  liveSalesData.joel.over500 += salesData.joel.over500[2];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[2];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[2];  liveSalesData.carla.closeCount += salesData.carla.closeCount[2];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[2];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[2];  liveSalesData.carla.startVolume += salesData.carla.startVolume[2];  liveSalesData.carla.over500 += salesData.carla.over500[2];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[2];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[2];  liveSalesData.shana.closeCount += salesData.shana.closeCount[2];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[2];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[2];  liveSalesData.shana.startVolume += salesData.shana.startVolume[2];  liveSalesData.shana.over500 += salesData.shana.over500[2];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[2];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[2];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[2];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[2];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[2];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[2];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[2];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[2];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[2];  liveSalesData.paula.closeCount += salesData.paula.closeCount[2];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[2];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[2];  liveSalesData.paula.startVolume += salesData.paula.startVolume[2];  liveSalesData.paula.over500 += salesData.paula.over500[2];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[2];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[2];  liveSalesData.jett.closeCount += salesData.jett.closeCount[2];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[2];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[2];  liveSalesData.jett.startVolume += salesData.jett.startVolume[2];  liveSalesData.jett.over500 += salesData.jett.over500[2];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[2];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[2];  liveSalesData.jason.closeCount += salesData.jason.closeCount[2];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[2];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[2];  liveSalesData.jason.startVolume += salesData.jason.startVolume[2];  liveSalesData.jason.over500 += salesData.jason.over500[2];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[2];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[2];  liveSalesData.justin.closeCount += salesData.justin.closeCount[2];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[2];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[2];  liveSalesData.justin.startVolume += salesData.justin.startVolume[2];  liveSalesData.justin.over500 += salesData.justin.over500[2];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[2];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[2];  liveSalesData.mike.closeCount += salesData.mike.closeCount[2];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[2];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[2];  liveSalesData.mike.startVolume += salesData.mike.startVolume[2];  liveSalesData.mike.over500 += salesData.mike.over500[2];
      }
      if (this.state.apr) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[3];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[3];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[3];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[3];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[3];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[3];
        liveSalesData.nolan.over500 += salesData.nolan.over500[3];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[3];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[3];  liveSalesData.joel.closeCount += salesData.joel.closeCount[3];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[3];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[3];  liveSalesData.joel.startVolume += salesData.joel.startVolume[3];  liveSalesData.joel.over500 += salesData.joel.over500[3];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[3];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[3];  liveSalesData.carla.closeCount += salesData.carla.closeCount[3];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[3];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[3];  liveSalesData.carla.startVolume += salesData.carla.startVolume[3];  liveSalesData.carla.over500 += salesData.carla.over500[3];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[3];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[3];  liveSalesData.shana.closeCount += salesData.shana.closeCount[3];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[3];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[3];  liveSalesData.shana.startVolume += salesData.shana.startVolume[3];  liveSalesData.shana.over500 += salesData.shana.over500[3];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[3];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[3];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[3];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[3];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[3];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[3];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[3];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[3];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[3];  liveSalesData.paula.closeCount += salesData.paula.closeCount[3];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[3];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[3];  liveSalesData.paula.startVolume += salesData.paula.startVolume[3];  liveSalesData.paula.over500 += salesData.paula.over500[3];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[3];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[3];  liveSalesData.jett.closeCount += salesData.jett.closeCount[3];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[3];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[3];  liveSalesData.jett.startVolume += salesData.jett.startVolume[3];  liveSalesData.jett.over500 += salesData.jett.over500[3];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[3];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[3];  liveSalesData.jason.closeCount += salesData.jason.closeCount[3];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[3];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[3];  liveSalesData.jason.startVolume += salesData.jason.startVolume[3];  liveSalesData.jason.over500 += salesData.jason.over500[3];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[3];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[3];  liveSalesData.justin.closeCount += salesData.justin.closeCount[3];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[3];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[3];  liveSalesData.justin.startVolume += salesData.justin.startVolume[3];  liveSalesData.justin.over500 += salesData.justin.over500[3];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[3];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[3];  liveSalesData.mike.closeCount += salesData.mike.closeCount[3];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[3];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[3];  liveSalesData.mike.startVolume += salesData.mike.startVolume[3];  liveSalesData.mike.over500 += salesData.mike.over500[3];
      }
      if (this.state.may) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[4];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[4];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[4];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[4];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[4];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[4];
        liveSalesData.nolan.over500 += salesData.nolan.over500[4];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[4];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[4];  liveSalesData.joel.closeCount += salesData.joel.closeCount[4];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[4];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[4];  liveSalesData.joel.startVolume += salesData.joel.startVolume[4];  liveSalesData.joel.over500 += salesData.joel.over500[4];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[4];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[4];  liveSalesData.carla.closeCount += salesData.carla.closeCount[4];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[4];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[4];  liveSalesData.carla.startVolume += salesData.carla.startVolume[4];  liveSalesData.carla.over500 += salesData.carla.over500[4];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[4];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[4];  liveSalesData.shana.closeCount += salesData.shana.closeCount[4];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[4];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[4];  liveSalesData.shana.startVolume += salesData.shana.startVolume[4];  liveSalesData.shana.over500 += salesData.shana.over500[4];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[4];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[4];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[4];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[4];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[4];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[4];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[4];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[4];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[4];  liveSalesData.paula.closeCount += salesData.paula.closeCount[4];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[4];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[4];  liveSalesData.paula.startVolume += salesData.paula.startVolume[4];  liveSalesData.paula.over500 += salesData.paula.over500[4];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[4];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[4];  liveSalesData.jett.closeCount += salesData.jett.closeCount[4];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[4];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[4];  liveSalesData.jett.startVolume += salesData.jett.startVolume[4];  liveSalesData.jett.over500 += salesData.jett.over500[4];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[4];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[4];  liveSalesData.jason.closeCount += salesData.jason.closeCount[4];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[4];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[4];  liveSalesData.jason.startVolume += salesData.jason.startVolume[4];  liveSalesData.jason.over500 += salesData.jason.over500[4];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[4];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[4];  liveSalesData.justin.closeCount += salesData.justin.closeCount[4];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[4];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[4];  liveSalesData.justin.startVolume += salesData.justin.startVolume[4];  liveSalesData.justin.over500 += salesData.justin.over500[4];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[4];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[4];  liveSalesData.mike.closeCount += salesData.mike.closeCount[4];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[4];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[4];  liveSalesData.mike.startVolume += salesData.mike.startVolume[4];  liveSalesData.mike.over500 += salesData.mike.over500[4];
      }
      if (this.state.jun) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[5];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[5];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[5];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[5];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[5];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[5];
        liveSalesData.nolan.over500 += salesData.nolan.over500[5];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[5];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[5];  liveSalesData.joel.closeCount += salesData.joel.closeCount[5];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[5];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[5];  liveSalesData.joel.startVolume += salesData.joel.startVolume[5];  liveSalesData.joel.over500 += salesData.joel.over500[5];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[5];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[5];  liveSalesData.carla.closeCount += salesData.carla.closeCount[5];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[5];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[5];  liveSalesData.carla.startVolume += salesData.carla.startVolume[5];  liveSalesData.carla.over500 += salesData.carla.over500[5];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[5];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[5];  liveSalesData.shana.closeCount += salesData.shana.closeCount[5];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[5];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[5];  liveSalesData.shana.startVolume += salesData.shana.startVolume[5];  liveSalesData.shana.over500 += salesData.shana.over500[5];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[5];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[5];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[5];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[5];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[5];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[5];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[5];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[5];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[5];  liveSalesData.paula.closeCount += salesData.paula.closeCount[5];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[5];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[5];  liveSalesData.paula.startVolume += salesData.paula.startVolume[5];  liveSalesData.paula.over500 += salesData.paula.over500[5];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[5];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[5];  liveSalesData.jett.closeCount += salesData.jett.closeCount[5];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[5];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[5];  liveSalesData.jett.startVolume += salesData.jett.startVolume[5];  liveSalesData.jett.over500 += salesData.jett.over500[5];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[5];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[5];  liveSalesData.jason.closeCount += salesData.jason.closeCount[5];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[5];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[5];  liveSalesData.jason.startVolume += salesData.jason.startVolume[5];  liveSalesData.jason.over500 += salesData.jason.over500[5];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[5];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[5];  liveSalesData.justin.closeCount += salesData.justin.closeCount[5];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[5];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[5];  liveSalesData.justin.startVolume += salesData.justin.startVolume[5];  liveSalesData.justin.over500 += salesData.justin.over500[5];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[5];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[5];  liveSalesData.mike.closeCount += salesData.mike.closeCount[5];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[5];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[5];  liveSalesData.mike.startVolume += salesData.mike.startVolume[5];  liveSalesData.mike.over500 += salesData.mike.over500[5];
      }
      if (this.state.jul) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[6];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[6];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[6];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[6];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[6];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[6];
        liveSalesData.nolan.over500 += salesData.nolan.over500[6];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[6];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[6];  liveSalesData.joel.closeCount += salesData.joel.closeCount[6];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[6];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[6];  liveSalesData.joel.startVolume += salesData.joel.startVolume[6];  liveSalesData.joel.over500 += salesData.joel.over500[6];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[6];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[6];  liveSalesData.carla.closeCount += salesData.carla.closeCount[6];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[6];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[6];  liveSalesData.carla.startVolume += salesData.carla.startVolume[6];  liveSalesData.carla.over500 += salesData.carla.over500[6];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[6];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[6];  liveSalesData.shana.closeCount += salesData.shana.closeCount[6];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[6];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[6];  liveSalesData.shana.startVolume += salesData.shana.startVolume[6];  liveSalesData.shana.over500 += salesData.shana.over500[6];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[6];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[6];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[6];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[6];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[6];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[6];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[6];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[6];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[6];  liveSalesData.paula.closeCount += salesData.paula.closeCount[6];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[6];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[6];  liveSalesData.paula.startVolume += salesData.paula.startVolume[6];  liveSalesData.paula.over500 += salesData.paula.over500[6];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[6];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[6];  liveSalesData.jett.closeCount += salesData.jett.closeCount[6];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[6];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[6];  liveSalesData.jett.startVolume += salesData.jett.startVolume[6];  liveSalesData.jett.over500 += salesData.jett.over500[6];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[6];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[6];  liveSalesData.jason.closeCount += salesData.jason.closeCount[6];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[6];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[6];  liveSalesData.jason.startVolume += salesData.jason.startVolume[6];  liveSalesData.jason.over500 += salesData.jason.over500[6];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[6];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[6];  liveSalesData.justin.closeCount += salesData.justin.closeCount[6];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[6];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[6];  liveSalesData.justin.startVolume += salesData.justin.startVolume[6];  liveSalesData.justin.over500 += salesData.justin.over500[6];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[6];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[6];  liveSalesData.mike.closeCount += salesData.mike.closeCount[6];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[6];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[6];  liveSalesData.mike.startVolume += salesData.mike.startVolume[6];  liveSalesData.mike.over500 += salesData.mike.over500[6];
      }
      if (this.state.aug) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[7];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[7];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[7];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[7];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[7];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[7];
        liveSalesData.nolan.over500 += salesData.nolan.over500[7];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[7];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[7];  liveSalesData.joel.closeCount += salesData.joel.closeCount[7];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[7];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[7];  liveSalesData.joel.startVolume += salesData.joel.startVolume[7];  liveSalesData.joel.over500 += salesData.joel.over500[7];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[7];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[7];  liveSalesData.carla.closeCount += salesData.carla.closeCount[7];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[7];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[7];  liveSalesData.carla.startVolume += salesData.carla.startVolume[7];  liveSalesData.carla.over500 += salesData.carla.over500[7];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[7];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[7];  liveSalesData.shana.closeCount += salesData.shana.closeCount[7];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[7];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[7];  liveSalesData.shana.startVolume += salesData.shana.startVolume[7];  liveSalesData.shana.over500 += salesData.shana.over500[7];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[7];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[7];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[7];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[7];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[7];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[7];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[7];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[7];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[7];  liveSalesData.paula.closeCount += salesData.paula.closeCount[7];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[7];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[7];  liveSalesData.paula.startVolume += salesData.paula.startVolume[7];  liveSalesData.paula.over500 += salesData.paula.over500[7];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[7];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[7];  liveSalesData.jett.closeCount += salesData.jett.closeCount[7];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[7];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[7];  liveSalesData.jett.startVolume += salesData.jett.startVolume[7];  liveSalesData.jett.over500 += salesData.jett.over500[7];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[7];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[7];  liveSalesData.jason.closeCount += salesData.jason.closeCount[7];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[7];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[7];  liveSalesData.jason.startVolume += salesData.jason.startVolume[7];  liveSalesData.jason.over500 += salesData.jason.over500[7];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[7];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[7];  liveSalesData.justin.closeCount += salesData.justin.closeCount[7];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[7];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[7];  liveSalesData.justin.startVolume += salesData.justin.startVolume[7];  liveSalesData.justin.over500 += salesData.justin.over500[7];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[7];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[7];  liveSalesData.mike.closeCount += salesData.mike.closeCount[7];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[7];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[7];  liveSalesData.mike.startVolume += salesData.mike.startVolume[7];  liveSalesData.mike.over500 += salesData.mike.over500[7];
      }
      if (this.state.sep) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[8];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[8];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[8];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[8];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[8];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[8];
        liveSalesData.nolan.over500 += salesData.nolan.over500[8];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[8];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[8];  liveSalesData.joel.closeCount += salesData.joel.closeCount[8];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[8];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[8];  liveSalesData.joel.startVolume += salesData.joel.startVolume[8];  liveSalesData.joel.over500 += salesData.joel.over500[8];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[8];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[8];  liveSalesData.carla.closeCount += salesData.carla.closeCount[8];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[8];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[8];  liveSalesData.carla.startVolume += salesData.carla.startVolume[8];  liveSalesData.carla.over500 += salesData.carla.over500[8];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[8];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[8];  liveSalesData.shana.closeCount += salesData.shana.closeCount[8];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[8];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[8];  liveSalesData.shana.startVolume += salesData.shana.startVolume[8];  liveSalesData.shana.over500 += salesData.shana.over500[8];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[8];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[8];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[8];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[8];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[8];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[8];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[8];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[8];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[8];  liveSalesData.paula.closeCount += salesData.paula.closeCount[8];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[8];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[8];  liveSalesData.paula.startVolume += salesData.paula.startVolume[8];  liveSalesData.paula.over500 += salesData.paula.over500[8];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[8];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[8];  liveSalesData.jett.closeCount += salesData.jett.closeCount[8];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[8];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[8];  liveSalesData.jett.startVolume += salesData.jett.startVolume[8];  liveSalesData.jett.over500 += salesData.jett.over500[8];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[8];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[8];  liveSalesData.jason.closeCount += salesData.jason.closeCount[8];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[8];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[8];  liveSalesData.jason.startVolume += salesData.jason.startVolume[8];  liveSalesData.jason.over500 += salesData.jason.over500[8];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[8];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[8];  liveSalesData.justin.closeCount += salesData.justin.closeCount[8];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[8];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[8];  liveSalesData.justin.startVolume += salesData.justin.startVolume[8];  liveSalesData.justin.over500 += salesData.justin.over500[8];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[8];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[8];  liveSalesData.mike.closeCount += salesData.mike.closeCount[8];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[8];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[8];  liveSalesData.mike.startVolume += salesData.mike.startVolume[8];  liveSalesData.mike.over500 += salesData.mike.over500[8];
      }
      if (this.state.oct) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[9];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[9];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[9];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[9];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[9];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[9];
        liveSalesData.nolan.over500 += salesData.nolan.over500[9];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[9];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[9];  liveSalesData.joel.closeCount += salesData.joel.closeCount[9];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[9];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[9];  liveSalesData.joel.startVolume += salesData.joel.startVolume[9];  liveSalesData.joel.over500 += salesData.joel.over500[9];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[9];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[9];  liveSalesData.carla.closeCount += salesData.carla.closeCount[9];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[9];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[9];  liveSalesData.carla.startVolume += salesData.carla.startVolume[9];  liveSalesData.carla.over500 += salesData.carla.over500[9];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[9];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[9];  liveSalesData.shana.closeCount += salesData.shana.closeCount[9];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[9];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[9];  liveSalesData.shana.startVolume += salesData.shana.startVolume[9];  liveSalesData.shana.over500 += salesData.shana.over500[9];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[9];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[9];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[9];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[9];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[9];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[9];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[9];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[9];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[9];  liveSalesData.paula.closeCount += salesData.paula.closeCount[9];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[9];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[9];  liveSalesData.paula.startVolume += salesData.paula.startVolume[9];  liveSalesData.paula.over500 += salesData.paula.over500[9];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[9];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[9];  liveSalesData.jett.closeCount += salesData.jett.closeCount[9];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[9];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[9];  liveSalesData.jett.startVolume += salesData.jett.startVolume[9];  liveSalesData.jett.over500 += salesData.jett.over500[9];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[9];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[9];  liveSalesData.jason.closeCount += salesData.jason.closeCount[9];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[9];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[9];  liveSalesData.jason.startVolume += salesData.jason.startVolume[9];  liveSalesData.jason.over500 += salesData.jason.over500[9];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[9];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[9];  liveSalesData.justin.closeCount += salesData.justin.closeCount[9];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[9];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[9];  liveSalesData.justin.startVolume += salesData.justin.startVolume[9];  liveSalesData.justin.over500 += salesData.justin.over500[9];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[9];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[9];  liveSalesData.mike.closeCount += salesData.mike.closeCount[9];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[9];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[9];  liveSalesData.mike.startVolume += salesData.mike.startVolume[9];  liveSalesData.mike.over500 += salesData.mike.over500[9];
      }
      if (this.state.nov) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[10];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[10];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[10];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[10];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[10];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[10];
        liveSalesData.nolan.over500 += salesData.nolan.over500[10];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[10];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[10];  liveSalesData.joel.closeCount += salesData.joel.closeCount[10];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[10];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[10];  liveSalesData.joel.startVolume += salesData.joel.startVolume[10];  liveSalesData.joel.over500 += salesData.joel.over500[10];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[10];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[10];  liveSalesData.carla.closeCount += salesData.carla.closeCount[10];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[10];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[10];  liveSalesData.carla.startVolume += salesData.carla.startVolume[10];  liveSalesData.carla.over500 += salesData.carla.over500[10];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[10];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[10];  liveSalesData.shana.closeCount += salesData.shana.closeCount[10];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[10];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[10];  liveSalesData.shana.startVolume += salesData.shana.startVolume[10];  liveSalesData.shana.over500 += salesData.shana.over500[10];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[10];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[10];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[10];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[10];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[10];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[10];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[10];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[10];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[10];  liveSalesData.paula.closeCount += salesData.paula.closeCount[10];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[10];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[10];  liveSalesData.paula.startVolume += salesData.paula.startVolume[10];  liveSalesData.paula.over500 += salesData.paula.over500[10];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[10];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[10];  liveSalesData.jett.closeCount += salesData.jett.closeCount[10];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[10];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[10];  liveSalesData.jett.startVolume += salesData.jett.startVolume[10];  liveSalesData.jett.over500 += salesData.jett.over500[10];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[10];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[10];  liveSalesData.jason.closeCount += salesData.jason.closeCount[10];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[10];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[10];  liveSalesData.jason.startVolume += salesData.jason.startVolume[10];  liveSalesData.jason.over500 += salesData.jason.over500[10];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[10];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[10];  liveSalesData.justin.closeCount += salesData.justin.closeCount[10];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[10];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[10];  liveSalesData.justin.startVolume += salesData.justin.startVolume[10];  liveSalesData.justin.over500 += salesData.justin.over500[10];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[10];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[10];  liveSalesData.mike.closeCount += salesData.mike.closeCount[10];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[10];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[10];  liveSalesData.mike.startVolume += salesData.mike.startVolume[10];  liveSalesData.mike.over500 += salesData.mike.over500[10];
      }
      if (this.state.dec) {
        liveSalesData.nolan.apptCount += salesData.nolan.apptCount[11];
        liveSalesData.nolan.proposalCount += salesData.nolan.proposalCount[11];
        liveSalesData.nolan.closeCount += salesData.nolan.closeCount[11];
        liveSalesData.nolan.proposalVolume += salesData.nolan.proposalVolume[11];
        liveSalesData.nolan.closeVolume += salesData.nolan.closeVolume[11];
        liveSalesData.nolan.startVolume += salesData.nolan.startVolume[11];
        liveSalesData.nolan.over500 += salesData.nolan.over500[11];

        liveSalesData.joel.apptCount += salesData.joel.apptCount[11];  liveSalesData.joel.proposalCount += salesData.joel.proposalCount[11];  liveSalesData.joel.closeCount += salesData.joel.closeCount[11];  liveSalesData.joel.proposalVolume += salesData.joel.proposalVolume[11];  liveSalesData.joel.closeVolume += salesData.joel.closeVolume[11];  liveSalesData.joel.startVolume += salesData.joel.startVolume[11];  liveSalesData.joel.over500 += salesData.joel.over500[11];
        liveSalesData.carla.apptCount += salesData.carla.apptCount[11];  liveSalesData.carla.proposalCount += salesData.carla.proposalCount[11];  liveSalesData.carla.closeCount += salesData.carla.closeCount[11];  liveSalesData.carla.proposalVolume += salesData.carla.proposalVolume[11];  liveSalesData.carla.closeVolume += salesData.carla.closeVolume[11];  liveSalesData.carla.startVolume += salesData.carla.startVolume[11];  liveSalesData.carla.over500 += salesData.carla.over500[11];
        liveSalesData.shana.apptCount += salesData.shana.apptCount[11];  liveSalesData.shana.proposalCount += salesData.shana.proposalCount[11];  liveSalesData.shana.closeCount += salesData.shana.closeCount[11];  liveSalesData.shana.proposalVolume += salesData.shana.proposalVolume[11];  liveSalesData.shana.closeVolume += salesData.shana.closeVolume[11];  liveSalesData.shana.startVolume += salesData.shana.startVolume[11];  liveSalesData.shana.over500 += salesData.shana.over500[11];
        liveSalesData.mariyah.apptCount += salesData.mariyah.apptCount[11];  liveSalesData.mariyah.proposalCount += salesData.mariyah.proposalCount[11];  liveSalesData.mariyah.closeCount += salesData.mariyah.closeCount[11];  liveSalesData.mariyah.proposalVolume += salesData.mariyah.proposalVolume[11];  liveSalesData.mariyah.closeVolume += salesData.mariyah.closeVolume[11];  liveSalesData.mariyah.startVolume += salesData.mariyah.startVolume[11];  liveSalesData.mariyah.over500 += salesData.mariyah.over500[11];
        liveSalesData.paula.apptCount += salesData.paula.apptCount[11];  liveSalesData.paula.proposalCount += salesData.paula.proposalCount[11];  liveSalesData.paula.closeCount += salesData.paula.closeCount[11];  liveSalesData.paula.proposalVolume += salesData.paula.proposalVolume[11];  liveSalesData.paula.closeVolume += salesData.paula.closeVolume[11];  liveSalesData.paula.startVolume += salesData.paula.startVolume[11];  liveSalesData.paula.over500 += salesData.paula.over500[11];
        liveSalesData.jett.apptCount += salesData.jett.apptCount[11];  liveSalesData.jett.proposalCount += salesData.jett.proposalCount[11];  liveSalesData.jett.closeCount += salesData.jett.closeCount[11];  liveSalesData.jett.proposalVolume += salesData.jett.proposalVolume[11];  liveSalesData.jett.closeVolume += salesData.jett.closeVolume[11];  liveSalesData.jett.startVolume += salesData.jett.startVolume[11];  liveSalesData.jett.over500 += salesData.jett.over500[11];
        liveSalesData.jason.apptCount += salesData.jason.apptCount[11];  liveSalesData.jason.proposalCount += salesData.jason.proposalCount[11];  liveSalesData.jason.closeCount += salesData.jason.closeCount[11];  liveSalesData.jason.proposalVolume += salesData.jason.proposalVolume[11];  liveSalesData.jason.closeVolume += salesData.jason.closeVolume[11];  liveSalesData.jason.startVolume += salesData.jason.startVolume[11];  liveSalesData.jason.over500 += salesData.jason.over500[11];
        liveSalesData.justin.apptCount += salesData.justin.apptCount[11];  liveSalesData.justin.proposalCount += salesData.justin.proposalCount[11];  liveSalesData.justin.closeCount += salesData.justin.closeCount[11];  liveSalesData.justin.proposalVolume += salesData.justin.proposalVolume[11];  liveSalesData.justin.closeVolume += salesData.justin.closeVolume[11];  liveSalesData.justin.startVolume += salesData.justin.startVolume[11];  liveSalesData.justin.over500 += salesData.justin.over500[11];
        liveSalesData.mike.apptCount += salesData.mike.apptCount[11];  liveSalesData.mike.proposalCount += salesData.mike.proposalCount[11];  liveSalesData.mike.closeCount += salesData.mike.closeCount[11];  liveSalesData.mike.proposalVolume += salesData.mike.proposalVolume[11];  liveSalesData.mike.closeVolume += salesData.mike.closeVolume[11];  liveSalesData.mike.startVolume += salesData.mike.startVolume[11];  liveSalesData.mike.over500 += salesData.mike.over500[11];
      }
    }

    return (
      <div className="DashData salesData">
        <div className="monthSelector">
          <h4>Select Months</h4>
          <div className="selectorInner">
            <div onClick={this.toggleMonth} className={this.state.jan ? "month mon-0 isActive" : "month mon-0"}>Jan</div>
            <div onClick={this.toggleMonth} className={this.state.feb ? "month mon-1 isActive" : "month mon-1"}>Feb</div>
            <div onClick={this.toggleMonth} className={this.state.mar ? "month mon-2 isActive" : "month mon-2"}>Mar</div>
            <div onClick={this.toggleMonth} className={this.state.apr ? "month mon-3 isActive" : "month mon-3"}>Apr</div>
            <div onClick={this.toggleMonth} className={this.state.may ? "month mon-4 isActive" : "month mon-4"}>May</div>
            <div onClick={this.toggleMonth} className={this.state.jun ? "month mon-5 isActive" : "month mon-5"}>Jun</div>
            <div onClick={this.toggleMonth} className={this.state.jul ? "month mon-6 isActive" : "month mon-6"}>Jul</div>
            <div onClick={this.toggleMonth} className={this.state.aug ? "month mon-7 isActive" : "month mon-7"}>Aug</div>
            <div onClick={this.toggleMonth} className={this.state.sep ? "month mon-8 isActive" : "month mon-8"}>Sep</div>
            <div onClick={this.toggleMonth} className={this.state.oct ? "month mon-9 isActive" : "month mon-9"}>Oct</div>
            <div onClick={this.toggleMonth} className={this.state.nov ? "month mon-10 isActive" : "month mon-10"}>Nov</div>
            <div onClick={this.toggleMonth} className={this.state.dec ? "month mon-11 isActive" : "month mon-11"}>Dec</div>
          </div>
        </div>

        <div className="RegionWrapper outside">
          <h4>Outside Sales</h4>

          <div className="pointSet">
            <div className="pointCard">
              <h4>Nolan</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.nolan.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.nolan.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.nolan.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.nolan.closeCount ? Math.round((liveSalesData.nolan.closeCount / liveSalesData.nolan.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.nolan.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.nolan.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.nolan.proposalCount ? Math.round((liveSalesData.nolan.proposalCount / liveSalesData.nolan.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.nolan.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.nolan.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointCard">
              <h4>Joel</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.joel.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.joel.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.joel.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.joel.closeCount ? Math.round((liveSalesData.joel.closeCount / liveSalesData.joel.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.joel.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.joel.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.joel.proposalCount ? Math.round((liveSalesData.joel.proposalCount / liveSalesData.joel.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.joel.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.joel.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>





        <div className="RegionWrapper outside">
          <h4>Inside Sales</h4>

          <div className="pointSet">
            <div className="pointCard">
              <h4>Carla</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.carla.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.carla.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.carla.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.carla.closeCount ? Math.round((liveSalesData.carla.closeCount / liveSalesData.carla.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.carla.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.carla.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.carla.proposalCount ? Math.round((liveSalesData.carla.proposalCount / liveSalesData.carla.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.carla.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.carla.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Shana</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.shana.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.shana.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.shana.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.shana.closeCount ? Math.round((liveSalesData.shana.closeCount / liveSalesData.shana.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.shana.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.shana.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.shana.proposalCount ? Math.round((liveSalesData.shana.proposalCount / liveSalesData.shana.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.shana.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.shana.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Mariyah</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mariyah.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mariyah.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.mariyah.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mariyah.closeCount ? Math.round((liveSalesData.mariyah.closeCount / liveSalesData.mariyah.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mariyah.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.mariyah.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mariyah.proposalCount ? Math.round((liveSalesData.mariyah.proposalCount / liveSalesData.mariyah.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mariyah.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.mariyah.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Lisa</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.paula.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.paula.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.paula.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.paula.closeCount ? Math.round((liveSalesData.paula.closeCount / liveSalesData.paula.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.paula.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.paula.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.paula.proposalCount ? Math.round((liveSalesData.paula.proposalCount / liveSalesData.paula.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.paula.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.paula.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Jett</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jett.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jett.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.jett.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jett.closeCount ? Math.round((liveSalesData.jett.closeCount / liveSalesData.jett.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jett.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.jett.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jett.proposalCount ? Math.round((liveSalesData.jett.proposalCount / liveSalesData.jett.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jett.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.jett.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Justin</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.justin.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.justin.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.justin.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.justin.closeCount ? Math.round((liveSalesData.justin.closeCount / liveSalesData.justin.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.justin.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.justin.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.justin.proposalCount ? Math.round((liveSalesData.justin.proposalCount / liveSalesData.justin.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.justin.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.justin.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointCard">
              <h4>Jason</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jason.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jason.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.jason.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jason.closeCount ? Math.round((liveSalesData.jason.closeCount / liveSalesData.jason.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.jason.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.jason.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jason.proposalCount ? Math.round((liveSalesData.jason.proposalCount / liveSalesData.jason.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.jason.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.jason.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointCard">
              <h4>Mike</h4>

              <div className="data">
                {this.isLoading}

                <div className="dataSet">
                  <p>Starts</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mike.startVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                    <p>Starts</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Closes</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mike.closeVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.mike.closeCount})</h4>
                    <p>Closes</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mike.closeCount ? Math.round((liveSalesData.mike.closeCount / liveSalesData.mike.proposalCount) * 100) : 0}%</h4>
                    <p>Close Rate</p>
                  </div>
                </div>
                <div className="dataSet">
                  <p>Proposals</p>
                  <div className="dataItem">
                    <h4>${liveSalesData.mike.proposalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({liveSalesData.mike.proposalCount})</h4>
                    <p>Proposals</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mike.proposalCount ? Math.round((liveSalesData.mike.proposalCount / liveSalesData.mike.apptCount) * 100) : 0}%</h4>
                    <p>Prop. Rate</p>
                  </div>
                  <div className="dataItem">
                    <h4>{liveSalesData.mike.over500}</h4>
                    <p>Over $500</p>
                  </div>
                </div>
                <div className="dataSet">
                  <div className="dataItem">
                    <h4>{liveSalesData.mike.apptCount}</h4>
                    <p>Appts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get isLoading() {
    if (this.props.loadingSales) {
      return (
        <img src={loader} alt="" />
      );
    } else {
      return;
    }
  }
}
