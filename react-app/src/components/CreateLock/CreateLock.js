import React from "react";

export default function createLock({ getDirection, readings }) {
  const createATalk = () => {
    getDirection();

    sessionStorage.setItem("initiatorOrJoiner", "initiator");

    const postData = {
      initiatorCompassDirection: readings["compassDirection"],
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
        sessionStorage.setItem("talkId", data);
        window.location.href = `/talk/${data}`;
      });
    });
  };

  return (
    <div>
      <button onClick={createLock}>Create a Lock</button>
    </div>
  );
}
