import { Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";

import "./link.css";
import CreateLock from "../CreateLock/CreateLock";
import JoinLock from "../JoinLock/JoinLock";

// Boston
// Latitude 42.3601
// Longitude -71.0589

export default function Link({ setUser, user }) {
  const [compass, setCompass] = useState(null);
  const [readings, setReadings] = useState(null);

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
    if (detectIfMobileBrowser() === false) {
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
          alert(
            "User permission denied. In order to use the app, please allow permission."
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
    <Grid style={{ height: "90vh" }} textAlign="center" verticalAlign="middle">
      <Grid.Column>
        <Grid.Row>
          <CreateLock
            getLocation={getDirection}
            readings={readings}
            setUser={setUser}
            user={user}
          />
        </Grid.Row>
        <Grid.Row>
          <JoinLock
            getLocation={getDirection}
            readings={readings}
            setUser={setUser}
            user={user}
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}
