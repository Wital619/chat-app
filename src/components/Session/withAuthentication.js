import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {firebase} from '../Firebase';

import {setAuthUser} from '../../store/reducers/session';
import {logoutUser} from '../../store/reducers';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount () {
      const {setAuthUser, logoutUser} = this.props;

      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          logoutUser();
        },
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

  return compose(
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
