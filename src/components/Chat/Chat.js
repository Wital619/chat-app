import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import ReceiverHeader from '../ReceiverHeader';
import {MessageList, MessageInput} from '../Message';
import {UserHeader, UserSearch, UserList} from '../User';

import {withAuthorization} from '../Session';

import styles from './Chat.scss';

const Chat = ({
  authUser, 
  selectedUser
}) => {
  return (
    <main className={styles.main}>
      <aside className={styles.roomSection}>
        <UserHeader authUser={authUser} />
        <UserList selectedUser={selectedUser} authUser={authUser} />
        <UserSearch authUser={authUser} />
      </aside>
      <section className={styles.messageSection}>
        <ReceiverHeader selectedUser={selectedUser} />
        <MessageList selectedUser={selectedUser} authUser={authUser} />
        <MessageInput selectedUser={selectedUser} authUser={authUser} />
      </section>
    </main>
  );
};

Chat.propTypes = {
  authUser     : PropTypes.object.isRequired,
  selectedUser : PropTypes.object
};

const mapStateToProps = state => ({
  authUser       : state.session.authUser,
  selectedUser   : state.user.selectedUser
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition),
)(Chat);

