import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import * as routes from '../../routes';
import styles from './Header.scss';

const HeaderAuthUser = ({firebase}) => (
  <ul className={styles.nav}>
    <li className={styles.navItem}>
      <Link to={routes.CHAT}>Chat</Link>
    </li>
    <li className={styles.navItem}>
      <Link to={routes.PROFILE}>Profile</Link>
    </li>
    <li className={styles.navItem}>
      <a onClick={firebase.doSignOut}>Sign Out</a>
    </li>
  </ul>
);

HeaderAuthUser.propTypes = {
  firebase               : PropTypes.object
};

export default withFirebase(HeaderAuthUser);