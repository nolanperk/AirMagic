import React, { Component } from 'react';
import propTypes from 'prop-types';
import Isotope from 'isotope-layout';

import RecordNotes from './RecordNotes';
import ModuleMain from './Modules/ModuleMain';
import ModuleContact from './Modules/ModuleContact';
import ModuleLocation from './Modules/ModuleLocation';
import ModuleSales from './Modules/ModuleSales';
import ModuleHear from './Modules/ModuleHear';
import ModuleAbility from './Modules/ModuleAbility';

import VolumeOwed from './Modules/VolumeOwed';
import VolOwed from './Modules/VolOwed';


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
              spNumber={this.props.currentRecord['Number']}
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
              newRecord={this.props.newRecord}
            />
            <ModuleSales
              changeRecordHandler={this.props.changeRecordHandler}
              changeSelectBlock={this.props.changeSelectBlock}
              referral={this.props.currentRecord['Referral']}
              packet={this.props.currentRecord['Packet Sent']}
              standing={this.props.currentRecord['Standing']}
              contDate={this.props.currentRecord['Contact Date']}
              inactiveDate={this.props.currentRecord['Inactive Date']}
              activeDate={this.props.currentRecord['Active Date']}
              apptTime={this.props.currentRecord['Appt. Time']}
              attended={this.props.currentRecord['Attended']}

              handleDayClick={this.props.handleDayClick}
              toggleDayPicker={this.props.toggleDayPicker}


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

            <ModuleAbility
              area={this.props.currentRecord['Coverage Area']}
              perCapacity={this.props.currentRecord['Account Capacity']}
              monthlyCapacity={this.props.currentRecord['Monthly Capacity']}
              looking={this.props.currentRecord['Looking for More']}
              carpets={this.props.currentRecord['Carpets']}
              sWax={this.props.currentRecord['Strip and Wax']}
              buffing={this.props.currentRecord['Buffing']}
              tiles={this.props.currentRecord['Tile']}
              changeRecordHandler={this.props.changeRecordHandler}
              currentRecord={this.props.currentRecord}
              baseId={this.props.baseId}
            />
            <ModuleHear
              changeNotesHandler={this.props.changeNotesHandler}
              changeRecordHandler={this.props.changeRecordHandler}
              source={this.props.currentRecord['Source']}
            />


            {/* <VolumeOwed
              plan={this.props.currentRecord['Plan Type']}
              ar={this.props.currentRecord['Additional Revenue']}
              sign={this.props.currentRecord['Sign Date']}
              currentRecord={this.props.currentRecord}
              baseId={this.props.baseId}
              spName={this.props.currentRecord['SP Name']}
            /> */}

            <VolOwed
              plan={this.props.currentRecord['Plan Type']}
              ar={this.props.currentRecord['Additional Revenue']}
              sign={this.props.currentRecord['Sign Date']}
              currentRecord={this.props.currentRecord}
              baseId={this.props.baseId}
              spName={this.props.currentRecord['SP Name']}
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
  recordChanges: propTypes.bool.isRequired,
  changeNotesHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.object.isRequired,
  recordChanger: propTypes.func.isRequired,
  changeSelectBlock: propTypes.func.isRequired,
  baseId: propTypes.string.isRequired,
  calcVolume: propTypes.func.isRequired,
}
