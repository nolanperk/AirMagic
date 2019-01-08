import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import attentionImage from '../assets/icons/white/attention.png';
import phoneImg from '../assets/icons/white/phone.png';
import accountImg from '../assets/icons/white/account.png';
import edit from '../assets/icons/white/edit.png';
import loader from '../assets/loader.gif';
import search from '../assets/icons/white/search.png';
import TicketList from './Ticket/TicketList'
import TicketModal from './Ticket/TicketModal'
import AddTicketModal from './Ticket/AddTicketModal'
import CustomerDashNav from './CustomerDashNav'
import hamburger from '../assets/icons/white/hamburger.png';

let ticketImg;
let monthlyAmount;
export default class TicketView extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      error: "",
      data: null,
      dataURL: 'https://api.airtable.com/v0/',
      baseId: 'app3fdViobj1a5BQD',
      currentTable: '',
      ticketOpen: false,
      openedTicket: '',
      ticketChanges: false,
      ticketStatusChange: false,
      pictureAdded: false,
      issuesChange: false,
      updatesChange: false,
      viewType: 'list',
      modalSlide: 'company',
    }
  }


  loadTicketData = () => {
    let clearedCount = 0;

    this.setState({
      loading: true,
      ticketOffset: '',
      data: [],
      ticketData: {},
      clearedTicket: false,
      loadingText: 'Finding Things Needing a Ticket'
    });

    let ticketURL;


    let splashLoadFinish = function() {
      console.log(this.state.data);
      //FILTER OUT UNNECESARY PROACTIVES
      let newTicketData = {
        "created": [],
        "sentToSP": [],
        "fixedBySP": [],
        "resolved": [],
        "moreIssues": []
      };
      let ticketLength = 0;

      for (var i in this.state.data) {
        let tickets = this.state.data[i].fields;
        ticketLength ++;
        let newItem = {}; newItem['fields'] = tickets; newItem['id'] = this.state.data[i].id;
        if (tickets['Status'] === 'Ticket Created') {
          newTicketData['created'].push(newItem);
        } else if (tickets['Status'] === 'Sent to SP') {
          newTicketData['sentToSP'].push(newItem);
        } else if (tickets['Status'] === 'Fixed by SP') {
          newTicketData['fixedBySP'].push(newItem);
        } else if (tickets['Status'] === 'Ticket Resolved') {
          newTicketData['resolved'].push(newItem);
        } else if (tickets['Status'] === 'More Issues') {
          newTicketData['moreIssues'].push(newItem);
        }
      }
      this.setState({
        ticketData: newTicketData,
        ticketLength: ticketLength,
      });
      setTimeout((function() {
        this.setState({
          loading: false,
        });
      }).bind(this), 250);
    }.bind(this);


    setTimeout((function() {
      let loadTicket = function() {
        console.log('load ticket');
        let preTicket = this.state.data;

        ticketURL = this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '?view=Ongoing';

        if (this.state.ticketOffset !== '') {ticketURL = ticketURL + '&offset=' + this.state.ticketOffset;}

        console.log(ticketURL);
        return axios
          .get(ticketURL).then(response => {
            this.setState({
              data: preTicket.concat(response.data.records),
              error: false,
              ticketOffset: response.data.offset,
            });
          if (response.data.offset) {
            loadTicket();
          } else {
            this.setState({
              clearedTicket: true,
              loadingText: 'Loading',
            });
            setTimeout((function() {
              console.log('clearing loadTicket()');
              splashLoadFinish();
            }).bind(this), 50);
          }
        });
      }.bind(this);

      loadTicket();

    }).bind(this), 500);
  }

  changeTicketHandler = e => {
    if (e.target.id === 'status') {
      let newID = e.target[e.target.selectedIndex].id;
      document.getElementById('status').className=newID;
      this.setState({
        ticketStatusChange: true,
      })
    } else if (e.target.id === 'issues') {
      this.setState({
        issuesChange: true,
      })
    } else if (e.target.id === 'updates') {
      this.setState({
        updatesChange: true,
      })
    }
    let changeTicketState = this.state.openedTicket;

    if (e.target.id === 'issues') {changeTicketState.fields['Ticket Issues'] = e.target.value}
    else if (e.target.id === 'status') {changeTicketState.fields['Status'] = e.target.value}
    else if (e.target.id === 'updates') {changeTicketState.fields['Ticket Updates'] = e.target.value}

    this.setState({
      openedTicket: changeTicketState,
      ticketChanges: true,
    })
  }





  loadActiveData = () => {
    let clearedCount = 0;


    if (this.props.citySet === 'tampa') {
      this.setState({
        customerBase: 'apps7GoAgK23yrOoY',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        customerBase: 'appBUKBn552B8SlbE',
      });
    }


    this.setState({
      loading: true,
      activeOffset: '',
      data: [],
      activeCustomers: [],
      clearedActives: false,
      loadingText: 'Grabbing Active Customers'
    });

    let activeURL;


    let splashLoadFinish = function() {
      let activeSelect = [];

      for (var i in this.state.activeCustomers) {
        let newItem = {id:this.state.activeCustomers[i].id, company:this.state.activeCustomers[i].fields['Company Name'], amount:this.state.activeCustomers[i].fields['Monthly Amount']};
        activeSelect.push(newItem);
      }
      this.setState({
        activeCustomers: activeSelect,
      });
      setTimeout((function() {
        this.setState({
          loading: false,
        });

      }).bind(this), 250);
    }.bind(this);


    setTimeout((function() {
      let loadActives = function() {
        console.log('load active');
        let preActive = this.state.activeCustomers;

        activeURL = this.state.dataURL + this.state.customerBase + '/Customers?view=All+Actives&fields%5B%5D=Company+Name&fields%5B%5D=Monthly+Amount';

        if (this.state.activeOffset !== '') {activeURL = activeURL + '&offset=' + this.state.activeOffset;}

        console.log(activeURL);
        return axios
          .get(activeURL).then(response => {
            this.setState({
              activeCustomers: preActive.concat(response.data.records),
              error: false,
              activeOffset: response.data.offset,
            });
          if (response.data.offset) {
            loadActives();
          } else {
            this.setState({
              clearedActives: true,
              loadingText: 'Loading',
            });
            setTimeout((function() {
              console.log('clearing loadActive()');
              splashLoadFinish();
            }).bind(this), 50);
          }
        });
      }.bind(this);

      loadActives();

    }).bind(this), 500);
  }






  openTicketHandler = e => {
    console.log(e);

    setTimeout((function() {
      let newID = document.getElementById('status')[document.getElementById('status').selectedIndex].id;
      document.getElementById('status').className=newID;

      let txtAra = document.getElementById('issues')
      txtAra.style.height = (txtAra.scrollHeight > txtAra.clientHeight) ? (txtAra.scrollHeight)+"px" : "60px";

      let updateArea = document.getElementById('updates')
      updateArea.style.height = (updateArea.scrollHeight > updateArea.clientHeight) ? (updateArea.scrollHeight)+"px" : "60px";
    }).bind(this), 50);

    this.setState({
      ticketOpen: true,
      openedTicket: e
    })

    let customerBase;
    if (this.props.citySet === 'tampa') {
      customerBase = 'apps7GoAgK23yrOoY';
    } else if(this.props.citySet === 'orlando') {
      customerBase = 'appBUKBn552B8SlbE';
    }

    console.log(e.fields);
    let finalURL = this.state.dataURL + customerBase + '/Customers/' + e.fields['Company ID'];
    console.log(finalURL);
    return axios
      .get(finalURL)
      .then(response => {
        let newItemState = response.data.fields;

        newItemState['Notes'] = newItemState['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.setState({
          ticketRecordData: newItemState,
        });

        setTimeout((function() {
          let matchingSP = this.props.spList.filter(e => e.fields['Number'] === this.state.ticketRecordData['SP Number']);
          this.setState({
            spRecord: matchingSP[0].fields
          });
        }).bind(this), 50);
      });
  }

  addPicture = e => {
    let input = e.target;

    ticketImg = new FileReader();
    console.log(ticketImg);
    ticketImg.onload = function(){
      let dataURL = ticketImg.result;
      let output = document.getElementById('output');
      output.src = dataURL;
      document.getElementsByClassName('addImage')[0].className="pictureItem addImage imgAdded";

      let newImage = {url: dataURL}
      let pictureOpenedState = this.state.openedTicket;
      pictureOpenedState.fields['Pictures'].push(newImage)

      this.setState({
        ticketChanges: true,
        pictureAdded: true,
        pictureOpenedState: e
      })
    }.bind(this);
    ticketImg.readAsDataURL(input.files[0]);
  }

  removePicture = e => {
    if (e.target.closest('.addImage').className === 'pictureItem addImage imgAdded') {
      ticketImg = undefined;
      document.getElementsByClassName('addImage')[0].className="pictureItem addImage";
    }
  }

  closeTicketHandler = () => {
    if (this.state.ticketChanges) {
      //merging picture captions
      let picsList = this.state.openedTicket.fields['Pictures'];
      let txtAraVal = '';
      for (var i in picsList) {
        txtAraVal += 'CAPTION - ' + document.getElementById('CAPTION-' + i).value;
      }
      console.log(txtAraVal);

      let finalOpenedState = this.state.openedTicket;

      finalOpenedState.fields['Picture Captions'] = txtAraVal;
      let formattedLastEdit = new Date();
      formattedLastEdit = (formattedLastEdit.getMonth()+1) + '/' + formattedLastEdit.getDate() + '/' + formattedLastEdit.getFullYear();

      if (this.state.openedTicket.fields['Status'] === 'Ticket Resolved') {
        this.state.openedTicket.fields['Resolved Date'] = formattedLastEdit;
      }

      finalOpenedState.fields['Last Change'] = formattedLastEdit;

      let fullDataSet = this.state.data;
      let pushRecordId;
      let pushRecord;

      pushRecord = this.state.openedTicket.fields;
      pushRecordId = this.state.openedTicket.id;
      this.setState({
        ticketOpen: false,
      });




      setTimeout((function() {
        let finalPush = {"fields": pushRecord};
        console.log(finalPush);
        axios
        .put(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable + '/' + pushRecordId, finalPush)
          .then(response => {
            //STAMP CUSTOMER RECORD NOTES
            let customerBase;
            if (this.props.citySet === 'tampa') {
              customerBase = 'apps7GoAgK23yrOoY';
            } else if(this.props.citySet === 'orlando') {
              customerBase = 'appBUKBn552B8SlbE';
            }


            //GET CUSTOMER RECORD
            let finalURL = this.state.dataURL + customerBase + '/Customers/' + this.state.openedTicket.fields['Company ID'];
            console.log(finalURL);
            return axios
              .get(finalURL)
              .then(response => {
                let newItemState = response.data.fields;

                //STAMP THE NOTES
                let today  = new Date();
                let dayTime;
                if (today.getHours() > 11) {
                  if (today.getMinutes() < 10) {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 11) + ":0" + today.getMinutes() + " PM";
                  } else {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 11) + ":" + today.getMinutes() + " PM"; }
                } else {
                  if (today.getMinutes() < 10) {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
                  } else {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";  }
                }
                let finalEntry;
                if (this.props.userName !== '') {
                  finalEntry = dayTime + ' - ' + this.props.userName + '\n';
                } else {
                  finalEntry = dayTime + ' - ' + '\n';
                }

                let changeLine = 'Ticket Updated';
                if (this.state.ticketStatusChange) {  changeLine += '\n' + '- Status: ' + this.state.openedTicket.fields['Status']; }
                // if (this.state.pictureAdded) { changeLine += 'Pictures added - ' + this.state.openedTicket.fields['Pictures']; }
                if (this.state.issuesChange) {  changeLine += '\n' + '- Issues: ' + this.state.openedTicket.fields['Ticket Issues'];  }
                if (this.state.updatesChange) { changeLine += '\n' + '- Updates: ' + this.state.openedTicket.fields['Ticket Updates'];  }

                finalEntry += changeLine + '\n\n' + newItemState['Notes'];
                newItemState['Notes'] = finalEntry;


                //SAVE THE CUSTOMER RECORD
                let finalPush = {"fields": newItemState}
                axios
                .put(this.state.dataURL + customerBase + '/Customers/' + this.state.openedTicket.fields['Company ID'], finalPush)
                  .then(response => {
                    //RESET THE TICKET VIEW
                    this.setState({
                      ticketChanges: false,
                      ticketOpen: false,
                      openedTicket: '',
                      pictureAdded: false,
                      issuesChange: false,
                      updatesChange: false,
                    });
                    if (this.state.ticketStatusChange) {
                      this.setState({
                        ticketStatusChange: false,
                      });
                      this.loadTicketData();
                    }
                  });
              });
        })
        .catch(response => {
          console.error("error: ", response);
        });
      }).bind(this), 5);
    } else {
      this.setState({
        ticketOpen: false,
        openedTicket: ''
      });
    }
  }

  addTicket = () => {
    this.setState({
      viewType: 'addTicket',
    });

    this.loadActiveData();
  }

  closeAddTicket = () => {
    this.setState({
      viewType: 'list',
      newTicket: null,
      modalSlide: 'company',
    })
  }
  backAddTicket = () => {
    console.log(this.state.modalSlide);
    if (this.state.modalSlide === 'issues') {
      this.setState({
        newTicket: null,
        modalSlide: 'company',
      })
    } else if (this.state.modalSlide === 'confirm') {
      let newTicketState = this.state.newTicket;

      newTicketState['Ticket Issues'] = undefined;
      this.setState({
        newTicket: newTicketState,
        modalSlide: 'issues',
      })
    }
  }
  newTicketSubmit = e => {
    e.preventDefault();
    let targetForm = e.target.closest('form');
    if (targetForm.id === 'CustomerSelect') {
      let selectBlock = targetForm.childNodes[1].childNodes[0];
      if (selectBlock.value !== '') {
        let newItem = {};
        newItem['Company Name'] = selectBlock.value;
        newItem['Company ID'] = selectBlock.options[selectBlock.selectedIndex].getAttribute('data-id');

        monthlyAmount = selectBlock.options[selectBlock.selectedIndex].getAttribute('data-amount');


        this.setState({
          newTicket: newItem,
          modalSlide: 'issues',
        })
      } else {
        alert('Please choose a company for this ticket');
      }
    } else if (targetForm.id === 'Issues') {
      let textArea = targetForm.childNodes[1];
      let newItem = this.state.newTicket;

      newItem['Ticket Issues'] = textArea.value;

      this.setState({
        newTicket: newItem,
        modalSlide: 'confirm',
      })
    } else if (targetForm.id === 'Confirm') {
      let newItem = this.state.newTicket;

      //set created date
      let formattedCreatedDate = new Date();
      formattedCreatedDate = (formattedCreatedDate.getMonth()+1) + '/' + formattedCreatedDate.getDate() + '/' + formattedCreatedDate.getFullYear();
      newItem['Created Date'] = formattedCreatedDate;
      newItem['Status'] = 'Ticket Created';

      let finalMonthly = parseInt(monthlyAmount);

      if (this.props.citySet === 'tampa') {
        if (finalMonthly < 750) {
          newItem['Rep'] = 'Lisa';
        } else if (finalMonthly < 1500) {
          newItem['Rep'] = 'Travis';
        } else {
          newItem['Rep'] = 'David';
        }
      }


      this.setState({
        ticketOpen: false,
      });
      setTimeout((function() {
        let finalPush = {"fields": newItem};
        console.log(finalPush);
        axios
        .post(this.state.dataURL + this.state.baseId + '/' + this.state.currentTable, finalPush)
          .then(response => {
            //STAMP CUSTOMER RECORD NOTES
            let customerBase;
            if (this.props.citySet === 'tampa') {
              customerBase = 'apps7GoAgK23yrOoY';
            } else if(this.props.citySet === 'orlando') {
              customerBase = 'appBUKBn552B8SlbE';
            }


            //GET CUSTOMER RECORD
            let finalURL = this.state.dataURL + customerBase + '/Customers/' + this.state.newTicket['Company ID'];
            console.log(finalURL);
            return axios
              .get(finalURL)
              .then(response => {
                let newItemState = response.data.fields;

                //STAMP THE NOTES
                let today  = new Date();
                let dayTime;
                if (today.getHours() > 11) {
                  if (today.getMinutes() < 10) {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 11) + ":0" + today.getMinutes() + " PM";
                  } else {dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 11) + ":" + today.getMinutes() + " PM"; }
                } else {
                  if (today.getMinutes() < 10) {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
                  } else {  dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";  }
                }
                let finalEntry;
                if (this.props.userName !== '') {
                  finalEntry = dayTime + ' - ' + this.props.userName + '\n';
                } else {
                  finalEntry = dayTime + ' - ' + '\n';
                }

                finalEntry += 'TICKET CREATED' + '\n' + this.state.newTicket['Ticket Issues'] + '\n\n' + newItemState['Notes'];
                newItemState['Notes'] = finalEntry;

                //SAVE THE CUSTOMER RECORD
                let finalPush = {"fields": newItemState}
                axios
                .put(this.state.dataURL + customerBase + '/Customers/' + this.state.newTicket['Company ID'], finalPush)
                  .then(response => {
                    this.setState({
                      viewType: 'list',
                      newTicket: null,
                      modalSlide: 'company',
                    });
                    this.loadTicketData();
                  });
              });
          })
        .catch(response => {
          console.error("error: ", response);
        });
      }).bind(this), 5);
    } else {
      this.setState({
        ticketOpen: false,
        openedTicket: ''
      });
    }
  }

  componentWillMount() {
    console.log(this.props.citySet);
    if (this.props.citySet === 'tampa') {
      this.setState({
        loading: false,
        currentTable: 'Tampa',
      });
    } else if(this.props.citySet === 'orlando') {
      this.setState({
        loading: false,
        currentTable: 'Orlando',
      });
    }

    this.loadTicketData();
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, customersData } = this.props;

    if (this.state.loading) {
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
    if (this.state.error) {
      return (
        <p>
          There was an error loading the data.{" "}
          <button onClick={this.loadTicketData}>Try again</button>
        </p>
      );
    }

    if (!this.state.clearedActives) {
      return (
        <div className="SplashView">
          <div className="Navbar SplashBar">
            <Link to={`/`}>
              <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
                <img src={hamburger} alt="databases" />
              </div>
            </Link>
            <h4><span>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} Dashboard</span> <br /> Outstanding Tickets</h4>
          </div>
          <TicketModal
            spRecord={this.state.spRecord}
            ticketRecordData={this.state.ticketRecordData}
            ticketOpen={this.state.ticketOpen}
            ticketData={this.state.ticketData}
            citySet={this.props.citySet}
            openedTicket={this.state.openedTicket}
            closeTicketHandler={this.closeTicketHandler}
            changeTicketHandler={this.changeTicketHandler}
            addPicture={this.addPicture}
            removePicture={this.removePicture}
          />
          <TicketList
            currentTable={this.state.currentTable}
            citySet={this.props.citySet}
            ticketData={this.state.ticketData}
            openTicketHandler={this.openTicketHandler}
            addTicket={this.addTicket}
          />

          <CustomerDashNav
            searchHandler={this.props.searchHandler}
            splashSelect={this.props.splashSelect}
            pathName={this.props.pathname}
            citySet={this.props.citySet}
          />
        </div>
      );
    } else {
      return (
        <div className="SplashView">
          <div className="Navbar SplashBar">
            <Link to={`/`}>
              <div className="navIcon softGrad--primary" onClick={this.revertMemory}>
                <img src={hamburger} alt="databases" />
              </div>
            </Link>
            <h4><span>{this.props.citySet.charAt(0).toUpperCase() + this.props.citySet.slice(1)} Dashboard</span> <br /> Outstanding Tickets</h4>
          </div>
          <AddTicketModal
            viewType={this.state.viewType}
            citySet={this.props.citySet}
            closeAddTicket={this.closeAddTicket}
            newTicketSubmit={this.newTicketSubmit}
            newTicket={this.state.newTicket}
            modalSlide={this.state.modalSlide}
            backAddTicket={this.backAddTicket}
            activeCustomers={this.state.activeCustomers}
            loading={this.state.loading}
          />
          <TicketModal
            spRecord={this.state.spRecord}
            ticketRecordData={this.state.ticketRecordData}
            ticketOpen={this.state.ticketOpen}
            ticketData={this.state.ticketData}
            citySet={this.props.citySet}
            openedTicket={this.state.openedTicket}
            closeTicketHandler={this.closeTicketHandler}
            changeTicketHandler={this.changeTicketHandler}
            addPicture={this.addPicture}
            removePicture={this.removePicture}
          />
          <TicketList
            currentTable={this.state.currentTable}
            citySet={this.props.citySet}
            ticketData={this.state.ticketData}
            openTicketHandler={this.openTicketHandler}
            addTicket={this.addTicket}
          />

          <CustomerDashNav
            searchHandler={this.props.searchHandler}
            splashSelect={this.props.splashSelect}
            pathName={this.props.pathname}
            citySet={this.props.citySet}
          />
        </div>
      );
    }

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

TicketView.propTypes ={
  searchHandler: propTypes.func,
  clearedAttention: propTypes.bool,
  clearedProactive: propTypes.bool,
  proactiveLength: propTypes.number,
  attentionLength: propTypes.number,
}
