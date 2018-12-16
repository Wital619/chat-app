import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.scss';

const UserItem = ({
  selectUser,
  user
}) => {

  return (
    <li className={styles.userItem} onClick={() => selectUser(user)}>
      <img className={styles.userItemAvatar} src={user.photoURL} alt='avatar' />
      <div className={styles.userItemInfo}>
        <h4 className={styles.userItemName} title={user.displayName}>{user.displayName}</h4>
        <p className={styles.userItemLastMessage}>Njer ojogre hgoeh oio ijej oerjo jgerjog e</p>
      </div>
    </li>
  );
};

UserItem.propTypes = {
  user             : PropTypes.object.isRequired,
  selectUser       : PropTypes.func.isRequired
};

export default UserItem;