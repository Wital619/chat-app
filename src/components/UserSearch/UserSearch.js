import React from 'react';

import styles from './UserSearch.scss';

const UserSearch = () => (
  <form className={styles.userSearchForm}>
    <input 
      className={styles.userSearchInput} 
      name='user-search' 
      title='user-search'
      placeholder='Seach users'
    />
  </form>
);

export default UserSearch;