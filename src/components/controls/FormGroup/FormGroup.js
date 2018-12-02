import React from 'react';
import PropTypes from 'prop-types';

import styles from './FormGroup.scss';

const FormGroup = ({
  input, 
  labelText, 
  id, 
  placeholder, 
  inputType,
  meta: { 
    touched, 
    error,
    warning
  }
}) => {
  const isThereError = (touched && (error || warning)) === 'Required';

  return (
    <div className={styles.formField}>
      <label className={styles.formLabel} htmlFor={id}>{labelText}</label>
      <input 
        className={`${styles.formInput} ${isThereError ? styles.formInputError : null}`} 
        id={id}
        type={inputType} 
        placeholder={`Type ${placeholder}`} 
        {...input}
      />
      {touched && (error || warning)}
    </div>
  );
};

FormGroup.propTypes = {
  input             : PropTypes.object.isRequired,
  labelText         : PropTypes.string.isRequired,
  id                : PropTypes.string.isRequired,
  placeholder       : PropTypes.string.isRequired,
  inputType         : PropTypes.string,
  meta              : PropTypes.object
};

FormGroup.defaultProps = {
  inputType            : 'text',
  value                : ''
};

export default FormGroup;