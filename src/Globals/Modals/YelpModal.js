import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import exit from '../../assets/icons/white/exit.png';
import arrow_back from '../../assets/icons/black/arrow_back.png';
import loader from '../../assets/loader.gif';

export default class YelpModal extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      view: 'findCustomer',
      yelpListOffset: '',
      starts: [],
      old: [],
      all: [],
      searchTerm: '',
      searchedAll: [],
      loadingText: 'Loading Long-Term Customers'
    }
  }

  goingBack = () => {
    if (this.state.view === 'customerList') {
      this.setState({
        view: 'selectCat'
      })
    } else if (this.state.view === 'selectCat') {
      this.setState({
        view: 'findCustomer'
      })
    }
  }

  yelpSelect = e => {
    let location;
    if (e.fields['Zip']) {
      location = e.fields['Zip'];
    } else {
      location = e.fields['City'];
    }

    this.setState({
      view: 'selectCat',
      location: location,
      selectedCompany: e.fields,
    })
  }

  yelpIt = e => {
    console.log('yelpIt()!');
    e.preventDefault()
    window.open(
      'https://www.yelp.com/search?find_desc=' + window.document.getElementById('yelpList').value + '&find_loc=' + this.state.location + '&ns=1',
      'newwindow',
      'width=1100,height=650'
    );

    this.setState({
      view: 'customerList'
    })
  }

  // yelpLink = e => {
  //
  //
  //
  //   //open tickets in new tab
  //   var fakeYelpA = document.createElement('a');
  //   fakeYelpA.setAttribute('href', yelpLink);
  //   fakeYelpA.setAttribute('onClick', );
  //   fakeYelpA.style.display = 'none';
  //   document.body.appendChild(fakeYelpA);
  //   fakeYelpA.click();
  //   document.body.removeChild(fakeYelpA);
  // }

  runSearch = e => {
    let searchTerm = e.target.value;
    console.log(e.target.value);
    this.setState({
      searchTerm : searchTerm,
    })

    setTimeout((function() {
      if (this.state.searchTerm) {
        this.state.all.map((e, i) => this.yelpItemStarts(e, i));

        let searchedData = this.state.all.filter(e => e.fields['Company Name'].toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        this.setState({
          searchedAll: searchedData,
        })
      } else {
        this.setState({
          searchedAll: [],
        })
      }
    }).bind(this), 0);

  }


  loadAllCustomers = () => {
    console.log('hi');
    let loadFinish = function() {
      console.log(this.state.starts);

      let oldData = [];

      for (var i in this.state.old) {
        let amount = parseInt(this.state.old[i].fields['Monthly Amount']);
        if (amount > 349) {
          oldData.push(this.state.old[i]);
        }
      }
      this.setState({
        old: oldData,
        loading: false,
      })
      console.log(oldData);
    }.bind(this);

    let customerBase
    if (this.props.citySet === 'tampa') {
      customerBase = 'apps7GoAgK23yrOoY';
    } else if(this.props.citySet === 'orlando') {
      customerBase = 'appBUKBn552B8SlbE';
    }

    let loadYelpOld = function() {
      console.log('loadYelpOld');
      let customerRecords = this.state.old;

      let customersURL = 'https://api.airtable.com/v0/' + customerBase + '/' + 'Customers' + '?view=Yelp+Old&fields%5B%5D=Monthly+Amount&fields%5B%5D=Company+Name&fields%5B%5D=Zip&fields%5B%5D=City&fields%5B%5D=Start+Date&fields%5B%5D=Standing';
      if (this.state.yelpListOffset !== '') {customersURL = customersURL + '&offset=' + this.state.yelpListOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            old: customerRecords.concat(response.data.records),
            error: false,
            yelpListOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadYelpOld();
        } else {
          console.log('clearing loadYelpOld()');
          this.setState({
            loadingText: 'Loading Recent Starts',
            yelpListOffset: '',
          });
          loadYelpStarts();
        }
      });
    }.bind(this);
    loadYelpOld(); //run on load


    let loadYelpStarts = function() {
      console.log('loadYelpStarts');
      let customerRecords = this.state.starts;

      let customersURL = 'https://api.airtable.com/v0/' + customerBase + '/' + 'Customers' + '?view=Yelp+Starts&fields%5B%5D=Monthly+Amount&fields%5B%5D=Company+Name&fields%5B%5D=Zip&fields%5B%5D=City&fields%5B%5D=Start+Date&fields%5B%5D=Standing';
      if (this.state.yelpListOffset !== '') {customersURL = customersURL + '&offset=' + this.state.yelpListOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            starts: customerRecords.concat(response.data.records),
            error: false,
            yelpListOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadYelpStarts();
        } else {
          console.log('clearing loadYelpStarts()');
          this.setState({
            loadingText: 'Loading All Customers',
            yelpListOffset: '',
          });
          loadCustomerList();
        }
      });
    }.bind(this);

    let loadCustomerList = function() {
      console.log('loadCustomerList');
      let customerRecords = this.state.all;

      let customersURL = 'https://api.airtable.com/v0/' + customerBase + '/' + 'Customers' + '?view=All+Actives&fields%5B%5D=Company+Name&fields%5B%5D=Office+Phone&fields%5B%5D=Cell+Phone';
      if (this.state.yelpListOffset !== '') {customersURL = customersURL + '&offset=' + this.state.yelpListOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            all: customerRecords.concat(response.data.records),
            error: false,
            yelpListOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadCustomerList();
        } else {
          console.log('clearing loadCustomerList()');
          this.setState({
            yelpListOffset: '',
          });
          loadFinish();
        }
      });
    }.bind(this);
  }

  componentDidMount() {
    this.loadAllCustomers();
  }

  // Render
  // ----------------------------------------------------
  render() {
    if (this.state.loading) {
      return (
        <div className="modal">
          <div className="LoadModal modalInner">
            <div className="modalTitle">
              <img src={loader} alt="" />
              <h4>{this.state.loadingText}</h4>
            </div>
          </div>
        </div>
      )
    } else if (this.state.view === 'findCustomer') {
      return (
        <div className="FollowUpsModal modalInner">
          <div className="modalTitle">
            <h4>Yelp Lists!</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <h4>Select a Customer</h4>
          <div className="repList">
            <p>Recent Starts</p>
            {this.state.starts.length > 0 ? this.state.starts.map((e, i) => this.yelpItemStarts(e, i)): ''}
            {this.state.starts.length > 0 ? <br /> : ''}
            <hr />

            <p>Customers over 4 years!</p>
            {this.state.old.length > 0 ? this.state.old.map((e, i) => this.yelpItemOld(e, i)): ''}
            {this.state.old.length > 0 ? <br /> : ''}
          </div>
        </div>
      );
    } else if (this.state.view === 'selectCat') {
      return (
        <div className="FollowUpsModal modalInner">
          <div className="modalTitle">
            <div className="backArrow" onClick={this.goingBack}>
              <img src={arrow_back} alt="Go Back" />
            </div>
            <h4>Yelp Lists!</h4>
            <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
              <img src={exit} alt="exit" />
            </div>
          </div>

          <p>Select the category for {this.state.selectedCompany['Company Name']}</p>
          <form onSubmit={this.yelpIt}>
            <div id="sortTable" className="yelpBox">
              <div className="selectBox">
                <select id="yelpList">
                <option disabled>----------------</option>
                  <option disabled>---Active Life---</option>
                  <option disabled>----------------</option>
                  <option value="active">Active Life</option>
                  <option value="aquariums">Aquariums</option>
                  <option value="boating">Boating</option>
                  <option value="challengecourses">Challenge Courses</option>
                  <option value="cyclingclasses">Cycling Classes</option>
                  <option value="daycamps">Day Camps</option>
                  <option value="escapegames">Escape Games</option>
                  <option value="golf">Golf</option>
                  <option value="gun_ranges">Gun/Rifle Ranges</option>
                  <option value="indoor_playcenter">Indoor Playcentre</option>
                  <option value="lasertag">Laser Tag</option>
                  <option value="mini_golf">Mini Golf</option>
                  <option value="racingexperience">Racing Experience</option>
                  <option value="recreation">Recreation Centers</option>
                  <option value="scavengerhunts">Scavenger Hunts</option>
                  <option value="seniorcenters">Senior Centers</option>
                  <option value="skatingrinks">Skating Rinks</option>
                  <option value="skydiving">Skydiving</option>
                  <option value="tennis">Tennis</option>
                  <option value="zoos">Zoos</option>
                  <option disabled>----------------</option>
                  <option disabled>---Arts & Entertainment--
                  <option disabled>----------------</option>-</option>
                  <option value="arts">Arts & Entertainment</option>
                  <option value="arcades">Arcades</option>
                  <option value="galleries">Art Galleries</option>
                  <option value="bingo">Bingo Halls</option>
                  <option value="gardens">Botanical Gardens</option>
                  <option value="movietheaters">Cinema</option>
                  <option value="countryclubs">Country Clubs</option>
                  <option value="culturalcenter">Cultural Center</option>
                  <option value="museums">Museums</option>
                  <option value="opera">Opera & Ballet</option>
                  <option value="theater">Performing Arts</option>
                  <option value="planetarium">Planetarium</option>
                  <option value="racetracks">Race Tracks</option>
                  <option value="rodeo">Rodeo</option>
                  <option value="psychic_astrology">Supernatural Readings</option>
                  <option value="wineries">Wineries</option>
                  <option disabled>----------------</option>
                  <option disabled>---Automotive---</option>
                  <option disabled>----------------</option>
                  <option value="auto">Automotive</option>
                  <option value="aircraftdealers">Aircraft Dealers</option>
                  <option value="aircraftrepairs">Aircraft Repairs</option>
                  <option value="autoloanproviders">Auto Loan Providers</option>
                  <option value="aviationservices">Aviation Services</option>
                  <option value="boatdealers">Boat Dealers</option>
                  <option value="bodyshops">Body Shops</option>
                  <option value="carauctions">Car Auctions</option>
                  <option value="carbrokers">Car Brokers</option>
                  <option value="car_dealers">Car Dealers</option>
                  <option value="truckdealers">Commercial Truck Dealers</option>
                  <option value="truckrepair">Commercial Truck Repair</option>
                  <option value="evchargingstations">EV Charging Stations</option>
                  <option value="golfcartdealers">Golf Cart Dealers</option>
                  <option value="interlocksystems">Interlock Systems</option>
                  <option value="marinas">Marinas</option>
                  <option value="mobiledentrepair">Mobile Dent Repair</option>
                  <option value="mobilityequipment">Mobility Equipment Sales & Services</option>
                  <option value="motorcycledealers">Motorcycle Dealers</option>
                  <option value="motodealers">Motorsport Vehicle Dealers</option>
                  <option value="rv_dealers">RV Dealers</option>
                  <option value="rvrepair">RV Repair</option>
                  <option value="registrationservices">Registration Services</option>
                  <option value="towing">Towing</option>
                  <option value="trailerdealers">Trailer Dealers</option>
                  <option value="trailerrental">Trailer Rental</option>
                  <option value="truck_rental">Truck Rental</option>
                  <option value="usedcardealers">Used Car Dealers</option>
                  <option disabled>----------------</option>
                  <option disabled>---Beauty & Spas---</option>
                  <option disabled>----------------</option>
                  <option value="beautysvc">Beauty & Spas</option>
                  <option value="acnetreatment">Acne Treatment</option>
                  <option value="hairloss">Hair Loss Centers</option>
                  <option value="hairremoval">Hair Removal</option>
                  <option value="massage">Massage</option>
                  <option value="medicalspa">Medical Spas</option>
                  <option value="skincare">Skin Care</option>
                  <option value="tanning">Tanning</option>
                  <option value="tattoo">Tattoo</option>
                  <option value="teethwhitening">Teeth Whitening</option>
                  <option disabled>----------------</option>
                  <option disabled>---Education---</option>
                  <option disabled>----------------</option>
                  <option value="education">Education</option>
                  <option value="adultedu">Adult Education</option>
                  <option value="artclasses">Art Classes</option>
                  <option value="collegecounseling">College Counseling</option>
                  <option value="collegeuniv">Colleges & Universities</option>
                  <option value="educationservices">Educational Services</option>
                  <option value="elementaryschools">Elementary Schools</option>
                  <option value="highschools">Middle Schools & High Schools</option>
                  <option value="montessori">Montessori Schools</option>
                  <option value="preschools">Preschools</option>
                  <option value="privateschools">Private Schools</option>
                  <option value="privatetutors">Private Tutors</option>
                  <option value="religiousschools">Religious Schools</option>
                  <option value="specialed">Special Education</option>
                  <option value="testprep">Test Preparation</option>
                  <option value="tutoring">Tutoring Centers</option>
                  <option value="waldorfschools">Waldorf Schools</option>
                  <option disabled>----------------</option>
                  <option disabled>---Financial Services---</option>
                  <option disabled>----------------</option>
                  <option value="financialservices">Financial Services</option>
                  <option value="banks">Banks & Credit Unions</option>
                  <option value="businessfinancing">Business Financing</option>
                  <option value="paydayloans">Check Cashing/Pay-day Loans</option>
                  <option value="currencyexchange">Currency Exchange</option>
                  <option value="debtrelief">Debt Relief Services</option>
                  <option value="financialadvising">Financial Advising</option>
                  <option value="installmentloans">Installment Loans</option>
                  <option value="insurance">Insurance</option>
                  <option value="investing">Investing</option>
                  <option value="mortgagelenders">Mortgage Lenders</option>
                  <option value="taxservices">Tax Services</option>
                  <option value="titleloans">Title Loans</option>
                  <option disabled>----------------</option>
                  <option disabled>---Health & Medical---</option>
                  <option disabled>----------------</option>
                  <option value="health">Health & Medical</option>
                  <option value="acupuncture">Acupuncture</option>
                  <option value="alternativemedicine">Alternative Medicine</option>
                  <option value="animalassistedtherapy">Animal Assisted Therapy</option>
                  <option value="assistedliving">Assisted Living Facilities</option>
                  <option value="behavioranalysts">Behavior Analysts</option>
                  <option value="blooddonation">Blood & Plasma Donation Centers</option>
                  <option value="bodycontouring">Body Contouring</option>
                  <option value="cannabis_clinics">Cannabis Clinics</option>
                  <option value="cannabiscollective">Cannabis Collective</option>
                  <option value="chiropractors">Chiropractors</option>
                  <option value="colonics">Colonics</option>
                  <option value="conciergemedicine">Concierge Medicine</option>
                  <option value="c_and_mh">Counseling & Mental Health</option>
                  <option value="cryotherapy">Cryotherapy</option>
                  <option value="dentalhygienists">Dental Hygienists</option>
                  <option value="dentists">Dentists</option>
                  <option value="diagnosticservices">Diagnostic Services</option>
                  <option value="dialysisclinics">Dialysis Clinics</option>
                  <option value="dietitians">Dietitians</option>
                  <option value="physicians">Doctors</option>
                  <option value="halfwayhouses">Halfway Houses</option>
                  <option value="halotherapy">Halotherapy</option>
                  <option value="healthinsurance">Health Insurance Offices</option>
                  <option value="hearingaidproviders">Hearing Aid Providers</option>
                  <option value="herbalshops">Herbal Shops</option>
                  <option value="homehealthcare">Home Health Care</option>
                  <option value="hospice">Hospice</option>
                  <option value="hospitals">Hospitals</option>
                  <option value="hydrotherapy">Hydrotherapy</option>
                  <option value="hypnosis">Hypnosis/Hypnotherapy</option>
                  <option value="ivhydration">IV Hydration</option>
                  <option value="lactationservices">Lactation Services</option>
                  <option value="laserlasikeyes">Laser Eye Surgery/Lasik</option>
                  <option value="liceservices">Lice Services</option>
                  <option value="massage_therapy">Massage Therapy</option>
                  <option value="cannabisreferrals">Medical Cannabis Referrals</option>
                  <option value="medcenters">Medical Centers</option>
                  <option value="medicalspa">Medical Spas</option>
                  <option value="memorycare">Memory Care</option>
                  <option value="nutritionists">Nutritionists</option>
                  <option value="organdonorservices">Organ & Tissue Donor Services</option>
                  <option value="orthotics">Orthotics</option>
                  <option value="oxygenbars">Oxygen Bars</option>
                  <option value="personalcare">Personal Care Services</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="physicaltherapy">Physical Therapy</option>
                  <option value="prenatal">Prenatal/Perinatal Care</option>
                  <option value="prosthetics">Prosthetics</option>
                  <option value="reflexology">Reflexology</option>
                  <option value="rehabilitation_center">Rehabilitation Center</option>
                  <option value="reiki">Reiki</option>
                  <option value="retirement_homes">Retirement Homes</option>
                  <option value="skillednursing">Skilled Nursing</option>
                  <option value="sleepspecialists">Sleep Specialists</option>
                  <option value="speech_therapists">Speech Therapists</option>
                  <option value="spermclinic">Sperm Clinic</option>
                  <option value="tcm">Traditional Chinese Medicine</option>
                  <option value="ultrasoundimagingcenters">Ultrasound Imaging Centers</option>
                  <option value="urgent_care">Urgent Care</option>
                  <option value="weightlosscenters">Weight Loss Centers</option>
                  <option disabled>----------------</option>
                  <option disabled>---Home Services---</option>
                  <option disabled>----------------</option>
                  <option value="homeservices">Home Services</option>
                  <option value="artificialturf">Artificial Turf</option>
                  <option value="buildingsupplies">Building Supplies</option>
                  <option value="cabinetry">Cabinetry</option>
                  <option value="carpenters">Carpenters</option>
                  <option value="carpetinstallation">Carpet Installation</option>
                  <option value="carpeting">Carpeting</option>
                  <option value="childproofing">Childproofing</option>
                  <option value="chimneysweeps">Chimney Sweeps</option>
                  <option value="contractors">Contractors</option>
                  <option value="countertopinstall">Countertop Installation</option>
                  <option value="damagerestoration">Damage Restoration</option>
                  <option value="decksrailing">Decks & Railing</option>
                  <option value="demolitionservices">Demolition Services</option>
                  <option value="doorsales">Door Sales/Installation</option>
                  <option value="drywall">Drywall Installation & Repair</option>
                  <option value="electricians">Electricians</option>
                  <option value="excavationservices">Excavation Services</option>
                  <option value="fencesgates">Fences & Gates</option>
                  <option value="fireprotection">Fire Protection Services</option>
                  <option value="fireplace">Fireplace Services</option>
                  <option value="firewood">Firewood</option>
                  <option value="flooring">Flooring</option>
                  <option value="foundationrepair">Foundation Repair</option>
                  <option value="furnitureassembly">Furniture Assembly</option>
                  <option value="garage_door_services">Garage Door Services</option>
                  <option value="gardeners">Gardeners</option>
                  <option value="glassandmirrors">Glass & Mirrors</option>
                  <option value="groutservices">Grout Services</option>
                  <option value="gutterservices">Gutter Services</option>
                  <option value="hvac">Heating & Air Conditioning/HVAC</option>
                  <option value="homeautomation">Home Automation</option>
                  <option value="homeenergyauditors">Home Energy Auditors</option>
                  <option value="home_inspectors">Home Inspectors</option>
                  <option value="homenetworkinstall">Home Network Installation</option>
                  <option value="home_organization">Home Organization</option>
                  <option value="hometheatreinstallation">Home Theatre Installation</option>
                  <option value="insulationinstallation">Insulation Installation</option>
                  <option value="interiordesign">Interior Design</option>
                  <option value="isps">Internet Service Providers</option>
                  <option value="locksmiths">Keys & Locksmiths</option>
                  <option value="landscapearchitects">Landscape Architects</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="lighting">Lighting Fixtures & Equipment</option>
                  <option value="masonry_concrete">Masonry/Concrete</option>
                  <option value="mobile_home_repair">Mobile Home Repair</option>
                  <option value="movers">Movers</option>
                  <option value="packingservices">Packing Services</option>
                  <option value="patiocoverings">Patio Coverings</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="poolservice">Pool & Hot Tub Service</option>
                  <option value="poolcleaners">Pool Cleaners</option>
                  <option value="pressurewashers">Pressure Washers</option>
                  <option value="realestate">Real Estate</option>
                  <option value="structuralengineers">Structural Engineers</option>
                  <option value="tiling">Tiling</option>
                  <option value="treeservices">Tree Services</option>
                  <option value="utilities">Utilities</option>
                  <option disabled>----------------</option>
                  <option disabled>---Hotels & Travel---</option>
                  <option disabled>----------------</option>
                  <option value="hotelstravel">Hotels & Travel</option>
                  <option value="bedbreakfast">Bed & Breakfast</option>
                  <option value="campgrounds">Campgrounds</option>
                  <option value="carrental">Car Rental</option>
                  <option value="guesthouses">Guest Houses</option>
                  <option value="healthretreats">Health Retreats</option>
                  <option value="rvparks">RV Parks</option>
                  <option value="rvrental">RV Rental</option>
                  <option value="trainstations">Train Stations</option>
                  <option value="busstations">Bus Stations</option>
                  <option disabled>----------------</option>
                  <option disabled>---Local Services---</option>
                  <option disabled>----------------</option>
                  <option value="localservices">Local Services</option>
                  <option value="3dprinting">3D Printing</option>
                  <option value="adoptionservices">Adoption Services</option>
                  <option value="homeappliancerepair">Appliances & Repair</option>
                  <option value="appraisalservices">Appraisal Services</option>
                  <option value="artrestoration">Art Restoration</option>
                  <option value="bailbondsmen">Bail Bondsmen</option>
                  <option value="bookbinding">Bookbinding</option>
                  <option value="carpetdyeing">Carpet Dyeing</option>
                  <option value="childcare">Child Care & Day Care</option>
                  <option value="clockrepair">Clock Repair</option>
                  <option value="communitybookbox">Community Book Box</option>
                  <option value="communitygardens">Community Gardens</option>
                  <option value="nonprofit">Community Service/Non-Profit</option>
                  <option value="couriers">Couriers & Delivery Services</option>
                  <option value="craneservices">Crane Services</option>
                  <option value="donationcenter">Donation Center</option>
                  <option value="eldercareplanning">Elder Care Planning</option>
                  <option value="electronicsrepair">Electronics Repair</option>
                  <option value="engraving">Engraving</option>
                  <option value="enviroabatement">Environmental Abatement</option>
                  <option value="environmentaltesting">Environmental Testing</option>
                  <option value="farmequipmentrepair">Farm Equipment Repair</option>
                  <option value="fingerprintin">Fingerprinting</option>
                  <option value="rentfurniture">Furniture Rental</option>
                  <option value="furniturerepair">Furniture Repair</option>
                  <option value="reupholstery">Furniture Reupholstery</option>
                  <option value="generatorinstallrepair">Generator Installation/Repair</option>
                  <option value="gunsmith">Gunsmith</option>
                  <option value="hazardouswastedisposal">Hazardous Waste Disposal</option>
                  <option value="hydrojetting">Hydro-jetting</option>
                  <option value="itservices">IT Services & Computer Repair</option>
                  <option value="jewelryrepair">Jewelry Repair</option>
                  <option value="junkremovalandhauling">Junk Removal & Hauling</option>
                  <option value="junkyards">Junkyards</option>
                  <option value="knifesharpening">Knife Sharpening</option>
                  <option value="machinerental">Machine & Tool Rental</option>
                  <option value="machineshops">Machine Shops</option>
                  <option value="mailboxcenters">Mailbox Centers</option>
                  <option value="metaldetectorservices">Metal Detector Services</option>
                  <option value="metalfabricators">Metal Fabricators</option>
                  <option value="mistingsystemservices">Misting System Services</option>
                  <option value="musicinstrumentservices">Musical Instrument Services</option>
                  <option value="nannys">Nanny Services</option>
                  <option value="notaries">Notaries</option>
                  <option value="pest_control">Pest Control</option>
                  <option value="powdercoating">Powder Coating</option>
                  <option value="copyshops">Printing Services</option>
                  <option value="propane">Propane</option>
                  <option value="recording_studios">Recording & Rehearsal Studios</option>
                  <option value="recyclingcenter">Recycling Center</option>
                  <option value="sandblasting">Sandblasting</option>
                  <option value="screenprinting">Screen Printing</option>
                  <option value="screen_printing_tshirt_printing">Screen Printing/T-Shirt Printing</option>
                  <option value="selfstorage">Self Storage</option>
                  <option value="septicservices">Septic Services</option>
                  <option value="sewingalterations">Sewing & Alterations</option>
                  <option value="shipping_centers">Shipping Centers</option>
                  <option value="shoerepair">Shoe Repair</option>
                  <option value="shoeshine">Shoe Shine</option>
                  <option value="snowremoval">Snow Removal</option>
                  <option value="snuggleservices">Snuggle Services</option>
                  <option value="tvmounting">TV Mounting</option>
                  <option value="watch_repair">Watch Repair</option>
                  <option value="waterdelivery">Water Delivery</option>
                  <option value="welldrilling">Well Drilling</option>
                  <option value="wildlifecontrol">Wildlife Control</option>
                  <option disabled>----------------</option>
                  <option disabled>---Mass Media---</option>
                  <option disabled>----------------</option>
                  <option value="massmedia">Mass Media</option>
                  <option value="printmedia">Print Media</option>
                  <option value="radiostations">Radio Stations</option>
                  <option value="televisionstations">Television Stations</option>
                  <option value="beergardens">Beer Gardens</option>
                  <option value="comedyclubs">Comedy Clubs</option>
                  <option value="jazzandblues">Jazz & Blues</option>
                  <option value="musicvenues">Music Venues</option>
                  <option value="poolhalls">Pool Halls</option>
                  <option disabled>----------------</option>
                  <option disabled>---Animals---</option>
                  <option disabled>----------------</option>
                  <option value="animalshelters">Animal Shelters</option>
                  <option value="horse_boarding">Horse Boarding</option>
                  <option value="petadoption">Pet Adoption</option>
                  <option value="petservices">Pet Services</option>
                  <option value="animalphysicaltherapy">Animal Physical Therapy</option>
                  <option value="aquariumservices">Aquarium Services</option>
                  <option value="dogwalkers">Dog Walkers</option>
                  <option value="emergencypethospital">Emergency Pet Hospital</option>
                  <option value="farriers">Farriers</option>
                  <option value="animalholistic">Holistic Animal Care</option>
                  <option value="petbreeders">Pet Breeders</option>
                  <option value="petcremation">Pet Cremation Services</option>
                  <option value="groomer">Pet Groomers</option>
                  <option value="pethospice">Pet Hospice</option>
                  <option value="petinsurance">Pet Insurance</option>
                  <option value="petphotography">Pet Photography</option>
                  <option value="petboarding">Pet Boarding</option>
                  <option value="pet_training">Pet Training</option>
                  <option value="pettransport">Pet Transportation</option>
                  <option value="petwasteremoval">Pet Waste Removal</option>
                  <option value="vet">Veterinarians</option>
                  <option disabled>----------------</option>
                  <option disabled>---Professional Services-
                  <option disabled>----------------</option>--</option>
                  <option value="professional">Professional Services</option>
                  <option value="accountants">Accountants</option>
                  <option value="advertising">Advertising</option>
                  <option value="architects">Architects</option>
                  <option value="billingservices">Billing Services</option>
                  <option value="boatrepair">Boat Repair</option>
                  <option value="bookkeepers">Bookkeepers</option>
                  <option value="businessconsulting">Business Consulting</option>
                  <option value="careercounseling">Career Counseling</option>
                  <option value="commissionedartists">Commissioned Artists</option>
                  <option value="customsbrokers">Customs Brokers</option>
                  <option value="digitizingservices">Digitizing Services</option>
                  <option value="duplicationservices">Duplication Services</option>
                  <option value="editorialservices">Editorial Services</option>
                  <option value="employmentagencies">Employment Agencies</option>
                  <option value="fengshui">Feng Shui</option>
                  <option value="graphicdesign">Graphic Design</option>
                  <option value="indoorlandscaping">Indoor Landscaping</option>
                  <option value="isps">Internet Service Providers</option>
                  <option disabled>----------------</option>
                  <option disabled>---Lawyers---</option>
                  <option disabled>----------------</option>
                  <option value="lawyers">Lawyers</option>
                  <option value="bankruptcy">Bankruptcy Law</option>
                  <option value="businesslawyers">Business Law</option>
                  <option value="contractlaw">Contract Law</option>
                  <option value="criminaldefense">Criminal Defense Law</option>
                  <option value="duilawyers">DUI Law</option>
                  <option value="disabilitylaw">Disability Law</option>
                  <option value="divorce">Divorce & Family Law</option>
                  <option value="employmentlawyers">Employment Law</option>
                  <option value="entertainmentlaw">Entertainment Law</option>
                  <option value="estateplanning">Estate Planning Law</option>
                  <option value="general_litigation">General Litigation</option>
                  <option value="iplaw">IP & Internet Law</option>
                  <option value="immigrationlawyers">Immigration Law</option>
                  <option value="medicallaw">Medical Law</option>
                  <option value="personal_injury">Personal Injury Law</option>
                  <option value="realestatelawyers">Real Estate Law</option>
                  <option value="socialsecuritylaw">Social Security Law</option>
                  <option value="taxlaw">Tax Law</option>
                  <option value="trafficticketinglaw">Traffic Ticketing Law</option>
                  <option value="workerscomplaw">Workers Compensation Law</option>
                  <option value="legalservices">Legal Services</option>
                  <option value="lifecoach">Life Coach</option>
                  <option value="marketing">Marketing</option>
                  <option value="matchmakers">Matchmakers</option>
                  <option value="mediators">Mediators</option>
                  <option value="musicproduction">Music Production Services</option>
                  <option value="patentlaw">Patent Law</option>
                  <option value="payroll">Payroll Services</option>
                  <option value="personalassistants">Personal Assistants</option>
                  <option value="privateinvestigation">Private Investigation</option>
                  <option value="productdesign">Product Design</option>
                  <option value="publicadjusters">Public Adjusters</option>
                  <option value="publicrelations">Public Relations</option>
                  <option value="security">Security Services</option>
                  <option value="shredding">Shredding Services</option>
                  <option value="signmaking">Signmaking</option>
                  <option value="softwaredevelopment">Software Development</option>
                  <option value="talentagencies">Talent Agencies</option>
                  <option value="taxidermy">Taxidermy</option>
                  <option value="tenantlaw">Tenant and Eviction Law</option>
                  <option value="translationservices">Translation Services</option>
                  <option value="videofilmproductions">Video/Film Production</option>
                  <option value="web_design">Web Design</option>
                  <option value="wholesalers">Wholesalers</option>
                  <option disabled>----------------</option>
                  <option disabled>---Public Services & Gove
                  <option disabled>----------------</option>rnment---</option>
                  <option value="publicservicesgovt">Public Services & Government</option>
                  <option value="civiccenter">Civic Center</option>
                  <option value="communitycenters">Community Centers</option>
                  <option value="courthouses">Courthouses</option>
                  <option value="departmentsofmotorvehicles">Departments of Motor Vehicles</option>
                  <option value="embassy">Embassy</option>
                  <option value="firedepartments">Fire Departments</option>
                  <option value="jailsandprisons">Jails & Prisons</option>
                  <option value="landmarks">Landmarks & Historical Buildings</option>
                  <option value="libraries">Libraries</option>
                  <option value="municipality">Municipality</option>
                  <option value="policedepartments">Police Departments</option>
                  <option value="postoffices">Post Offices</option>
                  <option value="townhall">Town Hall</option>
                  <option disabled>----------------</option>
                  <option disabled>---Real Estate---</option>
                  <option disabled>----------------</option>
                  <option value="realestate">Real Estate</option>
                  <option value="apartments">Apartments</option>
                  <option value="artspacerentals">Art Space Rentals</option>
                  <option value="commercialrealestate">Commercial Real Estate</option>
                  <option value="condominiums">Condominiums</option>
                  <option value="estateliquidation">Estate Liquidation</option>
                  <option value="homedevelopers">Home Developers</option>
                  <option value="homestaging">Home Staging</option>
                  <option value="homeownerassociation">Homeowner Association</option>
                  <option value="housingcooperatives">Housing Cooperatives</option>
                  <option value="kitchenincubators">Kitchen Incubators</option>
                  <option value="mobilehomes">Mobile Home Dealers</option>
                  <option value="mobileparks">Mobile Home Parks</option>
                  <option value="mortgagebrokers">Mortgage Brokers</option>
                  <option value="propertymgmt">Property Management</option>
                  <option value="realestateagents">Real Estate Agents</option>
                  <option value="realestatesvcs">Real Estate Services</option>
                  <option value="sharedofficespaces">Shared Office Spaces</option>
                  <option value="university_housing">University Housing</option>
                  <option disabled>----------------</option>
                  <option disabled>---Religious Organization
                  <option disabled>----------------</option>s---</option>
                  <option value="religiousorgs">Religious Organizations</option>
                  <option value="buddhist_temples">Buddhist Temples</option>
                  <option value="churches">Churches</option>
                  <option value="hindu_temples">Hindu Temples</option>
                  <option value="mosques">Mosques</option>
                  <option value="sikhtemples">Sikh Temples</option>
                  <option value="synagogues">Synagogues</option>
                </select>
              </div>
              <a href={encodeURI('https://www.google.com/search?q=' + this.state.selectedCompany['Company Name'] + ' ' + this.state.selectedCompany['City'])} target="_blank">Google Company</a>
            </div>



            <button type="submit" className='btn softGrad--primary'>Open Yelp!</button>
          </form>
        </div>
      )
    } else {
      return (<div className="FollowUpsModal modalInner AllActives">
        <div className="modalTitle">
          <div className="backArrow" onClick={this.goingBack}>
            <img src={arrow_back} alt="Go Back" />
          </div>
          <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
            <img src={exit} alt="exit" />
          </div>


          <h4>All Active Customers Reference</h4>

          <input placeholder="search for companies..." onChange={this.runSearch} />
          <div className="repList">
            {this.state.searchedAll.length > 0 ? this.state.searchedAll.map((e, i) => this.yelpItemAll(e, i)): ''}
            {this.state.searchedAll.length > 0 ? <br /> : ''}
            {this.state.searchedAll.length > 0 ? <hr /> : ''}

            {this.state.all.length > 0 ? this.state.all.map((e, i) => this.yelpItemAll(e, i)): ''}
            {this.state.all.length > 0 ? <br /> : ''}
          </div>

        </div>
      </div>
      );
    }
  }
  yelpItemStarts(followUps, i) {
    let startDate = new Date(followUps.fields['Start Date']);
    startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));
    let finalDate = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();

    return (
      <div className="followUpItem" onClick={()=>this.yelpSelect(followUps)}>
        <p>{'Started - ' + finalDate}</p>
        <h2><em>${parseInt(followUps.fields['Monthly Amount'])} </em>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
  yelpItemOld(followUps, i) {
    let startDate = new Date(followUps.fields['Start Date']);
    startDate = new Date(startDate.getTime() + Math.abs(startDate.getTimezoneOffset()*60000));
    let finalDate = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();

    return (
      <div className="followUpItem" onClick={()=>this.yelpSelect(followUps)}>
        <p>{'Started - ' + finalDate}</p>
        <h2><em>${parseInt(followUps.fields['Monthly Amount'])} </em>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
  yelpItemAll(followUps, i) {
    return (
      <div className="followUpItem allList">
        <p>{followUps.fields['Office Phone'] ? followUps.fields['Office Phone'] : followUps.fields['Cell Phone']}</p>
        <h2>{followUps.fields['Company Name']}</h2>
      </div>
    );
  }
}




YelpModal.propTypes = {
  sortSubmitHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentTable: propTypes.string.isRequired,
}
