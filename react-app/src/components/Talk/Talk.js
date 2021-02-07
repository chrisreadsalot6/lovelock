import React from 'react'

export default function Talk() {

    const handleClickToCreateConversation = () => {
    // console.log(coords)
    // userId = 1;
    // GPS = {latitude: coords.latitude, longitude: coords.longitude};
    // direction = `${direcc}`;

    // conversationStarterData = {
    //   userId,
    //   initiatorGPSLocation: GPS,
    //   initiatorDirection: direction
    // }

    // // fetch('/api/link', {
    // //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(conversationStarterData)
    // }).then((response) => console.log(response.status))
    
    // hit backend with data
    // backend will:
    // (1) generate a random url
    // (2) insert data into the database
    // (3) return that random url
  }

  
  return (
    <div>
      <div>Your unique talk id: { sessionStorage.getItem('talkId') }</div>
    </div>
  )
}
