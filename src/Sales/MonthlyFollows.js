import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import exit from '../assets/icons/white/exit.png';
import exitBlack from '../assets/icons/black/exit.png';
import done from '../assets/icons/white/done.png';
import popout from '../assets/icons/popout.png';
import loader from '../assets/loader.gif';
import backBtn from '../assets/icons/black/arrow_back.png';

export default class MonthlyFollows extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      currentView: 'intro',
      baseId: '',
      recentClick: '',
      selectedCount: 0,
      emailTemp: 'Good TIME_OF_DAY FIRST_NAME,\n\nI hope you are having a great morning.\nIt has been a while since we last spoke and I am proud to let you know __________________________\n\nLet us know if you need anything with your cleaning because we are happy to help. If you would like we could send an updated quote.\nWe have excellent cleaners in your area and we are very flexible so we are perfectly suited to handle your specific cleaning needs.\n\nThanks and we are here to help,',

      followOffset: '',
      propedList: [],
      skipView: false,
    }
  }
  callBack = () => {
    if (this.state.currentView === 'list') {
      this.setState({currentView: 'intro'});
    } else {
      this.setState({currentView: 'list'});
    }
  }
  nextStep = () => {
    if (this.state.currentView === 'intro') {
      this.setState({currentView: 'list'});
    } else if (this.state.currentView === 'list') {
      let indexList = [];
      let selectedList = document.getElementsByClassName('selected');
      for (var i in selectedList) {
        if (selectedList[i].id) {
          indexList.push(selectedList[i].id.replace('key-',''));
        }
      }
      console.log(indexList);

      let selectedItems = [];
      for (var i in indexList) {
        selectedItems.push(this.state.propedList[indexList[i]]);
      }
      console.log(selectedItems);

      this.setState({
        selectedList: selectedItems,
      })
      setTimeout((function() {
        this.setState({
          currentView: 'final',
        })
      }).bind(this), 50);

    } else if (this.state.currentView === 'final') {
      let today  = new Date();
      let monthNext = new Date(+new Date + 1000*60*60*24*27);

      for (var i in this.state.selectedList) {
        let pushRecord = this.state.selectedList[i].fields;
        pushRecord['Last Contact'] = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        pushRecord['Next Follow Up'] = (monthNext.getMonth()+1) + '/' + monthNext.getDate() + '/' + monthNext.getFullYear();
        if (pushRecord['Follow Ups']) {pushRecord['Follow Ups'] = pushRecord['Follow Ups'] + 1;} else {pushRecord['Follow Ups'] = 1;}

        let dayTime;
        if (today.getHours() > 12) {
          if (today.getMinutes() < 10) {
            dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":0" + today.getMinutes() + " PM";
          } else {
            dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + (today.getHours() - 12) + ":" + today.getMinutes() + " PM";
          }
        } else {
          if (today.getMinutes() < 10) {
            dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":0" + today.getMinutes() + " AM";
          } else {
            dayTime = (today.getMonth()+1) + "/" + today.getDate()  + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + " AM";
          }
        }
        let finalEntry = dayTime + ' - ' + localStorage.getItem('userInitials') + '\n';
        if (pushRecord['Notes']) {
          pushRecord['Notes'] = finalEntry + 'Sent Monthly Followup!\n\n' + pushRecord['Notes'];
        } else {
          pushRecord['Notes'] = finalEntry + 'Sent Monthly Followup!\n\n';
        }

        let jsonString = '{"type":"Monthly","date":"' + (today.getMonth()+1) + '/' + today.getDate()  + '/' + today.getFullYear() + '",';
        //check the planned follow up, then give 3 days of leeway before calling it late
        jsonString += '"timed": "Nailed"}';

        if (pushRecord['Follow Tracking']) {
          pushRecord['Follow Tracking'] = pushRecord['Follow Tracking'] + ', ' + jsonString;
        } else {
          pushRecord['Follow Tracking'] = jsonString;
        }

        let pushRecordId = this.state.selectedList[i].id;
        let finalPush = {"fields": pushRecord}
        console.log(finalPush);

        setTimeout((function() {
          console.log('save it');
          // axios.put('https://api.airtable.com/v0/' + this.state.baseId + '/Sales/' + pushRecordId, finalPush);
        }).bind(this), (25*parseInt(i)));



        if (parseInt(i) === (this.state.selectedList.length - 1)) {
          setTimeout((function() {
            console.log('last!');
            window.location.reload();
          }).bind(this), (75+(25*parseInt(i))));
        }
      }
    }
  }


  markSend = (e) => {
    console.log();
    e.target.closest('.followUpItem').className = 'followUpItem sendingEmails isSent'
  }
  skipFollow = (e) => {
    this.setState({
      skipView: true,
      openedFollow: e,
    })
  }
  backToList = () => {
    this.setState({
      modalView: false,
      skipView: false,
    })
  }

  changeTemp = e => {
    this.setState({
      emailTemp: e.target.value,
    })
  }

  deleteFromList = e => {
    let thisIndex = this.state.selectedList.findIndex(obj => obj.id == e.id);
    this.setState({
      selectedIndex: this.state.selectedList.splice(thisIndex, 1),
    })
  }

  selectItem = (e, shift, i) => {

    if (shift) {
      let newI = parseInt(i.replace('key-',''));

      if (this.state.recentClick) {
        let oldI = parseInt(this.state.recentClick.replace('key-',''));
        if (newI < oldI) { // going down
          let baseI = parseInt(oldI);
          while (newI < baseI) {
            document.getElementById('key-'+baseI).className = 'followUpItem';
            baseI --;
          }
        } else if (newI === oldI) {
          document.getElementById('key-'+newI).className = 'followUpItem';
        } else { // going up
          let baseI = parseInt(oldI);
          while ((newI+1) > baseI) {
            document.getElementById('key-'+baseI).className = 'followUpItem selected';
            baseI ++;
          }
        }

      } else {
        let baseI = 0;
        while ((newI+1) > baseI) {
          document.getElementById('key-'+baseI).className = 'followUpItem selected'
          baseI ++;
        }
      }
    } else {
      if (document.getElementById(i).className === 'followUpItem') {
        document.getElementById(i).className = 'followUpItem selected';
      } else {
        document.getElementById(i).className = 'followUpItem';
      }
    }

    let selectedCount = document.getElementsByClassName('selected').length;

    this.setState({
      recentClick: i,
      selectedCount: selectedCount,
    })
  }

  changeView = e => {
    console.log(e.target);
  };

  loadFollowUps = () => {
    let currRep = localStorage.getItem('userName').split(' ')[0];
    let followURL;
    let monthAgo = new Date(+new Date - 1000*60*60*24*28);
    monthAgo = (monthAgo.getMonth()+1) + '/' + monthAgo.getDate() + '/' + monthAgo.getFullYear();

    let theFormula = '&filterByFormula=';
    theFormula += 'OR(IF({Last Contact} = BLANK(), TRUE()),'
    theFormula += 'IF(IS_BEFORE({Last Contact}, DATETIME_PARSE("' + monthAgo + '")), TRUE()))';
    theFormula = encodeURI(theFormula);

    //first
    let loadMonthly = function() {
      console.log('loadMonthly');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=Monthly+Followups' + theFormula;
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}


      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadMonthly();
        } else {
          console.log('clearing loadMonthly()');

          setTimeout((function() {
            this.setState({
              followOffset: '',
            });

            monthlyRetouch();
          }).bind(this), 50);
        }
      });
    }.bind(this);
    loadMonthly();


    //first
    let monthlyRetouch = function() {
      console.log('monthlyRetouch');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales' + '?view=' + currRep + '+Retouches' + theFormula;
      if (this.state.followOffset !== '') {followURL = followURL + '&offset=' + this.state.followOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            followOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          monthlyRetouch();
        } else {
          console.log('clearing monthlyRetouch()');

          setTimeout((function() {
            this.setState({
              followOffset: '',
            });


            loadFinish();
          }).bind(this), 50);
        }
      });
    }.bind(this);


    let loadFinish = function() {
      this.setState({
        loading: false,
      });
    }.bind(this);

  }

  componentDidMount() {
    if (localStorage.getItem('userOffice') === 'tampa') {
      this.setState({
        baseId: 'appEX8GXgcD2ln4dB',
        localOffice: 'tampa',
      });
    } else if(localStorage.getItem('userOffice') === 'orlando') {
      this.setState({
        baseId: 'appXNufXR9nQARjgs',
        localOffice: 'orlando',
      });
    }
    setTimeout((function() {
      this.loadFollowUps();
    }).bind(this), 50);
  }


  // Render
  // ----------------------------------------------------
  render() {
    const { allFollows, referenceList, suggestedHandoffs } = this.state;

    let followModalWrapper = "FollowUpsModal modalInner";
    if (!this.state.noVisit) {
      followModalWrapper += " noVisitHide";
    }

    if (this.state.loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>Loading Follow Ups</h4>
            </div>
          </div>
        </div>
      )
    } else if (this.state.currentView === 'intro') {
      let wordCount = this.state.emailTemp.trim().split(/\s+/).length;
      return (

        <div className="FranchModalWrapper MonthlyFollowsModal">
          <div className="modalBox">
            <div className="modalNav">
              <div className="titleArea">
                <h4>Set the template you'll be using for emails today.</h4>
                <p>Note: careful changing the capitalized words. They will be auto-updated.</p>
              </div>

              <div className="icons">
                <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                  <img src={exit} alt="exit" />
                </div>
              </div>
            </div>



            <div className="monthlyGrid">
              <p className="wordCount">Word Count: {wordCount}</p>
              <textarea
                id="tempBox"
                value={this.state.emailTemp}
                onChange={this.changeTemp}
              />
              <div class="btn softGrad--black" onClick={this.nextStep}>Ready to send!</div>
            </div>
          </div>
        </div>
      )
    } else if (this.state.currentView === 'list') {
      let totalLine = this.state.propedList.length + ' Total';

      let selectedLine = '';
      if (this.state.selectedCount > 0) {
        selectedLine = ' (' + this.state.selectedCount + ' chosen)';
      }

      return (
        <div className="FranchModalWrapper MonthlyFollowsModal">
          <div className="modalBox">
            <div className="modalNav">
              <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
              <div className="titleArea">
                <h4>Choose Today's Followups</h4>
                <p>{totalLine + selectedLine}</p>
              </div>

              <div className="icons">
                <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                  <img src={exit} alt="exit" />
                </div>
              </div>
            </div>



            <div className="monthlyGrid">
              <div className="listContainer">
                {this.state.propedList.map((e, i) => {
                  const key = `${e.id}-${i}`;
                  const keyProp = `key-${i}`
                  let propDate;
                  let lastDate;

                  let firstNote = e.fields['Notes'].split('\n\n')[0];

                  if (e.fields['Proposal Date']) {
                    propDate = new Date(e.fields['Proposal Date']);
                    propDate = (propDate.getMonth()+1) + '/' + propDate.getDate() + '/' + propDate.getFullYear();
                  }

                  if (e.fields['Last Contact']) {
                    lastDate = new Date(e.fields['Last Contact']);
                    lastDate = (lastDate.getMonth()+1) + '/' + lastDate.getDate() + '/' + lastDate.getFullYear();
                  }
                  return (
                    <li className="followUpItem" id={keyProp} key={key} onClick={(event)=>this.selectItem(e, event.shiftKey, keyProp)}>
                      <div className="splitHalf">
                        <p className="compName">{e.fields['Company Name']} <em className={e.fields['Status']}>({e.fields['Status']})</em></p>
                        <p>Proposal: {propDate}</p>
                        <p className={lastDate ? '' : 'isHidden'}>Last Contact: {lastDate}</p>
                      </div>
                      <div className="notesArea">
                        <p>Recent Note</p>
                        <textarea rows='3' value={firstNote} />
                      </div>
                      <a className="popOut" target="_blank" href={'/' + this.state.localOffice + '/sales/' + e.id}><img src={popout} alt="View Record" /></a>
                    </li>
                  );
                })}
              </div>
              <div class="btn softGrad--black" onClick={this.nextStep}>Ready to send!</div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentView === 'final') {

      return (
        <div className="FranchModalWrapper MonthlyFollowsModal">
          <div className="modalBox">
            <div className="modalNav">
              <img src={backBtn} alt="back" className="backBtn" onClick={() => { this.callBack() }} />
              <div className="titleArea">
                <h4>Let's Send the Followups</h4>
                <p>{this.state.selected}</p>
              </div>

              <div className="icons">
                <div className="navIcon softGrad--black" onClick={this.props.closeModal}>
                  <img src={exit} alt="exit" />
                </div>
              </div>
            </div>



            <div className="monthlyGrid">
              <div className="listContainer sendingEmails">
                {this.state.selectedList.map((e, i) => {
                  const key = `${e.id}-${i}`;


                  let timeOfDay = 'morning'; let today = new Date(); let halfTime = today.getHours();
                  if (halfTime > 11) {
                    timeOfDay = 'afternoon';
                  }

                  let theFields = e.fields;
                  let emailLink = 'mailto:' + theFields['Email'] + '';
                  let contactFirst;
                  if (theFields['Main contact'].indexOf(' ') < 0) {
                    contactFirst = theFields['Main contact'];
                  } else {
                    contactFirst = theFields['Main contact'].split(' ')[0];
                  }
                  emailLink += "?subject=" + localStorage.getItem('userName').split(' ')[0] + "%20From%20Vanguard%20Cleaning%20Systems";
                  emailLink += "&body=" + encodeURI(this.state.emailTemp.replace('FIRST_NAME', contactFirst).replace('TIME_OF_DAY', timeOfDay));

                  return (
                    <li className="followUpItem sendingEmails" key={key}>
                      <div className="splitHalf">
                        <p className="compName">{e.fields['Company Name']}</p>
                        <a class="btn softGrad--black" onClick={this.markSend} href={emailLink}>Send Email</a>
                      </div>
                      <img src={exitBlack} alt="exit" className="deleteBtn" onClick={() => { this.deleteFromList(e) }} />
                      <a className="popOut" target="_blank" href={'/' + this.state.localOffice + '/sales/' + e.id}><img src={popout} alt="View Record" /></a>
                    </li>
                  );
                })}
              </div>
              <div class="btn softGrad--black" onClick={this.nextStep}>Finish!</div>
            </div>
          </div>
        </div>
      );
    }
  }
}
