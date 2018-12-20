import React from 'react';
import PropTypes from 'prop-types';

import styles from './Message.scss';

const MessageItem = ({
  message,
  isCurrUserSender
}) => {

  const messageClass = isCurrUserSender 
    ? `${styles.messageText} ${styles.messageTextAuthUser}`
    : `${styles.messageText} ${styles.messageTextSelectedUser}`;

  const itemClass = isCurrUserSender 
    ? `${styles.messageItem} ${styles.messageItemAuthUser}` 
    : `${styles.messageItem}`;

  const imageClass = isCurrUserSender 
    ? `${styles.messageImg} ${styles.messageImgAuthUser}`
    : `${styles.messageImg}`;

  return (
    <li className={itemClass}>
      <img 
        className={imageClass} 
        src={message.sender.photoURL} 
        title={message.sender.displayName} 
        alt='avatar' 
      />
      <div 
        className={messageClass} 
        title={message.timestamp}
      >
        {message.text}
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message             : PropTypes.object.isRequired,
  isCurrUserSender    : PropTypes.bool.isRequired
};

export default MessageItem;