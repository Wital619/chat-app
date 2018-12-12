import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import {setAuthUser} from '../../store/reducers/session';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount () {
      const {firebase, setAuthUser} = this.props;

      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          setAuthUser(null);
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
    setAuthUser
  };

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
