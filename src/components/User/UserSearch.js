import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

import {firebase} from '../Firebase';

import {handleFoundUsers} from '../../store/reducers/search';

import styles from './user.scss';

class UserSearch extends Component {
  getUsersMatches = async e => {
    const {handleFoundUsers, authUser, users} = this.props;
    const {value} = e.target;

    if (e.target.value) {
      const snapshot = await firebase.getUsers()
        .orderByChild('displayName')
        .startAt(value)
        .endAt(`${value}\uf8ff`)
        .once('value');

      const usersIds = users.map(user => user.id);
      const foundUsers = Object.values(snapshot.val() || {})
        .filter(foundUser => !usersIds.includes(foundUser.id) && foundUser.id !== authUser.id);

      handleFoundUsers(foundUsers);
    } else {
      handleFoundUsers(null);
    }
  };

  render () {
    return (
      <form className={styles.userSearchForm}>
        <DebounceInput 
          className={styles.userSearchInput} 
          name='user-search' 
          title='user-search'
          placeholder='Seach users'
          minLength={0}
          debounceTimeout={300}
          onChange={this.getUsersMatches}
        />
      </form>
    );
  }
}

UserSearch.propTypes = {
  authUser          : PropTypes.object.isRequired,
  handleFoundUsers  : PropTypes.func.isRequired,
  users  : PropTypes.array
};

const mapStateToProps = state => ({
  users   :  state.user.users
});

const mapDispatchToProps = {
  handleFoundUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);