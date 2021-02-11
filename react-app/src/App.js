import { authenticate } from "./services/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";

import JoinTalk from "./components/JoinTalk/JoinTalk";
import Link from "./components/Link/Link";
import LoginForm from "./components/auth/LoginForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignUpForm from "./components/auth/SignUpForm";
import Talk from "./components/Talk/Talk";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/link" exact={true}>
          <Link />
        </Route>
        <Route path="/talk/join">
          <JoinTalk />
        </Route>
        <Route path="/talk">
          <Talk />
        </Route>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Link />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
