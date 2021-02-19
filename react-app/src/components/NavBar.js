import { Grid, Image, Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React from "react";
import MetaTags from "react-meta-tags";

import { logout } from "../services/auth";

const NavBar = ({ authenticated, setAuthenticated, setUser }) => {
  const logoutPlus = async () => {
    await logout();
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <>
      <Segment color="purple" style={{ borderBottom: "0", margin: "0" }}>
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
      <MetaTags>
        {/* <meta name="viewport" content={`width=700px`} /> */}
      </MetaTags>
    </>
  );
};

export default NavBar;
