import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';

import styles from './messages.scss';

class MessageList extends Component {
  render () {
    const {currentRoomMessages} = this.props;

    return (
      <ul className={styles.messageList}>
        {currentRoomMessages.map(message => {
          return (
            <MessageItem
              key={message.messageId}
              message={message}
            /> 
          );
        })}
      </ul>
    );
  }
}

MessageList.propTypes = {
  currentRoomMessages    : PropTypes.array
};

const mapStateToProps = state => ({
  currentRoomMessages : state.room.currentRoomMessages
});

export default connect(mapStateToProps)(MessageList);