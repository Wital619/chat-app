import React from 'react';
import PropTypes from 'prop-types';

import styles from './User.scss';

const UserHeader = ({
  authUser
}) => (
  <header className={styles.userHeader}>
    <img className={styles.userAvatar} src={authUser.photoURL} alt='avatar' />
    <div className={styles.userInfo}>
      <h3 
        className={styles.userDisplayName} 
        title={authUser.displayName}
      >
        {authUser.displayName}
      </h3>
      <span 
        className={styles.userEmail} 
        title={authUser.email}
      >
        {authUser.email}
      </span>
    </div>
  </header>
);

UserHeader.propTypes = {
  authUser           : PropTypes.object.isRequired
};

export default UserHeader;