// import AbsoluteOrientationSensor from AbsoluteOrientationSensor
import React, { useState } from 'react'
import "./link.css"
// import { Accelerometer, Magnetometer, Gyroscope } from 'expo-sensors'

export default function Link() {
  let [coords, setCoords] = useState(null)

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords(position.coords)
      }
    );
  }

  // const options = { frequency: 60, referenceFrame: 'device' };
  // // const sensor = new window.AbsoluteOrientationSensor(options);
  // // const sensor = new AbsoluteOrientationSensor(options);
  // const sensor = new AbsoluteOrientationSensor(options)
  // console.log(sensor)
  // console.log(sensor)
  // console.log(typeof sensor)
  // console.log(Object.keys(sensor))
  // console.log(Object.values(sensor))
  // console.log(JSON.parse(sensor))

  return (
    <div className='big-text'>
      <button
        onClick={handleClick}
      >Get My Location
      </button>
      <div>
        <div>Latitude: { coords === null ? null : coords.latitude }</div>
        <div>Longitude: { coords === null ? null : coords.longitude }</div>
      </div>
      <div>
        {/* { JSON.parse(sensor) } */}
      </div>
    </div>
  )
}
