import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import MessageList from './MessageList';

import {setMessages, setMessagesLimit} from '../../store/reducers/message';

import styles from './messages.scss';

class MessageContainer extends Component {
  state = {
    loading: false
  };

  componentDidMount () {
    if (this.props.messages.length) {
      this.setState({ loading: true });
    }

    this.onListenForMessages();
  }

  componentDidUpdate (props) {
    if (props.limit !== this.props.limit) {
      this.onListenForMessages();
    }
  }

  componentWillUnmount () {
    this.props.firebase.getUsers().off();
  }

  onListenForMessages = () => {
    const {firebase, setMessages, limit} = this.props;

    firebase
      .getMessages()
      .orderByChild('createdAt')
      .limitToLast(limit)
      .on('value', snapshot => {
        setMessages(snapshot.val());

        this.setState({ loading: false });
      });
  };

  handleNextPage = () => {
    const {setMessagesLimit, limit} = this.props;

    setMessagesLimit(limit + 5);
  }

  addUserToMessages = () => {
    const {messages, users} = this.props;

    return messages.map(message => {
      const foundUser = users.find(user => user.uid === message.userId);

      return {
        ...message,
        user: users && users.length 
          ? foundUser.displayName 
          : null
      };
    });
  };

  render () {
    const {messages} = this.props;
    const {loading} = this.state;

    return (
      <div className={styles.messageContainer}>
        {loading && <div>Loading ...</div>}

        {!loading && messages && (
          <button className={styles.loadMoreBtn} onClick={this.handleNextPage}>
            More
          </button>
        )}

        {messages && (
          <MessageList messages={this.addUserToMessages()} />
        )}

        {!messages && <div>There are no messages ...</div>}
      </div>
    );
  }
}

MessageContainer.propTypes = {
  firebase         : PropTypes.object.isRequired,
  users            : PropTypes.array,
  messages         : PropTypes.array,
  limit            : PropTypes.number.isRequired,
  setMessages      : PropTypes.func.isRequired,
  setMessagesLimit : PropTypes.func.isRequired
};

const addUidToMessages = messages => {
  return Object.keys(messages || {})
    .map(key => ({
      ...messages[key],
      uid: key
    }));
};

const mapStateToProps = state => ({
  limit: state.message.limit,
  messages: addUidToMessages(state.message.messages)
});

const mapDispatchToProps = {
  setMessages,
  setMessagesLimit
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MessageContainer);