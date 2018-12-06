import React from 'react';
import PropTypes from 'prop-types';

import HeaderAuthUser from './HeaderAuthUser';
import HeaderNonAuthUser from './HeaderNonAuthUser';

import styles from './Header.scss';

const Header = (props, { authUser }) => (
  <div className={styles.header}>
    {authUser ? <HeaderAuthUser /> : <HeaderNonAuthUser />}
  </div>
);

Header.contextTypes = {
  authUser          : PropTypes.object
};

export default Header;