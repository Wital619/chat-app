import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import MessageList from './MessageList';

import { withFirebase } from '../Firebase';
import {setCurrentRoomMessages} from '../../store/reducers/room';

import styles from './messages.scss';

class MessageContainer extends Component {
  state = {
    loading: false
  };

  render () {
    const {currentRoomMessages} = this.props;
    const {loading} = this.state;

    return (
      <div className={styles.messageContainer}>
        {loading && <div>Loading ...</div>}

        {!loading && currentRoomMessages && (
          <button className={styles.loadMoreBtn} onClick={this.handleNextPage}>
            More
          </button>
        )}

        {currentRoomMessages && (
          <MessageList messages={currentRoomMessages} />
        )}

        {!currentRoomMessages && <div>There are no messages ...</div>}
      </div>
    );
  }
}

MessageContainer.propTypes = {
  firebase               : PropTypes.object.isRequired,
  selectedUser           : PropTypes.object,
  authUser               : PropTypes.object,
  setCurrentRoomMessages : PropTypes.func.isRequired,
  currentRoomMessages    : PropTypes.array
};

const mapStateToProps = state => ({
  currentRoomMessages : state.room.currentRoomMessages
});

const mapDispatchToProps = {
  setCurrentRoomMessages
};

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MessageContainer);