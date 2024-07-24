import { Icon, Segment } from "semantic-ui-react";
import React from "react";

export default function Footer({ revealJoe }) {
    const github = () => {
        window.location.href = "https://github.com/chrisreadsalot6";
    };

    const linkedin = () => {
        window.location.href = "https://www.linkedin.com/in/chrisreadsalot6";
    };

    const twitter = () => {
        window.location.href = "https://twitter.com/chrisreadsalot6";
    }

    return (
        <Segment
            color={revealJoe ? "red" : "purple"}
            id="footer"
            textAlign="center"
            style={{ height: "5vh", margin: "0px", padding: "1vh 0vh 1vh 0vh" }}
        >
            Developed by Chris Read{" "}
            <Icon link name="github" onClick={github} />{" "}
            <Icon link name="linkedin" onClick={linkedin} />{" "}
            <Icon link name="twitter" onClick={twitter} />
        </Segment>
    );
}
