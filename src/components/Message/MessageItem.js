import React from 'react';
import PropTypes from 'prop-types';

import styles from './messages.scss';

const MessageItem = ({message}) => {

  return (
    <li className={styles.messageItem}>
      <div>{message.sender.displayName}</div>
      <div>{message.timestamp}</div>
      <div>{message.text}</div>
    </li>
  );
};

MessageItem.propTypes = {
  message             : PropTypes.object
};

export default MessageItem;