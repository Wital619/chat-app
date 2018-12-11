import React, {Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from '../Header';
import RegistrationForm from '../forms/RegistrationForm';
import LoginForm from '../forms/LoginForm';
import Chat from '../Chat';

import {withAuthentication} from '../Session';

import * as routes from '../../routes';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path={routes.BASE} render={props => 
          <Redirect to={routes.CHAT} {...props} />} 
        />
        <Route path={routes.SIGN_UP} component={RegistrationForm} />
        <Route path={routes.SIGN_IN} component={LoginForm} />
        <Route path={routes.CHAT} component={Chat} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default withAuthentication(App);
