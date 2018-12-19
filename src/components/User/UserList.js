import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

import {selectUser} from '../../store/reducers/user';
import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './user.scss';

class UserList extends Component {
  componentDidUpdate () {
    const {users} = this.props;

    if (!this.isSelectedUserInit) {
      this.doSelectUser(users[0]);

      this.isSelectedUserInit = true;
    }
  }

  doSelectUser = selectedUser => {
    this.props.selectUser(selectedUser);
  };

  render () {
    const {users, foundUsers, selectedUser} = this.props;
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
              selectUser={this.doSelectUser}
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
  selectedUser           : PropTypes.object,
  setCurrentRoomMessages : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users         : state.user.users,
  selectedUser  : state.user.selectedUser,
  foundUsers    : state.search.foundUsers
});

const mapDispatchToProps = {
  selectUser,
  setCurrentRoomMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);