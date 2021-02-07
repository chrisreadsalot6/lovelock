// import AbsoluteOrientationSensor from AbsoluteOrientationSensor
import React, { useState } from 'react'

import "./link.css"

export default function Link() {
  let [coords, setCoords] = useState(null);
  let [direcc, setDirecc] = useState(null);

  const userId = sessionStorage.getItem('userId')

  const handleClickForLocation = () => {

    if (userId === null) {
      alert('Please kindly login or signup to get your location.')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords)
  
        const localTimezoneOffset = new Date().getTimezoneOffset();
  
        const postData = {
          localTimezoneOffset: localTimezoneOffset,
          GPSLatitude: position.coords.latitude,
          GPSLongitude: position.coords.longitude,
          userId: userId,
        }
    
        fetch('/api/session/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData),
        });
      });
    }
  }

    //   return (
    //     const cleanup = window.removeEventlistener(...)
    // )

  // get permissions function??
  const handleClickForDirection = () => {
      
      DeviceOrientationEvent.requestPermission().then( (permission) => {
        if (permission === "granted") {
          window.addEventListener("deviceorientation", (event) => {
            setDirecc(event.webkitCompassHeading) // how does this work? constantly updating?
            
            const postData = {
              initiatorCompassDirection: event.webkitCompassHeading,
              initiatorGPSLatitude: coords.latitude,
              initiatorGPSLongitude: coords.longitude,
              initiatorUserId: userId
            }
    
            fetch('/api/talk/new', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
            }).then( (result) => {
              result.json().then ( (data) => {
                sessionStorage.setItem('talkId', data)
              })
            })
            // const cleanup = window.removeEventListener("deviceorientation") // lookup documentation
            // console.log(cleanup)
          }, { once: true })

        } else {
          alert('User permission denied. In order to use the app, please allow permission.')
        }
      })
    
    } 
    // else {
    //   console.log('no device orientation event...')
    //   alert('No device orientation. Please use (1) a mobile device and (2) an alternative browser.')
    // }
  // }

  const createATalk = () => {
    const talkId = sessionStorage.getItem('talkId')
    window.location.href = `/talk/${talkId}`;
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
      { coords === null ? null : <button
        onClick={ handleClickForDirection }
      >
      Get My Direction
      </button>}
      <div>
        <div>Direction : { direcc === null ? null: direcc }</div>
        <div>{ direcc === null ? null: <button onClick={ createATalk }>Create a Conversation</button> }</div>
      </div>
    </div>
  )
}