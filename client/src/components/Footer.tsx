import React from "react";
import {
  Button,
  Confirm,
  Grid,
  Icon,
  Label,
  Popup,
  Segment,
} from "semantic-ui-react";

const footerStyle = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  textAlign: "center",
};

const footerTextStyle = {
  color: "black",
  backgroundColor: "blue",
  width: "100px"
};

const Footer = (props: any) => {
  return (
    <div style={{ position: "relative", marginTop: "1em" }}>
      <Segment style={footerStyle}>
        <p style={footerTextStyle}>
          Developed with ❤️ by
          <a href="https://scottylabs.org/" target="_blank">
            {" "}
            ScottyLabs
          </a>
        </p>
      </Segment>
    </div>
  );
};

export default Footer;
