import { Icon, Segment } from "semantic-ui-react";
import React from "react";

export default function Footer({ joeColor, revealJoe }) {
  const angellist = () => {
    window.location.href = "https://angel.co/u/rcreadii";
  };

  const github = () => {
    window.location.href = "https://github.com/rcreadii";
  };

  const linkedin = () => {
    window.location.href = "https://www.linkedin.com/in/rcreadii";
  };

  const portfolio = () => {
    window.location.href = "https://rcreadii.dev";
  };

  return (
    <Segment
      color={revealJoe ? "red" : "purple"}
      id="footer"
      textAlign="center"
      style={{ height: "5vh", margin: "0px", padding: "1vh 0vh 1vh 0vh" }}
    >
      Developed by Chris Read <Icon link name="angellist" onClick={angellist} />
      <Icon link name="github" onClick={github} />{" "}
      <Icon link name="linkedin" onClick={linkedin} />
      <Icon link name="code" onClick={portfolio} />
    </Segment>
  );
}
