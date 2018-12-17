import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import ReceiverHeader from '../ReceiverHeader';
import {MessageList, MessageInput} from '../Message';
import {UserHeader, UserSearch, UserList} from '../User';

import {withFirebase} from '../Firebase';
import {withAuthorization} from '../Session';

import {setUsers} from '../../store/reducers/user';
import {setUserRooms} from '../../store/reducers/room';

import styles from './Chat.scss';

class Chat extends Component {
  componentDidMount () {
    this.props.firebase.getUsers().once('value');
    
    this.onListenForUsers();
  }

  /* componentDidUpdate () {
    this.onListenForUsers();
  } */

  componentWillUnmount () {
    this.props.firebase.getUserRooms().off();
  }

  onListenForUsers = () => {
    const {firebase, setUsers, authUser} = this.props;

    firebase
      .getUserRooms(authUser.id)
      .on('value', snapshot => {
        const usersIds = Object.keys(snapshot.val() || []);

        this.getUsersData(usersIds)
          .then(users => setUsers(users));
      });
  }

  getUsersData = async usersIds => {
    const users = [];

    await usersIds.forEach(async userId => {
      this.props.firebase
        .getUser(userId)
        .on('value', async snapshot => {
          await users.push(snapshot.val());
        });
    });

    return users;
  }

  render () {
    const {authUser, selectedUser, firebase} = this.props;

    return (
      <main className={styles.main}>
        <aside className={styles.roomSection}>
          <UserHeader authUser={authUser} />
          <UserList 
            selectedUser={selectedUser}
            authUser={authUser}
            firebase={firebase}
          />
          <UserSearch 
            firebase={firebase}
            authUser={authUser}
          />
        </aside>
        <section className={styles.messageSection}>
          <ReceiverHeader selectedUser={selectedUser} />
          <MessageList 
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
  firebase     : PropTypes.object.isRequired,
  authUser     : PropTypes.object.isRequired,
  selectedUser : PropTypes.object,
  setUsers     : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authUser       : state.session.authUser,
  selectedUser   : state.user.selectedUser
});

const mapDispatchToProps = {
  setUsers,
  setUserRooms
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
)(Chat);

