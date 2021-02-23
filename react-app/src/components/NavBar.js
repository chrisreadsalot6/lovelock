import { Image, Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { logout } from "../services/auth";

const NavBar = ({ authenticated, setAuthenticated, setUser }) => {
  const [loggedInNavBar, setLoggedInNavBar] = useState(authenticated);

  const logoutPlus = async () => {
    await logout();
    setAuthenticated(false);
    setUser(null);
    setLoggedInNavBar(false);
  };

  useEffect(() => {
    setLoggedInNavBar(authenticated);
  }, [authenticated]);

  return (
    <>
      <Segment
        color="purple"
        style={
          loggedInNavBar
            ? {
                borderBottom: "0px",
                margin: "0px",
                padding: ".85vh",
                height: "8.5vh",
              }
            : {
                borderBottom: "0px",
                margin: "0px",
                height: "8.5vh",
              }
        }
      >
        <Menu secondary size="massive">
          {!authenticated ? null : (
            <Menu.Item as={NavLink} to="/" exact={true}>
              <Image
                src={process.env.PUBLIC_URL + "/favicon.ico"}
                size="mini"
              ></Image>
            </Menu.Item>
          )}
          <Menu.Menu position="right">
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
                name="Locks"
                color="purple"
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
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
};

export default NavBar;
