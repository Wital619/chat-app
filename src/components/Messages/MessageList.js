import React from 'react';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';

import styles from './messages.scss';

const MessageList = ({
  messages
}) => (
  <ul className={styles.messageList}>
    {messages.map(message => {
      return (
        <MessageItem
          key={message.uid}
          message={message}
        /> 
      );
    })}
  </ul>
);

MessageList.propTypes = {
  messages : PropTypes.array.isRequired
};

export default MessageList;