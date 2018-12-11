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

  handleMessages = () => {
    const {messages, users} = this.props;

    const mess = messages.map(message => {
      return {
        ...message,
        user: users
          ? users[message.userId].displayName
          : null,
      };
    });

    return mess;
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
          <MessageList messages={this.handleMessages()} />
        )}

        {!messages && <div>There are no messages ...</div>}
      </div>
    );
  }
}

MessageContainer.propTypes = {
  firebase         : PropTypes.object.isRequired,
  users            : PropTypes.object,
  authUser         : PropTypes.object,
  messages         : PropTypes.array,
  limit            : PropTypes.number.isRequired,
  setMessages      : PropTypes.func.isRequired,
  setMessagesLimit : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authUser: state.user.authUser,
  limit: state.message.limit,
  messages: Object.keys(state.message.messages || {})
    .map(key => ({
      ...state.message.messages[key],
      uid: key
    })),
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