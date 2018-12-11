import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import HeaderAuthUser from './HeaderAuthUser';
import HeaderNonAuthUser from './HeaderNonAuthUser';

import styles from './Header.scss';

const Header = ({ authUser }) => (
  <div className={styles.header}>
    {authUser ? <HeaderAuthUser /> : <HeaderNonAuthUser />}
  </div>
);

Header.propTypes = {
  authUser       : PropTypes.object
};

const mapStateToProps = state => ({
  authUser: state.session.authUser
});

export default connect(mapStateToProps)(Header);