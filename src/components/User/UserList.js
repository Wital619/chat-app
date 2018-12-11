import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserItem from './UserItem';

import {selectUser} from '../../store/reducers/user';

import styles from './user.scss';

class UserList extends Component {
  
  render () {
    const {users, selectUser, selectedUser} = this.props;

    return (
      <ul className={styles.userList}>
        {users.map(user => {
          const isItSelectedUser = user.uid === selectedUser;

          return (
            <UserItem 
              key={user.uid} 
              selectUser={selectUser}
              isItSelectedUser={isItSelectedUser}
              user={user}
            />
          );
        })}
      </ul>
    );
  }
}

UserList.propTypes = {
  users            : PropTypes.array,
  selectedUser  : PropTypes.object,
  selectUser    : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedUser  : state.user.selectedUser
});

const mapDispatchToProps = {
  selectUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);