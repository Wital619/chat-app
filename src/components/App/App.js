import React, {Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from '../Header';
import {RegistrationForm, LoginForm} from '../Form';
import Chat from '../Chat';
import Profile from '../Profile';
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
        <Route path={routes.PROFILE} component={Profile} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default withAuthentication(App);
