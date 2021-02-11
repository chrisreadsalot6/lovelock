import React, { useState } from "react";

export default function Arrow(props) {
  // const [myCompassDirection, setMyCompassDirection] = useState(
  //   props["myCompassDirection"]
  // );
  // const [bearing, setBearing] = useState(props["bearing"]);

  const bearing = props["bearing"];
  const myCompassDirection = props["myCompassDirection"];

  let clockwise;
  let counterclockwise;
  let locked = false;

  if (bearing > myCompassDirection) {
    clockwise = bearing - myCompassDirection;
    counterclockwise = myCompassDirection + (360 - bearing);
  } else if (bearing < myCompassDirection) {
    clockwise = 360 - myCompassDirection + bearing;
    counterclockwise = myCompassDirection - bearing;
  } else {
    locked = true;
  }

  let goLeftOrRight;
  if (clockwise <= counterclockwise) {
    goLeftOrRight = "right";
  } else {
    goLeftOrRight = "left";
  }

  return (
    <div>
      {goLeftOrRight === "left" ? (
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
