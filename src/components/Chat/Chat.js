import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import UserHeader from '../UserHeader';
import UserList from '../UserList';
import UserSearch from '../UserSearch';
import ReceiverHeader from '../ReceiverHeader';
import {MessageContainer, MessageInput} from '../Messages';

import { withFirebase } from '../Firebase';
import {withAuthorization} from '../Session';

import {setUsers} from '../../store/reducers/user';

import styles from './Chat.scss';

class Chat extends Component {
  componentDidMount () {
    const {firebase, setUsers} = this.props;

    firebase.getUsers().on('value', snapshot => {
      setUsers(snapshot.val());
    });
  }

  componentWillUnmount () {
    this.props.firebase.getUsers().off();
  }

  render () {
    const {users, firebase, authUser} = this.props;

    return (
      <main className={styles.main}>
        <aside className={styles.roomSection}>
          <UserHeader />
          <UserList />
          <UserSearch />
        </aside>
        <section className={styles.messageSection}>
          <ReceiverHeader />
          <MessageContainer users={users} firebase={firebase} />
          <MessageInput firebase={firebase} authUser={authUser} />
        </section>
      </main>
    );
  }
}

Chat.propTypes = {
  firebase     : PropTypes.object,
  users        : PropTypes.object,
  authUser     : PropTypes.object,
  setUsers     : PropTypes.func
};

const mapStateToProps = state => ({
  users      : state.user.users,
  authUser   : state.session.authUser,
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

