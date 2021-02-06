import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

export default function DeleteUser(props: {
  username: string;
  fetchUsers: Function;
}) {
    return (
      <Button
        onClick={() => {
          axios
            .post(`http://localhost:3080/api/users/delete`, { username: props.username })
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
        Delete User
      </Button>
    );
  }