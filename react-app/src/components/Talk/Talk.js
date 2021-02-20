import { Button, Container, Grid, Message } from "semantic-ui-react";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Arrow from "../Arrow/Arrow";

export default function Talk({ user }) {
  const [bearing, setBearing] = useState(null);
  const [KMDistance, setKMDistance] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [toggleButton, setToggleButton] = useState(true);

  const [viewHeight, setViewHeight] = useState("82vh");
  const [mobile, setMobile] = useState(null);

  const [lockIdColor, setLockIdColor] = useState("purple");

  const [locked, setLocked] = useState(false);

  const [linkedCompassDirection, setLinkedCompassDirection] = useState(null);
  const [myCompassDirection, setMyCompassDirection] = useState(null);
  const [compassReadingCount, setCompassReadingCount] = useState(0);

  const { talkId } = useParams();

  useEffect(() => {
    const isMobile = detectIfMobileBrowser();
    setMobile(isMobile);

    if (isMobile === false) {
      setViewHeight("91vh");
    }
  }, []);

  useEffect(() => {
    if (geolocation !== null) {
      calculateBearing();
    }
  }, [geolocation]);

  useEffect(() => {
    console.log("compasscount", compassReadingCount);
    // if (compassReadingCount > 0 && compassReadingCount % 10 === 0) {
    //   console.log("HERE");
    checkIfLocked();
    pushAndPullData();
    // }
  }, [myCompassDirection]);

  useEffect(() => {
    if (bearing === null) {
      setLockIdColor("purple");
    } else {
      setLockIdColor("");
    }
  }, [bearing]);

  const checkIfLocked = () => {
    if (parseInt(bearing) === parseInt(myCompassDirection)) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  };

  const calculateBearing = () => {
    let myLat;
    let myLong;
    let theirLat;
    let theirLong;

    // why did I have to flip this direction?
    if (user["initiatorOrJoiner"] === "initiator") {
      myLat = geolocation.initiatorGPSLatitude;
      myLong = geolocation.initiatorGPSLongitude;
      theirLat = geolocation.joinerGPSLatitude;
      theirLong = geolocation.joinerGPSLongitude;
    } else {
      myLat = geolocation.joinerGPSLatitude;
      myLong = geolocation.joinerGPSLongitude;
      theirLat = geolocation.initiatorGPSLatitude;
      theirLong = geolocation.initiatorGPSLongitude;
    }

    // do we lose any precision here?
    myLat = parseFloat(myLat);
    myLong = parseFloat(myLong);
    theirLat = parseFloat(theirLat);
    theirLong = parseFloat(theirLong);

    const myLatRad = myLat * (Math.PI / 180);
    const myLongRad = myLong * (Math.PI / 180);
    const theirLatRad = theirLat * (Math.PI / 180);
    const theirLongRad = theirLong * (Math.PI / 180);

    console.log(myLat, myLong, theirLat, theirLong);
    console.log(myLatRad, myLongRad, theirLatRad, theirLongRad);

    const R = 6371e3;
    const φ1 = (myLat * Math.PI) / 180;
    const φ2 = (theirLat * Math.PI) / 180;
    const Δφ = ((theirLat - myLat) * Math.PI) / 180;
    const Δλ = ((theirLong - myLong) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMeters = R * c;

    console.log(distanceInMeters / 1000);

    setKMDistance(distanceInMeters / 1000);

    const y = Math.sin(theirLongRad - myLongRad) * Math.cos(theirLatRad);
    const x =
      Math.cos(myLatRad) * Math.sin(theirLatRad) -
      Math.sin(myLatRad) *
        Math.cos(theirLatRad) *
        Math.cos(theirLongRad - myLongRad);
    const theta = Math.atan2(y, x);
    const bearing = ((theta * 180) / Math.PI + 360) % 360;

    setBearing(bearing);

    return bearing;
  };

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

  const endTalk = () => {
    console.log("here I am");
    setToggleButton(true);
    setBearing(null);
    if (detectIfMobileBrowser() === true) {
      console.log("now, here");
      window.removeEventListener("deviceorientation", inner);
    }
  };

  const getGeolocationData = () => {
    fetch(`/api/talk/${talkId}/get-geolocation`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setGeolocation(data);
      });
    });
  };

  const pullCompassData = () => {
    fetch(`/api/talk/${talkId}/pull-compass`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (user["initiatorOrJoiner"] === "initiator") {
          setLinkedCompassDirection(data.joinerCompassDirection);
        } else {
          setLinkedCompassDirection(data.initiatorCompassDirection);
        }
      });
    });
  };

  const pushAndPullData = () => {
    const postData = {
      compassDirection: myCompassDirection,
      initiatorOrJoiner: user.initiatorOrJoiner,
      talkId: talkId,
      userId: user.id,
    };

    // if (Date.now() % (1000 * 10) === 0) {
    //   console.log(Date.now());
    fetch(`/api/talk/${talkId}/push-compass`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    pullCompassData();
  };

  const pushCompassData = () => {
    setToggleButton(false);
    getGeolocationData();

    if (detectIfMobileBrowser() === false) {
      const compassDirection = 20;
      setMyCompassDirection(compassDirection);

      const postData = {
        compassDirection: compassDirection,
        // this breaks on a page refresh
        // it'd be better to add it to the original user object
        initiatorOrJoiner: user["initiatorOrJoiner"],
        talkId: talkId,
        userId: user.id,
      };

      fetch(`/api/talk/${talkId}/push-compass`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      pullCompassData();
    } else {
      window.addEventListener("deviceorientation", inner); //, { once: true });
    }
  };

  const inner = (event) => {
    const newCount = compassReadingCount + 1;
    console.log("inner compass count", newCount);
    setCompassReadingCount(newCount);
    setMyCompassDirection(event.webkitCompassHeading);
  };

  return (
    <>
      <Container>
        <Grid
          textAlign="center"
          style={{ height: viewHeight, padding: "0", margin: "0" }}
        >
          <Grid.Row style={{ paddingTop: "10vh" }}>
            <Grid.Column>
              {toggleButton ? (
                <Button
                  onClick={pushCompassData}
                  basic
                  color="purple"
                  size="massive"
                >
                  Start Talk
                </Button>
              ) : (
                <Button onClick={endTalk} basic color="purple" size="massive">
                  End Talk
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
          {!locked ? (
            <Grid.Row>
              <Grid.Column>
                {bearing === null ? null : (
                  <div className="ui message compact massive purple">
                    Pointing {parseInt(myCompassDirection)}&deg;
                    <br />
                    {isNaN(bearing) ? (
                      <div>Waiting for Partner to Join</div>
                    ) : (
                      <div>Look towards {parseInt(bearing)}&deg;</div>
                    )}
                  </div>
                )}
                {bearing === null ||
                isNaN(bearing) ||
                linkedCompassDirection === "None" ? null : (
                  <Arrow
                    bearing={parseInt(bearing)}
                    myCompassDirection={myCompassDirection}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column>
                {bearing === null ||
                linkedCompassDirection === "None" ? null : (
                  <>
                    <div>
                      <i className="ui icon lock massive purple inverted"></i>
                    </div>
                    <Message size="massive" color="purple" compact>
                      {/* Your partner's compass direction:{" "}
                    {parseInt(linkedCompassDirection)} */}
                      Straight That-A-Way!
                      <br />
                      Over the Horizon
                      <br />
                      You are{" "}
                      {parseInt(parseFloat(KMDistance) * 0.62137119223733)}{" "}
                      miles away
                    </Message>
                  </>
                )}
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row verticalAlign="Bottom">
            <Grid.Column verticalAlign="middle">
              <Message color={lockIdColor} size="large" compact>
                <Message.Header>Your unique lock id</Message.Header>
                {talkId}
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <MetaTags>
        <meta
          name="viewport"
          content={`width=${document.documentElement.clientWidth}, height=${document.documentElement.clientHeight}`}
        />
      </MetaTags>
    </>
  );
}
