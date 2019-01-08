import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import attentionImage from '../../assets/icons/white/attention.png';
import phoneImg from '../../assets/icons/white/phone.png';
import exit from '../../assets/icons/white/exit.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';
import edit from '../../assets/icons/white/edit.png';
import addImage from '../../assets/icons/white/image.png';
import loader from '../../assets/loader.gif';

export default class TicketAddModal extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    console.log(this.props.activeCustomers);
    setTimeout((function() {
      this.setState({
        loading: false,
      })
    }).bind(this), 250);
  }


  // Render
  // ----------------------------------------------------
  render() {
    if (this.props.viewType === 'addTicket') {
      if (this.state.loading) {
        return (
          <div className="modal">
            <div className="LoadModal modalInner">
              <div className="modalTitle">
                <img src={loader} alt="" />
                <h4>Grabbing Active Customers</h4>
              </div>
            </div>
          </div>
        )
      }
      if (this.props.modalSlide === 'company') {
        return (
          <div className="TicketModal AddTicket">
            <div className="inner">

              <div className="navIcon softGrad--primary" onClick={this.props.closeAddTicket}>
                <img src={exit} alt="exit" />
              </div>

              <form onSubmit={this.props.newTicketSubmit} id="CustomerSelect">
                <h3>Which customer is this ticket for?</h3>
                <div
                  className="selectBlock"
                  >
                  <select id="actives">
                    <option value="">Select Customer</option>
                    <option data-id={this.props.activeCustomers[1].id} data-amount={this.props.activeCustomers[1].amount}>{this.props.activeCustomers[1].company}</option>
                    {this.props.activeCustomers ? this.props.activeCustomers.map((e, i) => this.activeCustomerList(e, i)) : ''}
                  </select>
                </div>
                <button type="submit" className="btn softGrad--secondary">Submit</button>
              </form>

            </div>
          </div>
        )
      }

      if (this.props.modalSlide === 'issues') {
        return (
          <div className="TicketModal AddTicket">
            <div className="inner">

              <div className="backArrow" onClick={this.props.backAddTicket}>
                <img src={arrow_back} alt="Go Back" />
              </div>
              <div className="navIcon softGrad--primary" onClick={this.props.closeAddTicket}>
                <img src={exit} alt="exit" />
              </div>

              <form onSubmit={this.props.newTicketSubmit} id="Issues">
                <h3>{`What are the issues with ` + this.props.newTicket['Company Name'] + `?`}</h3>

                <textarea rows='3' placeholder="Type issues from the customer..."></textarea>
                <button type="submit" className="btn softGrad--secondary">Submit</button>
              </form>

            </div>
          </div>
        );
      }

      if (this.props.modalSlide === 'confirm') {
        return (
          <div className="TicketModal AddTicket">
            <div className="inner">

              <div className="backArrow" onClick={this.props.backAddTicket}>
                <img src={arrow_back} alt="Go Back" />
              </div>
              <div className="navIcon softGrad--primary" onClick={this.props.closeAddTicket}>
                <img src={exit} alt="exit" />
              </div>

              <form onSubmit={this.props.newTicketSubmit} id="Confirm">
                <h3>Does everything look correct?</h3>

                <div className="innerConfirm">
                  <p><span className="boldText">{this.props.newTicket['Company Name']}</span> has the following issues: <span className="boldText">{this.props.newTicket['Ticket Issues']}</span> </p>
                </div>
                <button type="submit" className="btn softGrad--secondary">Submit</button>
              </form>

            </div>
          </div>
        );
      }
    } else {
      return '';
    }
  }

  activeCustomerList(activeCustomers, index) {
    console.log(activeCustomers);
    return (
      <option data-id={this.props.activeCustomers[index].id} data-amount={this.props.activeCustomers[index].amount}>{this.props.activeCustomers[index].company}</option>
    )
  }
}
