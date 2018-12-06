import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Header from '../Header';
import RegistrationForm from '../forms/RegistrationForm';
import LoginForm from '../forms/LoginForm';
import Chat from '../Chat';

import withAuthentication from '../Session/withAuthentication';
export { withAuthentication };

import * as routes from '../../routes';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path={routes.BASE} render={props => 
          <Redirect to={routes.SIGN_IN} {...props} />} 
        />
        <Route path={routes.SIGN_UP} component={() => <RegistrationForm />} />
        <Route path={routes.SIGN_IN} component={() => <LoginForm />} />
        <Route path={routes.CHAT} component={() => <Chat />} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);
