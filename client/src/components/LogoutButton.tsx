import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function LogoutButton(props: { }) {
  const history = useHistory();
  return (
    <Button
      icon="log out"
      color="blue"
      size="large"
      onClick={() => {
        console.log("logout");
        localStorage.removeItem("lnf_token");
        localStorage.removeItem("lnf_isAdmin");
        history.replace("/");
      }}
    >
    </Button>
  );
}
