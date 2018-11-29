import React from 'react';

import styles from './RegistrationForm.scss';

const RegistrationForm = () => (
  <div className={styles.wrapper}>
    <div className={styles.regFormHeader}>Sign up</div>
    <div className={styles.regFormWrapper}>
      <form className={styles.regForm}>
        <div className={styles.regFormField}>
          <label className={styles.regFormLabel} htmlFor='username'>Username</label>
          <input 
            className={styles.regFormInput} 
            id='username' type='text' 
            placeholder='Type username' 
          />
        </div>
        <div className={styles.regFormField}>
          <label className={styles.regFormLabel} htmlFor='password'>Password</label>
          <input 
            className={styles.regFormInput} 
            id='password' type='password' 
            placeholder='Type password' 
          />
        </div>
        <button className={styles.regFormSignUpBtn}>Sign up</button>
      </form>
      <div className={styles.login}>
        <h4 className={styles.haveAccountCapture}>Already have an account?</h4>
        <button className={styles.signInBtn}>Sign in</button>
      </div>
    </div>
  </div>
);

export default RegistrationForm;
