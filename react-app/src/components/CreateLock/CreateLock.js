import { Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCsrfToken } from "../../services/csrf";

export default function CreateLock({ getDirection, readings, setUser, user }) {
    const [create, setCreate] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (readings !== null && create === true) {
            createALock();
        }
    }, [readings]);

    const createALock = async () => {
        const postData = {
            initiatorCompassDirection: readings.compassDirection,
            initiatorGPSLatitude: readings.GPSLatitude,
            initiatorGPSLongitude: readings.GPSLongitude,
            initiatorUserId: readings.userId,
        };

        const csrfToken = await getCsrfToken();

        console.log("CSRF TOKEN");
        console.log({ csrfToken });

        fetch(
            (process.env.NODE_ENV === 'production'
                ? '/app'
                : 'http://localhost:5001') + '/api/lock/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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
