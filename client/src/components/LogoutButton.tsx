import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export default function LogoutButton() {
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
