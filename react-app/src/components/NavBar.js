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
    // removed activeClassName="active" from all
    <Menu secondary>
      {authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/login"
          name="Login"
          exact={true}
          color="purple"
        />
      )}
      {authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/sign-up"
          name="Signup"
          exact={true}
          color="purple"
        />
      )}
      {!authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/"
          exact={true}
          name="Make or Join a Lock"
          color="purple"
        />
      )}
      {!authenticated ? null : (
        <Menu.Item
          as={NavLink}
          to="/"
          exact={true}
          name="Logout"
          color="purple"
          onClick={logoutPlus}
        />
      )}
    </Menu>
  );
};

export default NavBar;
