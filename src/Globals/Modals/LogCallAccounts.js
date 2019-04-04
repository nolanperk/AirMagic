import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class LogCallAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodLuck: '',
    }
  }

  componentDidMount() {
    let goodLuck;
    let randNumb = Math.round(Math.random()*100); //number 1 - 100

    if (randNumb < 16) {
      goodLuck = 'This could be our new favorite customer!';
    } else if (randNumb < 32) {
      goodLuck = 'NEXT!!!';
    } else if (randNumb < 48) {
      goodLuck = "Let's make this the one!";
    } else if (randNumb < 64) {
      goodLuck = 'Just. Keep. Calling!';
    } else if (randNumb < 80) {
      goodLuck = 'Remember to smile :)';
    } else if (randNumb < 100) {
      goodLuck = 'Good Luck, you got this!';
    }
    this.setState({
      goodLuck: goodLuck
    })
  }

  // Render
  // ----------------------------------------------------
  render() {
    let logNotes = ''
    if (this.props.currentRecord['Notes']) {
      logNotes = this.props.currentRecord['Notes'].replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    let recentCalled = new Date(this.props.currentRecord['Recent Call Date']);
    recentCalled = (recentCalled.getMonth()+1) + '/' + recentCalled.getDate() + '/' + recentCalled.getFullYear();


    setTimeout((function() {
      document.getElementById('logNotes').innerHTML = logNotes;
    }).bind(this), 250);

    return (
      <div className="accountData">
        <div className="recordCards">
          <div className="RecordCard">
            <h4>Contact Info</h4><br/>
            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Office Phone{this.props.currentRecord['Extension'] ? ' (ext.' + this.props.currentRecord['Extension'] + ')' : ''}</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Office Phone']}
                  id="phone"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>

            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Cell Phone</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Cell Phone']}
                  id="cell"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>

            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Email</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Email']}
                  id="email"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>
          </div>

          <div className="RecordCard">
            <h4>Contacts</h4><br/>
            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Main</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Main contact']}
                  id="contact"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>
            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Title</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Title']}
                  id="title"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>
            <div className="inputBlock inputBlock--half">
              <h3>
                <span>Alternate</span>
                <input
                  type="text"
                  value={this.props.currentRecord['Alternate Contact']}
                  id="altContact"
                  onChange={this.props.changeRecordHandler}
                />
              </h3>
            </div>
          </div>

          <div className="RecordCard card--Notes">
            <h3><span>Notes</span></h3>
            <p id="logNotes"></p>
          </div>
        </div>
      </div>
    );
  }
}


LogCallAccounts.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  exportRecord: propTypes.func.isRequired,
  submitExport: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  currentTable: propTypes.string.isRequired,
}
