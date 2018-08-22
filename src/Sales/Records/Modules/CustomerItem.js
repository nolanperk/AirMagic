import React, { Component } from 'react';
import propTypes from 'prop-types';


import veryHappy from '../../../assets/icons/emoji/very-happy.png';
import happy from '../../../assets/icons/emoji/happy.png';
import newCustomer from '../../../assets/icons/emoji/new-customer.png';

export default class CustomerItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, customersData } = this.props;
    let correctEmoji;
    let standClass = 'innerStanding';
    if (customersData['Standing'] === 'Very Happy') {
      correctEmoji = veryHappy;
      standClass += ' softGrad--secondary';
    } else if (customersData['Standing'] === 'New Customer') {
      correctEmoji = newCustomer;
      standClass += ' softGrad--blue';
    } else if (customersData['Standing'] === 'Happy') {
      correctEmoji = happy;
      standClass += ' softGrad--secondary justHappy';
    }


    return (
      <tr key={this.props.id} id={this.props.id} index={this.props.index} customersData={customersData}>
        <td className="standing">
          <div className={standClass}>
            <img src={correctEmoji} />
            <p>${customersData['Monthly Amount']}</p>
          </div>
        </td>
        <td><p className="bolder">{customersData['Company Name']}</p></td>
        <td>{customersData['Actual Sq Footage']}sqft</td>
        <td><a href={'/' + this.props.citySet + '/customer-service/' + this.props.id} target="_blank">View</a></td>
      </tr>
    );
  }
}


CustomerItem.propTypes ={
  index: propTypes.number,
  customersData: propTypes.object,
  id: propTypes.string,
}
