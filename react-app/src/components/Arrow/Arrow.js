import React from "react";

export default function Arrow({
  bearing,
  setIsLeft,
  joeColor,
  myCompassDirection,
  revealJoe,
}) {
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
    setIsLeft(false);
  } else {
    goLeftOrRight = "left";
    setIsLeft(true);
  }

  console.log("Arrow left or right", goLeftOrRight);

  return (
    <div>
      {goLeftOrRight === "left" ? (
        <>
          <i
            className={
              revealJoe
                ? "arrow circle left icon inverted huge"
                : "arrow circle left icon inverted huge purple"
            }
            style={revealJoe ? { color: joeColor } : null}
          />
        </>
      ) : (
        <>
          <i
            className={
              revealJoe
                ? "arrow circle right icon inverted huge"
                : "arrow circle right icon inverted huge purple"
            }
            style={revealJoe ? { color: joeColor } : null}
          />
        </>
      )}
    </div>
  );
}
