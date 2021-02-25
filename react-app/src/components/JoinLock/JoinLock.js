import { Button, Input } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function JoinLock({ getDirection, readings, setUser, user }) {
  const [lockId, setLockId] = useState(null);

  const history = useHistory();
  const [join, setJoin] = useState(null);

  useEffect(() => {
    if (readings !== null && join === true) {
      joinALock();
    }
  }, [readings]);

  const getDirectionJoin = () => {
    setJoin(true);
    const userCopy = { ...user, initiatorOrJoiner: "joiner" };
    setUser(userCopy);
    getDirection();
  };

  const getLockId = (e) => {
    setLockId(e.target.value);
  };

  const joinALock = () => {
    console.log("lockId here", lockId);
    const postData = {
      active: true,
      joinerCompassDirection: readings.compassDirection,
      joinerGPSLatitude: readings.GPSLatitude,
      joinerGPSLongitude: readings.GPSLongitude,
      joinerUserId: readings.userId,
      startedWhen: new Date(),
      uniqueIdentifier: lockId,
    };

    fetch("/api/lock/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      response.json().then((data) => {
        if (data === false) {
          console.log("No join lock with this id");
          history.push("/link/no-lock");
          setJoin(false);
        } else {
          console.log("data here", data);
          const updatedLockId = data["uniqueIdentifier"];
          history.push(`/lock/${updatedLockId}`);
        }
      });
    });
  };

  return (
    <>
      <Input
        onChange={(e) => getLockId(e)}
        placeholder="Enter a Lock Id..."
        action={{
          color: "purple",
          basic: true,
          size: "massive",
          onClick: getDirectionJoin,
          content: "Join a Lock",
        }}
      />
    </>
  );
}
