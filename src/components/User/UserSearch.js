import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {handleFoundUsers} from '../../store/reducers/search';

import styles from './user.scss';

class UserSearch extends Component {
  getUsersMatches = e => {
    const {firebase, handleFoundUsers, authUser} = this.props;
    const {value} = e.target;

    // console.log(e.target.value);

    if (e.target.value) {
      firebase.getUsers()
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
        <input 
          className={styles.userSearchInput} 
          name='user-search' 
          title='user-search'
          placeholder='Seach users'
          onKeyUp={this.getUsersMatches}
        />
      </form>
    );
  }
}

UserSearch.propTypes = {
  firebase          : PropTypes.object.isRequired,
  authUser          : PropTypes.object.isRequired,
  handleFoundUsers  : PropTypes.func.isRequired
};

const mapDispatchToProps = {
  handleFoundUsers
};

export default connect(null, mapDispatchToProps)(UserSearch);