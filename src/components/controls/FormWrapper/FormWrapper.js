import React, {Component} from 'react';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';

import RegistrationForm from '../../forms/RegistrationForm';
import LoginForm from '../../forms/LoginForm';

import styles from './FormWrapper.scss';

class FormWrapper extends Component {
  handleFormSubmit = formData => {
    alert(JSON.stringify(formData));
  }

  render () {
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <ul className={styles.formTabs}>
            <NavLink
              to='/login'
              className={styles.formTab} 
              activeClassName={styles.formTabActive}
            >
              Sign in
            </NavLink>
            <NavLink 
              to='/register'
              className={styles.formTab} 
              activeClassName={styles.formTabActive}
            >
              Sign up
            </NavLink>
          </ul>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='login' />} />
            <Route path='/register' render={props => 
              <RegistrationForm {...props} onSubmit={this.handleFormSubmit} />} 
            />
            <Route path='/login' render={props => 
              <LoginForm {...props} onSubmit={this.handleFormSubmit} />} 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default FormWrapper;