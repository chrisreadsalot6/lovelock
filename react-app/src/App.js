import { authenticate } from "./services/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";

import Footer from "./components/Footer/Footer";
import Link from "./components/Link/Link";
import Lock from "./components/Lock/Lock";
import NavBar from "./components/NavBar";
// import DemoLogin from "./components/auth/DemoLogin";
// import LoginForm from "./components/auth/LoginForm";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import SignUpForm from "./components/auth/SignUpForm";

// import ReactGA from "react-ga";

// function usePageViews() {
//   let location = useLocation();
//   React.useEffect(() => {
//     ReactGA.pageview()
//   })
// }

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [isMobile, SetIsMobile] = useState(false);
  const joeColor = "#F20D2D";
  const [loaded, setLoaded] = useState(true);
  const [revealJoe, setRevealJoe] = useState(false);
  const [revealRedSquare, setRevealRedSquare] = useState(false);
  const [user, setUser] = useState('me');

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
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
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
          {/* <Route path="/demo" exact={true}>
            <DemoLogin
              authenticated={authenticated}
              isMobile={isMobile}
              setAuthenticated={setAuthenticated}
              setUser={setUser}
            />
          </Route> */}
          {/* <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              isMobile={isMobile}
              setAuthenticated={setAuthenticated}
              setUser={setUser}
            />
          </Route> */}
          {/* <Route path="/sign-up" exact={true}>
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
          {/* <ProtectedRoute path="/" authenticated={authenticated}> */}
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
          {/* </ProtectedRoute> */}
        </Switch>
        <Footer joeColor={joeColor} revealJoe={revealJoe} />
      </BrowserRouter>
      <MetaTags>
        <meta
          name="viewport"
          content={`width=${window.screen.width * 1.1}, user-scalable=no`}
        />
      </MetaTags>
    </>
  );
}

export default App;
