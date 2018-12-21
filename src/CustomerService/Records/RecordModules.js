import React, { Component } from 'react';
import propTypes from 'prop-types';

import ModuleMain from './Modules/ModuleMain';
import ModuleContact from './Modules/ModuleContact';
import ModuleLocation from './Modules/ModuleLocation';
import ModuleSales from './Modules/ModuleSales';
import ModuleService from './Modules/ModuleService';
import ModuleNumbers from './Modules/ModuleNumbers';
import ModuleSchedule from './Modules/ModuleSchedule';

export default class RecordModules extends Component {
  // Render
  // ----------------------------------------------------
  render() {
    const { index, data } = this.props;

    return (
      <div className="ModuleList">
        <ModuleMain
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          company={this.props.company}
          pam={this.props.pam}
          rep={this.props.rep}
          special={this.props.special}
          status={this.props.status}
          cpop={this.props.cpop}
          supplies={this.props.supplies}
         />
        <ModuleContact
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          salutation={this.props.salutation}
          contact={this.props.contact}
          title={this.props.title}
          altContact={this.props.altContact}
          phone={this.props.phone}
          ext={this.props.ext}
          cell={this.props.cell}
          email={this.props.email}
          source={this.props.source}
         />
        <ModuleService
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          standing={this.props.standing}
          lastCall={this.props.lastCall}
          spName={this.props.spName}
          spPhone={this.props.spPhone}
          lastVisit={this.props.lastVisit}
          newSP={this.props.newSP}
          cancel={this.props.cancel}
          />
        <ModuleLocation
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          addr1={this.props.addr1}
          addr2={this.props.addr2}
          city={this.props.city}
          zip={this.props.zip}
          county={this.props.county}
          emp={this.props.emp}
         />
        <ModuleSales
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          apptSetDate={this.props.apptSetDate}
          apptSetBy={this.props.apptSetBy}
          close={this.props.close}
          proposal={this.props.proposal}
          walkthrough={this.props.walkthrough}
          start={this.props.start}
          preCleanDate={this.props.preCleanDate}
          preCleanCharge={this.props.preCleanCharge}
         />
        <ModuleNumbers
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          amount={this.props.amount}
          sqFt={this.props.sqFt}
          sqFtReal={this.props.sqFtReal}
          restrooms={this.props.restrooms}
          ceramic={this.props.ceramic}
          marble={this.props.marble}
          vct={this.props.vct}
          wood={this.props.wood}
          woodLam={this.props.woodLam}
          carpet={this.props.carpet}
          other={this.props.other}
         />
        <ModuleSchedule
          changeContentHandler={this.props.changeContentHandler}
          changeRecordHandler={this.props.changeRecordHandler}
          hoursPer={this.props.hoursPer}
          sqFtPer={this.props.sqFtPer}
          timesPerWeek={this.props.timesPerWeek}
          weekDays={this.props.weekDays}
         />
      </div>
    );
  }
}

RecordModules.propTypes ={
  mobileHand: propTypes.string.isRequired,
  changeContentHandler: propTypes.func.isRequired,
  changeRecordHandler: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  company: propTypes.string,
  pam: propTypes.string,
  rep: propTypes.string,
  special: propTypes.string,
  status: propTypes.string,
  cpop: propTypes.string,
  supplies: propTypes.string,
  salutation: propTypes.string,
  contact: propTypes.string,
  title: propTypes.string,
  altContact: propTypes.string,
  phone: propTypes.string,
  ext: propTypes.string,
  cell: propTypes.string,
  email: propTypes.string,
  source: propTypes.string,
  standing: propTypes.string,
  lastCall: propTypes.string,
  spName: propTypes.string,
  spPhone: propTypes.string,
  lastVisit: propTypes.string,
  newSP: propTypes.string,
  cancel: propTypes.string,
  addr1: propTypes.string,
  addr2: propTypes.string,
  city: propTypes.string,
  zip: propTypes.string,
  county: propTypes.string,
  emp: propTypes.string,
  apptSetDate: propTypes.string,
  apptSetBy: propTypes.string,
  close: propTypes.string,
  proposal: propTypes.string,
  walkthrough: propTypes.string,
  start: propTypes.string,
  preCleanDate: propTypes.string,
  preCleanCharge: propTypes.string,
  amount: propTypes.string,
  sqFt: propTypes.string,
  sqFtReal: propTypes.string,
  restrooms: propTypes.string,
  ceramic: propTypes.string,
  marble: propTypes.string,
  vct: propTypes.string,
  wood: propTypes.string,
  woodLam: propTypes.string,
  carpet: propTypes.string,
  other: propTypes.string,
  hoursPer: propTypes.string,
  sqFtPer: propTypes.string,
  timesPerWeek: propTypes.string,
  weekDays: propTypes.string,
}
