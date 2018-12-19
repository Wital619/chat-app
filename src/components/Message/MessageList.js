import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';
import {firebase} from '../Firebase';

import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './messages.scss';

class MessageList extends Component {
  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate (prevProps) {
    const {selectedUser} = this.props;

    const isSelectedUserChanged = prevProps.selectedUser.id !== selectedUser.id;

    if (isSelectedUserChanged) {
      this.onListenForMessages();
    }

    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const {scrollHeight, clientHeight} = this.messageList;
    const maxScrollTop = scrollHeight - clientHeight;

    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onListenForMessages = () => {
    const {
      setCurrentRoomMessages, 
      authUser,
      selectedUser,
    } = this.props;

    const roomId = selectedUser.id < authUser.id 
      ? selectedUser.id + authUser.id 
      : authUser.id + selectedUser.id;

    firebase
      .getRoomMessages(roomId)
      .on('value', snapshot => {
        const messagesObject = snapshot.val();

        const messages = Object.keys(messagesObject || {})
          .map(messageId => {
            const timestamp = new Date(messagesObject[messageId].timestamp)
              .toLocaleString();
            
            return {
              ...messagesObject[messageId],
              messageId,
              timestamp
            };
          });

        if (messages) {
          setCurrentRoomMessages(messages);
        }
      });
  };

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
  currentRoomMessages     : PropTypes.array,
  authUser                : PropTypes.object.isRequired,
  selectedUser            : PropTypes.object,
  setCurrentRoomMessages  : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentRoomMessages : state.room.currentRoomMessages
});

const mapDispatchToProps = {
  setCurrentRoomMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);