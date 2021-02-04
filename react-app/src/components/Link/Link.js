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
        setDirecc(event.webkitCompassHeading) // how does this work? constantly updating?
      })
    } else {
      console.log('no device orientation event...')
      alert('No device orientation. Please use (1) a mobile device and (2) an alternative browser.')
    }
  }

  const handleClickToCreateConversation = () => {
    userId = 1;
    GPS = {latitude: coords.latitude, longitude: coords.longitude};
    direction = `${direcc}`;

    conversationStarterData = {
      userId,
      initiatorGPSLocation: GPS,
      initiatorDirection: direction
    }

    fetch('/api/link', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(conversationStarterData)
    }).then((response) => console.log(response.status))
    
    // hit backend with data
    // backend will:
    // (1) generate a random url
    // (2) insert data into the database
    // (3) return that random url
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
        <div>{ direcc === null ? null: <button onClick={ handleClickToCreateConversation}>Create a Conversation</button> }</div>
      </div>
    </div>
  )
}