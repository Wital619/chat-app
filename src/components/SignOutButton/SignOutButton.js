import React from 'react';

import { auth } from '../../firebase';

import styles from './SignOutButton.scss';

const SignOutButton = () => (
  <button onClick={auth.doSignOut} className={styles.signOutBtn}>
    Sign Out
  </button>
);

export default SignOutButton;