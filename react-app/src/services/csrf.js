let csrfToken = null;

export const setCsrfToken = (token) => {
    csrfToken = token;
};

export const getCsrfToken = () => {
    return csrfToken;
};

export const fetchCsrfToken = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/csrf-token`, {
        credentials: 'include'
    });
    const data = await response.json();
    console.log('Fetched CSRF token:', data);
    setCsrfToken(data.csrf_token);
    return data.csrf_token;
};