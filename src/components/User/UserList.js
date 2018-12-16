import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

import {selectUser} from '../../store/reducers/user';
import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './user.scss';

class UserList extends Component {
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
    const {users, foundUsers} = this.props;
    let usersList;

    const showFoundUsers = foundUsers && foundUsers.length;
    const showUsers = users.length && !foundUsers;
    const showCorrespondedNotify = !users.length && !foundUsers;
    const showNotFoundNotify = !users.length && foundUsers && !foundUsers.length;

    if (showUsers) {
      usersList = users;
    } else if (showFoundUsers) {
      usersList = foundUsers;
    } else if (showCorrespondedNotify) {
      return (
        <div className={styles.userCentralNotify}>
          You haven&apos;t corresponded with anyone
        </div>
      );
    } else if (showNotFoundNotify) {
      return <div className={styles.userCentralNotify}>Users not found</div>;
    }

    return (
      <ul className={styles.userList}>
        {usersList.map(user => {
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
  firebase               : PropTypes.object.isRequired,
  users                  : PropTypes.array,
  foundUsers             : PropTypes.array,
  selectUser             : PropTypes.func.isRequired,
  authUser               : PropTypes.object.isRequired,
  selectedUser           : PropTypes.object,
  setCurrentRoomMessages : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users       : state.user.users,
  foundUsers  : state.search.foundUsers
});

const mapDispatchToProps = {
  selectUser,
  setCurrentRoomMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);