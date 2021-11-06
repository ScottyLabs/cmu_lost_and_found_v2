import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function AboutButton(props: { }) {
  return (
    <Button
      icon
      color="olive"
      labelPosition="left"
      onClick={() => {
      }}
    >
      <Icon name="info circle" />
      About
    </Button>
  );
}
