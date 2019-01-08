import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import attentionImage from '../assets/icons/white/attention.png';
import phoneImg from '../assets/icons/white/phone.png';
import edit from '../assets/icons/white/edit.png';
import visitImg from '../assets/icons/white/location.png';
import loader from '../assets/loader.gif';
import search from '../assets/icons/white/search.png';

export default class CustomerDashNav extends Component {
  // Render
  // ----------------------------------------------------
  render() {

    let ticketClass = 'splashCard splashCard--ticket';
    let attentionClass = 'splashCard splashCard--attention';
    let proactiveClass = 'splashCard splashCard--proactive';
    let visitClass = 'splashCard splashCard--visit';
    let allClass = 'splashCard splashCard--all';

    let path = this.props.pathName;
    console.log(path);
    if (path === '/tampa/customer-service/tickets' || path === '/orlando/customer-service/tickets') {
      ticketClass += ' isActive';
    }
    if (path === '/tampa/customer-service/attention' || path === '/orlando/customer-service/attention') {
      attentionClass += ' isActive';
      console.log('this.props.loadAttentionData();');
    }
    if (path === '/tampa/customer-service/proactive' || path === '/orlando/customer-service/proactive') {
      proactiveClass += ' isActive';
    }
    if (path === '/tampa/customer-service/visit' || path === '/orlando/customer-service/visit') {
      visitClass += ' isActive';
    }
    if (path === '/tampa/customer-service/all' || path === '/orlando/customer-service/all') {
      allClass += ' isActive';
    }

    return (
      <div className="CustomerDashNav">
        <div className="splashWrapper">
          <div className="linkSet">
              <div id="ticket" className={ticketClass} onClick={this.props.splashSelect}>
                <Link to={'/' + this.props.citySet + '/customer-service/tickets' }>
                  <div className="inner">
                    <div className="circleDot">
                      <img src={edit} />
                    </div>
                    <p>Tickets</p>
                  </div>
                </Link>
              </div>
              <div id="attention" className={attentionClass} onClick={this.props.splashSelect}>
                <Link to={'/' + this.props.citySet + '/customer-service/attention' }>
                  {this.cornerAtt}
                  <div className="inner">
                    <div className="circleDot">
                      <img src={attentionImage} />
                    </div>
                    <p>{window.innerWidth > 900 ? 'Needs Attention' : 'Attention'}</p>
                  </div>
                </Link>
              </div>
                <div id="proactive" className={proactiveClass} onClick={this.props.splashSelect}>
                  <Link to={'/' + this.props.citySet + '/customer-service/proactive' }>
                  {this.cornerPro}
                  <div className="inner">
                    <div className="circleDot">
                      <img src={phoneImg} />
                    </div>
                    <p>{window.innerWidth > 900 ? 'Proactive Calls' : 'Calls'}</p>
                  </div>
                </Link>
              </div>

                <div id="visit" className={visitClass} onClick={this.props.splashSelect}>
                  <Link to={'/' + this.props.citySet + '/customer-service/visit' }>
                  <div className="inner">
                    <div className="circleDot">
                      <img src={visitImg} />
                    </div>
                    <p>{window.innerWidth > 900 ? 'Proactive Visits' : 'Visits'}</p>
                  </div>
                </Link>
              </div>
                <div id="browseAll" className={allClass} onClick={this.props.splashSelect}>
                  <Link to={'/' + this.props.citySet + '/customer-service/all' }>
                  <div className="inner">
                    <div className="circleDot"></div>
                    <p>{window.innerWidth > 900 ? 'Browse All' : 'All'}</p>
                  </div>
                </Link>
              </div>
          </div>
        </div>




        <div className="searchArea">
          <div className="innerSearch">
            <form className="ControlsBar--search" onSubmit={this.props.searchHandler}>
              <input type="text" placeholder="search records" id="searchInput" />
              <select id="searchBy">
                <option value="Company+Name" id="Company+Name">Company</option>
                <option value="Main+Contact" id="Main+Contact">Contact</option>
                <option value="Zip" id="Zip">Zip</option>
                <option value="Address+1" id="Address+1">Address</option>
                <option value="Office+Phone" id="Office+Phone">Office #</option>
                <option value="Email" id="Email">Email</option>
                <option value="Standing" id="Standing">Standing</option>
                <option value="PAM" id="PAM">PAM</option>
                <option value="SP+Name" id="SP+Name">SP Name</option>
              </select>
              <button type="submit" className="navIcon softGrad--primary">
                <img src={search} alt="search" />
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}


CustomerDashNav.propTypes ={
  recordView: propTypes.bool.isRequired,
  viewSelect: propTypes.func.isRequired,
  switchHandHandler: propTypes.func.isRequired,
  mobileHand: propTypes.string.isRequired,
  currentRecordView: propTypes.string.isRequired,
  closeRecordHandler: propTypes.func.isRequired,
  switchTableHandler: propTypes.func.isRequired,
  controlsModalToggle: propTypes.func.isRequired,
  currentRecord: propTypes.array.isRequired,
  citySet: propTypes.string.isRequired,
}
