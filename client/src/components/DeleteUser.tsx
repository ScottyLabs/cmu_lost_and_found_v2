import React from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function User(props: {
  username: string;
  fetchUsers: Function;
}) {
  const history = useHistory();
  return (
    <Button
      icon
      circular
      color="red"
      size="tiny"
      onClick={() => {
        axios
          .post(`/api/accounts/`, {
            token: localStorage.getItem("lnf_token"),
            username: props.username,
          })
          .then(
            (res) => {
              console.log("Unclaimed!");
              console.log(res);
              props.fetchUsers();
            },
            (error) => {
              console.log(error);
              if (error?.response?.status === 401) {
                window.localStorage.removeItem("lnf_token");
                history.push("/login");
              }
            }
          );
      }}
    >
      <Icon name="trash alternate outline" inverted size="large"></Icon>
    </Button>
  );
}
