import { Button, Form, Grid, Image, Input, Label } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";

const LoginForm = ({ authenticated, isMobile, setAuthenticated, setUser }) => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [middleOrTop, setMiddleOrTop] = useState("top");
  const [viewHeight, setViewHeight] = useState("74.5vh");

  useEffect(() => {
    if (isMobile === false) {
      setViewHeight("86.5vh");
      setMiddleOrTop("middle");
    }
  }, []);

  const onDemoLogin = async (e) => {
    e.preventDefault();
    history.push("/demo");
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
        verticalAlign={middleOrTop}
        id="login"
      >
        <Grid.Column textAlign="center">
          <Image
            src="https://lovelock-assets.s3.amazonaws.com/image-assets/welcome.png"
            alt="image"
            verticalAlign="middle"
            size="small"
          />
          <Form onSubmit={onLogin}>
            <Form.Field inline>
              <Input
                name="email"
                type="text"
                placeholder="email"
                size="large"
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
                size="large"
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
            <Button color="purple" inverted size="large" type="submit">
              Login
            </Button>
            <Button
              color="purple"
              onClick={onDemoLogin}
              inverted
              size="large"
              type="button"
            >
              Demo
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;
