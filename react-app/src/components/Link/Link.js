import {
  Button,
  Confirm,
  Dimmer,
  Image,
  Grid,
  Header,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import InfiniteScroll from "react-bidirectional-infinite-scroll";
import React, { useEffect, useState } from "react";

import CreateLock from "../CreateLock/CreateLock";
import EnterJoeLock from "../EnterJoeLock/EnterJoeLock";
import JoinLock from "../JoinLock/JoinLock";

export default function Link({ noLock, revealJoe, setUser, user }) {
  const [compass, setCompass] = useState(null);
  const [viewHeightThird, setViewHeightThird] = useState("20vh");
  const [mobile, setMobile] = useState(null);
  const [readings, setReadings] = useState(null);
  const [loaderToggle, setLoaderToggle] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);

  const places = () => setShowPlaces(!showPlaces);

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
      console.log("permission mobile false", true);
    } else {
      DeviceOrientationEvent.requestPermission().then((permission) => {
        console.log("permission", permission);
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

  const getLocationRun = (position) => {
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

    fetch("/api/locale/optional", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      response.json().then((data) => console.log(data));
    });
  };

  const getLocationError = (error) => {
    alert(
      "No device geolocation data accessible. Using the location of Penn Station, in New York as a substitute. To access your location, please try another browser or another device."
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

    fetch("/api/locale/optional", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      response.json().then((data) => console.log(data));
    });
  };

  const getLocationOptionsObject = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 5000,
  };

  const getLocation = () => {
    if (user.id === null) {
      alert("Please kindly login or signup to get your location.");
    } else {
      setLoaderToggle(true);
      navigator.geolocation.getCurrentPosition(
        (position) => getLocationRun(position),
        (error) => getLocationError(error),
        getLocationOptionsObject
      );
    }
  };

  console.log("joe reveal in link", revealJoe);

  return (
    <>
      {/* <Confirm
        open={orientationModal}
        onCancel={setOrientationModal(false)}
        onConfirm={setOrientationModal(false)}
      /> */}
      <Segment style={{ height: viewHeight, margin: "0px", padding: "0" }}>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ margin: "0", padding: "0", height: viewHeight }}
        >
          <Grid.Column
            style={{ margin: "0", height: viewHeight, padding: "0" }}
            verticalAlign="middle"
          >
            <Grid.Row style={{ margin: "0", padding: "0" }}>
              <Image
                margin="0"
                padding="0"
                size="small"
                src="/logo-title.png"
                verticalAlign="middle"
              />
            </Grid.Row>
            <Grid.Row style={{ margin: "0", padding: "0" }}>
              {noLock === true ? (
                <Message color="purple" compact="true">
                  The Lock Id you have entered does not exist.
                  <br />
                  Please try again.
                </Message>
              ) : null}
            </Grid.Row>
            <Grid.Row
              verticalAlign="middle"
              style={{ margin: "0", padding: "0" }}
            >
              <CreateLock
                getDirection={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              verticalAlign="middle"
              style={{ margin: "0", padding: "0" }}
            >
              <JoinLock
                getDirection={getDirection}
                readings={readings}
                setUser={setUser}
                user={user}
              />
            </Grid.Row>
            <Grid.Row
              style={{
                margin: "0",
                padding: "0",
              }}
            >
              <>
                <br />
                <Button color="purple" inverted size="tiny" onClick={places}>
                  {showPlaces ? "Hide" : "Show"} Places
                </Button>
                <br />
                <br />
                {showPlaces ? (
                  <InfiniteScroll
                    horizontal
                    onReachLeft={(f) => f}
                    onReachRight={(f) => f}
                  >
                    <Segment circular size="tiny">
                      <Header color="purple">
                        Harvard Yard
                        <Header.Subheader>Lock Id - 1636</Header.Subheader>
                      </Header>
                    </Segment>
                    <Segment circular size="tiny">
                      <Header color="purple">
                        Mecca
                        <Header.Subheader>Lock Id - 570</Header.Subheader>
                      </Header>
                    </Segment>
                    <Segment circular size="tiny">
                      <Header color="purple">
                        Stephen Colbert
                        <Header.Subheader>Lock Id - 1997</Header.Subheader>
                      </Header>
                    </Segment>
                    <Segment circular size="tiny">
                      <Header color="purple">
                        The Sphinx
                        <Header.Subheader>Lock Id - 12000</Header.Subheader>
                      </Header>
                    </Segment>
                    <Segment circular size="tiny">
                      <Header color="purple">
                        The White House
                        <Header.Subheader>Lock Id - 1776</Header.Subheader>
                      </Header>
                    </Segment>
                    <Segment circular size="tiny">
                      <Header color="purple">
                        Willard Beach
                        <Header.Subheader>Lock Id - 04106</Header.Subheader>
                      </Header>
                    </Segment>
                  </InfiniteScroll>
                ) : null}
                <Grid.Row
                  style={{ margin: "0", padding: "0", height: viewHeightThird }}
                >
                  <EnterJoeLock
                    getDirection={getDirection}
                    readings={readings}
                    revealJoe={revealJoe}
                    setUser={setUser}
                    user={user}
                  />
                </Grid.Row>
              </>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Dimmer active={loaderToggle} inverted>
          <Loader content="Accessing geolocation data" inverted />
        </Dimmer>
      </Segment>
    </>
  );
}
