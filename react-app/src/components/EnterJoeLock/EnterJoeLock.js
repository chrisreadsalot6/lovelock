import { Button, Input, Modal } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function EnterJoeLock({
  getDirection,
  readings,
  revealJoe,
  revealRedSquare,
  setRevealJoe,
  setUser,
  user,
}) {
  const history = useHistory();
  const [joeVisibility, setjoeVisibility] = useState("hidden");
  const [join, setJoin] = useState(null);
  const [lockId, setLockId] = useState("09");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);

  const getDirectionJoin = () => {
    if (password === "septemberjoe") {
      setJoin(true);
      setOpen(false);
      setRevealJoe(true);
      const userCopy = { ...user, initiatorOrJoiner: "joiner" };
      setUser(userCopy);
      getDirection();
    } else {
      alert(
        "experimental feature. please continue to use the other features of the app."
      );
      setOpen(false);
    }
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

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (readings !== null && join === true) {
      joinALock();
    }
  }, [readings]);

  useEffect(() => {
    if (revealRedSquare === true) {
      setjoeVisibility("visible");
    } else {
      setjoeVisibility("hidden");
    }
  }, [revealRedSquare]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#F20D2D",
          margin: "0vh",
          marginTop: "1vh",
          padding: "1vh",
          visibility: joeVisibility,
        }}
      />
      <Modal color="purple" open={open} size="mini">
        <Modal.Header
          color="purple"
          style={{ textAlign: "center" }}
        ></Modal.Header>
        <Input
          fluid
          style={{ padding: "1vh 1vh 1vh 1vh" }}
          onChange={updatePassword}
        ></Input>
        <Modal.Actions>
          <Button basic color="purple" onClick={() => getDirectionJoin()}>
            Submit
          </Button>
          <Button basic color="purple" onClick={() => setOpen(false)}>
            Exit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
