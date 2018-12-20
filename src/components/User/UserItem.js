import React from 'react';
import PropTypes from 'prop-types';

import styles from './User.scss';

const UserItem = ({
  selectUser,
  user,
  isItSelectedUser
}) => {
  const classNames = isItSelectedUser 
    ? `${styles.userItem} ${styles.userSelectedItem}` 
    : styles.userItem;

  return (
    <li className={classNames} onClick={() => selectUser(user)}>
      <img className={styles.userItemAvatar} src={user.photoURL} alt='avatar' />
      {user.lastMessage && (
        <div className={styles.userItemInfo}>
          <h4 className={styles.userItemName}>{user.displayName}</h4>
          <p className={styles.userItemLastMessage}>
            {user.lastMessage.sender}: {user.lastMessage.text}
          </p>
        </div>
      )}
      {!user.lastMessage && (
        <h4 className={styles.userItemName}>{user.displayName}</h4>
      )}
    </li>
  );
};

UserItem.propTypes = {
  user               : PropTypes.object.isRequired,
  selectUser         : PropTypes.func.isRequired,
  isItSelectedUser   : PropTypes.bool.isRequired
};

export default UserItem;