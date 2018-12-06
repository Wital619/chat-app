import React from 'react';
import PropTypes from 'prop-types';

import styles from './FormGroup.scss';

const FormGroup = ({
  labelText, 
  id,
  name,
  placeholder, 
  inputType,
  value,
  handleInputChange
}) => {
  return (
    <div className={styles.formField}>
      <label className={styles.formLabel} htmlFor={id}>{labelText}</label>
      <input 
        className={`${styles.formInput}`} 
        id={id}
        name={name}
        type={inputType} 
        placeholder={`Type ${placeholder}`}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

FormGroup.propTypes = {
  labelText         : PropTypes.string.isRequired,
  id                : PropTypes.string.isRequired,
  name              : PropTypes.string.isRequired,
  placeholder       : PropTypes.string.isRequired,
  inputType         : PropTypes.string,
  value             : PropTypes.string.isRequired,
  handleInputChange : PropTypes.func.isRequired
};

FormGroup.defaultProps = {
  inputType            : 'text',
  value                : ''
};

export default FormGroup;