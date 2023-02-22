import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import ReactGA, { pageview } from "react-ga";

document.addEventListener("DOMContentLoaded", () => {
  // initializeGA();
  // let store;
  // if (window.currentUser) {
  //   const preloadedState = {
  //     session: { currentUser: window.currentUser.user },
  //     ui: { recentNotes: window.currentUser.recentNotes },
  //   };
  //   // store = configureStore(preloadedState);
  //   delete window.currentUser;
  // } else {
  //   // store = configureStore();
  // }

  // const root = document.getElementById("root");

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// function initializeGA() {
//   ReactGA.initializeGA("UA-195008294-2");
//   pageview(window.location.pathname + window.location.hash);
// }
