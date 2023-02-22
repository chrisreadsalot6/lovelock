export const authenticate = async () => {
  const response = await fetch(
    (process.env.NODE_ENV === 'production'
      ? '/app'
      : 'http://127.0.0.1:5000') + '/api/auth_routes/',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch(
    (process.env.NODE_ENV === 'production'
      ? '/app'
      : 'http://127.0.0.1:5000') + '/api/auth_routes/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  const user = await response.json();

  return user;
};

export const logout = async () => {
  const response = await fetch(
    (process.env.NODE_ENV === 'production'
      ? '/app'
      : 'http://127.0.0.1:5000') + '/api/auth_routes/logout',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

export const signUp = async (username, email, password) => {
  const response = await fetch(
    (process.env.NODE_ENV === 'production'
      ? '/app'
      : 'http://127.0.0.1:5000') + '/api/auth_routes/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );
  return await response.json();
};
