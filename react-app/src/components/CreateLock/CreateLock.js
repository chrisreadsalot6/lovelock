import { Button } from "semantic-ui-react";
import React, { useEffect } from "react";

export default function CreateLock({ getLocation, readings, setUser, user }) {
  useEffect(() => {
    if (readings !== null) {
      createALock();
    }
  }, [readings]);

  const createALock = () => {
    user["initiatorOrJoiner"] = "initiator";
    setUser(user);

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
      <Button onClick={getLocation} basic color="purple">
        Create a Lock
      </Button>
    </div>
  );
}
