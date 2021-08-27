import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function LogoutButton(props: { }) {
  const history = useHistory();
  return (
    <Button
      icon
      color="blue"
      labelPosition="left"
      onClick={() => {
        console.log("logout");
        localStorage.removeItem("lnf_token");
        history.replace("/login");
      }}
    >
      <Icon name="sign out" />
      Sign out
    </Button>
  );
}
