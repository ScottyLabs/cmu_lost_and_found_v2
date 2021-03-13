import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function LogoutButton(props: { }) {
  const history = useHistory();
  return (
    <Button
      icon
      circular
      color="blue"
      size="tiny"
      onClick={() => {
        console.log("logout");
        localStorage.removeItem("lnf_token");
        history.replace("/");
      }}
    >
      Logout
    </Button>
  );
}
