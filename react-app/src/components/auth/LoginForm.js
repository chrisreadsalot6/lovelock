import { Button, Form, Grid, Image, Input, Label } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

const LoginForm = ({ authenticated, setAuthenticated, setUser }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [viewHeight, setViewHeight] = useState("74.5vh");
  useEffect(() => {
    const isMobile = detectIfMobileBrowser();

    if (isMobile === false) {
      setViewHeight("86.5vh");
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

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      setUser(user);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Grid
        style={{ height: viewHeight, margin: "0px" }}
        verticalAlign="middle"
        id="login"
      >
        <Grid.Column textAlign="center">
          <Image
            src="/lovelock.png"
            alt="image"
            verticalAlign="middle"
            size="small"
            style={{ margin: "2em" }}
          />
          <Form onSubmit={onLogin}>
            <Form.Field inline>
              <Input
                name="email"
                type="text"
                placeholder="email"
                size="massive"
                value={email}
                onChange={updateEmail}
              />
              {errors.map((error) => {
                if (error.includes("email")) {
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
            <Form.Field inline>
              <Input
                name="password"
                type="password"
                placeholder="password"
                size="massive"
                value={password}
                onChange={updatePassword}
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
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;
