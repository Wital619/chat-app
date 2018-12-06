import React from 'react';

import MessageItem from '../MessageItem/MessageItem';

import styles from './MessageList.scss';

const MessageList = () => (
  <ul className={styles.messageList}>
    <MessageItem />
    <MessageItem />
    <MessageItem />
  </ul>
);

export default MessageList;