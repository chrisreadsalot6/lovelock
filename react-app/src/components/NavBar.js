import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = ({ authenticated, setAuthenticated }) => {
  return (
    <nav>
      <ul>
        {authenticated ? (
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home: Make/Join a Lock
            </NavLink>
          </li>
        ) : null}
        {authenticated ? null : (
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
        )}
        {authenticated ? null : (
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        )}
        {authenticated ? (
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
