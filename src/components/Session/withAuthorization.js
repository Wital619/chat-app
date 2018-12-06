import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase';

import * as routes from '../../routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    static contextTypes = {
      authUser: PropTypes.object
    }

    static propTypes = {
      history: PropTypes.object
    }

    componentDidMount () {
      const {history} = this.props;
      
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          history.push(routes.SIGN_IN);
        }
      });
    }

    render () {
      return this.context.authUser ? <Component /> : null;
    }
  }


  return withRouter(WithAuthorization);
};

export default withAuthorization;
