import React from 'react';

import classes from './Navigation.module.css';
import Auth from '../../store/Auth';

const Navigation = (props) => {
  return (
    <Auth.Consumer>
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    </Auth.Consumer>
  );
};

export default Navigation;
