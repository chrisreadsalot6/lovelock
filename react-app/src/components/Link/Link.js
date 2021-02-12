// import AbsoluteOrientationSensor from AbsoluteOrientationSensor
import React, { useState } from "react";

import "./link.css";
import CreateLock from "../CreateLock/CreateLock";
import JoinLock from "../JoinLock/JoinLock";

export default function Link() {
  const [coords, setCoords] = useState(null);
  const [direcc, setDirecc] = useState(null);
  const [readings, setReadings] = useState(null);
  const [talkId, setTalkId] = useState(null);

  const userId = parseInt(sessionStorage.getItem("userId"));

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

  const getDirection = async () => {
    getLocation();

    if (detectIfMobileBrowser() === false) {
      alert(
        "No device orientation event. Inputting placeholder value for compass direction. Please kindly use a mobile device for dynamic compass readings."
      );
      const fakeDirection = 1;
      setDirecc(fakeDirection);

      const readingsDict = {
        compassDirection: fakeDirection,
        GPSLatitude: coords === null ? 42.3601 : coords.latitude,
        GPSLongitude: coords === null ? -71.0589 : coords.longitude,
        userId: userId,
        uniqueIdentifier: talkId,
      };
      setReadings(readingsDict);
    } else {
      DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("there");
          window.addEventListener(
            "deviceorientation",
            (event) => {
              setDirecc(event.webkitCompassHeading); // how does this work? constantly updating?

              const readingsDict = {
                compassDirection: event.webkitCompassHeading,
                GPSLatitude: coords === null ? 42.3601 : coords.latitude,
                GPSLongitude: coords === null ? -71.0589 : coords.longitude,
                userId: userId,
                uniqueIdentifier: talkId,
              };
              setReadings(readingsDict);
              // const cleanup = window.removeEventListener("deviceorientation") // lookup documentation
              // console.log(cleanup)
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

  const getLocation = () => {
    if (userId === null) {
      alert("Please kindly login or signup to get your location.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        sessionStorage.setItem("position", position);
        setCoords(position.coords);

        const localTimezoneOffset = new Date().getTimezoneOffset();

        const postData = {
          localTimezoneOffset: localTimezoneOffset,
          GPSLatitude: position.coords.latitude,
          GPSLongitude: position.coords.longitude,
          userId: userId,
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
    <div>
      <CreateLock getDirection={getDirection} readings={readings} />
      <JoinLock getDirection={getDirection} readings={readings} />
    </div>
  );
}
