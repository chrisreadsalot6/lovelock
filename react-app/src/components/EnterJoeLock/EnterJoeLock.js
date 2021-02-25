import { Button, Input, Modal } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function EnterJoeLock({
  getDirection,
  readings,
  setUser,
  user,
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const [lockId, setLockId] = useState("09");

  const history = useHistory();
  const [join, setJoin] = useState(null);

  useEffect(() => {
    if (readings !== null && join === true) {
      joinALock();
    }
  }, [readings]);

  const getDirectionJoin = () => {
    if (password === "septemberjoe2020") {
      setJoin(true);
      const userCopy = { ...user, initiatorOrJoiner: "joiner" };
      setUser(userCopy);
      getDirection();
    } else {
      alert("experimental feature");
      setOpen(false);
    }
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

  return (
    <>
      <Button
        basic
        onClick={() => setOpen(true)}
        style={{ marginTop: "4vh", opacity: "0", padding: "4vh" }}
      >
        Joe
      </Button>
      <Modal color="purple" size="mini" open={open}>
        <Modal.Header color="purple" style={{ textAlign: "center" }}>
          Password
        </Modal.Header>
        <Input
          fluid
          style={{ padding: "1vh 1vh 1vh 1vh" }}
          onChange={updatePassword}
        ></Input>
        <Modal.Actions>
          <Button color="purple" basic onClick={() => getDirectionJoin()}>
            Submit
          </Button>
          <Button color="purple" basic onClick={() => setOpen(false)}>
            Exit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
