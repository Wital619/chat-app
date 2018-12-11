import React from 'react';
import PropTypes from 'prop-types';

import styles from './messages.scss';

const MessageItem = ({message}) => {

  return (
    <li className={styles.messageItem}>
      <strong>{message.user}</strong>
      {message.text}
    </li>
  );
};

MessageItem.propTypes = {
  message             : PropTypes.object
};

export default MessageItem;