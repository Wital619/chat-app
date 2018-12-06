import React from 'react';

import styles from './MessageInput.scss';

const MessageInput = () => (
  <form className={styles.messageForm}>
    <input 
      className={styles.messageInput} 
      name='message' 
      title='message'
      placeholder='Type a message...' 
    />
  </form>
);

export default MessageInput;