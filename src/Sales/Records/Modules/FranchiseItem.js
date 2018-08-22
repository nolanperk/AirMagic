import React, { Component } from 'react';
import propTypes from 'prop-types';


import veryHappy from '../../../assets/icons/emoji/very-happy.png';
import happy from '../../../assets/icons/emoji/happy.png';
import newCustomer from '../../../assets/icons/emoji/new-customer.png';

export default class FranchiseItem extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, franchiseData } = this.props;
    // let correctEmoji;
    let standClass = 'innerStanding';
    // if (franchiseData['Standing'] === 'Very Happy') {
    //   correctEmoji = veryHappy;
    //   standClass += ' softGrad--secondary';
    // } else if (franchiseData['Standing'] === 'New Customer') {
    //   correctEmoji = newCustomer;
    //   standClass += ' softGrad--blue';
    // } else if (franchiseData['Standing'] === 'Happy') {
    //   correctEmoji = happy;
    //   standClass += ' softGrad--secondary justHappy';
    // }


    return (
      <tr key={this.props.id} id={this.props.id} index={this.props.index} franchiseData={franchiseData}>
        <td className="standing">
          <div className='innerStanding softGrad--blue'>
            <p>{franchiseData['Franchise Level']}</p>
          </div>
        </td>
        <td><p className="bolder">{franchiseData['SP Name']}</p></td>
        <td><a href={'/' + this.props.citySet + '/franchisees/' + this.props.id} target="_blank">View</a></td>
      </tr>
    );
  }
}


FranchiseItem.propTypes ={
  index: propTypes.number,
  franchiseData: propTypes.object,
  id: propTypes.string,
}
