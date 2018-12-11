import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.scss';

const UserItem = ({
  selectUser,
  isItSelectedUser,
  user
}) => {
  const userItemClasses = `${styles.userItem} ${isItSelectedUser ? styles.userSelectedItem : null}`;

  return (
    <li 
      className={userItemClasses} 
      onClick={() => selectUser(user)}
    >
      <h4 className={styles.anotherUserName}>{user.displayName}</h4>
      <p className={styles.lastMessage}>Njer ojogre hgoeh oio ijej oerjo jgerjog e</p>
    </li>
  );
};

UserItem.propTypes = {
  user             : PropTypes.object.isRequired,
  isItSelectedUser : PropTypes.bool.isRequired,
  selectUser       : PropTypes.func.isRequired
};

export default UserItem;