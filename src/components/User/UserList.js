import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserItem from './UserItem';
import {firebase} from '../Firebase';

import {selectUser, setUsers} from '../../store/reducers/user';

import styles from './User.scss';

class UserList extends Component {
  userWasSelected = false;

  componentDidMount () {
    this.onListenForUsers();
  }

  componentDidUpdate () {
    const {users, selectUser} = this.props;

    if (!this.userWasSelected && users.length) {
      selectUser(users[0]);

      this.userWasSelected = true;
    }
  }

  componentWillUnmount () {
    firebase.getUserRooms().off();
  }

  onListenForUsers = async () => {
    const {setUsers, authUser} = this.props;

    firebase
      .getUserRooms(authUser.id)
      .on('value', async snapshot => {
        const usersIds = Object.keys(snapshot.val() || []);
        const users = await this.getUsersData(usersIds);

        const usersWithLastMessage = users.map(user => {
          const userRooms = user.rooms;
  
          if (userRooms && 
            userRooms[authUser.id] && 
            userRooms[authUser.id].last_message) {

            return {
              ...user,
              rooms: null,
              lastMessage: userRooms[authUser.id].last_message
            };
          }
        }).sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

        setUsers(usersWithLastMessage);
      });
  }

  getUsersData = usersIds => {
    return Promise.all(usersIds.map(async userId => {
      const userRef = firebase.getUser(userId);
      const snapshot = await userRef.once('value');
      const user = snapshot.val();

      return user;
    }));
  }

  render () {
    const {users, foundUsers, selectedUser, selectUser} = this.props;
    let usersList;

    const showFoundUsers = foundUsers && foundUsers.length;
    const showUsers = users.length && !foundUsers;
    const showCorrespondedNotify = !users.length && !foundUsers;
    const showNotFoundNotify = foundUsers && !foundUsers.length;

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
              selectUser={selectUser}
              isItSelectedUser={user.id === selectedUser.id}
              user={user}
            />
          );
        })}
      </ul>
    );
  }
}

UserList.propTypes = {
  users                  : PropTypes.array,
  foundUsers             : PropTypes.array,
  selectUser             : PropTypes.func.isRequired,
  authUser               : PropTypes.object.isRequired,
  selectedUser           : PropTypes.object
};

const mapStateToProps = state => ({
  users         : state.user.users,
  foundUsers    : state.search.foundUsers
});

const mapDispatchToProps = {
  setUsers,
  selectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);