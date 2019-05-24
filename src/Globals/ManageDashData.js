import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';

import accounts from '../assets/icons/dash/accounts.png';
import attrition from '../assets/icons/dash/attrition.png';
import avgStay from '../assets/icons/dash/avgStay.png';
import cancels from '../assets/icons/dash/cancels.png';
import mtdGrowth from '../assets/icons/dash/mtdGrowth.png';
import revenue from '../assets/icons/dash/revenue.png';
import starts from '../assets/icons/dash/starts.png';
import ytdGrowth from '../assets/icons/dash/ytdGrowth.png';

let currentRecordState = [];
let revertState = [];
let dataIndex = [];

export default class ManageDashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      orlandoSize: [],
      tampaSize: [],
      tampaType: 'Accounts',
      orlandoType: 'Accounts',
    }
  }

  switchSizeGraph = e => {
    console.log(e.target);
    if (e.target.closest('.graphCard').id === 'tampaSize' && this.state.tampaType === 'Accounts') {
      this.setState({
        tampaType: 'Revenue',
        tampaSize: [
          this.props.customerData.tampa.sizeVol.over1500,
          this.props.customerData.tampa.sizeVol.under1500,
          this.props.customerData.tampa.sizeVol.under750,
          this.props.customerData.tampa.sizeVol.under300
        ],
      })
    } else if (e.target.closest('.graphCard').id === 'tampaSize' && this.state.tampaType === 'Revenue') {
      this.setState({
        tampaType: 'Accounts',
        tampaSize: [
          this.props.customerData.tampa.size.over1500,
          this.props.customerData.tampa.size.under1500,
          this.props.customerData.tampa.size.under750,
          this.props.customerData.tampa.size.under300
        ],
      })
    } else if (e.target.closest('.graphCard').id === 'orlandoSize' && this.state.orlandoType === 'Accounts') {
      this.setState({
        orlandoType: 'Revenue',
        orlandoSize: [
          this.props.customerData.orlando.sizeVol.over1500,
          this.props.customerData.orlando.sizeVol.under1500,
          this.props.customerData.orlando.sizeVol.under750,
          this.props.customerData.orlando.sizeVol.under300
        ],
      })
    } else if (e.target.closest('.graphCard').id === 'orlandoSize' && this.state.orlandoType === 'Revenue') {
      this.setState({
        orlandoType: 'Accounts',
        orlandoSize: [
          this.props.customerData.orlando.size.over1500,
          this.props.customerData.orlando.size.under1500,
          this.props.customerData.orlando.size.under750,
          this.props.customerData.orlando.size.under300
        ],
      })
    }
  }

  componentDidMount() {
    this.setState({
      orlandoSize: [
        this.props.customerData.orlando.size.over1500,
        this.props.customerData.orlando.size.under1500,
        this.props.customerData.orlando.size.under750,
        this.props.customerData.orlando.size.under300
      ],
      tampaSize: [
        this.props.customerData.tampa.size.over1500,
        this.props.customerData.tampa.size.under1500,
        this.props.customerData.tampa.size.under750,
        this.props.customerData.tampa.size.under300
      ],
    })
  }


  render() {
    const { customerData } = this.props;

    // totalBillings: 0,
    // ytdSales: 0,
    // ytdCancels: 0,
    // mtdStarts: 0,
    // mtdCancels: 0,
    // attrition: '',
    // customerLength: '',
    // standing: {
    //   veryHappy: 0,
    //   happy: 0,
    //   satisfied: 0,
    //   unhappy: 0,
    //   crewChange: 0,
    //   new: 0,
    // },
    // size: {
    //   under300: 0,
    //   under750: 0,
    //   under1500: 0,
    //   over1500: 0,
    // }
    let todaysDate  = new Date();
    let todaysMonth = (todaysDate.getMonth()+1);

    let tampaAttr = (customerData.tampa.mtdCancels/(customerData.tampa.totalBillings - customerData.tampa.mtdStarts))*100;
    let tampaCancelAvg = customerData.tampa.ytdCancels/todaysMonth;
    let tampaStay = (customerData.tampa.totalBillings/ tampaCancelAvg)/12;


    let orlandoAttr = (customerData.orlando.mtdCancels/(customerData.orlando.totalBillings - customerData.orlando.mtdStarts))*100;
    let orlandoCancelAvg = customerData.orlando.ytdCancels/todaysMonth;
    let orlandoStay = (customerData.orlando.totalBillings/ orlandoCancelAvg)/12;
    return (



















      <div className="DashData customerData">
        <div className="RegionWrapper tampa">
          <h4>Tampa</h4>
          <div className="pointSet">
            <div className="pointCard">
              <img src={revenue} />
              <div className="content">
                <h4>${customerData.tampa.totalBillings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>Current Revenue</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={accounts} />
              <div className="content">
                <h4>{customerData.tampa.size.under300 + customerData.tampa.size.under750 + customerData.tampa.size.under1500 + customerData.tampa.size.over1500}</h4>
                <p>Accounts</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={ytdGrowth} />
              <div className="content">
                <h4>${customerData.tampa.ytdSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>YTD Growth</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={avgStay} />
              <div className="content">
                <h4>{tampaStay.toFixed(2)}<span>years</span></h4>
                <p>Avg Customer Stay</p>
              </div>
            </div>



            <div className="pointCard">
              <img src={starts} />
              <div className="content">
                <h4>${customerData.tampa.mtdStarts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>MTD Starts</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={cancels} />
              <div className="content">
                <h4>${customerData.tampa.mtdCancels.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>MTD Cancellations</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={attrition} />
              <div className="content">
                <h4>{tampaAttr.toFixed(2)}%</h4>
                <p>MTD Attrition</p>
              </div>
            </div>
          </div>
          <div className="graphSet">
            <div className="graphCard">
              <p>Standings</p>
              <Doughnut
                data={{
                  labels: ["New", "Very Happy", "Happy", "Satisfied", "Unhappy"],
                  datasets: [{
                      label: "Test",
                      data: [customerData.tampa.standing.new, customerData.tampa.standing.veryHappy, customerData.tampa.standing.happy, customerData.tampa.standing.satisfied, customerData.tampa.standing.unhappy],
                      backgroundColor: [
                          '#1F92C2',
                          '#1FC16B',
                          '#77C23B',
                          '#DFC303',
                          '#C31F2F',
                      ],
                      borderColor: [
                          '#1F92C2',
                          '#1FC16B',
                          '#77C23B',
                          '#DFC303',
                          '#C31F2F',
                      ],
                      borderWidth: 1
                  }]
                }}
                options = {{
                  animation: {
          					animateScale: true,
          					animateRotate: true
          				},
                  responsive: true,
                  maintainAspectRatio: false,

                  legend: {
          					position: 'left',
                    labels:{
                      boxWidth: 10,
                      padding: 12
                    }
          				},
                }}
              />
            </div>

            <div className="clickable graphCard" id="tampaSize" onClick={this.switchSizeGraph}>
              <p>{this.state.tampaType}</p>
              <Doughnut
                data={{
                  labels: ["> $1500",  "< $1500", "< $750", "< $300"],
                  datasets: [{
                      data: this.state.tampaSize,
                      backgroundColor: [
                          '#1FC16B',
                          '#62d497',
                          '#a5e7c4',
                          '#d2f3e1',
                      ],
                      borderColor: [
                          '#1FC16B',
                          '#62d497',
                          '#a5e7c4',
                          '#d2f3e1',
                      ],
                      borderWidth: 1
                  }]
                }}
                options = {{
                  animation: {
                    animateScale: true,
                    animateRotate: true
                  },
                  responsive: true,
                  maintainAspectRatio: false,

                  legend: {
                    position: 'left',
                    labels:{
                      boxWidth: 10,
                      padding: 12
                    }
                  },
                }}
              />
            </div>
          </div>
        </div>



        <div className="RegionWrapper orlando">
          <h4>Orlando</h4>
          <div className="pointSet">
            <div className="pointCard">
              <img src={revenue} />
              <div className="content">
                <h4>${customerData.orlando.totalBillings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>Current Revenue</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={accounts} />
              <div className="content">
                <h4>{customerData.orlando.size.under300 + customerData.orlando.size.under750 + customerData.orlando.size.under1500 + customerData.orlando.size.over1500}</h4>
                <p>Accounts</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={ytdGrowth} />
              <div className="content">
                <h4>${customerData.orlando.ytdSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>YTD Growth</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={avgStay} />
              <div className="content">
                <h4>{orlandoStay.toFixed(2)}<span>years</span></h4>
                <p>Avg Customer Stay</p>
              </div>
            </div>



            <div className="pointCard">
              <img src={starts} />
              <div className="content">
                <h4>${customerData.orlando.mtdStarts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>MTD Starts</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={cancels} />
              <div className="content">
                <h4>${customerData.orlando.mtdCancels.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                <p>MTD Cancellations</p>
              </div>
            </div>

            <div className="pointCard">
              <img src={attrition} />
              <div className="content">
                <h4>{orlandoAttr.toFixed(2)}%</h4>
                <p>MTD Attrition</p>
              </div>
            </div>
          </div>
          <div className="graphSet">
            <div className="graphCard">
              <p>Standings</p>
              <Doughnut
                data={{
                  labels: ["New", "Very Happy", "Happy", "Satisfied", "Unhappy"],
                  datasets: [{
                      label: "Test",
                      data: [customerData.orlando.standing.new, customerData.orlando.standing.veryHappy, customerData.orlando.standing.happy, customerData.orlando.standing.satisfied, customerData.orlando.standing.unhappy],
                      backgroundColor: [
                          '#1F92C2',
                          '#1FC16B',
                          '#77C23B',
                          '#DFC303',
                          '#C31F2F',
                      ],
                      borderColor: [
                          '#1F92C2',
                          '#1FC16B',
                          '#77C23B',
                          '#DFC303',
                          '#C31F2F',
                      ],
                      borderWidth: 1
                  }]
                }}
                options = {{
                  animation: {
          					animateScale: true,
          					animateRotate: true
          				},
                  responsive: true,
                  maintainAspectRatio: false,

                  legend: {
          					position: 'left',
                    labels:{
                      boxWidth: 10,
                      padding: 12
                    }
          				},
                }}
              />
            </div>

            <div className="clickable graphCard" id="orlandoSize" onClick={this.switchSizeGraph}>
              <p>{this.state.orlandoType}</p>
              <Doughnut
                data={{
                  labels: ["> $1500",  "< $1500", "< $750", "< $300"],
                  datasets: [{
                      data: this.state.orlandoSize,
                      backgroundColor: [
                          '#1FC16B',
                          '#62d497',
                          '#a5e7c4',
                          '#d2f3e1',
                      ],
                      borderColor: [
                          '#1FC16B',
                          '#62d497',
                          '#a5e7c4',
                          '#d2f3e1',
                      ],
                      borderWidth: 1
                  }]
                }}
                options = {{
                  animation: {
                    animateScale: true,
                    animateRotate: true
                  },
                  responsive: true,
                  maintainAspectRatio: false,

                  legend: {
                    position: 'left',
                    labels:{
                      boxWidth: 10,
                      padding: 12
                    }
                  },
                }}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}
