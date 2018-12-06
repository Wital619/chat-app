import React from 'react';
import {Link} from 'react-router-dom';

import { auth } from '../../firebase';

import * as routes from '../../routes';
import styles from './Header.scss';

const HeaderAuthUser = () => (
  <ul className={styles.nav}>
    <li className={styles.navItem}>
      <Link to={routes.CHAT}>Chat</Link>
    </li>
    <li className={styles.navItem}>
      <a onClick={auth.doSignOut}>Sign Out</a>
    </li>
  </ul>
);

export default HeaderAuthUser;