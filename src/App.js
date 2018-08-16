import React, { Component, PureComponent } from 'react';
import './styles/App.css';
import axios from 'axios';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import ApiConfig from './config'


import BaseSelect from './BaseSelect/BaseSelect';
import LoginForm from './BaseSelect/Log';

import UserBaseSelect from './UserBaseSelect/UserBaseSelect';
import OutsideLoginForm from './UserBaseSelect/Log';

import CustomerService from './CustomerService/CustomerService';
import Sales from './Sales/Sales';
import OutsideSales from './Sales/OutsideSales';
import Franchisees from './Franchisees/Franchisees';

// import OrlandoCustomers from './CustomerService/OrlandoCustomers';
// import OrlandoSales from './Sales/OrlandoSales';
// import OrlandoFranchisees from './Franchisees/OrlandoFranchisees';


// import bindRouteParamsToProps from 'helpers/bindRouteParamsToProps';


function bindRouteParamsToProps() {
  return function(EmbedClass) {
    const klass = class extends PureComponent {
      render() {
        const routeParams = this.props.match.params || {};
        return <EmbedClass {...routeParams} {...this.props} />
      }
    };

    return klass;
  }
}
axios.defaults.headers.common['Authorization'] = 'Bearer ' + ApiConfig();


class App extends Component {
  // Render
  // ----------------------------------------------------
  render() {

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path='/login'  component={bindRouteParamsToProps()(LoginForm)} />
          <Route exact path='/outside-login'  component={bindRouteParamsToProps()(OutsideLoginForm)} />
          <Route exact path='/' component={BaseSelect} />
          <Route exact path='/:outside' component={UserBaseSelect} />

          <Route exact path='/:citySet/customer-service/:recordId' component={bindRouteParamsToProps()(CustomerService)} />
          <Route path='/:citySet/customer-service/' component={bindRouteParamsToProps()(CustomerService)} />
          <Route exact path='/:citySet/sales/:recordId' component={bindRouteParamsToProps()(Sales)} />
          <Route path='/:citySet/sales/' component={bindRouteParamsToProps()(Sales)} />

          <Route exact path='/:citySet/franchisees/:recordId' component={bindRouteParamsToProps()(Franchisees)} />
          <Route path='/:citySet/franchisees/' component={bindRouteParamsToProps()(Franchisees)} />


          <Route exact path='/:outside/:citySet/:recordId' component={bindRouteParamsToProps()(OutsideSales)} />
          <Route path='/:outside/:citySet/' component={bindRouteParamsToProps()(OutsideSales)} />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
