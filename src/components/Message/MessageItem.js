import React from 'react';
import PropTypes from 'prop-types';

import styles from './messages.scss';

const MessageItem = ({
  message,
  isCurrUserSender
}) => {

  const messageStyle = isCurrUserSender 
    ? styles.messageTextAuthUser 
    : styles.messageTextSelectedUser;

  const itemStyle = isCurrUserSender 
    ? styles.messageItemAuthUser 
    : null;

  const imageStyle = isCurrUserSender 
    ? styles.messageImgAuthUser 
    : null;

  return (
    <li className={`${styles.messageItem} ${itemStyle}`}>
      <img 
        className={`${styles.messageImg} ${imageStyle}`} 
        src={message.sender.photoURL} 
        title={message.sender.displayName} 
        alt='avatar' 
      />
      <div 
        className={`${styles.messageText} ${messageStyle}`} 
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