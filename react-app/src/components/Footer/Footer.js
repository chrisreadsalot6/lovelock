import { Icon, Segment } from "semantic-ui-react";
import React from "react";

export default function Footer() {
  const angellist = () => {
    window.location.href = "https://angel.co/u/rcreadii";
  };

  const github = () => {
    window.location.href = "https://github.com/rcreadii";
  };

  const linkedin = () => {
    window.location.href = "https://www.linkedin.com/in/rcreadii";
  };

  return (
    <div>
      <Segment color="purple" id="footer" textAlign="center">
        Developed by Chris Read{" "}
        <Icon link name="angellist" onClick={angellist} />
        <Icon link name="github" onClick={github} />{" "}
        <Icon link name="linkedin" onClick={linkedin} />
        <Icon name="code" />
      </Segment>
    </div>
  );
}
