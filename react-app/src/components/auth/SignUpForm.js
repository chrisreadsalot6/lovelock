import { Button, Image, Input, Label, Form, Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

const SignUpForm = ({ authenticated, setAuthenticated, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [middleOrTop, setMiddleOrTop] = useState("top");

  const [viewHeight, setViewHeight] = useState("74.5vh");
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();

    if (isMobile === false) {
      setViewHeight("86.5vh");
      setMiddleOrTop("middle");
    }
  }, []);

  const detectIfMobileBrowser = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((element) => {
      return navigator.userAgent.match(element);
    });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user);
      } else {
        setErrors(user.errors);
      }
    } else {
      const err = "password: passwords do not match";
      setErrors([err]);
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
    <Grid
      style={{ height: viewHeight, margin: "0px" }}
      verticalAlign={middleOrTop}
    >
      <Grid.Column textAlign="center">
        <Image
          src="/lovelock.png"
          alt="image"
          verticalAlign="middle"
          size="small"
          style={{ margin: "2em" }}
        />
        <Form onSubmit={onSignUp}>
          <Form.Field inline>
            <Input
              type="text"
              name="username"
              placeholder="username"
              onChange={updateUsername}
              value={username}
              required={true}
              size="massive"
            />
          </Form.Field>
          <Form.Field inline>
            {/* <label>Email</label> */}
            <Input
              type="email"
              name="email"
              placeholder="email"
              onChange={updateEmail}
              value={email}
              required={true}
              size="massive"
            />
          </Form.Field>
          <Form.Field inline>
            <Input
              type="password"
              name="password"
              placeholder="password"
              onChange={updatePassword}
              value={password}
              required={true}
              size="massive"
            />
          </Form.Field>
          <Form.Field inline>
            <Input
              type="password"
              name="repeat_password"
              placeholder="repeat password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              size="massive"
            />
            {errors.map((error) => {
              if (error.includes("password")) {
                return (
                  <Label pointing prompt size="large">
                    {error}
                  </Label>
                );
              } else {
                return null;
              }
            })}
          </Form.Field>
          <Button type="submit" basic color="purple" size="massive">
            Sign Up
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SignUpForm;
