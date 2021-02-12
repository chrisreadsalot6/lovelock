import React, { useEffect, useState } from "react";

import "./link.css";
import CreateLock from "../CreateLock/CreateLock";
import JoinLock from "../JoinLock/JoinLock";

export default function Link({ user }) {
  const [coords, setCoords] = useState(null);
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

      const readingsDict = {
        compassDirection: fakeDirection,
        GPSLatitude: coords.latitude,
        GPSLongitude: coords.longitude,
        // GPSLatitude: coords === null ? 42.3601 : coords.latitude,
        // GPSLongitude: coords === null ? -71.0589 : coords.longitude,
        userId: user.id,
      };
      setReadings(readingsDict);
    } else {
      DeviceOrientationEvent.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("there");
          window.addEventListener(
            "deviceorientation",
            (event) => {
              const readingsDict = {
                compassDirection: event.webkitCompassHeading,
                GPSLatitude: coords.latitude,
                GPSLongitude: coords.longitude,
                // GPSLatitude: coords === null ? 42.3601 : coords.latitude,
                // GPSLongitude: coords === null ? -71.0589 : coords.longitude,
                userId: user.id,
              };
              setReadings(readingsDict);
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
    getDirection();
  }, [coords]);

  const getLocation = () => {
    if (user.id === null) {
      alert("Please kindly login or signup to get your location.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);

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
    <div>
      <CreateLock getLocation={getLocation} readings={readings} user={user} />
      <JoinLock getLocation={getLocation} readings={readings} user={user} />
    </div>
  );
}
