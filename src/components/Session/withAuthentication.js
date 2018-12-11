import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

// import {setAuthUser} from '../../store/reducers/session';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor (...args) {
      super(...args);

      this.props.onSetAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount () {
      const {firebase, onSetAuthUser} = this.props;

      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          onSetAuthUser(null);
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

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: payload =>
      dispatch({ type: 'AUTH_USER_SET', payload }),
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
