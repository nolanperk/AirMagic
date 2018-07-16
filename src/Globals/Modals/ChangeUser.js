import React, { Component } from 'react';
import propTypes from 'prop-types';

import exit from '../../assets/icons/white/exit.png';

export default class ChangeUser extends Component {
  // Render
  // ----------------------------------------------------
  render() {

    let formattedName = this.state.userName.replace(/ /g, ' ')


    return (
      <div className="UserModal modalInner">
         <div className="modalTitle">
           <h4>Who Are You?</h4>

           <div className="navIcon softGrad--primary" onClick={this.props.controlsModalToggle}>
             <img src={exit} alt="exit" />
           </div>


         </div><div className="filterSearch">
         </div>

         <ul id="userList">
           <li
            onClick={this.userChangeHandler}
            id={this.state.userName}
          >
            {formattedName}</li>
           <li
             onClick={this.userChangeHandler}
             id="Canceled"
           >Canceled</li>
           <li
             onClick={this.userChangeHandler}
             id="New+Startups"
           >Tampa Customer Service Export</li>
         </ul>

         <div className="newFilterTrigger">
           <div className="btn softGrad--secondary" onClick={this.props.userSubmitHandler}>Submit</div>
         </div>
       </div>
    );
  }
}


ChangeUser.propTypes = {
  controlsModalToggle: propTypes.func.isRequired,
  userChangeHandler: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
  userSubmitHandler: propTypes.func.isRequired,
}
