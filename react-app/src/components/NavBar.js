import { Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { logout } from "../services/auth";

const NavBar = ({
  authenticated,
  revealJoe,
  setAuthenticated,
  setRevealJoe,
  setUser,
}) => {
  const [dynamicPadding, setDynamicPadding] = useState({
    loggedIn: "1vh",
    loggedOut: "1vh",
  });
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();

    if (isMobile === false) {
      setDynamicPadding({ loggedIn: null, loggedOut: null });
    }
  }, []);

  const detectIfMobileBrowser = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((element) => {
      return navigator.userAgent.match(element);
    });
  };

  const logoutPlus = async () => {
    await logout();
    setAuthenticated(false);
    setUser(null);
    setLoggedInNavBar(false);
  };

  const [loggedInNavBar, setLoggedInNavBar] = useState(authenticated);
  useEffect(() => {
    setLoggedInNavBar(authenticated);
  }, [authenticated]);

  const lockClicked = () => {
    console.log("am I revealing joe in navbar?", revealJoe);
    setRevealJoe(!revealJoe);
  };

  return (
    <>
      <Segment
        color="purple"
        style={
          loggedInNavBar
            ? {
                borderBottom: "0px",
                margin: "0px",
                padding: dynamicPadding["loggedIn"],
                height: "8.5vh",
              }
            : {
                borderBottom: "0px",
                margin: "0px",
                padding: dynamicPadding["loggedOut"],
                height: "8.5vh",
              }
        }
      >
        <Menu secondary size="big">
          {!authenticated ? (
            <Menu.Item as={NavLink} to="/demo" exact={true} size="normal">
              Demo
            </Menu.Item>
          ) : (
            <Menu.Item size="normal">
              <div>
                <i
                  className="icon inverted lock purple ui"
                  onClick={lockClicked}
                ></i>
              </div>
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
