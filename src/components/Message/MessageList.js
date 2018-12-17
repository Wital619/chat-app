import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';

import styles from './messages.scss';

class MessageList extends Component {
  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const {scrollHeight, clientHeight} = this.messageList;
    const maxScrollTop = scrollHeight - clientHeight;

    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render () {
    const {currentRoomMessages, authUser} = this.props;

    return (
      <ul className={styles.messageList} ref={node => this.messageList = node}>
        {currentRoomMessages.map(message => {
          return (
            <MessageItem
              key={message.messageId}
              message={message}
              isCurrUserSender={message.sender.id === authUser.id}
            /> 
          );
        })}
      </ul>
    );
  }
}

MessageList.propTypes = {
  currentRoomMessages : PropTypes.array,
  authUser            : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentRoomMessages : state.room.currentRoomMessages
});

export default connect(mapStateToProps)(MessageList);