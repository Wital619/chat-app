import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import FormGroup from './FormGroup';
import {firebase} from '../Firebase';

import * as routes from '../../routes';
import styles from './Form.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends Component {
  state = { ...INITIAL_STATE };

  handleInputChange = e => {
    const {name, value} = e.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);

      this.setState({ ...INITIAL_STATE });
      history.push(routes.CHAT);
    } catch (error) {
      this.setState({ error });
    }
  }

  render () {
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';

    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.handleFormSubmit}>
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
            Sign in
          </button>

          {error && <div className={styles.errorBlock}>{error.message}</div>}
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  history           : PropTypes.object.isRequired
};

export default compose(
  withRouter
)(LoginForm);