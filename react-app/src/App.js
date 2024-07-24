import { authenticate } from "./services/auth";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";

import Footer from "./components/Footer/Footer";
import Link from "./components/Link/Link";
import Lock from "./components/Lock/Lock";
import NavBar from "./components/NavBar";
import DemoLogin from "./components/auth/DemoLogin";
import { fetchCsrfToken } from "./services/csrf";

// UNDER DEVELOPMENT
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
// import ProtectedRoute from "./components/auth/ProtectedRoute";

function AppComponent() {
    const [authenticated, setAuthenticated] = useState(false);
    const [isMobile, SetIsMobile] = useState(false);
    const joeColor = "#F20D2D";
    const [loaded, setLoaded] = useState(true);
    const [revealJoe, setRevealJoe] = useState(false);
    const [revealRedSquare, setRevealRedSquare] = useState(false);
    const [user, setUser] = useState('me');

    const history = useHistory();

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

    useEffect(() => {
        const isMobileLocal = detectIfMobileBrowser();
        SetIsMobile(isMobileLocal);
        if (isMobileLocal === false) {
            alert(
                "Warning. Mobile browser not detected.\n\nFor optimal viewing, please open the app on a mobile device. Styling will be poor on some pages in all desktop browsers. Thank you very much for your consideration."
            );
        }

        const checkAuth = async () => {
            const user = await authenticate();
            if (!user.errors) {
                setAuthenticated(true);
                setUser(user);
                setLoaded(true);
            } else {
                history.push('/demo');
            }
        }

        checkAuth();
    }, [history]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <NavBar
                authenticated={authenticated}
                isMobile={isMobile}
                joeColor={joeColor}
                revealJoe={revealJoe}
                revealRedSquare={revealRedSquare}
                setAuthenticated={setAuthenticated}
                setRevealJoe={setRevealJoe}
                setRevealRedSquare={setRevealRedSquare}
                setUser={setUser}
            />
            <Switch>
                <Route path="/demo" exact={true}>
                    <DemoLogin
                        authenticated={authenticated}
                        isMobile={isMobile}
                        setAuthenticated={setAuthenticated}
                        setUser={setUser}
                    />
                </Route>
                {/* Under Development */}
                {/* <Route path="/login" exact={true}>
                        <LoginForm
                            authenticated={authenticated}
                            isMobile={isMobile}
                            setAuthenticated={setAuthenticated}
                            setUser={setUser}
                        />
                    </Route>
                    <Route path="/sign-up" exact={true}>
                        <SignUpForm
                            authenticated={authenticated}
                            isMobile={isMobile}
                            setAuthenticated={setAuthenticated}
                            setUser={setUser}
                        />
                    </Route> */}
                <Route path="/link/no-lock">
                    <Link
                        isMobile={isMobile}
                        noLock={true}
                        joeColor={joeColor}
                        revealJoe={revealJoe}
                        revealRedSquare={revealRedSquare}
                        setRevealJoe={setRevealJoe}
                        setRevealRedSquare={setRevealRedSquare}
                        setUser={setUser}
                        user={user}
                    />
                </Route>
                <Route path="/link/">
                    <Link
                        isMobile={isMobile}
                        joeColor={joeColor}
                        revealJoe={revealJoe}
                        revealRedSquare={revealRedSquare}
                        setRevealJoe={setRevealJoe}
                        setRevealRedSquare={setRevealRedSquare}
                        setUser={setUser}
                        user={user}
                    />
                </Route>
                <Route path="/lock/:lockId">
                    <Lock
                        isMobile={isMobile}
                        joeColor={joeColor}
                        revealJoe={revealJoe}
                        user={user}
                    />
                </Route>
                <Route path="/">
                    <Link
                        isMobile={isMobile}
                        joeColor={joeColor}
                        revealJoe={revealJoe}
                        revealRedSquare={revealRedSquare}
                        setRevealJoe={setRevealJoe}
                        setRevealRedSquare={setRevealRedSquare}
                        setUser={setUser}
                        user={user}
                    />
                </Route>
            </Switch>
            <Footer joeColor={joeColor} revealJoe={revealJoe} />
        </>
    );
}

function App() {
    useEffect(() => {
        fetchCsrfToken();
    }, []);

    return (
        <BrowserRouter>
            <AppComponent />
            <MetaTags>
                <meta
                    name="viewport"
                    content={`width=${window.screen.width * 1.1}, user-scalable=no`}
                />
            </MetaTags>
        </BrowserRouter>
    );
}
export default App;
