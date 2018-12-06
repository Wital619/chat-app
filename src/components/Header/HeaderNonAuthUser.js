import React from 'react';
import {Link} from 'react-router-dom';

import * as routes from '../../routes';
import styles from './Header.scss';

const HeaderNonAuthUser = () => (
  <ul className={styles.nav}>
    <li className={styles.navItem}>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li className={styles.navItem}>
      <Link to={routes.SIGN_UP}>Sign up</Link>
    </li>
  </ul>
);

export default HeaderNonAuthUser;