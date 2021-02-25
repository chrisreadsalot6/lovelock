import { Button, Container, Grid, Message } from "semantic-ui-react";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Arrow from "../Arrow/Arrow";

export default function Lock({ user }) {
  const [bearing, setBearing] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [KMDistance, setKMDistance] = useState(null);
  const [midwayGPS, setMidwayGPS] = useState({
    midwayGPSLatitude: null,
    midwayGPSLongitude: null,
    midwayPointCity: null,
  });
  const [toggleButton, setToggleButton] = useState(true);

  const [partnerIsLocked, setPartnerIsLocked] = useState(false);

  const [runningCompass, setRunningCompass] = useState(false);

  const [viewHeight, setViewHeight] = useState("74.5vh");
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();

    if (isMobile === false) {
      setViewHeight("86.5vh");
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

  const [lockIdColor, setLockIdColor] = useState("purple");

  const [locked, setLocked] = useState(false);

  const [linkedCompassDirection, setLinkedCompassDirection] = useState(null);
  const [myCompassDirection, setMyCompassDirection] = useState(null);
  const [compassReadingCount, setCompassReadingCount] = useState(0);

  const { lockId } = useParams();

  useEffect(() => {
    if (geolocation !== null) {
      calculateBearing();
    }
  }, [geolocation]);

  useEffect(() => {
    checkIfLocked();
    pushAndPullData();
    // }
  }, [myCompassDirection]);

  useEffect(() => {
    if (bearing === null) {
      setLockIdColor("purple");
    } else {
      setLockIdColor("grey");
    }
  }, [bearing]);

  const checkIfLocked = () => {
    if (parseInt(bearing) === parseInt(myCompassDirection)) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  };

  const [myWeather, setMyWeather] = useState(null);
  const [yourWeather, setYourWeather] = useState(null);

  const localeData = () => {
    let myLat;
    let myLong;
    let yourLat;
    let yourLong;

    if (user["initiatorOrJoiner"] === "initiator") {
      myLat = geolocation.initiatorGPSLatitude;
      myLong = geolocation.initiatorGPSLongitude;
      yourLat = geolocation.joinerGPSLatitude;
      yourLong = geolocation.joinerGPSLongitude;
    } else {
      myLat = geolocation.joinerGPSLatitude;
      myLong = geolocation.joinerGPSLongitude;
      yourLat = geolocation.initiatorGPSLatitude;
      yourLong = geolocation.initiatorGPSLongitude;
    }

    fetch(`/api/locale/${user.id}/${myLat}/${myLong}`, {
      method: "GET",
    }).then((result) => {
      result.json().then((data) => {
        console.log("my over here", data);
        setMyWeather({
          temperatureFeelsLikeFahrenheit: data.temperatureFeelsLikeFahrenheit,
          weatherDescription: data.weatherDescription,
        });
      });
    });

    fetch(`/api/locale/${user.id}/${yourLat}/${yourLong}`, {
      method: "GET",
    }).then((result) => {
      result.json().then((data) => {
        console.log("your over here", data);
        setYourWeather({
          temperatureFeelsLikeFahrenheit: data.temperatureFeelsLikeFahrenheit,
          weatherDescription: data.weatherDescription,
        });
      });
    });
  };

  const midwayData = (midwayLatitude, midwayLongitude, radius) => {
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${midwayLatitude}${midwayLongitude}/nearbyCities?radius=${radius}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "5ab0b683f6msha36a3d89e07fe53p15ec08jsne65a29cbe42a",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com", // not needed to work so far, but they have it in the api docs on rapid api
        },
      }
    ).then((result) => {
      console.log("result", result);
      result.json().then((data) => {
        const cities = data["data"];
        console.log("cities", cities);
        let midwayPointCity = "";
        if (cities !== undefined && cities.length > 0) {
          midwayPointCity = cities[0]["city"] + ": " + cities[0]["region"];
        } else {
          midwayPointCity = `No major city within ${radius} miles!`;
        }
        console.log("midway city", midwayPointCity);

        setMidwayGPS({
          midwayGPSLatitude: midwayLatitude,
          midwayGPSLongitude: midwayLongitude,
          midwayPointCity: midwayPointCity,
        });
      });
    });
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
    // and what level of precision do we need, to 4 places?
    myLat = parseFloat(myLat);
    myLong = parseFloat(myLong);
    theirLat = parseFloat(theirLat);
    theirLong = parseFloat(theirLong);

    const myLatRad = myLat * (Math.PI / 180);
    const myLongRad = myLong * (Math.PI / 180);
    const theirLatRad = theirLat * (Math.PI / 180);
    const theirLongRad = theirLong * (Math.PI / 180);

    console.log(myLat, myLong, theirLat, theirLong);
    console.log(myLatRad, myLongRad, theirLatRad, theirLongRad); // correct
    // Lock.js:136 40.750638 -73.993899 40.763771 -73.98304

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

    console.log("km", distanceInMeters / 1000); // correct

    setKMDistance(distanceInMeters / 1000);

    const y = Math.sin(theirLongRad - myLongRad) * Math.cos(theirLatRad);
    const x =
      Math.cos(myLatRad) * Math.sin(theirLatRad) -
      Math.sin(myLatRad) *
        Math.cos(theirLatRad) *
        Math.cos(theirLongRad - myLongRad);
    const theta = Math.atan2(y, x);
    const bearing = ((theta * 180) / Math.PI + 360) % 360;

    console.log("bearing", bearing); // a little off, but close
    setBearing(bearing);

    // midpoint calculation
    const Bx = Math.cos(theirLatRad) * Math.cos(theirLongRad - myLongRad);
    const By = Math.cos(theirLatRad) * Math.sin(theirLongRad - myLongRad);
    const midwayLatRad = Math.atan2(
      Math.sin(myLatRad) + Math.sin(theirLatRad),
      Math.sqrt((Math.cos(myLatRad) + Bx) ** 2 + By ** 2)
    );
    const midwayLongRad = myLongRad + Math.atan2(By, Math.cos(myLatRad) + Bx);

    console.log("midway GPS rads", midwayLatRad, midwayLongRad);

    let midwayLatitude = midwayLatRad * (180 / Math.PI);
    midwayLatitude = ((midwayLatitude + 270) % 180) - 90;
    let midwayLongitude = midwayLongRad * (180 / Math.PI);
    midwayLongitude = ((midwayLongitude + 540) % 360) - 180;

    console.log("midway GPS", midwayLatitude, midwayLongitude);

    const radius = 100;

    midwayData(midwayLatitude, midwayLongitude, radius);

    localeData();

    return bearing;
  };

  const endLock = () => {
    console.log("here I am");
    setToggleButton(true);
    setBearing(null);
    setRunningCompass(false);
    if (detectIfMobileBrowser() === true) {
      console.log("now, here");
      window.removeEventListener("deviceorientation", inner);
    }
  };

  const getGeolocationData = () => {
    fetch(`/api/lock/${lockId}/get-geolocation`, {
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
    fetch(`/api/lock/${lockId}/pull-compass`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (user["initiatorOrJoiner"] === "initiator") {
          setLinkedCompassDirection(data.joinerCompassDirection);
          setPartnerIsLocked(data.joinerLocked);
        } else {
          setLinkedCompassDirection(data.initiatorCompassDirection);
          setPartnerIsLocked(data.initiatorLocked);
        }
      });
    });
  };

  const pushAndPullData = () => {
    console.log(user["initiatorOrJoiner"]);
    const postData = {
      compassDirection: myCompassDirection,
      initiatorOrJoiner: user["initiatorOrJoiner"],
      locked: locked,
      lockId: lockId,
      midwayGPSLatitude: midwayGPS["midwayGPSLatitude"],
      midwayGPSLongitude: midwayGPS["midwayGPSLongitude"],
      midwayPointCity: midwayGPS["midwayPointCity"],
      userId: user.id,
    };

    fetch(`/api/lock/${lockId}/push-compass`, {
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
        locked: locked,
        lockId: lockId,
        midwayGPSLatitude: midwayGPS["midwayGPSLatitude"],
        midwayGPSLongitude: midwayGPS["midwayGPSLongitude"],
        midwayPointCity: midwayGPS["midwayPointCity"],
        userId: user.id,
      };

      fetch(`/api/lock/${lockId}/push-compass`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      pullCompassData();
    } else {
      setRunningCompass(true);
    }
  };

  useEffect(() => {
    if (runningCompass === true) {
      window.addEventListener("deviceorientation", inner);

      return () => {
        window.removeEventListener("deviceorientation", inner);
      };
    }
  }, [runningCompass]);

  const inner = (event) => {
    // setCompassReadingCount(newCount);
    console.log("hi");
    if (event.webkitCompassHeading) {
      setMyCompassDirection(event.webkitCompassHeading);
    } else {
      setMyCompassDirection(null);
    }
  };

  return (
    <>
      <Container>
        <Grid textAlign="center" style={{ height: viewHeight, margin: "0px" }}>
          <Grid.Row style={{ paddingTop: "10vh" }}>
            {toggleButton ? (
              <Button
                onClick={pushCompassData}
                basic
                color="purple"
                size="massive"
              >
                Start Lock
              </Button>
            ) : (
              <Button onClick={endLock} basic color="purple" size="massive">
                End Lock
              </Button>
            )}
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
                    <Grid.Row>
                      <div>
                        <i className="ui icon lock massive purple inverted"></i>
                      </div>
                      <Message size="massive" color="purple" compact>
                        Straight That-A-Way!
                        <br />
                        Over the Horizon
                        <br />
                        You are{" "}
                        {parseInt(
                          parseFloat(KMDistance) * 0.62137119223733
                        )}{" "}
                        miles away
                        {partnerIsLocked
                          ? "You're partner is locked on!"
                          : null}
                      </Message>
                      {midwayGPS["midwayPointCity"] ===
                      "No major city within 100 miles!" ? null : (
                        <div>
                          {midwayGPS["midwayPointCity"]} is halfway between you
                        </div>
                      )}
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        {/* <div> */}
                        {myWeather === null ? null : (
                          <>
                            <div>
                              Your weather:{" "}
                              {myWeather["temperatureFeelsLikeFahrenheit"]}
                              &deg;F
                            </div>
                            <div>{myWeather["weatherDescription"]}</div>
                          </>
                        )}
                        {/* </div> */}
                      </Grid.Column>
                      <Grid.Column>
                        {/* <div> */}
                        {yourWeather === null ? null : (
                          <>
                            <div>
                              Their weather:{" "}
                              {yourWeather["temperatureFeelsLikeFahrenheit"]}
                              &deg;F
                            </div>
                            <div>{yourWeather["weatherDescription"]}</div>
                          </>
                        )}
                        {/* </div> */}
                      </Grid.Column>
                    </Grid.Row>
                  </>
                )}
              </Grid.Column>
            </Grid.Row>
          )}
          {toggleButton ? (
            <Grid.Row>
              <Grid.Column verticalAlign="middle">
                <Message color={lockIdColor} size="large" compact>
                  <Message.Header>Your unique lock id</Message.Header>
                  {lockId}
                </Message>
              </Grid.Column>
            </Grid.Row>
          ) : null}
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
