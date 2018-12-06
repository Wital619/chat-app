import React from 'react';

import UserItem from '../UserItem';

import styles from './UserList.scss';

const UserList = () => (
  <ul className={styles.userList}>
    <UserItem />
    <UserItem />
    <UserItem />
  </ul>
);

export default UserList;