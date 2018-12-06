import React from 'react';
import PropTypes from 'prop-types';

import HeaderAuthUser from './HeaderAuthUser';
import HeaderNonAuthUser from './HeaderNonAuthUser';

const Header = (props, { authUser }) => (
  <div>
    {authUser ? <HeaderAuthUser /> : <HeaderNonAuthUser />}
  </div>
);

Header.contextTypes = {
  authUser          : PropTypes.object
};

export default Header;