import React, {Component} from 'react';

import UserHeader from '../UserHeader';
import UserList from '../UserList';
import UserSearch from '../UserSearch';
import ReceiverHeader from '../ReceiverHeader';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';
import { withAuthorization } from '../Session';

import styles from './Chat.scss';

class Chat extends Component {

  render () {
    return (
      <main className={styles.main}>
        <aside className={styles.roomSection}>
          <UserHeader />
          <UserList />
          <UserSearch />
        </aside>
        <section className={styles.messageSection}>
          <ReceiverHeader />
          <MessageList />
          <MessageInput />
        </section>
      </main>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Chat);
