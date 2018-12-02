import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import FormGroup from '../controls/FormGroup';
import validate from './../../helpers/validator';

import styles from './forms.scss';

const RegistrationForm = ({
  handleSubmit, 
  pristine, 
  submitting
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <Field
      id="firstName"
      name="firstName"
      component={FormGroup}
      inputType="text"
      placeholder="First Name"
      labelText="First Name"
    />
    <Field
      id="lastName"
      name="lastName"
      component={FormGroup}
      inputType="text"
      placeholder="Last Name"
      labelText="Last Name"
    />
    <Field
      id="userName"
      name="userName"
      component={FormGroup}
      inputType="text"
      placeholder="User Name"
      labelText="User Name"
    />
    <Field
      id="password"
      name="password"
      component={FormGroup}
      inputType="password"
      placeholder="Password"
      labelText="Password"
    />
    <button 
      className={styles.confirmBtn} 
      type="submit" 
      disabled={pristine || submitting}
    >
      Submit
    </button>
  </form>
);

RegistrationForm.propTypes = {
  handleSubmit             : PropTypes.func.isRequired, 
  pristine                 : PropTypes.bool.isRequired,
  submitting               : PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'registration',
  validate
})(RegistrationForm);