import React, { useState } from "react";
import { Button } from "semantic-ui-react";

export default function JoinLock({ getLocation, readings, user }) {
  const [talkId, setTalkId] = useState(null);

  const getTalkId = (e) => {
    setTalkId(e.target.value);
  };

  const joinALock = () => {
    getLocation();

    user["initiatorOrJoiner"] = "joiner";

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

    window.location.href = `/talk/${talkId}`;
  };

  return (
    <div>
      <div className="ui action input">
        <input onChange={(e) => getTalkId(e)} placeholder="Enter 123 to Demo" />
        <Button onClick={joinALock} basic color="purple">
          Join a Lock
        </Button>
      </div>
    </div>
  );
}
