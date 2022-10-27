import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router";
import { Button, Icon } from "semantic-ui-react";

export default function UnarchiveButton(props: {
  // TODO: #128 Replace Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  id: string;
  fetchItems: () => void;
}) {
  const history = useHistory();
  return (
    <Button
      icon
      circular
      size="tiny"
      type="button"
      floated="left"
      color="yellow"
      onClick={() => {
        axios
          .post("/api/items/archive", {
            token: localStorage.getItem("lnf_token"),
            ids: [props.id],
            archived: false,
          })
          .then(
            (res) => {
              console.log("Unarchived!");
              console.log(res);
              props.fetchItems();
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
      <Icon name="bolt" inverted size="large" />
    </Button>
  );
}
