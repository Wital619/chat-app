import React from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from '../SignOutButton';

import * as routes from '../../routes';

const HeaderAuthUser = () => (
  <ul>
    <li>
      <Link to={routes.CHAT}>Chat</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

export default HeaderAuthUser;