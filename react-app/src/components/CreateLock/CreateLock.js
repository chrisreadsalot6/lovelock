import React from "react";
import { Button } from "semantic-ui-react";

export default function createLock({ getLocation, readings, user }) {
  const createALock = () => {
    getLocation();

    user["initiatorOrJoiner"] = "initiator";

    const postData = {
      initiatorCompassDirection: readings.compassDirection,
      initiatorGPSLatitude: readings.GPSLatitude,
      initiatorGPSLongitude: readings.GPSLongitude,
      initiatorUserId: readings.userId,
    };

    fetch("/api/talk/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((result) => {
      result.json().then((data) => {
        window.location.href = `/talk/${data}`;
      });
    });
  };

  return (
    <div>
      <Button onClick={createALock} basic color="purple">
        Create a Lock
      </Button>
    </div>
  );
}
