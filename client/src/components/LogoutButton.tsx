import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import './LogoutButton.css';

export default function LogoutButton(props: { }) {
  const history = useHistory();
  return (
    <div id="logout">
    <Button
      icon
      color='black'
      style = {{color:'#FFFFFF'}}
      labelPosition="left"
      onClick={() => {
        console.log("logout");
        localStorage.removeItem("lnf_token");
        history.replace("/login");
      }}
    >
      <Icon name="sign out" style = {{color:'#FFFFFF'}}/>
      Logout
    </Button>
    </div>
  );
}
