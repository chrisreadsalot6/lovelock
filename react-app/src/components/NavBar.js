import { Icon, Image, Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

// import { animated, useSpring } from "react-spring";
// import { useDrag, useHover } from "react-use-gesture";

import { useDrag, useDrop } from "react-dnd";

import { logout } from "../services/auth";

const NavBar = ({ authenticated, setAuthenticated, setUser, image, index }) => {
  const [dynamicPadding, setDynamicPadding] = useState({
    loggedIn: "0vh 0vh 1vh 0vh",
    loggedOut: "1vh",
  });
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();

    if (isMobile === false) {
      setDynamicPadding({ loggedIn: ".85vh", loggedOut: null });
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

  // const bind = useDrag(({ down, tap }) => {
  //   if (!down && tap) {
  //     setDynamicPadding({});
  //   }
  // });

  // const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  // const bind = useDrag(({ down, movement: [mx, my] }) => {
  //   set({ x: down ? mx : 0, y: down ? my : 0 });
  // });

  // const [previousTimeStamp, setPreviousTimeStamp] = useState(null);
  // const [currentTimeStamp, setCurrentTimeStamp] = useState(null);
  // // const [duration, setDuration] = useState(null);
  // const [showLock, setShowLock] = useState(false);

  // const bindHover = useHover((state) => {
  //   const { event, timeStamp } = state;
  //   console.log(event);
  //   setPreviousTimeStamp(timeStamp);
  //   setTimeout(() => {
  //     // setDuration(timeStamp + 3000);
  //     setCurrentTimeStamp(timeStamp + 3000);
  //   }, 3000);
  //   // if (start === null) {
  //   //   setStart(timeStamp);
  //   // } else {
  //   //   if (timeStamp - start > 3000) {
  //   //     console.log("yes");
  //   //     setStart(timeStamp);
  //   //   }
  //   // }

  //   // console.log(timeStamp);
  //   // one elapsed time, and the other, to get the number of seconds
  // });

  // useEffect(() => {
  //   console.log("1");
  //   if (currentTimeStamp !== null) {
  //     console.log("2", previousTimeStamp, currentTimeStamp);
  //     if (currentTimeStamp - previousTimeStamp > 3000) {
  //       console.log("3");
  //       setShowLock(true);
  //     }
  //   }
  // }, [currentTimeStamp]);

  // const ref = useRef(null);

  // const [, drop] = useDrop({
  //   accept: type,
  //   hover(item) {},
  // });

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
        <Menu secondary size="massive">
          {!authenticated ? (
            <Menu.Item
              as={NavLink}
              to="/demo"
              exact={true}
              color="purple"
              size="normal"
            >
              Demo
            </Menu.Item>
          ) : (
            <Menu.Item as={NavLink} to="/" exact={true}>
              {/* <Image
                src={process.env.PUBLIC_URL + "/favicon.ico"}
                size="mini"
                // style={{ ...bind() }}
              ></Image> */}
              <div>
                <i className="ui icon lock big purple inverted"></i>
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
