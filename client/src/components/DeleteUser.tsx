import React from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export default function DeleteUser(props: {
  username: string;
  fetchUsers: Function;
}) {
    return (
      <Button
        icon
        circular
        color="blue"
        size="tiny"
        onClick={() => {
          axios
            .post(`/api/users/delete`, {
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
              }
            );
        }}
      >
        <Icon name="trash alternate" inverted size="large"></Icon>
      </Button>
    );
  }