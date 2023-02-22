import { Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateLock({ getDirection, readings, setUser, user }) {
  const [create, setCreate] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (readings !== null && create === true) {
      createALock();
    }
  }, [readings]);

  const createALock = () => {
    const postData = {
      initiatorCompassDirection: readings.compassDirection,
      initiatorGPSLatitude: readings.GPSLatitude,
      initiatorGPSLongitude: readings.GPSLongitude,
      initiatorUserId: readings.userId,
    };

    fetch(
      (process.env.NODE_ENV === 'production'
        ? '/app'
        : 'http://127.0.0.1:5000') + '/api/lock/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }
    ).then((result) => {
      result.json().then((data) => {
        history.push(`/lock/${data}`);
      });
    });
  };

  const getDirectionCreate = () => {
    setCreate(true);
    const userCopy = { ...user, initiatorOrJoiner: 'initiator' };
    setUser(userCopy);
    getDirection();
  };

  return (
    <Button
      color="purple"
      inverted
      onClick={getDirectionCreate}
      size="big"
      style={{ width: '50vw' }}
    >
      Create a Lock
    </Button>
  );
}
