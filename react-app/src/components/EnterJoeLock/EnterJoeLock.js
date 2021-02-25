import { Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function EnterJoeLock({
  getDirection,
  joelock,
  readings,
  setUser,
  user,
}) {
  const [lockId, setLockId] = useState("09");

  // const thisJoelock = joelock;

  // if (joelock !== null) {
  //   setLockId("09");
  // }

  // useEffect(() => {
  //   if (lockId === "09" && joelock !== null) {
  //     getDirectionJoin();
  //   }
  // }, [lockId]);

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
          history.push(`/joelock/${updatedLockId}`);
        }
      });
    });
  };

  const hi = () => console.log("hi");

  return (
    <Button
      basic
      onClick={getDirectionJoin}
      opacity="0"
      style={{ marginTop: "4vh", opacity: "100", padding: "4vh" }}
    >
      Joe
    </Button>
  );
}
