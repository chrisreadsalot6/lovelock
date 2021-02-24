import { Input } from "semantic-ui-react";
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
        console.log(data);
        // JSON.parse(data).then((rawJSON) => console.log(rawJSON));
        // console.log(typeof data);
        // console.log(Object.keys(data));
        const updatedLockId = data["uniqueIdentifier"];
        history.push(`/lock/${updatedLockId}`);
      });
    });
  };

  return (
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
  );
}
