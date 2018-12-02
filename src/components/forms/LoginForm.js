import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import FormGroup from '../controls/FormGroup';
import validate from './../../helpers/validator';

import styles from './forms.scss';

const LoginForm = ({
  handleSubmit, 
  pristine, 
  submitting
}) => (
  <form className={styles.form} onSubmit={e => handleSubmit(e)}>
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

LoginForm.propTypes = {
  handleSubmit             : PropTypes.func.isRequired, 
  pristine                 : PropTypes.bool.isRequired,
  submitting               : PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);