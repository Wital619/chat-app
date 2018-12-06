import React from 'react';
import {Link} from 'react-router-dom';

import * as routes from '../../routes';

const HeaderNonAuthUser = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.SIGN_UP}>Sign up</Link>
    </li>
  </ul>
);

export default HeaderNonAuthUser;