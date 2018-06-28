import React, { Component, PureComponent } from 'react';
import './styles/App.css';
import axios from 'axios';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import ApiConfig from './config'


import BaseSelect from './BaseSelect/BaseSelect';

import TampaCustomers from './CustomerService/TampaCustomers';
import TampaSales from './Sales/TampaSales';
import TampaFranchisees from './Franchisees/TampaFranchisees';

import OrlandoCustomers from './CustomerService/OrlandoCustomers';
import OrlandoSales from './Sales/OrlandoSales';
import OrlandoFranchisees from './Franchisees/OrlandoFranchisees';


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
          <Route exact path='/' component={BaseSelect} />

          <Route exact path='/tampa/customer-service/:recordId' component={bindRouteParamsToProps()(TampaCustomers)} />
          <Route path='/tampa/customer-service/' component={TampaCustomers} />
          <Route exact path='/tampa/sales/:recordId' component={bindRouteParamsToProps()(TampaSales)} />
          <Route path='/tampa/sales/' component={TampaSales} />
          <Route exact path='/tampa/franchisees/:recordId' component={bindRouteParamsToProps()(TampaFranchisees)} />
          <Route path='/tampa/franchisees/' component={TampaFranchisees} />

          <Route exact path='/orlando/customer-service/:recordId' component={bindRouteParamsToProps()(OrlandoCustomers)} />
          <Route path='/orlando/customer-service/' component={OrlandoCustomers} />
          <Route exact path='/orlando/sales/:recordId' component={bindRouteParamsToProps()(OrlandoSales)} />
          <Route path='/orlando/sales/' component={OrlandoSales} />
          <Route exact path='/orlando/franchisees/:recordId' component={bindRouteParamsToProps()(OrlandoFranchisees)} />
          <Route path='/orlando/franchisees/' component={OrlandoFranchisees} />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
