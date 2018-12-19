import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import {firebase} from '../Firebase';

import {selectUser} from '../../store/reducers/user';
import styles from './messages.scss';

class MessageInput extends Component {
  state = {
    inputValue: ''
  };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  handleMessageCreate = e => {
    e.preventDefault();

    const {authUser, selectedUser} = this.props;
    const {inputValue} = this.state;

    if (authUser.id && selectedUser.id && inputValue) {
      const roomId = selectedUser.id < authUser.id 
        ? selectedUser.id + authUser.id 
        : authUser.id + selectedUser.id;

      firebase.getRoomMessages(roomId).push({
        text: inputValue,
        sender: {...authUser},
        timestamp: firebase.serverValue.TIMESTAMP
      });

      firebase.getUserRooms(authUser.id)
        .child(selectedUser.id)
        .set(selectedUser.id);

      firebase.getUserRooms(selectedUser.id)
        .child(authUser.id)
        .set(authUser.id);
    }

    this.setState({ inputValue: '' });
  };

  render () {
    return (
      <form className={styles.messageForm} onSubmit={this.handleMessageCreate}>
        <input 
          className={styles.messageInput} 
          name='message' 
          title='message'
          placeholder='Type a message...'
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          ref={node => node && node.focus()}
        />
      </form>
    );
  }
}

MessageInput.propTypes = {
  authUser             : PropTypes.object,
  selectedUser         : PropTypes.object
};

const mapDispatchToProps = {
  selectUser
};

export default compose(
  connect(null, mapDispatchToProps)
)(MessageInput);