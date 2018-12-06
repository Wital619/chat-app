import React from 'react';

import styles from './UserItem.scss';

const UserItem = () => (
  <li className={styles.userItem}>
    <h4 className={styles.anotherUserName}>Vitaliy Pogoretskyy</h4>
    <p className={styles.lastMessage}>Njer ojogre hgoeh oio ijej oerjo jgerjog e</p>
  </li>
);

export default UserItem;