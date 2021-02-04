// import AbsoluteOrientationSensor from AbsoluteOrientationSensor
import React, { useState } from 'react'

import "./link.css"

export default function Link() {
  let [coords, setCoords] = useState(null);
  let [direcc, setDirecc] = useState(null);

  const handleClickForLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords)
    });
  }

    // get permissions function??
  const handleClickForDirection = () => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) => {
        console.log(event.webkitCompassHeading)
        setDirecc(event.webkitCompassHeading) // how does this work? constantly updating?
      })
    } else {
      console.log('no device orientation event...')
      alert('No device orientation. Please use (1) a mobile device and (2) an alternative browser.')
    }
  }

  return (
    <div className='big-text'>
      <button
        onClick={ handleClickForLocation }
      >
      Get My Location
      </button>
      <div>
        <div>Latitude: { coords === null ? null : coords.latitude }</div>
        <div>Longitude: { coords === null ? null : coords.longitude }</div>
      </div>
      <button
        onClick={ handleClickForDirection }
      >
      Get My Direction
      </button>
      <div>
        <div>Direction : { direcc === null ? null: direcc }</div>
      </div>
    </div>
  )
}