import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.scss';

const UserItem = ({
  selectUser,
  user
}) => {

  return (
    <li 
      className={styles.userItem} 
      onClick={() => selectUser(user)}
    >
      <h4 className={styles.anotherUserName}>{user.displayName}</h4>
      <p className={styles.lastMessage}>Njer ojogre hgoeh oio ijej oerjo jgerjog e</p>
    </li>
  );
};

UserItem.propTypes = {
  user             : PropTypes.object.isRequired,
  selectUser       : PropTypes.func.isRequired
};

export default UserItem;