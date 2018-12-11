import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './messages.scss';

class MessageInput extends Component {
  state = {
    inputValue: ''
  };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  handleMessageCreate = e => {
    e.preventDefault();

    const {firebase, authUser} = this.props;

    firebase.getMessages().push({
      text: this.state.inputValue,
      userId: authUser.uid ,
      createdAt: firebase.serverValue.TIMESTAMP
    });

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
        />
      </form>
    );
  }
}

MessageInput.propTypes = {
  firebase             : PropTypes.object.isRequired,
  authUser             : PropTypes.object
};

export default MessageInput;