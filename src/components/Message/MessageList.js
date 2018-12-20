import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';
import {firebase} from '../Firebase';

import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './Message.scss';

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
      selectedUser
    } = this.props;

    firebase
      .getUserRooms(authUser.id)
      .child(selectedUser.id)
      .child('messages')
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

        if (messages.length) {
          setCurrentRoomMessages(messages);
        }
      });
  };

  componentWillUnmount () {
    firebase.getUserRooms().off();
  }

  render () {
    const {currentRoomMessages, authUser} = this.props;

    return (
      <ul className={styles.messageList} ref={node => this.messageList = node}>
        {currentRoomMessages.map(message => (
          <MessageItem
            key={message.messageId}
            message={message}
            isCurrUserSender={message.sender.id === authUser.id}
          /> 
        ))}
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