import { Grid, Menu, Segment } from "semantic-ui-react";
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
    // <Grid style={{ height: "10vh" }}>
    //   <Grid.Row verticalAlign="top">
    <Segment
      // basic
      color="purple"
      style={{ marginBottom: "0" }}
      // style={{ padding: "0", margin: "0", height: "5vh" }}
    >
      <Menu secondary size="massive">
        {authenticated ? null : (
          <Menu.Item
            as={NavLink}
            to="/login"
            name="Login"
            exact={true}
            color="purple"
            position="right"
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
            name="Create or Join a Lock"
            color="purple"
            position="right"
          />
        )}
        {!authenticated ? null : (
          <Menu.Item
            as={NavLink}
            to="/logout"
            exact={true}
            name="Logout"
            color="purple"
            onClick={logoutPlus}
          />
        )}
      </Menu>
    </Segment>
    //   </Grid.Row>
    // </Grid>
  );
};

export default NavBar;
