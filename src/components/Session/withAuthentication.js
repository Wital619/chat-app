import React from 'react';
import { connect } from 'react-redux';

import {firebase} from '../Firebase';

import {setAuthUser} from '../../store/reducers/session';
import {logoutUser} from '../../store/reducers';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount () {
      const {setAuthUser, logoutUser} = this.props;

      this.listener = firebase.onAuthUserListener(
        authUser => setAuthUser(authUser),
        () => logoutUser()
      );
    }

    componentWillUnmount () {
      this.listener();
    }

    render () {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = {
    setAuthUser,
    logoutUser
  };

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
