import { Input } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function JoinLock({ getLocation, readings, setUser, user }) {
  const [lockId, setLockId] = useState(null);
  const history = useHistory();
  const [join, setJoin] = useState(null);

  useEffect(() => {
    if (readings !== null && join === true) {
      joinALock();
    }
  }, [readings]);

  const getLocationJoin = () => {
    setJoin(true);
    const userCopy = { ...user, initiatorOrJoiner: "joiner" };
    setUser(userCopy);
    getLocation();
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
    });
    history.push(`/lock/${lockId}`);

    // reset zoom
  };

  return (
    <div>
      <div className="ui action input">
        <Input
          onChange={(e) => getLockId(e)}
          placeholder="Enter a Unique Lock Id"
          action={{
            color: "purple",
            basic: true,
            size: "massive",
            onClick: getLocationJoin,
            content: "Join a Lock",
          }}
        />
      </div>
    </div>
  );
}
