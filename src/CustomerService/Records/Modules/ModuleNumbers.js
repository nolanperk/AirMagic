import React, { Component } from 'react';
import propTypes from 'prop-types';


import calendarImg from '../../../assets/icons/black/calendar.png';
import phoneImg from '../../../assets/icons/black/phone.png';

export default class ModuleNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpopValue: this.props.cpop,
      suppliesValue: this.props.supplies,
    }
  }
  cpopChange = e => {this.setState({cpopValue: e.target.value});}
  suppliesChange = e => {this.setState({suppliesValue: e.target.value});}

  componentDidMount() {
    setTimeout((function() {
      this.setState({
        cpopValue: this.props.cpop,
        suppliesValue: this.props.supplies,
      })
    }).bind(this), 50);
  }

  // Render
  // ----------------------------------------------------
  render() {
    let restrooms = this.props.restrooms;
    let ceramic = this.props.ceramic;
    let marble = this.props.marble;
    let vct = this.props.vct;
    let wood = this.props.wood;
    let woodLam = this.props.woodLam;
    let carpet = this.props.carpet;
    let other = this.props.other;

    return (
      <div className="ModuleCard moduleNumbers">
        <div className="inner">


          <div className="inputBlock inputBlock--quart">
            <label>Restrooms</label>
            <input
              type="text"
              value={restrooms}
              id="restrooms"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Ceramic</label>
            <input
              type="text"
              value={ceramic}
              id="ceramic"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Marble</label>
            <input
              type="text"
              value={marble}
              id="marble"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>VCT</label>
            <input
              type="text"
              value={vct}
              id="vct"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Wood</label>
            <input
              type="text"
              value={wood}
              id="wood"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Lam.</label>
            <input
              type="text"
              value={woodLam}
              id="woodLam"
              onChange={this.props.changeRecordHandler}
            />
          </div>

          <div className="inputBlock inputBlock--quart">
            <label>Carpet</label>
            <input
              type="text"
              value={carpet}
              id="carpet"
              onChange={this.props.changeRecordHandler}
            />
          </div>
          <div className="inputBlock inputBlock--quart">
            <label>Other</label>
            <input
              type="text"
              value={other}
              id="other"
              onChange={this.props.changeRecordHandler}
            />
          </div>


          <div className="inputBlock inputBlock--half">
            <label>+ CPOP</label>
            <div
              className="selectBlock"
              id="cpop"
              >
              <select id="cpopSelect"  value={this.props.cpop} onChange={this.props.selectChangeHandler}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>
          <div className="inputBlock inputBlock--half">
            <label>Supplies</label>
            <div
              className="selectBlock"
              id="supplies"
              >
              <select id="suppliesSelect"  value={this.props.supplies} onChange={this.props.selectChangeHandler}>
                <option id="none"></option>
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ModuleNumbers.propTypes ={
  restrooms: propTypes.string,
  ceramic: propTypes.string,
  marble: propTypes.string,
  vct: propTypes.string,
  wood: propTypes.string,
  woodLam: propTypes.string,
  carpet: propTypes.string,
  other: propTypes.string,
  changeRecordHandler: propTypes.func.isRequired,

  cpop: propTypes.string,
  supplies: propTypes.string,
  changeSelectBlock: propTypes.func.isRequired,
}
