import { Button } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function CreateLock({
  block,
  getLocation,
  readings,
  setBlock,
  setUser,
  user,
}) {
  const history = useHistory();

  useEffect(() => {
    if (readings !== null && !block) {
      setBlock(true);
      createALock();
      const userCopy = { user, initiatorOrJoiner: "initiator" };
      setUser(userCopy);
    }
  }, [readings]);

  const createALock = () => {
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
        history.push(`/talk/${data}`);
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
