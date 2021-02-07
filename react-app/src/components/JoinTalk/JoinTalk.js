import React, { useState } from 'react'

export default function JoinTalk(readings) {

  console.log(readings);

  const [talkId, setTalkId] = useState(null);

  const getTalkId = (e) => {
    setTalkId(e.target.value);
  }

  const joinTalk = () => {
    const postData = {
      active: true,
      joinerCompassDirection: readings.compassDirection,
      joinerGPSLatitude: readings.GPSLatitude,
      joinerGPSLongitude: readings.GPSLongitude,
      joinerUserId: readings.userId,
      startedWhen: new Date(),
      uniqueIdentifier: talkId,
    };

    fetch('/api/talk/join', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })

    window.location.href = `/talk/${talkId}`
  }

  return (
    <div>
      <input onChange={ (e) => getTalkId(e) } placeholder="Input the Talk Id"/>
      <button onClick={ joinTalk }>Join Talk</button>
    </div>
  )
}