import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import AvatarPicker from './AvatarPicker';
import Preloader from '../Preloader/Preloader';
import {firebase} from '../Firebase';
import {withAuthorization} from '../Session';

import {setAuthUser} from '../../store/reducers/session';

import styles from './Profile.scss';

class Profile extends Component {
  state = {
    loading: false
  };

  isMounted = true;

  componentWillUnmount (){
    this.isMounted = false;
  }

  handleUpdateAvatar = async imageData => {
    const {authUser, setAuthUser} = this.props;

    this.setState({ loading: true });

    try {
      const snapshot = await firebase.getImage(imageData.name).put(imageData);
      const photoURL = await snapshot.ref.getDownloadURL();

      await firebase
        .getUser(authUser.id)
        .update({ photoURL });

      const newUserData = {
        ...authUser,
        photoURL
      };

      setAuthUser(newUserData);

      if (this.isMounted) {
        this.setState({ loading: false });
      }
    } catch (err) {
      alert('An error was occured !');
    }
  };

  render () {
    const {loading} = this.state;

    return (
      <div className={styles.profileWrapper}>
        {!loading && <AvatarPicker handleUpdateAvatar={this.handleUpdateAvatar}/>}
        {loading && <Preloader />}
      </div>
    );
  }
}

Profile.propTypes = {
  authUser        : PropTypes.object.isRequired,
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
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
)(Profile);