import React from 'react';

import styles from './UserHeader.scss';

const UserHeader = () => (
  <header className={styles.userHeader}>
    <h3 className={styles.userData}>Vitaliy Pogoretskyy</h3>
  </header>
);

export default UserHeader;