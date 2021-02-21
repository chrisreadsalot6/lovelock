import { Divider, Grid, Segment } from "semantic-ui-react";
import React, { useEffect, useState } from "react";

import CreateLock from "../CreateLock/CreateLock";
import JoinLock from "../JoinLock/JoinLock";

// Boston
// Latitude 42.3601
// Longitude -71.0589

export default function Link({ setUser, user }) {
  const [compass, setCompass] = useState(null);
  const [viewHeight, setViewHeight] = useState("82vh");
  const [viewHeightThird, setViewHeightThird] = useState("22vh");
  const [mobile, setMobile] = useState(null);
  const [readings, setReadings] = useState(null);

  useEffect(() => {
    const isMobile = detectIfMobileBrowser();
    setMobile(isMobile);

    if (isMobile === false) {
      setViewHeight("91vh");
      setViewHeightThird("25vh");
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

  const getDirection = () => {
    if (mobile === false) {
      alert(
        "No device orientation event. Inputting placeholder value for compass direction. Please kindly use a mobile device for dynamic compass readings."
      );
      const fakeDirection = 1;
      setCompass(fakeDirection);
    } else {
      DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === "granted") {
          window.addEventListener(
            "deviceorientation",
            (event) => {
              setCompass(event.webkitCompassHeading);
            },
            { once: true }
          );
        } else {
          console.log("here");
          alert(
            "User permission denied. In order to use the app, please restart safari and allow permission."
          );
        }
      });
    }
  };

  useEffect(() => {
    if (compass !== null) {
      getLocation();
    }
  }, [compass]);

  const getLocation = () => {
    if (user.id === null) {
      alert("Please kindly login or signup to get your location.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const readingsDict = {
          compassDirection: compass,
          GPSLatitude: position.coords.latitude,
          GPSLongitude: position.coords.longitude,
          userId: user.id,
        };
        setReadings(readingsDict);

        const localTimezoneOffset = new Date().getTimezoneOffset();

        const postData = {
          localTimezoneOffset: localTimezoneOffset,
          GPSLatitude: position.coords.latitude,
          GPSLongitude: position.coords.longitude,
          userId: user.id,
        };

        fetch("/api/session/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
      });
    }
  };

  return (
    <>
      <Segment
        basic
        style={{ padding: "0", margin: "0", height: viewHeight }}
        verticalAlign="middle"
      >
        <Grid
          textAlign="center"
          verticalAlign="middle"
          basic
          style={{ padding: "0", margin: "0", height: viewHeight }}
        >
          <Grid.Column style={{ height: viewHeight }} verticalAlign="middle">
            <Grid.Row
              style={{ padding: "0", margin: "0", height: viewHeightThird }}
            ></Grid.Row>
            <Grid.Row verticalAlign="middle">
              <CreateLock
                getLocation={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              style={{ padding: "0", margin: "0", height: viewHeightThird }}
            ></Grid.Row>
            <Grid.Row verticalAlign="middle">
              <JoinLock
                getLocation={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              style={{ padding: "0", margin: "0", height: viewHeightThird }}
            ></Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}
