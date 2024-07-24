import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { login } from "../../services/auth";

const DemoLogin = ({ authenticated, isMobile, setAuthenticated, setUser }) => {
    const [viewHeight, setViewHeight] = useState("74.5vh");
    const [email, setEmail] = useState("demo@demo.com");
    const [password, setPassword] = useState("password");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (isMobile === false) {
            setViewHeight("86.5vh");
        }
    }, []);

    if (authenticated) {
        return <Redirect to="/" />;
    }

    const demoLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            console.log({ user });
            if (!user.errors) {
                setAuthenticated(true);
                setUser(user);
                return <Redirect to="/" />;
            } else {
                setErrors(user.errors);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrors([err.message]);
        }
    };

    return (
        <div style={{ height: viewHeight, margin: "0px" }}>
            <form onSubmit={demoLogin}>
                {/* <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                /> */}
                <button type="submit">Demo Login</button>
            </form>
            {errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    )
};

export default DemoLogin;
