import React from 'react';
import headerAvatar from '../../icons/vitaliy-avatar.jpg';

import styles from './Header.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerUser}>
      <div className={styles.headerAvatarWrapper}>
        <img className={styles.headerAvatar} src={headerAvatar} alt="avatar"/>
      </div>
      <div>Vitaliy</div>
    </div>
    <div className={styles.topButtons}>
      <button>Sign in</button>
      <button>Sign up</button>
    </div>
  </header>
);

export default Header;
