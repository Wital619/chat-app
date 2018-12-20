import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { firebase } from '../Firebase';
import * as routes from '../../routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount () {
      const {history} = this.props;

      this.listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(routes.SIGN_IN);
          }
        },
        () => history.push(routes.SIGN_IN),
      );
    }

    componentWillUnmount () {
      this.listener();
    }

    render () {
      return condition(this.props.authUser) ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.session.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;
