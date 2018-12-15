import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import FormGroup from './FormGroup';
import {withFirebase} from '../Firebase';

import * as routes from '../../routes';
import styles from './form.scss';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: null,
};

class RegistrationForm extends Component {
  state = { ...INITIAL_STATE };

  handleInputChange = e => {
    const {name, value} = e.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const { email, password, firstName, lastName } = this.state;
    const { firebase, history } = this.props;

    try {
      const photoURL = await firebase.getImage('empry-icon.png').getDownloadURL();
      const {user} = await firebase.doCreateUserWithEmailAndPassword(email, password);

      await firebase.getUser(user.uid)
        .set({
          id: user.uid,
          email: user.email,
          displayName: `${firstName} ${lastName}`,
          photoURL
        });

      this.setState({ ...INITIAL_STATE });
      history.push(routes.CHAT);
    } catch (error) {
      this.setState({ error });
    }
  }

  render () {
    const {firstName, lastName, email, password, error} = this.state;
    const isInvalid = firstName === '' || lastName === '' || email === '' || password === '';

    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.handleFormSubmit}>
          <FormGroup
            id="firstName"
            name="firstName"
            placeholder="First Name"
            labelText="First Name"
            value={firstName}
            handleInputChange={this.handleInputChange}
          />
          <FormGroup
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            labelText="Last Name"
            value={lastName}
            handleInputChange={this.handleInputChange}
          />
          <FormGroup
            id="email"
            name="email"
            inputType="email"
            placeholder="Email"
            labelText="Email"
            value={email}
            handleInputChange={this.handleInputChange}
          />
          <FormGroup
            id="password"
            name="password"
            inputType="password"
            placeholder="Password"
            labelText="Password"
            value={password}
            handleInputChange={this.handleInputChange}
          />
          <button 
            className={styles.confirmBtn}
            disabled={isInvalid}
            type="submit" 
          >
            Sign Up
          </button>

          {error && <div className={styles.errorBlock}>{error.message}</div>}
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  history                  : PropTypes.object.isRequired,
  firebase                 : PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  withRouter
)(RegistrationForm);