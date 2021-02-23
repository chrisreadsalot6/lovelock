import { Grid, Segment } from "semantic-ui-react";
import React, { useEffect, useState } from "react";

import CreateLock from "../CreateLock/CreateLock";
import JoinLock from "../JoinLock/JoinLock";

export default function Link({ setUser, user }) {
  const [compass, setCompass] = useState(null);
  const [viewHeightThird, setViewHeightThird] = useState("20vh");
  const [mobile, setMobile] = useState(null);
  const [readings, setReadings] = useState(null);

  const [viewHeight, setViewHeight] = useState("74.5vh");
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();
    setMobile(isMobile);

    if (isMobile === false) {
      setViewHeight("86.5vh");
      setViewHeightThird("20vh");
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
      const fakeDirection = 10;
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
      if (
        navigator.geolocation.getCurrentPosition((placeholder) =>
          console.log("no print")
        ) === undefined
      ) {
        alert(
          "No device geolocation data accessible. Using the location of Penn Station, in New York as a substitute. For your location, please try another browser or another device."
        );
        const latitude = "40.750638";
        const longitude = "-73.993899";

        const readingsDict = {
          compassDirection: compass,
          GPSLatitude: latitude,
          GPSLongitude: longitude,
          userId: user.id,
        };
        setReadings(readingsDict);

        const localTimezoneOffset = new Date().getTimezoneOffset();

        const postData = {
          localTimezoneOffset: localTimezoneOffset,
          GPSLatitude: latitude,
          GPSLongitude: longitude,
          userId: user.id,
        };

        fetch("/api/locale/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((response) => {
          response.json().then((data) => console.log(data));
        });
      } else {
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const readingsDict = {
          compassDirection: compass,
          GPSLatitude: latitude,
          GPSLongitude: longitude,
          userId: user.id,
        };
        setReadings(readingsDict);

        const localTimezoneOffset = new Date().getTimezoneOffset();

        const postData = {
          localTimezoneOffset: localTimezoneOffset,
          GPSLatitude: latitude,
          GPSLongitude: longitude,
          userId: user.id,
        };

        fetch("/api/locale/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((response) => {
          response.json().then((data) => console.log(data));
        });
      });
    }
  };

  return (
    <>
      <Segment style={{ height: viewHeight, margin: "0px" }}>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ margin: "0", height: viewHeight }}
        >
          <Grid.Column
            style={{ margin: "0", height: viewHeight }}
            verticalAlign="middle"
          >
            <Grid.Row
              style={{ margin: "0", height: viewHeightThird }}
            ></Grid.Row>
            <Grid.Row verticalAlign="middle" style={{ margin: "0" }}>
              <CreateLock
                getDirection={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              style={{ margin: "0", height: viewHeightThird }}
            ></Grid.Row>
            <Grid.Row verticalAlign="middle" style={{ margin: "0" }}>
              <JoinLock
                getDirection={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              style={{ margin: "0", height: viewHeightThird }}
            ></Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}
