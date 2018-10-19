import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import exit from '../../assets/icons/white/exit.png';
import loader from '../../assets/loader.gif';

export default class SalesMetrics extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      tampaMetricsOffset: '',
      tampaMetricsData: [],
      orlandoMetricsOffset: '',
      orlandoMetricsData: [],
      clearedTampa: false,
      clearedOrlando: false,
      salesMetricData: [],
    }
  }

  monthlySalesData = () => {
    var salesDataURL;

    setTimeout((function() {
      let clearedCount = 0;

      let tampaMetricsURL;
      let orlandoMetricsURL;


      let salesMetricFinish = function() {
        if (this.state.clearedOrlando && this.state.clearedTampa) {
          console.log(this.state.tampaMetricsData);
          console.log(this.state.orlandoMetricsData);
          this.setState({
            salesMetricData: this.state.tampaMetricsData.concat(this.state.orlandoMetricsData),
          });

          setTimeout((function() {
            let salesSplit = {
              NWP: [],
              TMP: [],
              JDH: [],
            };
            for (var i in this.state.salesMetricData) {
              let thisData = this.state.salesMetricData[i].fields;

              if (thisData['Sales Rep'] === 'Nolan Perkins') {
                salesSplit['NWP'].push(thisData);
              } else if (thisData['Sales Rep'] === 'Tyler Perkins') {
                salesSplit['TMP'].push(thisData);
              } else if (thisData['Sales Rep'] === 'Joel Horwitz') {
                salesSplit['JDH'].push(thisData);
              }
            }

            this.setState({
              salesMetricData: salesSplit,
            });
            console.log(this.state.salesMetricData['NWP']);

            setTimeout((function() {
              let currMonth = new Date();
              currMonth = currMonth.getMonth();
              let salesMetrics = {
                NWP: {
                  closes: 0,
                  appts: 0,
                  proposals: 0,
                  closeAmount: 0,
                  closeRate: '',
                  proposalRate: '',
                },
                TMP: {
                  closes: 0,
                  appts: 0,
                  proposals: 0,
                  closeAmount: 0,
                  closeRate: '',
                  proposalRate: '',
                },
                JDH: {
                  closes: 0,
                  appts: 0,
                  proposals: 0,
                  closeAmount: 0,
                  closeRate: '',
                  proposalRate: '',
                },
              }
              for (var i in this.state.salesMetricData['NWP']) {
                let thisData = this.state.salesMetricData['NWP'][i];
                let propMonth; let apptMonth; let closeMonth;

                if (thisData['Appt. Date']) {
                  let formattedAppt = new Date(thisData['Appt. Date']);
                  var formattedAppt = new Date(formattedAppt.getTime() + Math.abs(formattedAppt.getTimezoneOffset()*60000));
                  apptMonth = formattedAppt.getMonth();

                  if (apptMonth === currMonth) {
                    salesMetrics['NWP'].appts ++;
                  }
                }
                if (thisData['Proposal Date']) {
                  let formattedProposal = new Date(thisData['Proposal Date']);
                  var formattedProposal = new Date(formattedProposal.getTime() + Math.abs(formattedProposal.getTimezoneOffset()*60000));
                  propMonth = formattedProposal.getMonth();

                  if (propMonth === currMonth) {
                    salesMetrics['NWP'].proposals ++;
                  }
                }
                if (thisData['Status'] === 'Closed') {
                  let formattedClose = new Date(thisData['Close Date']);
                  var formattedClose = new Date(formattedClose.getTime() + Math.abs(formattedClose.getTimezoneOffset()*60000));
                  closeMonth = formattedClose.getMonth();

                  if (closeMonth === currMonth) {
                    let monthlyClose = parseInt(thisData['Monthly Amount'].replace('$', ''));
                    salesMetrics['NWP'].closes ++;
                    salesMetrics['NWP'].closeAmount += monthlyClose;
                  }
                }
                salesMetrics['NWP'].closeRate = ((salesMetrics['NWP'].closes / salesMetrics['NWP'].proposals) * 100).toFixed(1) + '%';
                salesMetrics['NWP'].proposalRate = ((salesMetrics['NWP'].proposals / salesMetrics['NWP'].appts) * 100).toFixed(1) + '%';
              }
              for (var i in this.state.salesMetricData['TMP']) {
                let thisData = this.state.salesMetricData['TMP'][i];
                let propMonth; let apptMonth; let closeMonth;

                if (thisData['Appt. Date']) {
                  let formattedAppt = new Date(thisData['Appt. Date']);
                  var formattedAppt = new Date(formattedAppt.getTime() + Math.abs(formattedAppt.getTimezoneOffset()*60000));
                  apptMonth = formattedAppt.getMonth();

                  if (apptMonth === currMonth) {
                    salesMetrics['TMP'].appts ++;
                  }
                }
                if (thisData['Proposal Date']) {
                  let formattedProposal = new Date(thisData['Proposal Date']);
                  var formattedProposal = new Date(formattedProposal.getTime() + Math.abs(formattedProposal.getTimezoneOffset()*60000));
                  propMonth = formattedProposal.getMonth();

                  if (propMonth === currMonth) {
                    salesMetrics['TMP'].proposals ++;
                  }
                }
                if (thisData['Status'] === 'Closed') {
                  let formattedClose = new Date(thisData['Close Date']);
                  var formattedClose = new Date(formattedClose.getTime() + Math.abs(formattedClose.getTimezoneOffset()*60000));
                  closeMonth = formattedClose.getMonth();

                  if (closeMonth === currMonth) {
                    let monthlyClose = parseInt(thisData['Monthly Amount'].replace('$', ''));
                    salesMetrics['TMP'].closes ++;
                    salesMetrics['TMP'].closeAmount += monthlyClose;
                  }
                }
                salesMetrics['TMP'].closeRate = ((salesMetrics['TMP'].closes / salesMetrics['TMP'].proposals) * 100).toFixed(1) + '%';
                salesMetrics['TMP'].proposalRate = ((salesMetrics['TMP'].proposals / salesMetrics['TMP'].appts) * 100).toFixed(1) + '%';
              }
              for (var i in this.state.salesMetricData['JDH']) {
                let thisData = this.state.salesMetricData['JDH'][i];
                let propMonth; let apptMonth; let closeMonth;

                if (thisData['Appt. Date']) {
                  let formattedAppt = new Date(thisData['Appt. Date']);
                  var formattedAppt = new Date(formattedAppt.getTime() + Math.abs(formattedAppt.getTimezoneOffset()*60000));
                  apptMonth = formattedAppt.getMonth();

                  if (apptMonth === currMonth) {
                    salesMetrics['JDH'].appts ++;
                  }
                }
                if (thisData['Proposal Date']) {
                  let formattedProposal = new Date(thisData['Proposal Date']);
                  var formattedProposal = new Date(formattedProposal.getTime() + Math.abs(formattedProposal.getTimezoneOffset()*60000));
                  propMonth = formattedProposal.getMonth();

                  if (propMonth === currMonth) {
                    salesMetrics['JDH'].proposals ++;
                  }
                }
                if (thisData['Status'] === 'Closed') {
                  let formattedClose = new Date(thisData['Close Date']);
                  var formattedClose = new Date(formattedClose.getTime() + Math.abs(formattedClose.getTimezoneOffset()*60000));
                  closeMonth = formattedClose.getMonth();

                  if (closeMonth === currMonth) {
                    let monthlyClose = parseInt(thisData['Monthly Amount'].replace('$', ''));
                    salesMetrics['JDH'].closes ++;
                    salesMetrics['JDH'].closeAmount += monthlyClose;
                  }
                }
                salesMetrics['JDH'].closeRate = ((salesMetrics['JDH'].closes / salesMetrics['JDH'].proposals) * 100).toFixed(1) + '%';
                salesMetrics['JDH'].proposalRate = ((salesMetrics['JDH'].proposals / salesMetrics['JDH'].appts) * 100).toFixed(1) + '%';
              }

              this.setState({
                loading: false,
                salesMetrics: salesMetrics,
              })
            }).bind(this), 10);
          }).bind(this), 10);
        }
      }.bind(this);


      setTimeout((function() {
        let loadTampa = function() {
          console.log('load tampaMetrics');
          let preTampa = this.state.tampaMetricsData;

          tampaMetricsURL = 'https://api.airtable.com/v0/' + 'appEX8GXgcD2ln4dB' + '/' + 'Sales' + '?view=Monthly+Activity&fields%5B%5D=Status&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Times+per+Week&fields%5B%5D=Monthly+Amount&fields%5B%5D=Company+Name';
          if (this.state.tampaMetricsOffset !== '') {tampaMetricsURL = tampaMetricsURL + '&offset=' + this.state.tampaMetricsOffset;}

          return axios
            .get(tampaMetricsURL).then(response => {
              this.setState({
                tampaMetricsData: preTampa.concat(response.data.records),
                error: false,
                tampaMetricsOffset: response.data.offset,
              });
            if (response.data.offset !== undefined && this.props.location.pathname === "/" + this.props.citySet + "/customer-service/") {
              console.log(this.state.clearedTampa);
              loadTampa();
            } else {
              console.log('clearing loadTampa()');
              this.setState({
                clearedTampa: true,
              });
              salesMetricFinish();
            }
          });
        }.bind(this);
        let loadOrlando = function() {
          console.log('load orlandoMetrics');
          let preOrlando = this.state.orlandoMetricsData;

          orlandoMetricsURL = 'https://api.airtable.com/v0/' + 'appXNufXR9nQARjgs' + '/' + 'Sales' + '?view=Monthly+Activity&fields%5B%5D=Status&fields%5B%5D=Sales+Rep&fields%5B%5D=Appt.+Set+By&fields%5B%5D=Appt.+Date&fields%5B%5D=Proposal+Date&fields%5B%5D=Close+Date&fields%5B%5D=Times+per+Week&fields%5B%5D=Monthly+Amount&fields%5B%5D=Company+Name';
          if (this.state.orlandoMetricsOffset !== '') {orlandoMetricsURL = orlandoMetricsURL + '&offset=' + this.state.orlandoMetricsOffset;}

          console.log(orlandoMetricsURL);
          return axios
            .get(orlandoMetricsURL).then(response => {
              this.setState({
                orlandoMetricsData: preOrlando.concat(response.data.records),
                error: false,
                orlandoMetricsOffset: response.data.offset,
              });
            if (response.data.offset !== undefined && this.props.location.pathname === "/" + this.props.citySet + "/customer-service/") {
              console.log(this.state.clearedOrlando);
              loadOrlando();
            } else {
              this.setState({
                clearedOrlando: true,
              });
              console.log('clearing loadOrlando()');
              salesMetricFinish();
            }
          });
        }.bind(this);

        loadTampa(); //start loading tampaMetrics

        setTimeout((function() { //delay loading orlandoMetrics
          loadOrlando();
        }).bind(this), 500);

      }).bind(this), 500);

    }).bind(this), 500);
  }

  componentDidMount() {
    this.monthlySalesData();
  }


  // Render
  // ----------------------------------------------------
  render() {
    if (this.state.loading) {
      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>Sales Metrics</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
            </div>
          </div>
        </div>
      )
    } else {

      return (
        <div className="FilterModal modalInner">
          <div className="modalTitle">
            <h4>Sales Metrics</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <div className="repList">

            <div className="repMetric">
              <h2>Tyler</h2>

              <p><span>Appointments</span> {this.state.salesMetrics ? this.state.salesMetrics['TMP'].appts : ''}</p>
              <p><span>Proposals</span> {this.state.salesMetrics ? this.state.salesMetrics['TMP'].proposals : ''}</p>
              <p><span>Proposal Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['TMP'].proposalRate : ''}</p>
              <hr />
              <p><span>Closes</span> {this.state.salesMetrics ? this.state.salesMetrics['TMP'].closes : ''}</p>
              <p><span>Close Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['TMP'].closeRate : ''}</p>
              <hr />
              <h4><span>Total Closed</span> ${this.state.salesMetrics ? this.state.salesMetrics['TMP'].closeAmount : ''}</h4>
            </div>

            
            <div className="repMetric">
              <h2>Nolan</h2>

              <p><span>Appointments</span> {this.state.salesMetrics ? this.state.salesMetrics['NWP'].appts : ''}</p>
              <p><span>Proposals</span> {this.state.salesMetrics ? this.state.salesMetrics['NWP'].proposals : ''}</p>
              <p><span>Proposal Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['NWP'].proposalRate : ''}</p>
              <hr />
              <p><span>Closes</span> {this.state.salesMetrics ? this.state.salesMetrics['NWP'].closes : ''}</p>
              <p><span>Close Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['NWP'].closeRate : ''}</p>
              <hr />
              <h4><span>Total Closed</span> ${this.state.salesMetrics ? this.state.salesMetrics['NWP'].closeAmount : ''}</h4>
            </div>



            <div className="repMetric">
              <h2>Joel</h2>

              <p><span>Appointments</span> {this.state.salesMetrics ? this.state.salesMetrics['JDH'].appts : ''}</p>
              <p><span>Proposals</span> {this.state.salesMetrics ? this.state.salesMetrics['JDH'].proposals : ''}</p>
              <p><span>Proposal Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['JDH'].proposalRate : ''}</p>
              <hr />
              <p><span>Closes</span> {this.state.salesMetrics ? this.state.salesMetrics['JDH'].closes : ''}</p>
              <p><span>Close Rate</span> {this.state.salesMetrics ? this.state.salesMetrics['JDH'].closeRate : ''}</p>
              <hr />
              <h4><span>Total Closed</span> ${this.state.salesMetrics ? this.state.salesMetrics['JDH'].closeAmount : ''}</h4>
            </div>
          </div>
        </div>

      );
    }
  }
}


SalesMetrics.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
