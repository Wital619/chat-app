import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

import {firebase} from '../Firebase';

import {handleFoundUsers} from '../../store/reducers/search';

import styles from './user.scss';

class UserSearch extends Component {
  getUsersMatches = e => {
    const {handleFoundUsers, authUser} = this.props;
    const {value} = e.target;

    if (e.target.value) {
      firebase
        .getUsers()
        .orderByChild('displayName')
        .startAt(value)
        .endAt(`${value}\uf8ff`)
        .on('value', snapshot => {
          const users = Object.values(snapshot.val() || {})
            .filter(user => user.id !== authUser.id);

          if (users.length) {
            handleFoundUsers(users);
          } else {
            handleFoundUsers([]);
          }
        });
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
  handleFoundUsers  : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  handleFoundUsers
};

export default connect(null, mapDispatchToProps)(UserSearch);