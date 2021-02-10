// import AbsoluteOrientationSensor from AbsoluteOrientationSensor
import React, { useState } from "react";

import "./link.css";
import JoinTalk from "../JoinTalk/JoinTalk";

export default function Link() {
  const [coords, setCoords] = useState(null);
  const [direcc, setDirecc] = useState(null);
  const [readings, setReadings] = useState(null);
  const [talkId, setTalkId] = useState(null);

  const userId = parseInt(sessionStorage.getItem("userId"));

  const createATalk = () => {
    sessionStorage.setItem("initiatorOrJoiner", "initiator");

    const postData = {
      initiatorCompassDirection: direcc,
      initiatorGPSLatitude: coords.latitude,
      initiatorGPSLongitude: coords.longitude,
      initiatorUserId: userId,
    };

    fetch("/api/talk/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((result) => {
      result.json().then((data) => {
        setTalkId(data);
        sessionStorage.setItem("talkId", data);
        window.location.href = `/talk/${data}`;
      });
    });
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

  const getDirection = () => {
    if (detectIfMobileBrowser() === false) {
      alert(
        "No device orientation event. Inputting placeholder value for compass direction. Please kindly use a mobile device for dynamic compass readings."
      );
      const fakeDirection = 1;
      setDirecc(fakeDirection);

      const readingsDict = {
        compassDirection: fakeDirection,
        GPSLatitude: coords.latitude,
        GPSLongitude: coords.longitude,
        userId: userId,
        uniqueIdentifier: talkId,
      };
      setReadings(readingsDict);
    } else {
      DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === "granted") {
          window.addEventListener(
            "deviceorientation",
            (event) => {
              setDirecc(event.webkitCompassHeading); // how does this work? constantly updating?

              const readingsDict = {
                compassDirection: event.webkitCompassHeading,
                GPSLatitude: coords.latitude,
                GPSLongitude: coords.longitude,
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
    <div className="big-text">
      <button onClick={getLocation}>First Get Your GPS Location</button>
      <div>
        {coords === null ? null : <div>Latitude: {coords.latitude} </div>}
        {coords === null ? null : <div>Longitude: {coords.longitude} </div>}
      </div>
      {coords === null ? null : (
        <button onClick={getDirection}>
          Second Get Your First Compass Reading
        </button>
      )}
      {direcc === null ? null : <div>Direction : {direcc} </div>}
      {direcc === null ? null : (
        <button onClick={createATalk}>Start Your Talk</button>
      )}
      {direcc === null ? null : <JoinTalk readings={readings} />}
    </div>
  );
}
