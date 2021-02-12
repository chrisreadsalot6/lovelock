import { Button, Input, Label, Form } from "semantic-ui-react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

const SignUpForm = ({ authenticated, setAuthenticated, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={onSignUp}>
      <Form.Field>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </Form.Field>
      <Form.Field>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          placeholder="repeat password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </Form.Field>
      <Button type="submit" basic color="purple">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
