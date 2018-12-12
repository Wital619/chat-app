import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

import {selectUser} from '../../store/reducers/user';
import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './user.scss';
import { compose } from 'redux';
import { withFirebase } from '../Firebase';

class UserList extends Component {
  componentDidMount () {
    this.onListenForMessages();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.selectedUser.id !== this.props.selectedUser.id) {
      this.onListenForMessages();
    }
  }

  doSelectUser = selectedUser => {
    this.props.selectUser(selectedUser);
  };

  onListenForMessages = () => {
    const {
      firebase, 
      setCurrentRoomMessages, 
      authUser,
      selectedUser
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
    const {users} = this.props;

    return (
      <ul className={styles.userList}>
        {users && users.map(user => {
          return (
            <UserItem 
              key={user.id} 
              selectUser={this.doSelectUser}
              user={user}
            />
          );
        })}
      </ul>
    );
  }
}

UserList.propTypes = {
  firebase               : PropTypes.object,
  users                  : PropTypes.array,
  selectUser             : PropTypes.func.isRequired,
  authUser               : PropTypes.object.isRequired,
  selectedUser           : PropTypes.object,
  setCurrentRoomMessages : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedUser : state.user.selectedUser
});

const mapDispatchToProps = {
  selectUser,
  setCurrentRoomMessages
};

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(UserList);