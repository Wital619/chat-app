import React, {Component} from 'react';

import { withAuthorization } from '../Session';

class Chat extends Component {

  render () {
    return (
      <h1>Here will be chat</h1>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Chat);
