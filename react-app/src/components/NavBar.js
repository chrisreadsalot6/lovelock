import { Menu, Segment } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { logout } from "../services/auth";

const NavBar = ({
    authenticated,
    isMobile,
    joeColor,
    revealJoe,
    revealRedSquare,
    setAuthenticated,
    setRevealJoe,
    setRevealRedSquare,
    setUser,
}) => {
    const [dynamicPadding, setDynamicPadding] = useState({
        loggedIn: "1vh",
        loggedOut: "1vh",
    });
    const history = useHistory();

    useEffect(() => {
        if (isMobile === false) {
            setDynamicPadding({ loggedIn: null, loggedOut: null });
        }
    }, []);

    const logoutPlus = async () => {
        await logout();
        setAuthenticated(false);
        setUser(null);
        setLoggedInNavBar(false);
        history.push("/demo");
    };

    const [loggedInNavBar, setLoggedInNavBar] = useState(authenticated);
    useEffect(() => {
        setLoggedInNavBar(authenticated);
    }, [authenticated]);

    const lockClicked = () => {
        setRevealRedSquare(!revealRedSquare);
    };

    return (
        <>
            <Segment
                color={revealJoe ? "red" : "purple"}
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
                <Menu secondary size="huge">
                    {!authenticated ? null : (
                        <Menu.Item size="normal">
                            <div>
                                <i
                                    className={
                                        revealJoe
                                            ? "icon inverted lock red ui"
                                            : "icon inverted lock purple ui"
                                    }
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
