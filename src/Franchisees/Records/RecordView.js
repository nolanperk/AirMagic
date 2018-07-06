import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

import RecordNotes from './RecordNotes';
import ModuleMain from './Modules/ModuleMain';
import ModuleContact from './Modules/ModuleContact';
import ModuleLocation from './Modules/ModuleLocation';
import ModuleSales from './Modules/ModuleSales';
import ModuleHear from './Modules/ModuleHear';

import VolumeOwed from './Modules/VolumeOwed';


export default class RecordView extends Component {

  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;
    this.gridLayout()


    return (
      <div className="RecordView" key={this.props.currentId}>
        <div className="ModuleContainer">
          <div className="ModuleList">
            <ModuleMain
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              spName={this.props.currentRecord['SP Name']}
              status={this.props.currentRecord['Status']}
              level={this.props.currentRecord['Franchise Level']}
              company={this.props.currentRecord['Company Name']}
              ein={this.props.currentRecord['EIN']}
              volumeDate={this.props.currentRecord['Volume Due Date']}
              language={this.props.currentRecord['Languages']}
              calcVolume={this.props.calcVolume}
            />
            <ModuleContact
              changeRecordHandler={this.props.changeRecordHandler}
              home={this.props.currentRecord['Home Phone']}
              cell={this.props.currentRecord['Cellphone']}
              email={this.props.currentRecord['Email']}
              partner={this.props.currentRecord['Partner Name']}
              partnerPhone={this.props.currentRecord['Partner Phone']}
              english={this.props.currentRecord['English Contact']}
              englishPhone={this.props.currentRecord['English Contact Phone']}
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              referral={this.props.currentRecord['Referral']}
              packet={this.props.currentRecord['Packet Sent']}
              standing={this.props.currentRecord['Standing']}
              contDate={this.props.currentRecord['Contact Date']}
              apptDate={this.props.currentRecord['Appt. Date']}
              attended={this.props.currentRecord['Attended']}


              fdd={this.props.currentRecord['FDD Sign Date']}
              sign={this.props.currentRecord['Sign Date']}
              graduation={this.props.currentRecord['Graduation Date']}
              plan={this.props.currentRecord['Plan Type']}
              ar={this.props.currentRecord['Additional Revenue']}
              downPayment={this.props.currentRecord['$ Down']}
            />
            <ModuleLocation
              changeRecordHandler={this.props.changeRecordHandler}
              addr1={this.props.currentRecord['Address']}
              city={this.props.currentRecord['City']}
              zip={this.props.currentRecord['Zip']}
              state={this.props.currentRecord['State']}
              county={this.props.currentRecord['County']}
            />
            <ModuleHear
              changeNotesHandler={this.props.changeNotesHandler}
              changeRecordHandler={this.props.changeRecordHandler}
              source={this.props.currentRecord['Source']}
            />


            <VolumeOwed
              plan={this.props.currentRecord['Plan Type']}
              ar={this.props.currentRecord['Additional Revenue']}
              currentRecord={this.props.currentRecord}
              baseId={this.props.baseId}
            />

          </div>
        </div>

        <RecordNotes
          notes={this.props.currentRecord['Notes']}
          changeNotesHandler={this.props.changeNotesHandler}
          controlsModalToggle={this.props.controlsModalToggle} />
      </div>
    );
  }
  gridLayout() {
    setTimeout(function(){
      var elem = document.querySelector('.ModuleList');
      var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    }, 100);
  }
  gridDestroy() {
    var elem = document.querySelector('.ModuleList');
    var iso = new Isotope( elem, {itemSelector: '.ModuleCard'});
    iso.destroy()
  }
}


RecordView.propTypes ={
  currentId: propTypes.string.isRequired,
  recordChanges: propTypes.number.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  calcVolume: propTypes.func.isRequired,
}
