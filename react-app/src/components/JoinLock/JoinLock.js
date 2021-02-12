import { Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function JoinLock({ getLocation, readings, setUser, user }) {
  const [talkId, setTalkId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const userCopy = { ...user, initiatorOrJoiner: "initiator" };
    setUser(userCopy);
    if (readings !== null) {
      joinALock();
    }
  }, [readings]);

  const getTalkId = (e) => {
    setTalkId(e.target.value);
  };

  const joinALock = () => {
    const postData = {
      active: true,
      joinerCompassDirection: readings.compassDirection,
      joinerGPSLatitude: readings.GPSLatitude,
      joinerGPSLongitude: readings.GPSLongitude,
      joinerUserId: readings.userId,
      startedWhen: new Date(),
      uniqueIdentifier: talkId,
    };

    fetch("/api/talk/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    history.push(`/talk/${talkId}`);
  };

  return (
    <div>
      <div className="ui action input">
        <input onChange={(e) => getTalkId(e)} placeholder="Enter 123 to Demo" />
        <Button onClick={getLocation} basic color="purple">
          Join a Lock
        </Button>
      </div>
    </div>
  );
}
