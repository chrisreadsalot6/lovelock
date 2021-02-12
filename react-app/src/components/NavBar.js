import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React from "react";

import { logout } from "../services/auth";

const NavBar = ({ authenticated, setAuthenticated, setUser }) => {
  const logoutPlus = async () => {
    await logout();
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <Menu secondary>
      {!authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/"
          name="Make or Join a Lock"
          activeClassName="active"
          color="purple"
        />
      )}
      {authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/login"
          name="Login"
          activeClassName="active"
          exact={true}
          color="purple"
        />
      )}
      {authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/sign-up"
          name="Signup"
          activeClassName="active"
          exact={true}
          color="purple"
        />
      )}
      {!authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/"
          name="Logout"
          activeClassName="active"
          exact={true}
          color="purple"
          onClick={logoutPlus}
        />
      )}
    </Menu>
  );
};

export default NavBar;
