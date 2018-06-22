import React, { Component, PureComponent } from 'react';
import './styles/App.css';
import axios from 'axios';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import ApiConfig from './config'


import TampaCustomers from './CustomerService/TampaCustomers';
import OrlandoCustomers from './CustomerService/OrlandoCustomers';
import BaseSelect from './BaseSelect/BaseSelect';


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


          <Route exact path='/orlando/customer-service/:recordId' component={bindRouteParamsToProps()(OrlandoCustomers)} />
          <Route path='/orlando/customer-service/' component={OrlandoCustomers} />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
