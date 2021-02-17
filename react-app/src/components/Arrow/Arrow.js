import React, { useState } from "react";

export default function Arrow({ bearing, myCompassDirection }) {
  let clockwise;
  let counterclockwise;

  if (parseInt(bearing) > parseInt(myCompassDirection)) {
    clockwise = bearing - myCompassDirection;
    counterclockwise = myCompassDirection + (360 - bearing);
  } else if (parseInt(bearing) < parseInt(myCompassDirection)) {
    clockwise = 360 - myCompassDirection + bearing;
    counterclockwise = myCompassDirection - bearing;
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
        <>
          <div>
            <i className="long arrow alternative left icon massive purple inverted" />
          </div>
          <i>Turn Left!</i>
        </>
      ) : (
        <>
          <div>
            <i className="long arrow alternative right icon massive purple inverted" />
          </div>
          <i>Turn Right!</i>
        </>
      )}
    </div>
  );
}
