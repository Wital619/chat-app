import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import AvatarPicker from './AvatarPicker';

import {withFirebase} from '../Firebase';
import {withAuthorization} from '../Session';

import {setAuthUser} from '../../store/reducers/session';

import styles from './profile.scss';

class Profile extends Component {

  handleUpdateAvatar = async imageData => {
    const {firebase, authUser, setAuthUser} = this.props;

    try {
      const snapshot = await firebase.getImage(imageData.name).put(imageData);
      const photoURL = await snapshot.ref.getDownloadURL();

      await firebase.getUser(authUser.id).update({photoURL});

      const newUserData = {
        ...authUser,
        photoURL
      };

      localStorage.setItem('authUser', JSON.stringify(newUserData));
      setAuthUser(newUserData);

      alert('The avatar image has been updated successfully !');
    } catch (err) {
      alert('An error was occured !');
    }
  };

  render () {
    return (
      <div className={styles.profileWrapper}>
        <AvatarPicker handleUpdateAvatar={this.handleUpdateAvatar}/>
      </div>
    );
  }
}

Profile.propTypes = {
  authUser        : PropTypes.object.isRequired,
  firebase        : PropTypes.object.isRequired,
  setAuthUser     : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser       : state.session.authUser
});

const mapDispatchToProps = {
  setAuthUser
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
)(Profile);