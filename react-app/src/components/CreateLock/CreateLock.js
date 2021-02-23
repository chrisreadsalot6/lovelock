import { Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateLock({ getDirection, readings, setUser, user }) {
  const [create, setCreate] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (readings !== null && create === true) {
      createALock();
    }
  }, [readings]);

  const createALock = () => {
    const postData = {
      initiatorCompassDirection: readings.compassDirection,
      initiatorGPSLatitude: readings.GPSLatitude,
      initiatorGPSLongitude: readings.GPSLongitude,
      initiatorUserId: readings.userId,
    };

    fetch("/api/lock/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((result) => {
      result.json().then((data) => {
        history.push(`/lock/${data}`);
      });
    });
  };

  const getDirectionCreate = () => {
    setCreate(true);
    const userCopy = { ...user, initiatorOrJoiner: "initiator" };
    setUser(userCopy);
    getDirection();
  };

  return (
    <Button onClick={getDirectionCreate} basic color="purple" size="massive">
      Create a Lock
    </Button>
  );
}
