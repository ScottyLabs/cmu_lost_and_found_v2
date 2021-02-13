import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";

// Admin-side unclaim button that sets backend claim status to available
export default function UnclaimButton(props: {
  id: string;
  disabled: boolean;
  fetchItems: Function
}) {

  const handleClick = () => {
    axios
      .post(`http://localhost:3080/api/items/updateStatus`, { id: props.id, status: "available" })
      .then(
        (res) => {
          console.log("Unclaimed!");
          console.log(res);
          props.fetchItems();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    props.disabled ?
      <Button
        icon
        circular
        color="red"
        size="tiny"
        disabled
        onClick={handleClick}
      >
        <Icon name="x" inverted size="large"></Icon>
      </Button> : <Button
        icon
        circular
        color="red"
        size="tiny"
        onClick={handleClick}
      >
        <Icon name="x" inverted size="large"></Icon>
      </Button>
  );
}
