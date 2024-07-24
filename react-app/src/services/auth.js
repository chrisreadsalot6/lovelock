import { fetchCsrfToken, getCsrfToken } from './csrf';

const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5001';

export const authenticate = async () => {
    if (!getCsrfToken()) {
        await fetchCsrfToken();
    }

    const csrfToken = getCsrfToken();

    const response = await fetch(`${API_URL}/api/auth/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        }
    );
    if (response.ok) {
        return await response.json();
    } else {
        return { errors: [`HTTP error! status: ${response.status}`] };
    }
}

export const login = async (email, password) => {
    if (!getCsrfToken()) {
        await fetchCsrfToken();
    }

    const csrfToken = getCsrfToken();

    const requestBody = JSON.stringify({
        email,
        password,
    });

    console.log({ requestBody });
    console.log({ csrfToken });

    const response = await fetch(`${API_URL}/api/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: requestBody,
            credentials: 'include',
        }
    );

    // Log the status and response text for debugging
    console.log('Response Status:', response.status);
    const responseText = await response.text();
    console.log('Response Text:', responseText);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = JSON.parse(responseText);
    console.log({ user });
    return user;
};

export const logout = async () => {
    if (!getCsrfToken()) {
        await fetchCsrfToken();
    }

    const csrfToken = getCsrfToken();

    const response = await fetch(`${API_URL}/api/auth/logout`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        }
    );
    return await response.json();
};

export const signUp = async (username, email, password) => {
    if (!getCsrfToken()) {
        await fetchCsrfToken();
    }

    const csrfToken = getCsrfToken();

    const response = await fetch(`${API_URL}/api/auth/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            credentials: 'include',
        }
    );
    return await response.json();
};
