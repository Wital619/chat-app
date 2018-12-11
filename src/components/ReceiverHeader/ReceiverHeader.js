import React from 'react';
import PropTypes from 'prop-types';

import styles from './ReceiverHeader.scss';

const ReceiverHeader = ({
  selectedUser
}) => (
  <header className={styles.receiverHeader}>
    <h1 className={styles.userName}>{selectedUser.displayName}</h1>
  </header>
);

ReceiverHeader.propTypes = {
  selectedUser           : PropTypes.object
};

export default ReceiverHeader;