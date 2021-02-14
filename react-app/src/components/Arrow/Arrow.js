import React, { useState } from "react";

export default function Arrow({ bearing, myCompassDirection }) {
  const [locked, setLocked] = useState(false);

  let clockwise;
  let counterclockwise;

  if (parseInt(bearing) > parseInt(myCompassDirection)) {
    clockwise = bearing - myCompassDirection;
    counterclockwise = myCompassDirection + (360 - bearing);
  } else if (parseInt(bearing) < parseInt(myCompassDirection)) {
    clockwise = 360 - myCompassDirection + bearing;
    counterclockwise = myCompassDirection - bearing;
  } else if (parseInt(bearing) === parseInt(myCompassDirection)) {
    setLocked(true);
  }

  let goLeftOrRight;
  if (clockwise <= counterclockwise) {
    goLeftOrRight = "right";
  } else {
    goLeftOrRight = "left";
  }

  return (
    <div>
      {locked === true ? (
        <div>You're locked!</div>
      ) : goLeftOrRight === "left" ? (
        <div>
          <i>Turn to the left!</i>
          <i className="long arrow alternative left icon" />
        </div>
      ) : (
        <div>
          <i>Turn to the right!</i>
          <i className="long arrow alternative right icon" />
        </div>
      )}
    </div>
  );
}
