import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.scss';

const UserHeader = ({
  authUser
}) => (
  <header className={styles.userHeader}>
    <h3 className={styles.userDisplayName}>{authUser.displayName}</h3>
    <span className={styles.userEmail}>{authUser.email}</span>
  </header>
);

UserHeader.propTypes = {
  authUser           : PropTypes.object.isRequired
};

export default UserHeader;