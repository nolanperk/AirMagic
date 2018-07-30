import React, { Component } from 'react';
import propTypes from 'prop-types';

let rpRevenue;
export default class VolumeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeValue: this.props.volumeData['Type'],
      percValue: this.props.volumeData['Rep. %'],
      filledRev: this.props.volumeData['RP Revenue']
    }
  }
  typeChange = e => {
    this.setState({typeValue: e.target.value});
    this.props.typeChangeHandler(e.target.value, this.props.index);
  }
  percChange = e => {
    // if (this.state.volumeData[index].fields['RP Revenue'] !== rpNumber) {
    //   rpNumber = this.state.volumeData[index].fields['RP Revenue'];
    // }
    if (this.props.volumeData['Amount'] !== undefined) {
      rpRevenue = (parseInt(e.target.value.replace('%', '')) / 100) * this.props.volumeData['Amount'];
    } else {
      rpRevenue = 0;
    }
      this.setState({
        percValue: e.target.value,
        filledRev: rpRevenue
      });
      this.props.rpSumCalc(e.target.value, this.props.index)
      this.props.percRPChange(this.props.index, this.props.volumeData);
  }

  componentDidMount () {
    if (this.props.volumeData['Rep. %'] !== undefined) {
      rpRevenue = (parseInt(this.props.volumeData['Rep. %'].replace('%', '')) / 100) * this.props.volumeData['Amount'];
      this.setState({
        filledRev: rpRevenue
      });
    }
  }

  // Render
  // ----------------------------------------------------
  render() {
    const { index, volumeData } = this.props;
    let currentVolumeData = this.props.volumeData;


    // let finalDate = new Date(this.props.volumeData['Start Date']);
    // finalDate = (finalDate.getMonth() + 1) + '/' + finalDate.getDate() + '/' + finalDate.getFullYear();

    return (
      <tr className="tableRow" onClick={()=>this.props.editingAccountHandler(volumeData[this.props.index], this.props.id, this.props.index)} key={this.props.id} index={this.props.index} volumeData={volumeData}>
        <td>
          <input
            className="tableCol"
            onChange={this.props.changeAccountHandler}
            data-index={this.props.index}
            value={this.props.volumeData['Account Name']}
            id="account"
          />
        </td>
        <td className="selectBlock">
          <select id="typeSelect" value={this.state.typeValue} onChange={this.typeChange}>
            <option value="none"></option>
            <option value="IP">IP</option>
            <option value="AR">AR</option>
            <option value="AA">AA</option>
            <option value="RP">RP</option>
            {/* <option value="IPAR">IP/AR</option> */}
            {/* <option value="ARAA">AR/AA</option> */}
          </select>
        </td>
        <td className="selectBlock">
          <select id="percSelect" value={this.state.percValue} onChange={this.percChange}>
            <option value="none"></option>
            <option value="0%">0%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </td>
        <td>
          <input
            className="tableCol"
            onChange={this.props.changeAccountHandler}
            data-index={this.props.index}
            value={this.props.volumeData['Amount']}
            id="amount"
          />
        </td>
        <td>
          <input
            className="tableCol"
            onChange={this.props.changeAccountHandler}
            data-index={this.props.index}
            value={this.props.volumeData['RP Revenue']}
            id="rpRev"
          />
        </td>
        <td>
          <input
            className="tableCol"
            onClick={()=>this.props.toggleDayPicker('start', volumeData[this.props.index], this.props.index)}
            data-index={this.props.index}
            value={this.props.volumeData['Start Date']}
            id="start"
          />
        </td>
        <td>
          <input
            className="tableCol"
            onClick={()=>this.props.toggleDayPicker('stop', volumeData[this.props.index], this.props.index)}
            data-index={this.props.index}
            value={this.props.volumeData['Stop Date']}
            id="stop"
          />
        </td>
        <td className="deleteIt" id={this.props.id} onClick={this.props.deleteAccountItem}>x</td>
      </tr>
    );
  }
}


VolumeItem.propTypes ={
  editingAccountHandler: propTypes.func.isRequired,
  percRPChange: propTypes.func.isRequired,
  deleteAccountItem: propTypes.func.isRequired,
  openRecordHandler: propTypes.func.isRequired,
  changeAccountHandler: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  rpSumCalc: propTypes.func.isRequired,
  toggleDayPicker: propTypes.func.isRequired,
  typeChangeHandler: propTypes.func.isRequired,
  volumeData: propTypes.object.isRequired,
  id: propTypes.string.isRequired,
}
