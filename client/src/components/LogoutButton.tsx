import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import './LogoutButton.css';

export default function LogoutButton() {
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
      Sign out
    </Button>
    </div>
  );
}
