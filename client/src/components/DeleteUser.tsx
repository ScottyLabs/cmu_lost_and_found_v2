import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router";
import { Button, Icon } from "semantic-ui-react";

export default function DeleteUser(props: {
  username: string;
  // TODO: #128 Replace Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
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
          .post("/api/accounts/delete", {
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
