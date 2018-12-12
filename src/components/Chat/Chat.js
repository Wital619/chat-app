import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import ReceiverHeader from '../ReceiverHeader';
import {MessageContainer, MessageInput} from '../Message';
import {UserHeader, UserSearch, UserList} from '../User';

import { withFirebase } from '../Firebase';
import {withAuthorization} from '../Session';

import {setUsers} from '../../store/reducers/user';

import styles from './Chat.scss';

class Chat extends Component {
  componentDidMount () {
    const {firebase, setUsers, authUser} = this.props;

    firebase.getUsers().on('value', snapshot => {
      const users = Object
        .values(snapshot.val())
        .filter(user => user.id !== authUser.id);

      setUsers(users);
    });
  }

  componentWillUnmount () {
    this.props.firebase.getUsers().off();
  }

  render () {
    const {users, authUser, selectedUser} = this.props;

    return (
      <main className={styles.main}>
        <aside className={styles.roomSection}>
          <UserHeader authUser={authUser} />
          <UserList 
            users={users} 
            selectedUser={selectedUser}
            authUser={authUser}
          />
          <UserSearch />
        </aside>
        <section className={styles.messageSection}>
          <ReceiverHeader selectedUser={selectedUser} />
          <MessageContainer 
            users={users}
            selectedUser={selectedUser}
            authUser={authUser}
          />
          <MessageInput 
            selectedUser={selectedUser}
            authUser={authUser}
          />
        </section>
      </main>
    );
  }
}

Chat.propTypes = {
  firebase     : PropTypes.object,
  users        : PropTypes.array,
  authUser     : PropTypes.object,
  selectedUser : PropTypes.object,
  setUsers     : PropTypes.func
};

const mapStateToProps = state => ({
  users          : state.user.users,
  authUser       : state.session.authUser,
  selectedUser   : state.user.selectedUser
});

const mapDispatchToProps = {
  setUsers
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
)(Chat);

