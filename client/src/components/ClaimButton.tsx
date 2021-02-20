import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";

// Admin-side claim button that sets backend claim status to claimed
export default function ClaimButton(props: {
  id: string;
  disabled: boolean;
  fetchItems: Function
}) {
  
  const handleClick = () => {
    axios
      .post(`/api/items/updateStatus`, { id: props.id, status: "claimed" })
      .then(
        (res) => {
          console.log("Claimed!");
          console.log(res);
          props.fetchItems();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  return (
    props.disabled ?
      <Button
        icon
        circular
        color="green"
        size="tiny"
        disabled
        onClick={handleClick}
      >
        <Icon name="check" inverted size="large"></Icon>
      </Button> : <Button
        icon
        circular
        color="green"
        size="tiny"
        onClick={handleClick}
      >
        <Icon name="check" inverted size="large"></Icon>
      </Button>
  );
}
