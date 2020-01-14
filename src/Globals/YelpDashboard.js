import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import YelpAPI from '../yelp'
import ApiConfig from '../config'

import YelpItem from './YelpItem';

import { Link } from 'react-router-dom';

import hamburger from '../assets/icons/white/hamburger.png';
import exit from '../assets/icons/white/exit.png';
import mapLink from '../assets/icons/black/location.png';
import popout from '../assets/icons/popout.png';

export default class YelpDashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      selectedKeyword: '',
      keywordFilter: 'select',
      locationFilter: 'select',
      selectedZip: '',
      searchLocation: 'tampa',
      yelpRegion: 'tampa',
      keywords: [
        {title:"Airsoft", slug:"airsoft"},
        {title:"Amateur Sports Teams", slug:"amateursportsteams"},
        {title:"Amusement Parks", slug:"amusementparks"},
        {title:"Aquariums", slug:"aquariums"},
        {title:"Archery", slug:"archery"},
        {title:"Axe Throwing", slug:"axethrowing"},
        {title:"Badminton", slug:"badminton"},
        {title:"Baseball Fields", slug:"baseballfields"},
        {title:"Basketball Courts", slug:"basketballcourts"},
        {title:"Batting Cages", slug:"battingcages"},
        {title:"Boating", slug:"boating"},
        {title:"Bocce Ball", slug:"bocceball"},
        {title:"Bowling", slug:"bowling"},
        {title:"Bubble Soccer", slug:"bubblesoccer"},
        {title:"Carousels", slug:"carousels"},
        {title:"Challenge Courses", slug:"challengecourses"},
        {title:"Cycling Classes", slug:"cyclingclasses"},
        {title:"Dart Arenas", slug:"dartarenas"},
        {title:"Day Camps", slug:"daycamps"},
        {title:"Disc Golf", slug:"discgolf"},
        {title:"Scuba Diving", slug:"scuba"},
        {title:"Escape Games", slug:"escapegames"},
        {title:"Fishing", slug:"fishing"},
        {title:"Fitness & Instruction", slug:"fitness"},
        {title:"Aerial Fitness", slug:"aerialfitness"},
        {title:"Barre Classes", slug:"barreclasses"},
        {title:"Boot Camps", slug:"bootcamps"},
        {title:"Boxing", slug:"boxing"},
        {title:"Cardio Classes", slug:"cardioclasses"},
        {title:"Dance Studios", slug:"dancestudio"},
        {title:"EMS Training", slug:"emstraining"},
        {title:"Golf Lessons", slug:"golflessons"},
        {title:"Gyms", slug:"gyms"},
        {title:"Martial Arts", slug:"martialarts"},
        {title:"Brazilian Jiu-jitsu", slug:"brazilianjiujitsu"},
        {title:"Chinese Martial Arts", slug:"chinesemartialarts"},
        {title:"Karate", slug:"karate"},
        {title:"Kickboxing", slug:"kickboxing"},
        {title:"Muay Thai", slug:"muaythai"},
        {title:"Taekwondo", slug:"taekwondo"},
        {title:"Meditation Centers", slug:"meditationcenters"},
        {title:"Pilates", slug:"pilates"},
        {title:"Self-defense Classes", slug:"selfdefenseclasses"},
        {title:"Swimming Lessons/Schools", slug:"swimminglessons"},
        {title:"Tai Chi", slug:"taichi"},
        {title:"Trainers", slug:"healthtrainers"},
        {title:"Yoga", slug:"yoga"},
        {title:"Gliding", slug:"gliding"},
        {title:"Go Karts", slug:"gokarts"},
        {title:"Golf", slug:"golf"},
        {title:"Gun/Rifle Ranges", slug:"gun_ranges"},
        {title:"Gymnastics", slug:"gymnastics"},
        {title:"Handball", slug:"handball"},
        {title:"Hiking", slug:"hiking"},
        {title:"Horse Racing", slug:"horseracing"},
        {title:"Horseback Riding", slug:"horsebackriding"},
        {title:"Hot Air Balloons", slug:"hot_air_balloons"},
        {title:"Indoor Playcentre", slug:"indoor_playcenter"},
        {title:"Jet Skis", slug:"jetskis"},
        {title:"Kids Activities", slug:"kids_activities"},
        {title:"Kiteboarding", slug:"kiteboarding"},
        {title:"Lawn Bowling", slug:"lawn_bowling"},
        {title:"Mini Golf", slug:"mini_golf"},
        {title:"Paintball", slug:"paintball"},
        {title:"Skate Parks", slug:"skate_parks"},
        {title:"Pickleball", slug:"pickleball"},
        {title:"Playgrounds", slug:"playgrounds"},
        {title:"Recreation Centers", slug:"recreation"},
        {title:"Senior Centers", slug:"seniorcenters"},
        {title:"Skating Rinks", slug:"skatingrinks"},
        {title:"Skydiving", slug:"skydiving"},
        {title:"Summer Camps", slug:"summer_camps"},
        {title:"Trampoline Parks", slug:"trampoline"},
        {title:"Water Parks", slug:"waterparks"},
        {title:"Wildlife Hunting Ranges", slug:"wildlifehunting"},
        {title:"Ziplining", slug:"zipline"},
        {title:"Zoos", slug:"zoos"},
        {title:"Petting Zoos", slug:"pettingzoos"},
        {title:"Arts & Entertainment", slug:"arts"},
        {title:"Arcades", slug:"arcades"},
        {title:"Art Galleries", slug:"galleries"},
        {title:"Betting Centers", slug:"bettingcenters"},
        {title:"Bingo Halls", slug:"bingo"},
        {title:"Botanical Gardens", slug:"gardens"},
        {title:"Casinos", slug:"casinos"},
        {title:"Cinema", slug:"movietheaters"},
        {title:"Drive-In Theater", slug:"driveintheater"},
        {title:"Outdoor Movies", slug:"outdoormovies"},
        {title:"Country Clubs", slug:"countryclubs"},
        {title:"Cultural Center", slug:"culturalcenter"},
        {title:"Farms", slug:"farms"},
        {title:"Attraction Farms", slug:"attractionfarms"},
        {title:"Pick Your Own Farms", slug:"pickyourown"},
        {title:"Ranches", slug:"ranches"},
        {title:"Trade Fairs", slug:"tradefairs"},
        {title:"Makerspaces", slug:"makerspaces"},
        {title:"Museums", slug:"museums"},
        {title:"Art Museums", slug:"artmuseums"},
        {title:"Children's Museums", slug:"childrensmuseums"},
        {title:"Music Venues", slug:"musicvenues"},
        {title:"Observatories", slug:"observatories"},
        {title:"Opera & Ballet", slug:"opera"},
        {title:"Paint & Sip", slug:"paintandsip"},
        {title:"Performing Arts", slug:"theater"},
        {title:"Planetarium", slug:"planetarium"},
        {title:"Professional Sports Teams", slug:"sportsteams"},
        {title:"Race Tracks", slug:"racetracks"},
        {title:"Rodeo", slug:"rodeo"},
        {title:"Social Clubs", slug:"social_clubs"},
        {title:"Veterans Organizations", slug:"veteransorganizations"},
        {title:"Sports Betting", slug:"sportsbetting"},
        {title:"Stadiums & Arenas", slug:"stadiumsarenas"},
        {title:"Studio Taping", slug:"studiotaping"},
        {title:"Supernatural Readings", slug:"psychic_astrology"},
        {title:"Astrologers", slug:"astrologers"},
        {title:"Mystics", slug:"mystics"},
        {title:"Psychic Mediums", slug:"psychicmediums"},
        {title:"Psychics", slug:"psychics"},
        {title:"Ticket Sales", slug:"ticketsales"},
        {title:"Wineries", slug:"wineries"},
        {title:"Wine Tasting Room", slug:"winetastingroom"},
        {title:"Automotive", slug:"auto"},
        {title:"Aircraft Dealers", slug:"aircraftdealers"},
        {title:"Aircraft Repairs", slug:"aircraftrepairs"},
        {title:"Boat Dealers", slug:"boatdealers"},
        {title:"Boat Parts & Supplies", slug:"boatpartsandsupplies"},
        {title:"Car Auctions", slug:"carauctions"},
        {title:"Car Brokers", slug:"carbrokers"},
        {title:"Car Buyers", slug:"carbuyers"},
        {title:"Car Dealers", slug:"car_dealers"},
        {title:"Car Wash", slug:"carwash"},
        {title:"Commercial Truck Dealers", slug:"truckdealers"},
        {title:"Commercial Truck Repair", slug:"truckrepair"},
        {title:"EV Charging Stations", slug:"evchargingstations"},
        {title:"Fuel Docks", slug:"fueldocks"},
        {title:"Golf Cart Dealers", slug:"golfcartdealers"},
        {title:"Marinas", slug:"marinas"},
        {title:"Mobility Equipment Sales & Services", slug:"mobilityequipment"},
        {title:"Motorcycle Dealers", slug:"motorcycledealers"},
        {title:"Motorcycle Repair", slug:"motorcyclerepair"},
        {title:"Motorsport Vehicle Dealers", slug:"motodealers"},
        {title:"Motorsport Vehicle Repairs", slug:"motorepairs"},
        {title:"Oil Change Stations", slug:"oilchange"},
        {title:"RV Dealers", slug:"rv_dealers"},
        {title:"Service Stations", slug:"service_stations"},
        {title:"Towing", slug:"towing"},
        {title:"Trailer Dealers", slug:"trailerdealers"},
        {title:"Trailer Rental", slug:"trailerrental"},
        {title:"Truck Rental", slug:"truck_rental"},
        {title:"Used Car Dealers", slug:"usedcardealers"},
        {title:"Vehicle Shipping", slug:"vehicleshipping"},
        {title:"Vehicle Wraps", slug:"vehiclewraps"},
        {title:"Tattoo", slug:"tattoo"},
        {title:"Teeth Whitening", slug:"teethwhitening"},
        {title:"Bicycles", slug:"bicycles"},
        {title:"Education", slug:"education"},
        {title:"Art Classes", slug:"artclasses"},
        {title:"Glass Blowing", slug:"glassblowing"},
        {title:"Colleges & Universities", slug:"collegeuniv"},
        {title:"Elementary Schools", slug:"elementaryschools"},
        {title:"Middle Schools & High Schools", slug:"highschools"},
        {title:"Montessori Schools", slug:"montessori"},
        {title:"Preschools", slug:"preschools"},
        {title:"Private Schools", slug:"privateschools"},
        {title:"Private Tutors", slug:"privatetutors"},
        {title:"Religious Schools", slug:"religiousschools"},
        {title:"Specialty Schools", slug:"specialtyschools"},
        {title:"Art Schools", slug:"artschools"},
        {title:"Bartending Schools", slug:"bartendingschools"},
        {title:"Cheerleading", slug:"cheerleading"},
        {title:"Circus Schools", slug:"circusschools"},
        {title:"Cooking Schools", slug:"cookingschools"},
        {title:"Cosmetology Schools", slug:"cosmetology_schools"},
        {title:"Dance Schools", slug:"dance_schools"},
        {title:"Drama Schools", slug:"dramaschools"},
        {title:"Driving Schools", slug:"driving_schools"},
        {title:"Firearm Training", slug:"firearmtraining"},
        {title:"First Aid Classes", slug:"firstaidclasses"},
        {title:"Flight Instruction", slug:"flightinstruction"},
        {title:"Food Safety Training", slug:"foodsafety"},
        {title:"Language Schools", slug:"language_schools"},
        {title:"Massage Schools", slug:"massage_schools"},
        {title:"Nursing Schools", slug:"nursingschools"},
        {title:"Parenting Classes", slug:"parentingclasses"},
        {title:"Photography Classes", slug:"photoclasses"},
        {title:"Samba Schools", slug:"sambaschools"},
        {title:"Speech Training", slug:"speechtraining"},
        {title:"Surf Schools", slug:"surfschools"},
        {title:"Swimming Lessons/Schools", slug:"swimminglessons"},
        {title:"Traffic Schools", slug:"trafficschools"},
        {title:"Vocational & Technical School", slug:"vocation"},
        {title:"Tasting Classes", slug:"tastingclasses"},
        {title:"Cheese Tasting Classes", slug:"cheesetastingclasses"},
        {title:"Wine Tasting Classes", slug:"winetasteclasses"},
        {title:"Waldorf Schools", slug:"waldorfschools"},
        {title:"Event Planning & Services", slug:"eventservices"},
        {title:"Cards & Stationery", slug:"stationery"},
        {title:"Caterers", slug:"catering"},
        {title:"Game Truck Rental", slug:"gametruckrental"},
        {title:"Golf Cart Rentals", slug:"golfcartrentals"},
        {title:"Hotels", slug:"hotels"},
        {title:"Agriturismi", slug:"agriturismi"},
        {title:"Party & Event Planning", slug:"eventplanning"},
        {title:"Party Supplies", slug:"partysupplies"},
        {title:"Photographers", slug:"photographers"},
        {title:"Boudoir Photography", slug:"boudoirphotography"},
        {title:"Event Photography", slug:"eventphotography"},
        {title:"Session Photography", slug:"sessionphotography"},
        {title:"Team Building Activities", slug:"teambuilding"},
        {title:"Videographers", slug:"videographers"},
        {title:"Wedding Chapels", slug:"weddingchappels"},
        {title:"Wedding Planning", slug:"wedding_planning"},
        {title:"Financial Services", slug:"financialservices"},
        {title:"Banks & Credit Unions", slug:"banks"},
        {title:"Financial Advising", slug:"financialadvising"},
        {title:"Insurance", slug:"insurance"},
        {title:"Auto Insurance", slug:"autoinsurance"},
        {title:"Home & Rental Insurance", slug:"homeinsurance"},
        {title:"Life Insurance", slug:"lifeinsurance"},
        {title:"Investing", slug:"investing"},
        {title:"Mortgage Lenders", slug:"mortgagelenders"},
        {title:"Tax Services", slug:"taxservices"},
        {title:"Title Loans", slug:"titleloans"},
        {title:"Breweries", slug:"breweries"},
        {title:"Brewpubs", slug:"brewpubs"},
        {title:"Coffee & Tea", slug:"coffee"},
        {title:"Coffee & Tea Supplies", slug:"coffeeteasupplies"},
        {title:"Coffee Roasteries", slug:"coffeeroasteries"},
        {title:"Ethical Grocery", slug:"ethicgrocery"},
        {title:"Grocery", slug:"grocery"},
        {title:"Honey", slug:"honey"},
        {title:"Ice Cream & Frozen Yogurt", slug:"icecream"},
        {title:"Imported Food", slug:"importedfood"},
        {title:"International Grocery", slug:"intlgrocery"},
        {title:"Internet Cafes", slug:"internetcafe"},
        {title:"Japanese Sweets", slug:"jpsweets"},
        {title:"Candy Stores", slug:"candy"},
        {title:"Cheese Shops", slug:"cheese"},
        {title:"Chocolatiers & Shops", slug:"chocolate"},
        {title:"Macarons", slug:"macarons"},
        {title:"Wineries", slug:"wineries"},
        {title:"Wine Tasting Room", slug:"winetastingroom"},
        {title:"Zapiekanka", slug:"zapiekanka"},

        {title:"Health & Medical", slug:"health"},
        {title:"Acupuncture", slug:"acupuncture"},
        {title:"Alternative Medicine", slug:"alternativemedicine"},
        {title:"Assisted Living Facilities", slug:"assistedliving"},
        {title:"Blood & Plasma Donation Centers", slug:"blooddonation"},
        {title:"Cannabis Clinics", slug:"cannabis_clinics"},
        {title:"Chiropractors", slug:"chiropractors"},
        {title:"Colonics", slug:"colonics"},
        {title:"Counseling & Mental Health", slug:"c_and_mh"},
        {title:"Psychologists", slug:"psychologists"},
        {title:"Psychotherapists", slug:"psychotherapists"},
        {title:"Sophrologists", slug:"sophrologists"},
        {title:"Sports Psychologists", slug:"sportspsychologists"},
        {title:"Cryotherapy", slug:"cryotherapy"},
        {title:"Dental Hygienists", slug:"dentalhygienists"},
        {title:"Mobile Clinics", slug:"dentalhygienistsmobile"},
        {title:"Storefront Clinics", slug:"dentalhygeiniststorefront"},
        {title:"Dentists", slug:"dentists"},
        {title:"Cosmetic Dentists", slug:"cosmeticdentists"},
        {title:"Endodontists", slug:"endodontists"},
        {title:"General Dentistry", slug:"generaldentistry"},
        {title:"Oral Surgeons", slug:"oralsurgeons"},
        {title:"Orthodontists", slug:"orthodontists"},
        {title:"Pediatric Dentists", slug:"pediatric_dentists"},
        {title:"Periodontists", slug:"periodontists"},
        {title:"Diagnostic Services", slug:"diagnosticservices"},
        {title:"Diagnostic Imaging", slug:"diagnosticimaging"},
        {title:"Laboratory Testing", slug:"laboratorytesting"},
        {title:"Dialysis Clinics", slug:"dialysisclinics"},
        {title:"Dietitians", slug:"dietitians"},
        {title:"Doctors", slug:"physicians"},
        {title:"Addiction Medicine", slug:"addictionmedicine"},
        {title:"Allergists", slug:"allergist"},
        {title:"Anesthesiologists", slug:"anesthesiologists"},
        {title:"Audiologist", slug:"audiologist"},
        {title:"Cardiologists", slug:"cardiology"},
        {title:"Cosmetic Surgeons", slug:"cosmeticsurgeons"},
        {title:"Dermatologists", slug:"dermatology"},
        {title:"Ear Nose & Throat", slug:"earnosethroat"},
        {title:"Emergency Medicine", slug:"emergencymedicine"},
        {title:"Endocrinologists", slug:"endocrinologists"},
        {title:"Family Practice", slug:"familydr"},
        {title:"Fertility", slug:"fertility"},
        {title:"Gastroenterologist", slug:"gastroenterologist"},
        {title:"Geneticists", slug:"geneticists"},
        {title:"Gerontologists", slug:"gerontologist"},
        {title:"Hepatologists", slug:"hepatologists"},
        {title:"Homeopathic", slug:"homeopathic"},
        {title:"Hospitalists", slug:"hospitalists"},
        {title:"Immunodermatologists", slug:"immunodermatologists"},
        {title:"Infectious Disease Specialists", slug:"infectiousdisease"},
        {title:"Internal Medicine", slug:"internalmed"},
        {title:"Naturopathic/Holistic", slug:"naturopathic"},
        {title:"Nephrologists", slug:"nephrologists"},
        {title:"Neurologist", slug:"neurologist"},
        {title:"Neuropathologists", slug:"neuropathologists"},
        {title:"Neurotologists", slug:"neurotologists"},
        {title:"Obstetricians & Gynecologists", slug:"obgyn"},
        {title:"Oncologist", slug:"oncologist"},
        {title:"Ophthalmologists", slug:"opthamalogists"},
        {title:"Retina Specialists", slug:"retinaspecialists"},
        {title:"Orthopedists", slug:"orthopedists"},
        {title:"Osteopathic Physicians", slug:"osteopathicphysicians"},
        {title:"Otologists", slug:"otologists"},
        {title:"Pain Management", slug:"painmanagement"},
        {title:"Pathologists", slug:"pathologists"},
        {title:"Pediatricians", slug:"pediatricians"},
        {title:"Phlebologists", slug:"phlebologists"},
        {title:"Plastic Surgeons", slug:"plasticsurgeons"},
        {title:"Podiatrists", slug:"podiatrists"},
        {title:"Preventive Medicine", slug:"preventivemedicine"},
        {title:"Proctologists", slug:"proctologist"},
        {title:"Psychiatrists", slug:"psychiatrists"},
        {title:"Pulmonologist", slug:"pulmonologist"},
        {title:"Radiologists", slug:"radiologists"},
        {title:"Rheumatologists", slug:"rhematologists"},
        {title:"Sports Medicine", slug:"sportsmed"},
        {title:"Tattoo Removal", slug:"tattooremoval"},
        {title:"Toxicologists", slug:"toxicologists"},
        {title:"Tropical Medicine", slug:"tropicalmedicine"},
        {title:"Undersea/Hyperbaric Medicine", slug:"underseamedicine"},
        {title:"Urologists", slug:"urologists"},
        {title:"Vascular Medicine", slug:"vascularmedicine"},
        {title:"Doulas", slug:"doulas"},
        {title:"Habilitative Services", slug:"habilitativeservices"},
        {title:"Halfway Houses", slug:"halfwayhouses"},
        {title:"Halotherapy", slug:"halotherapy"},
        {title:"Health Coach", slug:"healthcoach"},
        {title:"Health Insurance Offices", slug:"healthinsurance"},
        {title:"Hearing Aid Providers", slug:"hearingaidproviders"},
        {title:"Hearing Aids", slug:"hearing_aids"},
        {title:"Herbal Shops", slug:"herbalshops"},
        {title:"Home Health Care", slug:"homehealthcare"},
        {title:"Hospice", slug:"hospice"},
        {title:"Hospitals", slug:"hospitals"},
        {title:"Hydrotherapy", slug:"hydrotherapy"},
        {title:"Hypnosis/Hypnotherapy", slug:"hypnosis"},
        {title:"IV Hydration", slug:"ivhydration"},
        {title:"Lactation Services", slug:"lactationservices"},
        {title:"Laser Eye Surgery/Lasik", slug:"laserlasikeyes"},
        {title:"Lice Services", slug:"liceservices"},
        {title:"Massage Therapy", slug:"massage_therapy"},
        {title:"Medical Cannabis Referrals", slug:"cannabisreferrals"},
        {title:"Medical Centers", slug:"medcenters"},
        {title:"Bulk Billing", slug:"bulkbilling"},
        {title:"Osteopaths", slug:"osteopaths"},
        {title:"Walk-in Clinics", slug:"walkinclinics"},
        {title:"Medical Foot Care", slug:"medicalfoot"},
        {title:"Medical Spas", slug:"medicalspa"},
        {title:"Aestheticians", slug:"aestheticians"},
        {title:"Medical Transportation", slug:"medicaltransportation"},
        {title:"Memory Care", slug:"memorycare"},
        {title:"Nurse Practitioner", slug:"nursepractitioner"},
        {title:"Nutritionists", slug:"nutritionists"},
        {title:"Occupational Therapy", slug:"occupationaltherapy"},
        {title:"Optometrists", slug:"optometrists"},
        {title:"Organ & Tissue Donor Services", slug:"organdonorservices"},
        {title:"Orthotics", slug:"orthotics"},
        {title:"Oxygen Bars", slug:"oxygenbars"},
        {title:"Personal Care Services", slug:"personalcare"},
        {title:"Pharmacy", slug:"pharmacy"},
        {title:"Physical Therapy", slug:"physicaltherapy"},
        {title:"Placenta Encapsulations", slug:"placentaencapsulation"},
        {title:"Postpartum Care", slug:"postpartumcare"},
        {title:"Prenatal/Perinatal Care", slug:"prenatal"},
        {title:"Prosthetics", slug:"prosthetics"},
        {title:"Prosthodontists", slug:"prosthodontists"},
        {title:"Psychotechnical Tests", slug:"psychotechnicaltests"},
        {title:"Reflexology", slug:"reflexology"},
        {title:"Rehabilitation Center", slug:"rehabilitation_center"},
        {title:"Reiki", slug:"reiki"},
        {title:"Reproductive Health Services", slug:"reproductivehealthservices"},
        {title:"Retirement Homes", slug:"retirement_homes"},
        {title:"Saunas", slug:"saunas"},
        {title:"Skilled Nursing", slug:"skillednursing"},
        {title:"Sleep Specialists", slug:"sleepspecialists"},
        {title:"Speech Therapists", slug:"speech_therapists"},
        {title:"Sperm Clinic", slug:"spermclinic"},
        {title:"Ultrasound Imaging Centers", slug:"ultrasoundimagingcenters"},
        {title:"Urgent Care", slug:"urgent_care"},
        {title:"Weight Loss Centers", slug:"weightlosscenters"},
        {title:"Home Services", slug:"homeservices"},
        {title:"Artificial Turf", slug:"artificialturf"},
        {title:"Building Supplies", slug:"buildingsupplies"},
        {title:"Cabinetry", slug:"cabinetry"},
        {title:"Carpenters", slug:"carpenters"},
        {title:"Carpet Installation", slug:"carpetinstallation"},
        {title:"Carpeting", slug:"carpeting"},
        {title:"Childproofing", slug:"childproofing"},
        {title:"Chimney Sweeps", slug:"chimneysweeps"},
        {title:"Contractors", slug:"contractors"},
        {title:"Countertop Installation", slug:"countertopinstall"},
        {title:"Damage Restoration", slug:"damagerestoration"},
        {title:"Decks & Railing", slug:"decksrailing"},
        {title:"Demolition Services", slug:"demolitionservices"},
        {title:"Door Sales/Installation", slug:"doorsales"},
        {title:"Drywall Installation & Repair", slug:"drywall"},
        {title:"Electricians", slug:"electricians"},
        {title:"Excavation Services", slug:"excavationservices"},
        {title:"Fences & Gates", slug:"fencesgates"},
        {title:"Fire Protection Services", slug:"fireprotection"},
        {title:"Fireplace Services", slug:"fireplace"},
        {title:"Firewood", slug:"firewood"},
        {title:"Flooring", slug:"flooring"},
        {title:"Foundation Repair", slug:"foundationrepair"},
        {title:"Furniture Assembly", slug:"furnitureassembly"},
        {title:"Garage Door Services", slug:"garage_door_services"},
        {title:"Gardeners", slug:"gardeners"},
        {title:"Glass & Mirrors", slug:"glassandmirrors"},
        {title:"Grout Services", slug:"groutservices"},
        {title:"Gutter Services", slug:"gutterservices"},
        {title:"Handyman", slug:"handyman"},
        {title:"Heating & Air Conditioning/HVAC", slug:"hvac"},
        {title:"Holiday Decorating Services", slug:"seasonaldecorservices"},
        {title:"Home Automation", slug:"homeautomation"},
        {title:"Home Energy Auditors", slug:"homeenergyauditors"},
        {title:"Home Inspectors", slug:"home_inspectors"},
        {title:"Home Network Installation", slug:"homenetworkinstall"},
        {title:"Home Organization", slug:"home_organization"},
        {title:"Home Theatre Installation", slug:"hometheatreinstallation"},
        {title:"Home Window Tinting", slug:"homewindowtinting"},
        {title:"House Sitters", slug:"housesitters"},
        {title:"Insulation Installation", slug:"insulationinstallation"},
        {title:"Interior Design", slug:"interiordesign"},
        {title:"Internet Service Providers", slug:"isps"},
        {title:"Irrigation", slug:"irrigation"},
        {title:"Keys & Locksmiths", slug:"locksmiths"},
        {title:"Landscape Architects", slug:"landscapearchitects"},
        {title:"Landscaping", slug:"landscaping"},
        {title:"Lawn Services", slug:"lawnservices"},
        {title:"Lighting Fixtures & Equipment", slug:"lighting"},
        {title:"Masonry/Concrete", slug:"masonry_concrete"},
        {title:"Mobile Home Repair", slug:"mobile_home_repair"},
        {title:"Movers", slug:"movers"},
        {title:"Packing Services", slug:"packingservices"},
        {title:"Painters", slug:"painters"},
        {title:"Patio Coverings", slug:"patiocoverings"},
        {title:"Plumbing", slug:"plumbing"},
        {title:"Backflow Services", slug:"backflowservices"},
        {title:"Pool & Hot Tub Service", slug:"poolservice"},
        {title:"Pool Cleaners", slug:"poolcleaners"},
        {title:"Pressure Washers", slug:"pressurewashers"},
        {title:"Real Estate", slug:"realestate"},
        {title:"Apartments", slug:"apartments"},
        {title:"Art Space Rentals", slug:"artspacerentals"},
        {title:"Commercial Real Estate", slug:"commercialrealestate"},
        {title:"Condominiums", slug:"condominiums"},
        {title:"Estate Liquidation", slug:"estateliquidation"},
        {title:"Home Developers", slug:"homedevelopers"},
        {title:"Home Staging", slug:"homestaging"},
        {title:"Homeowner Association", slug:"homeownerassociation"},
        {title:"Housing Cooperatives", slug:"housingcooperatives"},
        {title:"Kitchen Incubators", slug:"kitchenincubators"},
        {title:"Mobile Home Dealers", slug:"mobilehomes"},
        {title:"Mobile Home Parks", slug:"mobileparks"},
        {title:"Mortgage Brokers", slug:"mortgagebrokers"},
        {title:"Property Management", slug:"propertymgmt"},
        {title:"Real Estate Agents", slug:"realestateagents"},
        {title:"Apartment Agents", slug:"apartmentagents"},
        {title:"Real Estate Services", slug:"realestatesvcs"},
        {title:"Land Surveying", slug:"landsurveying"},
        {title:"Real Estate Photography", slug:"estatephotography"},
        {title:"Shared Office Spaces", slug:"sharedofficespaces"},
        {title:"University Housing", slug:"university_housing"},
        {title:"Refinishing Services", slug:"refinishing"},
        {title:"Roof Inspectors", slug:"roofinspectors"},
        {title:"Roofing", slug:"roofing"},
        {title:"Sauna Installation & Repair", slug:"saunainstallation"},
        {title:"Security Systems", slug:"securitysystems"},
        {title:"Shades & Blinds", slug:"blinds"},
        {title:"Shutters", slug:"shutters"},
        {title:"Siding", slug:"vinylsiding"},
        {title:"Solar Installation", slug:"solarinstallation"},
        {title:"Structural Engineers", slug:"structuralengineers"},
        {title:"Stucco Services", slug:"stucco"},
        {title:"Television Service Providers", slug:"televisionserviceproviders"},
        {title:"Tiling", slug:"tiling"},
        {title:"Tree Services", slug:"treeservices"},
        {title:"Utilities", slug:"utilities"},
        {title:"Electricity Suppliers", slug:"electricitysuppliers"},
        {title:"Natural Gas Suppliers", slug:"naturalgassuppliers"},
        {title:"Water Suppliers", slug:"watersuppliers"},
        {title:"Wallpapering", slug:"wallpapering"},
        {title:"Water Heater Installation/Repair", slug:"waterheaterinstallrepair"},
        {title:"Water Purification Services", slug:"waterpurification"},
        {title:"Waterproofing", slug:"waterproofing"},
        {title:"Window Washing", slug:"windowwashing"},
        {title:"Windows Installation", slug:"windowsinstallation"},
        {title:"Hotels & Travel", slug:"hotelstravel"},
        {title:"Airports", slug:"airports"},
        {title:"Airport Terminals", slug:"airportterminals"},
        {title:"Bed & Breakfast", slug:"bedbreakfast"},
        {title:"Campgrounds", slug:"campgrounds"},
        {title:"Car Rental", slug:"carrental"},
        {title:"Guest Houses", slug:"guesthouses"},
        {title:"Health Retreats", slug:"healthretreats"},
        {title:"Hostels", slug:"hostels"},
        {title:"Hotels", slug:"hotels"},
        {title:"Agriturismi", slug:"agriturismi"},
        {title:"Mountain Huts", slug:"mountainhuts"},
        {title:"Pensions", slug:"pensions"},
        {title:"Residences", slug:"residences"},
        {title:"Rest Stops", slug:"reststops"},
        {title:"Ryokan", slug:"ryokan"},
        {title:"Motorcycle Rental", slug:"motorcycle_rental"},
        {title:"RV Parks", slug:"rvparks"},
        {title:"RV Rental", slug:"rvrental"},
        {title:"Resorts", slug:"resorts"},
        {title:"Ski Resorts", slug:"skiresorts"},
        {title:"Tours", slug:"tours"},
        {title:"Aerial Tours", slug:"aerialtours"},
        {title:"Architectural Tours", slug:"architecturaltours"},
        {title:"Art Tours", slug:"arttours"},
        {title:"Beer Tours", slug:"beertours"},
        {title:"Bike tours", slug:"biketours"},
        {title:"Boat Tours", slug:"boattours"},
        {title:"Bus Tours", slug:"bustours"},
        {title:"Food Tours", slug:"foodtours"},
        {title:"Historical Tours", slug:"historicaltours"},
        {title:"Scooter Tours", slug:"scootertours"},
        {title:"Walking Tours", slug:"walkingtours"},
        {title:"Whale Watching Tours", slug:"whalewatchingtours"},
        {title:"Wine Tours", slug:"winetours"},
        {title:"Train Stations", slug:"trainstations"},
        {title:"Transportation", slug:"transport"},
        {title:"Airlines", slug:"airlines"},
        {title:"Airport Shuttles", slug:"airport_shuttles"},
        {title:"Bike Sharing", slug:"bikesharing"},
        {title:"Bus Stations", slug:"busstations"},
        {title:"Buses", slug:"buses"},
        {title:"Cable Cars", slug:"cablecars"},
        {title:"Dolmus Station", slug:"dolmusstation"},
        {title:"Ferries", slug:"ferries"},
        {title:"Limos", slug:"limos"},
        {title:"Metro Stations", slug:"metrostations"},
        {title:"Pedicabs", slug:"pedicabs"},
        {title:"Private Jet Charter", slug:"privatejetcharter"},
        {title:"Public Transportation", slug:"publictransport"},
        {title:"Shared Taxis", slug:"sharedtaxis"},
        {title:"Taxis", slug:"taxis"},
        {title:"Town Car Service", slug:"towncarservice"},
        {title:"Trains", slug:"trains"},
        {title:"Water Taxis", slug:"watertaxis"},
        {title:"Travel Services", slug:"travelservices"},
        {title:"Luggage Storage", slug:"luggagestorage"},
        {title:"Passport & Visa Services", slug:"passportvisaservices"},
        {title:"Travel Agents", slug:"travelagents"},
        {title:"Visitor Centers", slug:"visitorcenters"},
        {title:"Vacation Rental Agents", slug:"vacationrentalagents"},
        {title:"Vacation Rentals", slug:"vacation_rentals"},
        {title:"Local Flavor", slug:"localflavor"},
        {title:"Parklets", slug:"parklets"},
        {title:"Public Art", slug:"publicart"},
        {title:"Unofficial Yelp Events", slug:"unofficialyelpevents"},
        {title:"Yelp Events", slug:"yelpevents"},
        {title:"Local Services", slug:"localservices"},
        {title:"3D Printing", slug:"3dprinting"},
        {title:"Adoption Services", slug:"adoptionservices"},
        {title:"Appliances & Repair", slug:"homeappliancerepair"},
        {title:"Appraisal Services", slug:"appraisalservices"},
        {title:"Art Installation", slug:"artinstallation"},
        {title:"Art Restoration", slug:"artrestoration"},
        {title:"Awnings", slug:"awnings"},
        {title:"Bail Bondsmen", slug:"bailbondsmen"},
        {title:"Bike Repair/Maintenance", slug:"bike_repair_maintenance"},
        {title:"Biohazard Cleanup", slug:"biohazardcleanup"},
        {title:"Bookbinding", slug:"bookbinding"},
        {title:"Bus Rental", slug:"busrental"},
        {title:"Calligraphy", slug:"calligraphy"},
        {title:"Carpet Dyeing", slug:"carpetdyeing"},
        {title:"Child Care & Day Care", slug:"childcare"},
        {title:"Clock Repair", slug:"clockrepair"},
        {title:"Community Book Box", slug:"communitybookbox"},
        {title:"Community Gardens", slug:"communitygardens"},
        {title:"Community Service/Non-Profit", slug:"nonprofit"},
        {title:"Food Banks", slug:"foodbanks"},
        {title:"Homeless Shelters", slug:"homelessshelters"},
        {title:"Couriers & Delivery Services", slug:"couriers"},
        {title:"Crane Services", slug:"craneservices"},
        {title:"Donation Center", slug:"donationcenter"},
        {title:"Elder Care Planning", slug:"eldercareplanning"},
        {title:"Electronics Repair", slug:"electronicsrepair"},
        {title:"Elevator Services", slug:"elevatorservices"},
        {title:"Engraving", slug:"engraving"},
        {title:"Environmental Abatement", slug:"enviroabatement"},
        {title:"Environmental Testing", slug:"environmentaltesting"},
        {title:"Farm Equipment Repair", slug:"farmequipmentrepair"},
        {title:"Fingerprinting", slug:"fingerprinting"},
        {title:"Forestry", slug:"forestry"},
        {title:"Funeral Services & Cemeteries", slug:"funeralservices"},
        {title:"Cremation Services", slug:"cremationservices"},
        {title:"Mortuary Services", slug:"mortuaryservices"},
        {title:"Furniture Rental", slug:"rentfurniture"},
        {title:"Furniture Repair", slug:"furniturerepair"},
        {title:"Furniture Reupholstery", slug:"reupholstery"},
        {title:"Generator Installation/Repair", slug:"generatorinstallrepair"},
        {title:"Gestorias", slug:"gestorias"},
        {title:"Grill Services", slug:"grillservices"},
        {title:"Gunsmith", slug:"gunsmith"},
        {title:"Hazardous Waste Disposal", slug:"hazardouswastedisposal"},
        {title:"Hydro-jetting", slug:"hydrojetting"},
        {title:"IT Services & Computer Repair", slug:"itservices"},
        {title:"Data Recovery", slug:"datarecovery"},
        {title:"Mobile Phone Repair", slug:"mobilephonerepair"},
        {title:"Telecommunications", slug:"telecommunications"},
        {title:"Ice Delivery", slug:"icedelivery"},
        {title:"Internet Booths & Calling Centers", slug:"internetbooth"},
        {title:"Jewelry Repair", slug:"jewelryrepair"},
        {title:"Junk Removal & Hauling", slug:"junkremovalandhauling"},
        {title:"Dumpster Rental", slug:"dumpsterrental"},
        {title:"Junkyards", slug:"junkyards"},
        {title:"Knife Sharpening", slug:"knifesharpening"},
        {title:"Laundry Services", slug:"laundryservices"},
        {title:"Laundromat", slug:"laundromat"},
        {title:"Machine & Tool Rental", slug:"machinerental"},
        {title:"Machine Shops", slug:"machineshops"},
        {title:"Mailbox Centers", slug:"mailboxcenters"},
        {title:"Metal Detector Services", slug:"metaldetectorservices"},
        {title:"Metal Fabricators", slug:"metalfabricators"},
        {title:"Misting System Services", slug:"mistingsystemservices"},
        {title:"Musical Instrument Services", slug:"musicinstrumentservices"},
        {title:"Guitar Stores", slug:"guitarstores"},
        {title:"Piano Services", slug:"pianoservices"},
        {title:"Piano Stores", slug:"pianostores"},
        {title:"Vocal Coach", slug:"vocalcoach"},
        {title:"Nanny Services", slug:"nannys"},
        {title:"Notaries", slug:"notaries"},
        {title:"Outdoor Power Equipment Services", slug:"outdoorpowerequipmentservices"},
        {title:"Pest Control", slug:"pest_control"},
        {title:"Portable Toilet Services", slug:"portabletoiletservices"},
        {title:"Powder Coating", slug:"powdercoating"},
        {title:"Printing Services", slug:"copyshops"},
        {title:"Propane", slug:"propane"},
        {title:"Record Labels", slug:"record_labels"},
        {title:"Recording & Rehearsal Studios", slug:"recording_studios"},
        {title:"Recycling Center", slug:"recyclingcenter"},
        {title:"Sandblasting", slug:"sandblasting"},
        {title:"Screen Printing", slug:"screenprinting"},
        {title:"Screen Printing/T-Shirt Printing", slug:"screen_printing_tshirt_printing"},
        {title:"Self Storage", slug:"selfstorage"},
        {title:"Septic Services", slug:"septicservices"},
        {title:"Sewing & Alterations", slug:"sewingalterations"},
        {title:"Shipping Centers", slug:"shipping_centers"},
        {title:"Shoe Repair", slug:"shoerepair"},
        {title:"Shoe Shine", slug:"shoeshine"},
        {title:"Smoking Areas", slug:"smokingareas"},
        {title:"Snow Removal", slug:"snowremoval"},
        {title:"Snuggle Services", slug:"snuggleservices"},
        {title:"Stonemasons", slug:"stonemasons"},
        {title:"TV Mounting", slug:"tvmounting"},
        {title:"Watch Repair", slug:"watch_repair"},
        {title:"Water Delivery", slug:"waterdelivery"},
        {title:"Well Drilling", slug:"welldrilling"},
        {title:"Wildlife Control", slug:"wildlifecontrol"},
        {title:"Youth Club", slug:"youth_club"},
        {title:"Mass Media", slug:"massmedia"},
        {title:"Print Media", slug:"printmedia"},
        {title:"Radio Stations", slug:"radiostations"},
        {title:"Television Stations", slug:"televisionstations"},
        {title:"Nightlife", slug:"nightlife"},
        {title:"Adult Entertainment", slug:"adultentertainment"},
        {title:"Strip Clubs", slug:"stripclubs"},
        {title:"Striptease Dancers", slug:"stripteasedancers"},
        {title:"Bar Crawl", slug:"barcrawl"},
        {title:"Bars", slug:"bars"},
        {title:"Absinthe Bars", slug:"absinthebars"},
        {title:"Airport Lounges", slug:"airportlounges"},
        {title:"Beach Bars", slug:"beachbars"},
        {title:"Beer Bar", slug:"beerbar"},
        {title:"Champagne Bars", slug:"champagne_bars"},
        {title:"Cigar Bars", slug:"cigarbars"},
        {title:"Cocktail Bars", slug:"cocktailbars"},
        {title:"Dive Bars", slug:"divebars"},
        {title:"Drive-Thru Bars", slug:"drivethrubars"},
        {title:"Gay Bars", slug:"gaybars"},
        {title:"Hookah Bars", slug:"hookah_bars"},
        {title:"Hotel bar", slug:"hotel_bar"},
        {title:"Irish Pub", slug:"irish_pubs"},
        {title:"Lounges", slug:"lounges"},
        {title:"Pubs", slug:"pubs"},
        {title:"Pulquerias", slug:"pulquerias"},
        {title:"Sake Bars", slug:"sakebars"},
        {title:"Speakeasies", slug:"speakeasies"},
        {title:"Sports Bars", slug:"sportsbars"},
        {title:"Tabac", slug:"tabac"},
        {title:"Tiki Bars", slug:"tikibars"},
        {title:"Vermouth Bars", slug:"vermouthbars"},
        {title:"Whiskey Bars", slug:"whiskeybars"},
        {title:"Wine Bars", slug:"wine_bars"},
        {title:"Beer Gardens", slug:"beergardens"},
        {title:"Club Crawl", slug:"clubcrawl"},
        {title:"Coffeeshops", slug:"coffeeshops"},
        {title:"Comedy Clubs", slug:"comedyclubs"},
        {title:"Country Dance Halls", slug:"countrydancehalls"},
        {title:"Dance Clubs", slug:"danceclubs"},
        {title:"Dance Restaurants", slug:"dancerestaurants"},
        {title:"Fasil Music", slug:"fasil"},
        {title:"Jazz & Blues", slug:"jazzandblues"},
        {title:"Karaoke", slug:"karaoke"},
        {title:"Music Venues", slug:"musicvenues"},
        {title:"Piano Bars", slug:"pianobars"},
        {title:"Pool Halls", slug:"poolhalls"},
        {title:"Pets", slug:"pets"},
        {title:"Animal Shelters", slug:"animalshelters"},
        {title:"Horse Boarding", slug:"horse_boarding"},
        {title:"Pet Adoption", slug:"petadoption"},
        {title:"Pet Services", slug:"petservices"},
        {title:"Animal Physical Therapy", slug:"animalphysicaltherapy"},
        {title:"Aquarium Services", slug:"aquariumservices"},
        {title:"Dog Walkers", slug:"dogwalkers"},
        {title:"Emergency Pet Hospital", slug:"emergencypethospital"},
        {title:"Farriers", slug:"farriers"},
        {title:"Holistic Animal Care", slug:"animalholistic"},
        {title:"Pet Breeders", slug:"petbreeders"},
        {title:"Pet Cremation Services", slug:"petcremation"},
        {title:"Pet Groomers", slug:"groomer"},
        {title:"Pet Hospice", slug:"pethospice"},
        {title:"Pet Insurance", slug:"petinsurance"},
        {title:"Pet Photography", slug:"petphotography"},
        {title:"Pet Sitting", slug:"pet_sitting"},
        {title:"Pet Boarding", slug:"petboarding"},
        {title:"Pet Training", slug:"pet_training"},
        {title:"Pet Transportation", slug:"pettransport"},
        {title:"Pet Waste Removal", slug:"petwasteremoval"},
        {title:"Pet Stores", slug:"petstore"},
        {title:"Bird Shops", slug:"birdshops"},
        {title:"Local Fish Stores", slug:"localfishstores"},
        {title:"Reptile Shops", slug:"reptileshops"},
        {title:"Veterinarians", slug:"vet"},
        {title:"Professional Services", slug:"professional"},
        {title:"Accountants", slug:"accountants"},
        {title:"Advertising", slug:"advertising"},
        {title:"Architects", slug:"architects"},
        {title:"Art Consultants", slug:"artconsultants"},
        {title:"Billing Services", slug:"billingservices"},
        {title:"Boat Repair", slug:"boatrepair"},
        {title:"Bookkeepers", slug:"bookkeepers"},
        {title:"Business Consulting", slug:"businessconsulting"},
        {title:"Career Counseling", slug:"careercounseling"},
        {title:"Commissioned Artists", slug:"commissionedartists"},
        {title:"Customs Brokers", slug:"customsbrokers"},
        {title:"Digitizing Services", slug:"digitizingservices"},
        {title:"Duplication Services", slug:"duplicationservices"},
        {title:"Editorial Services", slug:"editorialservices"},
        {title:"Employment Agencies", slug:"employmentagencies"},
        {title:"Feng Shui", slug:"fengshui"},
        {title:"Graphic Design", slug:"graphicdesign"},
        {title:"Indoor Landscaping", slug:"indoorlandscaping"},
        {title:"Internet Service Providers", slug:"isps"},
        {title:"Lawyers", slug:"lawyers"},
        {title:"Bankruptcy Law", slug:"bankruptcy"},
        {title:"Business Law", slug:"businesslawyers"},
        {title:"Consumer Law", slug:"consumerlaw"},
        {title:"Contract Law", slug:"contractlaw"},
        {title:"Criminal Defense Law", slug:"criminaldefense"},
        {title:"DUI Law", slug:"duilawyers"},
        {title:"Disability Law", slug:"disabilitylaw"},
        {title:"Divorce & Family Law", slug:"divorce"},
        {title:"Elder Law", slug:"elderlaw"},
        {title:"Employment Law", slug:"employmentlawyers"},
        {title:"Entertainment Law", slug:"entertainmentlaw"},
        {title:"Estate Planning Law", slug:"estateplanning"},
        {title:"Wills, Trusts, & Probates", slug:"willstrustsprobates"},
        {title:"General Litigation", slug:"general_litigation"},
        {title:"IP & Internet Law", slug:"iplaw"},
        {title:"Immigration Law", slug:"immigrationlawyers"},
        {title:"Medical Law", slug:"medicallaw"},
        {title:"Personal Injury Law", slug:"personal_injury"},
        {title:"Real Estate Law", slug:"realestatelawyers"},
        {title:"Social Security Law", slug:"socialsecuritylaw"},
        {title:"Tax Law", slug:"taxlaw"},
        {title:"Traffic Ticketing Law", slug:"trafficticketinglaw"},
        {title:"Workers Compensation Law", slug:"workerscomplaw"},
        {title:"Legal Services", slug:"legalservices"},
        {title:"Court Reporters", slug:"courtreporters"},
        {title:"Process Servers", slug:"processservers"},
        {title:"Life Coach", slug:"lifecoach"},
        {title:"Marketing", slug:"marketing"},
        {title:"Matchmakers", slug:"matchmakers"},
        {title:"Mediators", slug:"mediators"},
        {title:"Music Production Services", slug:"musicproduction"},
        {title:"Patent Law", slug:"patentlaw"},
        {title:"Payroll Services", slug:"payroll"},
        {title:"Personal Assistants", slug:"personalassistants"},
        {title:"Private Investigation", slug:"privateinvestigation"},
        {title:"Product Design", slug:"productdesign"},
        {title:"Public Adjusters", slug:"publicadjusters"},
        {title:"Public Relations", slug:"publicrelations"},
        {title:"Security Services", slug:"security"},
        {title:"Shredding Services", slug:"shredding"},
        {title:"Software Development", slug:"softwaredevelopment"},
        {title:"Talent Agencies", slug:"talentagencies"},
        {title:"Taxidermy", slug:"taxidermy"},
        {title:"Tenant and Eviction Law", slug:"tenantlaw"},
        {title:"Translation Services", slug:"translationservices"},
        {title:"Video/Film Production", slug:"videofilmproductions"},
        {title:"Web Design", slug:"web_design"},
        {title:"Wholesalers", slug:"wholesalers"},
        {title:"Restaurant Supplies", slug:"suppliesrestaurant"},
        {title:"Public Services & Government", slug:"publicservicesgovt"},
        {title:"Authorized Postal Representative", slug:"authorized_postal_representative"},
        {title:"Civic Center", slug:"civiccenter"},
        {title:"Community Centers", slug:"communitycenters"},
        {title:"Courthouses", slug:"courthouses"},
        {title:"Departments of Motor Vehicles", slug:"departmentsofmotorvehicles"},
        {title:"Embassy", slug:"embassy"},
        {title:"Fire Departments", slug:"firedepartments"},
        {title:"Jails & Prisons", slug:"jailsandprisons"},
        {title:"Real Estate", slug:"realestate"},
        {title:"Apartments", slug:"apartments"},
        {title:"Art Space Rentals", slug:"artspacerentals"},
        {title:"Commercial Real Estate", slug:"commercialrealestate"},
        {title:"Condominiums", slug:"condominiums"},
        {title:"Home Staging", slug:"homestaging"},
        {title:"Homeowner Association", slug:"homeownerassociation"},
        {title:"Housing Cooperatives", slug:"housingcooperatives"},
        {title:"Mobile Home Dealers", slug:"mobilehomes"},
        {title:"Mobile Home Parks", slug:"mobileparks"},
        {title:"Mortgage Brokers", slug:"mortgagebrokers"},
        {title:"Real Estate Agents", slug:"realestateagents"},
        {title:"Real Estate Services", slug:"realestatesvcs"},
        {title:"Land Surveying", slug:"landsurveying"},
        {title:"Real Estate Photography", slug:"estatephotography"},
        {title:"Shared Office Spaces", slug:"sharedofficespaces"},
        {title:"Religious Organizations", slug:"religiousorgs"},
        {title:"Buddhist Temples", slug:"buddhist_temples"},
        {title:"Churches", slug:"churches"},
        {title:"Shrines", slug:"shrines"},
        {title:"Synagogues", slug:"synagogues"},
        {title:"Taoist Temples", slug:"taoisttemples"},
      ],
      yelpData: [],
      error: '',
      autocompleted: [],
      modal: '',
      yelpLoaded: 0,
      theOffset: '',
      tampaId: 'appEX8GXgcD2ln4dB',
      orlandoId: 'appXNufXR9nQARjgs',
      propedList: [],
      addToDB: 'tampa',
      recentList: {
        tampa: {
          closes: [],
          appts: [],
        },
        orlando: {
          closes: [],
          appts: [],
        }
      },

      regionOffset: '',
      zips: [],
      regions: {
        tampa: {
          'Hillsborough': [],
          'Pinellas': [],
          'Pasco': [],
          'Polk': [],
        },
        orlando: {
          'Lake': [],
          'Orange': [],
          'Osceola': [],
          'Seminole': [],
        }
      },
    }
  }
  changeDBSearch = e => {
    if (e.target.value !== this.state.addToDB) {
      this.setState({
        addToDB: e.target.value
      })
    }
  }
  yelpIt = () => {
    console.log('yelpIt');
    let yelpURL = 'https://api.yelp.com/v3/businesses/search';
    yelpURL += '?limit=16';
    yelpURL += '&sort_by=best_match';

    //location stuff
    let selectedLocation = '';
    if (this.state.locationFilter === 'select') {

      console.log();

      this.setState({
        selectedLocation: document.getElementById('regionSelect').value.replace(/ /g,'+'),
        addToDB: document.getElementById('regionSelect').options[document.getElementById('regionSelect').selectedIndex].dataset.region,
      })
      selectedLocation += document.getElementById('regionSelect').value.replace(/ /g,'+');
    } else {
      this.setState({
        selectedLocation: document.getElementById('locationSearch').value.replace(/ /g,'+'),
      })
      selectedLocation += document.getElementById('locationSearch').value.replace(/ /g,'+');
    }
    yelpURL += '&location=' + selectedLocation;



    document.getElementsByClassName('suggestedSearch')[0].className = 'suggestedSearch';

    //term stuff
    let selectedKeyword = '';
    if (this.state.keywordFilter === 'select') {
      this.setState({
        selectedKeyword: document.getElementById('yelpList').value.replace(/ /g,'+')
      })
      selectedKeyword += document.getElementById('yelpList').value.replace(/ /g,'+');
    } else {
      this.setState({
        selectedKeyword: document.getElementById('yelpSearch').value.replace(/ /g,'+')
      })
      selectedKeyword += document.getElementById('yelpSearch').value.replace(/ /g,'+');
    }


    if (selectedKeyword === '') {
      this.setState({
        error: 'Please ' + this.state.keywordFilter + ' a keyword',
      })
      console.log('error');
      return;
    }

    yelpURL += '&term=' + selectedKeyword;


    delete axios.defaults.headers.common["Authorization"];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + YelpAPI();

    yelpURL = 'https://airmagic.herokuapp.com/' + yelpURL;

    console.log(yelpURL);

    this.setState({
      error: 'Searching Yelp...',
    })

    return axios
      .get(yelpURL).then(response => {

        //reseting Airtable as the header
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();

        this.setState({
          yelpData: response.data.businesses,
          error: '',
          yelpLoaded: response.data.businesses.length,
        });
        console.log(response);
    });

  }

  loadMoreYelp = (loaded) => {

      console.log('Load More Yelp');
      let yelpURL = 'https://api.yelp.com/v3/businesses/search';
      yelpURL += '?limit=16';
      yelpURL += '&sort_by=review_count';
      yelpURL += '&offset=' + this.state.yelpLoaded;
      yelpURL += '&location=' + this.state.searchLocation;
      yelpURL += '&term=' + this.state.selectedKeyword;


      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + YelpAPI();

      yelpURL = 'https://airmagic.herokuapp.com/' + yelpURL;

      console.log(yelpURL);

      this.setState({
        error: 'Searching Yelp...',
      })

      let preYelp = this.state.yelpData;

      return axios
        .get(yelpURL).then(response => {

          //reseting Airtable as the header
          delete axios.defaults.headers.common["Authorization"];
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();

          this.setState({
            yelpData: preYelp.concat(response.data.businesses),
            error: '',
            yelpLoaded: (this.state.yelpLoaded + response.data.businesses.length),
          });

          if (response.data.businesses.length === 0) {
            this.setState({
              error: 'No more results!',
            });
          }
          console.log(response);
      });
  }

  yelpKeySearch = e => {
    console.log(e.target.value);

		let searchVal = e.target.value.toLowerCase();

    if (searchVal) {
      document.getElementsByClassName('suggestedSearch')[0].className = 'suggestedSearch isActive';
    } else {
      document.getElementsByClassName('suggestedSearch')[0].className = 'suggestedSearch';
    }

    let propedAutocomplete = [];

    if (searchVal === '') {
      propedAutocomplete = [];
    } else {
      for (var i in this.state.keywords) {
        if (this.state.keywords[i].title.toLowerCase().includes(searchVal)) {
          if (propedAutocomplete.length < 11) { //getting top 10
            propedAutocomplete.push(this.state.keywords[i]);
          }
        }
      }
    }

    this.setState ({
      autocompleted: propedAutocomplete,
    })
    console.log(propedAutocomplete);
  }

  keyFilter = e => {
    if (e === 'select') {
      this.setState({
        keywordFilter: 'select',
      });
    } else if (e === 'search') {
      this.setState({
        keywordFilter: 'search',
      });
    }
  }

  locationFilter = e => {
    console.log(e);
    if (e === 'select') {
      this.setState({
        locationFilter: 'select',
      });
    } else if (e === 'search') {
      this.setState({
        locationFilter: 'search',
      });
    }
  }


  loadData = () => {
    //first
    let tampaAppts = function() {
      console.log('tampaAppts');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Recent+Appts';
      if (this.state.theOffset !== '') {followURL = followURL + '&offset=' + this.state.theOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            theOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          tampaAppts();
        } else {
          console.log('clearing tampaAppts()');

          let finalList = this.state.recentList;
          finalList.tampa.appts = this.state.propedList;

          this.setState({
            recentList: finalList,
          });

          setTimeout((function() {
            this.setState({
              theOffset: '',
              propedList: [],
            });

            setTimeout((function() {
              tampaCloses();
            }).bind(this), 50);
          }).bind(this), 50);
        }
      });
    }.bind(this);
    tampaAppts();

    //closes
    let tampaCloses = function() {
      console.log('tampaCloses');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.tampaId + '/' + 'Sales' + '?view=Recent+Closes';
      if (this.state.theOffset !== '') {followURL = followURL + '&offset=' + this.state.theOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            theOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          tampaCloses();
        } else {
          console.log('clearing tampaCloses()');

          let finalList = this.state.recentList;
          finalList.tampa.closes = this.state.propedList;

          this.setState({
            recentList: finalList,
          });

          setTimeout((function() {
            this.setState({
              theOffset: '',
              propedList: [],
            });

            setTimeout((function() {
              orlandoAppts();
            }).bind(this), 50);
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //appts
    let orlandoAppts = function() {
      console.log('orlandoAppts');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Recent+Appts';
      if (this.state.theOffset !== '') {followURL = followURL + '&offset=' + this.state.theOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            theOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          orlandoAppts();
        } else {
          console.log('clearing orlandoAppts()');

          let finalList = this.state.recentList;
          finalList.orlando.appts = this.state.propedList;

          this.setState({
            recentList: finalList,
          });

          setTimeout((function() {
            this.setState({
              theOffset: '',
              propedList: [],
            });

            setTimeout((function() {
              orlandoCloses();
            }).bind(this), 50);
          }).bind(this), 50);
        }
      });
    }.bind(this);

    //closes
    let orlandoCloses = function() {
      console.log('orlandoCloses');
      let grabRecords = this.state.propedList;

      let followURL = 'https://api.airtable.com/v0/' + this.state.orlandoId + '/' + 'Sales' + '?view=Recent+Closes';
      if (this.state.theOffset !== '') {followURL = followURL + '&offset=' + this.state.theOffset;}

      return axios
        .get(followURL).then(response => {
          this.setState({
            propedList: grabRecords.concat(response.data.records),
            theOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          orlandoCloses();
        } else {
          console.log('clearing orlandoCloses()');

          let finalList = this.state.recentList;
          finalList.orlando.closes = this.state.propedList;

          this.setState({
            recentList: finalList,
          });

          setTimeout((function() {
            this.setState({
              theOffset: '',
              propedList: [],
            });

            setTimeout((function() {
              finalizeData();
            }).bind(this), 50);
          }).bind(this), 50);
        }
      });
    }.bind(this);

    let finalizeData = function () {
      console.log(this.state.recentList);
    }.bind(this);
  }

  addAutoComplete = e => {
    document.getElementById('yelpSearch').value = e.slug;
    this.setState ({
      autocompleted: [],
    })
  }

  toggleRed = () => {
    if (document.getElementById('hideRed').checked) {
      document.getElementsByClassName('theYelpData')[0].className = 'theYelpData hideRed';
    } else {
      document.getElementsByClassName('theYelpData')[0].className = 'theYelpData';
    }
  }

  addToDB = (item) => {
    console.log(item);

    let pushRecord = {};

    pushRecord['Company Name'] = item.name;
    pushRecord['Office Phone'] = item.display_phone;
    pushRecord['Address 1'] = item.location.address1;
    if (item.location.address2) {
      pushRecord['Address 2'] = item.location.address2;
    }
    pushRecord['City'] = item.location.city;
    pushRecord['Zip'] = item.location.zip_code;

    let today = new Date();
    pushRecord['Recent Call Date'] = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();



    let generatedOn = new Date(+new Date + 1000*60*60*24*1);
    if (generatedOn.getDay() === 6) {
      generatedOn = new Date(+new Date + 1000*60*60*24*3);
    } else if (generatedOn.getDay() === 7) {
      generatedOn = new Date(+new Date + 1000*60*60*24*2);
    }
    generatedOn = (generatedOn.getMonth()+1) + '/' + generatedOn.getDate() + '/' + generatedOn.getFullYear();
    pushRecord["List Generated On"] = generatedOn;

    pushRecord["Lead Source"] = 'Yelp';

    let finalURL = 'https://api.airtable.com/v0/appYVHBA4LOlBssy3/log?view=Callers';

    today  = new Date();
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

    pushRecord["Notes"] = finalEntry + localStorage.getItem('userName') + ' added this from Yelp!'


    return axios
      .get(finalURL)
      .then(response => {

        if (response.data.records.filter(user => user.fields['Name'] === localStorage.getItem('userName'))[0]) {
          pushRecord["Caller List"] = localStorage.getItem('userName');
          pushRecord["Recent Caller"] = localStorage.getItem('userName');
        }


        if (this.state.addToDB === 'tampa') {
          this.setState({
            baseId: 'appEX8GXgcD2ln4dB',
          });
        } else if(this.state.addToDB === 'orlando') {
          this.setState({
            baseId: 'appXNufXR9nQARjgs',
          });
        }

        setTimeout((function() {
          let finalPush = {"fields": pushRecord}
          console.log(finalPush);

          let saveRecord = 'https://api.airtable.com/v0/' + this.state.baseId + '/' + 'Sales/';
          return axios
            .post(saveRecord, finalPush);
        }).bind(this), 50);
      });
  }

  loadRegions = () => {
    console.log('hi');
    let loadFinish = function() {
      let regionList = {
        tampa: {
          'Hillsborough': [],
          'Pinellas': [],
          'Pasco': [],
          'Polk': [],
        },
        orlando: {
          'Lake': [],
          'Orange': [],
          'Osceola': [],
          'Seminole': [],
        }
      }

      for (var i in this.state.zips) {
        let thisZip = this.state.zips[i];

        console.log(thisZip.fields['County']);
        let rightRegion;
        let tampaRegion = true;

        if (regionList.tampa[thisZip.fields['County']]) {
          rightRegion = regionList.tampa[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);
        } else {
          rightRegion = regionList.orlando[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);
          tampaRegion = false;
        }

        if (!rightRegion) {
          console.log('createRegion');
          let pushItem = {
            zips: [],
            callable: thisZip.fields['Callable'],
            region: thisZip.fields['Region'],
          };
          if (thisZip.fields['Has Stipulations'] === 'Yes') {
            pushItem.stipulations = 'Yes';
            pushItem.size = thisZip.fields['Size'];
            pushItem.time = thisZip.fields['Time'];
          }

          if (tampaRegion) {
            regionList.tampa[thisZip.fields['County']].push(pushItem);
          } else {
            regionList.orlando[thisZip.fields['County']].push(pushItem);
          }

          console.log(regionList);
        }
      }

      for (var i in this.state.zips) {
        let thisZip = this.state.zips[i];
        // regionList[thisZip.fields['County']][thisZip.fields['Region']].zips.push(thisZip.fields['Zip']);
        let rightRegion;

        if (regionList.tampa[thisZip.fields['County']]) {
          rightRegion = regionList.tampa[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);
        } else {
          rightRegion = regionList.orlando[thisZip.fields['County']].find(x => x.region === thisZip.fields['Region']);
        }

        rightRegion.zips.push(thisZip.fields['Zip'])
      }
      console.log(regionList);
      setTimeout((function() {
        this.setState({
          regions: regionList,
        })
      }).bind(this), 100);


      setTimeout((function() {
        console.log(this.state.regions);
      }).bind(this), 125);
    }.bind(this);


    let loadTampaList = function() {
      let cityTable = 'Tampa';
      console.log('loadTampaList');
      let zipList = this.state.zips;

      let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + cityTable;
      if (this.state.regionOffset !== '') {customersURL = customersURL + '?offset=' + this.state.regionOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            zips: zipList.concat(response.data.records),
            regionOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadTampaList();
        } else {
          console.log('clearing loadTampaList()');
          console.log(this.state.regions);
          this.setState({
            regionOffset: '',
          });
          loadOrlandoList();
        }
      });
    }.bind(this);

    let loadOrlandoList = function() {
      let cityTable = 'Orlando';
      console.log('loadOrlandoList');
      let zipList = this.state.zips;

      let customersURL = 'https://api.airtable.com/v0/' + 'app284jwpxecMvNRZ' + '/' + cityTable;
      if (this.state.regionOffset !== '') {customersURL = customersURL + '?offset=' + this.state.regionOffset;}

      return axios
        .get(customersURL).then(response => {
          this.setState({
            zips: zipList.concat(response.data.records),
            regionOffset: response.data.offset,
          });
        if (response.data.offset !== undefined) {
          loadOrlandoList();
        } else {
          console.log('clearing loadOrlandoList()');
          console.log(this.state.regions);
          this.setState({
            regionOffset: '',
          });
          loadFinish();
        }
      });
    }.bind(this);

    loadTampaList(); //run on load
  }

  componentDidMount() {
    this.loadData();
    this.loadRegions();
  }
  // Render
  // ----------------------------------------------------
  render() {

    let selectClass = 'selectFields';
    if (this.state.keywordFilter === 'select') {
      selectClass += ' active';
    }
    let searchClass = 'searchFields';
    if (this.state.keywordFilter === 'search') {
      searchClass += ' active';
    }

    let locSelectClass = 'selectFields';
    if (this.state.locationFilter === 'select') {
      locSelectClass += ' active';
    }
    let locSearchClass = 'searchFields';
    if (this.state.locationFilter === 'search') {
      locSearchClass += ' active';
    }

    return (
      <div className="YelpDash">
        <div className="searchArea">
          <div className="backBtn">
            <Link to={`/`}>
              <div className="navIcon softGrad--black">
                <img src={hamburger} alt="databases" />
              </div>
            </Link>
          </div>
          <div className="keywordStuff">
            <h2>Keyword</h2>

            <div className={selectClass} onClick={()=>this.keyFilter('select')}>
              <div id="sortTable" className="yelpBox">
                <div className="selectBox">
                  <select id="yelpList">
                    <option value="">Select Keyword</option>
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
              </div>
            </div>


            <div className={searchClass} onClick={()=>this.keyFilter('search')}>
              <input type="text" id='yelpSearch' autocomplete="off" placeholder="Search Yelp..." onChange={this.yelpKeySearch} />
              <ul className="suggestedSearch">
                {this.state.autocompleted.map((e, i) => {
                  const key = `${e.slug}-${i}`;
                  return (
                    <li className={"keyword " + e.slug} onClick={()=>this.addAutoComplete(e)} key={key}>
                      {e.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="locationStuff">
            <h2>Location</h2>

            <div className={locSelectClass} onClick={()=>this.locationFilter('select')}>
              <div id="sortTable" className="yelpBox">
                <div className="selectBox">
                  <select id="regionSelect">
                    <option selected>Select Region</option>
                    <option disabled>---- Tampa Regions --------</option>

                    <option disabled>-------- Hillsborough --------</option>
                    {this.state.regions.tampa['Hillsborough'] ? this.state.regions.tampa['Hillsborough'].map((e, i) => this.regionOption(e, i, 'tampa')) : ''}

                    <option disabled> </option>
                    <option disabled>----------- Pinellas -----------</option>
                    {this.state.regions.tampa['Pinellas'] ? this.state.regions.tampa['Pinellas'].map((e, i) => this.regionOption(e, i, 'tampa')) : ''}

                    <option disabled> </option>
                    <option disabled>------------ Pasco ------------</option>
                    {this.state.regions.tampa['Pasco'] ? this.state.regions.tampa['Pasco'].map((e, i) => this.regionOption(e, i, 'tampa')) : ''}

                    <option disabled> </option>
                    <option disabled>------------ Polk ------------</option>
                    {this.state.regions.tampa['Polk'] ? this.state.regions.tampa['Polk'].map((e, i) => this.regionOption(e, i, 'tampa')) : ''}

                    <option disabled>------------------------</option>
                    <option disabled> </option>
                    <option disabled> </option>
                    <option disabled>---- Orlando Regions --------</option>
                    <option disabled>-------- Orange --------</option>
                    {this.state.regions.orlando['Orange'] ? this.state.regions.orlando['Orange'].map((e, i) => this.regionOption(e, i, 'orlando')) : ''}

                    <option disabled> </option>
                    <option disabled>----------- Seminole -----------</option>
                    {this.state.regions.orlando['Seminole'] ? this.state.regions.orlando['Seminole'].map((e, i) => this.regionOption(e, i, 'orlando')) : ''}

                    <option disabled> </option>
                    <option disabled>------------ Osceola ------------</option>
                    {this.state.regions.orlando['Osceola'] ? this.state.regions.orlando['Osceola'].map((e, i) => this.regionOption(e, i, 'orlando')) : ''}

                    <option disabled> </option>
                    <option disabled>------------ Lake ------------</option>
                    {this.state.regions.orlando['Lake'] ? this.state.regions.orlando['Lake'].map((e, i) => this.regionOption(e, i, 'orlando')) : ''}
                  </select>
                </div>
              </div>
            </div>


            <div className={locSearchClass} onClick={()=>this.locationFilter('search')}>
              <input type="text" id='locationSearch' autocomplete="off" placeholder="Type Location..." />
              <select value={this.state.addToDB} onChange={this.changeDBSearch}>
                <option value="tampa">In Tampa</option>
                <option value="orlando">In Orlando</option>
              </select>
            </div>


          </div>

          <div className="openIt">
            <div onClick={this.yelpIt} className='btn softGrad--primary'>Open Yelp!</div>
          </div>
        </div>

        {this.yelpError}
        {this.yelpList}
        {this.recentList}
      </div>
    );
  }

  regionOption(regionItem, i, region) {
    if (regionItem.callable === 'Yes') {
      if (regionItem.stipulations === 'Yes') { //has stipulations
        let option = regionItem.region + ' | ';
        if (regionItem.size) {
          option += regionItem.size;
          if (regionItem.time) {
            option += ' & ' + regionItem.time
          }
        } else if (regionItem.time) {
          option += regionItem.time
        }
        return (
          <option value={regionItem.region} data-region={region}>
            {option}
          </option>
        );
      } else { // no stipulations
        return (
          <option value={regionItem.region} data-region={region}>
            {regionItem.region}
          </option>
        );
      }
    } else { // can't call
      return (
        <option disabled>
          DON'T CALL - {regionItem.region}
        </option>
      );
    }
  }

  get yelpList() {
    if (this.state.yelpData.length > 0) { //if it has a list
      return (
        <div className="YelpList">
          <form id="hideRedToggle" onChange={()=>this.toggleRed()}>
            <input type="checkbox" id="hideRed" />
            <label for="hideRed">Hide Red Items</label>
          </form>
          <ul className="theYelpData">
            {this.state.yelpData.map((e, i) => this.yelpItem(e, i))}
          </ul>
          <div className="btn softGrad--black loadMore" onClick={()=>this.loadMoreYelp(this.state.yelpLoaded)}>Load More</div>
        </div>
      )
    } else {
      return (
        <div className="YelpList">
          <div className="empty">
            <h2>Search Yelp with the bar above!</h2>
          </div>
        </div>
      )
    }
  }

  get yelpError() {
    if (this.state.error !== '') {
      return (
        <div className="errorBox">
          <h2>{this.state.error}</h2>
        </div>
      );
    }
  }

  yelpItem(e, i) {
    return <YelpItem
            key={e.id}
            id={e.id}
            data={e}
            index={i}
            yelpRegion={this.state.yelpRegion}
            addToDB={this.addToDB}
          />
  }

  get recentList() {
    if (this.state.modal === 'recent') {
      return (
        <div className="YelpModal">
          <ul className="tampaList">
            <li className="title">Tampa - Closes</li>
            {this.state.recentList.tampa.closes.map((e, i) => {
              let frequency = '';
              if (e.fields['Times per Week'].includes("Month") || e.fields['Times per Week'].includes("Week")) {
                frequency = e.fields['Times per Week'];
              } else {
                frequency = e.fields['Times per Week'] + 'Week';
              }
              const key = `${e.id}-${i}`;
              return (
                <li className='recentItem' key={key}>
                  <h2>{e.fields['Company Name']} <em>({'$' + e.fields['Monthly Amount']} | {frequency})</em></h2>
                  <p>{e.fields['Address 1'] + ', ' + e.fields['City']}</p>
                </li>
              );
            })}
            <li className="title">Tampa - Appointments</li>
            {this.state.recentList.tampa.appts.map((e, i) => {
              let frequency = '';
              if (e.fields['Times per Week'].includes("Month") || e.fields['Times per Week'].includes("Week")) {
                frequency = e.fields['Times per Week'];
              } else {
                frequency = e.fields['Times per Week'] + 'Week';
              }
              const key = `${e.id}-${i}`;
              return (
                <li className='recentItem' key={key}>
                  <h2>{e.fields['Company Name']} <em>({'$' + e.fields['Monthly Amount']} | {frequency})</em></h2>
                  <p>{e.fields['Address 1'] + ', ' + e.fields['City']}</p>
                </li>
              );
            })}
            <li className="title">Orlando - Closes</li>
            {this.state.recentList.orlando.closes.map((e, i) => {
              let frequency = '';
              if (e.fields['Times per Week'].includes("Month") || e.fields['Times per Week'].includes("Week")) {
                frequency = e.fields['Times per Week'];
              } else {
                frequency = e.fields['Times per Week'] + 'Week';
              }
              const key = `${e.id}-${i}`;
              return (
                <li className='recentItem' key={key}>
                  <h2>{e.fields['Company Name']} <em>({'$' + e.fields['Monthly Amount']} | {frequency})</em></h2>
                  <p>{e.fields['Address 1'] + ', ' + e.fields['City']}</p>
                </li>
              );
            })}
            <li className="title">Orlando - Appointments</li>
            {this.state.recentList.orlando.appts.map((e, i) => {
              let frequency = '';
              if (e.fields['Times per Week'].includes("Month") || e.fields['Times per Week'].includes("Week")) {
                frequency = e.fields['Times per Week'];
              } else {
                frequency = e.fields['Times per Week'] + 'Week';
              }
              const key = `${e.id}-${i}`;
              return (
                <li className='recentItem' key={key}>
                  <h2>{e.fields['Company Name']} <em>({'$' + e.fields['Monthly Amount']} | {frequency})</em></h2>
                  <p>{e.fields['Address 1'] + ', ' + e.fields['City']}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  get yelpFrame() {
    let frameURL = "https://www.yelp.com/search?find_desc=" + this.state.dfasd + "&find_loc=Tampa%2C%20FL";
    return (
      <iframe src=""></iframe>
    );
  }
}
